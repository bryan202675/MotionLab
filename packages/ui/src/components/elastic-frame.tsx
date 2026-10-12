"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type ElasticFrameProps = Omit<SurfaceStudyProps, "variant">;

export function ElasticFrame(props: ElasticFrameProps) {
  return <SurfaceStudy variant="elastic-frame" {...props} />;
}
