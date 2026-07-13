"use client";

import React, { useRef, useState, useEffect, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { ASSETS } from "@/lib/assets";

function useIsClient() {
  return useSyncExternalStore(
    () => () => { },
    () => true,
    () => false
  );
}

const opportunities = [
  {
    id: "team",
    title: "Become a team member",
    video: ASSETS.joinUs.teamVideo,
    buttonLabel: "Sign up",
    buttonLink: "https://forms.gle/RpUxaAf5ZieN1Ahn6",
  },
  {
    id: "partner",
    title: "Become a business partner",
    video: ASSETS.joinUs.partnerVideo,
    buttonLabel: "Join us",
    buttonLink: "https://forms.gle/2osDUD8sVfYYQHh68",
  },
];

function OpportunityCard({ opportunity, index }: { opportunity: (typeof opportunities)[0]; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const isClient = useIsClient();

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(hover: none)").matches || window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile || !videoRef.current) return;
    if (isHovered) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked or no source
      });
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered, isMobile]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="flex flex-col items-center"
    >
      {/* Square video box */}
      <div
        className="relative w-36 h-36 md:w-52 md:h-52 overflow-hidden bg-foreground cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Default black box with text */}
        <div
          className={`absolute inset-0 flex items-center justify-center text-center p-4 transition-opacity duration-300 ${isHovered && !isMobile ? "opacity-0" : "opacity-100"
            }`}
        >
          <span className="text-background font-heading font-black text-sm md:text-base tracking-tight uppercase">
            {opportunity.title}
          </span>
        </div>

        {/* Video on hover */}
        {isClient && !isMobile && (
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black transition-opacity duration-300 pointer-events-none ${isHovered ? "opacity-100" : "opacity-0"
              }`}
          >
            <video
              ref={videoRef}
              src={opportunity.video}
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
          </div>
        )}
      </div>

      {/* Join us button */}
      <a
        href={opportunity.buttonLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center w-36 md:w-52 py-3 bg-foreground text-background font-bold text-sm tracking-wide uppercase border-2 border-transparent border-t-white hover:bg-background hover:text-foreground hover:border-foreground transition-all duration-300"
      >
        {opportunity.buttonLabel}
      </a>
    </motion.div>
  );
}

export function JoinUsSection() {
  return (
    <section id="join-section" className="relative w-full bg-background pt-0 md:pt-4 pb-16 md:pb-24 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight leading-[1.05] text-center mb-10 md:mb-14"
        >
          Join our team.
        </motion.h2>

        <div className="grid grid-cols-2 gap-4 md:gap-12 max-w-4xl mx-auto">
          {opportunities.map((opportunity, idx) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
