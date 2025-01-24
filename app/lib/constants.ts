export const PORT = process.env.NEXT_PUBLIC_PORT
  ? Number(process.env.NEXT_PUBLIC_PORT)
  : 3000;

const PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}:${PORT}`
  : `http://localhost:${PORT}`;

const CREDENTIAL_DEFINITION_ID =
  process.env.CREDENTIAL_DEFINITION_ID ||
  "did:web:chatbot-demo.dev.2060.io?service=anoncreds&relativeRef=/credDef/HngJhYMeTLTZNa5nJxDybmXDsV8J7G1fz2JFSs3jcouT";

const SERVICE_AGENT_ADMIN_BASE_URL =
  process.env.SERVICE_AGENT_ADMIN_BASE_URL ||
  "https://a.chatbot-demo.dev.2060.io";

export {
  PUBLIC_BASE_URL,
  CREDENTIAL_DEFINITION_ID,
  SERVICE_AGENT_ADMIN_BASE_URL,
};
