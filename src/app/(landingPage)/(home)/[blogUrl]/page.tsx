import { blogGetByUrl } from "@/app/api/blog/get/[url]/route";
import BlogArticle from "@/components/BlogArticle/BlogArticle";
import Section11 from "@/components/sections/Section11/Section11";
import Section9 from "@/components/sections/Section9/Section9";

interface componentProps {
  params: { blogUrl: string };
}

const BlogArticlePage = async ({ params }: componentProps) => {
  //const blogArticleResponse = await blogGetByUrl(params.blogUrl);

  const blogArticleResponse = { data: null };

  return blogArticleResponse.data ? (
    <>
      <BlogArticle data={blogArticleResponse.data}></BlogArticle>
      <Section11 type="blog"></Section11>
      <Section9 type="blog"></Section9>
    </>
  ) : (
    <p>Nie ma takiego artykułu</p>
  );
};

export default BlogArticlePage;