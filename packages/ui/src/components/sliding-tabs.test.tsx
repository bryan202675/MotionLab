import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SlidingTabs } from "./sliding-tabs";

describe("SlidingTabs", () => {
  it("moves selection and focus with arrow keys", () => {
    const onValueChange = vi.fn();
    render(
      <SlidingTabs
        label="Preview mode"
        onValueChange={onValueChange}
        tabs={[
          { id: "wide", label: "Wide", content: "Wide preview" },
          { id: "mobile", label: "Mobile", content: "Mobile preview" },
        ]}
      />,
    );
    const wide = screen.getByRole("tab", { name: "Wide" });
    const mobile = screen.getByRole("tab", { name: "Mobile" });

    wide.focus();
    fireEvent.keyDown(wide, { key: "ArrowRight" });
    expect(mobile).toHaveFocus();
    expect(onValueChange).toHaveBeenCalledWith("mobile");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Mobile preview");
  });
});
