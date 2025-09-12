// app/api/preview/route.ts
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

function getPreviewPath(
  contentType: string | undefined,
  slug: string | null,
  locale: string | null,
  status: string | null
): string {
  const basePath = (() => {
    if (!contentType) return "/";

    // map Strapi uid "blog" -> route "blogs"
    if (contentType === "blog" || contentType.includes("blogs")) {
      return slug ? "/blogs/" + slug : "/blogs";
    }

    if (contentType === "article" || contentType.includes("articles")) {
      return slug ? "/articles/" + slug : "/articles";
    }

    return "/" + contentType;
  })();

  const localePath =
    locale && locale !== "en" ? "/" + locale + basePath : basePath;

  const statusParam = status ? "?status=" + status : "";
  return localePath + statusParam;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchParamsData = Object.fromEntries(searchParams);
  const { secret, slug, locale, uid, status } = searchParamsData;

  // debug log (ok để tạm giữ)
  console.log(searchParamsData);

  if (secret !== process.env.PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  const contentType = uid?.split(".").pop();
  const finalPath = getPreviewPath(contentType, slug, locale, status);

  // <-- Sửa ở đây: await draftMode()
  const draft = await draftMode();

  // so sánh case-insensitive (Strapi có thể gửi "draft" thường)
  if ((status ?? "").toLowerCase() === "draft") {
    draft.enable();
  } else {
    draft.disable();
  }

  // trả về redirect
  return redirect(finalPath);
}
