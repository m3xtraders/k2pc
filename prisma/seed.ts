import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { COMPANY_DETAILS } from "../lib/content/company";
import { SERVICES } from "../lib/content/services";
import { BLOG_POSTS } from "../lib/content/blog";

const prisma: any = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Seed AdminUser
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: "admin@k2pc.ca" },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin123456", 10);
    await prisma.adminUser.create({
      data: {
        email: "admin@k2pc.ca",
        name: "K2 Admin",
        password: hashedPassword,
      },
    });
    console.log("Created default admin user: admin@k2pc.ca");
  }

  // Seed Hannan Admin Account
  const hannanPassword = await bcrypt.hash("qwerty1234", 10);
  await prisma.adminUser.upsert({
    where: { email: "admin@hannan.com" },
    update: {
      password: hannanPassword,
      name: "Hannan Admin",
    },
    create: {
      email: "admin@hannan.com",
      name: "Hannan Admin",
      password: hannanPassword,
    },
  });
  console.log("Created admin user: admin@hannan.com");

  // 2. Seed BusinessInfo (Singleton)
  const existingBusinessInfo = await prisma.businessInfo.findFirst();
  const hoursObj: Record<string, string> = {};
  COMPANY_DETAILS.hours.forEach((h) => {
    hoursObj[h.days] = h.times;
  });

  if (!existingBusinessInfo) {
    await prisma.businessInfo.create({
      data: {
        companyName: COMPANY_DETAILS.name,
        slogan: COMPANY_DETAILS.slogan,
        phone: COMPANY_DETAILS.phone,
        email: COMPANY_DETAILS.email,
        addressLine1: COMPANY_DETAILS.address.street,
        city: COMPANY_DETAILS.address.city,
        province: COMPANY_DETAILS.address.province,
        postalCode: COMPANY_DETAILS.address.postalCode,
        country: COMPANY_DETAILS.address.country,
        licenseNumber: COMPANY_DETAILS.licenseNumber,
        hoursJson: hoursObj,
        serviceAreas: COMPANY_DETAILS.regionsServed,
      },
    });
    console.log("Created business info record");
  } else {
    await prisma.businessInfo.update({
      where: { id: existingBusinessInfo.id },
      data: {
        companyName: COMPANY_DETAILS.name,
        slogan: existingBusinessInfo.slogan || COMPANY_DETAILS.slogan,
      },
    });
    console.log("Updated business info record to K2 Pest Control");
  }

  // 3. Seed Services
  for (let i = 0; i < SERVICES.length; i++) {
    const s = SERVICES[i];
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: {
        title: s.title,
        slug: s.slug,
        icon: s.icon,
        shortDescription: s.shortDescription,
        content: s.fullDescription,
        displayOrder: i,
        status: "PUBLISHED",
        metaTitle: `${s.title} | K2 Pest Control`,
        metaDescription: s.shortDescription,
      },
    });
  }
  console.log(`Seeded ${SERVICES.length} services`);

  // 4. Seed BlogPosts
  for (const post of BLOG_POSTS) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        title: post.title,
        slug: post.slug,
        content: post.content,
        featuredImage: post.image,
        category: post.category,
        authorName: post.author?.name || "K2 Specialist",
        status: "PUBLISHED",
        metaTitle: `${post.title} | K2 Pest Control Blog`,
        metaDescription: post.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160),
      },
    });
  }
  console.log(`Seeded ${BLOG_POSTS.length} blog posts`);

  console.log("Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
