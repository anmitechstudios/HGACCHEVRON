/**
 * Config-driven registry for the admin portal.
 *
 * Every editable content type is described once here — table name, fields,
 * whether it's a singleton or an ordered list — and the generic pages under
 * src/app/admin/[resource]/ render CRUD UI from this config. Adding a new
 * editable content type means adding one entry here, not a new set of pages.
 */

export type FieldType = "text" | "textarea" | "number" | "boolean" | "select" | "image";

export interface SelectOption {
  label: string;
  value: string;
}

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  options?: SelectOption[];
  required?: boolean;
  helpText?: string;
}

export interface ResourceDef {
  key: string;
  table: string;
  label: string;
  singularLabel: string;
  description: string;
  fields: FieldDef[];
  orderable: boolean;
  singleton?: boolean;
  titleField: string;
  subtitleField?: string;
}

export const RESOURCES: ResourceDef[] = [
  {
    key: "hero-slides",
    table: "hero_slides",
    label: "Hero Slides",
    singularLabel: "Hero Slide",
    description: "The rotating slides on the homepage hero.",
    orderable: true,
    titleField: "title",
    subtitleField: "eyebrow",
    fields: [
      { name: "slug", label: "Slug (unique id)", type: "text", required: true },
      { name: "eyebrow", label: "Eyebrow", type: "text", required: true },
      { name: "title", label: "Headline", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "primary_cta_label", label: "Primary button label", type: "text", required: true },
      { name: "primary_cta_href", label: "Primary button link", type: "text", required: true },
      {
        name: "secondary_cta_label",
        label: "Secondary button label",
        type: "text",
        required: true,
      },
      { name: "secondary_cta_href", label: "Secondary button link", type: "text", required: true },
    ],
  },
  {
    key: "events",
    table: "events",
    label: "Events",
    singularLabel: "Event",
    description: "Church events shown on the Events page and homepage.",
    orderable: true,
    titleField: "title",
    subtitleField: "date_label",
    fields: [
      { name: "slug", label: "Slug (unique id)", type: "text", required: true },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "date_label", label: "Date", type: "text", required: true },
      { name: "time_label", label: "Time (optional)", type: "text" },
      { name: "location", label: "Location (optional)", type: "text" },
      { name: "description", label: "Description", type: "textarea", required: true },
      {
        name: "is_flagship",
        label: "Flagship (featured on homepage)",
        type: "boolean",
      },
    ],
  },
  {
    key: "leadership",
    table: "leadership",
    label: "Leadership",
    singularLabel: "Leader",
    description: "Parish leadership profiles.",
    orderable: true,
    titleField: "name",
    subtitleField: "title",
    fields: [
      { name: "slug", label: "Slug (unique id)", type: "text", required: true },
      { name: "name", label: "Name", type: "text", required: true },
      { name: "title", label: "Title / Role", type: "text", required: true },
      {
        name: "role",
        label: "Category",
        type: "select",
        required: true,
        options: [
          { label: "Vicar", value: "vicar" },
          { label: "Clergy Wife", value: "clergy-wife" },
          { label: "Diocesan", value: "diocesan" },
          { label: "Ministry Lead", value: "ministry-lead" },
        ],
      },
      { name: "bio", label: "Bio (optional)", type: "textarea" },
      { name: "photo_url", label: "Photo", type: "image" },
    ],
  },
  {
    key: "ministries",
    table: "ministries",
    label: "Ministries",
    singularLabel: "Ministry",
    description: "Church ministries shown on the Ministries page.",
    orderable: true,
    titleField: "name",
    subtitleField: "tagline",
    fields: [
      { name: "slug", label: "Slug (unique id)", type: "text", required: true },
      { name: "name", label: "Name", type: "text", required: true },
      { name: "tagline", label: "Tagline", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      {
        name: "status",
        label: "Status",
        type: "select",
        required: true,
        options: [
          { label: "Active", value: "active" },
          { label: "Coming Soon", value: "coming-soon" },
        ],
      },
    ],
  },
  {
    key: "gallery-images",
    table: "gallery_images",
    label: "Gallery",
    singularLabel: "Photo",
    description: "Photos shown in the site gallery.",
    orderable: true,
    titleField: "caption",
    subtitleField: "category",
    fields: [
      {
        name: "category",
        label: "Category",
        type: "select",
        required: true,
        options: [
          { label: "Worship", value: "Worship" },
          { label: "Grace Conference", value: "Grace Conference" },
          { label: "Grace Voices", value: "Grace Voices" },
          { label: "Fellowship", value: "Fellowship" },
        ],
      },
      { name: "caption", label: "Caption (optional)", type: "text" },
      { name: "image_url", label: "Photo", type: "image" },
    ],
  },
  {
    key: "faqs",
    table: "faqs",
    label: "FAQs",
    singularLabel: "FAQ",
    description: "Frequently asked questions on the New Here page.",
    orderable: true,
    titleField: "question",
    fields: [
      { name: "question", label: "Question", type: "text", required: true },
      { name: "answer", label: "Answer", type: "textarea", required: true },
    ],
  },
  {
    key: "testimonials",
    table: "testimonials",
    label: "Testimonials",
    singularLabel: "Testimonial",
    description: "Congregant testimonials shown on the homepage.",
    orderable: true,
    titleField: "name",
    subtitleField: "quote",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "quote", label: "Quote", type: "textarea", required: true },
      { name: "context", label: "Context (optional)", type: "text" },
    ],
  },
  {
    key: "history-timeline",
    table: "history_timeline",
    label: "History Timeline",
    singularLabel: "Milestone",
    description: "Milestones on the About page timeline.",
    orderable: true,
    titleField: "title",
    subtitleField: "date_label",
    fields: [
      { name: "date_label", label: "Date", type: "text", required: true },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
    ],
  },
  {
    key: "giving-accounts",
    table: "giving_accounts",
    label: "Giving Accounts",
    singularLabel: "Account",
    description: "Bank accounts shown on the Giving page.",
    orderable: true,
    titleField: "purpose",
    subtitleField: "bank_name",
    fields: [
      { name: "purpose", label: "Purpose", type: "text", required: true },
      { name: "bank_name", label: "Bank Name", type: "text", required: true },
      { name: "account_number", label: "Account Number", type: "text", required: true },
      { name: "account_name", label: "Account Name (optional)", type: "text" },
    ],
  },
  {
    key: "service-times",
    table: "service_times",
    label: "Weekly Activities",
    singularLabel: "Activity",
    description: "Sunday service and weekly activities.",
    orderable: true,
    titleField: "name",
    subtitleField: "day",
    fields: [
      { name: "day", label: "Day", type: "text", required: true },
      { name: "time", label: "Time", type: "text", required: true },
      { name: "name", label: "Name", type: "text", required: true },
      {
        name: "mode",
        label: "Mode",
        type: "select",
        required: true,
        options: [
          { label: "In-Person", value: "In-Person" },
          { label: "Online", value: "Online" },
          { label: "In-Person & Online", value: "In-Person & Online" },
        ],
      },
      {
        name: "is_main_service",
        label: "Main Sunday service",
        type: "boolean",
        helpText: "Shown as the primary \"This Sunday\" card site-wide.",
      },
    ],
  },
  {
    key: "social-links",
    table: "social_links",
    label: "Social Links",
    singularLabel: "Social Link",
    description: "Social media links shown in the header, footer, and contact page.",
    orderable: true,
    titleField: "platform",
    subtitleField: "url",
    fields: [
      {
        name: "platform",
        label: "Platform",
        type: "select",
        required: true,
        options: [
          { label: "Facebook", value: "facebook" },
          { label: "Instagram", value: "instagram" },
          { label: "YouTube", value: "youtube" },
          { label: "Threads", value: "threads" },
        ],
      },
      { name: "url", label: "URL", type: "text", required: true },
      { name: "handle", label: "Handle (optional)", type: "text" },
    ],
  },
  {
    key: "site-settings",
    table: "site_settings",
    label: "Site Settings",
    singularLabel: "Site Settings",
    description: "Site name, vision statement, and contact details.",
    orderable: false,
    singleton: true,
    titleField: "site_name",
    fields: [
      { name: "site_name", label: "Site Name", type: "text", required: true },
      { name: "site_short_name", label: "Short Name (nav/logo)", type: "text", required: true },
      { name: "vision_statement", label: "Vision Statement (full)", type: "textarea", required: true },
      {
        name: "vision_statement_short",
        label: "Vision Statement (short)",
        type: "textarea",
        required: true,
      },
      { name: "email", label: "Email", type: "text", required: true },
      { name: "phone", label: "Phone (optional)", type: "text" },
      { name: "address_venue_name", label: "Venue Name", type: "text", required: true },
      { name: "address_line1", label: "Address Line 1", type: "text", required: true },
      { name: "address_line2", label: "Address Line 2", type: "text", required: true },
      { name: "address_landmark", label: "Landmark", type: "text", required: true },
    ],
  },
  {
    key: "diocese-info",
    table: "diocese_info",
    label: "Diocese Info",
    singularLabel: "Diocese Info",
    description: "Anglican Diocese of Lagos details shown on the Diocese page.",
    orderable: false,
    singleton: true,
    titleField: "diocese_name",
    fields: [
      { name: "province_name", label: "Province Name", type: "text", required: true },
      { name: "diocese_name", label: "Diocese Name", type: "text", required: true },
      { name: "diocese_founded", label: "Diocese Founded", type: "text", required: true },
      { name: "bishop_name", label: "Bishop Name", type: "text", required: true },
      { name: "bishop_title", label: "Bishop Title", type: "text", required: true },
      { name: "archdeaconry_name", label: "Archdeaconry Name", type: "text", required: true },
      {
        name: "archdeaconry_official_spelling",
        label: "Archdeaconry Official Spelling",
        type: "text",
        required: true,
      },
      { name: "archdeacon_name", label: "Archdeacon Name", type: "text", required: true },
      { name: "archdeacon_title", label: "Archdeacon Title", type: "text", required: true },
      {
        name: "archdeaconry_headquarters",
        label: "Archdeaconry Headquarters",
        type: "text",
        required: true,
      },
    ],
  },
];

export function getResource(key: string): ResourceDef | undefined {
  return RESOURCES.find((r) => r.key === key);
}
