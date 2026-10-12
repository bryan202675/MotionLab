"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type PlaybackKeyProps = Omit<ControlStudyProps, "variant">;

export function PlaybackKey(props: PlaybackKeyProps) {
  return <ControlStudy variant="playback-key" {...props} />;
}
