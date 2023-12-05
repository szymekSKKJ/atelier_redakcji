import styles from "./styles.module.scss";
import star from "../../../../../public/star.svg";
import Image from "next/image";
import CurvedLines from "@/globalComponents/CurvedLines/CurvedLines";
import OpinionsGallery from "./OpinionsGallery/OpinionsGallery";

const Section6 = () => {
  return (
    <section className={`${styles.section}`}>
      <div className={`${styles.stars}`}>
        <Image src={star} alt="Ikonka gwiazdki"></Image>
        <Image src={star} alt="Ikonka gwiazdki"></Image>
        <Image src={star} alt="Ikonka gwiazdki"></Image>
        <Image src={star} alt="Ikonka gwiazdki"></Image>
        <Image src={star} alt="Ikonka gwiazdki"></Image>
      </div>
      <header>
        <h2>
          <mark>Opinie</mark> naszych klientów
        </h2>
        <CurvedLines></CurvedLines>
        <p>
          Nasi <mark>zleceniodawcy cenią sobie współpracę z nami</mark>, a to powód <br></br>do satysfakcji i dumy, który wiele dla nas znaczy
        </p>
      </header>
      <OpinionsGallery></OpinionsGallery>
    </section>
  );
};

export default Section6;
