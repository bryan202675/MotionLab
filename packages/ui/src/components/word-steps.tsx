"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type WordStepsProps = Omit<TextStudyProps, "variant">;

export function WordSteps(props: WordStepsProps) {
  return <TextStudy variant="word-steps" {...props} />;
}
