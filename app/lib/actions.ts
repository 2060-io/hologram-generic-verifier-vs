import { QRRequestResponse, UIResponse } from "@/app/lib/definitions";

export async function getQR(socketConnectionId: string): Promise<UIResponse> {
  try {
    const url = `${process.env.SERVICE_AGENT_ADMIN_BASE_URL}/v1/invitation/presentation-request`;
    const requestBody = {
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/presentation`,
      ref: socketConnectionId,
      requestedCredentials: [
        { credentialDefinitionId: process.env.CREDENTIAL_DEFINITION_ID },
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
