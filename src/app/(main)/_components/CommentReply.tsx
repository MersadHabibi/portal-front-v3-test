import { TComment } from "@/types";
import Image from "next/image";

export default function CommentReply({ reply }: { reply: TComment }) {
  return (
    <div className="flex flex-row items-start gap-5 pr-[70px] sm:pr-[98px]">
      <Image
        src={"/images/profile-placeholder.jpg"}
        alt="avatar"
        width={150}
        height={150}
        className="sm:size-[78px] size-[50px] rounded-full"
      />
      <div className="flex flex-col gap-[5px]">
        <div className="flex flex-row gap-[11px]">
          <span className="font-bold text-[16px]/[35px]">{reply.name}</span>
          {/* reply icon here */}
        </div>
        <p className="font-normal text-[14px]/[35px]">{reply.body}</p>
        <p className="text-[#868686] font-normal text-[10px]/[35px]">
          {new Date(reply.createdAt || "").toLocaleDateString("fa-IR")}
        </p>
      </div>
    </div>
  );
}
