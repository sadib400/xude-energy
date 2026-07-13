// Centralized media assets configuration.
// Update paths here to swap images/videos across the site without touching component code.

export const ASSETS = {
  logo: "/assets/Xude_Final_Logo.svg",
  footerLogo: "/assets/media__1781978310756.png",

  hero: {
    slides: [
      {
        mobile: "/assets/pi1.png",
        desktop: "/assets/img1.png",
        alt: "Mother and child analogy",
      },
      {
        mobile: "/assets/pi2.png",
        desktop: "/assets/img2.png",
        alt: "Heavy weight analogy",
      },

    ],
  },

  difference: {
    stories: [
      {
        mobile: "/assets/pst1.png",
        desktop: "/assets/st1.png",
        alt: "Fruit First",
      },
      {
        mobile: "/assets/ps2.png",
        desktop: "/assets/s2.png",
        alt: "Complement to energy",
      },
      {
        mobile: "/assets/ps3.png",
        desktop: "/assets/s3.png",
        alt: "Purposeful Ingredients",
      },
    ],
  },

  inside: {
    videoMobile: "/assets/IngredLand.mp4", // Ensure this is the correct mobile video name
    videoDesktop: "/assets/Xudehor.mp4", // Ensure this is the correct desktop video name
  },


  joinUs: {
    teamVideo: "/assets/Distribute.mp4",
    partnerVideo: "/assets/Cash.mp4",
  },
} as const;

export type Assets = typeof ASSETS;
