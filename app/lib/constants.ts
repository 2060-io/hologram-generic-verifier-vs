export const PORT = process.env.NEXT_PUBLIC_PORT
  ? Number(process.env.NEXT_PUBLIC_PORT)
  : 3000;

const PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}:${PORT}`
  : `http://localhost:${PORT}`;

export { PUBLIC_BASE_URL };
