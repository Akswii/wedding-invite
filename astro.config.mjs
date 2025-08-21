// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://akswii.github.io",
  base: "/wedding-invite",
  integrations: [react()],
});