import type { RouteRecordRaw } from 'vue-router';

export const formRoute: RouteRecordRaw = {
  path: '/form',
  name: 'form',
  component: () => import('@/views/form-view.vue'),
  meta: { isNavigable: true },
};
