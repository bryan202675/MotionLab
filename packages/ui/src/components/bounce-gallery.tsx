"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type BounceGalleryProps = Omit<SurfaceStudyProps, "variant">;

export function BounceGallery(props: BounceGalleryProps) {
  return <SurfaceStudy variant="bounce-gallery" {...props} />;
}
