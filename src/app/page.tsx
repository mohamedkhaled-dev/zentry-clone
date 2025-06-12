"use client";

import About from "@/components/About";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import Nexus from "@/components/Nexus";
import Prologue from "@/components/Prologue";
import Story from "@/components/Story";
import Vault from "@/components/Vault";
import { useState } from "react";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) return <Loading onComplete={handleLoadingComplete} />;

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Nexus />
      <Vault />
      <Prologue />
      <Contact />
      <Footer />
    </main>
  );
};

export default HomePage;
