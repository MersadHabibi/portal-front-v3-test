import { ReactNode } from "react";
import Footer from "../_components/Footer";
import Header from "../_components/Header";

export default function Mainlayout({ children }: { children: ReactNode }) {
  return (
    <main className="w-full flex flex-col justify-start items-center">
      <Header  />
      {children}
      <Footer />
    </main>
  );
}
