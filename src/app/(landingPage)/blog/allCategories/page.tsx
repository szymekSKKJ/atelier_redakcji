import { blogGetSome, category } from "@/app/api/blog/get/some/route";
import styles from "./styles.module.scss";
import Article from "@/components/allCategoriesPage/Article/Article";
import Section13 from "@/components/sections/Section13/Section13";
import Section11 from "@/components/sections/Section11/Section11";
import Button from "@/components/UI/Button/Button";
import doubleArrowsIcon from "../../../../../public/Double arrows.svg";
import Link from "next/link";
import Image from "next/image";
import { blogCountAll } from "@/app/api/blog/countAll/route";
import { category as blogCategory } from "@/app/api/blog/get/some/route";
import { categories as blogCategories } from "@/data/blog/categories";

interface componentProps {
  searchParams: { category: blogCategory; page: string };
}

const allCategoriesPage = async ({ searchParams: { category = "wszystko", page = "1" } }: componentProps) => {
  const foundCurrentCategory = blogCategories.find((data) => data.pathname === category)!.name as category;

  const numberOfArticlesToDisplayPerPage = 6;

  const allArticlesCountResponse = await blogCountAll(foundCurrentCategory.toLocaleLowerCase());

  const buttonsCount = allArticlesCountResponse.data ? Math.ceil(allArticlesCountResponse.data / numberOfArticlesToDisplayPerPage) : 1;

  const paginationButtonsElements = [];

  if (page) {
    for (let i = 1; i <= buttonsCount; i++) {
      if (i === 1 && buttonsCount !== 1) {
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

  const response =
    page === undefined || parseInt(page) === 1
      ? await blogGetSome(0, numberOfArticlesToDisplayPerPage, true, foundCurrentCategory)
      : await blogGetSome(numberOfArticlesToDisplayPerPage * (parseInt(page) - 1), numberOfArticlesToDisplayPerPage, true, foundCurrentCategory);

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
            {blogCategories.map((data) => {
              const { pathname, name } = data;

              return (
                <Link key={pathname} className={`${category === pathname ? styles.choosen : ""}`} href={`/blog/allCategories?category=${pathname}&page=1`}>
                  {name}
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
