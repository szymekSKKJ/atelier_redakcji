import prisma from "../../../../../prisma/prisma";
import { createResponse, response } from "../../response";
import { category as articleCategory } from "../get/some/route";

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);

    const category = url.searchParams.get("category") as string;

    const response =
      category === "wszystko"
        ? await prisma.blogArticle.count()
        : await prisma.blogArticle.count({
            where: {
              category: url.searchParams.get("category") as string,
            },
          });

    return createResponse(200, null, response);
  } catch (e) {
    const error = e as Error;
    return createResponse(500, error.message, null);
  }
};

export const blogCountAll = async (category: articleCategory): Promise<response<number | null>> => {
  return fetch(`${process.env.NEXT_PUBLIC_URL}/api/blog/countAll/?category=${category}`, {
    method: "GET",
    cache: "no-store",
  }).then((response) => response.json()) as Promise<response<number | null>>;
};
