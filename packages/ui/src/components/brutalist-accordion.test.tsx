import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BrutalistAccordion } from "./brutalist-accordion";

describe("BrutalistAccordion", () => {
  it("opens a labeled region from its disclosure button", () => {
    render(
      <BrutalistAccordion
        items={[{ id: "one", title: "Why motion?", content: <p>Guide attention.</p> }]}
      />,
    );
    const trigger = screen.getByRole("button", { name: /why motion/i });

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("region", { name: "Why motion?" })).toHaveTextContent(
      "Guide attention.",
    );
  });
});
