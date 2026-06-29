"use client";

import React from "react";
import { motion } from "framer-motion";
import { Leaf, Zap, Droplets, Heart } from "lucide-react";

const ingredients = [
  {
    icon: Leaf,
    title: "Plant-Based Energy",
    description: "Caffeine from green tea and yerba mate for smooth, sustained focus.",
  },
  {
    icon: Droplets,
    title: "Zero Sugar",
    description: "No sugar crash. No artificial sweeteners. Just clean, crisp taste.",
  },
  {
    icon: Heart,
    title: "Flavour First",
    description: "Real fruit inspiration in every sip. Lemon Mint, Mango, Passion Fruit.",
  },
  {
    icon: Zap,
    title: "Daily Performance",
    description: "Formulated for focus, flow, and the moments that matter.",
  },
];

export function WhatIsInside() {
  return (
    <section id="inside-section" className="relative w-full bg-foreground text-background py-24 md:py-32 px-4 sm:px-6 lg:px-10 overflow-hidden md:snap-start">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-background/50 mb-4 block">
            What&apos;s Inside
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight leading-[1.05] max-w-4xl">
            Crafted with intention.
            <br />
            <span className="text-background/40">No compromises.</span>
          </h2>
        </motion.div>

        {/* Video + Text list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Video box */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-1"
          >
            <div className="relative aspect-[9/16] md:aspect-video w-full bg-background/10 border border-background/10 overflow-hidden">
              <video
                src="/assets/xude_ingred.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Text list as lines */}
          <div className="order-2 lg:order-2 flex flex-col">
            {ingredients.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group py-5 md:py-6 border-t border-background/10 first:border-t-0 lg:first:border-t hover:bg-background/5 transition-colors duration-300"
                >
                  <div className="flex items-start gap-4">
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-background/70 group-hover:scale-110 transition-transform duration-300 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-lg md:text-xl font-heading font-bold tracking-tight mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base text-background/60 font-medium leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {["Zero Sugar", "Plant Based", "No Artificial Colours", "Low Calories"].map((tag) => (
            <div
              key={tag}
              className="group flex items-center justify-center text-center py-4 md:py-5 px-2 border border-background/10 text-xs md:text-sm font-bold tracking-widest uppercase text-background/70 hover:bg-background/10 hover:text-background hover:-translate-y-0.5 transition-all duration-300 cursor-default leading-tight"
            >
              {tag}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
