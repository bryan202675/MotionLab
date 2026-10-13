"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type ShardFieldProps = Omit<FieldStudyProps, "variant">;

export function ShardField(props: ShardFieldProps) {
  return <FieldStudy variant="shard-field" {...props} />;
}
