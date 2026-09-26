import { existsSync } from "node:fs";
import path from "node:path";
import { HeroClient } from "./HeroClient";

export function Hero() {
  const publicDirectory = path.join(process.cwd(), "public");
  const hasMp4 = existsSync(path.join(publicDirectory, "video", "hero.mp4"));
  const hasWebm = existsSync(path.join(publicDirectory, "video", "hero.webm"));
  const hasPoster = existsSync(path.join(publicDirectory, "images", "hero-poster.webp"));

  return (
    <HeroClient
      hasMp4={hasMp4}
      hasPoster={hasPoster}
      hasWebm={hasWebm}
    />
  );
}
