'use client';

import {
  COMPANY_TABS,
  MEZON_TABS,
  POLICIES_TABS,
  RESOURCES_TABS,
  ROUTES,
} from '@/shared/constants';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  function isExternal(url: string) {
    return url.startsWith('http');
  }
  return (
    <footer className="w-full bg-[#23272a] text-gray-300 px-8 pt-[64px] pb-[32px]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-[1200px] mx-auto">
        <div>
          <h3 className="text-[#5865f2] font-bold mb-3 text-[20px]">Mezon</h3>
          <ul className="space-y-2">
            {MEZON_TABS.map((tab) => {
              const external = isExternal(tab.path);
              return (
                <li key={tab.label}>
                  <Link
                    href={tab.path}
                    {...(external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="hover:text-white text-[#9ca3af]"
                  >
                    {tab.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3 className="text-[#5865f2] font-bold mb-3 text-[20px]">Company</h3>
          <ul className="space-y-2">
            {COMPANY_TABS.map((tab) => {
              const external = isExternal(tab.path);
              return (
                <li key={tab.label}>
                  <Link
                    href={tab.path}
                    {...(external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="hover:text-white text-[#9ca3af]"
                  >
                    {tab.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3 className="text-[#5865f2] font-bold mb-3 text-[20px]">
            Resources
          </h3>
          <ul className="space-y-2">
            {RESOURCES_TABS.map((tab) => {
              const external = isExternal(tab.path);
              return (
                <li key={tab.label}>
                  <Link
                    href={tab.path}
                    {...(external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="hover:text-white text-[#9ca3af]"
                  >
                    {tab.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3 className="text-[#5865f2] font-bold mb-3 text-[20px]">
            Policies
          </h3>
          <ul className="space-y-2">
            {POLICIES_TABS.map((tab) => {
              const external = isExternal(tab.path);
              return (
                <li key={tab.label}>
                  <Link
                    href={tab.path}
                    {...(external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="hover:text-white text-[#9ca3af]"
                  >
                    {tab.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 flex items-center justify-between max-w-[1200px] mx-auto">
        <Link href={ROUTES.HOME} className="flex items-center gap-3">
          <Image
            src="/blogs/Logo_mezon_dark.png"
            alt="Logo_mezon_dark.png"
            width={44}
            height={44}
          />
          <span className="font-[600] text-[18px] text-white">mezon</span>
        </Link>
      </div>
    </footer>
  );
}
