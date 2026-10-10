<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

async function onSignOut() {
  await authStore.signOut();
  await router.push({ name: 'login' });
}
</script>

<template>
  <main class="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
    <h1>Moneta</h1>
    <p v-if="authStore.user">
      Signed in as {{ authStore.user.email ?? authStore.user.user_metadata?.user_name }}
    </p>

    <button
      type="button"
      class="mt-2 cursor-pointer rounded-lg border border-border bg-transparent px-4 py-2.5 text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      @click="onSignOut"
    >
      Sign out
    </button>
  </main>
</template>
