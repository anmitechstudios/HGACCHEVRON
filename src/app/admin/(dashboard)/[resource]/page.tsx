import { notFound } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getResource } from "@/lib/admin/resources";
import { createClient } from "@/lib/supabase/server";
import { ResourceForm } from "@/components/admin/resource-form";
import { ResourceRow } from "@/components/admin/resource-row";
import { updateSingleton } from "../../actions";

export default async function ResourceIndexPage({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const { resource: resourceKey } = await params;
  const resource = getResource(resourceKey);
  if (!resource) notFound();

  const supabase = await createClient();

  if (resource.singleton) {
    const { data } = await supabase.from(resource.table).select("*").eq("id", 1).maybeSingle();
    return (
      <div className="mx-auto max-w-2xl">
        <h1 className="font-heading text-2xl font-semibold text-foreground">{resource.label}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{resource.description}</p>
        <div className="mt-8">
          <ResourceForm
            resource={resource}
            initialValues={data ?? {}}
            action={updateSingleton.bind(null, resourceKey)}
            submitLabel="Save Changes"
          />
        </div>
      </div>
    );
  }

  const { data: rows } = await supabase
    .from(resource.table)
    .select("*")
    .order(resource.orderable ? "order_index" : "id" as string);

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-foreground">
            {resource.label}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{resource.description}</p>
        </div>
        <Link
          href={`/admin/${resourceKey}/new`}
          className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="size-4" />
          New
        </Link>
      </div>

      <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
        {rows && rows.length > 0 ? (
          rows.map((row, i) => (
            <ResourceRow
              key={row.id}
              resourceKey={resourceKey}
              resource={resource}
              row={row}
              isFirst={i === 0}
              isLast={i === rows.length - 1}
            />
          ))
        ) : (
          <p className="p-8 text-center text-sm text-muted-foreground">
            No {resource.label.toLowerCase()} yet. Click &ldquo;New&rdquo; to add one.
          </p>
        )}
      </div>
    </div>
  );
}
