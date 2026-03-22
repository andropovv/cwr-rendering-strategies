import { getBlogPosts, BlogCard } from "@cwr/shared/server";

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
