import type { RouteRecordRaw } from 'vue-router';

export const listRoute: RouteRecordRaw = {
  path: '/list',
  name: 'list',
  component: () => import('@/views/list-view.vue'),
  meta: { isNavigable: true },
};
