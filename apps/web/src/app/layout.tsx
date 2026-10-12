import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { siteUrl } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "MotionLab — Make it move.", template: "%s — MotionLab" },
  description:
    "Original, accessible motion components for React. Built to experiment. Ready to ship.",
  applicationName: "MotionLab",
  keywords: ["React animation", "motion components", "React UI", "creative development"],
  openGraph: {
    type: "website",
    title: "MotionLab — Make it move.",
    description: "A collection of unapologetically animated React components.",
    images: [`${siteUrl}/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: "MotionLab — Make it move.",
    images: [`${siteUrl}/opengraph-image`],
  },
};

const themeScript = `try{const t=localStorage.getItem('motionlab-theme')||'system';const d=t==='system'?matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light':t;document.documentElement.dataset.theme=d}catch{document.documentElement.dataset.theme='light'}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
