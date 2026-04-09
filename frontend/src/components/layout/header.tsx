'use client';

import { HEADER_TABS, ROUTES } from '@/shared/constants';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../atoms/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../atoms/sheet';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div
      className={`fixed top-0 w-full z-50 transition-colors duration-300 w-full p-4 ${mounted && scrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
    >
      <div className="hidden lg:flex space-x-4 justify-between items-center max-w-[1200px] mx-auto ">
        <div className="flex gap-8 items-center">
          <Link href={ROUTES.HOME} className="flex items-center">
            <Image
              src="/Logo_mezon_light.png"
              alt="Logo_mezon_light.png"
              width={44}
              height={44}
            />
            <span className="font-[600] text-[22px] text-[#111827]">mezon</span>
          </Link>

          {HEADER_TABS.map((tab) => {

            return (
              <Link
                key={tab.path}
                href={tab.path}
                className={`font-[500] transition-colors ${pathname.startsWith(tab.path)
                  ? 'text-[#5865f2] underline underline-offset-4 decoration-[#5865f2] decoration-2'
                  : 'text-[#4b5563] hover:text-[#5865f2]'
                  }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="lg:hidden flex items-center justify-between">
        <Link href={ROUTES.HOME} className="flex items-center">
          <Image
            src="/Logo_mezon_light.png"
            alt="Logo_mezon_light.png"
            width={44}
            height={44}
          />
          <span className="font-[600] text-[22px] text-[#111827]">mezon</span>
        </Link>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-screen h-screen max-w-full p-6 sm:max-w-screen [button[data-radix-sheet-close]]:hidden"
          >
            <SheetHeader>
              <SheetTitle>
                <Link href={ROUTES.HOME} className="flex items-center">
                  <Image
                    src="/Logo_mezon_light.png"
                    alt="Logo_mezon_light.png"
                    width={44}
                    height={44}
                  />
                  <span className="font-[600] text-[22px] text-[#111827]">
                    mezon
                  </span>
                </Link>
              </SheetTitle>
            </SheetHeader>

            <div className="mt-4 flex flex-col gap-3 items-center">
              {HEADER_TABS.map((tab) => {
                return (
                  <Link
                    key={tab.path}
                    href={tab.path}
                    onClick={() => setOpen(false)}
                    className={`font-[500] transition-colors ${pathname.startsWith(tab.path)
                      ? 'text-[#5865f2] underline underline-offset-4 decoration-[#5865f2] decoration-2'
                      : 'text-[#4b5563] hover:text-[#5865f2]'
                      }`}
                  >
                    {tab.label}
                  </Link>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
