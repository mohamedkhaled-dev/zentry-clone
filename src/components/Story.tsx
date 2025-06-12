"use client";
import { useRef } from "react";
import type React from "react";

import AnimatedTitle from "./AnimatedTitle";
import gsap from "gsap";
import Button from "./Button";
import Image from "next/image";

const Story = () => {
  const frameRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX } = e;
    const element = frameRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = clientX - rect.left;
    const centerX = rect.width / 2;
    const rotateY = ((x - centerX) / centerX) * 12;

    gsap.to(element, {
      duration: 0.3,
      rotateX: rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(frameRef.current, {
      duration: 0.3,
      rotateX: 0,
      rotateY: 0,
      ease: "power1.inOut",
    });
  };

  return (
    <section id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[10px]">
          the multiversal ip world
        </p>

        <div className="relative size-full">
          <AnimatedTitle
            title="The st<b>o</b>ry of <br /> a hidden real<b>m</b>"
            sectionId="#story"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <Image
                  ref={frameRef}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                  width={1920}
                  height={1080}
                  src="/img/entrance.webp"
                  alt="entrance"
                  className="object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start">
              Where realms converge, lies Zentry and the boundless pillar.
              Discover its secrets and shape your fate amidst infinite
              opportunities.
            </p>

            <Button
              id="realm-button"
              title="discover prologue"
              containerClass="mt-5"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
