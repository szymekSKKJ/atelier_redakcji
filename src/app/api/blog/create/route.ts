import { createResponse, response } from "../response";
import "../../firebaseInitialize";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { prisma } from "../../../../../prisma/prisma";

const POST = async (request: Request) => {
  try {
    const requestData = await request.formData();

    const createdBlogArticle = await prisma.blogArticle.create({
      data: {
        url: requestData.get("url") as string,
        content: requestData.get("content") as string,
        title: requestData.get("title") as string,
        category: requestData.get("categoryTitle") as string,
        entry: requestData.get("entry") as string,
      },
    });

    const storage = getStorage();

    await uploadBytes(ref(storage, `blogArticles/${createdBlogArticle.id}/image.webp`), requestData.get("image") as File);

    return createResponse(200, null, null);
  } catch (e) {
    const error = e as Error;
    return createResponse(500, error.message, null);
  }
};

export { POST };

export const dynamic = "force-dynamic";

const blogCreate = async (url: string, categoryTitle: string, title: string, content: string, entry: string, image: File): Promise<response<null>> => {
  const formData = new FormData();

  formData.append("url", url);
  formData.append("categoryTitle", categoryTitle);
  formData.append("content", content);
  formData.append("image", image);
  formData.append("title", title);
  formData.append("entry", entry);

  return fetch(`${process.env.NEXT_PUBLIC_URL}/api/blog/create`, {
    method: "POST",
    body: formData,
  }).then((response) => response.json());
};

export { blogCreate };
