import "./globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

import { Toaster } from "react-hot-toast";
import PageAnimationProvider from "@/providers/PageAnimationProvider";
import { FGetGeneralSetting } from "@/api/api";
import { TGeneralSetting } from "@/types";

export const generateMetadata = async () => {
  let generalSettings: TGeneralSetting | null = null;

  try {
    const res = await FGetGeneralSetting();

    if (!res.ok) {
      generalSettings = null;
      throw new Error();
    }

    generalSettings = (await res.json()).data as TGeneralSetting;
  } catch {
    generalSettings = null;
  }

  return {
    title: generalSettings?.title || "بنیاد روایت فتح",
    description: generalSettings?.description || "بنیاد روایت فتح",
    icons: {
      icon: [
        {
          url: generalSettings?.favIcon?.url || "/images/image-placeholder.jpg",
        },
      ],
    },
    openGraph: {
      title: generalSettings?.title || "",
      description: generalSettings?.description || "",
      siteName: generalSettings?.title || "",
      images: [
        {
          url: generalSettings?.logo?.url || "/images/image-placeholder.jpg",
          width: 800,
          height: 600,
          alt: generalSettings?.title || "",
        },
      ],
      locale: "fa_IR",
      type: "website",
    },
  };
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`antialiased overflow-x-hidden`}>
        <ReactQueryProvider>
          <PageAnimationProvider>
            {children} <Toaster />
          </PageAnimationProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
