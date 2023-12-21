import styles from "./styles.module.scss";
import SearchInput from "./SearchInput/SearchInput";

const Section33 = () => {
  return (
    <section className={`${styles.section}`}>
      <p>
        <mark>Szukasz </mark>konkretnego tematu?
      </p>
      <SearchInput></SearchInput>
    </section>
  );
};

export default Section33;
