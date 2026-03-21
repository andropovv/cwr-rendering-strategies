import React from "react";
import type { BlogPost } from "../data/blog";

export interface BlogPostViewProps {
  post: BlogPost;
}

export function BlogPostView({ post }: BlogPostViewProps) {
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
