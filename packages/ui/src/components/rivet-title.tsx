"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type RivetTitleProps = Omit<TextStudyProps, "variant">;

export function RivetTitle(props: RivetTitleProps) {
  return <TextStudy variant="rivet-title" {...props} />;
}
