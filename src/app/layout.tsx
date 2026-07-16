import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/lenis-provider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://xude-energy.vercel.app"),
  title: "XUDE Energy Drink",
  description: "Smooth, fruit-flavoured drink with plant-based caffeine and zero sugar. Crafted for people who want energy without the traditional energy drink experience",
  icons: {
    icon: "/assets/xude.png",
  },
  openGraph: {
    images: [
      {
        url: "/assets/Xudebrand.png",
        width: 1200,
        height: 630,
        alt: "Xude Energy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xude Energy",
    description: "Finally, an energy drink for everyone.",
    images: ["/assets/Xudebrand.png"],
  },
  verification: {
    google: "MfdYc1oHHmnZLDj6zrbAUmzRQ-2e4yU56oKRr3Bfryk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
