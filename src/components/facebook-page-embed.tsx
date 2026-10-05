/**
 * Facebook's public "Page Plugin" as a plain iframe — no Facebook App ID,
 * JS SDK, or Graph API token required. Showing the "timeline" tab means a
 * current live video from the page surfaces here automatically; there's no
 * way to force a dedicated "Live Now" state without the Graph API (see
 * README for the fuller Graph API integration this could upgrade to).
 */
export function FacebookPageEmbed({
  pageUrl,
  height = 500,
}: {
  pageUrl: string;
  height?: number;
}) {
  const src = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
    pageUrl
  )}&tabs=timeline&width=500&height=${height}&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <iframe
        src={src}
        width="100%"
        height={height}
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        loading="lazy"
        allow="encrypted-media; picture-in-picture; web-share"
        title="His Grace Anglican Church, Chevron on Facebook"
      />
    </div>
  );
}
