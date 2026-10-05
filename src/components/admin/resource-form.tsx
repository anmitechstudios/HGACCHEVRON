"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageField } from "@/components/admin/image-field";
import type { ResourceDef } from "@/lib/admin/resources";

export function ResourceForm({
  resource,
  initialValues,
  action,
  submitLabel = "Save",
}: {
  resource: ResourceDef;
  initialValues: Record<string, unknown>;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel?: string;
}) {
  return (
    <form action={action} className="space-y-5 rounded-2xl border border-border bg-card p-6">
      {resource.fields.map((field) => {
        const value = initialValues[field.name];

        if (field.type === "image") {
          return (
            <ImageField
              key={field.name}
              name={field.name}
              label={field.label}
              initialUrl={typeof value === "string" ? value : undefined}
            />
          );
        }

        if (field.type === "boolean") {
          return (
            <label key={field.name} className="flex items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                name={field.name}
                defaultChecked={Boolean(value)}
                className="size-4 rounded border-input"
              />
              <span className="font-medium text-foreground">{field.label}</span>
              {field.helpText && (
                <span className="text-muted-foreground">({field.helpText})</span>
              )}
            </label>
          );
        }

        if (field.type === "select") {
          return (
            <div key={field.name}>
              <Label htmlFor={field.name}>{field.label}</Label>
              <select
                id={field.name}
                name={field.name}
                required={field.required}
                defaultValue={typeof value === "string" ? value : ""}
                className="mt-1.5 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <option value="" disabled>
                  Select...
                </option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        if (field.type === "textarea") {
          return (
            <div key={field.name}>
              <Label htmlFor={field.name}>{field.label}</Label>
              <Textarea
                id={field.name}
                name={field.name}
                required={field.required}
                defaultValue={typeof value === "string" ? value : ""}
                rows={4}
                className="mt-1.5"
              />
            </div>
          );
        }

        return (
          <div key={field.name}>
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              id={field.name}
              name={field.name}
              type={field.type === "number" ? "number" : "text"}
              required={field.required}
              defaultValue={typeof value === "string" || typeof value === "number" ? value : ""}
              className="mt-1.5"
            />
          </div>
        );
      })}

      <Button type="submit" className="h-11">
        {submitLabel}
      </Button>
    </form>
  );
}
