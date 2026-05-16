<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Store a newly created comment.
     */
    public function store(Request $request, string $postId): RedirectResponse
    {
        $request->validate([
            'body' => 'required|min:3',
        ]);

        $post = Post::findOrFail($postId);

        $post->comments()->create([
            'body' => $request->body,
            'user_id' => $request->user()->id,
        ]);

        return redirect()->route('posts.show', $postId)->with('success', 'Comment added successfully');
    }

    /**
     * Remove the specified comment.
     */
    public function destroy(string $postId, string $commentId): RedirectResponse
    {
        $comment = Comment::where('post_id', $postId)->findOrFail($commentId);

        // Only allow the comment owner to delete
        if ($comment->user_id !== request()->user()->id) {
            return redirect()->route('posts.show', $postId)->with('error', 'Unauthorized');
        }

        $comment->delete();

        return redirect()->route('posts.show', $postId)->with('success', 'Comment deleted successfully');
    }
}
