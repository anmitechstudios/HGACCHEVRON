import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getResource } from "@/lib/admin/resources";
import { ResourceForm } from "@/components/admin/resource-form";
import { createResource } from "../../../actions";

export default async function NewResourcePage({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const { resource: resourceKey } = await params;
  const resource = getResource(resourceKey);
  if (!resource || resource.singleton) notFound();

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
        New {resource.singularLabel}
      </h1>
      <div className="mt-6">
        <ResourceForm
          resource={resource}
          initialValues={{}}
          action={createResource.bind(null, resourceKey)}
          submitLabel={`Create ${resource.singularLabel}`}
        />
      </div>
    </div>
  );
}
