"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NAV_LINKS, SITE_SHORT_NAME } from "@/lib/content/data";
import { cn } from "@/lib/utils";

const PRIMARY_LABELS = ["Home", "About", "Ministries", "Sermons", "Events", "Giving", "Contact"];
const primaryLinks = NAV_LINKS.filter((l) => PRIMARY_LABELS.includes(l.label));
const moreLinks = NAV_LINKS.filter(
  (l) => l.label !== "Home" && !PRIMARY_LABELS.includes(l.label)
);

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled;
  const isMoreActive = moreLinks.some((l) => l.href === pathname);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        transparent
          ? "bg-transparent"
          : "bg-white/90 backdrop-blur-md border-b border-border shadow-[0_1px_0_0_rgba(0,0,0,0.02)]"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className={cn(
            "shrink-0 whitespace-nowrap font-heading text-lg font-semibold tracking-tight",
            transparent ? "text-white" : "text-foreground"
          )}
        >
          {SITE_SHORT_NAME}
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors",
                transparent
                  ? "text-white/90 hover:bg-white/10 hover:text-white"
                  : "text-foreground/80 hover:bg-muted hover:text-foreground",
                pathname === link.href &&
                  (transparent ? "text-white" : "text-primary")
              )}
            >
              {link.label}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "flex items-center gap-0.5 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors",
                  transparent
                    ? "text-white/90 hover:bg-white/10 hover:text-white"
                    : "text-foreground/80 hover:bg-muted hover:text-foreground",
                  isMoreActive && (transparent ? "text-white" : "text-primary")
                )}
              >
                More
                <ChevronDown className="size-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {moreLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <Button
            asChild
            variant="outline"
            className={cn(
              transparent &&
                "border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
            )}
          >
            <Link href="/watch-live">Watch Live</Link>
          </Button>
          <Button asChild>
            <Link href="/new-here">Join Us Sunday</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn("xl:hidden", transparent && "text-white hover:bg-white/10 hover:text-white")}
              aria-label="Open navigation menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="font-heading">{SITE_SHORT_NAME}</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {NAV_LINKS.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-base font-medium text-foreground/85 transition-colors hover:bg-muted",
                      pathname === link.href && "bg-accent text-accent-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-2 px-4">
              <SheetClose asChild>
                <Button asChild variant="outline">
                  <Link href="/watch-live">Watch Live</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button asChild>
                  <Link href="/new-here">Join Us Sunday</Link>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
