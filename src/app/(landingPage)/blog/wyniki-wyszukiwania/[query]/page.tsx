import styles from "./styles.module.scss";
import { blogFind } from "@/app/api/blog/find/route";
import { blogGetSome } from "@/app/api/blog/get/some/route";
import BlogArticlesBrief from "@/components/BlogArticlesBrief/BlogArticlesBrief";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    googleBot: {
      index: false,
    },
  },
};

const SearchResultsPage = async ({ params: { query } }: { params: { query: string } }) => {
  const decodedQuery = decodeURIComponent(query);
  const response = await blogFind(decodedQuery);

  const formattedArticlesForQuery: {
    image: {
      file: null;
      url: string | null;
    };
    entry: any;
    id: string;
    createdAt: Date;
    title: string;
    pathname: string;
    category: string;
  }[][] = [];

  const formattedArticlesIfNoneFound: {
    image: {
      file: null;
      url: string | null;
    };
    entry: any;
    id: string;
    createdAt: Date;
    title: string;
    pathname: string;
    category: string;
  }[][] = [];

  if (response.data && response.data.length !== 0) {
    const foundArticles = response.data;

    foundArticles.forEach((data, index) => {
      if (index % 3 === 0) {
        const newArray = [];
        newArray.push(data);

        formattedArticlesForQuery.push(newArray);
      } else {
        formattedArticlesForQuery.at(-1)!.push(data);
      }
    });
  } else {
    const response = await blogGetSome(0, 3, true);

    if (response.data) {
      const foundArticles = response.data;

      foundArticles.forEach((data, index) => {
        if (index % 3 === 0) {
          const newArray = [];

          newArray.push(data);
          formattedArticlesIfNoneFound.push(newArray);
        } else {
          formattedArticlesIfNoneFound.at(-1)!.push(data);
        }
      });
    }
  }

  return (
    <div className={`${styles.searchResultsPage}`}>
      <p className={`${styles.resultsString}`}>
        Wyniki wyszukiwania dla: <span>{decodedQuery}</span>
      </p>
      {formattedArticlesForQuery.length !== 0 ? (
        formattedArticlesForQuery.map((data) => {
          return (
            <>
              <BlogArticlesBrief page="blog" key={data[0].id} articles={data}></BlogArticlesBrief>
            </>
          );
        })
      ) : (
        <>
          <div className={`${styles.notFoundWrapper}`}>
            <p className={`${styles.notFound}`}>Żaden artykuł nie pasuje do podanej frazy</p>
            <p className={`${styles.notFound}`}>Zachęcamy do przeczytania innych artykułów:</p>
          </div>
          {formattedArticlesIfNoneFound.map((data) => {
            return (
              <>
                <BlogArticlesBrief page="blog" key={data[0].id} articles={data}></BlogArticlesBrief>
              </>
            );
          })}
        </>
      )}
    </div>
  );
};

export default SearchResultsPage;
