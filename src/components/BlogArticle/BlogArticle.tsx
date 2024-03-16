"use client";

import styles from "./styles.module.scss";
import Image from "next/image";
import arrowRightGrayIcon from "../../../public/arrow_right_grey.svg";
import { blogArticle } from "@/app/api/blog/get/[pathname]/route";
import Section13 from "../sections/Section13/Section13";
import Section34 from "../sections/Section34/Section34";

interface componentProps {
  data: blogArticle;
}

const BlogArticle = ({ data }: componentProps) => {
  return (
    <div className={`${styles.blogArticle}`}>
      <div className={`${styles.blogArticleWrapper}`}>
        <div className={`${styles.linksPath}`}>
          <p>Blog</p>
          <Image src={arrowRightGrayIcon} alt="Ikonka strzałki"></Image>
          <p>Artykuły</p>
          <Image src={arrowRightGrayIcon} alt="Ikonka strzałki"></Image>
          <p className={`${styles.current}`}>{data.category}</p>
        </div>
        <h1>{data.title}</h1>
        <div className={`${styles.articleMetaDataWrapper}`}>
          <p className={`${styles.category}`}>{data.category}</p>
          <p className={`${styles.date}`}>
            {new Date(data.createdAt).toLocaleTimeString("pl-PL", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </p>
        </div>
        <div className={`${styles.entry}`}>
          {data.entry.map((entryData) => {
            return <p key={entryData.order} dangerouslySetInnerHTML={{ __html: entryData.content }}></p>;
          })}
        </div>
        <div className={`${styles.imageWrapper}`}>
          <Image src={data.image.string} width={1180} height={500} alt="Zdjęcie artykułu"></Image>
        </div>
        <div className={`${styles.tableOfContents}`}>
          <p>Spis treści</p>
          <ol>
            {data.content.map((contentData) => {
              return (
                <li key={contentData.order}>
                  <a href={`/blog/${data.pathname}#${contentData.order}`}>{contentData.title}</a>
                </li>
              );
            })}
          </ol>
        </div>
        <div className={`${styles.articleContentDataWrapper}`}>
          {data.content.map((contentData, index, array) => {
            const { order, title, content } = contentData;

            if (index === (array.length - 1) / 2) {
              return (
                <div key={order}>
                  <Section13 blog={true}></Section13>
                  <div className={`${styles.singleData}`} id={`${order}`}>
                    <h2>
                      {index + 1}. {title}
                    </h2>
                    <div className={`${styles.content}`}>
                      {content.map((contentData) => {
                        return <p key={contentData.order} dangerouslySetInnerHTML={{ __html: contentData.content }}></p>;
                      })}
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div className={`${styles.singleData}`} key={order} id={`${order}`}>
                  <h2>
                    {index + 1}. {title}
                  </h2>
                  <div className={`${styles.content}`}>
                    {content.map((contentData) => {
                      return <p key={contentData.order} dangerouslySetInnerHTML={{ __html: contentData.content }}></p>;
                    })}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogArticle;
