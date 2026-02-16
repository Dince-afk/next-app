// import { revalidatePath } from "next/cache";
import { GlobalConfig } from "payload";

export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: {
    de: "Homepage",
    en: "Homepage",
  },
  // versions: {
  //   drafts: {
  //     autosave: false,
  //   },
  // },
  hooks: {
    afterChange: [
      () => {
        // revalidatePath("/(app)/[lang]/(main)/homepage", "page");
      },
    ],
  },
  admin: {
    preview: (_, { locale }) => `/${locale}/`,
    // livePreview: {
    //   url: ({ locale }) => {
    //     const pageUrl = `/${locale}/homepage`;
    //     return `${process.env.NEXT_PUBLIC_SERVER_URL}/api/draft?secret=${process.env.PAYLOAD_SECRET}&redirectPath=${pageUrl}`;
    //   },
    // },
    // livePreview: { url: "/" },
  },
  fields: [{ name: "content", type: "richText", localized: true }],
};
