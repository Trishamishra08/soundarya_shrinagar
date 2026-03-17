import React from 'react';
import { motion } from 'framer-motion';

// Import local images for the floating gallery
import img1 from '../assets/images/cat_skincare.png';
import img2 from '../assets/images/cat_haircare.png';
import img3 from '../assets/images/cat_wellness.png';
import img4 from '../assets/images/insta_1.png';
import img5 from '../assets/images/insta_2.png';
import img6 from '../assets/images/insta_3.png';
import img7 from '../assets/images/insta_4.png';
import img8 from '../assets/images/insta_5.png';
import side1 from '../assets/images/blog_skincare.png';
import side2 from '../assets/images/blog_haircare.png';

const floatingImages = [
  { src: img1, size: 'w-16 h-24 md:w-32 md:h-44', top: '12%', left: '10%', delay: 0 },
  { src: img2, size: 'w-14 h-20 md:w-28 md:h-40', top: '22%', left: '22%', delay: 1 },
  { src: img3, size: 'w-20 h-26 md:w-36 md:h-48', top: '8%', left: '42%', delay: 0.5 },
  { src: img4, size: 'w-16 h-24 md:w-32 md:h-44', top: '18%', left: '65%', delay: 1.5 },
  { src: img5, size: 'w-14 h-20 md:w-28 md:h-40', top: '12%', left: '80%', delay: 0.2 },
  { src: img6, size: 'w-16 h-24 md:w-30 md:h-42', top: '48%', left: '12%', delay: 0.8 },
  { src: img7, size: 'w-20 h-26 md:w-36 md:h-48', top: '58%', left: '45%', delay: 1.2 },
  { src: img8, size: 'w-14 h-20 md:w-28 md:h-40', top: '52%', left: '75%', delay: 0.4 },
];

const AboutSection = () => {
  return (
    <div className="w-full">
      {/* Top Floating Gallery Section */}
      <div className="relative w-full h-[400px] md:h-[600px] bg-brand-pink/20 overflow-hidden flex items-center justify-center">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-brand-pink/10 pointer-events-none"></div>
        
        {/* Floating Images */}
        <div className="absolute inset-0 z-10">
          {floatingImages.map((img, index) => (
            <motion.div
              key={index}
              className={`absolute ${img.size} rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border-4 border-white/30`}
              style={{ top: img.top, left: img.left }}
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 2, 0, -2, 0]
              }}
              transition={{ 
                duration: 6 + index % 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: img.delay 
              }}
            >
              <img src={img.src} alt="About context" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>

        {/* Section Heading Overlay (Optional, based on style) */}
        <div className="relative z-20 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-decorative text-brand-dark drop-shadow-lg tracking-tighter italic"
            style={{ textShadow: '2px 2px 4px rgba(255, 255, 255, 0.5)' }}
          >
            Our Story
          </motion.h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Main Text Content */}
          <div className="flex-1 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-brand-pink text-white p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden group"
            >
              {/* Decorative circle */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
              
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 italic border-b border-white/20 pb-4">
                The Heritage
              </h2>
              <p className="text-sm md:text-base leading-relaxed opacity-90 font-medium tracking-wide">
                At Soundarya Shrinagar, we believe that true luxury lies in the pure essence of nature. 
                With over two decades of expertise in traditional Ayurvedic formulations and modern 
                cosmetic science, we bring you a curation of skincare and wellness products that 
                celebrate your natural glow.
              </p>
              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.3em] font-bold opacity-70">
                  Established 2004
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark italic">
                Our Philosophy
              </h2>
              <p className="text-gray-600 leading-relaxed font-inter">
                My work is inspired by the belief that true luxury lies in moments that are quiet, meaningful, 
                and deeply personal—the gentle glow of a sunlit morning, the first touch of a pure oil on skin, 
                and the intimate ritual of self-care shared within a home.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4"
            >
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark italic">
                Our Approach
              </h2>
              <p className="text-gray-600 leading-relaxed font-inter italic">
                Every product we create is a blend of ethically sourced botanical extracts and 
                dermatologically tested ingredients. We prioritize transparency, efficacy, and 
                the sensory experience of beauty.
              </p>
            </motion.div>
          </div>

          {/* Sidebar Images with Labels */}
          <div className="w-full lg:w-[400px] space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden shadow-xl group cursor-pointer"
            >
              <div className="absolute top-4 left-0 right-0 z-10 flex justify-center">
                <div className="bg-brand-pink/80 backdrop-blur-md px-6 py-1 rounded-full border border-white/30 shadow-sm">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-white font-bold">
                    •• Skincare ••
                  </span>
                </div>
              </div>
              <img src={side1} alt="Category Skincare" className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-xl group cursor-pointer"
            >
              <div className="absolute top-4 left-0 right-0 z-10 flex justify-center">
                <div className="bg-brand-pink/80 backdrop-blur-md px-6 py-1 rounded-full border border-white/30 shadow-sm">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-white font-bold">
                    •• Wellness ••
                  </span>
                </div>
              </div>
              <img src={side2} alt="Category Wellness" className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
