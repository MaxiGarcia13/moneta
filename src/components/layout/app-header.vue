<script setup lang="ts">
import SignOutButton from '@/components/auth/sign-out-button.vue';
import UserAvatar from '@/components/auth/user-avatar.vue';
import AppBrand from '@/components/layout/app-brand.vue';
import AppNav from '@/components/layout/app-nav.vue';
import { useAuthStore } from '@/stores/auth';

const props = defineProps<{
  class?: string;
}>();

const authStore = useAuthStore();
</script>

<template>
  <header
    class="border-b border-border bg-background"
    :class="[props.class]"
  >
    <div class="mx-auto flex h-14 items-center justify-between gap-4 px-6 max-w-225">
      <div class="flex items-center gap-6">
        <AppBrand />
        <AppNav />
      </div>

      <div
        v-if="authStore.user"
        class="flex items-center gap-3"
      >
        <UserAvatar />
        <SignOutButton />
      </div>
    </div>
  </header>
</template>
