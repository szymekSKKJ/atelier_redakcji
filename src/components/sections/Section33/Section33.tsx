"use client";

import styles from "./styles.module.scss";
import SearchInput from "./SearchInput/SearchInput";
import Button from "@/components/UI/Button/Button";
import { useRef, useState } from "react";
import { blogFind } from "@/app/api/blog/find/route";
import { blogArticle } from "@/app/api/blog/get/[url]/route";
import BlogArticlesBrief from "@/components/BlogArticlesBrief/BlogArticlesBrief";

const Section33 = () => {
  const [foundArticles, setFoundArticles] = useState<blogArticle[]>([]);
  const [paginationSkipValue, setPaginationSkipVaue] = useState(0);
  const [areAllArticlesDisplayed, setAreAllArticlesDisplayed] = useState(false);

  const componentElementRef = useRef<HTMLElement | null>(null);

  const formattedArticles: blogArticle[][] = [];

  foundArticles.forEach((data, index) => {
    if (index % 3 === 0) {
      const newArray = [];
      newArray.push(data);
      formattedArticles.push(newArray);
    } else {
      formattedArticles.at(-1)!.push(data);
    }
  });

  return (
    <section className={`${styles.section}`} ref={componentElementRef}>
      <p>
        <mark>Szukasz </mark>konkretnego tematu?
      </p>
      <SearchInput></SearchInput>
      <Button
        style={{ padding: "15px 20px 15px 20px", fontSize: "16px" }}
        onClick={async (event) => {
          const searchInputElement = event.currentTarget.parentElement?.querySelector("input") as HTMLInputElement;

          const response = await blogFind(searchInputElement.value);

          if (response.data) {
            setPaginationSkipVaue(10);
            setFoundArticles(response.data);
            setAreAllArticlesDisplayed(false);
          }
        }}>
        Szukaj
      </Button>
      {formattedArticles.length > 0 && (
        <div className={`${styles.foundArticles}`}>
          {formattedArticles.map((dataArray) => {
            return <BlogArticlesBrief key={crypto.randomUUID()} articles={dataArray}></BlogArticlesBrief>;
          })}
        </div>
      )}

      {formattedArticles.length > 0 && areAllArticlesDisplayed === false && (
        <Button
          style={{ padding: "15px 20px 15px 20px", fontSize: "16px" }}
          onClick={async () => {
            const searchInputElement = componentElementRef.current!.querySelector("input") as HTMLInputElement;
            const response = await blogFind(searchInputElement.value, 10, paginationSkipValue);

            if (response.data && response.data.length > 0) {
              setPaginationSkipVaue((currentValue) => currentValue + 10);

              setFoundArticles((currentValue) => {
                const copiedCurrentValue = [...currentValue];

                response.data!.forEach((data) => {
                  copiedCurrentValue.push(data);
                });

                return copiedCurrentValue;
              });
            } else {
              setAreAllArticlesDisplayed(true);
            }
          }}>
          Znajdź więcej
        </Button>
      )}
      {areAllArticlesDisplayed && <p className={`${styles.allArticlesDisplayed}`}>To już wszystkie powiązane artykuły</p>}
    </section>
  );
};

export default Section33;
