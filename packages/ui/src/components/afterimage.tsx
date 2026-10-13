"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type AfterimageProps = Omit<TextStudyProps, "variant">;

export function Afterimage(props: AfterimageProps) {
  return <TextStudy variant="afterimage" {...props} />;
}
