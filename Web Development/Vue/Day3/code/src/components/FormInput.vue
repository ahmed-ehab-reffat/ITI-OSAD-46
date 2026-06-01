<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  inputType: {
    type: String,
    default: "text",
  },
  validationMatrix: {
    type: Array,
    default: () => [],
  },
  eventName: {
    type: String,
    default: "input-success",
  },
  hint: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const touched = ref(false);
const dirty = ref(false);
const showPassword = ref(false);

const currentType = computed(() => {
  if (props.inputType === "password" && showPassword.value) {
    return "text";
  }
  return props.inputType;
});

const errors = computed(() => {
  if (!dirty.value && !touched.value) return [];

  return props.validationMatrix
    .filter((rule) => !new RegExp(rule.regex).test(props.modelValue))
    .map((rule) => rule.errorMsg);
});

const hasErrors = computed(() => errors.value.length > 0);

const isValid = computed(() => !hasErrors.value && dirty.value);

const handleInput = (e) => {
  emit("update:modelValue", e.target.value);
  dirty.value = true;

  if (isValid.value) {
    emit(props.eventName, props.modelValue);
  }
};

const handleBlur = () => {
  touched.value = true;
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template>
  <div class="form-control w-full">
    <label v-if="label" class="label">
      <span class="label-text font-semibold">{{ label }}</span>
    </label>

    <div class="relative">
      <input
        :value="modelValue"
        :type="currentType"
        :placeholder="placeholder"
        @input="handleInput"
        @blur="handleBlur"
        :class="[
          'input input-bordered w-full',
          {
            'input-error': (touched || dirty) && hasErrors,
            'input-success': isValid,
          },
        ]"
      />

      <button
        v-if="props.inputType === 'password'"
        type="button"
        @click="togglePasswordVisibility"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-base-content"
      >
        <svg
          v-if="!showPassword"
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        <svg
          v-else
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17.673 17.673a10.05 10.05 0 01-5.345 1.527m-4.149-4.149a10.05 10.05 0 001.56 4.802m9.532-9.532a10.049 10.049 0 00-4.802-1.56M9.5 9.5L3 3m12 12l6 6"
          />
        </svg>
      </button>
    </div>

    <div v-if="(touched || dirty) && hasErrors" class="label mt-1">
      <span class="label-text-alt text-error">{{ errors[0] }}</span>
    </div>

    <div v-if="!isValid && hint" class="label mt-1">
      <span class="label-text-alt text-base-content/50">{{ hint }}</span>
    </div>
  </div>
</template>
