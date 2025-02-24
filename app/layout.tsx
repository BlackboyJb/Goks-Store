import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/assets/styles/globals.css'
import { APP_NAME, APP_DESCRIPTION, PUBLIC_DOMAIN } from '@/lib/constants/index'
import { ThemeProvider } from 'next-themes'
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: {
    template: `%$ | Goks Store`,
    default: APP_NAME
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(PUBLIC_DOMAIN)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
      >
        <ThemeProvider attribute='class' defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>

      </body>
    </html>
  );
}
