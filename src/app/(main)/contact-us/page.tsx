import { Suspense } from "react";
import ContactUsContent from "./PageContent";

export default function ContactUs() {
  return (
    <Suspense>
      <ContactUsContent />
    </Suspense>
  );
}
