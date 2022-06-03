import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import ElementPlus from "unplugin-element-plus/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), ElementPlus({
    defaultLocale: "zh-cn"
  })],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  server: {
    host: "0.0.0.0"
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import \"./src/style/common.scss\";"
      }
    }
  }
});
