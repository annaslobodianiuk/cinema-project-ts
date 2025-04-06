import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface ISkeletonImgProps {
  height: number;
  width: number;
  className: string;
  src: string | StaticImport;
  alt: string;
}

export default function SkeletonImg({
  height,
  width,
  className,
  src,
  alt,
}: ISkeletonImgProps) {
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  return (
    <>
      {imageLoading && (
        <div className="absolute inset-0">
          <Skeleton className="w-full h-full rounded-lg" />
        </div>
      )}
      <Image
        height={height}
        width={width}
        className={className}
        src={src}
        alt={alt}
        onLoadingComplete={() => setImageLoading(false)}
        onError={() => setImageLoading(false)}
      />
    </>
  );
}
