import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const { secret, slug, status } = Object.fromEntries(searchParams);

    if (!process.env.PREVIEW_SECRET) {
      return new NextResponse("Preview secret not configured", { status: 500 });
    }

    if (secret !== process.env.PREVIEW_SECRET) {
      return new NextResponse("Invalid token", { status: 401 });
    }

    if (!slug) {
      return new NextResponse("Slug is required", { status: 400 });
    }

    const baseUrl = process.env.NEXTAUTH_URL || new URL(request.url).origin;
    const encodedSlug = encodeURIComponent(slug);
    const redirectUrl = `${baseUrl}/blogs/${encodedSlug}`;

    try {
      new URL(redirectUrl);
      return NextResponse.redirect(redirectUrl);
    } catch (urlError) {
      console.error("Invalid redirect URL:", redirectUrl, urlError);
      return new NextResponse("Invalid redirect URL", { status: 500 });
    }

  } catch (error) {
    console.error("Preview API error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
