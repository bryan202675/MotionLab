"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type TiltPaneProps = Omit<SurfaceStudyProps, "variant">;

export function TiltPane(props: TiltPaneProps) {
  return <SurfaceStudy variant="tilt-pane" {...props} />;
}
