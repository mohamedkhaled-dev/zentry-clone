"use client";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { IoMdMusicalNote } from "react-icons/io";
import { TiLocationArrow } from "react-icons/ti";

import { useScrollPosition } from "@/hooks/useScrollPosition";
import Button from "./Button";
import Image from "next/image";
import Link from "next/link";

type AudioPermissionModalProps = {
  isVisible: boolean;
  onPermissionDecided: (value: boolean) => void;
};
const AudioPermissionModal = ({
  isVisible,
  onPermissionDecided,
}: AudioPermissionModalProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-black rounded-lg p-8 max-w-md mx-4 text-center">
        <div className="mb-6">
          <div className="mx-auto size-16 bg-violet-50 rounded-full flex items-center justify-center mb-4">
            <IoMdMusicalNote className="size-8 text-violet-300" />
          </div>
          <h3 className="font-circular-web text-xl text-white mb-2">
            Enable Audio Experience?
          </h3>
          <p className="font-robert-medium text-gray-600">
            Would you like to play background music to enhance your browsing
            experience?
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => onPermissionDecided(false)}
            className="font-zentry cursor-pointer px-6 py-2 border border-gray-300 rounded-lg text-white hover:bg-violet-50 hover:text-violet-300 transition-colors"
          >
            No
          </button>
          <button
            onClick={() => onPermissionDecided(true)}
            className="font-zentry cursor-pointer px-6 py-2 bg-violet-300 text-white rounded-lg hover:bg-white hover:text-violet-300 transition-colors"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [showAudioPrompt, setShowAudioPrompt] = useState(true);
  const [hasUserDecided, setHasUserDecided] = useState(false);

  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const currentScrollY = useScrollPosition();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      //   Scrolling down
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      //   Scrolling up
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  const toggleAudioIndicator = () => {
    if (!hasUserDecided) return; // Prevent manual toggle before user decides

    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying && hasUserDecided) {
      audioElementRef.current?.play();
    } else {
      audioElementRef.current?.pause();
    }
  }, [isAudioPlaying, hasUserDecided]);

  const handleAudioPermission = (allowed: boolean) => {
    setHasUserDecided(true);
    setShowAudioPrompt(false);

    if (allowed) {
      setIsAudioPlaying(true);
      setIsIndicatorActive(true);
    }
  };

  return (
    <>
      {/* Audio Permission Modal */}
      <AudioPermissionModal
        isVisible={showAudioPrompt}
        onPermissionDecided={handleAudioPermission}
      />

      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4">
            <div className="flex items-center gap-7">
              <Link href="/">
                <Image
                  src="/img/logo.webp"
                  alt="logo"
                  className="w-10"
                  width={40}
                  height={40}
                />
              </Link>
              <Button
                id="product-button"
                title="product"
                rightIcon={<TiLocationArrow />}
                containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
              />
            </div>

            <div className="flex h-full items-center">
              <div className="hidden md:block">
                {navItems.map((item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="nav-hover-btn"
                  >
                    {item}
                  </Link>
                ))}
              </div>

              <button
                className={`ml-10 flex size-6 justify-center items-center space-x-0.5 cursor-pointer ${
                  !hasUserDecided ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={toggleAudioIndicator}
                disabled={!hasUserDecided}
              >
                <audio
                  ref={audioElementRef}
                  src="/audio/loop.mp3"
                  className="hidden"
                  loop
                />
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={`indicator-line ${
                      isIndicatorActive ? "active" : ""
                    }`}
                    style={{ animationDelay: `${bar * 0.1}s` }}
                  />
                ))}
              </button>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
};

export default Navbar;
