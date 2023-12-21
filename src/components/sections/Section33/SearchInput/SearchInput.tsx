import styles from "./styles.module.scss";
import search from "../../../../../public/search.svg";
import Image from "next/image";

const SearchInput = () => {
  return (
    <div className={`${styles.wrapper}`}>
      <input type="text" placeholder="Na jaki temat szukasz odpowiedzi?"></input>
      <Image src={search} alt="Ikona wyszukiwania"></Image>
    </div>
  );
};

export default SearchInput;
