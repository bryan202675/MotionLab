"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useLanguage } from "./language-provider";

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
  const { language } = useLanguage();
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
          ? language === "es"
            ? "COPIANDO"
            : "COPYING"
          : status === "success"
            ? language === "es"
              ? "COPIADO"
              : "COPIED"
            : status === "error"
              ? language === "es"
                ? "ERROR"
                : "FAILED"
              : label.toUpperCase()}
      </span>
      <span className="sr-only" role="status">
        {status === "success"
          ? language === "es"
            ? "Código copiado."
            : "Code copied."
          : status === "error"
            ? language === "es"
              ? "No se pudo copiar. Verifica los permisos del portapapeles."
              : "Could not copy. Check clipboard permission."
            : ""}
      </span>
    </button>
  );
}
