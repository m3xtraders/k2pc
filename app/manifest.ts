import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "K2 Pest Control Toronto & GTA",
    short_name: "K2 Pest Control",
    description:
      "Licensed, guaranteed exterminator and pest control services in Toronto & Greater Toronto Area. 2-hour emergency response.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#BE2320",
    icons: [
      {
        src: "/assets/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/assets/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
