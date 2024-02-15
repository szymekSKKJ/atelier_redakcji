import { prisma } from "../../../../../../prisma/prisma";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { createResponse, response } from "../../response";
import "../../../firebaseInitialize";

const POST = async (request: Request, { params }: { params: { id: string } }) => {
  try {
    const requestData = await request.formData();

    const createdBlogArticle = await prisma.blogArticle.update({
      where: {
        id: params.id,
      },
      data: {
        url: requestData.get("url") as string,
        content: requestData.get("content") as string,
        title: requestData.get("title") as string,
        category: requestData.get("categoryTitle") as string,
        entry: requestData.get("entry") as string,
      },
    });

    if (requestData.get("image")) {
      const storage = getStorage();

      await uploadBytes(ref(storage, `blogArticles/${createdBlogArticle.id}/image.webp`), requestData.get("image") as File);
    }

    return createResponse(200, null, null);
  } catch (e) {
    const error = e as Error;
    return createResponse(500, error.message, null);
  }
};

export { POST };

export const dynamic = "force-dynamic";

const blogUpdate = async (
  id: string,
  url: string,
  categoryTitle: string,
  title: string,
  content: string,
  entry: string,
  image?: File
): Promise<response<null>> => {
  const formData = new FormData();

  formData.append("url", url);
  formData.append("categoryTitle", categoryTitle);
  formData.append("content", content);
  formData.append("title", title);
  formData.append("entry", entry);

  if (image) {
    formData.append("image", image);
  }

  return fetch(`${process.env.NEXT_PUBLIC_URL}/api/blog/update/${id}`, {
    method: "POST",
    body: formData,
  }).then((response) => response.json());
};

export { blogUpdate };
