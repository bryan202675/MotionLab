"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type GalleryFrameProps = Omit<SurfaceStudyProps, "variant">;

export function GalleryFrame(props: GalleryFrameProps) {
  return <SurfaceStudy variant="gallery-frame" {...props} />;
}
