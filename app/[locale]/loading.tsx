"use client";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Image
        src="/images/ico-hologram.png"
        alt="Hologram logo"
        width={140}
        height={30}
        priority
        className="mb-8"
      />
      <div className="animate-pulse flex flex-col space-y-4 w-full max-w-md">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mx-auto"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mx-auto"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
      </div>
    </div>
  );
}
