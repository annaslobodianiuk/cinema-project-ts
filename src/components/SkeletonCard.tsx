import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="p-5 z-10 border-2 bg-gray-500 rounded-xl cursor-pointer">
      <Skeleton className="w-full aspect-[254/350] rounded-lg" />
      <div className="gap-3 mt-3 max-w-[350px] max-h-[200px]">
        <div className="min-h-14 ">
          <Skeleton className="h-6 w-full rounded-lg" />
        </div>
        <div className="max-w-full max-h-full">
          <Skeleton className="w-full h-20 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
