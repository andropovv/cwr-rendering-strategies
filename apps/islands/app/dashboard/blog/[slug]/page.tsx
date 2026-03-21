import { getBlogPostBySlug, getBlogPosts } from "@cwr/shared";
import { BlogPostView } from "@cwr/shared";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();
  return (
    <div>
      <BlogPostView post={post} />
    </div>
  );
}
