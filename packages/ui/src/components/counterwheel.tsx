"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type CounterwheelProps = Omit<TextStudyProps, "variant">;

export function Counterwheel(props: CounterwheelProps) {
  return <TextStudy variant="counterwheel" {...props} />;
}
