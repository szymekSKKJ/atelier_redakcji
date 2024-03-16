import { blogGetByPathname } from "@/app/api/blog/get/[pathname]/route";
import BlogArticle from "@/components/BlogArticle/BlogArticle";
import Section11 from "@/components/sections/Section11/Section11";
import Section9 from "@/components/sections/Section9/Section9";

interface componentProps {
  params: { blogPathname: string };
}

const BlogArticlePage = async ({ params }: componentProps) => {
  const blogArticleResponse = await blogGetByPathname(params.blogPathname);

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
