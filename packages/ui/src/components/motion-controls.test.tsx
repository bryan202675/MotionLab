import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { HoldToRun } from "./hold-to-run";
import { ModeSelector } from "./mode-selector";
import { PhaseRail } from "./phase-rail";
import { RunControl } from "./run-control";
import { ShortcutHint } from "./shortcut-hint";
import { TimelineScrubber } from "./timeline-scrubber";

afterEach(() => vi.useRealTimers());

describe("MotionLab experiment controls", () => {
  it("renders the platform modifier and exposes its keyboard action", () => {
    render(<ShortcutHint keys={["mod", "shift", "p"]} platform="windows" label="Open panel" />);
    expect(screen.getByLabelText("Open panel: mod + shift + p")).toHaveTextContent("Ctrl");
  });

  it("toggles an uncontrolled run action and reports the new state", () => {
    const onRunningChange = vi.fn();
    render(<RunControl onRunningChange={onRunningChange} />);
    const button = screen.getByRole("button", { name: "Run experiment" });

    fireEvent.click(button);
    expect(onRunningChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole("button", { name: "Stop experiment" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("keeps a mode selector in sync with a controlled value", () => {
    const onValueChange = vi.fn();
    render(
      <ModeSelector
        label="Preview mode"
        value="edit"
        onValueChange={onValueChange}
        options={[
          { value: "edit", label: "Edit" },
          { value: "play", label: "Play" },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Play" }));
    expect(onValueChange).toHaveBeenCalledWith("play");
    expect(screen.getByRole("button", { name: "Edit" })).toHaveAttribute("aria-pressed", "true");
  });

  it("announces the active experiment phase and calls back after selection", () => {
    const onValueChange = vi.fn();
    render(
      <PhaseRail
        defaultValue="scope"
        onValueChange={onValueChange}
        items={[
          { id: "scope", label: "Scope" },
          { id: "shape", label: "Shape", description: "Tune the response." },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /shape/i }));
    expect(onValueChange).toHaveBeenCalledWith("shape");
    expect(screen.getByRole("button", { name: /shape/i })).toHaveAttribute("aria-current", "step");
    expect(screen.getByText("Tune the response.")).toBeInTheDocument();
  });

  it("calls onValueChange when a named timeline marker is chosen", () => {
    const onValueChange = vi.fn();
    render(
      <TimelineScrubber
        value={1}
        max={8}
        markers={[{ value: 5.5, label: "Impact" }]}
        onValueChange={onValueChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Impact" }));
    expect(onValueChange).toHaveBeenCalledWith(5.5);
  });

  it("completes a hold action from the keyboard after its configured duration", () => {
    vi.useFakeTimers();
    const onComplete = vi.fn();
    render(<HoldToRun duration={850} onComplete={onComplete} />);
    const button = screen.getByRole("button", { name: /hold to run/i });

    fireEvent.keyDown(button, { key: " " });
    act(() => vi.advanceTimersByTime(850));

    expect(onComplete).toHaveBeenCalledOnce();
    expect(screen.getByRole("button", { name: "Sequence started" })).toBeDisabled();
  });
});
