import { NextResponse } from "next/server";
import {
  SERVICE_AGENT_ADMIN_BASE_URL,
  PUBLIC_BASE_URL,
  CREDENTIAL_DEFINITION_ID,
} from "@/app/lib/constants";

export async function POST(req: Request) {
  const { socketConnectionId } = await req.json();
  try {
    const url = `${SERVICE_AGENT_ADMIN_BASE_URL}/v1/invitation/presentation-request`;
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
