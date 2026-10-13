"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import Lenis from "lenis";

export interface SoftScrollContextValue {
  lenis: Lenis | null;
  scrollTo: (
    target: number | string | HTMLElement,
    options?: {
      offset?: number;
      immediate?: boolean;
      duration?: number;
      easing?: (t: number) => number;
      lerp?: number;
      onComplete?: () => void;
    },
  ) => void;
}

const SoftScrollContext = createContext<SoftScrollContextValue>({
  lenis: null,
  scrollTo: () => {},
});

export function useSoftScroll() {
  return useContext(SoftScrollContext);
}

export interface SoftScrollProps {
  children?: React.ReactNode;
  /**
   * Whether to attach smooth scrolling to window/document (root: true)
   * or to an inner scrollable container (root: false).
   * @default false
   */
  root?: boolean;
  /**
   * Linear interpolation damping (0 to 1). Lower is softer/smoother.
   * @default 0.1
   */
  lerp?: number;
  /**
   * Scroll duration in seconds.
   * @default 1.2
   */
  duration?: number;
  /**
   * Mouse wheel multiplier.
   * @default 1
   */
  wheelMultiplier?: number;
  /**
   * Touch multiplier.
   * @default 1.2
   */
  touchMultiplier?: number;
  /**
   * Whether smooth wheel is enabled.
   * @default true
   */
  smoothWheel?: boolean;
  /**
   * Whether touch gestures should be synced.
   * @default false
   */
  syncTouch?: boolean;
  /**
   * Infinite scrolling mode.
   * @default false
   */
  infinite?: boolean;
  /**
   * Scroll orientation.
   * @default "vertical"
   */
  orientation?: "vertical" | "horizontal";
  /**
   * Auto requestAnimationFrame loop.
   * @default true
   */
  autoRaf?: boolean;
  /**
   * Smoothly scroll to anchor hash links (e.g. #section).
   * @default true
   */
  anchors?: boolean;
  /**
   * Master toggle for soft scrolling.
   * @default true
   */
  enabled?: boolean;
  /**
   * Class name applied to wrapper when root is false.
   */
  className?: string;
  /**
   * Inline style applied to wrapper when root is false.
   */
  style?: React.CSSProperties;
  /**
   * Callback on scroll events with position, limit, velocity and progress.
   */
  onScroll?: (e: {
    scroll: number;
    limit: number;
    velocity: number;
    direction: number;
    progress: number;
  }) => void;
}

export interface SoftScrollRef {
  wrapper: HTMLDivElement | null;
  content: HTMLDivElement | null;
  lenis: Lenis | null;
}

export const SoftScroll = forwardRef<SoftScrollRef, SoftScrollProps>(function SoftScroll(
  {
    children,
    root = false,
    lerp = 0.1,
    duration = 1.2,
    wheelMultiplier = 1,
    touchMultiplier = 1.2,
    smoothWheel = true,
    syncTouch = false,
    infinite = false,
    orientation = "vertical",
    autoRaf = true,
    anchors = true,
    enabled = true,
    className = "",
    style,
    onScroll,
  },
  ref,
) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      lenis: lenisInstance,
    }),
    [lenisInstance],
  );

  useEffect(() => {
    if (typeof window === "undefined" || !enabled) {
      setLenisInstance(null);
      return;
    }

    const prefersReducedMotion =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;

    const lenis = new Lenis({
      wrapper: root ? window : (wrapperRef.current ?? window),
      content: root ? document.documentElement : (contentRef.current ?? document.documentElement),
      lerp,
      duration: prefersReducedMotion ? 0 : duration,
      wheelMultiplier,
      touchMultiplier,
      smoothWheel: !prefersReducedMotion && smoothWheel,
      syncTouch,
      infinite,
      orientation,
      autoRaf,
      anchors,
      prevent: (node) => {
        if (!node || typeof (node as HTMLElement).closest !== "function") return false;
        return (node as HTMLElement).closest("[data-lenis-prevent]") !== null;
      },
      respectReducedMotion: true,
    });

    setLenisInstance(lenis);

    const handleScroll = (e: {
      scroll: number;
      limit: number;
      velocity: number;
      direction: number;
      progress: number;
    }) => {
      onScroll?.({
        scroll: e.scroll ?? 0,
        limit: e.limit ?? 0,
        velocity: e.velocity ?? 0,
        direction: e.direction ?? 0,
        progress: e.progress ?? 0,
      });
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, [
    root,
    lerp,
    duration,
    wheelMultiplier,
    touchMultiplier,
    smoothWheel,
    syncTouch,
    infinite,
    orientation,
    autoRaf,
    anchors,
    enabled,
    onScroll,
  ]);

  const scrollTo: SoftScrollContextValue["scrollTo"] = (target, options) => {
    lenisInstance?.scrollTo(target, options);
  };

  const contextValue: SoftScrollContextValue = {
    lenis: lenisInstance,
    scrollTo,
  };

  if (root) {
    return <SoftScrollContext.Provider value={contextValue}>{children}</SoftScrollContext.Provider>;
  }

  return (
    <SoftScrollContext.Provider value={contextValue}>
      <div
        ref={wrapperRef}
        className={`soft-scroll-wrapper ${className}`.trim()}
        style={{
          overflow: "hidden",
          position: "relative",
          ...style,
        }}
      >
        <div ref={contentRef} className="soft-scroll-content">
          {children}
        </div>
      </div>
    </SoftScrollContext.Provider>
  );
});
