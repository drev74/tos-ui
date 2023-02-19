import vue from "@vitejs/plugin-vue";
import path from "path";

export default {
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      src: path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
    includeSource: ["src/**/*.{js,ts,vue}"],
    exclude: ["node_modules"],
  },
};
