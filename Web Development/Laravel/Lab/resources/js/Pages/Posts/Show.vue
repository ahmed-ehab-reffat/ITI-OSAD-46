<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import InputError from '@/Components/InputError.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import { Head, Link, router, useForm, usePage } from '@inertiajs/vue3';

const props = defineProps({
    post: Object,
});

const page = usePage();
const authUser = page.props.auth.user;

const commentForm = useForm({
    body: '',
});

function submitComment() {
    commentForm.post(route('comments.store', props.post.id), {
        preserveScroll: true,
        onSuccess: () => commentForm.reset(),
    });
}

function confirmDelete() {
    if (confirm('Are you sure you want to delete this post?')) {
        router.delete(route('posts.destroy', props.post.id));
    }
}

function deleteComment(commentId) {
    if (confirm('Delete this comment?')) {
        router.delete(route('comments.destroy', { post: props.post.id, comment: commentId }), {
            preserveScroll: true,
        });
    }
}

function togglePostLike() {
    router.post(route('posts.like', props.post.id), {}, {
        preserveScroll: true,
    });
}

function toggleCommentLike(commentId) {
    router.post(route('comments.like', commentId), {}, {
        preserveScroll: true,
    });
}

function isLikedByUser(likes) {
    return likes?.some(like => like.user_id === authUser.id) ?? false;
}
</script>

<template>
    <Head :title="post.title" />

    <AuthenticatedLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold leading-tight text-gray-800">
                    {{ post.title }}
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
            <div class="mx-auto max-w-4xl sm:px-6 lg:px-8 space-y-6">
                <!-- Post Content -->
                <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div class="p-6 space-y-6">
                        <!-- Image -->
                        <div v-if="post.image_url" class="w-full flex justify-center bg-gray-50 rounded-lg p-4">
                            <img
                                :src="post.image_url"
                                :alt="post.title"
                                class="max-w-full h-auto rounded-lg shadow-sm max-h-96 object-contain"
                            />
                        </div>

                        <!-- Title & Slug -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-indigo-50 p-4 rounded-lg">
                                <h3 class="text-sm font-semibold text-indigo-600 uppercase mb-1">Post Title</h3>
                                <p class="text-lg font-bold text-gray-800">{{ post.title }}</p>
                            </div>
                            <div class="bg-purple-50 p-4 rounded-lg">
                                <h3 class="text-sm font-semibold text-purple-600 uppercase mb-1">Slug</h3>
                                <code class="text-sm font-bold text-gray-800 bg-white px-2 py-1 rounded">{{ post.slug }}</code>
                            </div>
                        </div>

                        <!-- Tags -->
                        <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-2">
                            <span class="text-sm font-semibold text-gray-600 uppercase mr-2">Tags:</span>
                            <span
                                v-for="tag in post.tags"
                                :key="tag.id"
                                class="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800"
                            >
                                {{ tag.name }}
                            </span>
                        </div>

                        <!-- Description -->
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <h3 class="text-sm font-semibold text-gray-600 uppercase mb-2">Description</h3>
                            <p class="text-gray-800 leading-relaxed whitespace-pre-wrap">{{ post.raw_description }}</p>
                        </div>

                        <!-- Author & Date -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100 pt-6">
                            <div>
                                <h3 class="text-sm font-semibold text-gray-600 uppercase mb-1">Post Creator</h3>
                                <div class="flex items-center mt-2">
                                    <div class="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold mr-3">
                                        {{ (post.owner?.name ?? 'A').charAt(0).toUpperCase() }}
                                    </div>
                                    <div>
                                        <p class="text-sm font-bold text-gray-800">{{ post.owner?.name ?? 'Anonymous' }}</p>
                                        <p class="text-xs text-gray-500">{{ post.owner?.email ?? 'No email' }}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 class="text-sm font-semibold text-gray-600 uppercase mb-1">Posted At</h3>
                                <p class="text-sm text-gray-800 font-medium mt-2">
                                    {{ new Date(post.created_at).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
                                </p>
                            </div>
                        </div>

                        <!-- Like Button -->
                        <div class="border-t border-gray-100 pt-4">
                            <button
                                @click="togglePostLike"
                                :class="[
                                    'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition duration-150',
                                    isLikedByUser(post.likes)
                                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                ]"
                            >
                                <span>{{ isLikedByUser(post.likes) ? '❤️' : '🤍' }}</span>
                                {{ post.likes?.length ?? 0 }} {{ (post.likes?.length ?? 0) === 1 ? 'Like' : 'Likes' }}
                            </button>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex space-x-3">
                        <Link
                            :href="route('posts.edit', post.id)"
                            class="inline-flex items-center rounded-md bg-yellow-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-yellow-400"
                        >
                            Edit Post
                        </Link>
                        <button
                            @click="confirmDelete"
                            class="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500"
                        >
                            Delete Post
                        </button>
                    </div>
                </div>

                <!-- Comments Section -->
                <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div class="p-6">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">
                            Comments ({{ post.comments?.length ?? 0 }})
                        </h3>

                        <!-- Add Comment -->
                        <form @submit.prevent="submitComment" class="mb-6">
                            <textarea
                                v-model="commentForm.body"
                                rows="3"
                                placeholder="Write a comment..."
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            ></textarea>
                            <InputError class="mt-2" :message="commentForm.errors.body" />
                            <PrimaryButton class="mt-3" :disabled="commentForm.processing">
                                Add Comment
                            </PrimaryButton>
                        </form>

                        <!-- Comments List -->
                        <div class="space-y-4">
                            <div
                                v-for="comment in post.comments"
                                :key="comment.id"
                                class="border border-gray-200 rounded-lg p-4"
                            >
                                <div class="flex justify-between items-start">
                                    <div class="flex items-center gap-3">
                                        <div class="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-sm font-bold">
                                            {{ (comment.user?.name ?? 'A').charAt(0).toUpperCase() }}
                                        </div>
                                        <div>
                                            <p class="text-sm font-semibold text-gray-800">{{ comment.user?.name ?? 'Anonymous' }}</p>
                                            <p class="text-xs text-gray-500">{{ new Date(comment.created_at).toLocaleString() }}</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <button
                                            @click="toggleCommentLike(comment.id)"
                                            :class="[
                                                'text-xs px-2 py-1 rounded-full transition',
                                                isLikedByUser(comment.likes)
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-gray-100 text-gray-600'
                                            ]"
                                        >
                                            {{ isLikedByUser(comment.likes) ? '❤️' : '🤍' }} {{ comment.likes?.length ?? 0 }}
                                        </button>
                                        <button
                                            v-if="comment.user_id === authUser.id"
                                            @click="deleteComment(comment.id)"
                                            class="text-xs text-red-500 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <p class="mt-2 text-sm text-gray-700">{{ comment.body }}</p>
                            </div>
                            <p v-if="!post.comments || post.comments.length === 0" class="text-sm text-gray-500 text-center py-4">
                                No comments yet. Be the first to comment!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
