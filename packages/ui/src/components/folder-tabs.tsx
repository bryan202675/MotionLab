"use client";

import { LayoutStudy, type LayoutStudyProps } from "./studies/layout-study";

export type FolderTabsProps = Omit<LayoutStudyProps, "variant">;

export function FolderTabs(props: FolderTabsProps) {
  return <LayoutStudy variant="folder-tabs" {...props} />;
}
