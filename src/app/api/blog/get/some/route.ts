import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { createResponse, response } from "../../response";
import { prisma } from "../../../../../../prisma/prisma";
import { blogArticle } from "../[url]/route";
import "../../../firebaseInitialize";

const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);

    const bolgArticles = await prisma.blogArticle.findMany({
      skip: parseInt(url.searchParams.get("skip") as string),
      take: parseInt(url.searchParams.get("take") as string),
      orderBy: {
        createdAt: "desc",
      },
    });

    const formatedBlogArticles = await Promise.all(
      bolgArticles.map(async (data) => {
        const storage = getStorage();

        const image = await getDownloadURL(ref(storage, `blogArticles/${data.id}/image.webp`));

        return {
          ...data,
          image: image,
          content: JSON.parse(data.content as string),
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

export const dynamic = "force-dynamic";

const blogGetSome = async (skip: number = 0, take: number = 3, isServerSide = false): Promise<response<blogArticle[]>> => {
  if (isServerSide) {
    const headers = await import("next/headers");

    return await fetch(`${process.env.NEXT_PUBLIC_URL}/api/blog/get/some/?skip=${skip}&take=${take}`, {
      method: "GET",
      cache: "no-cache",
      headers: new Headers(headers.headers()),
    }).then((response) => response.json());
  } else {
    return await fetch(`${process.env.NEXT_PUBLIC_URL}/api/blog/get/some/?skip=${skip}&take=${take}`, {
      method: "GET",
      cache: "no-cache",
    }).then((response) => response.json());
  }
};

export { blogGetSome };
