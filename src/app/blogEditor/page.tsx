import BlogEditor from "@/components/BlogEditor/BlogEditor";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    googleBot: {
      index: false,
    },
  },
};

const BlogEditorPage = async () => {
  return <BlogEditor></BlogEditor>;
};

export default BlogEditorPage;
