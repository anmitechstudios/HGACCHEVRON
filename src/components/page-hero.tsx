import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Breadcrumbs, type Crumb } from "@/components/breadcrumbs";
import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  breadcrumbs,
  backgroundImageUrl,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  breadcrumbs?: Crumb[];
  backgroundImageUrl?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#111418] pb-16 pt-36 sm:pb-20 sm:pt-44">
      <div className="absolute inset-0">
        {backgroundImageUrl ? (
          <>
            <Image
              src={backgroundImageUrl}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-[center_20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e11] via-[#0c0e11]/75 to-[#0c0e11]/50" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-[#161b21] via-[#12151a] to-[#0c0e11]" />
            <div className="absolute left-1/2 top-[-20%] h-[70%] w-[60%] -translate-x-1/2 rounded-full bg-sky-500/20 blur-[130px]" />
          </>
        )}
      </div>
      <Container className="relative">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <Reveal className="max-w-2xl">
          {eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-3 text-balance font-heading text-4xl font-semibold text-white sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-xl text-balance text-lg leading-relaxed text-white/75">
              {description}
            </p>
          )}
          {children}
        </Reveal>
      </Container>
    </section>
  );
}
