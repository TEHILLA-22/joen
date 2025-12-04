import "~/styles/globals.css";
import { MobileNav } from '~/components/ui/MobileNav'; 

import { type Metadata } from "next";
import { Geist } from "next/font/google";

// import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: 'Joenise - B2B Wholesale Marketplace',
  description: 'Connect businesses with bulk suppliers in a seamless, secure, and scalable marketplace',
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <MobileNav />
         <main>{children}</main>
      </body>
    </html>
  );
}
