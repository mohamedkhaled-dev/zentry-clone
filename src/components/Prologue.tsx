"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

type ChapterProps = {
  number: string;
  title: string;
  description: string;
  image: string;
  isActive: boolean;
  onClick: () => void;
};

const Chapter = ({
  number,
  title,
  description,
  isActive,
  onClick,
}: ChapterProps) => {
  const chapterRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (chapterRef.current) {
      gsap.fromTo(
        chapterRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: chapterRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }
  });

  return (
    <div
      ref={chapterRef}
      onClick={onClick}
      className={`relative p-6 rounded-lg cursor-pointer transition-all border-2 duration-500 ${
        isActive
          ? "bg-gradient-to-r from-blue-500/20 to-violet-500/20  border-blue-400"
          : "bg-white/5 border border-white/10 hover:bg-white/10"
      }`}
    >
      <div className="flex items-start space-x-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
            isActive ? "bg-blue-400 text-black" : "bg-white/10 text-blue-50"
          }`}
        >
          {number}
        </div>
        <div className="flex-1">
          <h3
            className={`special-font text-xl mb-2 ${
              isActive ? "text-blue-300" : "text-white"
            }`}
          >
            {title}
          </h3>
          <p className="font-circular-web text-blue-50 opacity-80 text-sm">
            {description}
          </p>
        </div>
      </div>

      {isActive && (
        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
          <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

const chapters = [
  {
    number: "01",
    title: "The Awakening",
    description:
      "In a world where digital and physical realms converge, a new era of gaming begins. The boundaries between reality and virtuality blur as players discover unprecedented possibilities.",
    image: "/img/prologue-1.webp",
  },
  {
    number: "02",
    title: "The Discovery",
    description:
      "Ancient protocols hidden within the code reveal themselves to those worthy of the knowledge. The first pioneers unlock the secrets of the interconnected metaverse.",
    image: "/img/prologue-2.webp",
  },
  {
    number: "03",
    title: "The Convergence",
    description:
      "Multiple gaming universes begin to merge, creating an unprecedented shared experience. Players from different worlds unite under a common digital sky.",
    image: "/img/prologue-3.webp",
  },
  {
    number: "04",
    title: "The Evolution",
    description:
      "The emergence of Zentry marks the beginning of a new chapter in human digital evolution. The game of games has begun, and reality will never be the same.",
    image: "/img/prologue-4.webp",
  },
];

const Prologue = () => {
  const [activeChapter, setActiveChapter] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const chapterImageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (timelineRef.current) {
      gsap.fromTo(
        timelineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }
  });

  useGSAP(() => {
    if (chapterImageRef.current) {
      gsap.to(chapterImageRef.current, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }
  });

  return (
    <section
      id="prologue"
      className="min-h-screen w-screen bg-black text-blue-50 py-20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-general text-sm uppercase mb-4 text-blue-300">
            The Beginning
          </p>
          <AnimatedTitle
            title="Pr<b>o</b>logue <br /> The Genesis of <br /> N<b>e</b>w Reality"
            containerClass="mt-5 !text-blue-50 text-center"
            sectionId="#prologue"
          />
          <p className="max-w-2xl mx-auto mt-8 font-circular-web text-lg text-blue-50 opacity-70">
            Every legend has a beginning. Discover the origin story of Zentry
            and witness the birth of the ultimate gaming metaverse that will
            reshape digital existence forever.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Story Timeline */}
          <div className="relative">
            <div
              ref={timelineRef}
              className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-violet-400 transform origin-top"
            ></div>

            <div className="space-y-8">
              {chapters.map((chapter, index) => (
                <Chapter
                  key={index}
                  {...chapter}
                  isActive={activeChapter === index}
                  onClick={() => setActiveChapter(index)}
                />
              ))}
            </div>
          </div>

          {/* Chapter Visual */}
          <div ref={chapterImageRef} className="relative">
            <div className="relative h-96 rounded-lg overflow-hidden bg-gradient-to-br from-blue-900/50 to-violet-900/50 backdrop-blur-sm">
              <Image
                src={chapters[activeChapter]?.image}
                alt={chapters[activeChapter]?.title}
                className="w-full h-full object-cover opacity-80"
                width={1280}
                height={720}
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

              {/* Chapter info overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="special-font text-xl text-blue-300 mb-2">
                    Chapter {chapters[activeChapter]?.number}:{" "}
                    {chapters[activeChapter]?.title}
                  </h4>
                  <p className="font-circular-web text-blue-50 opacity-90 text-sm">
                    {chapters[activeChapter]?.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-400 rounded-full animate-pulse"></div>
            <div
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-violet-400 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-blue-500/10 to-violet-500/10 rounded-lg p-8 mb-16 backdrop-blur-sm border border-white/10">
          <div className="text-center">
            <h3 className="special-font text-2xl text-blue-300 mb-4">
              Our Mission
            </h3>
            <p className="font-circular-web text-lg text-blue-50 opacity-90 max-w-3xl mx-auto leading-relaxed">
              To create the ultimate interconnected gaming ecosystem where every
              player&apos;s journey matters, every achievement has value, and every
              story becomes part of a larger narrative that transcends
              individual games and platforms.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center w-fit mx-auto flex flex-col items-center">
          <p className="font-circular-web text-blue-50 opacity-80 mb-6">
            Ready to become part of the legend?
          </p>
          <Button
            id="prologue-button "
            title="Begin Your Journey"
            rightIcon={<TiLocationArrow />}
            containerClass="bg-blue-400 hover:bg-blue-500 text-black flex gap-2 items-center justify-center h-14 transition-all duration-300"
          />
        </div>
      </div>
    </section>
  );
};

export default Prologue;
