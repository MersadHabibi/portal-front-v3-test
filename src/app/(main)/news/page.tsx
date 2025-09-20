import {
  FGetCategoriesPostList,
  FGetCategoryList,
  FGetPostList,
} from "@/api/api";
import { TGetCategoriesPostList, TGetPostList } from "@/api/api.type";
import Pagination from "@/modules/Pagination";
import { TCategory, TPostItem } from "@/types";
import CategorySelector from "./_components/CategorySelector";
import Image from "next/image";
import { IClock, IComment } from "@/icons";
import NewsCard from "@/app/_components/NewsCard";
import Link from "next/link";

export default async function News({
  searchParams,
}: {
  searchParams?: Promise<{ category: string; page: string; search: string }>;
}) {
  const categoryId = Number((await searchParams)?.category || "0") || 0;
  const page = Number((await searchParams)?.page || 1) || 1;
  const search = (await searchParams)?.search;

  let categoriesList: TCategory[] | null = null;
  let postListData: any = null;

  try {
    const res = await FGetCategoryList();

    if (!res.ok) {
      categoriesList = null;
      throw new Error();
    }

    categoriesList = (await res.json()).data as TCategory[];
  } catch {
    categoriesList = null;
  }

  try {
    const res = !categoryId
      ? await FGetPostList({ page, limit: 7, search })
      : await FGetCategoriesPostList({ id: categoryId, page, limit: 7 });

    console.log("res: ", res);

    if (!res.ok) {
      postListData = null;
      throw new Error();
    }

    if (!categoryId) {
      postListData = (await res.json()) as TGetPostList;
    } else {
      postListData = (await res.json()) as TGetCategoriesPostList;
    }
  } catch {
    postListData = null;
  }

  const news: TPostItem[] | null | undefined = !categoryId
    ? postListData?.data
    : postListData?.data?.[0]?.content;

  return (
    <div className="w-full flex flex-col justify-start items-center pt-20 pb-32">
      <h1 className="text-black text-[32px] font-semibold">
        اخبار و رویداد ها
      </h1>

      <CategorySelector activeId={categoryId} categoriesList={categoriesList} />

      {(!news || !news.length) && (
        <p className="mx-auto mt-20 text-black font-normal text-base">
          خبری یافت نشد
        </p>
      )}

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-14 px-8 mt-20">
        {/* lead news */}
        {news?.[0] && (
          <>
            <Link
              href={`/news/${news?.[0]?.url || "#"}`}
              className="w-full hidden lg:flex justify-start gap-12 items-center md:col-span-2 lg:col-span-3 row-span-1"
            >
              <div className="w-1/2 aspect-16/11 rounded-[30px] overflow-hidden">
                <Image
                  src={
                    news?.[0]?.files?.[0]?.url ||
                    "/images/image-placeholder.jpg"
                  }
                  alt="lead image of news"
                  width={500}
                  height={300}
                  className="size-full object-cover"
                />
              </div>

              <div className="w-1/2 flex flex-col justify-start gap-5 items-start">
                <h2 className="text-black font-medium lg:text-[28px] xl:text-[32px]">
                  {news?.[0]?.title || ""}
                </h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: news?.[0]?.htmlCode || "",
                  }}
                  className="text-black font-medium text-[15px]/[35px] lg:line-clamp-3 xl:line-clamp-4"
                />
                <div className="flex justify-start gap-5 items-center text-[#007DC30] font-normal text-base">
                  <div className="flex justify-start gap-1 items-center">
                    <IComment />
                    {news?.[0]._count.comment || 0}
                  </div>
                  <div className="flex justify-start gap-1 items-center">
                    <IClock />
                    {new Date(news?.[0].updatedAt || "").toLocaleDateString(
                      "fa-IR"
                    )}
                  </div>
                </div>
              </div>
            </Link>

            <NewsCard data={news?.[0]} className="flex lg:hidden" />
          </>
        )}

        {news?.slice(1).map((newsItem, index) => (
          <NewsCard key={index} data={newsItem} className="w-full" />
        ))}
      </div>

      <Pagination
        pageInfo={{
          currentPage: postListData?.meta.page || 1,
          totalPages: postListData?.meta.totalPages || 1,
        }}
      />
    </div>
  );
}
