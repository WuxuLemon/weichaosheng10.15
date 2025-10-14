import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

// 引入 rem 自适应方案
import './utils/rem-adapter.js';

const app = createApp(App);

app.use(router);

app.mount('#app');