"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Vikram S.",
    role: "Founder, Mumbai",
    text: "I expected another energy drink. What surprised me was how approachable it felt. Great taste, clean energy.",
  },
  {
    id: 2,
    name: "Sneha M.",
    role: "Designer",
    text: "Tried it for the flavour. Stayed for the energy. The Lemon Mint is unreal.",
  },
  {
    id: 3,
    name: "Rahul S.",
    role: "Student",
    text: "Didn't feel like a typical energy drink experience. Smooth, no jitters, no crash.",
  },
  {
    id: 4,
    name: "Aryan K.",
    role: "Runner",
    text: "The Mango Passion flavour completely won me over. Perfect post-run refresh.",
  },
  {
    id: 5,
    name: "Ananya P.",
    role: "Artist",
    text: "Finally something that doesn't feel intimidating. Clean design, clean ingredients.",
  },
  {
    id: 6,
    name: "Karan D.",
    role: "Developer",
    text: "Clean focus, no 3 PM crash. Essential for my workflow and late-night builds.",
  },
];

function ReviewCard({ review, index }: { review: (typeof reviews)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group bg-white border border-black/10 p-5 md:p-6 md:hover:border-foreground/30 md:hover:-translate-y-1 md:hover:shadow-lg transition-all duration-300"
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-foreground text-foreground" />
        ))}
      </div>
      <p className="text-base md:text-lg font-medium leading-relaxed text-foreground mb-6">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center font-bold text-sm">
          {review.name.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-sm">{review.name}</p>
          <p className="text-xs text-muted font-medium uppercase tracking-wide">{review.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function ReviewsSection() {
  return (
    <section id="reviews-section" className="relative w-full bg-background py-24 md:py-32 px-4 sm:px-6 lg:px-10 overflow-hidden md:snap-start">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-bold tracking-widest uppercase text-muted mb-4 block">
              Reviews
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight leading-[1.05]">
              What people say.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg text-muted font-medium md:text-right"
          >
            Real reactions from people who gave Xude a try.
          </motion.p>
        </div>

        {/* Mobile Horizontal Scroll with peek */}
        <div className="md:hidden -mx-4 px-4">
          <div className="flex gap-4 snap-scroll pb-6">
            {reviews.map((review, idx) => (
              <div key={review.id} className="snap-start shrink-0 w-[72vw]">
                <ReviewCard review={review} index={idx} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 gap-4">
          {reviews.map((review, idx) => (
            <ReviewCard key={review.id} review={review} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
