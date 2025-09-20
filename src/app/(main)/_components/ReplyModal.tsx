"use client";

import useCreateCommentForm, {
  VCreateCommentForm,
} from "@/forms/useCreateCommentForm";
import useCreateComment from "@/hooks/mutations/useCreateComment";
import { IReply, ISend } from "@/icons";
import Modal from "@/modules/Modal";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ReplyModal({
  id,
  parentId,
  url,
}: {
  id: number;
  parentId: number;
  url: string;
}) {
  console.log(url);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const queryClient = useQueryClient();
  const { createComment } = useCreateComment();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useCreateCommentForm();

  const onError = () => {
    console.log(Object.values(errors));
    const firstErrMsg = Object.values(errors)[0]?.message;
    toast.error(
      !firstErrMsg || !firstErrMsg.length
        ? "فیلد ها نامعتبر هستند"
        : firstErrMsg
    );
  };

  const onSubmit = async (data: VCreateCommentForm) => {
    setIsPending(true);
    const result = await createComment.mutateAsync({
      id,
      parentId,
      name: data.name,
      email: data.email,
      body: data.body,
      type: "POST",
    });
    if (result) {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
      setIsOpenModal(false);
      reset();
    }
    setIsPending(false);
  };

  return (
    <>
      <button onClick={() => setIsOpenModal(true)}>
        <IReply />
      </button>

      <Modal
        title="پاسخ"
        isOpenModal={isOpenModal}
        onCloseModal={() => setIsOpenModal(false)}
        boxClassName="size-full rounded-custom100 sm:w-[80%] lg:w-[60%] sm:h-auto max-h-full bg-white"
        bgClassName="bg-black/20 p-3"
      >
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="flex flex-col gap-6 p-5 w-full"
        >
          {/* Comment Input Section */}
          <div className="flex flex-col gap-[10px]">
            <label
              htmlFor="comment"
              className="font-semibold text-[14px] text-gray-700"
            >
              دیدگاه خود را به اشتراک بگذارید ...
            </label>
            <textarea
              id="comment"
              className="w-full scrollbar-hide rounded-[10px]  min-h-[120px] border border-[#CCCCCC] p-3 text-[14px] focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              dir="rtl"
              maxLength={3000}
              rows={1}
              {...register("body")}
            />
          </div>

          {/* Name, Email, and Send Button Section */}
          <div className="flex flex-col lg:flex-nowrap flex-wrap md:flex-row gap-6 w-full md:items-end ">
            {/* Name Input */}
            <div className="flex flex-col gap-[10px] md:w-[100%] lg:flex-3 w-full ">
              <label
                htmlFor="name"
                className="font-semibold text-[14px] text-gray-700"
              >
                نام و نام خانوادگی *
              </label>
              <input
                id="name"
                className="rounded-[10px] lg:w-full w-full border border-[#CCCCCC] h-[50px] p-3 text-[14px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                type="text"
                placeholder="نام خود را وارد کنید"
                maxLength={100}
                {...register("name")}
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-[10px] md:w-[100%] lg:flex-3 w-full">
              <label
                htmlFor="email"
                className="font-semibold text-[14px] text-gray-700"
              >
                ایمیل *
              </label>
              <input
                id="email"
                className="rounded-[10px] lg:w-full w-full border border-[#CCCCCC] h-[50px] p-3 text-[14px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                maxLength={100}
                {...register("email")}
              />
            </div>

            {/* Submit Button */}
            <button
              disabled={isPending}
              className="bg-[#001B3A] w-[121px] lg:flex-1 h-[50px] rounded-[10px] flex justify-center items-center cursor-pointer hover:bg-[#003059] transition"
              type="submit"
            >
              {isPending ? "صبر کنید" : <ISend className="size-[24px]" />}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
