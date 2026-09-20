import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const CartContext = createContext(null);

const CART_STORAGE_KEY = "urban-supply-cart";

export function CartProvider({ children }) {
  // Load the cart from localStorage when the app starts.
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!savedCart) {
      return [];
    }

    try {
      return JSON.parse(savedCart);
    } catch (error) {
      console.error("Failed to load cart:", error);
      return [];
    }
  });

  // Save the cart whenever it changes.
  useEffect(() => {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  // Sync cart changes between browser tabs.
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key !== CART_STORAGE_KEY) {
        return;
      }

      if (!event.newValue) {
        setCartItems([]);
        return;
      }

      try {
        const updatedCart = JSON.parse(event.newValue);
        setCartItems(updatedCart);
      } catch (error) {
        console.error("Failed to sync cart:", error);
      }
    };

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, []);

  // Add a product to the cart.
  // If the product already exists, add the selected quantity.
  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + product.quantity,
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: product.quantity || 1,
        },
      ];
    });
  };

  // Remove a product completely from the cart.
  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== productId
      )
    );
  };

  // Update the quantity of a product.
  const updateQuantity = (productId, quantity) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: Math.max(1, quantity),
            }
          : item
      )
    );
  };

  // Empty the entire cart.
  const clearCart = () => {
    setCartItems([]);
  };

  // Total number of individual products.
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Total cart price.
  // WooCommerce Store API prices are in minor currency units.
  const cartTotal = cartItems.reduce(
    (total, item) =>
      total +
      (Number(item.prices?.price || 0) / 100) *
        item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
