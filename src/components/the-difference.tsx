"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ASSETS } from "@/lib/assets";
import { motion, useScroll, useTransform } from "framer-motion";

const stories = [
  {
    id: "ambition",
    title: "We don't make energy drinks just for energy drink fans.",
    description: (
      <>
        We make them for those who never felt the energy drinks was meant for them.
        <br />
        <br />
        By rethinking everything from ingredients and flavour to the experience itself, we&apos;re building a new generation of caffeinated beverages that&apos;s smoother, fruitier and made for everyday life.
      </>
    ),
    image: (ASSETS.difference.stories[0] as any).image,
    mobile: (ASSETS.difference.stories[0] as any).mobile,
    desktop: (ASSETS.difference.stories[0] as any).desktop,
    alt: ASSETS.difference.stories[0].alt,
  },
  {
    id: "fruit",
    title: "Why the hell do we even exist?",
    description: (
      <>
        Sleep. Nutrition. Movement. Hydration. They all come first.
        <br />
        <br />
        We don&apos;t exist to replace them. We exist to complement them.
        Because even when you&apos;re doing the right things, sometimes you need a extra energy.
      </>
    ),
    image: (ASSETS.difference.stories[1] as any).image,
    mobile: (ASSETS.difference.stories[1] as any).mobile,
    desktop: (ASSETS.difference.stories[1] as any).desktop,
    alt: ASSETS.difference.stories[1].alt,
  },
  {
    id: "craft",
    title: "Forget \"better for you.\" That's different for everyone.",
    description: (
      <>
        We believe in something simpler: every ingredient should have a reason to exist. We choose ingredients that support the purpose of the product, leave out what doesn&apos;t, and favour plant-based alternatives wherever they genuinely make sense.
      </>
    ),
    image: (ASSETS.difference.stories[2] as any).image,
    mobile: (ASSETS.difference.stories[2] as any).mobile,
    desktop: (ASSETS.difference.stories[2] as any).desktop,
    alt: ASSETS.difference.stories[2].alt,
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
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const isReversed = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-12 items-center py-4 md:py-6 ${isReversed ? "md:[direction:rtl]" : ""
        }`}
    >
      {/* Image with clean frame */}
      <motion.div
        style={{ y }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.5 }}
        className={`max-w-[340px] md:max-w-[380px] group p-2 md:p-3 rounded-2xl bg-[#FAFAFA] border border-black/10 shadow-xl cursor-pointer ${isReversed
          ? "w-[85%] ml-auto mr-0 md:mx-auto md:w-[90%] md:[direction:ltr]"
          : "w-[85%] mr-auto ml-0 md:mx-auto md:w-[90%]"
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
            {story.mobile && story.desktop ? (
              <picture className="absolute inset-0">
                <source media="(min-width: 768px)" srcSet={story.desktop} />
                <Image src={story.mobile} alt={story.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </picture>
            ) : (
              <Image src={story.image} alt={story.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Text */}
      <div className={`relative z-10 -mt-16 sm:-mt-20 p-6 sm:p-8 rounded-[24px] bg-background shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-black/5 md:mt-0 md:bg-transparent md:border-none md:shadow-none md:p-0 md:rounded-none ${isReversed
        ? "w-[90%] mr-auto ml-0 md:w-auto md:mx-0 md:[direction:ltr]"
        : "w-[90%] ml-auto mr-0 md:w-auto md:mx-0"
        }`}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-heading font-black tracking-tight leading-[1.05] mb-6"
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
    <section id="difference-section" className="relative w-full bg-background px-4 sm:px-6 lg:px-10 py-16 md:py-24 md:snap-start">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="pb-8 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end"
          >
            <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tight uppercase">
              ABOUT US
            </h2>
          </motion.div>
        </div>

        {/* Stories */}
        <div className="space-y-12 md:space-y-12">
          {stories.map((story, index) => (
            <StoryBlock key={story.id} story={story} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
