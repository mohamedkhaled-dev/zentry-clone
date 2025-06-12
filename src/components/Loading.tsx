"use client";

import { useEffect, useState } from "react";

interface LoadingProps {
  onComplete: () => void;
}

const Loading = ({ onComplete }: LoadingProps) => {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    
    // Only wait for critical resources
    const checkCriticalResources = async () => {
      try {
        const criticalImages = [
          "/videos/hero-1-poster.webp",
          "/img/logo.webp"
        ];

        const totalAssets = criticalImages.length;

        // Load critical images with progress tracking
        await Promise.all(
          criticalImages.map(src => 
            new Promise((resolve) => {
              const img = new Image();
              img.src = src;
              
              const handleLoad = () => {
                loadedCount++;
                const newProgress = Math.floor((loadedCount / totalAssets) * 100);
                setProgress(newProgress);
                resolve(true);
              };

              img.onload = handleLoad;
              img.onerror = () => {
                loadedCount++;
                const newProgress = Math.floor((loadedCount / totalAssets) * 100);
                setProgress(newProgress);
                resolve(true);
              };
              
              // Timeout after 3 seconds
              setTimeout(() => {
                if (loadedCount < totalAssets) {
                  loadedCount = totalAssets;
                  setProgress(100);
                  resolve(true);
                }
              }, 3000);
            })
          )
        );

        setProgress(100);
        setIsReady(true);
      } catch (error) {
        console.error("Error loading critical resources:", error);
        setProgress(100);
        setIsReady(true);
      }
    };

    checkCriticalResources();

    // Maximum loading time of 2 seconds
    const maxTimeout = setTimeout(() => {
      setProgress(100);
      setIsReady(true);
    }, 2000);

    return () => clearTimeout(maxTimeout);
  }, []);

  useEffect(() => {
    if (isReady && progress === 100) {
      // Small delay for smooth transition
      setTimeout(onComplete, 500);
    }
  }, [isReady, progress, onComplete]);

  return (
    <div className="fixed inset-0 bg-violet-50 z-[9999] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="three-body">
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
        </div>
        
        {/* Progress Bar */}
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
            Loading... {progress}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;