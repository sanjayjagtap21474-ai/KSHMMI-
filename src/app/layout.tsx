import type { Metadata, Viewport } from "next";
import { Playfair_Display, Cormorant_Garamond, Great_Vibes, Crimson_Text } from "next/font/google";
import "../styles/globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-handwritten",
  weight: "400",
  display: "swap",
});

const crimson = Crimson_Text({
  subsets: ["latin"],
  variable: "--font-label",
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KSHMMI - Vintage Botanical Perfumes",
  description: "Discover handcrafted perfumes inspired by magical gardens. Enter our illustrated world of vintage botanical fragrances.",
  keywords: ["perfume", "botanical", "vintage", "handcrafted", "fragrance", "luxury"],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${playfair.variable} ${cormorant.variable} ${greatVibes.variable} ${crimson.variable}`}>
        {children}
      </body>
    </html>
  );
}
