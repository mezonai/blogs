import { draftMode } from "next/headers";
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

  if (status.toLowerCase() === "draft") {
    draft.enable();
  } else {
    draft.disable();
  }
  return redirect(previewPath);
}
