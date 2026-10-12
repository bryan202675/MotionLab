import type { Metadata } from "next";
import { ComponentPlayground } from "@/components/component-playground";

export const metadata: Metadata = {
  title: "Playground",
  description: "Tune real MotionLab component props and copy the generated JSX.",
};

export default function PlaygroundPage() {
  return <ComponentPlayground />;
}
