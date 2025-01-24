import { OriginalClaim, Claim } from "@/app/lib/definitions";

/**
 * Converts a camelCase string to a sentence format (first letter capitalized, rest in lower case).
 * i.e. sanitizeString("helloWorld")  // returns: 'Hello world'
 */
function sanitizeString(str?: string) {
  if (!str) return "";
  const result = str.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  let words = result.split(/[\s_-]+/);
  words = words.map((word, index) => {
    if (index === 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      return word.charAt(0).toLowerCase() + word.slice(1);
    }
  });
  return words.join(" ");
}

export const transformClaimsData = (claims: OriginalClaim[]) => {
  const stringRows: Claim[] = [];
  claims.forEach(({ name, value }) => {
    if (name === "id" || name === "type") return; // omit id and type

    if (!value) return; // omit properties with no value

    if (typeof value === "string" && value.startsWith("data:image/")) {
      stringRows.push({
        key: sanitizeString(name),
        value,
        type: "image",
      });
    } else if (typeof value === "string") {
      stringRows.push({
        key: sanitizeString(name),
        value,
        type: "string",
      });
    }
  });
  return stringRows;
};
