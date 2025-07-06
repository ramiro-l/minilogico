import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const latexFont = IBM_Plex_Serif({
  variable: "--font-latex",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Mini Lógico",
  description:
    "Aprende lógica matemática jugando. Ejercicios interactivos con tómbola aleatoria.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${latexFont.variable} bg-white antialiased`}
      >
        <main className="m-auto flex min-h-screen max-w-md">
          <div className="m-auto">{children}</div>
        </main>
      </body>
    </html>
  );
}
