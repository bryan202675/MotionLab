"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type TypePulseProps = Omit<TextStudyProps, "variant">;

export function TypePulse(props: TypePulseProps) {
  return <TextStudy variant="type-pulse" {...props} />;
}
