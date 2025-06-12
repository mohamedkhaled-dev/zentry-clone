"use client";

import type React from "react";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import {
  FaLock,
  FaKey,
  FaDatabase,
  FaFingerprint,
  FaEye,
} from "react-icons/fa";
import { FaShield } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

type SecurityFeatureProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  level: "basic" | "advanced" | "premium";
};

const SecurityFeature = ({
  icon,
  title,
  description,
  level,
}: SecurityFeatureProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const featureRef = useRef<HTMLDivElement>(null);

  const levelColors = {
    basic: "from-blue-400 to-blue-600",
    advanced: "from-violet-400 to-violet-600",
    premium: "from-yellow-400 to-yellow-600",
  };

  useGSAP(() => {
    if (featureRef.current) {
      gsap.fromTo(
        featureRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featureRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }
  });

  return (
    <div
      ref={featureRef}
      className={`relative p-6 rounded-lg bg-gradient-to-br ${
        levelColors[level]
      } bg-opacity-10 backdrop-blur-sm border border-white/10 transition-all duration-300 ${
        isHovered ? "scale-105 shadow-lg" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center mb-4">
        <div
          className={`w-12 h-12 rounded-full bg-gradient-to-r ${levelColors[level]} flex items-center justify-center text-white text-xl mr-4`}
        >
          {icon}
        </div>
        <div>
          <h3 className="font-robert-medium text-lg text-white">{title}</h3>
          <span className="text-xs uppercase text-circular-web text-violet-100 font-circular-web">
            {level}
          </span>
        </div>
      </div>
      <p className="font-circular-web text-violet-100 opacity-80 text-sm">
        {description}
      </p>

      {/* Security level indicator */}
      <div className="absolute top-2 right-2">
        <div
          className={`w-3 h-3 rounded-full bg-gradient-to-r ${levelColors[level]} animate-pulse`}
        ></div>
      </div>
    </div>
  );
};

const securityFeatures = [
  {
    icon: <FaLock />,
    title: "Multi-Layer Encryption",
    description:
      "Advanced AES-256 encryption with quantum-resistant algorithms protecting your digital assets.",
    level: "premium" as const,
  },
  {
    icon: <FaShield />,
    title: "Biometric Access",
    description:
      "Fingerprint and facial recognition for secure, personalized access to your vault.",
    level: "advanced" as const,
  },
  {
    icon: <FaKey />,
    title: "Smart Key Management",
    description:
      "Automated key rotation and secure backup systems ensure you never lose access.",
    level: "advanced" as const,
  },
  {
    icon: <FaDatabase />,
    title: "Distributed Storage",
    description:
      "Your data is distributed across multiple secure nodes for maximum redundancy.",
    level: "basic" as const,
  },
  {
    icon: <FaFingerprint />,
    title: "Zero-Knowledge Proof",
    description:
      "Verify your identity without revealing sensitive information to anyone.",
    level: "premium" as const,
  },
  {
    icon: <FaEye />,
    title: "Activity Monitoring",
    description:
      "Real-time monitoring and alerts for any suspicious activity on your account.",
    level: "basic" as const,
  },
];

const Vault = () => {
  const vaultRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (vaultRef.current) {
      gsap.to(vaultRef.current, {
        rotationY: 360,
        duration: 30,
        repeat: -1,
        ease: "none",
      });
    }
  });

  return (
    <section
      id="vault"
      className="min-h-screen w-screen bg-black text-blue-50 py-20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-general text-sm uppercase mb-4 text-white">
            Ultimate Security
          </p>
          <AnimatedTitle
            title="V<b>a</b>ult <br /> Your Digital <br /> F<b>o</b>rtress"
            containerClass="mt-5 !text-blue-50 text-center"
            sectionId="#vault"
          />
          <p className="max-w-2xl mx-auto mt-8 font-circular-web text-lg text-blue-50 opacity-70">
            Military-grade security meets user-friendly design. Store, manage,
            and access your digital assets with unprecedented security and
            complete peace of mind.
          </p>
        </div>

        {/* Security Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {securityFeatures.map((feature, index) => (
            <SecurityFeature key={index} {...feature} />
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-300 mb-2">
              99.99%
            </div>
            <div className="font-circular-web text-blue-50 opacity-80">
              Uptime
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-300 mb-2">
              256-bit
            </div>
            <div className="font-circular-web text-blue-50 opacity-80">
              Encryption
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-300 mb-2">24/7</div>
            <div className="font-circular-web text-blue-50 opacity-80">
              Monitoring
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-300 mb-2">0</div>
            <div className="font-circular-web text-blue-50 opacity-80">
              Breaches
            </div>
          </div>
        </div>

        <div className="text-center w-fit mx-auto">
          <Button
            id="vault-button"
            title="Secure Your Assets"
            rightIcon={<TiLocationArrow />}
            containerClass="bg-yellow-300 hover:bg-yellow-400 text-black flex h-14 gap-2 items-center justify-center transition-all duration-300"
          />
        </div>
      </div>
    </section>
  );
};

export default Vault;
