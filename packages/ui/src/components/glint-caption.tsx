"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type GlintCaptionProps = Omit<TextStudyProps, "variant">;

export function GlintCaption(props: GlintCaptionProps) {
  return <TextStudy variant="glint-caption" {...props} />;
}
