// // context/CartContext.js
// import { createContext, useContext, useState, useEffect } from 'react';

// const CartContext = createContext();

// export function useCart() {
//   return useContext(CartContext);
// }

// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState(() => {
//     const stored = localStorage.getItem('travelCart');
//     return stored ? JSON.parse(stored) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem('travelCart', JSON.stringify(cartItems));
//   }, [cartItems]);

//   const addToCart = (pkg) => {
//     const exists = cartItems.find(item => item._id === pkg._id);
//     if (!exists) {
//       setCartItems([...cartItems, pkg]);
//     }
//   };

//   const removeFromCart = (id) => {
//     setCartItems(cartItems.filter(item => item._id !== id));
//   };

//   const clearCart = () => setCartItems([]);

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// }


// context/CartContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('travelCart');
    return stored ? JSON.parse(stored) : [];
  });

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('travelCart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add to cart (with quantity support)
  const addToCart = (pkg) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find(item => item._id === pkg._id);
      if (existing) {
        // If exists, increase quantity
        return prevItems.map(item =>
          item._id === pkg._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // If not, add with quantity 1
      return [...prevItems, { ...pkg, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const increaseQuantity = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems(prevItems =>
      prevItems
        .map(item =>
          item._id === id
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


