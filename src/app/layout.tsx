import type { Metadata, Viewport } from "next";
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
  title: "EG Health Solutions — Plataforma Institucional de Gestión Clínica",
  description:
    "EG Health Solutions integra operación clínica, gestión de talleres, interoperabilidad SOAP y administración de múltiples centros médicos.",
  keywords: "eg health solutions, gestión clínica, SOAP, talleres de acompañamiento, centros médicos",
  openGraph: {
    title: "EG Health Solutions — Plataforma Institucional de Gestión Clínica",
    description:
      "Operación clínica unificada con integración SOAP, talleres de acompañamiento y gestión multi-centro.",
    url: "https://eghealthsolutions.com.ar",
    siteName: "EG Health Solutions",
    type: "website",
  },
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "name": "EG Health Solutions",
              "url": "https://eghealthsolutions.com.ar",
              "description": "Plataforma institucional para gestión clínica, integración SOAP, talleres de acompañamiento y administración de múltiples centros médicos.",
              "telephone": "+541138492392",
              "serviceType": "Gestión Clínica Integral",
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
