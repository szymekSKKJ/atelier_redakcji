import getBlogArticlesBrief from "@/api/blog/getBlogArticlesBrief";
import BlogArticlesBrief from "@/components/BlogArticlesBrief/BlogArticlesBrief";
import Section11 from "@/components/sections/Section11/Section11";
import styles from "./styles.module.scss";
import Button from "@/components/UI/Button/Button";
import Image from "next/image";
import arrow from "../../../public/arrow.svg";
import Section13 from "@/components/sections/Section13/Section13";
import Section33 from "@/components/sections/Section33/Section33";

// const ArrowIcon = () => {
//   return (
//     <div className={`${styles.arrow_icon}`} role="group">
//       <Image src={arrow} alt="Ikonka strzałki"></Image>
//       <Image src={arrow} alt="Ikonka strzałki"></Image>
//     </div>
//   );
// };

const Blog = async () => {
  const blogArticles1 = await getBlogArticlesBrief(1);
  const blogArticles2 = await getBlogArticlesBrief(3);

  return (
    <>
      <div className={`${styles.blog_articles_brief_wrapper}`}>
        <div className={`${styles.wrapper}`}>
          <BlogArticlesBrief articles={blogArticles1}></BlogArticlesBrief>
          <BlogArticlesBrief articles={blogArticles2}></BlogArticlesBrief>
          <Button theme="transparent-blue" style={{ padding: "20px 30px 20px 30px" }}>
            Zobacz wszystkie artykuły
            {/* <ArrowIcon></ArrowIcon> */}
          </Button>
        </div>
      </div>
      <Section33></Section33>
      <div className={`${styles.blog_articles_brief_wrapper}`}>
        <div className={`${styles.wrapper}`}>
          <BlogArticlesBrief articles={blogArticles2}></BlogArticlesBrief>
        </div>
      </div>
      <div className={`${styles.blog_articles_brief_wrapper}`}>
        <div className={`${styles.wrapper}`}>
          <BlogArticlesBrief articles={blogArticles2}></BlogArticlesBrief>
        </div>
      </div>
      <div className={`${styles.blog_articles_brief_wrapper}`}>
        <div className={`${styles.wrapper}`}>
          <BlogArticlesBrief articles={blogArticles2}></BlogArticlesBrief>
        </div>
      </div>
      <Section13></Section13>
      <Section11 type="blog"></Section11>
    </>
  );
};

export default Blog;
