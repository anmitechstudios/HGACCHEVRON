"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getResource } from "@/lib/admin/resources";

function parseFormValues(formData: FormData, resourceKey: string) {
  const resource = getResource(resourceKey);
  if (!resource) throw new Error(`Unknown resource: ${resourceKey}`);

  const values: Record<string, string | number | boolean | null> = {};
  for (const field of resource.fields) {
    if (field.type === "boolean") {
      values[field.name] = formData.get(field.name) === "on";
      continue;
    }
    const raw = formData.get(field.name);
    const str = typeof raw === "string" ? raw.trim() : "";
    values[field.name] = str.length > 0 ? str : null;
  }
  return { resource, values };
}

/** Revalidate every public page that could show this resource's content. */
function revalidateSite() {
  revalidatePath("/", "layout");
}

export async function createResource(resourceKey: string, formData: FormData) {
  const { resource, values } = parseFormValues(formData, resourceKey);
  const supabase = await createClient();

  if (resource.orderable) {
    const { count } = await supabase
      .from(resource.table)
      .select("*", { count: "exact", head: true });
    values.order_index = count ?? 0;
  }

  const { error } = await supabase.from(resource.table).insert(values);
  if (error) throw new Error(error.message);

  revalidateSite();
  redirect(`/admin/${resourceKey}`);
}

export async function updateResource(resourceKey: string, id: string, formData: FormData) {
  const { resource, values } = parseFormValues(formData, resourceKey);
  const supabase = await createClient();

  const { error } = await supabase.from(resource.table).update(values).eq("id", id);
  if (error) throw new Error(error.message);

  revalidateSite();
  redirect(`/admin/${resourceKey}`);
}

export async function updateSingleton(resourceKey: string, formData: FormData) {
  const { resource, values } = parseFormValues(formData, resourceKey);
  const supabase = await createClient();

  const { error } = await supabase
    .from(resource.table)
    .upsert({ id: 1, ...values, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);

  revalidateSite();
  redirect(`/admin/${resourceKey}?saved=1`);
}

export async function deleteResource(resourceKey: string, id: string) {
  const resource = getResource(resourceKey);
  if (!resource) throw new Error(`Unknown resource: ${resourceKey}`);
  const supabase = await createClient();

  const { error } = await supabase.from(resource.table).delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidateSite();
  revalidatePath(`/admin/${resourceKey}`);
}

export async function reorderResource(
  resourceKey: string,
  id: string,
  direction: "up" | "down"
) {
  const resource = getResource(resourceKey);
  if (!resource) throw new Error(`Unknown resource: ${resourceKey}`);
  const supabase = await createClient();

  const { data: rows, error } = await supabase
    .from(resource.table)
    .select("id, order_index")
    .order("order_index");
  if (error || !rows) throw new Error(error?.message ?? "Failed to load order");

  const index = rows.findIndex((r) => r.id === id);
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapWith < 0 || swapWith >= rows.length) return;

  const a = rows[index];
  const b = rows[swapWith];

  await Promise.all([
    supabase.from(resource.table).update({ order_index: b.order_index }).eq("id", a.id),
    supabase.from(resource.table).update({ order_index: a.order_index }).eq("id", b.id),
  ]);

  revalidateSite();
  revalidatePath(`/admin/${resourceKey}`);
}

export async function uploadMedia(file: File): Promise<string> {
  const supabase = await createClient();
  const ext = file.name.split(".").pop();
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from("site-media").upload(path, file);
  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from("site-media").getPublicUrl(path);
  return data.publicUrl;
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
