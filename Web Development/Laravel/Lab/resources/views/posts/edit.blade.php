@extends('layouts.master')

@section('title', 'Edit Post')

@section('content')
    <div class="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 class="text-2xl font-bold text-gray-800 text-center">Edit Post</h2>
        </div>

        @if ($errors->any())
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-6" role="alert">
                <strong class="font-bold">Whoops!</strong>
                <span class="block sm:inline">There were some problems with your input.</span>
                <ul class="mt-3 list-disc list-inside text-sm text-red-600">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form method="POST" action="/posts/{{ $post->id }}" enctype="multipart/form-data" class="p-6 space-y-4">
            @csrf
            @method('PUT')

            <div>
                <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title:</label>
                <input type="text" id="title" name="title" value="{{ old('title', $post->title) }}" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150">
            </div>

            <div>
                <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description:</label>
                <textarea id="description" name="description" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150">{{ old('description', $post->description) }}</textarea>
            </div>

            <div>
                <label for="owner_id" class="block text-sm font-medium text-gray-700 mb-1">Post Creator:</label>
                <select id="owner_id" name="owner_id" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 bg-white">
                    @foreach($users as $user)
                        <option value="{{ $user->id }}" {{ old('owner_id', $post->owner_id) == $user->id ? 'selected' : '' }}>{{ $user->name }}</option>
                    @endforeach
                </select>
            </div>

            <div>
                <label for="image" class="block text-sm font-medium text-gray-700 mb-1">Post Image:</label>
                @if($post->image)
                    <div class="mb-2">
                        <img src="{{ Storage::url($post->image) }}" alt="Post image" class="h-32 w-auto rounded">
                    </div>
                @endif
                <input type="file" id="image" name="image" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150">
            </div>

            <div class="pt-4 flex items-center justify-between">
                <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Update Post
                </button>
                <a href="/posts/{{ $post->id }}" class="text-gray-600 hover:text-gray-900 font-semibold transition duration-300">
                    Cancel
                </a>
            </div>
        </form>
    </div>
@endsection
