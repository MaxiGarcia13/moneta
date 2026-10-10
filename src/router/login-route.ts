import type { RouteRecordRaw } from 'vue-router';

export const loginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'login',
  component: () => import('@/views/login-view.vue'),
  meta: { public: true },
};
