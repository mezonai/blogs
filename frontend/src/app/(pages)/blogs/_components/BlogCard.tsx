'use client';

import { Card } from '@/components/atoms/card';
import { ROUTES } from '@/shared/constants';
import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
  image: string;
  title: string;
  content: string;
  slug: string;
}

export function BlogCard({ image, title, content, slug }: BlogCardProps) {
  return (
    <Link href={`${ROUTES.BLOGS}/${slug}`}>
      <Card className="max-[375px]:w-[300px] w-[350px] rounded-2xl overflow-hidden h-[390px] cursor-pointer hover:shadow-xl transition-shadow">
        <div className="relative h-[235px] w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover h-[235px]"
          />
        </div>
        <div className="px-5 pt-5 pb-4 flex flex-col gap-2">
          <div className="text-lg font-bold text-[#181a2a] min-h-[48px] line-clamp-2">
            {title}
          </div>
          <div className="text-base text-[#6d6e76] line-clamp-2">{content}</div>
        </div>
      </Card>
    </Link>
  );
}
