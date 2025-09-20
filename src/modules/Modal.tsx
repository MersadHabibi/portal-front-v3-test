"use client";

import { cn } from "@/lib/style";
import { X } from "lucide-react";
import { ReactNode, useEffect } from "react";

export default function Modal({
  children,
  title,
  isOpenModal,
  onCloseModal,
  bgClassName,
  boxClassName,
}: {
  children: ReactNode | ReactNode[];
  title: string;
  isOpenModal: boolean;
  onCloseModal: () => void;
  bgClassName?: string;
  boxClassName?: string;
}) {
  useEffect(() => {
    if (isOpenModal) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpenModal]);
  return (
    <div
      onClick={onCloseModal}
      className={cn(
        "fixed top-0 left-0 z-[100] w-screen h-screen bg-dark-2/70 backdrop-blur-sm flex justify-center items-center transition-all duration-300 ease-in-out",
        isOpenModal ? "visible opacity-100" : "invisible opacity-0",
        bgClassName
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "flex flex-col justify-start gap-5 items-center size-full bg-white overflow-y-auto [scrollbar-width:thin]",
          boxClassName
        )}
      >
        <div className="flex justify-between items-center px-5 py-2 w-full">
          <h2 className="text-base sm:text-lg text-dark-2 font-semibold">
            {title}
          </h2>
          <button
            className="flex justify-center items-center p-2 rounded-full size-10 hover:bg-light-2"
            onClick={onCloseModal}
          >
            <X className="size-5 text-dark-1 " />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
