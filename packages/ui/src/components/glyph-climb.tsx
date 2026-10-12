"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type GlyphClimbProps = Omit<TextStudyProps, "variant">;

export function GlyphClimb(props: GlyphClimbProps) {
  return <TextStudy variant="glyph-climb" {...props} />;
}
