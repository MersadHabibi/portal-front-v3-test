import { Suspense } from "react";
import PageContent from "./PageContent";

export default function Gallery() {
  return (
    <Suspense>
      <PageContent />
    </Suspense>
  );
}
