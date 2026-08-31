import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const faqs = await prisma.faq.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json(
      {
        faqs: faqs.map((f: any) => ({
          id: f.id,
          question: f.question,
          answer: f.answer,
          category: f.category || "General",
        })),
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error: any) {
    console.error("Error fetching FAQs:", error);
    return NextResponse.json({ faqs: [] }, { status: 200 });
  }
}
