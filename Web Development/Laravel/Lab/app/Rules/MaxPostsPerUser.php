<?php

namespace App\Rules;

use App\Models\Post;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class MaxPostsPerUser implements ValidationRule
{
    protected int $maxPosts;

    /**
     * Create a new rule instance.
     */
    public function __construct(int $maxPosts = 3)
    {
        $this->maxPosts = $maxPosts;
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $postCount = Post::where('owner_id', $value)->count();

        if ($postCount >= $this->maxPosts) {
            $fail("This user has already created {$this->maxPosts} posts. Maximum number of posts per user is {$this->maxPosts}.");
        }
    }
}
