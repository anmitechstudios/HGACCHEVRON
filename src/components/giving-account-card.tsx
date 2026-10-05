"use client";

import { useState } from "react";
import { Check, Copy, Landmark } from "lucide-react";
import type { GivingAccount } from "@/lib/content/types";

export function GivingAccountCard({ account }: { account: GivingAccount }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(account.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable: no-op; the number is still visible to copy manually.
    }
  }

  return (
    <div className="flex flex-col rounded-3xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-lg hover:shadow-sky-500/5">
      <div className="flex items-center gap-2 text-sky-700">
        <Landmark className="size-4" />
        <span className="text-xs font-semibold uppercase tracking-wide">
          {account.purpose}
        </span>
      </div>
      <p className="mt-4 font-heading text-xl font-semibold text-foreground">
        {account.bankName}
      </p>
      <button
        type="button"
        onClick={handleCopy}
        className="mt-3 flex w-fit items-center gap-2 rounded-full border border-border bg-muted/60 px-4 py-2 font-mono text-sm text-foreground transition-colors hover:border-sky-300"
        aria-label={`Copy account number ${account.accountNumber}`}
      >
        {account.accountNumber}
        {copied ? (
          <Check className="size-3.5 text-sky-700" />
        ) : (
          <Copy className="size-3.5 text-muted-foreground" />
        )}
      </button>
      {copied && (
        <span className="mt-1.5 text-xs text-sky-700" role="status">
          Copied to clipboard
        </span>
      )}
    </div>
  );
}
