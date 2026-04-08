import type { Metadata } from "next";
import { DM_Serif_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import StoreProvider from "@/components/StoreProvider";
import ThemeRegistry from "@/components/ThemeRegistry";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Round Finder",
  description: "Find golf tee times in the Boston area",
  openGraph: {
    title: "Round Finder",
    description: "Find golf tee times in the Boston area",
    url: "https://round-finder.com",
    siteName: "Round Finder",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Round Finder",
    description: "Find golf tee times in the Boston area",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSerifDisplay.variable}>
      <body>
        <StoreProvider>
          <ThemeRegistry>{children}</ThemeRegistry>
        </StoreProvider>
        <Analytics />
      </body>
    </html>
  );
}
