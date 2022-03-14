import path from 'path';
// import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import env from 'vite-plugin-env-compatible';
import eslint from '@modyqyw/vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
// @ts-ignore
import tailwindcss from 'tailwindcss';
// @ts-ignore
import postcssFlexBugsFixes from 'postcss-flexbugs-fixes';
// @ts-ignore
import postcssPresetEnv from 'postcss-preset-env';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es2015',
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        postcssFlexBugsFixes(),
        postcssPresetEnv({
          autoprefixer: {
            flexbox: 'no-2009',
          },
          stage: 3,
        }),
      ],
    },
    preprocessorOptions: {
      preprocessorOptions: {
        scss: {
          charset: false,
          additionalData: `@use "@/styles/variables.scss" as *;`,
        },
      },
    },
  },
  plugins: [
    uni({
      // FIX: nothing happened, must use UNI_OUTPUT_DIR
      // outputDir: path.resolve(process.cwd(), 'dist', process.env.UNI_PLATFORM ?? 'h5'),
      // https://github.com/dcloudio/uni-app/issues/3248
      vueOptions: {
        reactivityTransform: true,
      },
      viteLegacyOptions: {
        targets: ['defaults', 'android >= 6', 'ios >= 10'],
      },
    }),
    env({
      prefix: 'VITE',
    }),
    eslint({
      fix: true,
    }),
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
