"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type DisclosureKeyProps = Omit<ControlStudyProps, "variant">;

export function DisclosureKey(props: DisclosureKeyProps) {
  return <ControlStudy variant="disclosure-key" {...props} />;
}
