import styles from "./styles.module.scss";
import Image from "next/image";
import documentBlue from "../../../../public/document_blue.svg";
import Button from "@/components/UI/Button/Button";

const Section11 = () => {
  return (
    <section className={`${styles.section}`}>
      <Image className={`${styles.icon}`} src={documentBlue} alt="Ikonka dokumentu"></Image>
      <header>
        <h2>
          A może <mark>jesteś już zdecydowany/a</mark> i chcesz zostawić nam swój tekst do korekty?
        </h2>
        <p className={`${styles.caption1}`}>
          Skorzystaj zatem z prostego i intuicyjnego formularza, w którym wstawisz swój plik, a my wrócimy do Ciebie zi nformacjami i wyceną.
        </p>
      </header>
      <Button style={{ padding: "20px 30px 20px 30px", fontSize: "16px" }}>Wyceń swój tekst</Button>
    </section>
  );
};

export default Section11;
