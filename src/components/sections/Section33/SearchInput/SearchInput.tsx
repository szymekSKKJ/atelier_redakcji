"use client";

import styles from "./styles.module.scss";
import search from "../../../../../public/search.svg";
import Image from "next/image";

const SearchInput = () => {
  return (
    <div className={`${styles.wrapper}`}>
      <input
        type="text"
        placeholder="Podaj słowa kluczowe"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            const searchButtonElement = event.currentTarget.parentElement?.parentElement?.querySelector("button") as HTMLButtonElement;
            searchButtonElement.click();
          }
        }}></input>
      <Image src={search} alt="Ikona wyszukiwania"></Image>
    </div>
  );
};

export default SearchInput;
