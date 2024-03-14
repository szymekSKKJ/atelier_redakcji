import { blogGetSome } from "@/app/api/blog/get/some/route";
import styles from "./styles.module.scss";
import Article from "@/components/allCategoriesPage/Article/Article";
import Section13 from "@/components/sections/Section13/Section13";
import Section11 from "@/components/sections/Section11/Section11";
import Button from "@/components/UI/Button/Button";
import doubleArrowsIcon from "../../../../../public/Double arrows.svg";
import Link from "next/link";
import Image from "next/image";
import { blogCountAll } from "@/app/api/blog/countAll/route";

interface componentProps {
  searchParams: { category: string; page: string };
}

const allCategoriesPage = async ({ searchParams: { category = "prace-licenjcackie", page = "1" } }: componentProps) => {
  const numberOfArticlesToDisplayPerPage = 1;

  const response =
    page === undefined || parseInt(page) === 1
      ? await blogGetSome(0, numberOfArticlesToDisplayPerPage, true)
      : await blogGetSome(numberOfArticlesToDisplayPerPage * parseInt(page) - 1, numberOfArticlesToDisplayPerPage, true);

  const allArticlesCountResponse = await blogCountAll();

  const buttonsCount = allArticlesCountResponse.data ? Math.ceil(allArticlesCountResponse.data / numberOfArticlesToDisplayPerPage) : 1;

  const paginationButtonsElements = [];

  if (page) {
    for (let i = 1; i <= buttonsCount; i++) {
      if (i === 1) {
        paginationButtonsElements.push(
          <Link href={`/blog/allCategories/?category=${category}&page=${i}`}>
            <button className={`${parseInt(page) === i ? styles.current : ""}`}>{i}</button>
          </Link>
        );
      }

      if (i === parseInt(page)) {
        if (i >= 3) {
          if (i >= 4) {
            paginationButtonsElements.push(
              <Link href={`/blog/allCategories/?category=${category}&page=${i - 2}`}>
                <button className={`${parseInt(page) === i - 2 ? styles.current : ""}`}>{i - 2}</button>
              </Link>
            );
          }

          paginationButtonsElements.push(
            <Link href={`/blog/allCategories/?category=${category}&page=${i - 1}`}>
              <button className={`${parseInt(page) === i - 1 ? styles.current : ""}`}>{i - 1}</button>
            </Link>
          );
        }

        if (i === buttonsCount) {
          if (i + 1 < buttonsCount) {
            paginationButtonsElements.push(
              <Link href={`/blog/allCategories/?category=${category}&page=${i + 1}`}>
                <button className={`${parseInt(page) === i + 1 ? styles.current : ""}`}>{i + 1}</button>
              </Link>
            );

            if (i + 2 < buttonsCount) {
              paginationButtonsElements.push(
                <Link href={`/blog/allCategories/?category=${category}&page=${i + 2}`}>
                  <button className={`${parseInt(page) === i + 2 ? styles.current : ""}`}>{i + 2}</button>
                </Link>
              );
            }
          }
        }

        if (i !== 1 && i !== buttonsCount) {
          paginationButtonsElements.push(
            <Link href={`/blog/allCategories/?category=${category}&page=${i}`}>
              <button className={`${parseInt(page) === i ? styles.current : ""}`}>{i}</button>
            </Link>
          );
        }

        if (i !== buttonsCount) {
          if (i + 1 < buttonsCount) {
            paginationButtonsElements.push(
              <Link href={`/blog/allCategories/?category=${category}&page=${i + 1}`}>
                <button className={`${parseInt(page) === i + 1 ? styles.current : ""}`}>{i + 1}</button>
              </Link>
            );

            if (i + 2 < buttonsCount) {
              paginationButtonsElements.push(
                <Link href={`/blog/allCategories/?category=${category}&page=${i + 2}`}>
                  <button className={`${parseInt(page) === i + 2 ? styles.current : ""}`}>{i + 2}</button>
                </Link>
              );
            }
          }
        }
      }

      if (i === buttonsCount) {
        paginationButtonsElements.push(
          <Link href={`/blog/allCategories/?category=${category}&page=${i}`}>
            <button className={`${parseInt(page) === i ? styles.current : ""}`}>{i}</button>
          </Link>
        );
      }
    }
  }

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
                <Link key={key} className={`${category === key ? styles.choosen : ""}`} href={`/blog/allCategories?category=${key}&page=1`}>
                  {value}
                </Link>
              );
            })}
          </aside>
          <Section13 allCategoriesPage={true}></Section13>
        </div>
      </div>
      <div className={`${styles.paginationButtons}`}>
        {page && parseInt(page) > 1 && (
          <Link href={`/blog/allCategories/?category=${category}&page=${parseInt(page) - 1}`}>
            <button className={`${styles.doubleArrows} ${styles.backward}`}>
              <Image src={doubleArrowsIcon} alt="Ikonka podwójnej strzałki"></Image>
            </button>
          </Link>
        )}
        {paginationButtonsElements}
        {page && parseInt(page) < buttonsCount && (
          <Link href={`/blog/allCategories/?category=${category}&page=${parseInt(page) + 1}`}>
            <button className={`${styles.doubleArrows}`}>
              <Image src={doubleArrowsIcon} alt="Ikonka podwójnej strzałki"></Image>
            </button>
          </Link>
        )}
      </div>
      <Section11 type="blog"></Section11>
    </div>
  );
};

export default allCategoriesPage;
