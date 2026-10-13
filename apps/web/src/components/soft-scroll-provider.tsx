"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { SoftScroll, type SoftScrollRef } from "@motionlab/ui/soft-scroll";

export function SoftScrollProvider({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<SoftScrollRef>(null);
  const pathname = usePathname();

  useEffect(() => {
    // When changing routes in Next.js, reset scroll to top immediately
    if (scrollRef.current?.lenis) {
      scrollRef.current.lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return (
    <SoftScroll
      ref={scrollRef}
      root
      lerp={0.09}
      duration={1.2}
      wheelMultiplier={1.0}
      touchMultiplier={1.2}
      smoothWheel
      anchors
      autoRaf
    >
      {children}
    </SoftScroll>
  );
}
