import Button from "../UI/Button/Button";
import styles from "./styles.module.scss";
import Image from "next/image";

interface componentProps {
  articles: {
    id: string;
    image: string;
    title: string;
    brief: string;
    mainImageAlt: string;
  }[];
}

const BlogArticlesBrief = ({ articles }: componentProps) => {
  return (
    <div className={`${styles.articles}`} role="group">
      {articles.map((articleData) => {
        const { id, image, mainImageAlt, title, brief } = articleData;

        return (
          <article key={id}>
            <figure>
              <div className={`${styles.wrapper}`} role="img" aria-label="Zdjęcie">
                <Image height={512} width={512} src={image} alt={mainImageAlt}></Image>
              </div>
              <figcaption>{title}</figcaption>
            </figure>
            <p>{brief}</p>
            <Button theme="transparent-blue" style={{ padding: "20px 30px 20px 30px", fontSize: "16px" }} changeRoute={`/blog/${id}`}>
              Czytaj więcej
            </Button>
          </article>
        );
      })}
    </div>
  );
};

export default BlogArticlesBrief;
