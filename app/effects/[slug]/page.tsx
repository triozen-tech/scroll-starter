import GroupLoader from "@/components/effects/GroupLoader";
import { GROUPS } from "@/components/effects/registry";

export const generateStaticParams = () => GROUPS.map((g) => ({ slug: g.slug }));

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <GroupLoader slug={slug} />;
}
