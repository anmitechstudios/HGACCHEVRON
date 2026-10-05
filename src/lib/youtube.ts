import type { SermonSummary } from "@/lib/content/types";
import { LEADERSHIP } from "@/lib/content/data";

/**
 * Server-side YouTube Data API v3 access.
 *
 * Requires YOUTUBE_API_KEY and YOUTUBE_CHANNEL_ID (the real "UC..." id, not
 * the @handle) as env vars — see README. Every export here fails soft
 * (returns null/[] and logs a warning) rather than throwing, so a missing
 * key, a revoked key, or a quota outage never breaks the build or the page.
 */

const API_BASE = "https://www.googleapis.com/youtube/v3";

// Filters out the short "false start" clips that show up when a livestream
// gets restarted a few times before the real broadcast — observed on this
// channel as several ~2-14 minute clips alongside the real ~2.5 hour
// service recording, all uploaded within the same morning. Adjust if the
// church's actual content pattern changes (e.g. legitimate short clips).
const MIN_SERMON_DURATION_SECONDS = 20 * 60;

const MAIN_PREACHER =
  LEADERSHIP.find((l) => l.role === "vicar")?.name ?? "Revd Engr. Innocent Jiji";

function getCredentials() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  if (!apiKey || !channelId) return null;
  return { apiKey, channelId };
}

/** The channel's uploads playlist id is always "UU" + the channel id minus its "UC" prefix. */
function uploadsPlaylistId(channelId: string) {
  return `UU${channelId.slice(2)}`;
}

function parseIsoDuration(iso: string): number {
  const match = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso);
  if (!match) return 0;
  const [, h, m, s] = match;
  return (Number(h) || 0) * 3600 + (Number(m) || 0) * 60 + (Number(s) || 0);
}

function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface RawUpload {
  videoId: string;
  title: string;
  publishedAt: string;
}

interface PlaylistItemsResponse {
  items?: Array<{
    snippet: { title: string; publishedAt: string };
    contentDetails: { videoId: string };
  }>;
}

interface VideosResponse {
  items?: Array<{
    id: string;
    contentDetails: { duration: string };
  }>;
}

async function fetchUploadsPage(
  apiKey: string,
  channelId: string,
  maxResults: number
): Promise<RawUpload[]> {
  const url = `${API_BASE}/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId(
    channelId
  )}&maxResults=${maxResults}&key=${apiKey}`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    console.warn(`YouTube playlistItems request failed: ${res.status}`);
    return [];
  }
  const data: PlaylistItemsResponse = await res.json();
  return (data.items ?? []).map((item) => ({
    videoId: item.contentDetails.videoId,
    title: item.snippet.title,
    publishedAt: item.snippet.publishedAt,
  }));
}

async function fetchDurations(
  apiKey: string,
  videoIds: string[]
): Promise<Record<string, number>> {
  if (videoIds.length === 0) return {};
  const url = `${API_BASE}/videos?part=contentDetails&id=${videoIds.join(
    ","
  )}&key=${apiKey}`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    console.warn(`YouTube videos request failed: ${res.status}`);
    return {};
  }
  const data: VideosResponse = await res.json();
  const durations: Record<string, number> = {};
  for (const item of data.items ?? []) {
    durations[item.id] = parseIsoDuration(item.contentDetails.duration);
  }
  return durations;
}

/** Recent real sermons (full-length uploads only), most recent first. */
export async function fetchRecentSermons(limit = 12): Promise<SermonSummary[]> {
  const creds = getCredentials();
  if (!creds) return [];

  try {
    // Over-fetch since some recent uploads are filtered out as false starts.
    const raw = await fetchUploadsPage(creds.apiKey, creds.channelId, Math.min(limit * 3, 50));
    if (raw.length === 0) return [];

    const durations = await fetchDurations(
      creds.apiKey,
      raw.map((r) => r.videoId)
    );

    return raw
      .filter((r) => (durations[r.videoId] ?? 0) >= MIN_SERMON_DURATION_SECONDS)
      .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
      .slice(0, limit)
      .map((r, i) => ({
        id: r.videoId,
        title: r.title,
        speaker: MAIN_PREACHER,
        date: formatDate(r.publishedAt),
        youtubeId: r.videoId,
        thumbnailUrl: `https://i.ytimg.com/vi/${r.videoId}/hqdefault.jpg`,
        durationLabel: formatDuration(durations[r.videoId] ?? 0),
        isFeatured: i === 0,
      }));
  } catch (err) {
    console.warn("YouTube fetch failed:", err);
    return [];
  }
}

/** No-API-key-required embed that always shows the channel's current or most recent live broadcast. */
export function getLiveEmbedUrl(): string | null {
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  if (!channelId) return null;
  return `https://www.youtube.com/embed/live_stream?channel=${channelId}`;
}
