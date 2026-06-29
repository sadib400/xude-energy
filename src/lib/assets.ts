// Centralized media assets configuration.
// Update paths here to swap images/videos across the site without touching component code.

export const ASSETS = {
  logo: "/assets/Xude_Final_Logo.svg",
  footerLogo: "/assets/media__1781978310756.png",

  hero: {
    slides: [
      {
        mobile: "/assets/pimg1.png",
        desktop: "/assets/img1.png",
        alt: "Xude Energy reimagined",
      },
      {
        mobile: "/assets/pimg3.png",
        desktop: "/assets/img3.png",
        alt: "Built for every energy",
      },
      {
        mobile: "/assets/img4.png",
        desktop: "/assets/img4.png",
        alt: "Adventure with Xude",
      },
    ],
  },

  difference: {
    stories: [
      {
        image: "/gallery_1_new.jpg",
        alt: "Corporate energy",
      },
      {
        image: "/gallery_2_new.jpg",
        alt: "Fruit inspiration",
      },
      {
        image: "/gallery_3_new.jpg",
        alt: "Crafted energy",
      },
    ],
  },

  inside: {
    video: "/assets/xude_ingred.mp4",
  },

  shop: {
    products: [
      {
        id: "lemon-mint",
        image: "/assets/Xude_coverscrenn.png",
        alt: "Lemon Mint 12-Pack",
      },
      {
        id: "mango-passion",
        image: "/assets/XudeMango.png",
        alt: "Mango Passion 12-Pack",
      },
    ],
  },

  joinUs: {
    teamVideo: "/assets/team-video.mp4",
    partnerVideo: "/assets/partner-video.mp4",
  },
} as const;

export type Assets = typeof ASSETS;
