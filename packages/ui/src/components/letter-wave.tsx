"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type LetterWaveProps = Omit<TextStudyProps, "variant">;

export function LetterWave(props: LetterWaveProps) {
  return <TextStudy variant="letter-wave" {...props} />;
}
