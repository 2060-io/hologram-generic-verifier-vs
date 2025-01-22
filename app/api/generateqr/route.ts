import { NextResponse } from "next/server";

const PUBLIC_BASE_URL =
  process.env.PUBLIC_BASE_URL ||
  "https://f442285821a31af458af8b09d237e087.serveo.net";

const CREDENTIAL_DEFINITION_ID =
  process.env.CREDENTIAL_DEFINITION_ID ||
  "did:web:chatbot-demo.dev.2060.io?service=anoncreds&relativeRef=/credDef/HngJhYMeTLTZNa5nJxDybmXDsV8J7G1fz2JFSs3jcouT";

export async function POST(req: Request) {
  const { socketConnectionId } = await req.json();
  try {
    const url =
      "https://a.chatbot-demo.dev.2060.io/v1/invitation/presentation-request";
    const requestBody = {
      callbackUrl: `${PUBLIC_BASE_URL}/api/presentation`,
      ref: socketConnectionId,
      requestedCredentials: [
        { credentialDefinitionId: CREDENTIAL_DEFINITION_ID },
      ],
    };
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(requestBody),
    });
    const result = await response.json();
    return NextResponse.json({ ...result }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
