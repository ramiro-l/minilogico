import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Brain } from "lucide-react";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mini Lógico",
  description: "", // TODO: Add a description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-white">
          {/* Header */}
          <header className="px-6 pt-12 pb-8">
            <Link className="flex items-center justify-center" href="/">
              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black shadow-sm">
                  <Brain className="h-7 w-7 text-white" />
                </div>
                <span className="font-bold text-2xl text-black tracking-tight">
                  Mini Lógico
                </span>
              </div>
            </Link>
          </header>

          {children}
        </div>
      </body>
    </html>
  );
}
