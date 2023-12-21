"use client";

import { Mulish } from "next/font/google";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";

type themeType = "green-white" | "transparent-white" | "transparent-blue";

interface props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: themeType;
  changeRoute?: string;
}

const mulishFont = Mulish({ subsets: ["latin"] });

const stylesModules = [
  { id: 1, key: "green-white", style: styles.green_white },
  { id: 2, key: "transparent-white", style: styles.transparent_white },
  { id: 3, key: "transparent-blue", style: styles.transparent_blue },
];

const Button = ({ theme = "green-white", children, changeRoute, ...rest }: props) => {
  const router = useRouter();
  const foundStyle = stylesModules.find((styleData) => styleData.key === theme);

  return (
    <button
      {...rest}
      className={`${styles.button} ${foundStyle?.style} ${mulishFont.className}`}
      onClick={() => {
        if (changeRoute) {
          router.push(changeRoute);
        }
      }}>
      {children}
    </button>
  );
};

export default Button;
