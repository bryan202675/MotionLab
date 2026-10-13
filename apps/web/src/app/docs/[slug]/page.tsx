import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { docsNavigation, getDoc } from "@/lib/docs";
import { DocsView } from "@/components/docs-view";

interface DocsPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return docsNavigation.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: DocsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getDoc(slug);
  return page ? { title: page.title.replaceAll(".", ""), description: page.description } : {};
}

export default async function DocsArticle({ params }: DocsPageProps) {
  const { slug } = await params;
  const page = getDoc(slug);
  if (!page) notFound();

  return <DocsView slug={slug} />;
}
