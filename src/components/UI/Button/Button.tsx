import { Mulish } from "next/font/google";
import styles from "./styles.module.scss";

type themeType = "green-white" | "transparent-white";

interface props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: themeType;
}

const mulishFont = Mulish({ subsets: ["latin"] });

const stylesModules = [
  { id: 1, key: "green-white", style: styles.green_white },
  { id: 2, key: "transparent-white", style: styles.transparent_white },
  { id: 3, key: "transparent-blue", style: styles.transparent_blue },
];

const Button = ({ theme = "green-white", children, ...rest }: props) => {
  const foundStyle = stylesModules.find((styleData) => styleData.key === theme);

  return (
    <button {...rest} className={`${styles.button} ${foundStyle?.style} ${mulishFont.className}`}>
      {children}
    </button>
  );
};

export default Button;
