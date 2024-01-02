import type { Metadata } from "next";
import "./global.scss";
import { Mulish } from "next/font/google";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Atelier redakcji - strona główna",
  description: "Test description",
};

const mulishFont = Mulish({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={mulishFont.className}>{children}</body>
    </html>
  );
}
