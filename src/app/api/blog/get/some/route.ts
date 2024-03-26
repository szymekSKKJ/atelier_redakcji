import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { createResponse, response } from "../../../response";
import { blogArticle } from "../[pathname]/route";
import "../../../firebaseInitialize";
import { categories as blogCategories } from "@/data/blog/categories";
import prisma from "../../../../../../prisma/prisma";

const GET = async (request: Request) => {
  const url = new URL(request.url);
  try {
    const category = url.searchParams.get("category") as string;

    const bolgArticles =
      category === "wszystko"
        ? await prisma.blogArticle.findMany({
            skip: parseInt(url.searchParams.get("skip") as string),
            take: parseInt(url.searchParams.get("take") as string),
            orderBy: {
              createdAt: "desc",
            },
          })
        : await prisma.blogArticle.findMany({
            where: {
              category: url.searchParams.get("category") as string,
            },
            skip: parseInt(url.searchParams.get("skip") as string),
            take: parseInt(url.searchParams.get("take") as string),
            orderBy: {
              createdAt: "desc",
            },
          });

    const formatedBlogArticles = await Promise.all(
      bolgArticles.map(async (data) => {
        try {
          const storage = getStorage();

          const image = await getDownloadURL(ref(storage, `blogArticles/${data.id}/image.webp`));

          return {
            ...data,
            image: {
              file: null,
              url: image,
            },
            sections: JSON.parse(data.sections as string),
            entry: JSON.parse(data.entry as string),
          };
        } catch (e) {
          return {
            ...data,
            image: {
              file: null,
              url: null,
            },
            sections: JSON.parse(data.sections as string),
            entry: JSON.parse(data.entry as string),
          };
        }
      })
    );

    return createResponse(200, null, formatedBlogArticles);
  } catch (e) {
    const error = e as Error;
    return createResponse(500, error.message, null);
  }
};

export { GET };

const categoriesType = blogCategories.map((data) => data.name) as string[] as [
  "prace licencjackie",
  "prace inżynierskie",
  "prace magisterskie",
  "prace doktorskie i habilitacyjne",
  "prace zaliczeniowe",
  "prace dyplomowe",
  "prace naukowe",
  "teksty specjalistyczne",
  "inne teksty",
  "wszystko"
];

// export const dynamic = "force-dynamic";

export type category = (typeof categoriesType)[number];

const blogGetSome = async (skip: number = 0, take: number = 3, isServerSide = false, category: category = "wszystko"): Promise<response<blogArticle[]>> => {
  const request = new Request(`${process.env.NEXT_PUBLIC_URL}/api/blog/get/some/?skip=${skip}&take=${take}&category=${category}`);

  if (isServerSide) {
    const response = await GET(request).then((response) => response.json());

    return response;
    // const headers = await import("next/headers");
    // return await fetch(`${process.env.NEXT_PUBLIC_URL}/api/blog/get/some/?skip=${skip}&take=${take}&category=${category}`, {
    //   method: "GET",
    //   headers: new Headers(headers.headers()),
    // }).then((response) => response.json());
  } else {
    return await fetch(request, {
      method: "GET",
      cache: "no-store",
    }).then((response) => response.json());
  }
};

export { blogGetSome };
