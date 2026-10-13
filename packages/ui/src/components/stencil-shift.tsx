"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type StencilShiftProps = Omit<TextStudyProps, "variant">;

export function StencilShift(props: StencilShiftProps) {
  return <TextStudy variant="stencil-shift" {...props} />;
}
