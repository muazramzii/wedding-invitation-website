import type { Metadata, Viewport } from "next";
import {
  Allura,
  Cormorant_Garamond,
  Great_Vibes,
  Italianno,
  Jost,
  Pinyon_Script,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--font-great-vibes" });
const pinyon = Pinyon_Script({ weight: "400", subsets: ["latin"], variable: "--font-pinyon-script" });
const allura = Allura({ weight: "400", subsets: ["latin"], variable: "--font-allura" });
const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
});
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair-display" });
const italianno = Italianno({ weight: "400", subsets: ["latin"], variable: "--font-italianno" });
const jost = Jost({ weight: ["300", "400", "500"], subsets: ["latin"], variable: "--font-jost" });

export const metadata: Metadata = {
  title: "Wedding Invitation",
  description: "Premium interactive wedding invitation.",
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  const fonts = [greatVibes, pinyon, allura, italianno, cormorant, playfair, jost].map((f) => f.variable).join(" ");
  return (
    <html lang="en" className={fonts}>
      <body>{children}</body>
    </html>
  );
}
