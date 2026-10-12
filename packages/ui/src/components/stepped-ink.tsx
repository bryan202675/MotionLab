"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type SteppedInkProps = Omit<TextStudyProps, "variant">;

export function SteppedInk(props: SteppedInkProps) {
  return <TextStudy variant="stepped-ink" {...props} />;
}
