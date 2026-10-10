<script setup lang="ts">
import { useRouter } from 'vue-router';
import Button from '@/components/ui/button.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

async function onSignOut() {
  await authStore.signOut();
  await router.push({ name: 'login' });
}
</script>

<template>
  <main
    class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-12 text-center"
  >
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(61,214,198,0.14),transparent_55%),radial-gradient(ellipse_at_20%_100%,rgba(61,214,198,0.06),transparent_45%)]"
    />

    <div class="relative flex max-w-sm flex-col items-center gap-5 animate-[fade-up_0.5s_ease-out]">
      <p
        v-if="authStore.user"
        class="text-base leading-relaxed text-muted"
      >
        Signed in as
        <span class="text-foreground">
          {{ authStore.user.email ?? authStore.user.user_metadata?.user_name }}
        </span>
      </p>

      <Button
        variant="ghost"
        @click="onSignOut"
      >
        Sign out
      </Button>
    </div>
  </main>
</template>
