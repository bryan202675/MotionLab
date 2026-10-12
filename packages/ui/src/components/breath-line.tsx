"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type BreathLineProps = Omit<TextStudyProps, "variant">;

export function BreathLine(props: BreathLineProps) {
  return <TextStudy variant="breath-line" {...props} />;
}
