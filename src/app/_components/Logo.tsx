"use client";

import { FGetGeneralSetting } from "@/api/api";
import { TGeneralSetting } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
  const { data } = useQuery({
    queryKey: ["logo"],
    queryFn: async () => {
      const res = await FGetGeneralSetting();
      if (!res.ok) return null;

      const data = (await res.json()) as {data:TGeneralSetting};
      return data;
    },
  });

  return (
    <Image
      src={data?.data?.logo?.url || "/images/image-placeholder.jpg"}
      alt="revayat logo"
      width={500}
      height={500}
      className={className}
    />
  );
}
