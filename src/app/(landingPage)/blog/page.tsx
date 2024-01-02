import getBlogArticlesBrief from "@/api/blog/getBlogArticlesBrief";
import BlogArticlesBrief from "@/components/BlogArticlesBrief/BlogArticlesBrief";
import Section11 from "@/components/sections/Section11/Section11";
import styles from "./styles.module.scss";
import Button from "@/components/UI/Button/Button";
import Image from "next/image";
import arrow from "../../../public/arrow.svg";
import Section13 from "@/components/sections/Section13/Section13";
import Section33 from "@/components/sections/Section33/Section33";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

// const ArrowIcon = () => {
//   return (
//     <div className={`${styles.arrow_icon}`} role="group">
//       <Image src={arrow} alt="Ikonka strzałki"></Image>
//       <Image src={arrow} alt="Ikonka strzałki"></Image>
//     </div>
//   );
// };

const Blog = async () => {
  const blogArticles = await getBlogArticlesBrief(16);

  const dividedArticles: {
    id: string;
    image: string;
    title: string;
    brief: string;
    docRef: QueryDocumentSnapshot<DocumentData, DocumentData>;
  }[][] = [];

  const firstArticle = blogArticles.shift()!;

  blogArticles.forEach((articleData, index) => {
    if (index % 3 === 0) {
      const array = [articleData];
      dividedArticles.push(array);
    } else {
      const lastArray = dividedArticles.at(-1);

      if (lastArray) {
        lastArray.push(articleData);
      }
    }
  });

  return (
    <>
      <div className={`${styles.blog_articles_brief_wrapper}`}>
        <div className={`${styles.wrapper}`}>
          <BlogArticlesBrief articles={[firstArticle]}></BlogArticlesBrief>
          <BlogArticlesBrief articles={dividedArticles[0]}></BlogArticlesBrief>
          <Button theme="transparent-blue" style={{ padding: "20px 30px 20px 30px" }}>
            Zobacz wszystkie artykuły
            {/* <ArrowIcon></ArrowIcon> */}
          </Button>
        </div>
      </div>
      <Section33></Section33>
      <div className={`${styles.blog_articles_brief_wrapper}`}>
        {dividedArticles.map((articleData, index) => {
          if (index < 3) {
            return (
              <div className={`${styles.wrapper}`} key={index}>
                <BlogArticlesBrief articles={articleData}></BlogArticlesBrief>
              </div>
            );
          }
        })}
      </div>
      <Section13></Section13>
      <div className={`${styles.blog_articles_brief_wrapper}`}>
        {dividedArticles.map((articleData, index) => {
          if (index >= 3) {
            return (
              <div className={`${styles.wrapper}`} key={index}>
                <BlogArticlesBrief articles={articleData}></BlogArticlesBrief>
              </div>
            );
          }
        })}
      </div>
      <Section11 type="blog"></Section11>
    </>
  );
};

export default Blog;
