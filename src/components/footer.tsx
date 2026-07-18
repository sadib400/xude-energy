"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getLenis } from "@/lib/lenis";
import { ASSETS } from "@/lib/assets";

const socialIcons = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/xudeofficial/",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/xude-beverages",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z",
  },
];

const footerLinks = {
  explore: [
    { name: "Home", href: "#hero-section" },
    { name: "About Us", href: "#difference-section" },
    { name: "Ingredients", href: "#inside-section" },
    { name: "Shop", href: "#shop-section" },
  ],
  support: [
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/policies/privacy" },
    { name: "Return And Refund", href: "/policies/refund" },
    { name: "Shipping Terms & Conditions", href: "/policies/shipping" },
  ],
};

export function Footer() {

  const scrollTo = (href: string) => {
    if (href.startsWith("#")) {
      const id = href.slice(1);
      const el = document.getElementById(id);

      if (el) {
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(`#${id}`, { offset: 0, duration: 1.2 });
        } else {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Element not on current page, redirect to home with hash
        // eslint-disable-next-line react-hooks/immutability
        window.location.href = `/${href}`;
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
                src={ASSETS.footerLogo}
                alt="Xude Energy"
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
            <div className="flex gap-3 pl-4 md:pl-8">
              {socialIcons.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
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
          <div className="col-span-1 md:col-span-2 md:col-start-7 ml-4 md:ml-0">
            <h3 className="text-xs font-bold tracking-widest uppercase text-background/50 mb-6">
              Explore
            </h3>
            <ul className="space-y-4">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="text-background/80 hover:text-background font-medium transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
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
                  <Link
                    href={link.href}
                    className="text-background/80 hover:text-background font-medium transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-background/50 font-medium">
            &copy; 2026 Xude Energy. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}
