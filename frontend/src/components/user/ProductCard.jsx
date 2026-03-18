import React, { useState } from 'react';
import { FiHeart, FiShoppingBag, FiStar, FiCheck, FiArrowRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../../context/ShopContext';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, isAuthenticated, setIsAuthModalOpen } = useShop();
  const [isAdded, setIsAdded] = useState(false);
  const liked = isInWishlist(product.id);

  const handleAdd = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Auth Check
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlist = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    toggleWishlist(product);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white border-b border-r border-gray-100 flex flex-col h-full group relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F9F6F4] p-3 md:p-4">
        {/* Minimalist Labels */}
        <div className="absolute top-0 left-0 z-20 p-2 pointer-events-none flex flex-col gap-1">
          {product.label && (
            <span className="bg-[#5C2E3E] text-white text-[7px] font-black px-2 py-0.5 uppercase tracking-widest">
              {product.label}
            </span>
          )}
          {product.discount && (
            <span className="bg-brand-gold text-white text-[7px] font-black px-2 py-0.5 uppercase tracking-widest">
              -{product.discount}
            </span>
          )}
        </div>

        {/* Wishlist Icon */}
        <button 
          type="button"
          onClick={handleWishlist}
          className={`absolute top-4 right-4 z-30 transition-all p-1.5 rounded-full bg-white/70 backdrop-blur-sm active:scale-90 ${
            liked ? 'text-brand-pink scale-110 opacity-100' : 'text-gray-400 hover:text-brand-pink'
          }`}
        >
          <FiHeart className={`w-3 h-3 ${liked ? 'fill-current' : ''}`} />
        </button>
        
        {/* The Image strictly shaped like the 2nd image floating gallery */}
        <div className="w-full h-full rounded-2xl md:rounded-[2rem] border-[4px] md:border-[6px] border-white overflow-hidden shadow-sm relative z-10">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        </div>
        
        {/* Ultra-Compact Quick Add Overlay */}
        <div className="absolute inset-x-3 md:inset-x-4 bottom-0 z-30 lg:translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <button 
            type="button"
            onClick={handleAdd}
            className={`w-full py-3 rounded-t-xl flex items-center justify-center space-x-2 transition-all text-[8px] font-black uppercase tracking-[0.2em] shadow-2xl active:scale-95 ${
              isAdded ? 'bg-brand-gold text-white' : 'bg-[#5C2E3E] text-white'
            }`}
          >
            {isAdded ? (
                <div className="flex items-center gap-1.5">
                  <FiCheck className="w-3 h-3" />
                  <span>Collected</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <FiShoppingBag className="w-3 h-3" />
                  <span>Add to Bag</span>
                </div>
              )}
          </button>
        </div>
      </div>
      
      <div className="p-3 md:p-4 text-center flex flex-col flex-1 bg-white relative">
        <h3 className="font-serif font-black text-[9px] md:text-[10px] text-[#5C2E3E] mb-1 line-clamp-1 truncate uppercase tracking-widest">
          {product.name}
        </h3>
        
        <div className="flex justify-center items-center space-x-0.5 mb-2">
          {[...Array(5)].map((_, i) => (
            <FiStar 
              key={i} 
              className={`w-2 h-2 ${i < (product.rating || 5) ? "fill-brand-gold text-brand-gold" : "text-gray-100"}`} 
            />
          ))}
        </div>

        <div className="flex items-center justify-center space-x-2 mt-auto">
          <span className="text-brand-gold font-black text-[11px] md:text-sm tracking-tight leading-none">₹{product.price}</span>
          {product.oldPrice && (
            <span className="text-gray-200 text-[9px] line-through leading-none font-medium">₹{product.oldPrice}</span>
          )}
        </div>
      </div>

      <div className="absolute inset-0 border border-brand-pink/0 group-hover:border-brand-pink/10 transition-all pointer-events-none" />
    </motion.div>
  );
};

export default ProductCard;
