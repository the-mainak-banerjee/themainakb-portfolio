import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/global/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { getBaseUrl, isProd } from "@/config/site";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: "Mainak Banerjee - Applied AI Enginner",
    template: "%s | Mainak Banerjee",
  },
  description:
    "Frontend Engineer transitioning into Applied AI Engineering. I design and build interactive, AI-powered products with production-grade UI, thoughtful UX, and reliable engineering — turning ideas from concept into shipped code.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    images: ["/opengraph-image"],
  },
  robots: {
    index: isProd(),
    follow: isProd(),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        spaceGrotesk.variable,
        montserrat.variable,
      )}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
          <div id="portal-root" />
        </ThemeProvider>
      </body>
    </html>
  );
}
