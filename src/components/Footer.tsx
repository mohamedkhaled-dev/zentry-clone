"use client"
import Link from "next/link"
import { FaDiscord, FaGithub, FaTwitch } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

const links = [
  { href: "https://discord.com", icon: <FaDiscord /> },
  { href: "https://x.com", icon: <FaXTwitter /> },
  { href: "https://github.com", icon: <FaGithub /> },
  { href: "https://twitch.com", icon: <FaTwitch /> },
]

export default function Footer() {
  return (
    <footer className="w-screen bg-violet-300 py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm md:text-left">&copy; {new Date().getFullYear()} Nova. All rights reserved</p>

        <div className="flex justify-center gap-4 md:justify-start">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-colors duration-300 hover:text-white"
            >
              {link.icon}
            </Link>
          ))}
        </div>

        <button className="text-center text-sm hover:underline md:text-right cursor-pointer">
          Privacy Policy
        </button>
      </div>
    </footer>
  )
}
