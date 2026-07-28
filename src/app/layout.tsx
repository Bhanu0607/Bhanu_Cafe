import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bhanu Cyber Cafe — Your One-Stop Digital Service Center",
  description:
    "Bhanu Cyber Cafe offers government services, online applications, printing, scanning, ticket booking, passport services, PAN card, Aadhaar assistance, and much more. Trusted by 15,000+ customers.",
  keywords: [
    "cyber cafe",
    "digital services",
    "passport application",
    "PAN card",
    "Aadhaar update",
    "printing services",
    "ticket booking",
    "online form filling",
    "government services",
    "Bhanu Cyber Cafe",
  ],
  authors: [{ name: "Bhanu Cyber Cafe" }],
  openGraph: {
    title: "Bhanu Cyber Cafe — Your One-Stop Digital Service Center",
    description:
      "Government services, printing, scanning, ticket booking, and 100+ digital services under one roof.",
    type: "website",
    locale: "en_IN",
    siteName: "Bhanu Cyber Cafe",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhanu Cyber Cafe — Your One-Stop Digital Service Center",
    description:
      "Government services, printing, scanning, ticket booking, and 100+ digital services under one roof.",
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
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Bhanu Cyber Cafe",
              description:
                "One-stop digital service center offering government services, printing, scanning, ticket booking, and more.",
              url: "https://bhanucybercafe.com",
              telephone: "+91-99999-99999",
              email: "info@bhanucybercafe.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Main Road, City Center",
                addressLocality: "Your City",
                postalCode: "000000",
                addressCountry: "IN",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  opens: "09:00",
                  closes: "20:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Sunday",
                  opens: "10:00",
                  closes: "16:00",
                },
              ],
              priceRange: "₹",
              servesCuisine: undefined,
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Digital Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Government Services",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Printing & Documentation",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Travel Booking",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
