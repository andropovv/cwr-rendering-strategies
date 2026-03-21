import { getBlogPosts } from "@cwr/shared";
import { BlogCard } from "@cwr/shared";

export default function BlogPage() {
  const posts = getBlogPosts();
  return (
    <div>
      <h1>Блог</h1>
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
