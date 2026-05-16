<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $posts = Post::with('owner', 'tags')
            ->latest()
            ->paginate(10);

        // Format posts for the view
        $posts->getCollection()->transform(function ($post) {
            $post->image_url = $post->image ? Storage::url($post->image) : null;
            $post->tag_names = $post->tags->pluck('name')->implode(', ');
            return $post;
        });

        return Inertia::render('Posts/Index', [
            'posts' => $posts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $users = User::all();
        return Inertia::render('Posts/Create', [
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * Using $request->validated() to only get validated fields.
     */
    public function store(StorePostRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $tags = $validated['tags'];
        unset($validated['tags']);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('posts', 'public');
        }

        $post = Post::create($validated);

        if ($tags) {
            $tagNames = array_map('trim', explode(',', $tags));
            $post->attachTags($tagNames);
        }

        return redirect()->route('posts.index')->with('success', 'Post created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response|RedirectResponse
    {
        $post = Post::with('owner', 'tags', 'comments.user', 'likes')->find($id);

        if (! $post) {
            return redirect()->route('posts.index')->with('error', 'Post not found');
        }

        $post->image_url = $post->image ? Storage::url($post->image) : null;
        $post->tag_names = $post->tags->pluck('name')->implode(', ');
        $post->raw_description = $post->getRawOriginal('description');

        return Inertia::render('Posts/Show', [
            'post' => $post,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response|RedirectResponse
    {
        $post = Post::with('tags')->find($id);

        if (! $post) {
            return redirect()->route('posts.index')->with('error', 'Post not found');
        }

        $post->image_url = $post->image ? Storage::url($post->image) : null;
        $post->tag_names = $post->tags->pluck('name')->implode(', ');
        $post->raw_title = $post->getRawOriginal('title');
        $post->raw_description = $post->getRawOriginal('description');

        $users = User::all();

        return Inertia::render('Posts/Edit', [
            'post' => $post,
            'users' => $users,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, string $id): RedirectResponse
    {
        $post = Post::find($id);

        if (! $post) {
            return redirect()->route('posts.index')->with('error', 'Post not found');
        }

        $validated = $request->validated();

        $tags = $validated['tags'];
        unset($validated['tags']);

        if ($request->hasFile('image')) {
            // Remove old image
            if ($post->image) {
                Storage::disk('public')->delete($post->image);
            }
            $validated['image'] = $request->file('image')->store('posts', 'public');
        }

        $post->update($validated);

        // Sync tags (comma separated)
        if ($tags !== null) {
            $tagNames = array_map('trim', explode(',', $tags));
            $post->syncTags($tagNames);
        }

        return redirect()->route('posts.show', $id)->with('success', 'Post updated successfully');
    }

    /**
     * Remove the specified resource from storage (soft delete).
     */
    public function destroy(string $id): RedirectResponse
    {
        $post = Post::find($id);

        if (! $post) {
            return redirect()->route('posts.index')->with('error', 'Post not found');
        }

        $post->delete();

        return redirect()->route('posts.index')->with('success', 'Post deleted successfully');
    }

    /**
     * Display trashed posts.
     */
    public function trashed(): Response
    {
        $posts = Post::onlyTrashed()->with('owner')->latest()->paginate(10);

        $posts->getCollection()->transform(function ($post) {
            $post->image_url = $post->image ? Storage::url($post->image) : null;
            return $post;
        });

        return Inertia::render('Posts/Trashed', [
            'posts' => $posts,
        ]);
    }

    /**
     * Restore a soft-deleted post.
     */
    public function restore(string $id): RedirectResponse
    {
        $post = Post::onlyTrashed()->find($id);

        if (! $post) {
            return redirect()->route('posts.trashed')->with('error', 'Post not found');
        }

        $post->restore();

        return redirect()->route('posts.trashed')->with('success', 'Post restored successfully');
    }

    /**
     * Permanently delete a post (force delete).
     */
    public function forceDelete(string $id): RedirectResponse
    {
        $post = Post::onlyTrashed()->find($id);

        if (! $post) {
            return redirect()->route('posts.trashed')->with('error', 'Post not found');
        }

        // Remove image on force delete
        if ($post->image) {
            Storage::disk('public')->delete($post->image);
        }

        $post->forceDelete();

        return redirect()->route('posts.trashed')->with('success', 'Post permanently deleted');
    }
}
