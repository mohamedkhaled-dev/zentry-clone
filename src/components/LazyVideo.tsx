"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
} from "react";

interface LazyVideoProps {
  src: string;
  poster?: string;
  className?: string;
  id?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: "none" | "metadata" | "auto";
  onLoadedData?: () => void;
  priority?: boolean;
}

export const LazyVideo = forwardRef<HTMLVideoElement, LazyVideoProps>(
  (
    {
      src,
      poster,
      className = "",
      id,
      autoPlay = true,
      loop = true,
      muted = true,
      playsInline = true,
      preload = "none",
      onLoadedData,
      priority = false,
    },
    ref
  ) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useImperativeHandle(ref, () => videoRef.current!);

    useEffect(() => {
      if (priority) {
        setIsInView(true);
        setShouldLoad(true);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isInView) {
              setIsInView(true);
              // Stagger loading to prevent bandwidth congestion
              const delay = Math.random() * 200;
              setTimeout(() => setShouldLoad(true), delay);

              // Unobserve after first intersection for performance
              observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: "50px",
          threshold: 0.01,
        }
      );

      if (videoRef.current) {
        observer.observe(videoRef.current);
      }

      return () => {
        if (videoRef.current) {
          observer.unobserve(videoRef.current);
        }
      };
    }, [priority, isInView]); 

    // Separate effect for handling video pause when out of view
    useEffect(() => {
      if (!shouldLoad || priority) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (
              !entry.isIntersecting &&
              videoRef.current &&
              !videoRef.current.paused
            ) {
              videoRef.current.pause();
            } else if (
              entry.isIntersecting &&
              videoRef.current &&
              videoRef.current.paused &&
              autoPlay
            ) {
              videoRef.current.play().catch(() => {});
            }
          });
        },
        {
          rootMargin: "-50px",
          threshold: 0.1,
        }
      );

      if (videoRef.current) {
        observer.observe(videoRef.current);
      }

      return () => {
        if (videoRef.current) {
          observer.unobserve(videoRef.current);
        }
      };
    }, [shouldLoad, autoPlay, priority]);

    const handleError = () => {
      console.warn(`Failed to load video: ${src}`);
      setHasError(true);
      setIsLoading(false);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);

      if (autoPlay && isInView && videoRef.current) {
        // Use requestIdleCallback for better performance
        if ("requestIdleCallback" in window) {
          requestIdleCallback(
            () => {
              videoRef.current?.play().catch(() => {});
            },
            { timeout: 1000 }
          );
        } else {
          videoRef.current.play().catch(() => {});
        }
      }
    };

    const handleLoadedData = () => {
      if (onLoadedData) {
        onLoadedData();
      }
    };

    return (
      <>
        {/* Show poster while loading or on error */}
        {(isLoading || hasError) && poster && (
          <img
            src={poster}
            className={className}
            alt="Video poster"
            style={{
              display:
                !hasError && videoRef.current && !isLoading ? "none" : "block",
            }}
          />
        )}

        <video
          ref={videoRef}
          id={id}
          src={shouldLoad ? src : undefined}
          poster={poster}
          className={className}
          autoPlay={false}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload={shouldLoad ? preload : "none"}
          onLoadStart={handleLoadStart}
          onLoadedData={handleLoadedData}
          onError={handleError}
          onCanPlay={handleCanPlay}
        />
      </>
    );
  }
);

LazyVideo.displayName = "LazyVideo";
