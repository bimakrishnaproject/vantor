import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/animations.css";
import { JsonLd, organizationSchema } from "@/lib/structured-data";
import GsapProvider from "@/components/layout/GsapProvider";
import SmoothScroll from "@/components/layout/SmoothScroll";
import PageTransition from "@/components/layout/PageTransition";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackgroundStadium from "@/components/layout/BackgroundStadium";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vantorventures.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Vantor Ventures",
    default: "Vantor Ventures | Owned Audience Infrastructure",
  },
  description:
    "Vantor Ventures owns and operates audience surfaces across audio, commerce, mobile apps, iGaming, sports, entertainment, and culture for direct media placement.",
  openGraph: {
    type: "website",
    siteName: "Vantor Ventures",
    url: SITE_URL,
    images: ["/images/og-default.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og-default.jpg"],
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
        <JsonLd data={organizationSchema()} />
        <GsapProvider>
          <SmoothScroll>
            <BackgroundStadium />
            <Header />
            <main className="site-main">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </SmoothScroll>
        </GsapProvider>
      </body>
    </html>
  );
}
