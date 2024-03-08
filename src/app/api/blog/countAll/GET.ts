import { createResponse } from "../response";

export const GET = async (request: Request) => {
  try {
    return createResponse(200, null, formatedBlogArticles);
  } catch (e) {
    const error = e as Error;
    return createResponse(500, error.message, null);
  }
};
