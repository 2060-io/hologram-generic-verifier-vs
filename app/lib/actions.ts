const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL || "http://localhost:3000";

export async function getQR() {
  try {
    const url = "https://a.chatbot-demo.dev.2060.io/v1/invitation/presentation-request";
    const requestBody = {
      callbackUrl: `${PUBLIC_BASE_URL}/api/presentation`,
      ref: "1234-5678",
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
    return result;
    return Response.json({ message: "Hello actions!" });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}
