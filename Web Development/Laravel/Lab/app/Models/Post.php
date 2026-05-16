<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;
use Cviebrock\EloquentSluggable\Sluggable;
use Spatie\Tags\HasTags;

class Post extends Model
{
    use HasFactory, Sluggable, SoftDeletes, HasTags;

    protected $fillable = ['title', 'description', 'owner_id', 'image', 'slug'];

    // protected $guarded = [];
    // protected $hidden = [];

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'title'
            ]
        ];
    }

    /**
     * Mutator: Auto-capitalize the title when setting.
     * Accessor: Return title in title case when getting.
     */
    protected function title(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => ucwords($value),
            set: fn (string $value) => strtolower($value),
        );
    }

    /**
     * Accessor: Format description for display (trim & add ellipsis for long text).
     */
    protected function description(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => nl2br(e($value)),
        );
    }

    /**
     * Boot method for model events.
     */
    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($post) {
            if ($post->isForceDeleting() && $post->image) {
                Storage::disk('public')->delete($post->image);
            }
        });
    }

    /**
     * Get the owner of the post.
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    /**
     * Get the comments for the post.
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Get the likes for the post (morph).
     */
    public function likes(): MorphMany
    {
        return $this->morphMany(Like::class, 'likeable');
    }
}
