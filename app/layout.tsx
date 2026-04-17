import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WABI Studio — Design Web d'Exception",
  description:
    "Studio de design web fondé sur les principes du wabi-sabi. L'épure comme philosophie, l'excellence comme standard.",
  icons: {
    icon: "/WABIcon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
