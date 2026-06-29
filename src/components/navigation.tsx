"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart } from "lucide-react";
import { getLenis } from "@/lib/lenis";
import { Logo } from "@/components/logo";
import { useCart } from "@/components/cart-provider";

const navItems = [
  { name: "Story", id: "difference-section" },
  { name: "Ingredients", id: "inside-section" },
  { name: "Reviews", id: "reviews-section" },
  { name: "Shop", id: "shop-section" },
];

function CartButton({ isSticky }: { isSticky: boolean }) {
  const { count, setIsOpen } = useCart();

  return (
    <button
      onClick={() => setIsOpen(true)}
      className={`relative flex items-center justify-center transition-colors ${
        isSticky
          ? "text-foreground hover:bg-black/5"
          : "text-white hover:bg-white/10"
      } w-10 h-10 md:w-11 md:h-11`}
      aria-label="Open cart"
    >
      <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 flex items-center justify-center bg-foreground text-background text-[10px] md:text-xs font-bold rounded-full border-2 border-background">
          {count}
        </span>
      )}
    </button>
  );
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.9;
      setIsSticky(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: 0, duration: 1.2 });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isSticky ? "bg-white/95 backdrop-blur-md border-b border-black/5" : "bg-transparent"
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              onClick={() => scrollTo("hero-section")}
              className="relative h-8 md:h-9 w-28 md:w-32"
            >
              <Logo priority className={`!h-full !w-auto transition-all duration-500 ${isSticky ? "" : "invert"}`} />
            </button>

            {/* Desktop Nav */}
            <div
              className={`hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full transition-all duration-500 ${
                isSticky
                  ? "bg-transparent"
                  : "bg-white/10 backdrop-blur-md border border-white/20"
              }`}
            >
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-4 py-1.5 text-sm font-medium tracking-wide rounded-full transition-colors group ${
                    isSticky
                      ? "text-foreground/70 hover:text-foreground hover:bg-black/5"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <CartButton isSticky={isSticky} />

              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`md:hidden p-2 -mr-2 transition-colors ${
                  isOpen ? "text-foreground" : isSticky ? "text-foreground" : "text-white"
                }`}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background md:hidden"
          >
            <div className="flex flex-col justify-center items-center h-full px-6 pb-20">
              <nav className="flex flex-col items-center gap-4 w-full">
                {[{ name: "Home", id: "hero-section" }, ...navItems].map(
                  (item, i) => (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollTo(item.id)}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="text-center text-4xl font-heading font-black tracking-tight py-2 border-b border-black/10 md:hover:pl-4 transition-all w-full"
                    >
                      {item.name}
                    </motion.button>
                  )
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
