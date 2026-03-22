import { getBlogPosts } from "@cwr/shared/server";
import { BlogListClient } from "./BlogListClient";

export default async function BlogPage() {
  const posts = getBlogPosts();
  return <BlogListClient posts={posts} />;
}
