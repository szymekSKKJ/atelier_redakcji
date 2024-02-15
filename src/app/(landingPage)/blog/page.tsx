import BlogArticlesBrief from "@/components/BlogArticlesBrief/BlogArticlesBrief";
import Section11 from "@/components/sections/Section11/Section11";
import styles from "./styles.module.scss";
import Button from "@/components/UI/Button/Button";
import Image from "next/image";
import doubleArrowsIcon from "../../../../public/Double arrows.svg";
import Section13 from "@/components/sections/Section13/Section13";
import Section33 from "@/components/sections/Section33/Section33";
import { blogGetSome } from "@/app/api/blog/get/some/route";
import CurvedLines from "@/design/CurvedLines/CurvedLines";
import Link from "next/link";

const Blog = async () => {
  const blogAriclesResponse = await blogGetSome(0, 3, true);
  const blogAriclesResponse1 = await blogGetSome(1, 1, true);

  return (
    <>
      <div className={`${styles.blog_articles_brief_wrapper}`}>
        <div className={`${styles.wrapper}`}>
          {blogAriclesResponse1.data && <BlogArticlesBrief articles={blogAriclesResponse1.data}></BlogArticlesBrief>}
          {blogAriclesResponse.data && <BlogArticlesBrief articles={blogAriclesResponse.data}></BlogArticlesBrief>}

          <Link href={`/blog/allCategories`}>
            <Button theme="transparent-blue" style={{ padding: "20px 30px 20px 30px" }}>
              Zobacz wszystkie artykuły
            </Button>
          </Link>
        </div>
      </div>
      <Section33></Section33>
      <div className={`${styles.blog_articles_brief_wrapper}`}>
        <h2>
          <span>Najczęściej</span> czytane
        </h2>
        {blogAriclesResponse.data && <BlogArticlesBrief articles={blogAriclesResponse.data}></BlogArticlesBrief>}
      </div>
      <div className={`${styles.blog_articles_brief_wrapper} ${styles.transparent}`}>
        <h2>
          Porady <span>dla początkujących</span>
        </h2>
        <CurvedLines></CurvedLines>
        <p className={`${styles.shortInformation}`}>
          <span>Dopiero zaczynasz swoją przygodę</span> z pracą zaliczeniową lub z pisaniem obszernego tekstu? Poniżej znajdziesz podstawowe kwestie i
          wskazówki, które przyspieszą Twój start :)
        </p>
        <p className={`${styles.subTitlte}`}>
          Podstawowe <span>pojęcia i porady językowe</span>
        </p>
        {blogAriclesResponse.data && <BlogArticlesBrief articles={blogAriclesResponse.data}></BlogArticlesBrief>}
        <Link href={`/blog/allCategories`}>
          Więcej artykułów z tej kategorii <Image src={doubleArrowsIcon} alt="Ikonka dwóch strzałek"></Image>
        </Link>
        <hr></hr>
      </div>
      <div
        className={`${styles.blog_articles_brief_wrapper} ${styles.transparent}`}
        style={{
          paddingTop: "0px",
        }}>
        <p className={`${styles.subTitlte}`}>
          <span>Jak właściwie napisać i przygotować</span> pracę?
        </p>
        {blogAriclesResponse.data && <BlogArticlesBrief articles={blogAriclesResponse.data}></BlogArticlesBrief>}
      </div>
      <Section13 fullscreen={true}></Section13>
      <div className={`${styles.backgroundWrapper}`}>
        <div
          className={`${styles.blog_articles_brief_wrapper} ${styles.transparent}`}
          style={{
            paddingTop: "0px",
          }}>
          <h2>
            Pozostałe <span>kategorie</span>
          </h2>
          <CurvedLines></CurvedLines>
          <p className={`${styles.subTitlte}`} style={{ marginTop: "80px" }}>
            Prace <span>licencjackie</span>
          </p>
          {blogAriclesResponse.data && <BlogArticlesBrief articles={blogAriclesResponse.data}></BlogArticlesBrief>}
          <Link href={`/blog/allCategories`}>
            Więcej artykułów z tej kategorii <Image src={doubleArrowsIcon} alt="Ikonka dwóch strzałek"></Image>
          </Link>
          <hr></hr>
        </div>
        <div
          className={`${styles.blog_articles_brief_wrapper} ${styles.transparent}`}
          style={{
            paddingTop: "0px",
          }}>
          <p className={`${styles.subTitlte}`}>
            Prace <span>inżynierskie</span>
          </p>
          {blogAriclesResponse.data && <BlogArticlesBrief articles={blogAriclesResponse.data}></BlogArticlesBrief>}
          <a>
            Więcej artykułów z tej kategorii <Image src={doubleArrowsIcon} alt="Ikonka dwóch strzałek"></Image>
          </a>
          <hr></hr>
        </div>
        <div
          className={`${styles.blog_articles_brief_wrapper} ${styles.transparent}`}
          style={{
            paddingTop: "0px",
          }}>
          <p className={`${styles.subTitlte}`}>
            Prace <span>magisterskie</span>
          </p>
          {blogAriclesResponse.data && <BlogArticlesBrief articles={blogAriclesResponse.data}></BlogArticlesBrief>}
          <Link href={`/blog/allCategories`}>
            Więcej artykułów z tej kategorii <Image src={doubleArrowsIcon} alt="Ikonka dwóch strzałek"></Image>
          </Link>
          <hr></hr>
        </div>
        <div
          className={`${styles.blog_articles_brief_wrapper} ${styles.transparent}`}
          style={{
            paddingTop: "0px",
          }}>
          <p className={`${styles.subTitlte}`}>
            Prace <span>doktorskie i habilitacyjne</span>
          </p>
          {blogAriclesResponse.data && <BlogArticlesBrief articles={blogAriclesResponse.data}></BlogArticlesBrief>}
          <Link href={`/blog/allCategories`}>
            Więcej artykułów z tej kategorii <Image src={doubleArrowsIcon} alt="Ikonka dwóch strzałek"></Image>
          </Link>
          <hr></hr>
        </div>
      </div>
      <Section11 type="blog"></Section11>
    </>
  );
};

export default Blog;
