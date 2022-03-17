import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { createPinia } from 'pinia';
import { createSSRApp } from 'vue';
import { VueQueryPlugin } from 'vue-query';
import App from './App.vue';
import { vueQueryPluginOptions } from './utils';
import '@/styles/preflight.scss';
import '@/styles/tailwind.scss';
import '@/styles/global.scss';

dayjs.locale('zh-cn');
dayjs.extend(customParseFormat);

export function createApp() {
  const app = createSSRApp(App).use(createPinia()).use(VueQueryPlugin, vueQueryPluginOptions);
  return {
    app,
  };
}
