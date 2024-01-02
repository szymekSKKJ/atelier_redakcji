import styles from "./styles.module.scss";
import mail from "../../../../public/mail.svg";
import phone from "../../../../public/phone.svg";
import Image from "next/image";
import phoneBlue from "../../../../public/phone_blue.svg";
import person from "../../../../public/person.jpg";
import CurvedLines from "@/design/CurvedLines/CurvedLines";

const Section10 = () => {
  return (
    <section className={`${styles.section}`}>
      <article className={`${styles.wrapper} ${styles.left}`}>
        <div className={`${styles.image}`} role="img" aria-label="Zdjęcie człowieka z ikonką telefonu">
          <div className={`${styles.wrapper}`} role="img" aria-label="Zdjęcie">
            <Image src={person} alt="person"></Image>
          </div>
          <div className={`${styles.icon}`} role="img" aria-label="Zdjęcie">
            <Image src={phoneBlue} alt="Ikonka telefonu"></Image>
          </div>
        </div>
      </article>
      <article className={`${styles.wrapper} ${styles.right}`}>
        <header>
          <h2>Masz jakieś pytania?</h2>
          <CurvedLines></CurvedLines>
          <p className={`${styles.caption1}`}>Napisz do nas wiadomość na maila lub zadzwoń!</p>
          <p className={`${styles.caption2}`}> Na pewno pomożemy :)</p>
        </header>
        <div className={`${styles.wrapper}`} role="group">
          <span role="group">
            <Image src={phone} alt="Ikonka poczty elektronicznej"></Image> +48 799 163 609
          </span>
          lub
          <span role="group">
            <Image src={mail} alt="Ikonka telefonu "></Image>kontakt@atelier-redakcji.eu
          </span>
        </div>
        <p className={`${styles.caption3}`}>
          Możesz też skorzystać z <mark>naszego formularza.</mark>
        </p>
      </article>
    </section>
  );
};

export default Section10;
