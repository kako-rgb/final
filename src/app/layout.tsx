import type { Metadata } from "next";
import "./globals.css";
import { FONT_FAMILY } from "@/config";
import Providers from "@/components/providers";

export const metadata: Metadata = {
  title: "E-duka: Shop, Hire, and Sell – All in One Platform",
  description: "E-duka connects buyers, sellers, and service providers in one powerful marketplace. Discover great deals, hire professionals, and grow your business today!",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link 
          rel="preconnect" 
          href="https://fonts.gstatic.com" 
          crossOrigin="" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body className={`${FONT_FAMILY.className} antialiased`} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
