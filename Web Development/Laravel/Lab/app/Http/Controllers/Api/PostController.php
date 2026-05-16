<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Apply Eager Loading to include the owner relation
        $posts = Post::with('owner')->paginate(10);
        
        return PostResource::collection($posts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|min:3|unique:posts,title',
            'description' => 'required|string|min:10',
        ]);

        $post = Post::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'owner_id' => Auth::id(),
        ]);

        return new PostResource($post->load('owner'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::with('owner')->findOrFail($id);
        
        return new PostResource($post);
    }
}
