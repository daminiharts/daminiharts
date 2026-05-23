import { getAllProducts } from "./getAllProducts";

export default async function getProductData(title) {
  const allProducts = await getAllProducts();
  return allProducts.find((p) => p.title === title) || null;
}