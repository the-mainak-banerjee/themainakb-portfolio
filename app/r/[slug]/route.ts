import { buildRegistryItem } from "@/lib/registry-builder";
import { RegistryItemNotFoundError } from "shadcn/registry";

export async function GET(
  _request: Request,
  context: {
    params: Promise<{
      slug: string;
    }>;
  },
) {
  const { slug } = await context.params;
  const itemName = slug.replace(/\.json$/, "");

  try {
    const item = buildRegistryItem(itemName);
    // const item = await loadRegistryItem(itemName);

    return Response.json(item);
  } catch (error) {
    if (error instanceof RegistryItemNotFoundError) {
      return Response.json(
        { error: `Registry item "${itemName}" was not found.` },
        { status: 404 },
      );
    }

    console.error(error);

    return Response.json(
      { error: "Failed to load registry item." },
      { status: 500 },
    );
  }
}
