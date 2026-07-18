import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/global/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { getBaseUrl, isProd } from "@/config/site";

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
    default: "Mainak Banerjee - Design Engineer",
    template: "%s | Mainak Banerjee",
  },
  description:
    "Frontend developer turned design engineer. I design and build interactive UI components with production-grade motion, from concept to shipped code.",
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
      )}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
          <div id="portal-root" />
        </ThemeProvider>
      </body>
    </html>
  );
}
