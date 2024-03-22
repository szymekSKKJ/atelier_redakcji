"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import BlogArticles from "./BlogArticles/BlogArticles";
import { blogArticle } from "@/app/api/blog/get/[pathname]/route";
import { blogGetSome } from "@/app/api/blog/get/some/route";
import { blogFind } from "@/app/api/blog/find/route";

export type activeBlogArticle = {
  id: string | null;
  title: string | null;
  category: string | null;
  pathname: string | null;
  createdAt: Date;
  entry: {
    order: number;
    content: string | null;
  }[];
  image: {
    file?: File | null;
    url: string | null;
  };
  sections: {
    order: number;
    title: string | null;
    paragraphs: {
      order: number;
      content: string;
    }[];
  }[];
};

const blogArticles = signal<blogArticle[]>([]);

export const getMoreArticles = async (skip: number) => {
  const blogArticlesLocal = await blogGetSome(skip, 10);

  if (blogArticlesLocal.data) {
    const copiedValue = structuredClone(blogArticles.value);

    const meregedArticles = [...copiedValue, ...blogArticlesLocal.data];

    meregedArticles.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    blogArticles.value = meregedArticles;

    const areAllArticlesGot = blogArticlesLocal.data.length === 0;

    return areAllArticlesGot;
  } else {
    return false;
  }
};

const BlogEditor = () => {
  useSignals();

  const [error, setError] = useState<null | string>(null);

  const inputSearchTimeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      getMoreArticles(0);
    });

    return () => {
      clearTimeout(timeout);
      blogArticles.value = [];
    };
  }, []);

  useEffect(() => {
    const popstate = (event: PopStateEvent) => {};

    window.addEventListener("popstate", popstate);

    return () => {
      window.removeEventListener("popstate", popstate);
    };
  });

  return (
    <div className={`${styles.blog_editor}`}>
      <div className={`${styles.searchbar}`}>
        <input
          placeholder="Szukaj artykułów"
          onInput={(event) => {
            const thisInputElement = event.currentTarget as HTMLInputElement;

            if (inputSearchTimeoutRef.current) {
              clearTimeout(inputSearchTimeoutRef.current);
            }

            inputSearchTimeoutRef.current = setTimeout(async () => {
              const foundArticlesResponse = await blogFind(thisInputElement.value);

              if (foundArticlesResponse.data) {
                blogArticles.value = foundArticlesResponse.data;
              }
            }, 2000);
          }}></input>
      </div>
      <BlogArticles blogArticles={blogArticles.value}></BlogArticles>

      {/* {currentActiveArticle === null && (
        <div className={`${styles.inputWrapper}`}>
          <input placeholder="Url artykułu"></input>
          <Button
            style={{ padding: "10px 15px 10px 15px" }}
            onClick={async (event) => {
              const parentElement = event.currentTarget.parentElement!;
              const inputElement = parentElement.querySelector("input")!;

              const articleData = await blogGetByUrl(inputElement.value);

              if (articleData.data) {
                setCurrentActiveArticle(articleData.data);
              }
            }}>
            Szukaj
          </Button>
        </div>
      )} */}

      {/* {false === null ? (
        <form className={`${styles.login}`} onSubmit={(event) => event.preventDefault()} method="POST">
          {error && <p className={`${styles.error}`}>{error}</p>}
          <input placeholder="Email (admin@gmail.com)" name="email" required></input>
          <input placeholder="Hasło (adminQwe)" name="password" type="password" required></input>
          <Button
            type="submit"
            style={{ padding: "15px 20px 15px 20px" }}
            onClick={(event) => {
              const formElement = event.currentTarget.parentElement as HTMLFormElement;
              const formData = new FormData(formElement);
              const password = formData.get("password")! as string;
              const email = formData.get("email")! as string;
            }}>
            Zaloguj się
          </Button>
        </form>
      ) : currentActiveArticle ? (
        <ArticleEditor currentActiveArticle={currentActiveArticle} setCurrentActiveArticle={setCurrentActiveArticle}></ArticleEditor>
      ) : (
        blogArticles.value.length !== 0 && <BlogArticles blogArticles={blogArticles.value} setCurrentActiveArticle={setCurrentActiveArticle}></BlogArticles>
      )} */}
    </div>
  );
};

export default BlogEditor;
