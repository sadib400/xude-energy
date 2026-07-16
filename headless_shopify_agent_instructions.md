# Headless Shopify Architecture & Agent Instructions

> **Note to AI Agents:** This document contains the architectural blueprint, past learnings, and guidelines for building a Headless Shopify storefront using Next.js. If you are reading this to start a new project, follow these instructions strictly to avoid rewriting code and back-and-forth debugging.

## 1. Environment & API Setup
To establish a connection between Next.js and Shopify, the following environment variables are strictly required in `.env.local`:
```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=yourstore.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION=2025-10
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_access_token
```
*   **Storefront API:** Ensure the Headless channel is installed in Shopify and the Storefront API token is generated with full read permissions for products, variants, collections, and policies.

## 2. Standardized Folder & Route Structure
While past projects were simple single-page applications, future projects must be scalable. Implement the following routing structure for e-commerce sites:

*   **`/` (Landing Page):** 
    *   Do NOT load the entire product catalog here.
    *   Fetch and display a maximum of 1 or 2 "Featured Products".
    *   Include a prominent "View More" or "Shop All" button that links to `/products`.
*   **`/products` (Product Listing Page - PLP):** 
    *   Fetch all products using GraphQL.
    *   Sort and group products based on Categories/Collections.
*   **`/products/[handle]` (Product Detail Page - PDP):**
    *   Dynamic route for individual products.
    *   Must display full product details, image galleries, variant selectors (size/flavor), and an "Add to Cart" button.
*   **`/policies/[handle]` (Policy Pages):**
    *   Dynamic route to render Shopify policies (Privacy, Terms, Refund, Shipping).
    *   Fetch using `shop { privacyPolicy { body } }` etc., via Storefront API.

## 3. Cart Management & Global UI
*   **Global Context:** Use a React Context provider (e.g., `<CartProvider>`) wrapping the application to manage the cart state globally.
*   **Cart Drawer:** The shopping cart should be a slide-out drawer (`<CartDrawer />`). 
    *   **CRITICAL:** The `<CartDrawer />` must be mounted inside the root `layout.tsx` (or wrapped correctly inside the provider across all pages) so it can be opened from the Landing Page, the PLP, the PDP, and Policy pages.

## 4. Admin Routing & Redirects
Always set up a permanent redirect in `next.config.ts` so the store owner can easily access the Shopify backend by typing `/admin`:
```typescript
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/admin',
        destination: 'https://yourstore.myshopify.com/admin',
        permanent: true,
      },
    ];
  },
};
```

## 5. SEO & Analytics Integration
*   **Metadata:** Use Next.js `metadata` in `layout.tsx` for global SEO (Title, Description, OpenGraph, Site Verification). Hardcoding global metadata is preferred for performance over querying Shopify's shop object. Use dynamic `generateMetadata` only for the `/products/[handle]` routes.
*   **Traffic & Analytics:** Because this is a Headless store, Shopify's native visitor tracking will NOT work on the frontend. Do not attempt to route frontend traffic data back to Shopify. Instead:
    *   Implement **Vercel Web Analytics** for simple, out-of-the-box traffic tracking.
    *   Implement **Google Analytics 4 (GA4)** via Google Tag Manager for detailed e-commerce tracking (Add to Cart, Page Views). Shopify will automatically take over tracking once the user reaches the checkout URL.

## 6. GraphQL Fetch Utility
Use a standard, reusable fetch utility for all Shopify calls to handle caching and errors gracefully:
```typescript
export async function shopifyFetch<T>({ query, variables }: { query: string; variables?: any }): Promise<{ status: number; body: T }> {
  const endpoint = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/${process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION}/graphql.json`;
  const key = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  const result = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': key!,
    },
    body: JSON.stringify({ query, variables }),
  });

  return {
    status: result.status,
    body: await result.json(),
  };
}
```
