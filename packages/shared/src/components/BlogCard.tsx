import React from "react";
import type { BlogPost } from "../data/blog";

export interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="cwr-blog-card">
      <h2 className="cwr-blog-card-title">
        <a href={`/blog/${post.slug}`}>{post.title}</a>
      </h2>
      <p className="cwr-blog-card-excerpt">{post.excerpt}</p>
      <div className="cwr-blog-card-meta">
        <span>{post.author}</span>
        <span>{post.date}</span>
      </div>
    </article>
  );
}
