"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type CommandSwitcherProps = Omit<LayoutStudyProps, "variant">;

export function CommandSwitcher(props: CommandSwitcherProps) {
  return <LayoutStudy variant="command-switcher" {...props} />;
}
