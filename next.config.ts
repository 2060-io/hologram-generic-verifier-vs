import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_PORT: process.env.NEXT_PUBLIC_PORT || '3000',
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    CREDENTIAL_DEFINITION_ID: process.env.CREDENTIAL_DEFINITION_ID || 'did:web:chatbot-demo.dev.2060.io?service=anoncreds&relativeRef=/credDef/HngJhYMeTLTZNa5nJxDybmXDsV8J7G1fz2JFSs3jcouT',
    SERVICE_AGENT_ADMIN_BASE_URL: process.env.SERVICE_AGENT_ADMIN_BASE_URL || 'https://a.chatbot-demo.dev.2060.io',
    NEXT_TELEMETRY_DISABLED: '1',
  }
};

export default withNextIntl(nextConfig);
