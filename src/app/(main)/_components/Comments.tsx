"use client";

import useComments from "@/hooks/queries/useComments";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import { cn } from "@/lib/style";

export default function Comments({
  url,
  postId,
}: {
  url: string;
  postId: number;
}) {
  const {
    comments: data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useComments({ id: postId });

  const comments = data?.pages
    .filter((page) => !!page)
    .flatMap((page) => page?.data);
  return (
    <div className="pt-[103px] w-full lg:px-[140px] md:px-[70px] sm:px-[35px] px-[25px] print:hidden">
      <p className="font-normal text-[32px] text-right mb-[64px]">دیدگاه ها</p>
      {(!comments || !comments.length) &&
        !(isFetching || isFetchingNextPage) && (
          <p className="mx-auto text-base text-black font-normal">
            دیدگاهی یافت نشد
          </p>
        )}
      {comments?.map((comment, index) => (
        <Comment key={index} comment={comment} postId={postId} postUrl={url} />
      ))}
      {hasNextPage && (
        <button
          disabled={isFetchingNextPage}
          type="button"
          onClick={() => fetchNextPage()}
          className={cn(
            "mx-auto mt-10 cursor-pointer flex justify-center items-center bg-primary px-4 py-3 rounded-custom100 text-white text-sm font-normal",
            isFetchingNextPage && "animate-pulse"
          )}
        >
          {isFetchingNextPage ? "صبر کنید..." : "نمایش دیدگاه های بیشتر"}
        </button>
      )}
      {(isFetching || isFetchingNextPage) && (
        <>
          <div className="bg-gray-200 w-full h-28 rounded-custom100 animate-pulse mb-8" />
          <div className="bg-gray-200 w-full h-28 rounded-custom100 animate-pulse mb-8" />
          <div className="bg-gray-200 w-full h-28 rounded-custom100 animate-pulse mb-8" />
        </>
      )}

      {/* Pass the refetch function to AddComment so it refreshes the comments on successful submission */}
      <CreateComment postId={postId} postUrl={url} />
    </div>
  );
}
