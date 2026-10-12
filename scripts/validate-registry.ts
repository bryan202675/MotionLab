import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { registryItemSchema, registrySchema } from "shadcn/schema";

const root = resolve(import.meta.dirname, "..");
const raw: unknown = JSON.parse(readFileSync(join(root, "registry.json"), "utf8"));
const result = registrySchema.safeParse(raw);
if (!result.success) {
  throw new Error(
    result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("\n"),
  );
}

const items = result.data.items ?? [];
if (items.length !== 24) throw new Error(`Expected 24 registry entries, found ${items.length}.`);
const names = new Set<string>();
for (const item of items) {
  if (names.has(item.name)) throw new Error(`Duplicate registry name: ${item.name}`);
  names.add(item.name);
  const parsedItem = registryItemSchema.safeParse(item);
  if (!parsedItem.success)
    throw new Error(
      `Invalid item ${item.name}: ${parsedItem.error.issues.map((issue) => issue.message).join("; ")}`,
    );
  for (const file of item.files) {
    if (!existsSync(join(root, file.path)))
      throw new Error(`${item.name} references a missing file: ${file.path}`);
    const source = readFileSync(join(root, file.path), "utf8");
    if (source.includes('from "motion/react"') && !item.dependencies?.includes("motion")) {
      throw new Error(`${item.name} imports Motion but does not declare it as a dependency.`);
    }
  }
}

console.log(`Validated ${items.length} shadcn registry items and every source path.`);
