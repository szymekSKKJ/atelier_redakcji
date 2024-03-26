import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { createResponse, response } from "../../response";
import { blogArticle } from "../get/[pathname]/route";
import "../../firebaseInitialize";
import prisma from "../../../../../prisma/prisma";
import { category } from "../get/some/route";

const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);

    const stringOfWords = url.searchParams.get("stringOfWords") as string;
    const formattedString = stringOfWords.split(" ").join(" | ");

    const category = url.searchParams.get("category") as string;

    const bolgArticles =
      category === "wszystko"
        ? await prisma.blogArticle.findMany({
            take: parseInt(url.searchParams.get("take") as string),
            skip: parseInt(url.searchParams.get("skip") as string),
            where: {
              OR: [
                {
                  title: {
                    search: formattedString,
                  },
                },
                {
                  title: {
                    contains: stringOfWords,
                  },
                },
                {
                  title: {
                    startsWith: stringOfWords,
                  },
                },
                {
                  title: {
                    endsWith: stringOfWords,
                  },
                },
              ],
            },
          })
        : await prisma.blogArticle.findMany({
            take: parseInt(url.searchParams.get("take") as string),
            skip: parseInt(url.searchParams.get("skip") as string),
            where: {
              AND: {
                category: category,
                OR: [
                  {
                    title: {
                      search: formattedString,
                    },
                  },
                  {
                    title: {
                      contains: stringOfWords,
                    },
                  },
                  {
                    title: {
                      startsWith: stringOfWords,
                    },
                  },
                  {
                    title: {
                      endsWith: stringOfWords,
                    },
                  },
                ],
              },
            },
          });

    const formatedBlogArticles = await Promise.all(
      bolgArticles.map(async (data) => {
        const storage = getStorage();

        const image = await getDownloadURL(ref(storage, `blogArticles/${data.id}/image.webp`));

        return {
          ...data,
          image: {
            file: null,
            string: image,
          },
          content: JSON.parse(data.sections as string),
          entry: JSON.parse(data.entry as string),
        };
      })
    );

    return createResponse(200, null, formatedBlogArticles);
  } catch (e) {
    const error = e as Error;
    return createResponse(500, error.message, null);
  }
};

export { GET };

const blogFind = async (stringQuery: string, take: number = 10, skip: number = 0, category: category = "wszystko"): Promise<response<blogArticle[]>> => {
  const formattedString = stringQuery.replace(/\s+/g, " ").trim().toLowerCase();

  return fetch(`${process.env.NEXT_PUBLIC_URL}/api/blog/find/?stringOfWords=${formattedString}&take=${take}&skip=${skip}&category=${category}`, {
    method: "GET",
    cache: "no-store",
  }).then((response) => response.json());
};

export { blogFind };
