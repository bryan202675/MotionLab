"use client";

import { FieldStudy, type FieldStudyProps } from "./studies/field-study";

export type DotMigrationProps = Omit<FieldStudyProps, "variant">;

export function DotMigration(props: DotMigrationProps) {
  return <FieldStudy variant="dot-migration" {...props} />;
}
