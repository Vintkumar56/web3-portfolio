import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CursorGlow } from "@/components/CursorGlow";
import { ParticleField } from "@/components/ParticleField";
import { HackerModeProvider } from "@/contexts/HackerModeContext";
import { HackerModeToggle } from "@/components/HackerModeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vinit | AI & Secure Systems",
  description:
    "AI & Secure Systems Developer building encrypted, scalable and high performance backend systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased cyber-grid`}
      >
        <HackerModeProvider>
          <ScrollProgress />
          <CursorGlow />
          <ParticleField />
          <HackerModeToggle />
          {children}
        </HackerModeProvider>
      </body>
    </html>
  );
}

