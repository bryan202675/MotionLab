"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type RippleCopyProps = Omit<TextStudyProps, "variant">;

export function RippleCopy(props: RippleCopyProps) {
  return <TextStudy variant="ripple-copy" {...props} />;
}
