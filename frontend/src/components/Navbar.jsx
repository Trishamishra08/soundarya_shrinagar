import React, { useState } from 'react';
import { FiHeart, FiShoppingBag, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Home', link: '/' },
    { name: 'Shop', link: '/shop' },
    { name: 'Skincare', link: '/skincare' },
    { name: 'Haircare', link: '/haircare' },
    { name: 'Makeup', link: '/makeup' },
    { name: 'Wellness', link: '/wellness' },
    { name: 'Offers', link: '/offers' },
    { name: 'Blog', link: '/blog' },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50">
      <div className="bg-brand-pink shadow-md">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center h-16 md:h-[72px] gap-4">

            {/* Logo — floats gently, background blends with navbar */}
            <Link to="/" className="flex items-center gap-2 shrink-0 cursor-pointer">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
                style={{ backgroundColor: '#E8B4B8' }} // same as brand-pink
              >
                <img
                  src={logo}
                  alt="Soundarya Shrinagar Logo"
                  className="h-10 w-auto md:h-14 logo-blend"
                  style={{ mixBlendMode: 'multiply' }}
                />
              </motion.div>

              {/* Brand Name */}
              <div className="flex flex-col leading-none">
                <span
                  className="text-xs md:text-base font-black tracking-[0.08em] text-white uppercase leading-none"
                  style={{ fontFamily: "'Cinzel Decorative', 'Cinzel', serif" }}
                >
                  Soundarya
                </span>
                <span
                  className="text-[6px] md:text-[9px] tracking-[0.35em] text-white/80 mt-0.5 uppercase"
                  style={{ fontFamily: "'Cinzel', serif", fontWeight: 600 }}
                >
                  Shrinagar
                </span>
              </div>
            </Link>

            {/* Nav Links — center, Playfair Display, reduced spacing */}
            <div className="hidden lg:flex flex-1 justify-center">
              <div className="flex items-center gap-4 xl:gap-6">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.link}
                    className="relative group whitespace-nowrap"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'white',
                    }}
                  >
                    {item.name}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-white/60 transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Icons — right side */}
            <div className="flex items-center gap-4 md:gap-5 text-white shrink-0 ml-auto lg:ml-0">
              <div className="relative cursor-pointer hover:scale-110 transition-transform">
                <FiHeart className="text-lg" />
                <span className="absolute -top-1.5 -right-1.5 bg-brand-gold text-white text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">0</span>
              </div>
              <div className="relative cursor-pointer hover:scale-110 transition-transform">
                <FiShoppingBag className="text-lg" />
                <span className="absolute -top-1.5 -right-1.5 bg-brand-gold text-white text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">0</span>
              </div>
              <FiUser className="text-lg cursor-pointer hover:scale-110 transition-transform" />

              {/* Mobile Toggle */}
              <button className="lg:hidden text-xl" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] lg:hidden flex"
          >
            <div className="w-4/5 bg-brand-pink h-full shadow-2xl p-8 relative">
              <button
                className="absolute top-6 right-6 text-2xl text-white"
                onClick={() => setIsOpen(false)}
              >
                <FiX />
              </button>

              <div className="mt-4 mb-8">
                <img src={logo} alt="Logo" className="h-14 w-auto mb-4 logo-blend" style={{ mixBlendMode: 'multiply', backgroundColor: '#E8B4B8' }} />
                <h2
                  className="text-xl text-white uppercase tracking-widest leading-none"
                  style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 900 }}
                >
                  Soundarya
                </h2>
                <span
                  className="text-[9px] text-white/70 tracking-[0.4em] uppercase mt-1 block"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Shrinagar
                </span>
              </div>

              <div className="flex flex-col gap-5">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.link}
                    className="text-white border-b border-white/10 pb-3 uppercase tracking-[0.2em]"
                    style={{ fontFamily: "'Playfair Display', serif", fontSize: '15px', fontWeight: 700 }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
