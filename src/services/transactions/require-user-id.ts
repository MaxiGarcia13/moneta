import { useAuthStore } from '@/stores/auth';

export function requireUserId() {
  const authStore = useAuthStore();
  const userId = authStore.user?.id;

  if (!userId) {
    throw new Error('You must be signed in to manage transactions');
  }

  return userId;
}
