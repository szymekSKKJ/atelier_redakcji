import { Mulish } from "next/font/google";
import "./global.scss";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";

const mulishFont = Mulish({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="height=device-height, width=device-width, initial-scale=1.0, minimum-scale=1.0, target-densitydpi=device-dpi" />
        <script src="https://kit.fontawesome.com/845eb6a366.js" async></script>
      </head>
      <body className={mulishFont.className}>
        {children}
        <Analytics />
        <SpeedInsights />
        {/* <GoogleAnalytics gaId={}></GoogleAnalytics> */}
      </body>
    </html>
  );
}
