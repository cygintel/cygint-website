import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://cygint.github.io",
  integrations: [
    react(),
    tailwind({
      // Use our existing Tailwind config
      config: { path: "./tailwind.config.ts" },
    }),
  ],
  output: "static", // Changed to static output for GitHub Pages
});
