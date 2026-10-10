import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './app.vue';
import router from './router';
import './style.css';

const app = createApp(App);
const queryClient = new QueryClient();

app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin, { queryClient });
app.mount('#app');
