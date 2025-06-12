"use client";

import { useEffect, useState } from "react";

const videoAssets = [
  "/videos/hero-1.mp4",
  "/videos/hero-2.mp4",
  "/videos/hero-3.mp4",
  "/videos/hero-4.mp4",
  "/videos/feature-1.mp4",
  "/videos/feature-2.mp4",
  "/videos/feature-3.mp4",
  "/videos/feature-4.mp4",
  "/videos/feature-5.mp4",
];

const imageAssets = [
  "/img/logo.webp",
  "/img/about.webp",
  "/img/entrance.webp",
  "/img/contact-1.webp",
  "/img/contact-2.webp",
  "/img/swordman.webp",
  "/img/swordman-partial.webp",
  "/img/prologue-1.webp",
  "/img/prologue-2.webp",
  "/img/prologue-3.webp",
  "/img/prologue-4.webp",
];

interface LoadingProps {
  onComplete: () => void;
}

const Loading = ({ onComplete }: LoadingProps) => {
  const [progress, setProgress] = useState(0);
  const totalAssets = videoAssets.length + imageAssets.length;

  const loadImage = (src: string): Promise<void> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.crossOrigin = "anonymous";

      const handleLoad = () => {
        resolve();
      };

      const handleError = () => {
        console.warn(`Failed to load image: ${src}`);
        resolve();
      };

      img.onload = handleLoad;
      img.onerror = handleError;

      setTimeout(() => {
        img.onload = null;
        img.onerror = null;
        resolve();
      }, 10000);
    });
  };

  const loadVideo = (src: string): Promise<void> => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.src = src;
      video.muted = true;
      video.preload = "metadata";

      const handleLoad = () => {
        resolve();
      };

      const handleError = () => {
        console.warn(`Failed to load video: ${src}`);
        resolve();
      };

      video.onloadedmetadata = handleLoad;
      video.onerror = handleError;

      setTimeout(() => {
        video.onloadedmetadata = null;
        video.onerror = null;
        resolve();
      }, 15000);

      video.load();
    });
  };

  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;

    const updateProgress = () => {
      if (!isMounted) return;
      const newProgress = Math.floor((loadedCount / totalAssets) * 100);
      setProgress(newProgress);
    };

    const loadAssets = async () => {
      try {
        const allPromises = [
          ...videoAssets.map((src) =>
            loadVideo(src).then(() => {
              if (isMounted) {
                loadedCount += 1;
                updateProgress();
              }
            })
          ),
          ...imageAssets.map((src) =>
            loadImage(src).then(() => {
              if (isMounted) {
                loadedCount += 1;
                updateProgress();
              }
            })
          ),
        ];

        await Promise.all(allPromises);

        if (isMounted) {
          setProgress(100);
          // Small delay to show 100% completion
          setTimeout(() => {
            if (isMounted) {
              onComplete();
            }
          }, 800);
        }
      } catch (error) {
        console.error("Error Loading assets:", error);
        if (isMounted) {
          setProgress(100);
          setTimeout(() => {
            if (isMounted) {
              onComplete();
            }
          }, 800);
        }
      }
    };

    loadAssets();

    return () => {
      isMounted = false;
    };
  }, [totalAssets, onComplete]);

  return (
    <div className="fixed inset-0 bg-violet-50 z-[9999] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="three-body">
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
        </div>
        <div className="flex flex-col items-center">
          <div
            className="h-1 w-64 bg-violet-100 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Loading progress: ${progress}%`}
          >
            <div
              className="h-full bg-violet-300 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 font-circular-web text-sm text-violet-300">
            Loading assets... {progress}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
