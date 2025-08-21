export function getMediaUrl(url?: string | null): string {
  if (!url) return '';
  return url.startsWith('http')
    ? url
    : `${process.env.NEXT_PUBLIC_API_URL}${url}`;
}
