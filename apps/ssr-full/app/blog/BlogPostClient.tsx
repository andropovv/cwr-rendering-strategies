"use client";

import { BlogPostView } from "@cwr/shared";
import type { BlogPost } from "@cwr/shared";

export function BlogPostClient({ post }: { post: BlogPost }) {
  return (
    <div>
      <BlogPostView post={post} />
    </div>
  );
}
