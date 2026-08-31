import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { uploadToHostinger } from "@/lib/storage/hostinger";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate mime type
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
      "image/avif",
    ];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a valid image (JPEG, PNG, WebP, GIF, SVG, AVIF)." },
        { status: 400 }
      );
    }

    // Limit size (e.g., 10MB)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // If Hostinger FTP credentials are set, upload directly to Hostinger
    if (process.env.HOSTINGER_FTP_USER && process.env.HOSTINGER_FTP_PASSWORD) {
      const result = await uploadToHostinger({
        fileName: file.name,
        buffer,
        folder: "uploads",
      });

      return NextResponse.json({
        url: result.url,
        fileName: result.fileName,
        size: result.size,
      });
    }

    // Dev fallback if FTP credentials are not yet entered in .env
    const mimeType = file.type || "image/jpeg";
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${mimeType};base64,${base64}`;

    return NextResponse.json({
      url: dataUrl,
      warning: "HOSTINGER_FTP_USER/HOSTINGER_FTP_PASSWORD missing in .env. Using temporary data URL fallback.",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Image upload failed: " + (error instanceof Error ? error.message : "Unknown error") },
      { status: 500 }
    );
  }
}
