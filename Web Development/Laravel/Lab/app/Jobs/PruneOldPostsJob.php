<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

use App\Models\Post;
use Illuminate\Support\Facades\Storage;

/**
 * Queue Job: PruneOldPostsJob
 *
 * A Queue Job is a unit of work that is pushed onto a queue and processed
 * asynchronously by a queue worker. Instead of handling time-consuming tasks
 * during a web request, you dispatch them to a queue for background processing.
 *
 * Database Queue Driver: When using QUEUE_CONNECTION=database, jobs are stored
 * in a database table (jobs table). This is easy to set up without external
 * services like Redis. Jobs are picked up by running: php artisan queue:work
 *
 * This job deletes posts that were created more than 2 years ago.
 * It force-deletes them (bypassing soft deletes) and removes associated images.
 */
class PruneOldPostsJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // Get posts older than 2 years (including soft-deleted ones)
        $oldPosts = Post::withTrashed()
            ->where('created_at', '<', now()->subYears(2))
            ->get();

        foreach ($oldPosts as $post) {
            if ($post->image) {
                Storage::disk('public')->delete($post->image);
            }
            // Force delete to permanently remove from database
            $post->forceDelete();
        }
    }
}
