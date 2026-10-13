"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type FollowCardProps = Omit<SurfaceStudyProps, "variant">;

export function FollowCard(props: FollowCardProps) {
  return <SurfaceStudy variant="follow-card" {...props} />;
}
