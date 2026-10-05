"use client";

import { useTransition } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Pencil, Trash2, Loader2 } from "lucide-react";
import type { ResourceDef } from "@/lib/admin/resources";
import { deleteResource, reorderResource } from "@/app/admin/actions";

export function ResourceRow({
  resourceKey,
  resource,
  row,
  isFirst,
  isLast,
}: {
  resourceKey: string;
  resource: ResourceDef;
  row: Record<string, unknown>;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const title = String(row[resource.titleField] ?? "Untitled");
  const subtitle = resource.subtitleField ? String(row[resource.subtitleField] ?? "") : "";
  const id = String(row.id);

  function handleDelete() {
    if (!confirm(`Delete "${title}"? This can't be undone.`)) return;
    startTransition(() => deleteResource(resourceKey, id));
  }

  return (
    <div className="flex items-center gap-3 p-4">
      {resource.orderable && (
        <div className="flex flex-col">
          <button
            type="button"
            disabled={isFirst || isPending}
            onClick={() => startTransition(() => reorderResource(resourceKey, id, "up"))}
            className="text-muted-foreground hover:text-foreground disabled:opacity-30"
            aria-label="Move up"
          >
            <ChevronUp className="size-4" />
          </button>
          <button
            type="button"
            disabled={isLast || isPending}
            onClick={() => startTransition(() => reorderResource(resourceKey, id, "down"))}
            className="text-muted-foreground hover:text-foreground disabled:opacity-30"
            aria-label="Move down"
          >
            <ChevronDown className="size-4" />
          </button>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-foreground">{title}</p>
        {subtitle && <p className="truncate text-sm text-muted-foreground">{subtitle}</p>}
      </div>

      {isPending ? (
        <Loader2 className="size-4 animate-spin text-muted-foreground" />
      ) : (
        <div className="flex shrink-0 items-center gap-1">
          <Link
            href={`/admin/${resourceKey}/${id}`}
            className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label={`Edit ${title}`}
          >
            <Pencil className="size-4" />
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-red-50 hover:text-destructive"
            aria-label={`Delete ${title}`}
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
