import { FGetPage } from "@/api/api";
import { TPage } from "@/types";
import GallerySlider from "../_components/GallerySlider";

enum KeyValues {
  ABOUT_TITLE = "about-title",
  ABOUT_VIEW = "about-view",
  ABOUT_PURPOSE = "about-purpose",
  GALLERY_IMAGE = "gallery-image", // in many format sepercated by -number
}

export default async function AboutUsPage() {
  let about_us_page: TPage | null = null;

  try {
    const res = await FGetPage({ url: "about-us" });

    if (!res.ok) {
      about_us_page = null;
      throw new Error();
    }

    about_us_page = (await res.json()).data as TPage;
  } catch {
    about_us_page = null;
  }

  const title =
    about_us_page?.keyValues.find(
      (keyValue) => keyValue.key === KeyValues.ABOUT_TITLE
    )?.value || "";
  const view =
    about_us_page?.keyValues.find(
      (keyValue) => keyValue.key === KeyValues.ABOUT_VIEW
    )?.value || "";
  const purpose =
    about_us_page?.keyValues.find(
      (keyValue) => keyValue.key === KeyValues.ABOUT_PURPOSE
    )?.value || "";

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <div className="text-[22px]/[50px] px-5 sm:text-[32px]/[70px] sm:px-3 lg:text-[42px]/[90px] font-bold text-black max-w-[994px] mt-24 text-center bg-white">
        &quot;
        <span className="border-b-[10px] border-[#00A3FF] pb-2">روایت فتح</span>
        &quot;
        {title}
      </div>

      <div className="w-full flex flex-col justify-start gap-10 items-center mt-5 px-4 sm:px-8 pt-24 bg-primary/10">
        <h2 className="text-black text-xl sm:text-2xl font-bold">
          گالری تصاویر بنیاد
        </h2>
        <GallerySlider data={about_us_page} className="w-full" />
      </div>

      <div className="w-full flex flex-col justify-start items-center md:flex-row md:justify-center gap-10 md:gap-5 md:items-start pt-20 md:pt-40 px-10 md:px-[180px] pb-44 leading-[35px]">
        <div className="flex-1">
          <p className="text-black text-xl md:text-2xl font-bold mb-5">چشم انداز</p>
          <div dangerouslySetInnerHTML={{ __html: view }} className="w-full" />
        </div>
        <div className="flex-1">
          <p className="text-black text-xl md:text-2xl font-bold mb-5">هدف</p>
          <div
            dangerouslySetInnerHTML={{ __html: purpose }}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
