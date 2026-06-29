"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getLenis } from "@/lib/lenis";

const socialIcons = [
  {
    name: "Instagram",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    name: "YouTube",
    path: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z",
  },
  {
    name: "Twitter",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z",
  },
];

const footerLinks = {
  explore: [
    { name: "Story", href: "#difference-section" },
    { name: "Flavours", href: "#flavours-section" },
    { name: "Ingredients", href: "#inside-section" },
    { name: "Shop", href: "#shop-section" },
  ],
  support: [
    { name: "Contact", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Shipping", href: "#" },
    { name: "Returns", href: "#" },
  ],
};

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  const scrollTo = (href: string) => {
    if (href.startsWith("#")) {
      const id = href.slice(1);
        const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(`#${id}`, { offset: 0, duration: 1.2 });
      } else {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }

    }
  };

  return (
    <footer id="footer-section" className="relative w-full bg-foreground text-background px-4 sm:px-6 lg:px-10 pt-20 md:pt-28 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-12 md:gap-8 pb-16 md:pb-24 border-b border-background/10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-5">
            <div className="relative h-12 md:h-14 w-40 md:w-48 mb-6">
              <Image
                src="/assets/media__1781978310756.png"
                alt="Xude Energy"
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
            <p className="text-lg md:text-xl text-background/60 font-medium max-w-md mb-8">
              A different kind of energy. Fruit-forward flavour, plant-based power, zero sugar.
            </p>
            <div className="flex gap-3">
              {socialIcons.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="w-12 h-12 rounded-full border border-background/20 flex items-center justify-center md:hover:bg-background md:hover:text-foreground md:hover:scale-110 transition-all"
                  aria-label={social.name}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links - 2 columns on mobile, separate on desktop */}
          <div className="col-span-1 md:col-span-2 md:col-start-7">
            <h3 className="text-xs font-bold tracking-widest uppercase text-background/50 mb-6">
              Explore
            </h3>
            <ul className="space-y-4">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-background/80 hover:text-background font-medium transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xs font-bold tracking-widest uppercase text-background/50 mb-6">
              Support
            </h3>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-background/80 hover:text-background font-medium transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-3">
            <h3 className="text-xs font-bold tracking-widest uppercase text-background/50 mb-6">
              Newsletter
            </h3>
            <p className="text-background/60 font-medium mb-4">
              Join the Game Changers. Early access to new flavours and exclusive drops.
            </p>
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-transparent border-b border-background/30 py-3 text-background placeholder:text-background/30 focus:outline-none focus:border-background transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-3 bg-background text-foreground hover:bg-background/90 transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-background/50 font-medium">
            &copy; 2026 Xude Energy. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-background/50 font-medium">
            <a href="#" className="hover:text-background transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-background transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-background transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
