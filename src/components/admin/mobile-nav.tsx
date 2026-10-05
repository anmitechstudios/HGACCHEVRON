"use client";

import { useRouter, usePathname } from "next/navigation";
import { RESOURCES } from "@/lib/admin/resources";

export function AdminMobileNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <select
      value={pathname}
      onChange={(e) => router.push(e.target.value)}
      className="h-9 rounded-md border border-input bg-transparent px-2 text-sm lg:hidden"
      aria-label="Jump to section"
    >
      <option value="/admin">Dashboard</option>
      {RESOURCES.map((r) => (
        <option key={r.key} value={`/admin/${r.key}`}>
          {r.label}
        </option>
      ))}
    </select>
  );
}
