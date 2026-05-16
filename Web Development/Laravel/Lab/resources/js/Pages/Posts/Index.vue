<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';

const props = defineProps({
    posts: Object,
});

function confirmDelete(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        router.delete(route('posts.destroy', postId));
    }
}
</script>

<template>
    <Head title="Posts" />

    <AuthenticatedLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold leading-tight text-gray-800">
                    Posts
                </h2>
                <div class="flex gap-3">
                    <Link
                        :href="route('posts.trashed')"
                        class="inline-flex items-center rounded-md bg-gray-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-500"
                    >
                        Trashed
                    </Link>
                    <Link
                        :href="route('posts.create')"
                        class="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-indigo-500"
                    >
                        Create Post
                    </Link>
                </div>
            </div>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <!-- Success Message -->
                <div
                    v-if="$page.props.flash?.success"
                    class="mb-4 rounded-md bg-green-50 p-4 border border-green-200"
                >
                    <p class="text-sm font-medium text-green-800">
                        {{ $page.props.flash.success }}
                    </p>
                </div>

                <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">ID</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Title</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Slug</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Tags</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Posted By</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Image</th>
                                    <th class="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">Created At</th>
                                    <th class="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                                <tr
                                    v-for="post in posts.data"
                                    :key="post.id"
                                    class="hover:bg-gray-50 transition duration-150"
                                >
                                    <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                        {{ post.id }}
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-900">
                                        <Link
                                            :href="route('posts.show', post.id)"
                                            class="text-indigo-600 hover:text-indigo-900 font-semibold hover:underline"
                                        >
                                            {{ post.title }}
                                        </Link>
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-500">
                                        <code class="rounded bg-gray-100 px-2 py-1 text-xs">{{ post.slug }}</code>
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-500">
                                        <span
                                            v-for="tag in post.tags"
                                            :key="tag.id"
                                            class="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 mr-1"
                                        >
                                            {{ tag.name }}
                                        </span>
                                        <span v-if="!post.tags || post.tags.length === 0" class="text-gray-400">—</span>
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-500">
                                        {{ post.owner?.name ?? 'N/A' }}
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-500">
                                        <img
                                            v-if="post.image_url"
                                            :src="post.image_url"
                                            alt="Thumbnail"
                                            class="h-10 w-10 rounded-full object-cover"
                                        />
                                        <span v-else class="text-gray-400">No Image</span>
                                    </td>
                                    <td class="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                                        {{ new Date(post.created_at).toLocaleDateString() }}
                                    </td>
                                    <td class="whitespace-nowrap px-6 py-4 text-center text-sm font-medium space-x-2">
                                        <Link
                                            :href="route('posts.show', post.id)"
                                            class="text-blue-600 hover:text-blue-900"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            :href="route('posts.edit', post.id)"
                                            class="text-yellow-600 hover:text-yellow-900"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            @click="confirmDelete(post.id)"
                                            class="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                                <tr v-if="posts.data.length === 0">
                                    <td colspan="8" class="px-6 py-12 text-center text-sm text-gray-500">
                                        No posts found. Create your first post!
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div v-if="posts.links && posts.links.length > 3" class="border-t border-gray-200 px-4 py-3 sm:px-6">
                        <nav class="flex items-center justify-between">
                            <div class="flex flex-1 justify-between sm:justify-end gap-2">
                                <Link
                                    v-for="link in posts.links"
                                    :key="link.label"
                                    :href="link.url || '#'"
                                    :class="[
                                        'relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold transition duration-150',
                                        link.active
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
                                        !link.url ? 'opacity-50 cursor-not-allowed' : '',
                                    ]"
                                    v-html="link.label"
                                    :preserve-scroll="true"
                                />
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
