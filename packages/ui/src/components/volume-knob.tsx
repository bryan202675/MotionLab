"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type VolumeKnobProps = Omit<ControlStudyProps, "variant">;

export function VolumeKnob(props: VolumeKnobProps) {
  return <ControlStudy variant="volume-knob" {...props} />;
}
