import type { RouteRecordRaw } from 'vue-router';

export const homeRoute: RouteRecordRaw = {
  path: '/',
  name: 'home',
  component: () => import('@/views/home-view.vue'),
  meta: { isNavigable: true },
};
