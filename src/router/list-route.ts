import type { RouteRecordRaw } from 'vue-router';

export const listRoute: RouteRecordRaw = {
  path: '/list',
  name: 'transactions',
  component: () => import('@/views/list-view.vue'),
  meta: { isNavigable: true },
};
