import localFont from "next/font/local";

export const zentry = localFont({
  src: "./fonts/zentry-regular.woff2",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  variable: "--font-zentry",
});

export const circularWeb = localFont({
  src: "./fonts/circularweb-book.woff2",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  variable: "--font-circular-web",
});

export const general = localFont({
  src: "./fonts/general.woff2",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  variable: "--font-general",
});

export const robertRegular = localFont({
  src: "./fonts/robert-regular.woff2",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  variable: "--font-robert-regular",
});

export const robertMedium = localFont({
  src: "./fonts/robert-medium.woff2",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  variable: "--font-robert-medium",
});
