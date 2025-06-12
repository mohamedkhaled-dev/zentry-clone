"use client";

import type React from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { FaGamepad, FaNetworkWired, FaRocket, FaUsers } from "react-icons/fa";
import { TiLocationArrow } from "react-icons/ti";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

type ConnectionNodeProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  position: string;
  delay: number;
};

const ConnectionNode = ({
  icon,
  title,
  description,
  position,
  delay,
}: ConnectionNodeProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (nodeRef.current) {
      gsap.fromTo(
        nodeRef.current,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: delay,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: nodeRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }
  }, [delay]);

  return (
    <div
      ref={nodeRef}
      className={`absolute ${position} transform -translate-x-1/2 -translate-y-1/2`}
    >
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-violet-300 flex items-center justify-center text-black text-2xl cursor-pointer transition-all duration-300">
          {icon}
        </div>

        {/* Connection lines */}
        <div className="absolute top-1/2 left-1/2 w-32 h-0.5 bg-gradient-to-r from-violet-300 to-transparent transform -translate-y-1/2 opacity-60"></div>
        <div className="absolute top-1/2 left-1/2 w-0.5 h-32 bg-gradient-to-b from-violet-300 to-transparent transform -translate-x-1/2 opacity-60"></div>

        {/* Info card */}
        <div
          className={`absolute top-24 left-1/2 transform -translate-x-1/2 bg-black/90 opacity-0 translate-y-4 pointer-events-none backdrop-blur-sm rounded-lg p-4 w-48 transition-all duration-300 ${""}`}
        >
          <h4 className="font-circular-web text-white text-sm font-semibold mb-2">
            {title}
          </h4>
          <p className="font-circular-web text-blue-50 text-xs">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const Nexus = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (centerRef.current) {
      gsap.to(centerRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });
    }
  });

  const connections = [
    {
      icon: <FaGamepad />,
      title: "Gaming Hub",
      description: "Connect all your gaming experiences across platforms",
      position: "top-[4em] left-1/4",
      delay: 0.2,
    },
    {
      icon: <FaUsers />,
      title: "Social Layer",
      description: "Build communities and share achievements",
      position: "top-[4rem] left-3/4",
      delay: 0.4,
    },
    {
      icon: <FaNetworkWired />,
      title: "Cross-Chain",
      description: "Seamless integration across blockchain networks",
      position: "bottom-[-1rem] left-1/4 ",
      delay: 0.6,
    },
    {
      icon: <FaRocket />,
      title: "Metaverse",
      description: "Launch into interconnected virtual worlds",
      position: "bottom-[-1rem] left-3/4 ",
      delay: 0.8,
    },
  ];

  return (
    <section
      id="nexus"
      className="min-h-screen w-screen bg-black text-blue-50 py-20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-general text-sm uppercase mb-4 text-white">
            The Connection Point
          </p>
          <AnimatedTitle
            title="N<b>e</b>xus <br /> Where Everything <br /> C<b>o</b>nverges"
            containerClass="mt-5 !text-blue-50 text-center"
            sectionId="#nexus"
          />
          <p className="max-w-2xl mx-auto mt-8 font-circular-web text-lg text-blue-50 opacity-70">
            The central hub that connects all gaming experiences, social
            interactions, and digital assets into one unified ecosystem. Your
            gateway to the interconnected metaverse.
          </p>
        </div>

        <div ref={containerRef} className="relative h-96 mb-16">
          {/* Central nexus point */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div
              ref={centerRef}
              className="w-32 h-32 rounded-full bg-gradient-to-r from-violet-300 to-blue-400 flex items-center justify-center"
            >
              <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center">
                <span className="special-font text-2xl text-violet-300">
                  NEXUS
                </span>
              </div>
            </div>
          </div>

          {/* Connection nodes */}
          {connections.map((connection, index) => (
            <ConnectionNode key={index} {...connection} />
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-violet-300/10 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="special-font text-xl text-violet-300 mb-4">
              Unified Identity
            </h3>
            <p className="font-circular-web text-blue-50 opacity-80">
              One identity across all platforms. Your achievements, progress,
              and reputation follow you everywhere.
            </p>
          </div>
          <div className="bg-violet-300/10 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="special-font text-xl text-violet-300 mb-4">
              Real-time Sync
            </h3>
            <p className="font-circular-web text-blue-50 opacity-80">
              Instant synchronization of data, assets, and progress across all
              connected games and platforms.
            </p>
          </div>
          <div className="bg-violet-300/10 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="special-font text-xl text-violet-300 mb-4">
              Smart Routing
            </h3>
            <p className="font-circular-web text-blue-50 opacity-80">
              Intelligent pathways that optimize your journey through the
              interconnected gaming ecosystem.
            </p>
          </div>
        </div>

        <div className="text-center w-fit mx-auto">
          <Button
            id="nexus-button"
            title="Enter the Nexus"
            rightIcon={<TiLocationArrow />}
            containerClass="flex items-center justify-center h-14 gap-2 bg-violet-300 hover:bg-violet-400 transition-all"
          />
        </div>
      </div>
    </section>
  );
};

export default Nexus;
