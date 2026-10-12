"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type VerticalRegisterProps = Omit<TextStudyProps, "variant">;

export function VerticalRegister(props: VerticalRegisterProps) {
  return <TextStudy variant="vertical-register" {...props} />;
}
