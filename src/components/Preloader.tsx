"use client";
import { useEffect, useState, useCallback } from "react";

// Define all assets that need to be preloaded
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

type PreloaderProps = {
  progress: number;
  setProgress: (progress: number) => void;
  onLoadingComplete: () => void;
};

const Preloader = ({
  progress,
  setProgress,
  onLoadingComplete,
}: PreloaderProps) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const totalAssets = videoAssets.length + imageAssets.length;

  // Load single image asset
  const loadImage = useCallback(
    (src: string): Promise<void> =>
      new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.crossOrigin = "anonymous";

        const handleLoad = () => {
          resolve();
        };

        const handleError = () => {
          console.warn(`Failed to load image: ${src}`);
          resolve(); // Resolve on error to avoid blocking
        };

        img.onload = handleLoad;
        img.onerror = handleError;

        // Fallback timeout
        setTimeout(() => {
          img.onload = null;
          img.onerror = null;
          resolve();
        }, 10000); // 10 second timeout per image
      }),
    []
  );

  // Load single video asset
  const loadVideo = useCallback(
    (src: string): Promise<void> =>
      new Promise((resolve) => {
        const video = document.createElement("video");
        video.src = src;
        video.muted = true;
        video.preload = "metadata"; // Changed from "auto" to "metadata" for faster loading

        const handleLoad = () => {
          resolve();
        };

        const handleError = () => {
          console.warn(`Failed to load video: ${src}`);
          resolve(); // Resolve on error to avoid blocking
        };

        video.onloadedmetadata = handleLoad;
        video.onerror = handleError;

        // Fallback timeout
        setTimeout(() => {
          video.onloadedmetadata = null;
          video.onerror = null;
          resolve();
        }, 15000); // 15 second timeout per video

        video.load();
      }),
    []
  );

  useEffect(() => {
    let isMounted = true;
    const loadedCountRef = { value: 0 };

    const updateProgress = () => {
      if (!isMounted) return;
      const newProgress = Math.floor(
        (loadedCountRef.value / totalAssets) * 100
      );
      setProgress(newProgress);
    };

    const loadAssets = async () => {
      try {
        // Load all assets with proper error handling
        const allPromises = [
          ...videoAssets.map((src) =>
            loadVideo(src).then(() => {
              loadedCountRef.value += 1;
              updateProgress();
            })
          ),
          ...imageAssets.map((src) =>
            loadImage(src).then(() => {
              loadedCountRef.value += 1;
              updateProgress();
            })
          ),
        ];

        // Wait for all assets to load
        await Promise.all(allPromises);

        // Ensure progress hits 100%
        if (isMounted) {
          setProgress(100);
          setIsComplete(true);

          // Start fade out after a brief delay
          setTimeout(() => {
            if (isMounted) {
              setFadeOut(true);
              // Call onLoadingComplete after fade starts
              setTimeout(() => {
                if (isMounted) {
                  onLoadingComplete();
                }
              }, 500); // Match the fade duration
            }
          }, 300);
        }
      } catch (error) {
        console.error("Error loading assets:", error);
        // Even on error, complete the loading process
        if (isMounted) {
          setProgress(100);
          setIsComplete(true);
          setFadeOut(true);
          setTimeout(() => {
            if (isMounted) {
              onLoadingComplete();
            }
          }, 500);
        }
      }
    };

    loadAssets();

    return () => {
      isMounted = false;
    };
  }, [loadImage, loadVideo, totalAssets, setProgress, onLoadingComplete]);

  // Don't render if loading is complete and fade out is done
  if (isComplete && fadeOut) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 bg-violet-50 z-[9999] flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
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

export default Preloader;
