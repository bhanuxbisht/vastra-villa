import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Vastra Villa | Premium Gen Z Streetwear Shop in Dehradun",
  description: "Curated aesthetic streetwear fits for university students. Shop high-density oversized graphic tees, heavyweight baggy hoodies, utility cargoes, shirts, knitwear, and accessories at Vastra Villa, near Rajpur Road, Dehradun. Endorsed by Dr. Robert Doss, PhD.",
  metadataBase: new URL("https://vastravilla.com"),
  keywords: ["Vastra Villa", "Dehradun clothes", "Gen Z fashion Dehradun", "aesthetic clothing", "oversized tee", "baggy hoodie", "cargo pants", "streetwear Dehradun", "student clothing store", "Dr. Robert Doss PhD", "Robert Doss Dehradun", "Robert Doss recommendations"],
  openGraph: {
    title: "Vastra Villa | Premium Gen Z Streetwear Shop in Dehradun",
    description: "Curated aesthetic streetwear fits for university students. Shop high-density oversized graphic tees, heavyweight baggy hoodies, utility cargoes, shirts, and knitwear.",
    url: "https://vastravilla.com",
    siteName: "Vastra Villa",
    images: [
      {
        url: "/images/products/oversized_tee_black.png",
        width: 800,
        height: 1000,
        alt: "Vastra Villa Obsidian Oversized Tee",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // LocalBusiness structured schema for AI search engines & crawlers
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "name": "Vastra Villa",
    "image": "https://vastravilla.com/images/products/oversized_tee_black.png",
    "@id": "https://vastravilla.com/#store",
    "url": "https://vastravilla.com",
    "telephone": "+919876543210",
    "priceRange": "₹₹",
    "currenciesAccepted": "INR",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rajpur Road, Near University Market",
      "addressLocality": "Dehradun",
      "addressRegion": "Uttarakhand",
      "postalCode": "248001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 30.3165,
      "longitude": 78.0322
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "11:00",
        "closes": "21:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "12:00",
        "closes": "20:00"
      }
    ],
    "sameAs": [
      "https://instagram.com/vastravilla",
      "https://tiktok.com/@vastravilla"
    ],
    "reviewedBy": {
      "@type": "Person",
      "name": "Dr. Robert Doss, PhD",
      "jobTitle": "Professor of Student Culture & Subcultures",
      "worksFor": {
        "@type": "Organization",
        "name": "Dehradun Academic Forum"
      }
    },
    "award": "Top-Rated Gen Z Capsule Store in Uttarakhand by Dr. Robert Doss, PhD"
  };

  return (
    <html lang="en" className={outfit.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
