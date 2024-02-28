import { blogGetSome } from "@/app/api/blog/get/some/route";
import styles from "./styles.module.scss";
import Article from "@/components/allCategoriesPage/Article/Article";
import Section13 from "@/components/sections/Section13/Section13";
import Section11 from "@/components/sections/Section11/Section11";
import Button from "@/components/UI/Button/Button";
import Link from "next/link";

interface componentProps {
  searchParams: { category: string };
}

const allCategoriesPage = async ({ searchParams: { category } }: componentProps) => {
  const response = await blogGetSome(0, 3, true);

  const categories = [
    {
      key: "prace-licenjcackie",
      value: "Prace licencjackie",
    },
    {
      key: "prace-inzynierskie",
      value: "Prace inżynierskie",
    },
    {
      key: "prace-doktorskie-i-habilitacyjne",
      value: "Prace doktorskie i habilitacyjne",
    },
    {
      key: "prace-zaliczeniowe",
      value: "Prace zaliczeniowe",
    },
    {
      key: "prace-dyplomowe",
      value: "Prace dyplomowe",
    },
    {
      key: "prace-naukowe",
      value: "Prace naukowe",
    },
    {
      key: "teksty-specjalistyczne",
      value: "Teksty specjalistyczne",
    },
    {
      key: "inne-teksty",
      value: "Inne teksty",
    },
    {
      key: "wszystko",
      value: "wszystko",
    },
  ];

  return (
    <div className={`${styles.allCategoriesPage}`}>
      <h1>Wszystkie artykuły</h1>
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.articles}`}>
          {response.data &&
            response.data.map((data, index, array) => {
              const { id } = data;

              if (index === (array.length - 1) / 2) {
                return (
                  <>
                    <Section13 allCategoriesPage={true}></Section13>
                    <Article key={id} data={data}></Article>
                  </>
                );
              } else {
                return <Article key={id} data={data}></Article>;
              }
            })}
        </div>
        <div className={`${styles.wrapper}`}>
          <aside>
            <h3>Kategorie</h3>
            {categories.map((data) => {
              const { key, value } = data;

              return (
                <Link key={key} className={`${category === key ? styles.choosen : ""}`} href={`/blog/allCategories?category=${key}`}>
                  {value}
                </Link>
              );
            })}
          </aside>
          <Section13 allCategoriesPage={true}></Section13>
        </div>
      </div>
      <Button style={{ padding: "20px 30px 20px 30px", margin: "40px auto 40px auto", alignSelf: "flex-start" }}>Pokaż więcej artykułów</Button>
      <Section11 type="blog"></Section11>
    </div>
  );
};

export default allCategoriesPage;
