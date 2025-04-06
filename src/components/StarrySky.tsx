"use client";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface IStarrySkyProps {
  countStar: number;
}

interface IStar {
  id: number;
  top: string;
  left: string;
  size: string;
  opacity: number;
  animationDelay: string;
}

export default function StarrySky({ countStar }: IStarrySkyProps) {
  const [stars, setStars] = useState<IStar[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const starArray: IStar[] = [];
      for (let i = 0; i < countStar; i++) {
        starArray.push({
          id: i,
          top: Math.random() * 100 + "%",
          left: Math.random() * 100 + "%",
          size: Math.random() * 20 + 10 + "px",
          opacity: Math.random() * 0.5 + 0.5,
          animationDelay: Math.random() * 5 + "s",
        });
      }
      setStars(starArray);
    };

    generateStars();
  }, [countStar]);

  return (
    <div className="absolute inset-0 z-[0] overflow-hidden">
      {stars.map((star: IStar) => (
        <Sparkles
          key={star.id}
          className="absolute text-yellow-400 animate-twinkle"
          style={{
            width: star.size,
            height: star.size,
            top: star.top,
            left: star.left,
            opacity: star.opacity,
            animationDelay: star.animationDelay,
          }}
        />
      ))}
    </div>
  );
}
