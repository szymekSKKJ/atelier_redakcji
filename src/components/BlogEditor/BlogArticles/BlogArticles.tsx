"use client";

import styles from "./styles.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { blogArticle } from "@/app/api/blog/get/[pathname]/route";
import Image from "next/image";
import Button from "@/components/UI/Button/Button";
import { getMoreArticles } from "../BlogEditor";
import Link from "next/link";
import { category as blogArticleCategory } from "@/app/api/blog/get/some/route";

interface componentsProps {
  blogArticles: {
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
  }[];
  currentSelectedCategory: blogArticleCategory;
}

const BlogArticles = ({ blogArticles, currentSelectedCategory }: componentsProps) => {
  const [areAllArticlesGot, setAreAllArticlesGot] = useState(false);
  const [lastSelectedCategry, setLastSelectedCategry] = useState<blogArticleCategory>(currentSelectedCategory);

  return (
    <>
      <div className={`${styles.blogArticles}`}>
        <Link href="/blogEditor/create" className={`${styles.blogArticle} ${styles.addNew}`}>
          <i className="fa-solid fa-plus" aria-hidden={true}></i>
        </Link>

        {blogArticles.map((blogArticleData) => {
          const { id, title, entry, image, pathname } = blogArticleData;

          return (
            <Link href={`/blogEditor/${pathname}`} className={`${styles.blogArticle}`} key={id}>
              <div className={`${styles.background}`}>{image.url && <Image src={image.url} width={300} height={300} alt="Tło"></Image>}</div>
              <h2>{title}</h2>
              <div className={`${styles.entry}`}>
                <p>{entry[0].content}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <Button
        style={{ padding: "20px 30px 20px 30px", marginLeft: "auto", marginRight: "auto" }}
        onClick={async () => {
          if (areAllArticlesGot === false && currentSelectedCategory) {
            const areAllArticlesGot = await getMoreArticles(currentSelectedCategory !== lastSelectedCategry ? 0 : blogArticles.length, currentSelectedCategory);
            setAreAllArticlesGot(areAllArticlesGot);

            setLastSelectedCategry(currentSelectedCategory);
          }
        }}>
        {areAllArticlesGot ? "To już wszystkie artykuły" : "Zobacz wiecej"}
      </Button>
    </>
  );
};

export default BlogArticles;
