"use client";

import { ReactNode } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageAnimationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="sync" initial={false}>
      <motion.div
        key={pathname} // triggers animation on route change
        initial={{ opacity:0, y: 20 }}
        animate={{ opacity:1, y:0  }}
        // exit={{ x: -20 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        {children} {/* all pages go here */}
      </motion.div>
    </AnimatePresence>
  );
}
