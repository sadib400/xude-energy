# Headless Shopify Architecture & Agent Instructions

> **Note to AI Agents:** This document contains the architectural blueprint, past learnings, and guidelines for building a Headless Shopify storefront using Next.js. If you are reading this to start a new project, follow these instructions strictly to avoid rewriting code and back-and-forth debugging.

## 0. Agent Onboarding Workflow (Proactive Guidance)
As an AI Agent, you must proactively guide the user through the setup process rather than waiting for them to ask what to do next. Follow this chronological sequence when starting a new headless project:
1.  **Guide Shopify Headless Setup:** First, instruct the user to log into their Shopify Admin, install the "Headless" sales channel, and generate a Storefront API token with full read permissions (products, variants, collections, policies).
2.  **Ask for Credentials:** Once they have installed it, ask the user to provide their Shopify Store Domain and the newly generated Storefront Access Token. 
3.  **Confirm Legal Policies:** Proactively ask the user if they have filled out their legal policies (Privacy, Terms, Refund, Shipping) in their Shopify Admin (Settings > Policies). Explain that the frontend cannot fetch policies if they are empty in Shopify.
4.  **Guide Environment Setup:** Tell the user exactly how to create the `.env.local` file (or ask for permission to create it yourself) and populate it with the provided keys.
5.  **Propose Next Steps:** Once the environment is set up, proactively propose building the GraphQL fetch utility and the basic layout.

## 1. Environment & API Setup
To establish a connection between Next.js and Shopify, the following environment variables are strictly required in `.env.local`:
```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=yourstore.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION=2025-10
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_access_token
```

## 2. Standardized Folder & Route Structure
While past projects were simple single-page applications, future projects may be scalable. In that case, Implement the following routing structure for e-commerce sites:

*   **`/` (Landing Page):** 
    *   Do NOT load the entire product catalog here.
    *   Fetch and display a maximum of 1 or 2 "Featured Products" based on users design requirement.
    *   If design allows Include a prominent "View More" or "Shop All" button that links to `/products`. ask user if it needs to be done or not.
*   **`/products` (Product Listing Page - PLP):** 
    *   Fetch all products using GraphQL.
    *   Sort and group products based on Categories/Collections.
*   **`/products/[handle]` (Product Detail Page - PDP):**
    *   Dynamic route for individual products.
    *   Must display full product details, image galleries, variant selectors (size/flavor), and an "Add to Cart" button.
*   **`/policies/[handle]` (Policy Pages):**
    *   Use a dynamic route (`/policies/[handle]/page.tsx`) to render Shopify policies.
    *   **Implementation Steps:**
        1.  Map the URL handle (e.g., `terms-of-service`) to the correct Shopify GraphQL object (e.g., `termsOfService`).
        2.  Fetch the policy body using the Storefront API (`query { shop { termsOfService { body, title } } }`).
        3.  Render the HTML content securely using React's `dangerouslySetInnerHTML={{ __html: policy.body }}` inside a container styled for prose/typography.
        4.  (Optional but recommended) Use `generateStaticParams` to pre-render the standard handles: `privacy-policy`, `terms-of-service`, `refund-policy`, and `shipping-policy`.

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

## 7. Common Gotchas & UI Bug Fixes
Based on past projects, be aware of the following UI bugs that frequently occur in Headless Shopify builds:
*   **Transparent Header on White Pages:** If the global `<Navigation />` header is transparent (designed to sit over a dark hero image on the landing page), its text/icons will become invisible on plain white pages like `/policies/[handle]`. **Fix:** Pass a prop (e.g., `theme="dark"`) to the `<Navigation />` component or dynamically check the `pathname` to apply a solid background and dark text on non-homepage routes.
*   **Cart Drawer Z-Index & Pointer Events:** If the `<CartDrawer />` fails to open or click on certain pages (like the policy page), it is usually caused by overlaying elements (like custom cursor wrappers or absolutely positioned containers) blocking `pointer-events`. **Fix:** Ensure the Cart Drawer has the highest `z-index` (e.g., `z-50`), completely remove any unnecessary `pointer-events-none` wrappers, and verify it is mounted at the very top level of the DOM in `layout.tsx`.
