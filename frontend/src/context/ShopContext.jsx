import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const clearCart = (details) => {
    const newId = `SS-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newId);
    setOrderDetails(details);
    setLastOrder([...cart]);
    setCart([]);
    return newId;
  };

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('soundarya_cart');
    const savedWishlist = localStorage.getItem('soundarya_wishlist');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('soundarya_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('soundarya_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  return (
    <ShopContext.Provider value={{ 
      cart, 
      wishlist, 
      isCartDrawerOpen,
      setIsCartDrawerOpen,
      isAuthenticated,
      setIsAuthenticated,
      isAuthModalOpen,
      setIsAuthModalOpen,
      addToCart, 
      removeFromCart, 
      updateQuantity,
      toggleWishlist, 
      isInWishlist,
      lastOrder,
      orderId,
      orderDetails,
      clearCart,
      cartCount: cart.reduce((acc, item) => acc + item.quantity, 0),
      wishlistCount: wishlist.length,
      cartTotal: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    }}>
      {children}
    </ShopContext.Provider>
  );
};
