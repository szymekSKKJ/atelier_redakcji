import getBlogArticle from "@/api/blog/getBlogArticle";
import BlogArticle from "@/components/BlogArticle/BlogArticle";

interface componentProps {
  params: { id: string };
}

const BlogArticlePage = async ({ params }: componentProps) => {
  const blogArticleData = await getBlogArticle(params.id);

  return blogArticleData ? (
    <>
      <BlogArticle data={blogArticleData}></BlogArticle>
    </>
  ) : (
    <p>:(</p>
  );
};

export default BlogArticlePage;
