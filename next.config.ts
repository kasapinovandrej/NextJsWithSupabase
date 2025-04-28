import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["nqzdkcbreriyqjlzvjpa.supabase.co", "lh3.googleusercontent.com"],
  },
  /* Za static site generation dodam ovo dole i treba da vratim slikama <img/> tag */
  // output: "export",
};

export default nextConfig;
