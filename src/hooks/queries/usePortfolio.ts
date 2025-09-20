import { FGetPortfolioList } from "@/api/api";
import { TGetPortfolioList } from "@/api/api.type";
import { useQuery } from "@tanstack/react-query";

export default function usePortfolio({
  page,
  limit = 5,
}: {
  page: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["gallery", page, limit],
    queryFn: async () => {
      try {
        const res = await FGetPortfolioList({ page, limit });
        if (!res.ok) {
          return null;
        }
        return (await res.json()) as TGetPortfolioList;
      } catch {
        return null;
      }
    },
  });
}
