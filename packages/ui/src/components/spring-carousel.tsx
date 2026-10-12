"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type SpringCarouselProps = Omit<SurfaceStudyProps, "variant">;

export function SpringCarousel(props: SpringCarouselProps) {
  return <SurfaceStudy variant="spring-carousel" {...props} />;
}
