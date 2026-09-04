
function ProductCard({ product }) {
  return (
    <div>
      {product.images.length > 0 && (
  <img
    src={product.images[0].src}
    alt={product.images[0].alt || product.name}
  />
)}

      <h3>{product.name}</h3>
      <p>₹{(Number(product.prices.price) / 100).toFixed(2)}</p>
    </div>
  );
}

export default ProductCard;