<script setup lang="ts">
import { ref } from 'vue';
import GithubSignInButton from '@/components/auth/github-sign-in-button.vue';
import AppBrand from '@/components/layout/app-brand.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);

async function onGithubClick() {
  isLoading.value = true;
  errorMessage.value = null;

  try {
    await authStore.signInWithGithub();
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Sign-in failed';
    isLoading.value = false;
  }
}
</script>

<template>
  <main
    class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-12 text-center"
  >
    <div class="relative flex max-w-sm flex-col items-center gap-5 animate-[fade-up_0.5s_ease-out]">
      <AppBrand size="lg" />

      <GithubSignInButton
        :loading="isLoading"
        @click="onGithubClick"
      />

      <p
        v-if="errorMessage"
        class="text-sm text-danger"
        role="alert"
      >
        {{ errorMessage }}
      </p>
    </div>
  </main>
</template>
