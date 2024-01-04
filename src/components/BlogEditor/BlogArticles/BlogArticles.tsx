"use client";

import styles from "./styles.module.scss";
import Image from "next/image";
import getBlogArticlesBrief from "@/api/blog/getBlogArticlesBrief";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "@/components/UI/Button/Button";
import { blogArticlesBriefSignalData } from "../BlogEditor";
import { useSignals } from "@preact/signals-react/runtime";

interface componentsProps {
  setCurrentActiveBlogId: Dispatch<SetStateAction<string | null>>;
  setDisplayEditor: Dispatch<SetStateAction<boolean>>;
}

const BlogArticles = ({ setCurrentActiveBlogId, setDisplayEditor }: componentsProps) => {
  useSignals();

  const [areAllArticlesLoaded, setAreAllArticlesLoaded] = useState(false);

  useEffect(() => {
    if (blogArticlesBriefSignalData.value === null) {
      (async () => {
        const blogArticles = await getBlogArticlesBrief(10);
        blogArticlesBriefSignalData.value = blogArticles;
      })();
    }
  }, []);

  return (
    <>
      <div className={`${styles.blog_articles}`}>
        {blogArticlesBriefSignalData.value &&
          blogArticlesBriefSignalData.value.map((blogArticleData) => {
            const { id, image, title, brief } = blogArticleData;

            return (
              <div
                className={`${styles.blog_article}`}
                key={id}
                onClick={() => {
                  setCurrentActiveBlogId(id);
                  setDisplayEditor(true);
                }}>
                <div className={`${styles.image_wrapper}`}>
                  <Image src={image} height={512} width={512} alt="Zdjęcie artykułu bloga"></Image>
                </div>
                <h2>{title}</h2>
                <p dangerouslySetInnerHTML={{ __html: brief }}></p>
              </div>
            );
          })}
        <div
          className={`${styles.blog_article} ${styles.add_new}`}
          onClick={() => {
            setDisplayEditor(true);
          }}>
          <p>+</p>
        </div>
      </div>
      {areAllArticlesLoaded === false && (
        <Button
          style={{ padding: "10px 15px 10px 15px", fontSize: "14px", marginTop: "50px" }}
          onClick={async () => {
            if (blogArticlesBriefSignalData.value && blogArticlesBriefSignalData.value.at(-1)) {
              const latestArticles = await getBlogArticlesBrief(10, blogArticlesBriefSignalData.value.at(-1)!.docRef);

              if (latestArticles.length === blogArticlesBriefSignalData.value.length) {
                setAreAllArticlesLoaded(true);
              }

              blogArticlesBriefSignalData.value = latestArticles;
            }
          }}>
          Pokaż więcej artykułów
        </Button>
      )}
    </>
  );
};

export default BlogArticles;
