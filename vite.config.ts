import path from "path";
import { defineConfig } from "vite";
import px2rem from "postcss-plugin-px2rem";
import postcssPresetEnv from "postcss-preset-env";
import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@types": path.resolve(__dirname, "src/types"),
      "@util": path.resolve(__dirname, "src/utils"),
    },
  },
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv(),
        px2rem({
          rootValue: 16,
          propBlackList: ["font-size", "border", "border-width"],
          exclude: /(node_module)/,
        }),
      ],
    },
  },
  plugins: [
    vue(),
    legacy({
      targets: [
        "Android >= 39",
        "Chrome >= 50",
        "Safari >= 10.1",
        "iOS >= 10.3",
        "> 1%",
      ],
    }),
  ],
  build: {
    emptyOutDir: true,
    minify: "terser",
    terserOptions: {
      toplevel: true,
      safari10: true,
    },
    rollupOptions: {
      // https://rollupjs.org/guide/en/#outputmanualchunks
      output: {
        manualChunks: {},
      },
    },
  },
});
