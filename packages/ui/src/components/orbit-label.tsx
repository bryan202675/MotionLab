"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type OrbitLabelProps = Omit<TextStudyProps, "variant">;

export function OrbitLabel(props: OrbitLabelProps) {
  return <TextStudy variant="orbit-label" {...props} />;
}
