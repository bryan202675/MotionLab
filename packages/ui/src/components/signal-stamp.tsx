"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type SignalStampProps = Omit<TextStudyProps, "variant">;

export function SignalStamp(props: SignalStampProps) {
  return <TextStudy variant="signal-stamp" {...props} />;
}
