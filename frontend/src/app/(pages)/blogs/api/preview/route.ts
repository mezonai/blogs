import { draftMode, cookies } from "next/headers";
import { redirect } from "next/navigation";

function getPreviewPath(
  contentType: string | undefined,
  slug: string | null,
  status: string | null
): string {
  const basePath = (() => {
    if (!contentType) return "/";

    if (contentType === "blog") {
      return slug ? "/blogs/" + slug : "/blogs";
    }
    return "/"
  })();
  const searchParams = new URLSearchParams()
  if (status) searchParams.append("status", status);

  return `${basePath}?${searchParams.toString()}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchParamsData = Object.fromEntries(searchParams);
  const { secret, slug, uid, status } = searchParamsData;

  if (secret !== process.env.PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  const contentType = uid?.split(".").pop();
  const previewPath = getPreviewPath(contentType, slug, status);
  const draft = await draftMode();
  const cookie = await cookies();

  if (status.toLowerCase() === "draft") {
    draft.enable();
  } else {
    draft.disable();
  }
  
  const bypassCookie = cookie.get('__prerender_bypass');
  if (bypassCookie) {
    cookie.set({
      name: '__prerender_bypass',
      value: bypassCookie.value,
      httpOnly: true, // Keep existing attributes
      secure: process.env.ENV === 'production' ? true : false,   // Ensure Secure is set with SameSite=None
      sameSite: process.env.ENV === 'production' ? 'none' : 'lax', // Set SameSite to None
      path: '/',
    });
  }
  return redirect(previewPath);
}
