"use client";

import React from "react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/context/CartProvider";
import { CartDrawer } from "@/components/cart-drawer";

export default function NotFound() {
  return (
    <CartProvider>
      <main className="relative w-full bg-background text-foreground min-h-screen antialiased flex flex-col">
        <Navigation alwaysSticky />
        <CartDrawer />
        
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-32 pb-16">
          <h1 className="text-9xl md:text-[12rem] font-black mb-4 tracking-tighter text-gradient-hook">
            404
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight uppercase">
            Lost your energy?
          </h2>
          <p className="text-foreground/60 max-w-md mx-auto mb-10 text-lg md:text-xl">
            The page you're looking for doesn't exist, has been moved, or is temporarily out of stock.
          </p>
          
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-10 py-4 bg-foreground text-background font-bold tracking-widest uppercase hover:bg-foreground/80 transition-colors"
          >
            Get back to the real site
          </Link>
        </div>
        
        <Footer />
      </main>
    </CartProvider>
  );
}
