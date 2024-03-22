import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { createResponse, response } from "../../response";
import { prisma } from "../../../../../../prisma/prisma";
import "../../../firebaseInitialize";

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
    const blogArticle = await prisma.blogArticle.findUnique({
      where: {
        pathname: params.pathname,
      },
    });

    if (blogArticle) {
      const storage = getStorage();

      const image = await getDownloadURL(ref(storage, `blogArticles/${blogArticle.id}/image.webp`));

      const formatedBlogArticle = {
        ...blogArticle,
        image: {
          file: null,
          url: image,
        },
        sections: JSON.parse(blogArticle!.sections as string),
        entry: JSON.parse(blogArticle!.entry as string),
      };
      return createResponse(200, null, formatedBlogArticle);
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

const blogGetByPathname = async (pathname: string): Promise<response<blogArticle>> => {
  return fetch(`${process.env.NEXT_PUBLIC_URL}/api/blog/get/${pathname}`, {
    method: "GET",
    cache: "no-cache",
  }).then((response) => response.json());
};

export { blogGetByPathname };
