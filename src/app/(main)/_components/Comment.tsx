import Image from "next/image";
import CommentReply from "./CommentReply";
import { TComment } from "@/types";
import ReplyModal from "./ReplyModal";

export default function Comment({ comment, postId, postUrl }: { comment: TComment; postId:number; postUrl:string; }) {
  return (
    <div className="flex flex-col sm:gap-4 gap-6">
      {/* Main Comment */}
      <div className="flex flex-row items-start gap-5">
        <Image
          src={"/images/profile-placeholder.jpg"}
          alt="Avatar"
          width={150}
          height={150}
          className="sm:size-[78px] size-[50px] rounded-full"
        />
        <div className="flex flex-col gap-[5px]">
          <div className="flex flex-row items-center gap-[11px]">
            <span className="font-bold sm:text-[16px]/[35px] text-[14px]/[35px]">
              {comment.name}
            </span>
            <ReplyModal id={postId} parentId={comment.id} url={postUrl} />
          </div>
          <p className="font-normal sm:text-[14px]/[35px] text-[12px]/[25px]">
            {comment.body}
          </p>
          <p className="text-[#868686] font-normal text-[10px]/[35px]">
            {new Date(comment.createdAt || "").toLocaleDateString("fa-IR")}
          </p>
        </div>
      </div>

      {/* Replies */}
      {comment.replies && (
        <div className="flex flex-col gap-3">
          {comment.replies.map((reply, index) => (
            <CommentReply key={index} reply={reply} />
          ))}
        </div>
      )}
    </div>
  );
}
