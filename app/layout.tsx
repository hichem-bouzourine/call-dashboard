import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Call Dashboard",
  description: "Call dashboard for your phone calls",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <div className='main'>
        <div className='gradient'></div>
      </div>

      <div className='app'>
        {children}
      </div>
    </html>
  );
}
