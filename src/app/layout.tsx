import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CineVista Cinema | Now Showing in Colombo | Book Tickets Online",
  description: "Book cinema tickets online at CineVista Colombo. Now showing: latest Hollywood, Sinhala, Tamil, and Hindi films. Dolby Atmos, IMAX, and VIP Recliner screens.",
  keywords: "CineVista, Cinema Colombo, Book Movies Sri Lanka, IMAX Sri Lanka, Dolby Atmos Colombo, Sinhala Movies, Tamil Movies",
  authors: [{ name: "CineVista (Pvt) Ltd" }],
  metadataBase: new URL("https://cinevista.lk"),
  alternates: {
    canonical: "/",
    languages: {
      "en-LK": "/en",
      "si-LK": "/si",
      "ta-LK": "/ta",
      "hi-LK": "/hi",
    },
  },
  openGraph: {
    title: "CineVista Cinema | Experience Cinema Like Never Before",
    description: "Sri Lanka's most immersive theatrical experience with Dolby Atmos and 4K Laser Projection.",
    url: "https://cinevista.lk",
    siteName: "CineVista",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CineVista Cinema Colombo",
      },
    ],
    locale: "en_LK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CineVista Cinema | Now Showing in Colombo",
    description: "Book tickets for the latest blockbusters at CineVista Colombo.",
    images: ["/assets/og-image.jpg"],
  },
};

import CustomCursor from "@/components/CustomCursor";

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
        {/* Placeholder hreflang tags */}
        <link rel="alternate" href="https://cinevista.lk/en" hrefLang="en" />
        <link rel="alternate" href="https://cinevista.lk/si" hrefLang="si" />
        <link rel="alternate" href="https://cinevista.lk/ta" hrefLang="ta" />
        <link rel="alternate" href="https://cinevista.lk/hi" hrefLang="hi" />
      </head>
      <body className="antialiased">
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
