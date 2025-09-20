import { FGetPage } from "@/api/api";
import { TPage } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function usePage({url}:{url:string}) {
  return useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      try {
        const res = await FGetPage({ url });
        if (!res.ok) {
          return null;
        }
        return (await res.json()).data as TPage;
      } catch {
        return null;
      }
    },
  });
}
