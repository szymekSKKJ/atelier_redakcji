import prisma from "../../../../../../../prisma/prisma";
import { createResponse, response } from "@/app/api/response";

export type blogArticle = {
  id: string;
  title: string;
  category: string;
  pathname: string;
  createdAt: Date;
  entry: {
    order: number;
    content: string;
  }[];
  image: {
    url: string | null;
  };
  sections: {
    order: number;
    title: string;
    paragraphs: {
      order: number;
      content: string;
    }[];
  }[];
};

const GET = async (request: Request, { params }: { params: { pathname: string } }) => {
  try {
    const blogArticleMetadata = await prisma.blogArticle.findUnique({
      where: {
        pathname: params.pathname,
      },
      select: {
        title: true,
        entry: true,
      },
    });

    if (blogArticleMetadata) {
      const formattedData = {
        title: blogArticleMetadata.title,
        description: JSON.parse(blogArticleMetadata.entry as string)[0].content,
      };
      return createResponse(200, null, formattedData);
    } else {
      return createResponse(200, null, null);
    }
  } catch (e) {
    const error = e as Error;
    return createResponse(500, error.message, null);
  }
};

export { GET };

export const dynamic = "force-dynamic";

const blogGetMetadataByPathname = async (
  pathname: string
): Promise<
  response<{
    title: string;
    description: string;
  }>
> => {
  return await fetch(`${process.env.NEXT_PUBLIC_URL}/api/blog/get/metadata/${pathname}`, {
    method: "GET",
    cache: "no-store",
  }).then((response) => response.json());
};

export { blogGetMetadataByPathname };
