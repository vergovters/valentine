import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// Для Netlify / Vercel застосунок розгортається з кореня домену,
// тому base має бути "/" (або можна взагалі не вказувати).
export default defineConfig({
  base: "/",
  plugins: [react()],
});
