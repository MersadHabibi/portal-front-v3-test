import { ReactNode } from "react";
import Footer from "../_components/Footer";

export default function Indexlayout({ children }: { children: ReactNode }) {
  return (
    <main className="w-full flex flex-col justify-start items-center">
      {children}
      <Footer />
    </main>
  );
}
