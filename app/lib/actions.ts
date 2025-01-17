const PUBLIC_BASE_URL =
  process.env.PUBLIC_BASE_URL ||
  "https://f442285821a31af458af8b09d237e087.serveo.net";

type Response = {
  message?: Record<string, string>;
  ok: boolean;
  error?: string;
};

export async function getQR(socketConnectionId: string): Promise<Response> {
  try {
    const url =
      "https://a.chatbot-demo.dev.2060.io/v1/invitation/presentation-request";
    const requestBody = {
      callbackUrl: `${PUBLIC_BASE_URL}/api/presentation`,
      ref: socketConnectionId,
      requestedCredentials: [
        {
          credentialDefinitionId:
            "did:web:chatbot-demo.dev.2060.io?service=anoncreds&relativeRef=/credDef/HngJhYMeTLTZNa5nJxDybmXDsV8J7G1fz2JFSs3jcouT",
          attributes: ["phoneNumber"],
        },
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
    return { message: result, ok: true };
  } catch (error) {
    console.error(error);
    return { error: `${error}`, ok: false };
  }
}
