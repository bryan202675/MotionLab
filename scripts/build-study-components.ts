import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { originalStudies, type StudyFamily } from "../apps/web/src/lib/original-studies";

const root = resolve(import.meta.dirname, "..");
const generatedStart = "// BEGIN GENERATED MOTIONLAB STUDIES";
const generatedEnd = "// END GENERATED MOTIONLAB STUDIES";
const families: Record<StudyFamily, { component: string; props: string; source: string }> = {
  text: { component: "TextStudy", props: "TextStudyProps", source: "text-study.tsx" },
  control: { component: "ControlStudy", props: "ControlStudyProps", source: "control-study.tsx" },
  surface: { component: "SurfaceStudy", props: "SurfaceStudyProps", source: "surface-study.tsx" },
  layout: { component: "LayoutStudy", props: "LayoutStudyProps", source: "layout-study.tsx" },
  field: { component: "FieldStudy", props: "FieldStudyProps", source: "field-study.tsx" },
};

const componentDir = join(root, "packages/ui/src/components");
for (const study of originalStudies) {
  const family = families[study.family];
  const modulePath = `./studies/${family.source.replace(/\.tsx$/, "")}`;
  const source = `"use client";\n\nimport { ${family.component}, type ${family.props} } from "${modulePath}";\n\nexport type ${study.name}Props = Omit<${family.props}, "variant">;\n\nexport function ${study.name}(props: ${study.name}Props) {\n  return <${family.component} variant="${study.variant}" {...props} />;\n}\n`;
  writeFileSync(join(componentDir, `${study.slug}.tsx`), source);
}

const indexPath = join(root, "packages/ui/src/index.ts");
const current = readFileSync(indexPath, "utf8");
const start = current.indexOf(generatedStart);
const end = current.indexOf(generatedEnd);
const base = start >= 0 && end >= start
  ? `${current.slice(0, start).trimEnd()}\n`
  : `${current.trimEnd()}\n`;
const exports = originalStudies.map(({ name, slug }) =>
  `export { ${name} } from "./components/${slug}";\nexport type { ${name}Props } from "./components/${slug}";`,
).join("\n");
writeFileSync(indexPath, `${base}\n${generatedStart}\n${exports}\n${generatedEnd}\n`);

console.log(`Generated ${originalStudies.length} original MotionLab component sources.`);
