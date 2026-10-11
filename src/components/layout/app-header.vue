<script setup lang="ts">
import UserMenu from '@/components/auth/user-menu.vue';
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
      <AppBrand />
      <UserMenu v-if="authStore.user" />
    </div>
    <AppNav />
  </header>
</template>
