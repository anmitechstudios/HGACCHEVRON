import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RESOURCES } from "@/lib/admin/resources";

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-foreground">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage the content shown across hgacchevron.org.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {RESOURCES.map((r) => (
          <Link
            key={r.key}
            href={`/admin/${r.key}`}
            className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
          >
            <h2 className="font-heading text-lg font-semibold text-foreground">{r.label}</h2>
            <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{r.description}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              Manage
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
