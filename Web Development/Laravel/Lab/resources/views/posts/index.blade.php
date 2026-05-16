@extends('layouts.master')

@section('title', 'Posts')

@section('content')

    @if (session('success'))
        {{ session('success') }}
    @endif

    <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold text-gray-700">Posts</h2>
        <a href="/posts/create" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Create New Post
        </a>
    </div>

    @if (session('success'))
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
            {{ session('success') }}
        </div>
    @endif

    <div class="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <table class="min-w-full leading-normal">
            <thead>
                <tr class="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                    <th class="py-3 px-6 text-left">ID</th>
                    <th class="py-3 px-6 text-left">Title</th>
                    <th class="py-3 px-6 text-left">Slug</th>
                    <th class="py-3 px-6 text-left">Posted By</th>
                    <th class="py-3 px-6 text-left">Image</th>
                    <th class="py-3 px-6 text-center">Created At</th>
                    <th class="py-3 px-6 text-center">Actions</th>
                </tr>
            </thead>
            <tbody class="text-gray-600 text-sm font-light">
                @foreach ($posts as $post)
                    <tr class="border-b border-gray-200 hover:bg-gray-50 transition duration-150">
                        <td class="py-3 px-6 text-left whitespace-nowrap">
                            <span class="font-medium">{{ $post->id }}</span>
                        </td>
                        <td class="py-3 px-6 text-left">
                            <a href="/posts/{{ $post->id }}" class="text-blue-600 hover:underline font-semibold">{{ $post->title }}</a>
                        </td>
                        <td class="py-3 px-6 text-left">
                            {{ $post->slug }}
                        </td>
                        <td class="py-3 px-6 text-left">
                            {{ $post->owner ? $post->owner->name : 'N/A' }}
                        </td>
                        <td class="py-3 px-6 text-left">
                            @if($post->image)
                                <img src="{{ Storage::url($post->image) }}" alt="Thumbnail" class="h-10 w-10 rounded-full object-cover">
                            @else
                                No Image
                            @endif
                        </td>
                        <td class="py-3 px-6 text-center">
                            {{ $post->created_at->format('Y-m-d') }}
                        </td>
                        <td class="py-3 px-6 text-center space-x-2">
                            <a href="/posts/{{ $post->id }}" class="text-blue-600 hover:text-blue-900 font-semibold">View</a>
                            <a href="/posts/{{ $post->id }}/edit" class="text-yellow-600 hover:text-yellow-900 font-semibold">Edit</a>
                            
                            <form action="/posts/{{ $post->id }}" method="POST" class="inline-block" onsubmit="return confirm('Are you sure you want to delete this post?')">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="text-red-600 hover:text-red-900 font-semibold">Delete</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <div class="mt-6">
        {{ $posts->links() }}
    </div>

@endsection
