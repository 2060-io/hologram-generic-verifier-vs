import { QRRequestResponse, UIResponse } from "@/app/lib/definitions";
import {
  SERVICE_AGENT_ADMIN_BASE_URL,
  PUBLIC_BASE_URL,
  CREDENTIAL_DEFINITION_ID,
} from "./constants";

export async function getQR(socketConnectionId: string): Promise<UIResponse> {
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
    const result = (await response.json()) as QRRequestResponse;
    return { shortUrl: result.shortUrl, ok: true };
  } catch (error) {
    console.error(error);
    return { error: `${error}`, ok: false };
  }
}
