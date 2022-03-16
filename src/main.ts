import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { createPinia } from 'pinia';
import { createSSRApp } from 'vue';
import App from './App.vue';
import '@/styles/preflight.scss';
import '@/styles/tailwind.scss';
import '@/styles/global.scss';

dayjs.locale('zh-cn');
dayjs.extend(customParseFormat);

export function createApp() {
  const app = createSSRApp(App).use(createPinia());
  return {
    app,
  };
}
