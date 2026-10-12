"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type WorkspaceRailProps = Omit<LayoutStudyProps, "variant">;

export function WorkspaceRail(props: WorkspaceRailProps) {
  return <LayoutStudy variant="workspace-rail" {...props} />;
}
