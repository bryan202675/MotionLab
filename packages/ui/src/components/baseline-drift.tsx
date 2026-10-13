"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type BaselineDriftProps = Omit<TextStudyProps, "variant">;

export function BaselineDrift(props: BaselineDriftProps) {
  return <TextStudy variant="baseline-drift" {...props} />;
}
