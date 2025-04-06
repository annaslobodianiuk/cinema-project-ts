"use client";
import dynamic from "next/dynamic";

interface IVideoPlayerProps {
  videoUrl: string;
}

const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
}) as React.ComponentType<{
  url: string;
  width: string;
  height: string;
  controls: boolean;
  playing: boolean;
}>;

export default function VideoPlayer({
  videoUrl = "https://youtu.be/qfa6r0By_Wo?si=Sjd_wsxaKiRiT5m1",
}: IVideoPlayerProps) {

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
      <ReactPlayer
        url={videoUrl}
        width="100%"
        height="100%"
        controls
        playing={false}
      />
    </div>
  );
}
