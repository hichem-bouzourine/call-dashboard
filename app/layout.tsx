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
          <div className="mt-5 p-5 overflow-hidden">
            <section className="w-full flex flex-col items-center">
              <h1 className="head_text text-center my-10">
                Call Dashboard
                <span className="ml-5 orange_gradient text-center">- Rounded</span>
              </h1>
            </section>
            {children}
          </div>
        </div>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
