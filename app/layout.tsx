/**
 * app/layout.tsx — Root layout (App Router)
 *
 * Wraps every page: formal CV at `/` and showcase content at `/work`.
 * Imports global CSS once for the whole app and sets HTML metadata for browsers and search.
 */

import type { Metadata, Viewport } from "next";
import { BackToTop } from "./BackToTop";
import "./globals.css";

/** Tab title and short description shown in search results and link previews. */
export const metadata: Metadata = {
  title: "Kaung Khant — Curriculum Vitae",
  description: "Full-stack software developer — Bangkok, Thailand.",
  icons: {
    icon: "/images/Icon.png",
    shortcut: "/images/Icon.png",
    apple: "/images/Icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/**
 * Root layout: `<html>` and `<body>` shell. `{children}` is the active route (the CV on `/`).
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
