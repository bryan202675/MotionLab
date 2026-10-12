import type { Metadata } from "next";
import { ShowcaseScenes } from "@/components/showcase-scenes";

export const metadata: Metadata = {
  title: "Showcase",
  description: "Three live compositions built with MotionLab components.",
};

export default function ShowcasePage() {
  return <ShowcaseScenes />;
}
