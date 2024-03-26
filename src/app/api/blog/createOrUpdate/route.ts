import { createResponse, response } from "../../response";
import "../../firebaseInitialize";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import prisma from "../../../../../prisma/prisma";

const POST = async (request: Request) => {
  try {
    const requestData = await request.formData();

    const articleId = requestData.get("id") as string | null;

    const doesBlogAlreadyExists = await prisma.blogArticle.findUnique({
      where: {
        id: articleId ? articleId : "",
      },
    });

    if (doesBlogAlreadyExists) {
      const existingBlog = doesBlogAlreadyExists;

      const updatedBlogArticle = await prisma.blogArticle.update({
        where: {
          id: existingBlog.id,
        },
        data: {
          pathname: requestData.get("pathname") as string,
          sections: requestData.get("sections") as string,
          title: requestData.get("title") as string,
          category: requestData.get("category") as string,
          entry: requestData.get("entry") as string,
        },
      });

      const image = requestData.get("image") as null | File;

      if (image) {
        const storage = getStorage();

        await uploadBytes(ref(storage, `blogArticles/${updatedBlogArticle.id}/image.webp`), requestData.get("image") as File);
      }

      return createResponse(200, null, { id: updatedBlogArticle.id });
    } else {
      try {
        const createdBlogArticle = await prisma.blogArticle.create({
          data: {
            pathname: requestData.get("pathname") as string,
            sections: requestData.get("sections") as string,
            title: requestData.get("title") as string,
            category: requestData.get("category") as string,
            entry: requestData.get("entry") as string,
          },
        });

        const storage = getStorage();

        await uploadBytes(ref(storage, `blogArticles/${createdBlogArticle.id}/image.webp`), requestData.get("image") as File);

        return createResponse(200, null, { id: createdBlogArticle.id });
      } catch (e) {
        return createResponse(500, "Blog o podanym url już istnieje", null);
      }
    }
  } catch (e) {
    const error = e as Error;
    return createResponse(500, error.message, null);
  }
};

export { POST };

const blogCreateOrUpdate = async (
  id: string | null,
  pathname: string,
  category: string,
  title: string,
  entry: {
    order: number;
    content: string;
  }[],
  image: {
    file: File | null;
    url: string | null;
  },
  sections: {
    order: number;
    title: string;
    paragraphs: {
      order: number;
      content: string;
    }[];
  }[]
): Promise<response<{ id: string }>> => {
  const formData = new FormData();

  if (id) {
    formData.append("id", id);
  }

  formData.append("pathname", pathname);
  formData.append("category", category);
  formData.append("sections", JSON.stringify(sections));

  if (image.file) {
    image && formData.append("image", image.file);
  }

  formData.append("title", title);
  formData.append("entry", JSON.stringify(entry));

  return fetch(`${process.env.NEXT_PUBLIC_URL}/api/blog/createOrUpdate`, {
    method: "POST",
    body: formData,
    cache: "no-store",
  }).then((response) => response.json());
};

export { blogCreateOrUpdate };
