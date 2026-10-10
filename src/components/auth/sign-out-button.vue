<script setup lang="ts">
import { useRouter } from 'vue-router';
import LogoutIcon from '@/components/icons/logout.vue';
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
    class="!text-danger hover:!border-danger/40 hover:!bg-danger/10"
    @click="onSignOut"
  >
    <LogoutIcon class="size-4" />
    Log out
  </Button>
</template>
