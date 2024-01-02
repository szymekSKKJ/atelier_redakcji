import getBlogArticle from "@/api/blog/getBlogArticle";
import BlogArticle from "@/components/BlogArticle/BlogArticle";
import Section11 from "@/components/sections/Section11/Section11";
import Section9 from "@/components/sections/Section9/Section9";

interface componentProps {
  params: { id: string };
}

const BlogArticlePage = async ({ params }: componentProps) => {
  const blogArticleData = await getBlogArticle(params.id);

  return blogArticleData ? (
    <>
      <BlogArticle data={blogArticleData}></BlogArticle>
      <Section11 type="blog"></Section11>
      <Section9 type="blog"></Section9>
    </>
  ) : (
    <p>:(</p>
  );
};

export default BlogArticlePage;
