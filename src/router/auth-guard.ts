import type { Router } from 'vue-router';
import { watch } from 'vue';
import { useAuthStore } from '@/stores/auth';

async function waitForAuthReady(authStore: ReturnType<typeof useAuthStore>) {
  if (authStore.isReady) {
    return;
  }

  await new Promise<void>((resolve) => {
    const stop = watch(
      () => authStore.isReady,
      (isReady) => {
        if (isReady) {
          stop();
          resolve();
        }
      },
    );
  });
}

export function registerAuthGuard(router: Router) {
  router.beforeEach(async (to) => {
    const authStore = useAuthStore();
    authStore.initialize();
    await waitForAuthReady(authStore);

    const isPublic = to.meta.public === true;
    const isLoggedIn = Boolean(authStore.session);

    if (!isPublic && !isLoggedIn) {
      return { name: 'login', query: { redirect: to.fullPath } };
    }

    if (to.name === 'login' && isLoggedIn) {
      const redirect = typeof to.query.redirect === 'string' ? to.query.redirect : '/';
      return redirect;
    }
  });
}
