import { getContent } from "@/lib/content";
import { Home } from "@/components/Home";

export default async function Page() {
  const content = await getContent();
  return <Home content={content} />;
}
