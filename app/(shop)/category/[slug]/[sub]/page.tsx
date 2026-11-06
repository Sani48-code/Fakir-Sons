import type { Metadata } from "next";
import { CategoryView, categoryMetadata, subcategoryParams } from "@/components/shop/category-view";

type Params = Promise<{ slug: string; sub: string }>;

export function generateStaticParams() {
  return subcategoryParams();
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug, sub } = await params;
  return categoryMetadata(slug, sub);
}

export default async function SubcategoryPage({ params }: { params: Params }) {
  const { slug, sub } = await params;
  return <CategoryView slug={slug} sub={sub} />;
}
