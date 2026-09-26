import { existsSync } from "node:fs";
import path from "node:path";
import { PrinciplesClient } from "./PrinciplesClient";

export function Principles() {
  const videoDirectory = path.join(process.cwd(), "public", "video");
  const videoAvailability = Array.from({ length: 6 }, (_, index) =>
    existsSync(path.join(videoDirectory, `principio-0${index + 1}.mp4`)),
  );

  return <PrinciplesClient videoAvailability={videoAvailability} />;
}
