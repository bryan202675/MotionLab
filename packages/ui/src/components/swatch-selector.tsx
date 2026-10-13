"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type SwatchSelectorProps = Omit<ControlStudyProps, "variant">;

export function SwatchSelector(props: SwatchSelectorProps) {
  return <ControlStudy variant="swatch-selector" {...props} />;
}
