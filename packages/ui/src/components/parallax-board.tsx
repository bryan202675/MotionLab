"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type ParallaxBoardProps = Omit<SurfaceStudyProps, "variant">;

export function ParallaxBoard(props: ParallaxBoardProps) {
  return <SurfaceStudy variant="parallax-board" {...props} />;
}
