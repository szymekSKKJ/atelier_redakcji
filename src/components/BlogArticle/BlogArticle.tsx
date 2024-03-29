"use client";

import styles from "./styles.module.scss";
import Image from "next/image";
import arrowRightGrayIcon from "../../../public/arrow_right_grey.svg";
import { blogArticle } from "@/app/api/blog/get/[pathname]/route";
import Section13 from "../sections/Section13/Section13";

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
        {data.image.url && (
          <div className={`${styles.imageWrapper}`}>
            <Image src={data.image.url} width={500} height={212} alt="Zdjęcie artykułu"></Image>
          </div>
        )}
        <div className={`${styles.tableOfContents}`}>
          <p>Spis treści</p>
          <ol>
            {data.sections.map((dataLocal, index) => {
              const { order, title } = dataLocal;

              return (
                <li key={order}>
                  <a href={`/${data.pathname}#${order}`}>{title}</a>
                </li>
              );
            })}
          </ol>
        </div>
        <div className={`${styles.articleContentDataWrapper}`}>
          {data.sections.map((localData, index, array) => {
            const { order, title, paragraphs } = localData;

            return (
              <div key={order}>
                {index === (array.length - 1) / 2 && <Section13 blog={true}></Section13>}
                <div className={`${styles.singleData}`} id={`${order}`}>
                  <h2>
                    {index + 1}. {title}
                  </h2>
                  <div className={`${styles.content}`}>
                    {paragraphs.map((localData) => {
                      const { order, content } = localData;

                      return <div key={order} dangerouslySetInnerHTML={{ __html: content }}></div>;
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogArticle;
