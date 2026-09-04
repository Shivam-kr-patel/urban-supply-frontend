const API_URL =
  "http://localhost/wordpress/index.php/wp-json/wc/store/v1/products";

export async function getProducts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}