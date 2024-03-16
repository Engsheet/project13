import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "@a", replacement: "/src/assets" },
      { find: "@c", replacement: "/src/components" },
      { find: "@d", replacement: "/src/data" },
      { find: "@l", replacement: "/src/layout" },
      { find: "@p", replacement: "/src/pages" },
      { find: "@s", replacement: "/src/store" },
      { find: "@u", replacement: "/src/utils" },
      { find: "@h", replacement: "/src/hooks" },
    ],
  },
});
