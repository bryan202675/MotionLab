"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type EchoStackProps = Omit<TextStudyProps, "variant">;

export function EchoStack(props: EchoStackProps) {
  return <TextStudy variant="echo-stack" {...props} />;
}
