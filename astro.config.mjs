// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://annaogaksel.no",
  integrations: [react()],
  experimental: {
    fonts: [
      {
        name: "Ysabeau Office",
        cssVariable: "--font-ysabeau-office",
        provider: fontProviders.google(),
      },
      {
        name: "Inter",
        cssVariable: "--font-inter",
        provider: fontProviders.google(),
      },
    ],
  },
});
