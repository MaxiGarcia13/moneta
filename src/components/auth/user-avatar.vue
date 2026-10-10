<script setup lang="ts">
import { computed } from 'vue';
import Avatar from '@/components/ui/avatar.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const avatarUrl = computed(() => {
  const metadata = authStore.user?.user_metadata;
  const url = metadata?.avatar_url ?? metadata?.picture;

  return typeof url === 'string' ? url : null;
});

const displayName = computed(() => {
  const user = authStore.user;
  if (!user) {
    return 'User';
  }

  return (
    user.user_metadata?.full_name
    ?? user.user_metadata?.user_name
    ?? user.user_metadata?.name
    ?? user.email
    ?? 'User'
  );
});
</script>

<template>
  <Avatar
    :src="avatarUrl"
    :name="displayName"
  />
</template>
