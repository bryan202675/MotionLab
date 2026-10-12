"use client";

import { TextStudy, type TextStudyProps } from "./studies/text-study";

export type TerminalResolveProps = Omit<TextStudyProps, "variant">;

export function TerminalResolve(props: TerminalResolveProps) {
  return <TextStudy variant="terminal-resolve" {...props} />;
}
