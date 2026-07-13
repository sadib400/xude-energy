"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, X } from "lucide-react";
import { useCart } from "@/context/CartProvider";

function CartItemImage({ image, color, name }: { image: string; color: string; name: string }) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div
        className="w-full h-full"
        style={{ backgroundColor: color }}
      />
    );
  }

  return (
    <Image
      src={image}
      alt={name}
      fill
      className="object-contain"
      sizes="80px"
      onError={() => setImgError(true)}
    />
  );
}

export function CartDrawer() {
  const { items, total, count, isOpen, setIsOpen, updateQty, removeItem, checkoutUrl } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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

            <div 
              className="flex-1 overflow-y-auto p-6 space-y-4 cart-scroll overscroll-contain" 
              data-lenis-prevent="true"
            >
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <p className="text-muted font-medium">Your cart is empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="relative p-4 border border-black/10 bg-white hover:border-foreground/30 transition-colors overflow-hidden"
                  >
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-2 right-2 p-1.5 text-muted hover:text-foreground hover:bg-black/5 transition-colors rounded-full z-10"
                      aria-label={`Remove ${item.name}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="flex gap-4">
                      <div
                        className="relative w-20 aspect-square shrink-0"
                        style={{ backgroundColor: item.color }}
                      >
                        <CartItemImage image={item.image} color={item.color} name={item.name} />
                      </div>
                      <div className="flex-1 min-w-0 pr-8">
                        <h4 className="font-bold truncate">{item.name}</h4>
                        <p className="text-sm text-muted truncate">{item.subtitle}</p>
                        <div className="flex items-center justify-between gap-3 mt-3">
                          <div className="flex items-center gap-3">
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
                          <div className="font-bold whitespace-nowrap">
                            ₹{(item.price * item.qty).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-black/10">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-muted font-medium">Total</span>
                  <span className="text-3xl font-heading font-black">₹{total.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => {
                    if (checkoutUrl) window.location.href = checkoutUrl;
                  }}
                  className="w-full py-4 bg-foreground text-background font-bold tracking-wide hover:bg-foreground/85 md:hover:scale-[1.01] transition-all"
                >
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
