"use client";

import { BlogCard } from "@cwr/shared";
import type { BlogPost } from "@cwr/shared";

export function BlogListClient({ posts }: { posts: BlogPost[] }) {
  return (
    <div>
      <h1>Блог</h1>
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
