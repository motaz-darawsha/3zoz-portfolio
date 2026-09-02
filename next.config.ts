import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The sandbox reaches the dev server over loopback and an external preview
  // hostname; without these, Next blocks /_next/hmr and the client bundle
  // never hydrates. Development-only setting.
  allowedDevOrigins: ["127.0.0.1", "localhost", ".preview.usehoplite.com"],
};

export default nextConfig;
