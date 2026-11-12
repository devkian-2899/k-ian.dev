import { Inter, Source_Serif_4 } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-work-serif",
});

/** Showcase routes use Inter + serif headings; the CV at `/` stays document-style Arial. */
export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <div className={`work-shell ${inter.variable} ${sourceSerif.variable}`}>{children}</div>;
}
