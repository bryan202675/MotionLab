"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type FlowLaneProps = Omit<LayoutStudyProps, "variant">;

export function FlowLane(props: FlowLaneProps) {
  return <LayoutStudy variant="flow-lane" {...props} />;
}
