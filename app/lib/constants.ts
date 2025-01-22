const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const PUBLIC_BASE_URL =
  process.env.PUBLIC_BASE_URL ?? `http://localhost:${PORT}`;

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
