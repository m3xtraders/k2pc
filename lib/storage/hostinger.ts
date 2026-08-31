import * as ftp from "basic-ftp";
import { Readable } from "stream";

interface UploadOptions {
  fileName: string;
  buffer: Buffer;
  folder?: string;
}

export interface UploadResult {
  url: string;
  fileName: string;
  size: number;
}

/**
 * Uploads a buffer directly to Hostinger public_html directory via FTP/FTPS.
 */
export async function uploadToHostinger({
  fileName,
  buffer,
  folder = "uploads",
}: UploadOptions): Promise<UploadResult> {
  const host = process.env.HOSTINGER_FTP_HOST || "195.35.61.124";
  const user = process.env.HOSTINGER_FTP_USER;
  const password = process.env.HOSTINGER_FTP_PASSWORD;
  const port = parseInt(process.env.HOSTINGER_FTP_PORT || "21", 10);
  const secure = process.env.HOSTINGER_FTP_SECURE === "true" || process.env.HOSTINGER_FTP_SECURE === "explicit";
  const rootDir = process.env.HOSTINGER_FTP_ROOT_DIR || "public_html";
  const baseUrl = (process.env.NEXT_PUBLIC_STORAGE_BASE_URL || "https://www.k2pc.ca").replace(/\/$/, "");

  if (!user || !password) {
    throw new Error(
      "Hostinger FTP credentials (HOSTINGER_FTP_USER, HOSTINGER_FTP_PASSWORD) are not configured in environment variables."
    );
  }

  // Clean filename: remove unsafe chars, keep extension
  const cleanExt = fileName.includes(".") ? fileName.substring(fileName.lastIndexOf(".")) : "";
  const baseName = fileName
    .substring(0, fileName.lastIndexOf(".") > -1 ? fileName.lastIndexOf(".") : fileName.length)
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 50);

  const uniqueFileName = `${baseName}-${Date.now()}${cleanExt}`;
  const targetDir = folder ? `${rootDir}/${folder}` : rootDir;

  const client = new ftp.Client();
  client.ftp.verbose = process.env.NODE_ENV === "development";

  try {
    await client.access({
      host,
      user,
      password,
      port,
      secure: secure ? true : false,
      secureOptions: {
        rejectUnauthorized: false, // Prevents self-signed cert or shared host SSL errors during FTP connection
      },
    });

    // Ensure the remote directory exists
    await client.ensureDir(targetDir);

    // Stream buffer into remote file
    const stream = Readable.from(buffer);
    await client.uploadFrom(stream, uniqueFileName);

    // Compute public live URL
    const relativePath = folder ? `${folder}/${uniqueFileName}` : uniqueFileName;
    const publicUrl = `${baseUrl}/${relativePath}`;

    return {
      url: publicUrl,
      fileName: uniqueFileName,
      size: buffer.length,
    };
  } finally {
    client.close();
  }
}
