'use client'

import { cn } from '@/lib/style'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import Link from 'next/link'
// import { useSearchParams } from "next/navigation";
// import useSearchQueries from "@/hooks/useSearchQueries";
import { useEffect, useState } from 'react'
import Logo2 from './Logo2'
import SearchNews from './SearchNews'

const navbarLinks = [
  { title: 'خانه', href: '/' },
  { title: 'اخبار و رویداد ها', href: '/news' },
  { title: ' فیلم', href: '/gallery' },
  { title: 'عکس', href: '/photo' },
  { title: 'تماس با ما', href: '/contact-us' },
  { title: 'درباره ما', href: '/about-us' },
]

export default function Header({
  isIndexPage = false,
  className,
}: {
  isIndexPage?: boolean
  className?: string
}) {
  return (
    <>
      {/* mobile */}
      <div
        className={cn(
          'w-full flex lg:hidden print:hidden justify-between py-2 px-5 border-b border-[#CCCCCC] bg-white',
          className,
          isIndexPage && 'bg-transparent border-b border-white'
        )}
      >
        <MobileMenu />
        {/* <LangSelector /> */}
      </div>

      {/* desktop */}
      <div
        className={cn(
          'w-full hidden lg:flex print:flex justify-between py-0 pt-2 px-14 border-b border-[#CCCCCC] bg-white',
          className,
          isIndexPage && 'bg-transparent border-b border-white'
        )}
      >
        {/* right section */}
        <div className="flex justify-start gap-10 xl:gap-16 items-center">
          <Link href="/">
            <Logo className="w-[154px] h-[61px]" />
          </Link>
          <div className="flex print:hidden justify-start gap-5 xl:gap-10 items-center">
            {navbarLinks.slice(0, 4).map((navLink, index) => (
              <Link
                key={index}
                href={navLink.href}
                className="font-normal text-lg text-black"
              >
                {navLink.title}
              </Link>
            ))}
          </div>
        </div>

        {/* left section */}
        <div className="flex print:hidden justify-end gap-10 xl:gap-16 items-center">
          <div className="flex justify-start gap-5 xl:gap-10 items-center">
            {navbarLinks.slice(4).map((navLink, index) => (
              <Link
                key={index}
                href={navLink.href}
                className="font-normal text-lg text-black"
              >
                {navLink.title}
              </Link>
            ))}
          </div>
          <SearchNews
            classNames={{ container: 'bg-white/30', input: 'w-36 xl:w-44' }}
          />
        </div>
        {/* <LangSelector /> */}
      </div>
    </>
  )
}

// function LangSelector({ className }: { className?: string }) {
//   const searchParams = useSearchParams();
//   const setSearchQueries = useSearchQueries();

//   return (
//     <div
//       className={cn("flex justify-end gap-3 items-center text-sm", className)}
//     >
//       <span
//         onClick={() => setSearchQueries(["language"], ["fa"])}
//         className={cn(
//           "text-black font-normal",
//           searchParams.get("language") === "fa" && "font-bold text-[#00A3FF]"
//         )}
//       >
//         فارسی
//       </span>
//       |
//       <span
//         onClick={() => setSearchQueries(["language"], ["en"])}
//         className={cn(
//           "text-black font-normal",
//           searchParams.get("language") === "en" && "font-bold text-[#00A3FF]"
//         )}
//       >
//         English
//       </span>
//       |
//       <span
//         onClick={() => setSearchQueries(["language"], ["ar"])}
//         className={cn(
//           "",
//           searchParams.get("language") === "ar" && "font-bold text-[#00A3FF]"
//         )}
//       >
//         العربی
//       </span>
//     </div>
//   );
// }

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    return () => document.body.classList.remove('overflow-hidden')
  }, [isOpen])

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="size-10 p-1 place-content-center cursor-pointer"
      >
        <Menu className="size-8" />
      </button>

      <div
        className={cn(
          'fixed inset-0 z-[50] bg-primary/80 backdrop-blur-md flex flex-col justify-center gap-8 items-center p-5 transition-all duration-300 ease-in-out',
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        )}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 place-content-center absolute top-2 right-2 cursor-pointer"
        >
          <X className="size-8 text-white" />
        </button>

        <Logo2 className="mb-3 w-[154px] h-[61px]" />

        <SearchNews
          classNames={{
            container: 'mb-3 bg-white/30 w-[85%] sm:w-[70%] md:w-[60%]',
            input: 'flex-1',
          }}
        />

        {navbarLinks.map((navLink, index) => (
          <Link
            key={index}
            href={navLink.href}
            className="text-black text-lg font-medium"
          >
            {navLink.title}
          </Link>
        ))}
      </div>
    </>
  )
}
