<script setup>
import FormInput from "@/components/FormInput.vue";
import { ref } from "vue";

const email = ref("");
const password = ref("");
const username = ref("");
const phone = ref("");

const emailRules = [
  {
    regex: "^.+@.+\\..+$",
    errorMsg: "Invalid email format",
  },
];

const passwordRules = [
  {
    regex: ".{8,}",
    errorMsg: "Password must be at least 8 characters",
  },
  {
    regex: "[A-Z]",
    errorMsg: "Password must contain uppercase letter",
  },
  {
    regex: "[0-9]",
    errorMsg: "Password must contain a number",
  },
  {
    regex: "[!@#$%^&*]",
    errorMsg: "Password must contain special character (!@#$%^&*)",
  },
];

const usernameRules = [
  {
    regex: "^[a-zA-Z0-9_]{3,}$",
    errorMsg: "Username must be 3+ alphanumeric characters or underscore",
  },
];

const phoneRules = [
  {
    regex: "^\\d{10,}$",
    errorMsg: "Phone must be at least 10 digits",
  },
];

const handleEmailSuccess = (val) => {
  console.log("✓ Valid email:", val);
};

const handlePasswordSuccess = (val) => {
  console.log("✓ Valid password:", val);
};

const handleUsernameSuccess = (val) => {
  console.log("✓ Valid username:", val);
};

const handlePhoneSuccess = (val) => {
  console.log("✓ Valid phone:", val);
};
</script>

<template>
  <div class="max-w-md mx-auto">
    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <h2 class="card-title text-2xl mb-6">Sign Up</h2>

        <form class="space-y-4">
          <FormInput
            v-model="username"
            label="Username"
            placeholder="Enter username"
            inputType="text"
            hint="3+ characters, letters, numbers, and underscores only"
            :validationMatrix="usernameRules"
            eventName="username-valid"
            @username-valid="handleUsernameSuccess"
          />

          <FormInput
            v-model="email"
            label="Email Address"
            placeholder="you@example.com"
            inputType="email"
            hint="Enter a valid email address"
            :validationMatrix="emailRules"
            eventName="email-valid"
            @email-valid="handleEmailSuccess"
          />

          <FormInput
            v-model="phone"
            label="Phone Number"
            placeholder="1234567890"
            inputType="tel"
            hint="Enter at least 10 digits"
            :validationMatrix="phoneRules"
            eventName="phone-valid"
            @phone-valid="handlePhoneSuccess"
          />

          <FormInput
            v-model="password"
            label="Password"
            placeholder="Your secure password"
            inputType="password"
            hint="8+ chars, uppercase, number, and special char (!@#$%^&*)"
            :validationMatrix="passwordRules"
            eventName="password-valid"
            @password-valid="handlePasswordSuccess"
          />

          <button
            type="button"
            class="btn btn-primary w-full"
            :disabled="!email || !password || !username || !phone"
          >
            Create Account
          </button>
        </form>

        <div class="divider">Form State</div>

        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span>Username:</span>
            <span class="badge" :class="username ? 'badge-success' : 'badge-ghost'"
              >{{ username || "—" }}</span
            >
          </div>
          <div class="flex justify-between">
            <span>Email:</span>
            <span class="badge" :class="email ? 'badge-success' : 'badge-ghost'"
              >{{ email || "—" }}</span
            >
          </div>
          <div class="flex justify-between">
            <span>Phone:</span>
            <span class="badge" :class="phone ? 'badge-success' : 'badge-ghost'"
              >{{ phone || "—" }}</span
            >
          </div>
          <div class="flex justify-between">
            <span>Password:</span>
            <span class="badge" :class="password ? 'badge-success' : 'badge-ghost'"
              >{{ password ? "✓ Set" : "—" }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
