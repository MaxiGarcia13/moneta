import { createRouter, createWebHistory } from 'vue-router';
import { registerAuthGuard } from './auth-guard';
import { formRoute } from './form-route';
import { homeRoute } from './home-route';
import { listRoute } from './list-route';
import { loginRoute } from './login-route';

const router = createRouter({
  history: createWebHistory(),
  routes: [loginRoute, homeRoute, listRoute, formRoute],
});


registerAuthGuard(router);

export default router;
