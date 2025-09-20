import { Link } from "lucide-react";
import Image from "next/image";

import telegramIcon from "../../public/logos/telegram.svg";

export function detectSocialMedia(url: string) {
  if (url.includes("ble.ir")) {
    return (
      <Image
        src="/logos/bale.png"
        alt="bale"
        width={100}
        height={100}
        className="size-[75%] object-cover rounded-full"
      />
    );
  } else if (url.includes("eitaa.com")) {
    return (
      <Image
        src="/logos/eita.png"
        alt="eitaa"
        width={100}
        height={100}
        className="size-[75%] object-cover rounded-full"
      />
    );
  } else if (url.includes("rubika.ir")) {
    return (
      <Image
        src="/logos/rubika.jpg"
        alt="rubika"
        width={100}
        height={100}
        className="size-[60%] object-cover rounded-full"
      />
    );
  } else if (url.includes("splus.ir")) {
    return (
      <Image
        src="/logos/soroush.jpg"
        alt="splus"
        width={100}
        height={100}
        className="size-[60%] object-cover rounded-full"
      />
    );
  } else if (url.includes("t.me")) {
    return (
      <Image
        src={telegramIcon}
        alt="splus"
        width={100}
        height={100}
        className="size-[60%] object-cover rounded-full"
      />
    );
  } else {
    return <Link className="size-[60%] rounded-full" />;
  }
}
