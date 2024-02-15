import Button from "@/components/UI/Button/Button";
import styles from "./styles.module.scss";

const Section13 = ({ fullscreen = false, blog = false, allCategoriesPage = false }) => {
  return (
    <header
      className={`${styles.header} ${fullscreen ? styles.fullscreen : ""} ${blog ? styles.blog : ""} ${allCategoriesPage ? styles.allCategoriesPage : ""}`}>
      <h1>Terminy gonią i jesteś już zmęczony/a szukaniem błędów w swoim tekście?</h1>
      <p className={`${styles.caption1}`}>Chcesz już mieć czas dla siebie i bez zmartwień móc w spokoju spotkać się ze znajomymi?</p>
      <Button style={{ padding: "20px 30px 20px 30px", whiteSpace: "pre-wrap" }} changeRoute="/#mainForm">
        {fullscreen || allCategoriesPage ? "Skorzystaj z pomocy specjalisty  " : "Wyceń swój tekst"}
      </Button>
    </header>
  );
};

export default Section13;
