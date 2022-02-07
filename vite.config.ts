import path from 'path';
// import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
// @ts-ignore
import uni from '@dcloudio/vite-plugin-uni';
import env from 'vite-plugin-env-compatible';
// import eslint from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni({
      // FIX: nothing happened, must use UNI_OUTPUT_DIR
      // outputDir: path.resolve(process.cwd(), 'dist', process.env.UNI_PLATFORM ?? 'h5'),
      vueOptions: {
        reactivityTransform: true,
      },
    }),
    env({
      prefix: 'VITE',
    }),
    // FIX: [plugin:vite:eslint] No files matching 'src/pages.json.js' were found.
    // eslint({
    //   fix: true,
    // }),
    stylelint({
      fix: true,
    }),
  ],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@/': `${path.resolve('src')}/`,
    },
  },
});
