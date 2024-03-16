"use client";

import styles from "./styles.module.scss";
import SearchInput from "./SearchInput/SearchInput";
import Button from "@/components/UI/Button/Button";
import { useRef, useState } from "react";
import { blogFind } from "@/app/api/blog/find/route";
import { blogArticle } from "@/app/api/blog/get/[pathname]/route";
import BlogArticlesBrief from "@/components/BlogArticlesBrief/BlogArticlesBrief";
import { useRouter } from "next/navigation";

const Section33 = () => {
  const router = useRouter();

  const componentElementRef = useRef<HTMLElement | null>(null);

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

          router.push(`/blog/searchResults/${searchInputElement.value}`);
        }}>
        Szukaj
      </Button>
    </section>
  );
};

export default Section33;
