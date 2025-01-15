import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

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

export default withNextIntl(config);
