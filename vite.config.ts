import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Add plugins and configure base for GitHub Pages deployment.
// Change 'base' to "/" for user/org pages (e.g., https://USERNAME.github.io/)
// or "/REPOSITORY_NAME/" for project pages (e.g., https://USERNAME.github.io/REPOSITORY_NAME/)
export default defineConfig({
  plugins: [react()],
  base: "/before-you-close-your-mind/", // Update this to match your GitHub repo name or "/" for user pages
});
