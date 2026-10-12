"use client";

import { SurfaceStudy, type SurfaceStudyProps } from "./studies/surface-study";

export type DeckShuffleProps = Omit<SurfaceStudyProps, "variant">;

export function DeckShuffle(props: DeckShuffleProps) {
  return <SurfaceStudy variant="deck-shuffle" {...props} />;
}
