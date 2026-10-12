"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type CopyStatus = "idle" | "pending" | "success" | "error";

export function CopyButton({
  value,
  label = "Copy code",
  className = "",
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const copy = async () => {
    setStatus("pending");
    try {
      await navigator.clipboard.writeText(value);
      setStatus("success");
      window.setTimeout(() => setStatus("idle"), 1800);
    } catch {
      setStatus("error");
    }
  };
  return (
    <button
      type="button"
      className={className}
      onClick={copy}
      disabled={status === "pending"}
      aria-label={label}
    >
      {status === "success" ? <Check size={15} /> : <Copy size={15} />}
      <span>
        {status === "pending"
          ? "COPYING"
          : status === "success"
            ? "COPIED"
            : status === "error"
              ? "FAILED"
              : label.toUpperCase()}
      </span>
      <span className="sr-only" role="status">
        {status === "success"
          ? "Code copied."
          : status === "error"
            ? "Could not copy. Check clipboard permission."
            : ""}
      </span>
    </button>
  );
}
