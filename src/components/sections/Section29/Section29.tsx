import styles from "./styles.module.scss";
import image from "../../../../public/sections/section29/image1.webp";
import Image from "next/image";
import CurvedLines from "@/design/CurvedLines/CurvedLines";
import Button from "@/components/UI/Button/Button";

interface props {
  sectionData: {
    title: JSX.Element;
    paragraphs: {
      id: number;
      content: JSX.Element;
    }[];
  };
}

const Section29 = ({ sectionData }: props) => {
  return (
    <section className={`${styles.section}`}>
      <div className={`${styles.image_wrapper}`} role="img">
        <Image src={image} alt="Komputer"></Image>
      </div>
      <article>
        <h2>{sectionData.title}</h2>
        <CurvedLines></CurvedLines>
        <div className={`${styles.wrapper}`} role="group">
          {sectionData.paragraphs.map((paragraphData, index) => {
            const { id, content } = paragraphData;

            return (
              <p className={`${index === 0 ? styles.caption1 : styles.caption2}`} key={id}>
                {content}
              </p>
            );
          })}
          <Button style={{ padding: "20px 30px 20px 30px", fontSize: "16px" }} changeRoute="/#mainForm">
            Wyceń swój tekst
          </Button>
        </div>
      </article>
    </section>
  );
};

export default Section29;
