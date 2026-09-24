import { uploadToHostinger } from "../lib/storage/hostinger";
import * as ftp from "basic-ftp";
import * as dotenv from "dotenv";
import * as path from "path";

// Load .env and .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

async function runStorageTest() {
  console.log("\n==================================================");
  console.log("🚀 Testing Hostinger / Subdomain Storage Connection");
  console.log("==================================================");

  const host = process.env.HOSTINGER_FTP_HOST || "31.170.160.99";
  const user = process.env.HOSTINGER_FTP_USER;
  const port = parseInt(process.env.HOSTINGER_FTP_PORT || "21", 10);
  const secure = process.env.HOSTINGER_FTP_SECURE === "true" || process.env.HOSTINGER_FTP_SECURE === "explicit";
  const rootDir = process.env.HOSTINGER_FTP_ROOT_DIR ?? "";
  const folder = process.env.HOSTINGER_FTP_FOLDER ?? "uploads";
  const baseUrl = (process.env.NEXT_PUBLIC_STORAGE_BASE_URL || "https://www.k2pc.ca").replace(/\/$/, "");

  console.log(`📡 FTP Host:              ${host}:${port}`);
  console.log(`👤 FTP User:              ${user ? user : "❌ NOT SET"}`);
  console.log(`🔒 FTPS Secure:           ${secure}`);
  console.log(`📁 Root Dir (in .env):    "${rootDir}"`);
  console.log(`📂 Subfolder (in .env):   "${folder}"`);
  console.log(`🌐 Public Base URL:       ${baseUrl}`);
  console.log("--------------------------------------------------");

  if (!user || !process.env.HOSTINGER_FTP_PASSWORD) {
    console.error("❌ ERROR: HOSTINGER_FTP_USER or HOSTINGER_FTP_PASSWORD is not set in .env!");
    process.exit(1);
  }

  // 1. Test FTP Access & CWD
  console.log("\n⏳ Step 1: Connecting to FTP server...");
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    await client.access({
      host,
      user,
      password: process.env.HOSTINGER_FTP_PASSWORD,
      port,
      secure: secure ? true : false,
      secureOptions: { rejectUnauthorized: false },
    });
    console.log("✅ Step 1 Success: Connected to FTP successfully!");

    const currentPwd = await client.pwd();
    console.log(`📍 Initial working directory upon login: ${currentPwd}`);
  } catch (err) {
    console.error("❌ Step 1 Failed: Could not connect to FTP server:", err instanceof Error ? err.message : err);
    client.close();
    process.exit(1);
  }

  // 2. Test File Upload
  console.log("\n⏳ Step 2: Uploading a test image...");
  // 1x1 transparent PNG buffer
  const samplePngBuffer = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
    "base64"
  );

  let uploadedUrl = "";
  let uploadedFileName = "";
  try {
    const res = await uploadToHostinger({
      fileName: "test-connection.png",
      buffer: samplePngBuffer,
      folder: folder || undefined,
    });
    uploadedUrl = res.url;
    uploadedFileName = res.fileName;
    console.log("✅ Step 2 Success: File uploaded successfully!");
    console.log(`📁 Remote File Name: ${uploadedFileName}`);
    console.log(`🔗 Public Live URL:  ${uploadedUrl}`);
  } catch (err) {
    console.error("❌ Step 2 Failed: File upload failed:", err instanceof Error ? err.message : err);
    client.close();
    process.exit(1);
  }

  // 3. Test HTTP Fetch of Live URL
  console.log("\n⏳ Step 3: Verifying HTTP access to the live URL...");
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const httpRes = await fetch(uploadedUrl, {
      method: "GET",
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (httpRes.ok) {
      console.log(`✅ Step 3 Success: HTTP Status ${httpRes.status} OK! Image is publicly accessible.`);
    } else {
      console.warn(`⚠️ HTTP Status ${httpRes.status} ${httpRes.statusText}`);
      console.warn(`   Note: If you just created the subdomain, DNS or SSL may take 5-15 minutes to propagate.`);
      console.warn(`   Verify that the subdomain is pointed to the directory where the file was uploaded.`);
    }
  } catch (err) {
    console.warn("⚠️ Step 3 Warning: Could not fetch URL directly via HTTP:", err instanceof Error ? err.message : err);
    console.warn("   (If DNS or SSL was just created, please allow a few minutes for propagation)");
  }

  // 4. Cleanup Test File
  console.log("\n⏳ Step 4: Cleaning up test file...");
  try {
    const cleanRootDir = rootDir.replace(/\/+$/, "");
    const cleanFolder = folder.replace(/^\/+|\/+$/g, "");
    let targetDir = "";
    if (cleanRootDir && cleanFolder) {
      targetDir = `${cleanRootDir}/${cleanFolder}`;
    } else {
      targetDir = cleanRootDir || cleanFolder;
    }

    if (targetDir) {
      await client.cd(targetDir);
    }
    await client.remove(uploadedFileName);
    console.log("✅ Step 4 Success: Test file deleted from remote server.");
  } catch (err) {
    console.warn("ℹ️ Cleanup notice:", err instanceof Error ? err.message : err);
  } finally {
    client.close();
  }

  console.log("\n==================================================");
  console.log("🎉 Storage Configuration Test Completed!");
  console.log("==================================================\n");
}

runStorageTest().catch(console.error);
