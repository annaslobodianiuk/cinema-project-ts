"use client";
import StarrySky from "@/components/StarrySky";
import MainPhoto from "@/img/mainHomePhoto.jpg";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import main from "@/content/main.json";
import SkeletonImg from "@/components/SkeletonImg";

export default function HomeMain() {
  const router = useRouter();

  return (
    <div className="relative bg-blue-950 h-full">
      <StarrySky countStar={50} />
      <div className="px-8 py-8 flex flex-col justify-center items-center sm:grid sm:grid-cols-2 md:px-10 md:py-10 lg:px-14 lg:py-16 xl:px-20 relative z-10">
        <div className="font-bold text-3xl text-amber-50 text-center pb-10 sm:hidden">
          {main.title}
        </div>
        <div className="relative w-[300px] h-[300px] sm:w-[250px] sm:h-[250px] md:w-[320px] md:h-[320px] lg:w-[420px] lg:h-[420px] xl:w-[500px] xl:h-[500px]">
          <SkeletonImg
            className="rounded-3xl h-full w-full"
            height={500}
            width={500}
            src={MainPhoto}
            alt="main photo"
          />
        </div>
        <div className="font-graphik pt-10 sm:pt-0">
          <div className="hidden sm:block font-bold sm:text-xl md:text-3xl lg:text-5xl xl:text-7xl text-amber-50 text-center">
            {main.title}
          </div>
          <div className="font-medium text-center text-base lg:text-lg xl:text-xl leading-none text-gray-400 pt-2 md:pt-10 lg:pt-16">
            {main.description}
          </div>
          <div className="m-auto mt-[15px] md:mt-[60px] bg-amber-300 max-w-[120px] rounded-xl">
            <Button
              className="text-white py-3 px-5 hover:cursor-pointer"
              onClick={() => router.push("/films")}
            >
              {main.button}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
