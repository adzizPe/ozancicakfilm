import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

// ========================================
// 🔧 MAINTENANCE MODE - Set to false to enable the website
// ========================================
const MAINTENANCE_MODE = true;
// ========================================

export const metadata: Metadata = {
  title: MAINTENANCE_MODE ? "ZanStream - Sedang Dalam Perbaikan" : "ZanStream - Streaming Film & Series Terbaik",
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

// Maintenance Page Component
function MaintenancePage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)',
      color: '#fff',
      textAlign: 'center',
      padding: '20px',
    }}>
      {/* Animated Icon */}
      <div style={{
        fontSize: '80px',
        marginBottom: '30px',
        animation: 'pulse 2s infinite',
      }}>
        🔧
      </div>

      {/* Title */}
      <h1 style={{
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        fontWeight: 800,
        marginBottom: '20px',
        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        Sedang Dalam Perbaikan
      </h1>

      {/* Subtitle */}
      <p style={{
        fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
        color: '#a0aec0',
        maxWidth: '600px',
        marginBottom: '40px',
        lineHeight: 1.6,
      }}>
        KALAU MAU WEB INI BISA , HUBUNGI WA KU
      </p>

      {/* Loading Bar */}
      <div style={{
        width: '200px',
        height: '4px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '4px',
        overflow: 'hidden',
        marginBottom: '40px',
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
          animation: 'loading 1.5s infinite',
        }} />
      </div>

      {/* Brand */}
      <p style={{
        fontSize: '1.2rem',
        fontWeight: 600,
        color: '#667eea',
      }}>
        ZanStream
      </p>

      {/* Inline Keyframes */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // If maintenance mode is ON, show maintenance page
  if (MAINTENANCE_MODE) {
    return (
      <html lang="id">
        <body className={inter.className}>
          <MaintenancePage />
        </body>
      </html>
    );
  }

  // Normal mode
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
