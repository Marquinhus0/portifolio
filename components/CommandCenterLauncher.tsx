"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ProductCommandCenter = dynamic(() => import("./ProductCommandCenter"), {
  ssr: false,
});

export default function CommandCenterLauncher() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-center", handleCustomOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-center", handleCustomOpen);
    };
  }, []);

  if (!isOpen) return null;

  return <ProductCommandCenter isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
