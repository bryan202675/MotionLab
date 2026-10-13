"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type SpringTileProps = Omit<SurfaceStudyProps, "variant">;

export function SpringTile(props: SpringTileProps) {
  return <SurfaceStudy variant="spring-tile" {...props} />;
}
