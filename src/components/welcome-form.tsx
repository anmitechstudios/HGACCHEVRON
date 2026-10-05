"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

export function WelcomeForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit() {
    // TODO: wire to the church's welcome-team inbox once a backend is available.
    await new Promise((r) => setTimeout(r, 500));
    setSubmitted(true);
    reset();
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-10 text-center">
        <CheckCircle2 className="size-8 text-sky-700" />
        <p className="font-heading text-lg font-semibold text-foreground">
          Thank you!
        </p>
        <p className="text-sm text-muted-foreground">
          Our welcome team will reach out to you shortly.
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
        <Label htmlFor="welcome-name">Full name</Label>
        <Input id="welcome-name" className="mt-1.5" {...register("name")} />
        {errors.name && (
          <p className="mt-1 text-xs text-red-600" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="welcome-email">Email</Label>
        <Input
          id="welcome-email"
          type="email"
          className="mt-1.5"
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-600" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="welcome-phone">Phone (optional)</Label>
        <Input id="welcome-phone" type="tel" className="mt-1.5" {...register("phone")} />
      </div>
      <div>
        <Label htmlFor="welcome-message">Anything we should know? (optional)</Label>
        <Textarea id="welcome-message" className="mt-1.5" rows={3} {...register("message")} />
      </div>
      <Button type="submit" disabled={isSubmitting} className="mt-2 h-11">
        Send to Our Welcome Team
      </Button>
    </form>
  );
}
