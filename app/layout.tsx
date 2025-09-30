import '@radix-ui/themes/styles.css';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar";
import {Theme} from '@radix-ui/themes';
import AuthProvider from './AuthProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Issue Tracker",
    template: "%s | Issue Tracker",
  },
  description: "A comprehensive issue tracking system to manage and organize project issues effectively.",
  keywords: ["issue tracker", "bug tracker", "project management", "task management"],
  authors: [{ name: "Your Name" }],
  creator: "Issue Tracker Team",
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "http://localhost:3000",
    title: "Issue Tracker",
    description: "A comprehensive issue tracking system to manage and organize project issues effectively.",
    siteName: "Issue Tracker",
  },
  twitter: {
    card: "summary_large_image",
    title: "Issue Tracker",
    description: "A comprehensive issue tracking system to manage and organize project issues effectively.",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Theme>
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </Theme>
      </body>
    </html>
  );
}
