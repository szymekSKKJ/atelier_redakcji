import curvedLine from "../../../public/curved_line.svg";
import Image from "next/image";
import styles from "./styles.module.scss";

const CurvedLines = () => {
  return (
    <div className={`${styles.curved_lines}`}>
      <Image src={curvedLine} alt="Krzywa linia"></Image>
      <Image src={curvedLine} alt="Krzywa linia"></Image>
    </div>
  );
};

export default CurvedLines;
