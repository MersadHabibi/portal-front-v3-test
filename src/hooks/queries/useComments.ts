import { FGetCommentList } from "@/api/api";
import { TGetCommentList } from "@/api/api.type";
import { useInfiniteQuery } from "@tanstack/react-query";

const LIMIT_PER_PAGE = 5;

export default function useComments({ id }: { id: number }) {
  const fetchComments = async ({ pageParam = 1 }) => {
    try {
      const res = await FGetCommentList({
        id,
        type: "POST",
        page: pageParam,
        limit: LIMIT_PER_PAGE,
      });

      if (!res.ok) return null;

      const data: TGetCommentList = await res.json();

      console.log("debug ", data);

      return {
        data: data.data.comment,
        next:
          data.meta.totalPages <= data.meta.page
            ? undefined
            : data.meta.page + 1,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["comments", id],
    queryFn: fetchComments,
    getNextPageParam: (lastPage) =>
      lastPage?.next ? lastPage.next : undefined,
    initialPageParam: 1,
    refetchOnWindowFocus: false,
  });

  return {
    comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  };
}
