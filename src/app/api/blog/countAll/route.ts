import { prisma } from "../../../../../prisma/prisma";
import { createResponse, response } from "../response";

export const GET = async (request: Request) => {
  try {
    const response = await prisma.blogArticle.count();

    return createResponse(200, null, response);
  } catch (e) {
    const error = e as Error;
    return createResponse(500, error.message, null);
  }
};

export const blogCountAll = async (): Promise<response<number>> => {
  return fetch(`${process.env.NEXT_PUBLIC_URL}/api/blog/countAll`, {
    method: "GET",
    cache: "no-cache",
  }).then((response) => response.json());
};
