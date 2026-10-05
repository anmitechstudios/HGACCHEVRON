"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});
type FormValues = z.infer<typeof schema>;

export function NewsletterSection() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit() {
    // TODO: wire to a real newsletter provider (e.g. Mailchimp, Resend audiences)
    // once one is chosen. Currently just confirms the form works end-to-end.
    await new Promise((r) => setTimeout(r, 500));
    setSubmitted(true);
    reset();
  }

  return (
    <section className="bg-foreground py-20">
      <Container>
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10 text-sky-300">
            <Mail className="size-6" />
          </div>
          <h2 className="mt-5 font-heading text-2xl font-semibold text-white sm:text-3xl">
            Stay Connected
          </h2>
          <p className="mt-3 max-w-md text-white/70">
            Get sermon releases, event announcements, and church news straight
            to your inbox.
          </p>

          {submitted ? (
            <p className="mt-8 flex items-center gap-2 text-sky-300">
              <CheckCircle2 className="size-5" />
              You&apos;re on the list, thank you!
            </p>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
              noValidate
            >
              <div className="flex-1 text-left">
                <Input
                  type="email"
                  placeholder="you@email.com"
                  aria-label="Email address"
                  aria-invalid={Boolean(errors.email)}
                  className="h-12 border-white/20 bg-white/5 text-white placeholder:text-white/40 focus-visible:ring-sky-400"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-300" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 bg-white text-foreground hover:bg-white/90"
              >
                Subscribe
              </Button>
            </form>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
