import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3650,
  },
  plugins: [react()],
});
