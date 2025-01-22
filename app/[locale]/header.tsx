"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <header className="container mx-auto 2xl:px-28 xl:px-28 lg:px-28 px-6">
      <div className="flex justify-between mb-4">
        <div className="flex">
          <Image
            src="/images/ico-hologram.png"
            alt="Logo"
            width={36}
            height={36}
            className="flex-1 w-[36px] h-[36px]"
            priority={true}
          />
          <p className="flex-1 text-hologram-color font-semibold text-2xl pt-1 pl-4">
            Hologram
          </p>
        </div>
        <div>
          <Link href="https://github.com/2060-io" target="_blank">
            <Image
              src={
                isDarkMode
                  ? "/images/logo-github-white.svg"
                  : "/images/logo-github.svg"
              }
              alt="Logo-gitHub"
              width={36}
              height={36}
              className="w-[36] h-[36] transition duration-300 ease-in-out hover:scale-110"
              priority={false}
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
