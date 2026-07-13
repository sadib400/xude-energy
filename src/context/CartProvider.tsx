"use client";

import React, { createContext, useContext, useMemo } from "react";
import { useShopifyCart } from "../hooks/useCart";


// To keep the existing component interfaces happy, we map ShopifyCartLine to CartItem
export interface CartItem {
  id: string; // This will be the Shopify line item ID for removal/updating
  variantId: string;
  name: string;
  subtitle: string;
  price: number;
  color: string;
  gradient: string[];
  image: string;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  // addItem now takes variantId instead of item details because shopify cart tracks the variants
  addItem: (variantId: string, quantity?: number) => void;
  updateQty: (lineId: string, delta: number) => void;
  removeItem: (lineId: string) => void;
  total: number;
  count: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  checkoutUrl: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper function to extract UI details from handle
const getUIForHandle = (handle: string) => {
  // Same fallback logic as useProducts
  const mapping: Record<string, any> = {
    "lemon-mint": {
      color: "#D4F46C",
      gradient: ["#D4F46C", "#a8d648"],
    },
    "mango-passion": {
      color: "#F97316",
      gradient: ["#F97316", "#EA580C"],
    },
  };
  if (handle.includes("mango")) return mapping["mango-passion"];
  return mapping[handle] || { color: "#DDDDDD", gradient: ["#DDDDDD", "#BBBBBB"] };
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { cart, isLoading, isOpen, setIsOpen, addItem, updateLineQty, removeLine } = useShopifyCart();

  const items: CartItem[] = useMemo(() => {
    if (!cart) return [];
    return cart.lines.edges.map(({ node }) => {
      const handle = node.merchandise.product.handle;
      const uiStyle = getUIForHandle(handle);
      return {
        id: node.id,
        variantId: node.merchandise.id,
        name: node.merchandise.product.title,
        subtitle: node.merchandise.title === "Default Title" ? "" : node.merchandise.title,
        price: parseFloat(node.merchandise.price.amount),
        color: uiStyle.color,
        gradient: uiStyle.gradient,
        image: node.merchandise.product.featuredImage?.url || "",
        qty: node.quantity,
      };
    });
  }, [cart]);

  const total = useMemo(() => {
    if (!cart) return 0;
    return parseFloat(cart.cost.totalAmount.amount);
  }, [cart]);

  const count = useMemo(() => {
    return items.reduce((sum, item) => sum + item.qty, 0);
  }, [items]);

  const updateQty = (lineId: string, delta: number) => {
    const item = items.find((i) => i.id === lineId);
    if (!item) return;
    const newQty = Math.max(0, item.qty + delta);
    updateLineQty(lineId, newQty);
  };

  return (
    <CartContext.Provider
      value={{ 
        items, 
        addItem, 
        updateQty, 
        removeItem: removeLine, 
        total, 
        count, 
        isOpen, 
        setIsOpen,
        checkoutUrl: cart?.checkoutUrl || null 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
