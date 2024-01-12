import CurvedLines from "@/design/CurvedLines/CurvedLines";
import styles from "./styles.module.scss";
import person1 from "../../../../public/person.webp";
import person2 from "../../../../public/sections/section18/person2.webp";
import Image from "next/image";
import Button from "@/components/UI/Button/Button";

const Section18 = () => {
  return (
    <section className={`${styles.section}`}>
      <div className={`${styles.wrapper1}`}>
        <h2>
          Jesteśmy Atelier redakcji tekstu. <br></br>
          <mark>Poznajmy się!</mark>
        </h2>
        <CurvedLines></CurvedLines>
        <p className={`${styles.caption1}`}>Kilka lat temu znaleźliśmy się wszyscy w odpowiednim miejscu i czasie, aby stworzyć zespół gotowy na niemożliwe.</p>
        <p className={`${styles.caption2}`}>
          To tutaj każda treść niezmiennie od lat nabiera rumieńców i dojrzewa do prezentacji przed najbardziej wymagającą komisją, sędzią czy odbiorcą,
          przeradzając się w to, <mark>na czym zależy nam najbardziej: Twój osobisty sukces.</mark>
        </p>
      </div>
      <div className={`${styles.wrapper2}`}>
        <div className={`${styles.wrapper}`}>
          <Image src={person1} alt="Osoba"></Image>
        </div>
        <article>
          <h2>Kim jesteśmy?</h2>
          <CurvedLines></CurvedLines>
          <p className={`${styles.caption1}`}>
            Jesteśmy grupą redaktorów-pasjonatów i wykwalifikowanych specjalistów w swoim fachu. Wierzymy, że najlepsze treści powstają dzięki rzetelnemu
            „wyczuciu tematu” oraz pełnemu zaangażowaniu w połączeniu z wiedzą i doświadczeniem.
          </p>
          <p className={`${styles.caption2}`}>
            Chcemy stale rozwijać własne kompetencje, dzielić się zapałem do życia i budować mobilizujące relacje. Stanowimy markę o ugruntowanej pozycji, a
            nasze ukochane atelierskie grono Klientów oraz partnerów biznesowych ciągle rośnie w nsiłę. Do tego kręgu z największą przyjemnością zapraszamy i
            Ciebie!
          </p>
          <Button theme="transparent-blue" style={{ padding: "20px 30px 20px 30px", fontSize: "16px" }} changeRoute="/offer">
            Poznaj ofertę
          </Button>
        </article>
      </div>
      <div className={`${styles.wrapper3}`}>
        <article>
          <h2>Kim są nasi klienci?</h2>
          <CurvedLines></CurvedLines>
          <p className={`${styles.caption1}`}>Pracujemy ze studentami, doktorantami, uczniami szkół średnich oraz przedsiębiorcami.</p>
          <p className={`${styles.caption2}`}>
            Od lat dzielimy się pasją do tworzenia, przekraczamy własne granice i stawiamy czoła najbardziej wymagającym wyzwaniom.
          </p>
          <p className={`${styles.caption3}`}>Nasz zespół nie pozwoli Ci odejść bez satysfakcji!</p>
          <Button theme="green-white" style={{ padding: "20px 30px 20px 30px", fontSize: "16px" }} changeRoute="/offer">
            Poznaj ofertę
          </Button>
        </article>
        <div className={`${styles.wrapper}`}>
          <Image src={person2} alt="Osoba"></Image>
        </div>
      </div>
    </section>
  );
};

export default Section18;
