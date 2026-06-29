"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, X } from "lucide-react";
import { useCart } from "@/components/cart-provider";

function CanVisual({ gradient }: { gradient: string[] }) {
  return (
    <svg viewBox="0 0 120 260" className="w-full h-full drop-shadow-xl">
      <defs>
        <linearGradient id={`cartCan-${gradient[0].replace("#", "")}`} x1="0" y1="0" x2="120" y2="260">
          <stop offset="0%" stopColor={gradient[0]} />
          <stop offset="60%" stopColor={gradient[1]} />
          <stop offset="100%" stopColor={gradient[0]} />
        </linearGradient>
        <linearGradient id={`cartMetal-${gradient[0].replace("#", "")}`} x1="0" y1="0" x2="120" y2="0">
          <stop offset="0%" stopColor="#9ca3af" />
          <stop offset="50%" stopColor="#e5e7eb" />
          <stop offset="100%" stopColor="#9ca3af" />
        </linearGradient>
      </defs>
      <path
        d="M20 30 C20 15 35 8 60 8 C85 8 100 15 100 30 L100 230 C100 245 85 252 60 252 C35 252 20 245 20 230 Z"
        fill={`url(#cartCan-${gradient[0].replace("#", "")})`}
      />
      <path
        d="M20 30 C20 42 35 50 60 50 C85 50 100 42 100 30 C100 18 85 10 60 10 C35 10 20 18 20 30 Z"
        fill={`url(#cartMetal-${gradient[0].replace("#", "")})`}
      />
      <path
        d="M20 230 C20 242 35 250 60 250 C85 250 100 242 100 230 C100 218 85 210 60 210 C35 210 20 218 20 230 Z"
        fill={`url(#cartMetal-${gradient[0].replace("#", "")})`}
      />
      <rect x="28" y="55" width="64" height="150" rx="2" fill="rgba(0,0,0,0.06)" />
      <text
        x="60"
        y="140"
        textAnchor="middle"
        fill="rgba(0,0,0,0.8)"
        fontSize="14"
        fontWeight="900"
        fontFamily="var(--font-dm-sans), sans-serif"
        letterSpacing="1"
      >
        XUDE
      </text>
    </svg>
  );
}

export function CartDrawer() {
  const { items, total, count, isOpen, setIsOpen, updateQty } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-[420px] bg-background z-[70] shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-black/10">
              <h3 className="text-2xl font-heading font-black tracking-tight">Your Cart ({count})</h3>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-black/5 transition-colors rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <p className="text-muted font-medium">Your cart is empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border border-black/10 bg-white hover:border-foreground/30 transition-colors"
                  >
                    <div
                      className="w-16 h-20 shrink-0"
                      style={{ backgroundColor: item.color }}
                    >
                      <CanVisual gradient={item.gradient} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-sm text-muted">{item.subtitle}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="p-1 hover:bg-black/5 transition-colors rounded-full"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold w-6 text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="p-1 hover:bg-black/5 transition-colors rounded-full"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="font-bold">
                      ${(item.price * item.qty).toFixed(2)}
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-black/10">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-muted font-medium">Total</span>
                  <span className="text-3xl font-heading font-black">${total.toFixed(2)}</span>
                </div>
                <button className="w-full py-4 bg-foreground text-background font-bold tracking-wide hover:bg-foreground/85 hover:scale-[1.01] transition-all">
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
