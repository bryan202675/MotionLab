"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type RakeLettersProps = Omit<TextStudyProps, "variant">;

export function RakeLetters(props: RakeLettersProps) {
  return <TextStudy variant="rake-letters" {...props} />;
}
