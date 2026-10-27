import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SiteBackground } from "@/components/SiteBackground";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Vaishnavi Shrivastava — Video Editor & Creative",
  description:
    "Crafting visual stories. Video editor and creative professional specialising in motion graphics, short-form and long-form content, and AI-powered visuals.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <SmoothScroll>
          <ScrollProgress />
          <SiteBackground />
          <Navbar />
          {children}
          <WhatsAppButton number="+91 99817 83744" />
        </SmoothScroll>
      </body>
    </html>
  );
}
