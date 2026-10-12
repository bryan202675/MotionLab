"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type RasterRainProps = Omit<FieldStudyProps, "variant">;

export function RasterRain(props: RasterRainProps) {
  return <FieldStudy variant="raster-rain" {...props} />;
}
