"use client";
import SkeletonImg from "@/components/SkeletonImg";

interface ICardProps {
  image: string;
  title: string;
  description: string;
}

const imgLink = "https://image.tmdb.org/t/p/original";

export default function Card({ image, title, description }: ICardProps) {
  return (
    <div className="p-5 z-10 border-2 bg-gray-500 rounded-xl hover:bg-gray-100 cursor-pointer w-full h-full">
      <div className="relative w-full aspect-[254/350] overflow-hidden rounded-lg">
        <SkeletonImg
          height={350}
          width={250}
          className={"object-cover h-full w-full"}
          src={imgLink + image}
          alt={"film"}
        />
      </div>
      <div className="gap-3 mt-3 max-w-[350px] h-[200px]">
        <div className="min-h-14 font-semibold italic text-xl overflow-hidden line-clamp-2">
          {title}
        </div>
        <div className="max-w-full max-h-full overflow-hidden text-ellipsis break-words line-clamp-5">
          <span className="text-lg font-semibold">Description : </span>
          {description}
        </div>
      </div>
    </div>
  );
}
