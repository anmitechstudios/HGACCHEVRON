import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getResource } from "@/lib/admin/resources";
import { createClient } from "@/lib/supabase/server";
import { ResourceForm } from "@/components/admin/resource-form";
import { updateResource } from "../../../actions";

export default async function EditResourcePage({
  params,
}: {
  params: Promise<{ resource: string; id: string }>;
}) {
  const { resource: resourceKey, id } = await params;
  const resource = getResource(resourceKey);
  if (!resource || resource.singleton) notFound();

  const supabase = await createClient();
  const { data } = await supabase.from(resource.table).select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href={`/admin/${resourceKey}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Back to {resource.label}
      </Link>
      <h1 className="mt-3 font-heading text-2xl font-semibold text-foreground">
        Edit {resource.singularLabel}
      </h1>
      <div className="mt-6">
        <ResourceForm
          resource={resource}
          initialValues={data}
          action={updateResource.bind(null, resourceKey, id)}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}
