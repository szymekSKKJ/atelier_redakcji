import { blogGetByPathname } from "@/app/api/blog/get/[pathname]/route";
import ArticleEditor from "@/components/ArticleEditor/ArticleEditor";

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
            createdAt: null,
            category: null,
            pathname: blogArticlePathname,
            entry: [
              {
                order: 0,
                content: null,
              },
            ],
            image: {
              file: null,
              string: null,
            },
            content: [
              {
                order: 0,
                title: null,
                content: [
                  {
                    order: 0,
                    content: null,
                  },
                ],
              },
            ],
          },
        }
      : await blogGetByPathname(blogArticlePathname);

  if (articleResponse.data) {
    return <ArticleEditor currentActiveArticle={articleResponse.data}></ArticleEditor>;
  }
};

export default BlogEditorPageWithArticlePathname;
