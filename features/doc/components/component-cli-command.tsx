import {
  PackageManagerCommand,
  PackageManagerCommandsList,
} from "@/registry/components/package-manager-command/package-manager-command";

const REGISTRY_URL = `${process.env.NEXT_PUBLIC_APP_URL}/r`;

/**
 * <ComponentCliCommand name="magnetic-button" />
 *
 * Only `name` changes between docs — the actual per-package-manager command
 * shape (npx/pnpm dlx/yarn dlx/bunx) is generated here once, reusing the
 * existing PackageManagerCommand tab UI.
 */
export function ComponentCliCommand({ name }: { name: string }) {
  const target = `${REGISTRY_URL}/${name}.json`;

  const commands: PackageManagerCommandsList = {
    pnpm: `pnpm dlx shadcn@latest add ${target}`,
    npm: `npx shadcn@latest add ${target}`,
    yarn: `yarn dlx shadcn@latest add ${target}`,
    bun: `bunx --bun shadcn@latest add ${target}`,
  };

  return <PackageManagerCommand commands={commands} />;
}

export function UniversalPackageManagerCommand({
  npmCommand,
}: {
  npmCommand: string;
}) {
  return <PackageManagerCommand npmCommand={npmCommand} />;
}
