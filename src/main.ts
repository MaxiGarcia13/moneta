import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './app.vue';
import { useAuthStore } from './stores/auth';
import './style.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

useAuthStore(pinia).initialize();

app.mount('#app');
