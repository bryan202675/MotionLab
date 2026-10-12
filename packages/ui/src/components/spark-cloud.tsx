"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type SparkCloudProps = Omit<FieldStudyProps, "variant">;

export function SparkCloud(props: SparkCloudProps) {
  return <FieldStudy variant="spark-cloud" {...props} />;
}
