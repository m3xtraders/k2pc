import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactFormSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = contactFormSchema.parse(body);

    const submission = await prisma.contactSubmission.create({
      data: {
        name: validated.name,
        phone: validated.phone,
        service: validated.serviceNeeded,
        city: validated.addressOrCity,
        message: validated.message || "",
        status: "NEW" as any,
      } as any,
    });

    return NextResponse.json(
      { success: true, id: submission.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit request. Please try again or call directly." },
      { status: 400 }
    );
  }
}
