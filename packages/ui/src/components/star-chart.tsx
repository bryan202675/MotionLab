"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type StarChartProps = Omit<FieldStudyProps, "variant">;

export function StarChart(props: StarChartProps) {
  return <FieldStudy variant="star-chart" {...props} />;
}
