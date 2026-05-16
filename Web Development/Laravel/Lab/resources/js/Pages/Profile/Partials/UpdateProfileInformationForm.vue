<script setup>
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Link, useForm, usePage } from '@inertiajs/vue3';
import { ref } from 'vue';

defineProps({
    mustVerifyEmail: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});

const user = usePage().props.auth.user;

const form = useForm({
    name: user.name,
    email: user.email,
    profile_picture: null,
});

const previewUrl = ref(user.profile_picture_url || null);

function handleFileChange(e) {
    const file = e.target.files[0];
    form.profile_picture = file;
    if (file) {
        previewUrl.value = URL.createObjectURL(file);
    }
}

function submit() {
    form.post(route('profile.update'), {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
            form.profile_picture = null;
        },
    });
}
</script>

<template>
    <section>
        <header>
            <h2 class="text-lg font-medium text-gray-900">
                Profile Information
            </h2>

            <p class="mt-1 text-sm text-gray-600">
                Update your account's profile information, email address, and profile picture.
            </p>
        </header>

        <form
            @submit.prevent="submit"
            class="mt-6 space-y-6"
        >
            <!-- Profile Picture -->
            <div>
                <InputLabel value="Profile Picture" />
                <div class="mt-2 flex items-center gap-4">
                    <div class="h-20 w-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                        <img
                            v-if="previewUrl"
                            :src="previewUrl"
                            alt="Profile"
                            class="h-full w-full object-cover"
                        />
                        <span v-else class="text-2xl font-bold text-gray-400">
                            {{ (user.name || 'U').charAt(0).toUpperCase() }}
                        </span>
                    </div>
                    <div>
                        <input
                            id="profile_picture"
                            type="file"
                            accept=".jpg,.png"
                            @change="handleFileChange"
                            class="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
                        />
                        <p class="mt-1 text-xs text-gray-500">JPG or PNG only. Max 2MB.</p>
                    </div>
                </div>
                <InputError class="mt-2" :message="form.errors.profile_picture" />
            </div>

            <!-- Name -->
            <div>
                <InputLabel for="name" value="Name" />

                <TextInput
                    id="name"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.name"
                    required
                    autofocus
                    autocomplete="name"
                />

                <InputError class="mt-2" :message="form.errors.name" />
            </div>

            <!-- Email -->
            <div>
                <InputLabel for="email" value="Email" />

                <TextInput
                    id="email"
                    type="email"
                    class="mt-1 block w-full"
                    v-model="form.email"
                    required
                    autocomplete="username"
                />

                <InputError class="mt-2" :message="form.errors.email" />
            </div>

            <div v-if="mustVerifyEmail && user.email_verified_at === null">
                <p class="mt-2 text-sm text-gray-800">
                    Your email address is unverified.
                    <Link
                        :href="route('verification.send')"
                        method="post"
                        as="button"
                        class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Click here to re-send the verification email.
                    </Link>
                </p>

                <div
                    v-show="status === 'verification-link-sent'"
                    class="mt-2 text-sm font-medium text-green-600"
                >
                    A new verification link has been sent to your email address.
                </div>
            </div>

            <div class="flex items-center gap-4">
                <PrimaryButton :disabled="form.processing">Save</PrimaryButton>

                <Transition
                    enter-active-class="transition ease-in-out"
                    enter-from-class="opacity-0"
                    leave-active-class="transition ease-in-out"
                    leave-to-class="opacity-0"
                >
                    <p
                        v-if="form.recentlySuccessful"
                        class="text-sm text-gray-600"
                    >
                        Saved.
                    </p>
                </Transition>
            </div>
        </form>
    </section>
</template>
