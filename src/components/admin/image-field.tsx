"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { ImageIcon, Loader2, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { uploadMedia } from "@/app/admin/actions";

export function ImageField({
  name,
  label,
  initialUrl,
}: {
  name: string;
  label: string;
  initialUrl?: string | null;
}) {
  const [url, setUrl] = useState(initialUrl ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    startTransition(async () => {
      try {
        const publicUrl = await uploadMedia(file);
        setUrl(publicUrl);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      }
    });
  }

  return (
    <div>
      <Label htmlFor={`${name}-file`}>{label}</Label>
      <input type="hidden" name={name} value={url} />
      <div className="mt-1.5 flex items-center gap-4">
        <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-muted/40">
          {isPending ? (
            <Loader2 className="size-5 animate-spin text-muted-foreground" />
          ) : url ? (
            <Image src={url} alt="" width={80} height={80} className="size-full object-cover" />
          ) : (
            <ImageIcon className="size-5 text-muted-foreground/50" />
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <input
            id={`${name}-file`}
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e.target.files?.[0])}
            className="text-sm text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-sm file:font-medium hover:file:bg-muted/80"
          />
          {url && (
            <button
              type="button"
              onClick={() => setUrl("")}
              className="inline-flex w-fit items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
            >
              <X className="size-3" />
              Remove
            </button>
          )}
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
      </div>
    </div>
  );
}
