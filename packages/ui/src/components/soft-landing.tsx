"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type SoftLandingProps = Omit<TextStudyProps, "variant">;

export function SoftLanding(props: SoftLandingProps) {
  return <TextStudy variant="soft-landing" {...props} />;
}
