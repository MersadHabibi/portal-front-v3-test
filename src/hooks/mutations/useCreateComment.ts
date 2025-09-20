import { FCreateComment } from "@/api/api";
import { TCreateComment } from "@/api/api.type";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useCreateComment() {
  const createComment = useMutation({
    mutationFn: async (props: TCreateComment) => {
      try {
        const res = await FCreateComment({ props });

        if (!res.ok) {
          if (res.status === 500) throw new Error(JSON.stringify(res));
          const data = (await res.json()) as {
            message: string;
            details: string;
          };
          if (data.message || data.details)
            toast.error(data.message || data.details);
          return null;
        }

        const data = (await res.json()) as {
          message: string;
        };

        toast.success(data.message);

        return data;
      } catch {
        toast.error("مشکلی پیش آمده");

        return null;
      }
    },
  });

  return { createComment };
}
