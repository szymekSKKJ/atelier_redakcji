import { blogArticle } from "@/app/api/blog/get/[pathname]/route";
import styles from "./styles.module.scss";
import Image from "next/image";
import Button from "@/components/UI/Button/Button";
import Link from "next/link";

interface componentProps {
  data: {
    image: {
      file: null;
      url: string | null;
    };
    entry: any;
    id: string;
    createdAt: Date;
    title: string;
    pathname: string;
    category: string;
  };
}

const Article = ({ data }: componentProps) => {
  return (
    <article className={`${styles.article}`}>
      <Link href={`/${data.pathname}`}>
        <div className={`${styles.imageWrappper}`}>
          {data.image.url && <Image src={data.image.url} alt="Zdjęcie artykułu" width={600} height={450}></Image>}
          <div className={`${styles.category}`}>
            <p>{data.category}</p>
          </div>
        </div>
        <div className={`${styles.data}`}>
          <p className={`${styles.date}`}>
            {new Date(data.createdAt).toLocaleDateString("pl-PL", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h2>{data.title}</h2>
          <p className={`${styles.entry}`} dangerouslySetInnerHTML={{ __html: data.entry[0].content }}></p>
        </div>
        <Button theme="transparent-blue" style={{ padding: "20px 30px 20px 30px" }}>
          Czytaj więcej
        </Button>
      </Link>
    </article>
  );
};

export default Article;
