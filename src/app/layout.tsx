import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import './globals.css';
import './modern.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EG Health Solutions — Soluciones Innovadoras en Salud",
  description: "EG Health Solutions ofrece servicios integrales de salud y bienestar. Somos expertos en soluciones de salud innovadoras para tu empresa.",
  keywords: "eg health solutions, salud, bienestar, servicios de salud",
  openGraph: {
    title: "EG Health Solutions — Soluciones Innovadoras en Salud",
    description: "EG Health Solutions ofrece servicios integrales de salud y bienestar.",
    url: "https://eghealthsolutions.com.ar",
    siteName: "EG Health Solutions",
    type: "website",
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "name": "EG Health Solutions",
              "url": "https://eghealthsolutions.com.ar",
              "description": "EG Health Solutions ofrece servicios integrales de salud y bienestar. Somos expertos en soluciones de salud innovadoras para tu empresa.",
              "telephone": "+541138492392",
              "serviceType": "Servicios de Salud y Bienestar",
              "areaServed": "Argentina",
              "sameAs": [
                "https://www.linkedin.com/company/eghealtsolutions"
              ]
            })
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
