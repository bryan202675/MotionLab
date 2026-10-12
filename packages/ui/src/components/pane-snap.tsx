"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type PaneSnapProps = Omit<LayoutStudyProps, "variant">;

export function PaneSnap(props: PaneSnapProps) {
  return <LayoutStudy variant="pane-snap" {...props} />;
}
