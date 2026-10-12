import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MorphingToggle } from "./morphing-toggle";

describe("MorphingToggle", () => {
  it("updates its uncontrolled state and announces it as a switch", () => {
    const onCheckedChange = vi.fn();
    render(<MorphingToggle label="Enable motion" onCheckedChange={onCheckedChange} />);
    const toggle = screen.getByRole("switch", { name: "Enable motion" });

    expect(toggle).toHaveAttribute("aria-checked", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "true");
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("does not change its controlled value or invoke callbacks when disabled", () => {
    const onCheckedChange = vi.fn();
    render(
      <MorphingToggle
        label="Enable motion"
        checked={false}
        disabled
        onCheckedChange={onCheckedChange}
      />,
    );
    const toggle = screen.getByRole("switch", { name: "Enable motion" });

    expect(toggle).toBeDisabled();
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "false");
    expect(onCheckedChange).not.toHaveBeenCalled();
  });
});
