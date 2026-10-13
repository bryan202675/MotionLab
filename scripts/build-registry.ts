import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { registryItemSchema, registrySchema } from "shadcn/schema";
import { componentRegistry } from "../apps/web/src/lib/component-registry";

const root = resolve(import.meta.dirname, "..");
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
const items = componentRegistry.map((component) => ({
  name: component.slug,
  type: "registry:component" as const,
  title: component.name,
  description: component.description,
  ...(component.dependencies.length ? { dependencies: component.dependencies } : {}),
  files: [
    `packages/ui/src/components/${component.slug}.tsx`,
    ...(component.sourceFiles ?? []),
  ].map((path) => ({
    path,
    type: "registry:component" as const,
    target: `@components/ui/${path.replace("packages/ui/src/components/", "")}`,
  })),
}));
const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "motionlab",
  homepage: siteUrl,
  items,
};
const result = registrySchema.safeParse(registry);
if (!result.success) {
  throw new Error(
    `Invalid registry.json: ${result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ")}`,
  );
}

writeFileSync(join(root, "registry.json"), `${JSON.stringify(result.data, null, 2)}\n`);
const publicDir = join(root, "apps/web/public/r");
mkdirSync(publicDir, { recursive: true });
writeFileSync(join(publicDir, "registry.json"), `${JSON.stringify(result.data, null, 2)}\n`);

for (const item of result.data.items ?? []) {
  const files = item.files.map((file) => {
    const absolutePath = join(root, file.path);
    if (!existsSync(absolutePath)) throw new Error(`Registry source does not exist: ${file.path}`);
    return { ...file, content: readFileSync(absolutePath, "utf8") };
  });
  const payload = registryItemSchema.safeParse({
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    ...item,
    files,
  });
  if (!payload.success) {
    throw new Error(
      `Invalid registry item ${item.name}: ${payload.error.issues.map((issue) => issue.message).join("; ")}`,
    );
  }
  const target = join(publicDir, `${item.name}.json`);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, `${JSON.stringify(payload.data, null, 2)}\n`);
}

console.log(`Built ${items.length} registry items into apps/web/public/r.`);
