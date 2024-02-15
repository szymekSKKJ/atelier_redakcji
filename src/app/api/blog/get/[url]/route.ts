import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { createResponse, response } from "../../response";
import { prisma } from "../../../../../../prisma/prisma";
import "../../../firebaseInitialize";

export type blogArticle = {
  id: string;
  title: string;
  category: string;
  url: string;
  createdAt: Date;
  entry: {
    id: string;
    content: string;
  }[];
  image: string;
  content: {
    id: string;
    title: string;
    content: {
      id: string;
      content: string;
    }[];
  }[];
};

const GET = async (request: Request, { params }: { params: { url: string } }) => {
  try {
    const blogArticle = await prisma.blogArticle.findUnique({
      where: {
        url: params.url,
      },
    });

    if (blogArticle) {
      const storage = getStorage();

      const image = await getDownloadURL(ref(storage, `blogArticles/${blogArticle.id}/image.webp`));

      const formatedBlogArticle = {
        ...blogArticle,
        image: image,
        content: JSON.parse(blogArticle!.content as string),
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

const blogGetByUrl = async (url: string): Promise<response<blogArticle>> => {
  return fetch(`${process.env.NEXT_PUBLIC_URL}/api/blog/get/${url}`, {
    method: "GET",
    cache: "no-cache",
  }).then((response) => response.json());
};

export { blogGetByUrl };
