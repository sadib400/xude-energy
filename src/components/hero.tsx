"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { getLenis } from "@/lib/lenis";
import { ASSETS } from "@/lib/assets";

const heroSlides = ASSETS.hero.slides;

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  useEffect(() => {
    if (heroSlides.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const scrollTo = (id: string) => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: 0, duration: 1.2 });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-[100svh] w-full overflow-hidden bg-black"
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      onTouchCancel={() => setIsPaused(false)}
    >
      {/* Background Images with Parallax + Slide Transition */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <AnimatePresence initial={false} mode="sync">
          {heroSlides.map((slide, idx) =>
            idx === currentSlide ? (
              <motion.div
                key={slide.desktop}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <picture className="absolute inset-0">
                  <source media="(min-width: 768px)" srcSet={slide.desktop} />
                  <Image
                    src={slide.mobile}
                    alt={slide.alt}
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                  />
                </picture>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </motion.div>


      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col justify-end min-h-[100svh] px-4 sm:px-6 lg:px-10 pb-10 md:pb-16 pt-24"
      >
        <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center gap-8">


          {/* Buttons + Slide Indicators */}
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-1/2 mx-auto min-w-[180px] relative md:left-[17px]"
            >
              <button
                onClick={() => scrollTo("shop-section")}
                className="w-full group flex items-center justify-center px-6 py-2.5 md:py-3 bg-white text-black font-bold text-base md:text-lg tracking-wide hover:bg-white/90 md:hover:scale-[1.02] transition-all"
              >
                Buy Now
              </button>
            </motion.div>

            {heroSlides.length > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex gap-2"
              >
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1 transition-all duration-500 ${currentSlide === idx ? "w-10 bg-white" : "w-4 bg-white/30 hover:bg-white/50"
                      }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
