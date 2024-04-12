import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import "./globals.css";

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
      <head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </head>
      <body>
        <AppRouterCacheProvider>
        <div className='main'>
          <div className='gradient'></div>
        </div> 
        <div className='app'>
          {children}
        </div>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
