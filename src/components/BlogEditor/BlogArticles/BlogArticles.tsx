"use client";

import styles from "./styles.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { blogArticle } from "@/app/api/blog/get/[pathname]/route";
import Image from "next/image";
import Button from "@/components/UI/Button/Button";
import { activeBlogArticle, getMoreArticles } from "../BlogEditor";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface componentsProps {
  setCurrentActiveArticle: Dispatch<SetStateAction<null | activeBlogArticle>>;
  blogArticles: blogArticle[];
}

const BlogArticles = ({ setCurrentActiveArticle, blogArticles }: componentsProps) => {
  const router = useRouter();

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
              <div className={`${styles.background}`}>
                <Image src={image.string} width={300} height={300} alt="Tło"></Image>
              </div>
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
        onClick={() => {
          getMoreArticles(blogArticles.length);
        }}>
        Zobacz wiecej
      </Button>
    </>
  );
};

export default BlogArticles;
