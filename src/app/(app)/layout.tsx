import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KOMU",
  description:
    "a community initiative for everyone to learn and share together",
  openGraph: {
    title: "KOMU",
    description:
      "a community initiative for everyone to learn and share together",
    images: [
      {
        url: "https://komu.my/og.png",
      },
    ],
    type: "website",
    siteName: "KOMU",
    url: "https://komu.my",
    locale: "en_MY",
    countryName: "Malaysia",
  },
  twitter: {
    card: "summary_large_image",
    title: "KOMU",
    description:
      "a community initiative for everyone to learn and share together",
    images: ["https://komu.my/og.png"],
  },
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
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen px-6 py-8 gap-16 sm:p-20 text-secondary">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
