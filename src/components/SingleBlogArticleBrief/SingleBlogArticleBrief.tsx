import Button from "../UI/Button/Button";
import styles from "./styles.module.scss";
import Image, { StaticImageData } from "next/image";

interface componentProps {
  image: StaticImageData;
  title: string;
  content: string;
}

const SingleBlogArticleBrief = ({ image, title, content }: componentProps) => {
  return (
    <article className={`${styles.article}`}>
      <figure>
        <div className={`${styles.wrapper}`} role="img" aria-label="Zdjęcie">
          <Image src={image} alt="Cieszący się absolwent"></Image>
        </div>
        <figcaption>{title}</figcaption>
      </figure>
      <p>{content}</p>
      <Button theme="transparent-blue" style={{ padding: "20px 30px 20px 30px", fontSize: "16px" }}>
        Czytaj więcej
      </Button>
    </article>
  );
};

export default SingleBlogArticleBrief;
