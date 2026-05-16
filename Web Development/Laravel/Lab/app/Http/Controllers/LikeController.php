<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    /**
     * Toggle like on a post.
     */
    public function togglePostLike(Request $request, string $postId): RedirectResponse
    {
        $post = Post::findOrFail($postId);
        $userId = $request->user()->id;

        $existingLike = $post->likes()->where('user_id', $userId)->first();

        if ($existingLike) {
            $existingLike->delete();
            $message = 'Post unliked';
        } else {
            $post->likes()->create(['user_id' => $userId]);
            $message = 'Post liked';
        }

        return redirect()->back()->with('success', $message);
    }

    /**
     * Toggle like on a comment.
     */
    public function toggleCommentLike(Request $request, string $commentId): RedirectResponse
    {
        $comment = Comment::findOrFail($commentId);
        $userId = $request->user()->id;

        $existingLike = $comment->likes()->where('user_id', $userId)->first();

        if ($existingLike) {
            $existingLike->delete();
            $message = 'Comment unliked';
        } else {
            $comment->likes()->create(['user_id' => $userId]);
            $message = 'Comment liked';
        }

        return redirect()->back()->with('success', $message);
    }
}
