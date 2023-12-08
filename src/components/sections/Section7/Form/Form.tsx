import { Mulish } from "next/font/google";
import styles from "./styles.module.scss";
import document from "../../../../../public/document.svg";
import Image from "next/image";

const mulishFont = Mulish({ subsets: ["latin"] });

const Form = () => {
  return (
    <form className={`${styles.form}`}>
      <p>1. Dane kontaktowe:</p>
      <div className={`${styles.inputs_wrapper}`}>
        <div className={`${styles.input_wrapper}`}>
          <label className={`${styles.placeholder_name}`}>
            Imię <p className={`${styles.mandatory_field}`}>(pole obowiązkowe)</p>
          </label>
          <input type="text" placeholder="Imię" pattern="[A-Za-z0-9]{1,20}" required></input>
        </div>
        <div className={`${styles.input_wrapper}`}>
          <label className={`${styles.placeholder_name}`}>
            Adres email <p className={`${styles.mandatory_field}`}>(pole obowiązkowe)</p>
          </label>
          <input type="text" placeholder="Adres email" pattern="[A-Za-z0-9]{1,20}" required></input>
        </div>
        <div className={`${styles.input_wrapper}`}>
          <label className={`${styles.placeholder_name}`}>Numer telefonu</label>
          <input type="text" placeholder="Numer telefonu" pattern="[A-Za-z0-9]{1,20}" required></input>
        </div>
        <div className={`${styles.input_wrapper}`}>
          <label className={`${styles.placeholder_name}`}>
            Nazwa firmy <p className={`${styles.mandatory_field}`}>(pole obowiązkowe)</p>
          </label>
          <input type="text" placeholder="Nazwa firmy" pattern="[A-Za-z0-9]{1,20}" required></input>
        </div>
      </div>
      <p>2. Informacje dotyczące Twojego tekstu:</p>
      <div className={`${styles.inputs_wrapper}`}>
        <div className={`${styles.input_wrapper}`}>
          <label className={`${styles.placeholder_name}`}>
            Rodzaj tekstu <p className={`${styles.mandatory_field}`}>(pole obowiązkowe)</p>
          </label>
          <input type="text" placeholder="Rodzaj tekstu" pattern="[A-Za-z0-9]{1,20}" required></input>
        </div>
        <div className={`${styles.input_wrapper}`}>
          <label className={`${styles.placeholder_name}`}>
            Termin realizacji <p className={`${styles.mandatory_field}`}>(pole obowiązkowe)</p>
          </label>
          <input type="text" placeholder="Termin realizacji" pattern="[A-Za-z0-9]{1,20}" required></input>
        </div>
        <div className={`${styles.input_wrapper}`}>
          <label className={`${styles.placeholder_name}`}>Ilość stron</label>
          <input type="text" placeholder="Ilość stron" pattern="[A-Za-z0-9]{1,20}" required></input>
        </div>
        <div className={`${styles.input_wrapper}`}>
          <label className={`${styles.placeholder_name}`}>
            Ilośc znaków ze spacją <p className={`${styles.mandatory_field}`}>(pole obowiązkowe)</p>
          </label>
          <input type="text" placeholder="Ilośc znaków ze spacją" pattern="[A-Za-z0-9]{1,20}" required></input>
        </div>
      </div>
      <div className={`${styles.input_wrapper}`}>
        <label className={`${styles.placeholder_name}`}>
          Temat przewodni utworu <p className={`${styles.mandatory_field}`}>(pole obowiązkowe)</p>
        </label>
        <input type="text" placeholder="Temat przewodni utworu" pattern="[A-Za-z0-9]{1,20}" required></input>
      </div>
      <div className={`${styles.input_wrapper} ${styles.checkboxs}`}>
        <label className={`${styles.placeholder_name}`}>
          Czego potrzebujesz <p className={`${styles.mandatory_field}`}>(pole obowiązkowe)</p>
        </label>
        <div className={`${styles.checkboxs_wrapper}`}>
          <div className={`${styles.wrapper}`}>
            <input type="checkbox" required id="input_99"></input>
            <label htmlFor="input_99">Koretka</label>
          </div>
          <div className={`${styles.wrapper}`}>
            <input type="checkbox" required id="input_98"></input>
            <label htmlFor="input_98">Redakcja</label>
          </div>
          <div className={`${styles.wrapper}`}>
            <input type="checkbox" required id="input_97"></input>
            <label htmlFor="input_97">Formatowanie</label>
          </div>
        </div>
      </div>
      <div className={`${styles.inputs_wrapper}`}>
        <div className={`${styles.input_wrapper} ${styles.textarea_wrapper}`}>
          <label className={`${styles.placeholder_name}`}>
            Dodatkowe informacje
            <p className={`${styles.mandatory_field}`}>Możesz w skrócie opisać, z czym się borykasz w swoim tekście i czego od nas potrzebujesz.</p>
          </label>
          <textarea className={`${mulishFont.className}`} placeholder="Dodatkowe informacje" required></textarea>
        </div>
        <div className={`${styles.input_wrapper} ${styles.drop_down_section_wrapper}`}>
          <label className={`${styles.placeholder_name}`}>
            Załącz plik
            <p className={`${styles.mandatory_field}`}>(Pole obowiązkowe)</p>
          </label>
          <div className={`${styles.drop_down_section}`}>
            <Image src={document} alt="Ikonka dokumentu"></Image>
            <p>
              Przeciągnij plik tutaj lub <mark> wybierz z komputera</mark>
            </p>
          </div>
        </div>
      </div>
      <div className={`${styles.input_wrapper} ${styles.checkboxs} ${styles.agree}`}>
        <div className={`${styles.checkboxs_wrapper}`}>
          <div className={`${styles.wrapper}`}>
            <input type="checkbox" id="agree"></input>
            <label htmlFor="agree">
              Wysyłając zgłoszenie, wyrażasz zgodę na przetwarzanie Twoich danych osobowych w celu odpowiedzi na pytanie. Więcej informacji w Polityce
              prywatności.
            </label>
          </div>
        </div>
      </div>
      <button type="submit">Wyślij zapytanie</button>
    </form>
  );
};

export default Form;
