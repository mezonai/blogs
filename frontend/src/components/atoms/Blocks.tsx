'use client';

import {
  BlocksRenderer,
  type BlocksContent,
} from '@strapi/blocks-react-renderer';
import Image from 'next/image';
import { JSX } from 'react';

type BlocksProps = {
  content: BlocksContent;
};

const styles: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
  1: 'text-3xl font-bold mb-4 mt-6',
  2: 'text-2xl font-bold mb-4 mt-6',
  3: 'text-xl font-bold mb-4 mt-6',
  4: 'text-lg font-bold mb-4 mt-6',
  5: 'text-base font-medium mb-1',
  6: 'text-sm font-medium mb-1',
};

export function Blocks({ content }: BlocksProps) {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        paragraph: ({ children }) => (
          <p className="text-[17px] leading-7">{children}</p>
        ),
        heading: ({ children, level }) => {
          const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
          return <HeadingTag className={styles[level]}>{children}</HeadingTag>;
        },
        list: ({ children }) => (
          <ul className="list-disc list-inside text-[17px]">{children}</ul>
        ),
        'list-item': ({ children }) => <li className="ml-4">{children}</li>,
        link: ({ children, url }) => (
          <a href={url} target='_blank' className="text-blue-600 underline hover:text-blue-800">
            {children}
          </a>
        ),
        image: ({ image }) => (
          <Image
            src={image?.url || ''}
            className="my-4 rounded-lg"
            width={image?.width || 0}
            height={image?.height || 0}
            alt={image?.alternativeText || 'Image'}
          />
        ),
      }}
    />
  );
}
