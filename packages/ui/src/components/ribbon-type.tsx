"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type RibbonTypeProps = Omit<TextStudyProps, "variant">;

export function RibbonType(props: RibbonTypeProps) {
  return <TextStudy variant="ribbon-type" {...props} />;
}
