"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type AccordionStackProps = Omit<LayoutStudyProps, "variant">;

export function AccordionStack(props: AccordionStackProps) {
  return <LayoutStudy variant="accordion-stack" {...props} />;
}
