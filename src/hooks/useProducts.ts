import { useState, useEffect } from 'react';
import { getProducts } from '../services/product.service';
import { ShopifyProduct } from '../types/shopify';
// Local UI mappings for styling products based on their handle
const PRODUCT_UI_MAPPING: Record<string, { color: string; hoverText: string; gradient: string[]; image?: string }> = {
  "lemon-mint": {
    color: "#D4F46C",
    hoverText: "dark",
    gradient: ["#D4F46C", "#a8d648"],
    image: "/assets/Xude_coverscrenn.png", // Fallback local image if needed
  },
  "mango-passion": {
    color: "#F97316",
    hoverText: "dark",
    gradient: ["#F97316", "#EA580C"],
    image: "/assets/XudeMango.png", // Fallback local image if needed
  },
};

export interface MappedVariant {
  id: string;
  title: string;
  price: number;
  availableForSale: boolean;
}

export interface MappedProduct {
  id: string;
  handle: string;
  name: string;
  description: string;
  price: number;
  color: string;
  hoverText: string;
  gradient: string[];
  image: string;
  variantId: string; // The default ID to pass to Add To Cart
  variants: MappedVariant[]; // All variants
}

export function useProducts() {
  const [products, setProducts] = useState<MappedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMappedProducts() {
      setIsLoading(true);
      const shopifyProducts = await getProducts();
      
      const mapped = shopifyProducts.map(p => {
        const variants = p.variants.edges.map(e => ({
          id: e.node.id,
          title: e.node.title,
          price: parseFloat(e.node.price.amount),
          availableForSale: e.node.availableForSale,
        }));
        
        const defaultVariant = p.variants.edges[0]?.node;
        const price = defaultVariant ? parseFloat(defaultVariant.price.amount) : 0;
        const uiStyle = PRODUCT_UI_MAPPING[p.handle] || (p.handle.includes("mango") ? PRODUCT_UI_MAPPING["mango-passion"] : null) || {
          color: "#DDDDDD",
          hoverText: "dark",
          gradient: ["#DDDDDD", "#BBBBBB"],
          image: p.featuredImage?.url || "",
        };

        return {
          id: p.id,
          handle: p.handle,
          name: p.title,
          description: p.description,
          price,
          color: uiStyle.color,
          hoverText: uiStyle.hoverText,
          gradient: uiStyle.gradient,
          image: p.featuredImage?.url || uiStyle.image || "",
          variantId: defaultVariant?.id || "",
          variants,
        };
      });

      setProducts(mapped);
      setIsLoading(false);
    }

    fetchMappedProducts();
  }, []);

  return { products, isLoading };
}
