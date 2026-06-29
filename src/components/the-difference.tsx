"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const stories = [
  {
    id: "ambition",
    eyebrow: "01 / Ambition",
    title: "Energy for everyday ambition.",
    description:
      "Whether you’re building, creating, or pushing through the afternoon slump, Xude delivers clean focus without the synthetic rush.",
    image: "/gallery_1_new.jpg",
    alt: "Corporate energy",
  },
  {
    id: "fruit",
    eyebrow: "02 / Fruit First",
    title: "Inspired by fruit, not chemicals.",
    description:
      "Familiar flavours crafted for modern performance. We started with real fruit inspiration and built an energy drink around it.",
    image: "/gallery_2_new.jpg",
    alt: "Fruit inspiration",
  },
  {
    id: "craft",
    eyebrow: "03 / Craft",
    title: "Crafted differently.",
    description:
      "A thoughtful approach to clean energy. Plant-based caffeine, zero sugar, and ingredients chosen with intention.",
    image: "/gallery_3_new.jpg",
    alt: "Crafted energy",
  },
];

function StoryBlock({
  story,
  index,
}: {
  story: (typeof stories)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const isReversed = index % 2 === 1;

  return (
      <div
      ref={ref}
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center py-6 md:py-10 ${
        isReversed ? "md:[direction:rtl]" : ""
      }`}
    >
      {/* Image with clean frame */}
      <motion.div
        style={{ y }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.5 }}
        className={`group p-2 md:p-3 rounded-2xl bg-white border border-black/10 shadow-xl cursor-pointer ${
          isReversed ? "md:[direction:ltr]" : ""
        }`}
      >
        <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-xl bg-[#f5f5f5] border border-black/5">
          <motion.div
            initial={{ scale: 1.15, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={story.image}
              alt={story.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Text */}
      <div className={`${isReversed ? "md:[direction:ltr]" : ""}`}>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs font-bold tracking-widest uppercase text-muted mb-4 block"
        >
          {story.eyebrow}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.05] mb-6"
        >
          {story.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-muted font-medium leading-relaxed max-w-lg"
        >
          {story.description}
        </motion.p>
      </div>
    </div>
  );
}

export function TheDifference() {
  return (
    <section id="difference-section" className="relative w-full bg-background px-4 sm:px-6 lg:px-10 md:snap-start">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="pt-16 md:pt-20 pb-8 md:pb-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end"
          >
            <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tight">
              Why we&apos;re different.
            </h2>
            <p className="text-lg text-muted font-medium md:text-right">
              Three principles that guide every can we make.
            </p>
          </motion.div>
        </div>

        {/* Stories */}
        <div className="space-y-8 md:space-y-0">
          {stories.map((story, index) => (
            <StoryBlock key={story.id} story={story} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
