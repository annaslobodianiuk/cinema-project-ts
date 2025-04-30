import Image from "next/image";
import mainPhoto from "../img/IconFilm.jpg";
import Link from "next/link";
import { Film, House } from "lucide-react";
import footer from "@/content/footer.json";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-blue-950 text-sm lg:text-base text-amber-200 border-t-2 border-yellow-400 px-8 sm:px-12 py-8 lg:px-20 lg:py-10"
    >
      <div className="font-graphik grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-0">
        <div className="h-[80px] w-[80px] md:w-[100px] md:h-[100px]">
          <Link href="/" className="block w-fit">
            <Image
              width={100}
              height={100}
              className="rounded-full h-full w-full"
              src={mainPhoto}
              alt="movie time logo"
            />
          </Link>
        </div>
        <div className="sm:hidden flex flex-col gap-1">
          <div className="pb-2">{footer.move}</div>
          <Link href="/" className="block w-fit">
            <div className="flex items-center gap-2 hover:underline">
              {footer.main}
              <House />
            </div>
          </Link>
          <Link href="/films" className="block w-fit">
            <div className="flex items-center gap-2 hover:underline">
              {footer.films}
              <Film />
            </div>
          </Link>
          <div className="pt-4 border-t-[1px] border-amber-400">
            {footer.contacts}
          </div>
          <a href="tel:+3890909000" className="block w-fit hover:underline">
            {footer.number}
          </a>
          <a
            href="mailto:movietime@gmail.com"
            className="block w-fit hover:underline"
          >
            {footer.mail}
          </a>
        </div>
        <div className="hidden sm:flex flex-col gap-1 pb-2 sm:pb-0">
          <div className="pb-2 sm:pb-4">{footer.move}</div>
          <Link href="/" className="block w-fit">
            <div className="flex items-center gap-2 hover:underline">
              {footer.main}
              <House />
            </div>
          </Link>
          <Link href="/films" className="block w-fit">
            <div className="flex items-center gap-2 hover:underline">
              {footer.films}
              <Film />
            </div>
          </Link>
        </div>
        <div className="hidden sm:flex flex-col gap-1">
          <div className="pb-2 sm:pb-4">{footer.contacts}</div>
          <a href="tel:+3890909000" className="block w-fit hover:underline">
            {footer.number}
          </a>
          <a
            href="mailto:movietime@gmail.com"
            className="block w-fit hover:underline"
          >
            {footer.mail}
          </a>
        </div>
      </div>
    </footer>
  );
}
