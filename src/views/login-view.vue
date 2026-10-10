<script setup lang="ts">
import { ref } from 'vue';
import GithubIcon from '@/components/icons/github-icon.vue';
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
  <main class="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
    <h1>Moneta</h1>
    <p>Sign in to track expenses and budgets.</p>

    <button
      type="button"
      class="mt-2 inline-flex cursor-pointer items-center gap-2.5 rounded-lg border border-border bg-surface px-5 py-3 text-foreground disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      :disabled="isLoading"
      @click="onGithubClick"
    >
      <GithubIcon />
      <span>{{ isLoading ? 'Redirecting…' : 'Continue with GitHub' }}</span>
    </button>

    <p
      v-if="errorMessage"
      class="text-red-700"
    >
      {{ errorMessage }}
    </p>
  </main>
</template>
