import { createRouter, createWebHistory } from 'vue-router';
import { registerAuthGuard } from './auth-guard';
import { homeRoute } from './home-route';
import { loginRoute } from './login-route';

const router = createRouter({
  history: createWebHistory(),
  routes: [loginRoute, homeRoute],
});

registerAuthGuard(router);

export default router;
