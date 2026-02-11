import { postgresAdapter } from "@payloadcms/db-postgres";
import { s3Storage } from "@payloadcms/storage-s3";
import { resendAdapter } from "@payloadcms/email-resend";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { de } from "@payloadcms/translations/languages/de";
import { en } from "@payloadcms/translations/languages/en";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { buildConfig } from "payload";
import { Images } from "./collections/Images";
import { Users } from "./collections/Users";
import { Impressum } from "./globals/Impressum";
import { Privacy } from "./globals/Privacy";
import { Homepage } from "./globals/Homepage";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  i18n: { supportedLanguages: { de, en } }, // UI language
  localization: { defaultLocale: "de", locales: ["de", "en"] }, // Data languages
  admin: {
    meta: {
      titleSuffix: " - Admin", // A suffix behind every path and sub path under /admin
    },
    dateFormat: "dd MMM yyy - HH:mm:ss", // Anytime dates will be shown in the /admin site it will use this format
    user: Users.slug, // Define the main user collection
    importMap: {
      baseDir: path.resolve(dirname),
    },
    // Autofill credentials in dev env
    autoLogin:
      process.env.NODE_ENV === "development"
        ? {
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PW,
            prefillOnly: true,
          }
        : false,
    avatar: "default", // Nicer looking avatar icon
    components: {
      // Custom admin panel components
      beforeDashboard: ["@/components/payload/before-dashboard"],
      actions: ["@/components/payload/actions"],
      graphics: {
        Logo: "@/components/payload/logo",
        Icon: "@/components/payload/icon",
      },
    },
  },
  db: postgresAdapter({
    // Postgres-specific arguments go here.
    // `pool` is required.
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  collections: [Users, Images],
  globals: [Homepage, Impressum, Privacy],
  email: resendAdapter({
    defaultFromAddress: "admin@dihub.dev",
    defaultFromName: "Admin CMS",
    apiKey: process.env.RESEND_API_KEY || "",
  }),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  sharp,
  // Add extra plugins from payloadcms or community built
  plugins: [
    s3Storage({
      bucket: process.env.S3_BUCKET || "",
      clientUploads: true,
      collections: {
        images: {
          generateFileURL: ({ filename }) => {
            return `https://media-next.dihub.dev/${filename}`;
          },
        },
      },
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
        region: "auto",
        endpoint: process.env.S3_ENDPOINT,
      },
    }),
    seoPlugin({
      tabbedUI: true,
      collections: [],
      globals: ["impressum", "privacy", "homepage"],
      uploadsCollection: "images",
      generateURL: ({ locale }) =>
        `${process.env.NEXT_PUBLIC_SERVER_URL}/${locale}`,
    }),
  ],
});
