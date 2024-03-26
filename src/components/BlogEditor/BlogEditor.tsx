"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import BlogArticles from "./BlogArticles/BlogArticles";
import { blogArticle } from "@/app/api/blog/get/[pathname]/route";
import { blogGetSome, category as blogArticleCategory } from "@/app/api/blog/get/some/route";
import { blogFind } from "@/app/api/blog/find/route";
import { categories as articleCategories } from "@/data/blog/categories";
import Button from "../UI/Button/Button";
import logoImage from "../../../public/logo.svg";
import Image from "next/image";
import { userCreateOrLogin } from "@/app/api/user/createOrLogin/route";
import Checkbox from "../UI/Checkbox/Checkbox";

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

export const getMoreArticles = async (skip: number, category: blogArticleCategory, clear: boolean = false) => {
  const blogArticlesLocal = await blogGetSome(skip, 10, false, category);

  if (blogArticlesLocal.data) {
    const copiedValue = structuredClone(clear ? [] : blogArticles.value);

    const meregedArticles = [...copiedValue, ...blogArticlesLocal.data];

    meregedArticles.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    blogArticles.value = meregedArticles;

    const areAllArticlesGot = blogArticlesLocal.data.length === 0;

    return areAllArticlesGot;
  } else {
    return false;
  }
};

const BlogEditor = () => {
  useSignals();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [responseMessage, setResponseMessage] = useState<null | string>(null);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [isEmailLabelCopied, setIsEmailLabelCopied] = useState(false);

  const inputSearchTimeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);
  const selectElementRef = useRef<HTMLSelectElement | null>(null);
  const inputElementRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    if (isLoggedIn) {
      getMoreArticles(0, selectElementRef.current!.value as blogArticleCategory);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    (async () => {
      const response = await userCreateOrLogin();

      if (response.data) {
        if (response.data.user) {
          setIsLoggedIn(response.data.user.isActivated);
        } else if (response.data.message) {
          setResponseMessage(response.data.message);
        }
      }
    })();
  }, []);

  return (
    <div className={`${styles.blog_editor}`}>
      {isLoggedIn === false ? (
        <div className={`${styles.login}`}>
          <div className={`${styles.imageWrapper}`}>
            <Image src={logoImage} alt="Zdjęcie logo"></Image>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}>
            <div className={`${styles.inputWrapper}`}>
              <label
                onCopy={() => {
                  setIsEmailLabelCopied(true);
                }}>
                Email
              </label>
              <input placeholder=""></input>
            </div>
            <div className={`${styles.inputWrapper}`}>
              <label>Hasło</label>
              <input type="password" placeholder=""></input>
            </div>
            {isEmailLabelCopied && (
              <div className={`${styles.checkboxWrapper}`}>
                <Checkbox
                  isChecked={isCreatingAccount}
                  onInput={() => {
                    setIsCreatingAccount((currentValue) => (currentValue ? false : true));
                  }}>
                  Chcę utworzyć konto
                </Checkbox>
              </div>
            )}
            <Button
              onClick={async (event) => {
                const formElement = event.currentTarget.parentElement as HTMLFormElement;
                const inputElements = [...formElement.elements].map((element) => element.tagName === "INPUT" && element);
                const emailInputElement = inputElements[0] as HTMLInputElement;
                const passwordInputElement = inputElements[1] as HTMLInputElement;
                const regexForEmail = /\S+@\S+\.\S+/;

                const isEmialValid = regexForEmail.test(emailInputElement.value);

                if (isEmialValid) {
                  const response = await userCreateOrLogin(isCreatingAccount, emailInputElement.value, passwordInputElement.value);

                  if (response.data) {
                    if (response.data.user) {
                      setIsLoggedIn(response.data.user.isActivated);
                    } else if (response.data.message) {
                      setResponseMessage(response.data.message);
                    }
                  }
                } else {
                  setResponseMessage("Email jest niepoprawny");
                }
              }}
              style={{ padding: "10px 20px 10px 20px" }}>
              Zaloguj się
            </Button>
          </form>
          {responseMessage && <p className={`${styles.responseMessage}`}>{responseMessage}</p>}
        </div>
      ) : (
        <>
          <div className={`${styles.searchbar}`}>
            <input
              placeholder="Szukaj artykułów"
              ref={inputElementRef}
              onInput={(event) => {
                const thisInputElement = event.currentTarget as HTMLInputElement;

                if (inputSearchTimeoutRef.current) {
                  clearTimeout(inputSearchTimeoutRef.current);
                }

                inputSearchTimeoutRef.current = setTimeout(async () => {
                  const foundArticlesResponse = await blogFind(thisInputElement.value, 10, 0, selectElementRef.current!.value as blogArticleCategory);

                  if (foundArticlesResponse.data) {
                    blogArticles.value = foundArticlesResponse.data;
                  }
                }, 1500);
              }}></input>
          </div>
          <div className={`${styles.searchOptions}`}>
            <select
              defaultValue={"wszystko"}
              ref={selectElementRef}
              onInput={() => {
                getMoreArticles(0, selectElementRef.current!.value as blogArticleCategory, true);
                inputElementRef.current!.value = "";
              }}>
              {articleCategories.map((data) => {
                const { name } = data;

                return <option key={name}>{name}</option>;
              })}
            </select>
          </div>
          <BlogArticles
            blogArticles={blogArticles.value}
            currentSelectedCategory={selectElementRef.current ? (selectElementRef.current.value as blogArticleCategory) : null}></BlogArticles>
        </>
      )}
    </div>
  );
};

export default BlogEditor;
