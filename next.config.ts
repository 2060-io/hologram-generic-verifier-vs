import { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.chatbot-demo.dev.2060.io",
        port: "",
        pathname: "/v1/qr/**",
      },
    ],
  },
};

export default config;
