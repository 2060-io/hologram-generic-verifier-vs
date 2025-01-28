import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_PORT: process.env.NEXT_PUBLIC_PORT || '3000',
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${process.env.NEXT_PUBLIC_PORT || '3000'}`,
    NEXT_TELEMETRY_DISABLED: '1',
  }
};

export default withNextIntl(nextConfig);
