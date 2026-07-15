import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MSL Biotech Private Limited",
    short_name: "MSL Biotech",
    description: "Medicine Save Life - WHO-GMP Certified Pharmaceuticals",
    start_url: "/",
    display: "standalone",
    background_color: "#12213F",
    theme_color: "#12213F",
    orientation: "portrait",
    icons: [
      {
        src: "/favicons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
