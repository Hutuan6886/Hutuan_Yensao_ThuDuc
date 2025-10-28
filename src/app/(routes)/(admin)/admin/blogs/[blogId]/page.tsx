import { getBlogById } from "@/servers/blog";
import BlogForm from "../_components/BlogForm";

const BlogPage = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const { blogId } = await params;
  const data = await getBlogById(blogId);
  return <BlogForm blogData={data} />;
};

export default BlogPage;
