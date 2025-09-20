"use client";

import { IShare } from "@/icons";
import { cn } from "@/lib/style";
// import { shortenUrl } from "@/lib/url";
import { useState } from "react";

type Props = {
  title?: string;
  text?: string;
  // url: string;
};

export default function Share({}: Props) {
  // const handleShare = () => {
  //   if (navigator.share) {
  //     navigator.share({
  //       // title: newsData?.data.title || "اخبار",
  //       // text:     || "Check out this news!",
  //       // url: window.location.href,
  //       title: title || "اخبار",
  //       text: text || "خبر جدید",
  //       url: window.location.href,
  //     });
  //   } else {
  //     alert("مرورگر شما از قابلیت اشتراک گذاری پشتیبانی نمی کند.");
  //   }
  // };

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        // const { shortUrl } = await shortenUrl(window.location.href);
        // if (shortUrl) {
        //   await navigator.clipboard.writeText(shortUrl);
        //   setMessage("کپی شد!");
        //   setShowMessage(true);
        //   setTimeout(() => {
        //     setShowMessage(false);
        //     // setMessage(null);
        //   }, 2000); // reset after 2s
        // } else {
        //   await navigator.clipboard.writeText(window.location.href);
        //   setMessage("کپی شد!");
        //   setShowMessage(true);
        //   setTimeout(() => {
        //     setShowMessage(false);
        //     // setMessage(null);
        //   }, 2000); // reset after 2s
        // }

        await navigator.clipboard.writeText(window.location.href);
        setMessage("کپی شد!");
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          // setMessage(null);
        }, 2000); // reset after 2s
      } else {
        setMessage("دستگاه شما قابلیت کپی کردن را پشتیبانی نمیکند");
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          // setMessage(null);
        }, 2000); // reset after 2s
      }
    } catch {
      setMessage("مشکلی رخ داد");
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        // setMessage(null);
      }, 2000); // reset after 2s
    }
  };

  return (
    <button
      onClick={handleCopyLink}
      className="relative flex justify-center items-center rounded-full bg-neutral p-2 !cursor-pointer"
      aria-label="Share this news link"
    >
      <IShare />

      <div
        className={cn(
          "absolute top-full w-max bg-black text-white text-sm px-3 py-1 rounded-custom100 invisible scale-0 transition-all duration-[150ms] ease-in-out",
          showMessage && "visible scale-100"
        )}
      >
        {message}
      </div>
    </button>
  );
}
