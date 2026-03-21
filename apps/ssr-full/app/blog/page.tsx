import { getBlogPosts } from "@cwr/shared";
import { BlogListClient } from "./BlogListClient";

export default async function BlogPage() {
  const posts = getBlogPosts();
  return <BlogListClient posts={posts} />;
}
