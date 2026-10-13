"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type FocusPullProps = Omit<TextStudyProps, "variant">;

export function FocusPull(props: FocusPullProps) {
  return <TextStudy variant="focus-pull" {...props} />;
}
