"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type SplitRegisterProps = Omit<TextStudyProps, "variant">;

export function SplitRegister(props: SplitRegisterProps) {
  return <TextStudy variant="split-register" {...props} />;
}
