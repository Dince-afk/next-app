import { getPayload } from "payload";
import config from "@payload-config";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import LocalizedLink from "@/features/i18n/localized-link";
import Link from "next/link";

export const dynamic = "force-dynamic";
// import { RefreshRouteOnSave } from "@/components/refresh-route-on-save";
// import { draftMode } from "next/headers";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  let { lang } = await params;
  if (!lang || lang !== "de") lang = "de"; // default to en for all other lang params (hr, fr, es, ...)
  const payload = await getPayload({ config });
  const t = await payload.findGlobal({
    slug: "homepage",
    locale: (lang as "en") || "de",
  });
  return {
    title: t.meta?.title,
    description: t.meta?.description,
  };
}

// export async function generateStaticParams() {
//   const payload = await getPayload({ config });
//   const t = await payload.find({
//     collection: "translations",
//     select: { languageIsoCode: true },
//     pagination: false,
//   });
//   // console.log(
//   //   "generateStaticParams()",
//   //   t.docs.map((langData) => ({ lang: langData.languageIsoCode })),
//   // );
//   return t.docs.map((langData) => ({ lang: langData.languageIsoCode }));
//   // const languageData = await fetchLanguages();
//   // return languageData.map((lang) => ({ lang: lang.languageIsoCode }));
// }

export default async function Page(props: PageProps<"/[lang]">) {
  // const { isEnabled } = await draftMode();
  let { lang } = await props.searchParams;
  if (!lang || lang !== "de") lang = "en"; // default to en for all other lang params (hr, fr, es, ...)
  const payload = await getPayload({ config });
  const t = await payload.findGlobal({
    slug: "homepage",
    locale: (lang as "de") || "en",
    // draft: isEnabled,
  });
  const content = t.content as SerializedEditorState;

  return (
    <>
      {/* <RefreshRouteOnSave /> */}
      <div className="container mx-auto min-h-screen px-4 py-[15vh] pb-[15vh]">
        <p>{(await props.searchParams).page}</p>
        <Link href="/hello">Test</Link>
        <LocalizedLink href="/impressum">Impressum</LocalizedLink>
        <div className="prose dark:prose-invert mx-auto space-y-10">
          <RichText data={content} />
        </div>
      </div>
    </>
  );
}
