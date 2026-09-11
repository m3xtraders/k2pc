import { NextResponse } from "next/server";
import { getPublishedServices } from "@/lib/content-db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const services = await getPublishedServices();
    return NextResponse.json(services, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Failed to fetch services from database:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}
