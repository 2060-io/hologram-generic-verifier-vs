export async function POST() {
  try {
    return Response.json({ message: "Hello World" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
