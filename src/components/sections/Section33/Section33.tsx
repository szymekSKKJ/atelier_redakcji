"use client";

import Button from "@/components/UI/Button/Button";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import SearchInput from "./SearchInput/SearchInput";
import styles from "./styles.module.scss";

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

          router.push(`/blog/wyniki-wyszukiwania/${searchInputElement.value}`);
        }}>
        Szukaj
      </Button>
    </section>
  );
};

export default Section33;
