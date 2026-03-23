import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiZap, FiClock } from 'react-icons/fi';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import bannerMakeup from '../../assets/images/banner_makeup.png';
import bannerSkincare from '../../assets/images/banner_skincare.png';
import bannerSoaps from '../../assets/images/banner_soaps.png';
import bannerJewellery from '../../assets/images/banner_jewellery.png';
import bannerCombos from '../../assets/images/banner_combos.png';

const slides = [
  {
    image: bannerMakeup,
    title: 'Starting ₹50',
    subtitle: 'High-End Artistry & Global Makeup Trends',
    link: '/shop?category=Makeup',
    position: 'justify-start'
  },
  {
    image: bannerSkincare,
    title: 'Starting ₹99',
    subtitle: 'Advanced Skincare: Science meets Nature',
    link: '/shop?category=Skincare',
    position: 'justify-start'
  },
  {
    image: bannerSoaps,
    title: 'Flat 30% Off',
    subtitle: 'Handcrafted Organic Bath & Essential Soaps',
    link: '/shop?category=Soaps',
    position: 'justify-start'
  },
  {
    image: bannerJewellery,
    title: 'Starting ₹199',
    subtitle: 'Royal Heritage: Traditional Jhumkas & Sets',
    link: '/shop?category=Jewellery',
    position: 'justify-start'
  },
  {
    image: bannerCombos,
    title: 'Special Offers',
    subtitle: 'Exclusive Festive Boxes & Beauty Combos',
    link: '/shop?category=Combos',
    position: 'justify-start'
  }
];

const HeroCarousel = () => {
  return (
    <div className="relative w-full h-[450px] md:h-[500px] lg:h-[500px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full overflow-hidden flex items-center bg-white">
              {/* Full Background Image */}
              <img 
                src={slide.image} 
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover transform scale-105 transition-transform duration-[10000ms] linear opacity-70"
              />
              
              {/* Refinement Overlay for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/30 to-transparent z-10" />
              
              {/* Content Overlay */}
              <div className={`container mx-auto px-6 md:px-20 lg:px-32 relative z-20 h-full flex items-center ${slide.position}`}>
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="max-w-xl text-brand-dark text-left drop-shadow-sm"
                >
                   <div className="flex flex-col gap-2 md:gap-4 items-start p-6 md:p-0 rounded-3xl md:bg-transparent">
                      <h2 className="text-3xl md:text-5xl lg:text-5xl font-serif font-black tracking-tighter leading-tight text-brand-dark"
                          style={{ fontFamily: "'Cinzel', serif", textShadow: '2px 2px 4px rgba(255,255,255,0.8)' }}>
                         {slide.title}
                      </h2>
                      <p className="text-sm md:text-lg lg:text-xl font-serif font-black text-brand-dark uppercase tracking-[0.2em]"
                          style={{ fontFamily: "'Cinzel', serif", textShadow: '1px 1px 2px rgba(255,255,255,0.5)' }}>
                         {slide.subtitle}
                      </p>
                      
                      <div className="flex items-center justify-start gap-4 mb-4 mt-2 text-[9px] md:text-xs font-serif font-black text-brand-dark uppercase tracking-[0.2em]">
                         <span>Wide Selection</span>
                         <div className="h-4 w-[2px] bg-brand-dark/20" />
                         <span>Top Brands</span>
                      </div>

                      <Link 
                        to={slide.link} 
                        className="inline-block bg-[#FFD814] hover:bg-white text-brand-dark px-8 py-2.5 rounded-md text-[10px] md:text-sm font-bold shadow-xl transition-all hover:scale-105 active:scale-95 uppercase tracking-widest w-fit mx-0"
                      >
                        Shop the Range
                      </Link>
                   </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
