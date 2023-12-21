import styles from "./styles.module.scss";
import image from "../../../../public/sections/section31/image1.jpg";
import CurvedLines from "@/design/CurvedLines/CurvedLines";
import Image from "next/image";
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

const Section31 = ({ sectionData }: props) => {
  return (
    <section className={`${styles.section}`}>
      <article>
        <h2>{sectionData.title}</h2>
        <CurvedLines></CurvedLines>
        <div className={`${styles.wrapper}`} role="group">
          {sectionData.paragraphs.map((paragraphData) => {
            const { id, content } = paragraphData;

            return (
              <p className={`${styles.caption1}`} key={id}>
                {content}
              </p>
            );
          })}

          <Button style={{ padding: "20px 30px 20px 30px" }} changeRoute="/#mainForm">
            Wyceń swój tekst
          </Button>
        </div>
      </article>
      <div className={`${styles.image_wrapper}`}>
        <Image src={image} alt="Pracujący człowiek"></Image>
      </div>
    </section>
  );
};

export default Section31;
