import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const model = body.model; // e.g., 'blog'
    const entry = body.entry; // Strapi sends the entry data
    
    console.log(`--- Revalidating ---`);
    console.log(`Model: ${model}, Slug: ${entry?.slug}`);

    if (model) {
      // 1. Xóa cache dữ liệu theo Tag (Giúp mọi nơi dùng data này đều cập nhật)
      revalidateTag(model);
      console.log(`Tag '${model}' revalidated.`);
    }

    // 2. Xóa cache theo đường dẫn vật lý (Full Route Cache)
    // Xóa trang chủ và danh sách blog
    revalidatePath('/', 'layout'); 
    
    // Nếu là blog và có slug, xóa đích danh trang chi tiết đó
    if (model === 'blog' && entry?.slug) {
      // Vì bạn dùng trailingSlash: true, chúng ta revalidate cả path có /
      revalidatePath(`/blogs/${entry.slug}/`);
      revalidatePath(`/blogs/${entry.slug}`);
      console.log(`Path /blogs/${entry.slug} revalidated.`);
    }

    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now() 
    });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating', error: err }, { status: 500 });
  }
}
