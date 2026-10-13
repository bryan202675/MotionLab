"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type InkWashProps = Omit<TextStudyProps, "variant">;

export function InkWash(props: InkWashProps) {
  return <TextStudy variant="ink-wash" {...props} />;
}
