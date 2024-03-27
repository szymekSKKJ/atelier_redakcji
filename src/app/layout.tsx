import { Mulish } from "next/font/google";
import "./global.scss";

const mulishFont = Mulish({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script src="https://kit.fontawesome.com/845eb6a366.js" async></script>
      </head>
      <body className={mulishFont.className}>{children}</body>
    </html>
  );
}
