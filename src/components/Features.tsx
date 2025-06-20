"use client";
import { useRef, useState } from "react";
import type React from "react";
import { TiLocationArrow } from "react-icons/ti";
import { LazyVideo } from "./LazyVideo";

type BentoCardProps = {
  src: string;
  title: React.ReactNode;
  description: string;
  videoId: string;
};

const BentoTilt = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [transform, setTransform] = useState("");
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 10;
    const tiltY = (relativeX - 0.5) * -10;

    setTransform(
      `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98,0.98,0.98)`
    );
  };

  const handleMouseLeave = () => setTransform("");

  return (
    <div
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`cursor-grab transition-transform duration-200 ${className}`}
      style={{ transform }}
    >
      {children}
    </div>
  );
};

const BentoCard = ({ src, title, description, videoId }: BentoCardProps) => {
  // Get posterSrc from video source
  const posterSrc = src.replace(".mp4", "-poster.webp");

  return (
    <div className="relative size-full">
      <LazyVideo
        id={videoId}
        src={src}
        poster={posterSrc}
        className="absolute left-0 top-0 size-full object-cover object-center"
        priority={false}
        preload="metadata"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="font-circular-web mt-3 max-w-64 text-xs md:text-base">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Features() {
  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">
            Into the Metagame Layer
          </p>
          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            Immerse yourself in a rich and ever-expanding universe where a
            vibrant array of products converge into an interconnected overlay
            experience on your world.
          </p>
        </div>

        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="/videos//feature-1.mp4"
            videoId="feature-video-1"
            title={
              <>
                radia<b>n</b>t
              </>
            }
            description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure."
          />
        </BentoTilt>

        <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7">
          <BentoTilt className="bento-tilt_1 row-span-1 md:!col-span-1 md:row-span-2">
            <BentoCard
              src="/videos//feature-2.mp4"
              videoId="feature-video-2"
              title={
                <>
                  zig<b>m</b>a
                </>
              }
              description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:!col-span-1 md:ms-0">
            <BentoCard
              src="/videos//feature-3.mp4"
              videoId="feature-video-3"
              title={
                <>
                  n<b>e</b>xus
                </>
              }
              description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 row-span-1 me-14 md:!col-span-1 md:me-0">
            <BentoCard
              src="/videos//feature-4.mp4"
              videoId="feature-video-4"
              title={
                <>
                  az<b>u</b>l
                </>
              }
              description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_2">
            <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
              <h1 className="bento-title special-font max-w-64 text-black">
                M<b>o</b>re co<b>m</b>ing soo<b>n</b>
              </h1>
              <TiLocationArrow className="m-5 scale-[5] self-end" />
            </div>
          </BentoTilt>

          <BentoTilt className="bento-tilt_2">
            <LazyVideo
              id="feature-video-5"
              src="/videos//feature-5.mp4"
              poster="/videos//feature-5-poster.webp"
              className="size-full object-cover object-center"
              priority={false}
              preload="metadata"
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
}
