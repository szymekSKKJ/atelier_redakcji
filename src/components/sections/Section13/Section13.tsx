import Button from "@/components/UI/Button/Button";
import styles from "./styles.module.scss";

const Section13 = () => {
  return (
    <header className={`${styles.header}`}>
      <h1>Terminy gonią i jesteś już zmęczony/a szukaniem błędów w swoim tekście?</h1>
      <p className={`${styles.caption1}`}>Chcesz już mieć czas dla siebie i bez zmartwień móc w spokoju spotkać się ze znajomymi?</p>
      <Button style={{ padding: "20px 30px 20px 30px" }} changeRoute="/#mainForm">
        Wyceń swój tekst
      </Button>
    </header>
  );
};

export default Section13;
