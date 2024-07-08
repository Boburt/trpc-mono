// components/CustomHead.tsx
import Head from "next/head";
import { useRouter } from "next/router";

export function CustomHead({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const router = useRouter();
  const canonicalUrl = `${process.env.NEXT_PUBLIC_API_URL}${router.asPath}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
}
