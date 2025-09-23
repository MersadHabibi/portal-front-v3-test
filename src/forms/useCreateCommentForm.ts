import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(3, "نام خود را وارد کنید!"),
  email: z.email("لطفا ایمیل مجاز وارد کنید!"),
  body: z.string().nonempty("لطفا متن دیدگاه تان را بنویسید!"),
});

export type  VCreateCommentForm = z.infer<typeof formSchema>;

export default function useCreateCommentForm() {
  return useForm<VCreateCommentForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
}
