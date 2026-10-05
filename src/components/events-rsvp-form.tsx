"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { EventSummary } from "@/lib/content/types";

const schema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  event: z.string().min(1, "Select an event"),
  guests: z
    .string()
    .refine((v) => Number.isInteger(Number(v)) && Number(v) >= 1 && Number(v) <= 20, {
      message: "Enter a number between 1 and 20",
    }),
});
type FormValues = z.infer<typeof schema>;

export function EventsRsvpForm({ events }: { events: EventSummary[] }) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { guests: "1" },
  });

  async function onSubmit() {
    // TODO: wire to a real RSVP backend/email once available.
    await new Promise((r) => setTimeout(r, 500));
    setSubmitted(true);
    reset();
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-10 text-center">
        <CheckCircle2 className="size-8 text-sky-700" />
        <p className="font-heading text-lg font-semibold text-foreground">
          You&apos;re on the list!
        </p>
        <p className="text-sm text-muted-foreground">
          We look forward to seeing you there.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto grid max-w-lg grid-cols-1 gap-5 rounded-2xl border border-border bg-card p-8"
      noValidate
    >
      <div>
        <Label htmlFor="rsvp-name">Full name</Label>
        <Input id="rsvp-name" className="mt-1.5" {...register("name")} />
        {errors.name && (
          <p className="mt-1 text-xs text-red-600" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="rsvp-email">Email</Label>
        <Input id="rsvp-email" type="email" className="mt-1.5" {...register("email")} />
        {errors.email && (
          <p className="mt-1 text-xs text-red-600" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="rsvp-event">Event</Label>
        <select
          id="rsvp-event"
          className="mt-1.5 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          {...register("event")}
          defaultValue=""
        >
          <option value="" disabled>
            Select an event
          </option>
          {events.map((e) => (
            <option key={e.slug} value={e.title}>
              {e.title}
            </option>
          ))}
        </select>
        {errors.event && (
          <p className="mt-1 text-xs text-red-600" role="alert">
            {errors.event.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="rsvp-guests">Number of guests</Label>
        <Input
          id="rsvp-guests"
          type="number"
          min={1}
          max={20}
          className="mt-1.5"
          {...register("guests")}
        />
      </div>
      <Button type="submit" disabled={isSubmitting} className="mt-2 h-11">
        Reserve My Spot
      </Button>
    </form>
  );
}
