import { createResponse, response } from "../response";
import "../../firebaseInitialize";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { prisma } from "../../../../../prisma/prisma";

const POST = async (request: Request) => {
  try {
    const requestData = await request.formData();

    const doesBlogAlreadyExists = await prisma.blogArticle.findUnique({
      where: {
        pathname: requestData.get("pathname") as string,
      },
    });

    if (doesBlogAlreadyExists) {
      const existingBlog = doesBlogAlreadyExists;

      const createdBlogArticle = await prisma.blogArticle.update({
        where: {
          id: existingBlog.id,
        },
        data: {
          pathname: requestData.get("pathname") as string,
          content: requestData.get("content") as string,
          title: requestData.get("title") as string,
          category: requestData.get("category") as string,
          entry: requestData.get("entry") as string,
        },
      });

      const storage = getStorage();

      await uploadBytes(ref(storage, `blogArticles/${createdBlogArticle.id}/image.webp`), requestData.get("image") as File);

      return createResponse(200, null, null);
    } else {
      const createdBlogArticle = await prisma.blogArticle.create({
        data: {
          pathname: requestData.get("pathname") as string,
          content: requestData.get("content") as string,
          title: requestData.get("title") as string,
          category: requestData.get("category") as string,
          entry: requestData.get("entry") as string,
        },
      });

      const storage = getStorage();

      await uploadBytes(ref(storage, `blogArticles/${createdBlogArticle.id}/image.webp`), requestData.get("image") as File);

      return createResponse(200, null, null);
    }
  } catch (e) {
    const error = e as Error;
    return createResponse(500, error.message, null);
  }
};

export { POST };

export const dynamic = "force-dynamic";

const blogCreateOrUpdate = async (
  pathname: string,
  category: string,
  title: string,
  content: {
    order: number;
    title: string | null;
    content: {
      order: number;
      content: string | null;
    }[];
  }[],
  entry: {
    order: number;
    content: string | null;
  }[],
  image: File
): Promise<response<null>> => {
  const formData = new FormData();

  formData.append("pathname", pathname);
  formData.append("category", category);
  formData.append("content", `${JSON.stringify(content)}`);
  formData.append("image", image);
  formData.append("title", title);
  formData.append("entry", `${JSON.stringify(entry)}`);

  return fetch(`${process.env.NEXT_PUBLIC_URL}/api/blog/createOrUpdate`, {
    method: "POST",
    body: formData,
  }).then((response) => response.json());
};

export { blogCreateOrUpdate };
