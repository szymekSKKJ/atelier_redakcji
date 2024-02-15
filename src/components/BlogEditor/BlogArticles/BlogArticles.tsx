"use client";

import styles from "./styles.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { blogArticle } from "@/app/api/blog/get/[url]/route";
import Image from "next/image";
import Button from "@/components/UI/Button/Button";
import { getMoreArticles } from "../BlogEditor";

interface componentsProps {
  setCurrentActiveArticle: Dispatch<SetStateAction<null | blogArticle>>;
  blogArticles: blogArticle[];
}

const BlogArticles = ({ setCurrentActiveArticle, blogArticles }: componentsProps) => {
  return (
    <>
      <div className={`${styles.blogArticles}`}>
        {blogArticles.map((blogArticleData) => {
          const { id, title, entry, image } = blogArticleData;

          return (
            <div
              className={`${styles.blogArticle}`}
              key={id}
              onClick={() => {
                setCurrentActiveArticle(blogArticleData);
              }}>
              <div className={`${styles.background}`}>
                <Image src={image} width={300} height={300} alt="Tło"></Image>
              </div>
              <h2>{title}</h2>
              <div className={`${styles.entry}`}>
                <p>{entry[0].content}</p>
              </div>
            </div>
          );
        })}
      </div>
      <Button
        style={{ padding: "20px 30px 20px 30px", marginLeft: "auto", marginRight: "auto" }}
        onClick={() => {
          getMoreArticles(blogArticles.length);
        }}>
        Zobacz wiecej
      </Button>
    </>
  );
};

export default BlogArticles;
