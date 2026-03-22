"use client";

import type { BlogPost } from "@cwr/shared/client";

export function BlogPostClient({ post }: { post: BlogPost }) {
  return (
    <article className="cwr-blog-post">
      <h1 className="cwr-blog-post-title">{post.title}</h1>
      <div className="cwr-blog-post-meta">
        <span>{post.author}</span>
        <span>{post.date}</span>
      </div>
      <p className="cwr-blog-post-body">{post.body}</p>
    </article>
  );
}
