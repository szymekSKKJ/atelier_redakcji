import { Mulish } from "next/font/google";
import styles from "./styles.module.scss";
import Image from "next/image";
import Button from "@/components/UI/Button/Button";
import document from "../../../../public/document.svg";

const mulishFont = Mulish({ subsets: ["latin"] });

type themeType = "dark" | "light";

const stylesModules = [
  { id: 1, key: "dark", style: styles.dark },
  { id: 2, key: "light", style: styles.light },
];

interface props {
  theme?: themeType;
}

const CustomOfferForm = ({ theme = "dark" }: props) => {
  const foundStyle = stylesModules.find((styleData) => styleData.key === theme);

  return (
    <form className={`${styles.form} ${foundStyle?.style}`}>
      <div className={`${styles.input_wrapper}`}>
        <label>
          Imię<br></br>
          <em>(pole obowiązkowe)</em>
        </label>
        <input pattern="[A-Za-z0-9]{1,20}" required placeholder="Imię"></input>
      </div>
      <div className={`${styles.input_wrapper}`}>
        <label>
          Adres e-mail<br></br>
          <em>(pole obowiązkowe)</em>
        </label>
        <input pattern="[A-Za-z0-9]{1,20}" required placeholder="Adres e-mail"></input>
      </div>
      <div className={`${styles.input_wrapper} ${styles.textarea}`}>
        <label>
          Treść wiadomości<br></br>
          <em>(pole obowiązkowe)</em>
        </label>
        <textarea placeholder="Treść wiadomości" className={`${mulishFont.className}`} required></textarea>
      </div>
      <div className={`${styles.input_wrapper} ${styles.drop_down_section_wrapper}`} role="group">
        <label className={`${styles.placeholder_name}`}>
          Załącz plik<br></br>
        </label>
        <div className={`${styles.drop_down_section}`} role="group">
          <Image src={document} alt="Ikonka dokumentu"></Image>
          <p>
            Przeciągnij plik tutaj lub <mark> wybierz z komputera</mark>
          </p>
        </div>
      </div>
      <div className={`${styles.input_wrapper} ${styles.agree}`}>
        <input id="checkbox1" type="checkbox" required></input>
        <label htmlFor="checkbox1">
          Wysyłając zgłoszenie wyrażasz zgodę na przetwarzanie Twoich danych osobowych w celu odpowiedzi na wiadomość. Więcej informacji w Polityce prywatności
        </label>
      </div>
      <Button style={{ padding: "20px 30px 20px 30px" }}>Wyślij wiadomość</Button>
    </form>
  );
};

export default CustomOfferForm;
