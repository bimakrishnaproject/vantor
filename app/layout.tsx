import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { ScrollProgressIndicator } from "@/components/ScrollProgressIndicator";
import { LoadingScreen } from "@/components/LoadingScreen";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ParticleFieldWrapper } from "@/components/ParticleFieldWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Vantor Ventures | Reach That Converts",
    template: "%s | Vantor Ventures",
  },
  description:
    "The Home for Sports & Entertainment's Largest and Most Engaged Communities. Built at the intersection of organic and paid media.",
  keywords: [
    "media buying",
    "sports marketing",
    "entertainment marketing",
    "fan communities",
    "social media advertising",
    "CPM",
    "native placements",
  ],
  openGraph: {
    title: "Vantor Ventures | Reach That Converts",
    description:
      "The Home for Sports & Entertainment's Largest and Most Engaged Communities.",
    type: "website",
    locale: "en_US",
    siteName: "Vantor Ventures",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vantor Ventures | Reach That Converts",
    description:
      "The Home for Sports & Entertainment's Largest and Most Engaged Communities.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        {/* Cinematic smooth scrolling provider */}
        <SmoothScroll>
          {/* Cinematic loading screen */}
          <LoadingScreen />

          {/* Custom cursor with glow trail */}
          <CustomCursor />

          {/* Noise texture overlay */}
          <div className="noise-overlay" aria-hidden="true" />

          {/* Three.js particle field — persistent across all pages */}
          <ParticleFieldWrapper />

          {/* Navigation */}
          <Navbar />

          {/* Scroll progress */}
          <ScrollProgressIndicator />

          {/* Main content */}
          <main className="relative perspective-wrapper">{children}</main>

          {/* Footer */}
          <Footer />

          {/* Floating CTA */}
          <FloatingCTA />
        </SmoothScroll>
      </body>
    </html>
  );
}
