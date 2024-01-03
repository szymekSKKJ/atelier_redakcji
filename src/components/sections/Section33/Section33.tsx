"use client";

import styles from "./styles.module.scss";
import SearchInput from "./SearchInput/SearchInput";
import Button from "@/components/UI/Button/Button";
import getBlogArticle from "@/api/blog/getBlogArticle";
import getBlogArticlesBrief from "@/api/blog/getBlogArticlesBrief";
import { useState } from "react";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

const Section33 = () => {
  const [foundArticles, setFoundArticles] = useState<
    | null
    | {
        id: string;
        image: string;
        title: string;
        brief: string;
        docRef: QueryDocumentSnapshot<DocumentData, DocumentData>;
      }[]
  >(null);

  return (
    <section className={`${styles.section}`}>
      <p>
        <mark>Szukasz </mark>konkretnego tematu?
      </p>
      <SearchInput></SearchInput>
      <Button
        style={{ padding: "15px 20px 15px 20px", fontSize: "16px" }}
        onClick={async (event) => {
          const searchInputElement = event.currentTarget.parentElement?.querySelector("input") as HTMLInputElement;

          const keyWordsFromInput = searchInputElement.value.replace(/ +/g, " ").split(" ");

          keyWordsFromInput.forEach(async (keyWord) => {
            const foundArticles = await getBlogArticlesBrief(10, undefined, keyWord);

            console.log(keyWord, foundArticles);
          });

          //setFoundArticles(foundArticles);
        }}>
        Szukaj
      </Button>
    </section>
  );
};

export default Section33;
