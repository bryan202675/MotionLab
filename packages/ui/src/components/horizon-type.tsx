"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type HorizonTypeProps = Omit<TextStudyProps, "variant">;

export function HorizonType(props: HorizonTypeProps) {
  return <TextStudy variant="horizon-type" {...props} />;
}
