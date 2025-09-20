import { cn } from "@/lib/style";

export default function HistoryItem({
  isActive = false,
  data,
}: {
  isActive?: boolean;
  data: { title: string; date: string; description: string };
}) {
  return (
    <>
      {/* show when inactive */}
      <div
        className={cn(
          "flex flex-col justify-center items-center bg-transparent h-full border-b border-[#CCCCCC] border-dashed sm:px-24 w-[312px]",
          isActive && "hidden"
        )}
      >
        <div className="flex flex-col justify-center gap-0 items-start">
          <div
            dangerouslySetInnerHTML={{ __html: data.title }}
            className="text-base text-black font-medium"
          />
          <div
            dangerouslySetInnerHTML={{ __html: data.date }}
            className="text-xs text-[#686868] font-normal"
          />
        </div>

        <div className="translate-y-2 mt-5 bg-[#D9D9D9] size-[15px] rounded-full" />
      </div>

      {/* show when acitive */}
      <div
        className={cn(
          "hidden flex-col justify-start items-start bg-white px-5 py-[24px] [box-shadow:0_0_25px_rgba(0,0,0,0.1)] rounded-custom200 w-[357px] min-h-[232px]",
          isActive && "flex"
        )}
      >
        <div
          dangerouslySetInnerHTML={{ __html: data.title }}
          className="text-xl text-primary font-bold"
        />
        <div
          dangerouslySetInnerHTML={{ __html: data.date }}
          className="text-xs text-[#686868] font-normal mt-1"
        />
        <div
          dangerouslySetInnerHTML={{ __html: data.description }}
          className="text-black font-normal text-[15px]/[25px] mt-4"
        />
      </div>
    </>
  );
}
