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
  <Button
    variant="ghost"
    size="sm"
    @click="onSignOut"
  >
    Log out
  </Button>
</template>
