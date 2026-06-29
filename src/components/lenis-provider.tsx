"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: none)").matches || window.innerWidth < 1024;
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (isTouchDevice()) return;

    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.9,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1,
    });

    const win = window as unknown as { lenis?: Lenis };
    win.lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete win.lenis;
    };
  }, []);

  return <>{children}</>;
}
