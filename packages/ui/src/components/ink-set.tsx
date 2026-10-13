"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type InkSetProps = Omit<TextStudyProps, "variant">;

export function InkSet(props: InkSetProps) {
  return <TextStudy variant="ink-set" {...props} />;
}
