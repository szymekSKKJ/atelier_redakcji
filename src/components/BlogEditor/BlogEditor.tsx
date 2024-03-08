"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ArticleEditor from "./ArticleEditor/ArticleEditor";
import styles from "./styles.module.scss";

import { signal } from "@preact/signals-react";
import Button from "../UI/Button/Button";
import { useSignals } from "@preact/signals-react/runtime";
import BlogArticles from "./BlogArticles/BlogArticles";
import { blogArticle, blogGetByUrl } from "@/app/api/blog/get/[url]/route";
import { blogGetSome } from "@/app/api/blog/get/some/route";

const notifications = signal<
  {
    id: string;
    content: string;
    type: "error" | "success";
  }[]
>([]);

export const createNotification = (content: string, type: "error" | "success" = "success") => {
  const copiedValue = [...notifications.value];

  copiedValue.push({
    id: crypto.randomUUID(),
    content: content,
    type: type,
  });

  setTimeout(() => {
    copiedValue.splice(
      copiedValue.findIndex((data) => data.content === content),
      1
    );

    notifications.value = copiedValue;
  }, 3500); // Animation time

  notifications.value = copiedValue;
};

const blogArticles = signal<blogArticle[]>([]);

export const getMoreArticles = async (skip: number) => {
  const blogArticlesLocal = await blogGetSome(skip, 10);

  if (blogArticlesLocal.data) {
    const copiedValue = [...blogArticles.value];

    const meregedArticles = [...copiedValue, ...blogArticlesLocal.data];

    meregedArticles.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    blogArticles.value = meregedArticles;
  }
};

const BlogEditor = () => {
  useSignals();

  const [currentActiveArticle, setCurrentActiveArticle] = useState<null | blogArticle>(null);
  const [error, setError] = useState<null | string>(null);

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

  //lookaszek86@gmail.com
  //Lookaszek321

  return (
    <div className={`${styles.blog_editor}`}>
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
      )}

      <div className={`${styles.notifications}`}>
        {notifications.value.map((data) => {
          const { content, type, id } = data;

          return (
            <div className={`${styles.notifiaction} ${type === "error" ? styles.error : ""} `} key={id}>
              <p>{content}</p>
            </div>
          );
        })}
      </div>
      {false === null ? (
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

      <ArticleEditor currentActiveArticle={currentActiveArticle} setCurrentActiveArticle={setCurrentActiveArticle}></ArticleEditor>
    </div>
  );
};

export default BlogEditor;
