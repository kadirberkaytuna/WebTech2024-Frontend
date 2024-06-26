import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': require('path').resolve(__dirname, './src')
        }
    },
    server: {
        port: 5180
    }
});
