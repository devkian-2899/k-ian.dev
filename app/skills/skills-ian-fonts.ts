import { IBM_Plex_Sans, Merriweather } from "next/font/google";

/** Primary reading face for the Drivkian card. */
export const ianPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ian-plex",
});

/** Secondary supporting face for the Drivkian card. */
export const ianMerriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-ian-merriweather",
});
