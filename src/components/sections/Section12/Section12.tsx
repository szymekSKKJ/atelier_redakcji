import { Mulish } from "next/font/google";
import styles from "./styles.module.scss";

const mulishFont = Mulish({ subsets: ["latin"] });

const Section12 = () => {
  return (
    <header className={`${styles.header}`}>
      <h1>Piszesz licencjat, magisterkę, doktorat? A może książkę lub artykuł?</h1>
      <p>Dobrze, że jesteś! Poprawimy Twój tekst!</p>
      <div className={`${styles.buttons_wrapper}`}>
        <button className={`${mulishFont.className}`}>Poznaj ofertę</button>
        <button className={`${mulishFont.className}`}>Wyślij swój tekst do wyceny</button>
      </div>
    </header>
  );
};

export default Section12;
