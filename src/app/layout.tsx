import type { Metadata } from "next";

import "./global.scss";
import Navigation from "@/globalComponents/Navigation/Navigation";

export const metadata: Metadata = {
  title: "Atelier redakcji - strona główna",
};

import { Mulish } from "next/font/google";
import Footer from "@/globalComponents/Footer/Footer";

const mulishFont = Mulish({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={mulishFont.className}>
        <Navigation></Navigation>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
