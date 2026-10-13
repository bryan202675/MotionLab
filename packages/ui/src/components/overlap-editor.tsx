"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type OverlapEditorProps = Omit<SurfaceStudyProps, "variant">;

export function OverlapEditor(props: OverlapEditorProps) {
  return <SurfaceStudy variant="overlap-editor" {...props} />;
}
