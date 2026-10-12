"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type SoftJitterProps = Omit<TextStudyProps, "variant">;

export function SoftJitter(props: SoftJitterProps) {
  return <TextStudy variant="soft-jitter" {...props} />;
}
