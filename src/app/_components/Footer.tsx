import { FGetPage } from "@/api/api";
import Logo2 from "./Logo2";
import { TPage } from "@/types";
import { detectSocialMedia } from "@/lib/socialMedia";
import Link from "next/link";

export default async function Footer() {
  let homePage: TPage | null = null;

  try {
    const res = await FGetPage({ url: "home" });

    if (!res.ok) {
      homePage = null;
      throw new Error();
    }

    homePage = (await res.json()).data as TPage;
  } catch {
    homePage = null;
  }

  // const description =
  //   homePage?.keyValues.find(
  //     (keyValue) => keyValue.key === "footer-description"
  //   )?.value || "";
  const copyright =
    homePage?.keyValues.find((keyValue) => keyValue.key === "copyright")
      ?.value || "";

  const socialMedia = homePage?.keyValues.filter((keyValue) =>
    keyValue.key.startsWith("footer-social")
  );

  return (
    <footer className="relative w-full h-[338px] flex print:hidden flex-col items-center justify-between bg-[#C5A46640]">
      <div className="flex flex-col justify-center gap-[0px] items-center w-full h-full pt-8">
        <div className="w-[227px] h-[90px]">
          <Logo2 className="size-full" />
        </div>
        {/* <div
          dangerouslySetInnerHTML={{ __html: description }}
          className="text-white text-sm font-normal max-w-[248px] text-center"
        /> */}
        <div className="flex justify-center items-center gap-1.5 mt-[24px]">
          {socialMedia?.map((socialMedia, index) => (
            <Link
              href={socialMedia.value}
              key={index}
              className="cursor-pointer bg-[#C5A46640] hover:bg-primary flex justify-center items-center size-[50px] rounded-full border border-white/30 p-[2px] transition-all duration-300"
            >
              {detectSocialMedia(socialMedia.value)}
            </Link>
          ))}
        </div>
      </div>
      <div
        className="w-full max-w-[1132px] flex justify-center items-center h-[60px] text-black text-xs font-light border-t-[1px] border-[#CCCCCC]"
        dangerouslySetInnerHTML={{ __html: copyright }}
      />
    </footer>
  );
}
