import styles from "./styles.module.scss";
import warning from "../../../../public/warning icon.svg";
import Image from "next/image";
import Button from "@/components/UI/Button/Button";

const Section30 = () => {
  return (
    <section className={`${styles.section}`}>
      <Image src={warning} alt="Ikona uwaga"></Image>
      <div className={`${styles.wrapper}`}>
        <h2>Pamiętaj także o tym, że...</h2>
        <p className={`${styles.caption1}`}>
          Nieprawidłowe formatowanie prac dyplomowych oraz błędy językowe mogą skutkować odrzuceniem tekstu przez promotora!
        </p>
        <p>
          Dopracowanie techniczne świadczy także o Twoim profesjonalizmie i skrupulatności, co pozytywnie wpłynie na budowanie pozycji w środowisku
          uniwersyteckim.
        </p>
        <p>
          Podczas tworzenia pracy naukowej nie powinieneś zapomnieć o swoich czytelnikach. To właśnie w trosce o ich komfort konieczne jest przygotowanie
          odpowiedniej struktury wolnej od błędów technicznych, językowych i merytorycznych.
        </p>
        <Button style={{ padding: "20px 30px 20px 30px" }} changeRoute="/#mainForm">
          Wyceń swój tekst
        </Button>
      </div>
    </section>
  );
};

export default Section30;
