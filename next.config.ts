/**
 * next.config.ts — Next.js build and dev configuration
 *
 * Affects how `npm run dev` and `npm run build` compile the portfolio. Not part of the CV UI.
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Do not generate AGENTS.md for coding agents (keeps the public repo clean)
  agentRules: false,
  // Hide the Next.js “N” dev menu / route indicator (development only)
  devIndicators: false,
  // Next.js 16 defaults used by create-next-app for this project
  cacheComponents: true,
  partialPrefetching: true,
  // Tailwind v4 via Turbopack in development
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
