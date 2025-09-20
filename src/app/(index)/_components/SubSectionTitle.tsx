import { IAngleLeft, IAngleRight } from "@/icons";

export default function SubSectionTitle({ title }: { title: string }) {
  return (
    <div className="flex place-content-center gap-5">
      <IAngleRight />
      <h2 className="text-[26px] font-medium text-black">{title}</h2>
      <IAngleLeft />
    </div>
  );
}
