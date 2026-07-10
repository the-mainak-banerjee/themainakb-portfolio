import fs from "node:fs";
import path from "node:path";
import { getComponentByName } from "../registry/config";

const name = process.argv[2];

if (!name) {
  console.error("Usage: npx tsx scripts/new-doc.ts <component-name>");
  process.exit(1);
}

const entry = getComponentByName(name);

if (!entry) {
  console.error(
    `No registry entry found for "${name}". Add it to registry/config.ts first.`,
  );
  process.exit(1);
}

const mainFile = entry.files?.[0];
// const propType = entry.propTypes?.[0] ?? `${toPascalCase(entry.name)}Props`;

function toPascalCase(s: string) {
  return s.replace(/(^\w|-\w)/g, (m) => m.replace("-", "").toUpperCase());
}

const mdx = `---
title: ${entry.title}
description: ${entry.description}
createdAt: ${new Date().toISOString().slice(0, 10)}
updatedAt: ${new Date().toISOString().slice(0, 10)}
---

<ComponentPreview name="${entry.name}" />

### Installation

<InstallTabs>

<InstallTabsListType />

<TabsContent value="cli">

<ComponentCliCommand name="${entry.name}" />

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Install the following dependencies</Step>

<UniversalPackageManagerCommand npmCommand="npm install ${entry.dependencies?.join(" ") ?? ""}" />

<Step>Add a CN helper function</Step>

<ComponentSourceCode src="registry/lib/utils.ts" title="lib/utils.ts" collapsible="false" />

<Step>Copy and paste the following code into your project</Step>

<ComponentSourceCode name="${entry.name}" title="${mainFile?.target}" />

<Step>Update the import paths to match your project setup</Step>

</Steps>

</TabsContent>

</InstallTabs>

### Features

- TODO

### Usage

\`\`\`tsx
import { ${toPascalCase(entry.name)} } from "@/${mainFile?.target?.replace(/^@|\.tsx?$/g, "")}";
\`\`\`

\`\`\`tsx
<${toPascalCase(entry.name)} />
\`\`\`


`;

// ### API Reference

// <AutoTypeTable path="${mainFile?.path}" name="${propType}" />

const outDir = path.join(
  process.cwd(),
  `features/doc/content/${entry.categorySlug}`,
);
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, `${entry.name}.mdx`);

if (fs.existsSync(outPath)) {
  console.error(
    `${outPath} already exists — delete it first if you want to regenerate.`,
  );
  process.exit(1);
}

fs.writeFileSync(outPath, mdx);
console.log(`Created ${outPath}`);
