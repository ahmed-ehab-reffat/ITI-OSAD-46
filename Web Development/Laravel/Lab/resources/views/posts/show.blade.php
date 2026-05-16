@extends('layouts.master')

@section('title', $post->title)

@section('content')
    <div class="bg-white shadow-lg rounded-lg overflow-hidden max-w-2xl mx-auto">
        <div class="p-6 space-y-6">
            @if($post->image)
                <div class="w-full flex justify-center bg-gray-50 rounded-lg p-4">
                    <img src="{{ Storage::url($post->image) }}" alt="{{ $post->title }}" class="max-w-full h-auto rounded-lg shadow-sm">
                </div>
            @endif

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-blue-50 p-4 rounded-lg">
                    <h3 class="text-sm font-semibold text-blue-600 uppercase mb-1">Post Title</h3>
                    <p class="text-lg font-bold text-gray-800">{{ $post->title }}</p>
                </div>
                <div class="bg-purple-50 p-4 rounded-lg">
                    <h3 class="text-sm font-semibold text-purple-600 uppercase mb-1">Slug</h3>
                    <p class="text-lg font-bold text-gray-800">{{ $post->slug }}</p>
                </div>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="text-sm font-semibold text-gray-600 uppercase mb-2">Description</h3>
                <p class="text-gray-800 leading-relaxed whitespace-pre-wrap">{{ $post->description }}</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100 pt-6">
                <div>
                    <h3 class="text-sm font-semibold text-gray-600 uppercase mb-1">Post Creator</h3>
                    <div class="flex items-center mt-2">
                        <div class="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3">
                            {{ strtoupper(substr($post->owner->name ?? 'A', 0, 1)) }}
                        </div>
                        <div>
                            <p class="text-sm font-bold text-gray-800">{{ $post->owner->name ?? 'Anonymous' }}</p>
                            <p class="text-xs text-gray-500">{{ $post->owner->email ?? 'No email' }}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 class="text-sm font-semibold text-gray-600 uppercase mb-1">Posted At</h3>
                    <p class="text-sm text-gray-800 font-medium mt-2">{{ $post->created_at->format('l, F j, Y') }}</p>
                    <p class="text-xs text-gray-500">{{ $post->created_at->diffForHumans() }}</p>
                </div>
            </div>
        </div>

        <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex space-x-4">
            <a href="/posts/{{ $post->id }}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                Edit Post
            </a>

            <form method="POST" action="/posts/{{ $post->id }}" class="inline" onsubmit="return confirm('Are you sure you want to delete this post?')">
                @csrf
                @method('DELETE')
                <button type="submit" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                    Delete Post
                </button>
            </form>
            
            <a href="/posts" class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                Back to Posts
            </a>
        </div>
    </div>
@endsection
