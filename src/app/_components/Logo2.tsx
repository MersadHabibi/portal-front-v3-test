"use client";

import { FGetPage } from "@/api/api";
import { TPage } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function Logo2({ className }: { className?: string }) {
  const { data } = useQuery({
    queryKey: ["footer-logo"],
    queryFn: async () => {
      const res = await FGetPage({ url: "home" });
      if (!res.ok) return null;

      const data = (await res.json()) as { data: TPage };
      return data;
    },
  });

  const logo =
    data?.data.keyValues.find((keyValue) => keyValue.key === "footer-logo")
      ?.filesValue.url || "/images/image-placeholder.jpg";
  return (
    <Image
      src={logo}
      alt="revayat logo"
      width={200}
      height={200}
      className={className}
    />
  );
}
