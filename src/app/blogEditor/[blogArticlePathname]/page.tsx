import { blogGetByPathname } from "@/app/api/blog/get/[pathname]/route";
import ArticleEditor from "@/components/ArticleEditor/ArticleEditor";
import { url } from "inspector";
import { redirect } from "next/navigation";

interface componentProps {
  params: { blogArticlePathname: string };
}

const BlogEditorPageWithArticlePathname = async ({ params: { blogArticlePathname } }: componentProps) => {
  const articleResponse =
    blogArticlePathname === "create"
      ? {
          data: {
            id: null,
            title: null,
            createdAt: new Date(),
            category: null,
            pathname: null,
            entry: [
              {
                order: 0,
                content: null,
              },
            ],
            image: {
              file: null,
              url: null,
            },
            sections: [
              {
                order: 0,
                title: null,
                paragraphs: [
                  {
                    order: 0,
                    content: `<p></p>`,
                  },
                ],
              },
            ],
          },
        }
      : await blogGetByPathname(blogArticlePathname);

  if (articleResponse.data) {
    return <ArticleEditor currentActiveArticle={articleResponse.data}></ArticleEditor>;
  } else {
    redirect("/blogEditor");
  }
};

export default BlogEditorPageWithArticlePathname;
