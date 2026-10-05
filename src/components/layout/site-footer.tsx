import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/icons/social-icons";
import {
  getGivingAccounts,
  getNavLinks,
  getServiceTimes,
  getSiteInfo,
  getSocialLinks,
} from "@/lib/content";

const SOCIAL_ICONS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  threads: InstagramIcon,
} as const;

export async function SiteFooter() {
  const [site, navLinks, serviceTimes, givingAccounts, socialLinks] =
    await Promise.all([
      getSiteInfo(),
      getNavLinks(),
      getServiceTimes(),
      getGivingAccounts(),
      getSocialLinks(),
    ]);

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-heading text-xl font-semibold text-foreground">
              {site.name}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {site.vision}
            </p>
            {socialLinks.length > 0 && (
              <div className="mt-5 flex items-center gap-3">
                {socialLinks.map((link) => {
                  const Icon = SOCIAL_ICONS[link.platform];
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.platform}
                      className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      <Icon className="size-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Quick Links</p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.slice(0, 7).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Service Times</p>
            <ul className="mt-4 space-y-2.5">
              {serviceTimes.map((s) => (
                <li key={s.name} className="text-sm text-muted-foreground">
                  <span className="text-foreground/80">{s.day}</span>, {s.time}
                  <br />
                  {s.name}
                </li>
              ))}
            </ul>
            <Link
              href="/giving"
              className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              Give Cheerfully →
            </Link>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Contact</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>{site.contact.address.venueName}</li>
              <li>{site.contact.address.line1}</li>
              <li>{site.contact.address.line2}</li>
              <li className="italic text-muted-foreground/80">
                {site.contact.address.landmark}
              </li>
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="transition-colors hover:text-primary"
                >
                  {site.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {givingAccounts.map((account) => (
            <span
              key={account.purpose}
              className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground"
            >
              {account.purpose}: {account.bankName} · {account.accountNumber}
            </span>
          ))}
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="max-w-xl font-heading text-base italic text-foreground/80">
            &ldquo;Unless the Lord builds the house, those who build it labor in
            vain.&rdquo; (Psalm 127:1)
          </p>
          <p className="text-xs text-muted-foreground">
            A parish of the Anglican Diocese of Lagos, Church of Nigeria
            (Anglican Communion).
          </p>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
