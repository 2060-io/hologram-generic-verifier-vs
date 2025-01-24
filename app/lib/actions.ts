import { QRRequestResponse, UIResponse } from "@/app/lib/definitions";

export async function getQR(socketConnectionId: string): Promise<UIResponse> {
  try {
    const url = "http://localhost:3000/api/generateqr";
    const requestBody = {
      socketConnectionId,
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
