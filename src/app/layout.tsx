import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZanStream - Streaming Film & Series Terbaik",
  description: "Platform streaming terbaik untuk menonton film dan series favoritmu. Nikmati ribuan konten berkualitas HD kapan saja, di mana saja.",
  keywords: "streaming, film, series, movie, drama, anime, kdrama, nonton online",
  openGraph: {
    title: "ZanStream - Streaming Film & Series Terbaik",
    description: "Platform streaming terbaik untuk menonton film dan series favoritmu.",
    type: "website",
  },
  icons: {
    icon: 'https://www.youtube.com/s/desktop/1a403d6d/img/favicon_144x144.png?v=2',
    shortcut: 'https://www.youtube.com/s/desktop/1a403d6d/img/favicon.ico?v=2',
    apple: 'https://www.youtube.com/s/desktop/1a403d6d/img/favicon_144x144.png?v=2',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
