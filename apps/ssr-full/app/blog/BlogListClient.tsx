"use client";

import type { BlogPost } from "@cwr/shared/client";

export function BlogListClient({ posts }: { posts: BlogPost[] }) {
  return (
    <div>
      <h1>Блог</h1>
      {posts.map((post) => (
        <article key={post.id} className="cwr-blog-card">
          <h2 className="cwr-blog-card-title">
            <a href={`/blog/${post.slug}`}>{post.title}</a>
          </h2>
          <p className="cwr-blog-card-excerpt">{post.excerpt}</p>
          <div className="cwr-blog-card-meta">
            <span>{post.author}</span>
            <span>{post.date}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
