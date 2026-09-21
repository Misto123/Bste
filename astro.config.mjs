// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://bste.pages.dev",
  integrations: [mdx(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
