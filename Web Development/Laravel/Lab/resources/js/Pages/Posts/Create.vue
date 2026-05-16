<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

const props = defineProps({
    users: Array,
});

const form = useForm({
    title: '',
    description: '',
    owner_id: props.users.length > 0 ? props.users[0].id : '',
    image: null,
    tags: '',
});

function submit() {
    form.post(route('posts.store'), {
        forceFormData: true,
    });
}
</script>

<template>
    <Head title="Create Post" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
                Create New Post
            </h2>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-2xl sm:px-6 lg:px-8">
                <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div class="p-6">
                        <form @submit.prevent="submit" class="space-y-6">
                            <!-- Title -->
                            <div>
                                <InputLabel for="title" value="Title" />
                                <TextInput
                                    id="title"
                                    type="text"
                                    class="mt-1 block w-full"
                                    v-model="form.title"
                                    required
                                    autofocus
                                />
                                <InputError class="mt-2" :message="form.errors.title" />
                            </div>

                            <!-- Description -->
                            <div>
                                <InputLabel for="description" value="Description" />
                                <textarea
                                    id="description"
                                    v-model="form.description"
                                    rows="4"
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                ></textarea>
                                <InputError class="mt-2" :message="form.errors.description" />
                            </div>

                            <!-- Post Creator -->
                            <div>
                                <InputLabel for="owner_id" value="Post Creator" />
                                <select
                                    id="owner_id"
                                    v-model="form.owner_id"
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                >
                                    <option v-for="user in users" :key="user.id" :value="user.id">
                                        {{ user.name }}
                                    </option>
                                </select>
                                <InputError class="mt-2" :message="form.errors.owner_id" />
                            </div>

                            <!-- Tags (comma separated) -->
                            <div>
                                <InputLabel for="tags" value="Tags (comma separated)" />
                                <TextInput
                                    id="tags"
                                    type="text"
                                    class="mt-1 block w-full"
                                    v-model="form.tags"
                                    placeholder="laravel, php, web development"
                                />
                                <p class="mt-1 text-xs text-gray-500">Enter tags separated by commas</p>
                                <InputError class="mt-2" :message="form.errors.tags" />
                            </div>

                            <!-- Image -->
                            <div>
                                <InputLabel for="image" value="Post Image (.jpg, .png)" />
                                <input
                                    id="image"
                                    type="file"
                                    accept=".jpg,.png"
                                    @input="form.image = $event.target.files[0]"
                                    class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
                                />
                                <InputError class="mt-2" :message="form.errors.image" />
                            </div>

                            <!-- Submit -->
                            <div class="flex items-center justify-between pt-4">
                                <PrimaryButton :disabled="form.processing">
                                    Create Post
                                </PrimaryButton>
                                <Link
                                    :href="route('posts.index')"
                                    class="text-sm text-gray-600 hover:text-gray-900 underline"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
