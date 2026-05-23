import { getAllProducts } from "./getAllProducts";
const normalizeType = (type) => type?.toLowerCase().trim();
const acceptedTypes = {
  painting: ["painting", "paintings"],
  workshop: ["workshop", "workshops"],
  calendar: ["calendar", "calendars"],
};

function getCanonicalType(inputType) {
  const normalized = inputType.toLowerCase().trim();
  return Object.keys(acceptedTypes).find((key) =>
    acceptedTypes[key].includes(normalized)
  );
}

export async function fetchProductsByType(type) {
  const canonicalType = getCanonicalType(type);
  if (!canonicalType) return [];

  const products = await getAllProducts();
  const variants = acceptedTypes[canonicalType];

  return products.filter((p) => variants.includes(normalizeType(p.type)));
}
