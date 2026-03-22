import { getBlogPostBySlug, getBlogPosts } from "@cwr/shared/server";
import { notFound } from "next/navigation";
import { BlogPostClient } from "../BlogPostClient";

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
  return <BlogPostClient post={post} />;
}
