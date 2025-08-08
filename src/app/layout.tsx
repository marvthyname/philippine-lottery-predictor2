import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ResponseLogger } from "@/components/response-logger";
import { cookies } from "next/headers";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#4f46e5",
};

export const metadata: Metadata = {
  title: "Philippine Lottery Predictor",
  description: "AI-powered Philippine PCSO lottery predictions with premium Swertres features. Install as app for offline access.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Lotto Predict PH",
  },
  formatDetection: { telephone: false },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const requestId = cookies().get("x-request-id")?.value;
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head />
      <body>
        {requestId && <ResponseLogger id={requestId} />}
        {children}
      </body>
    </html>
  );
}
