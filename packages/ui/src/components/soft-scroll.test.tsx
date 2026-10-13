import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SoftScroll, useSoftScroll } from "./soft-scroll";

function TestConsumer() {
  const { scrollTo } = useSoftScroll();
  return (
    <button type="button" onClick={() => scrollTo(100)}>
      Scroll to 100
    </button>
  );
}

describe("SoftScroll", () => {
  it("renders container children when root is false", () => {
    render(
      <SoftScroll root={false} className="custom-scroll">
        <p>Smooth scroll content</p>
      </SoftScroll>,
    );

    expect(screen.getByText("Smooth scroll content")).toBeInTheDocument();
  });

  it("renders children directly when root is true", () => {
    render(
      <SoftScroll root={true}>
        <div data-testid="root-child">Root smooth scroll</div>
      </SoftScroll>,
    );

    expect(screen.getByTestId("root-child")).toBeInTheDocument();
  });

  it("provides useSoftScroll context to child components", () => {
    render(
      <SoftScroll root={true}>
        <TestConsumer />
      </SoftScroll>,
    );

    const button = screen.getByRole("button", { name: "Scroll to 100" });
    expect(button).toBeInTheDocument();
    button.click();
  });
});
