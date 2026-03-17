import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Display font — sharp, modern, distinctive
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

// Body font — clean, readable
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

// Mono font — code, labels
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "fusion.exe — Discord Bot Developer",
  description:
    "Professional Discord bot developer. Automation, security, ticketing, and custom bots built to scale.",
  keywords: ["Discord bot", "developer", "automation", "fusion.exe"],
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "fusion.exe — Discord Bot Developer",
    description: "Professional Discord bot development services.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} font-body bg-dark-950 text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
