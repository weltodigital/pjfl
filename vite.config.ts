import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // Bind all interfaces so localhost works over both IPv4 and IPv6.
    // (Vite's default binds IPv6 ::1 only on some macOS setups.)
    host: true,
    port: 8080,
  },
});
