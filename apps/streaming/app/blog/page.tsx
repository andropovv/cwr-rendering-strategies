import { Suspense } from "react";
import { getBlogPosts } from "@cwr/shared";
import { BlogCard } from "@cwr/shared";

export default function BlogPage() {
  const posts = getBlogPosts();
  return (
    <div>
      <h1>Блог</h1>
      <Suspense fallback={<p>Загрузка списка…</p>}>
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </Suspense>
    </div>
  );
}
