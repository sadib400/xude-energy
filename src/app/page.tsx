"use client";

import React from "react";
import { Navigation } from "@/components/navigation";
import { CustomCursor } from "@/components/custom-cursor";
import { Hero } from "@/components/hero";
import { TheDifference } from "@/components/the-difference";
import { WhatIsInside } from "@/components/what-is-inside";
import { ShopSection } from "@/components/shop";
import { ReviewsSection } from "@/components/reviews";
import { JoinUsSection } from "@/components/join-us";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { CartProvider } from "@/components/cart-provider";

export default function Home() {
  return (
    <CartProvider>
      <main className="relative bg-background text-foreground min-h-screen overflow-x-hidden antialiased md:snap-y md:snap-proximity">
        <CustomCursor />
        <Navigation />
        <Hero />
        <TheDifference />
        <WhatIsInside />
        <ReviewsSection />
        <ShopSection />
        <JoinUsSection />
        <Footer />
        <ScrollToTop />
      </main>
    </CartProvider>
  );
}
