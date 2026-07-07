import { buildRegistry } from "@/lib/registry-builder";
// import { loadRegistry } from "shadcn/registry";

export async function GET() {
  try {
    const registry = buildRegistry();
    // const registry = await loadRegistry();
    return Response.json(registry);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to load registry." },
      { status: 500 },
    );
  }
}
