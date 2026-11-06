import type { Metadata } from "next";
import { CategoryView, categoryMetadata, categoryParams } from "@/components/shop/category-view";

export function generateStaticParams() {
  return categoryParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return categoryMetadata(slug);
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CategoryView slug={slug} />;
}
