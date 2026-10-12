"use client";

import { ControlStudy, type ControlStudyProps } from "./studies/control-study";

export type BalanceControlProps = Omit<ControlStudyProps, "variant">;

export function BalanceControl(props: BalanceControlProps) {
  return <ControlStudy variant="balance-control" {...props} />;
}
