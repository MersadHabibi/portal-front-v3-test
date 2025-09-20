"use client";

import { IPrint } from "@/icons";
import { useEffect } from "react";

export default function Print({
  selector = "#printable-content",
}: {
  selector?: string;
}) {
  useEffect(() => {
    // Create a style element for print media if it doesn't exist
    if (!document.getElementById("print-style")) {
      const style = document.createElement("style");
      style.id = "print-style";
      style.innerHTML = `
        @media print {
          body * {
            visibility: hidden;
          }
          ${selector}, ${selector} * {
            visibility: visible;
          }
          ${selector} {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      // Clean up when component unmounts
      const styleEl = document.getElementById("print-style");
      if (styleEl) {
        document.head.removeChild(styleEl);
      }
    };
  }, [selector]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="rounded-full bg-neutral p-2 !cursor-pointer"
      aria-label="Print this page"
    >
      <IPrint />
    </button>
  );
}
