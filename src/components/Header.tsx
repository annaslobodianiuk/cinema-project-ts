"use client";
import iconFilm from "../img/IconFilm.jpg";
import Image from "next/image";
import { Film, House, Mail, AlignJustify, X } from "lucide-react";
import Link from "next/link";
import header from "@/content/header.json";
import { useState } from "react";
import Button from "@/components/Button";

export default function Header() {
  const [isClick, setIsClick] = useState<boolean>(false);

  return (
      <header className="fixed top-0 left-0 w-full z-50">
        <div className="h-[70px] bg-blue-950 text-sm px-7 sm:px-14 lg:text-base lg:px-20">
          <div className="flex justify-between items-center h-full 2xl:max-w-[1400px] 2xl:mx-auto">
            <Link href="/">
              <Image
                  width={70}
                  height={70}
                  className="rounded-full"
                  src={iconFilm}
                  alt={"Icon film"}
              />
            </Link>
            <div className="hidden md:flex md:flex-row md:items-center md:gap-14 lg:gap-20 text-amber-200">
              <Link href="/">
                <div className="flex items-center gap-2 hover:underline">
                  {header.main}
                  <House />
                </div>
              </Link>
              <Link href="/films">
                <div className="flex items-center gap-2 hover:underline">
                  {header.films}
                  <Film />
                </div>
              </Link>
              <Link href="#footer">
                <div className="flex items-center gap-2 hover:underline">
                  {header.contacts}
                  <Mail />
                </div>
              </Link>
            </div>
            <Button
                className="md:hidden text-white"
                onClick={() => setIsClick(!isClick)}
            >
              {isClick ? <X /> : <AlignJustify />}
            </Button>
          </div>
        </div>
        <div
            className={`fixed top-[70px] left-0 h-[calc(100vh-70px)] w-full z-40 bg-gray-500 flex flex-col justify-center gap-10 items-center text-white transition-all duration-300 ease-in-out transform md:hidden ${
                isClick
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-5 pointer-events-none"
            }`}
        >
          <Link href="/" onClick={() => setIsClick(false)}>
            <div className="flex items-center gap-2 hover:underline">
              {header.main}
              <House />
            </div>
          </Link>
          <Link href="/films" onClick={() => setIsClick(false)}>
            <div className="flex items-center gap-2 hover:underline">
              {header.films}
              <Film />
            </div>
          </Link>
          <Link href="#footer" onClick={() => setIsClick(false)}>
            <div className="flex items-center gap-2 hover:underline">
              {header.contacts}
              <Mail />
            </div>
          </Link>
        </div>
      </header>
  );
}
