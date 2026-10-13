"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type RadialMenuProps = Omit<LayoutStudyProps, "variant">;

export function RadialMenu(props: RadialMenuProps) {
  return <LayoutStudy variant="radial-menu" {...props} />;
}
