<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';

const props = defineProps({
    posts: Object,
});

function restorePost(postId) {
    if (confirm('Restore this post?')) {
        router.post(route('posts.restore', postId));
    }
}

function forceDeletePost(postId) {
    if (confirm('Permanently delete this post? This action cannot be undone!')) {
        router.delete(route('posts.forceDelete', postId));
    }
}
</script>

<template>
    <Head title="Trashed Posts" />

    <AuthenticatedLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold leading-tight text-gray-800">
                    Trashed Posts
                </h2>
                <Link
                    :href="route('posts.index')"
                    class="text-sm text-gray-600 hover:text-gray-900 underline"
                >
                    ← Back to Posts
                </Link>
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
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Posted By</th>
                                    <th class="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">Deleted At</th>
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
                                    <td class="px-6 py-4 text-sm text-gray-500 line-through">
                                        {{ post.title }}
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-500">
                                        {{ post.owner?.name ?? 'N/A' }}
                                    </td>
                                    <td class="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                                        {{ new Date(post.deleted_at).toLocaleDateString() }}
                                    </td>
                                    <td class="whitespace-nowrap px-6 py-4 text-center text-sm font-medium space-x-2">
                                        <button
                                            @click="restorePost(post.id)"
                                            class="text-green-600 hover:text-green-900 font-semibold"
                                        >
                                            Restore
                                        </button>
                                        <button
                                            @click="forceDeletePost(post.id)"
                                            class="text-red-600 hover:text-red-900 font-semibold"
                                        >
                                            Delete Forever
                                        </button>
                                    </td>
                                </tr>
                                <tr v-if="posts.data.length === 0">
                                    <td colspan="5" class="px-6 py-12 text-center text-sm text-gray-500">
                                        No trashed posts found.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div v-if="posts.links && posts.links.length > 3" class="border-t border-gray-200 px-4 py-3 sm:px-6">
                        <nav class="flex items-center justify-end gap-2">
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
                            />
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
