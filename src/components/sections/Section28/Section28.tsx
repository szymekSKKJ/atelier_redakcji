import CurvedLines from "@/design/CurvedLines/CurvedLines";
import styles from "./styles.module.scss";

const Section28 = () => {
  return (
    <section className={`${styles.section}`}>
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.wrapper}`}>
          <h2>
            <mark>Na czym polega korekta</mark> pracy licencjackiej?
          </h2>
          <CurvedLines></CurvedLines>
        </div>

        <article>
          <p className={`${styles.caption1}`}>Potocznie często wymiennie używamy terminów korekta i redakcja tekstu.</p>
          <p className={`${styles.caption2}`}>
            Zasadniczo jednak korekta tekstu to końcowa poprawa prac dyplomowych, która polega na poprawieniu błędów językowych, w tym potknięć ortograficznych,
            gramatycznych oraz interpunkcyjnych. W przypadku <mark>prac licencjackich</mark> powszechne są liczne błędy odmiany, niepoprawny zapis liczebników
            oraz literówki.
          </p>
          <p className={`${styles.caption2}`}>
            <mark>Podczas korekty przeanalizujemy wnikliwie tekst pracy</mark> dyplomowej, usuwając przy tym literówki oraz dbając opoprawne stosowanie
            przecinków. Pomożemy tym samym stworzyć treść wolną od błędów i nieprawidłowości, które mogą negatywnie wpłynąć na wizerunek studenta podczas oceny
            pracy.
          </p>
        </article>
      </div>
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.wrapper}`}>
          <h2>
            <mark>Redakcja i formatowanie</mark> prac licencjackich
          </h2>
          <CurvedLines></CurvedLines>
        </div>

        <article>
          <p className={`${styles.caption1}`}>
            Praca licencjacka często wymaga jednak redakcji, czyli korekty językowej i technicznej, która oprócz poprawienia wspomnianych powyżej błędów,
            obejmuje także formatowanie pracy licencjackiej, adiustację oraz podkreślenie błędów logicznych.
          </p>
          <p>
            Zwrócimy uwagę na ewentualne podstawowe błędy merytoryczne oraz brak spójności tekstu, kładąc nacisk na konieczność precyzyjnego formułowania myśli
            i wniosków. Zweryfikujemy przy tym poprawność terminów specjalistycznych, dzięki czemu Twój tekst zachowa profesjonalny i naukowy charakter.
            Ujednolicimy zapis aparatu naukowego, cytatów oraz nagłówków, dzięki czemu pomożemy stworzyć jasną i przejrzystą strukturę.
          </p>
          <p>
            Usługi formatowania prac odgrywają kluczową rolę w porządkowaniu wszystkich elementów pracy według ustalonych przez daną uczelnię standardów i
            wytycznych.
          </p>
        </article>
      </div>
    </section>
  );
};

export default Section28;
