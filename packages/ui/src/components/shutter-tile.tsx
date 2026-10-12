"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type ShutterTileProps = Omit<SurfaceStudyProps, "variant">;

export function ShutterTile(props: ShutterTileProps) {
  return <SurfaceStudy variant="shutter-tile" {...props} />;
}
