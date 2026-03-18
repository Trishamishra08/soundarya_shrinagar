import React from 'react';
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import logo from '../../assets/images/logo_pink.png';
import footerBg from '../../assets/images/footer_bg.jpg';

const Footer = () => {
  return (
    <footer className="relative bg-[#FFE8EA] text-brand-dark pt-4 pb-0 md:pt-8 md:pb-4 border-t border-brand-pink/10 overflow-hidden">
      {/* Sketched Cosmetic Background - High Visibility */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url(${footerBg})`,
          backgroundSize: '200px',
          backgroundRepeat: 'repeat',
        }}
      ></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center text-center">
        
        {/* Centered Brand Branding */}
        <div className="flex flex-col items-center mb-4 md:mb-6">
          <div 
            className="h-16 md:h-20 w-32 md:w-40 mb-2 md:mb-3"
            style={{
              backgroundImage: 'url(/logo.png)',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#FFE8EA',
              backgroundBlendMode: 'multiply'
            }}
          ></div>
          <div className="flex flex-col leading-none items-center">
            <span
              className="text-lg md:text-xl font-black tracking-[0.08em] text-[#5C2E3E] uppercase leading-none"
              style={{ fontFamily: "'Cinzel Decorative', serif" }}
            >
              Soundarya
            </span>
            <span
              className="text-[9px] md:text-[10px] tracking-[0.35em] text-[#5C2E3E]/60 mt-0.5 uppercase font-bold"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Shrinagar
            </span>
          </div>
        </div>

        {/* Tagline */}
        <p className="max-w-md text-gray-500 text-[10px] leading-relaxed mb-4 md:mb-6 italic opacity-80">
          Pure essence of nature. 100% organic and natural beauty products crafted to enhance your natural glow.
        </p>

        {/* Contact Us - One Line Address */}
        <div className="w-full mb-4 md:mb-6 pt-3 md:pt-4 border-t border-brand-pink/10">
          <h3 className="text-[9px] font-black mb-2 md:mb-3 uppercase tracking-[0.3em] text-brand-gold">Contact Us</h3>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-[10px] font-medium text-gray-600">
            <div className="flex items-center gap-2">
              <FiMapPin className="text-brand-pink" size={12} />
              <span>Lajpat Nagar Near Radha Swami Bhawan Fatehabad-125050 Haryana</span>
            </div>
            <div className="flex items-center gap-2">
              <FiPhone className="text-brand-pink" size={12} />
              <span>+91 9896472169</span>
            </div>
            <div className="flex items-center gap-2">
              <FiMail className="text-brand-pink" size={12} />
              <span>customercare@saundaryashringar.com</span>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex space-x-4 mb-6 md:mb-8">
          <a href="https://www.instagram.com/saundaryashringarpvtltd/" target="_blank" rel="noopener noreferrer" className="text-sm md:text-base text-[#5C2E3E]/70 hover:text-brand-pink transition-colors"><FiInstagram /></a>
          <a href="https://www.facebook.com/people/Saundarya-Shringar-Pvt-Ltd/61580709900798/" target="_blank" rel="noopener noreferrer" className="text-sm md:text-base text-[#5C2E3E]/70 hover:text-brand-pink transition-colors"><FiFacebook /></a>
          <a href="https://x.com/LtdShringar" target="_blank" rel="noopener noreferrer" className="text-sm md:text-base text-[#5C2E3E]/70 hover:text-brand-pink transition-colors"><FiTwitter /></a>
        </div>

        {/* Bottom Footer: Policy Links & Copyright */}
        <div className="w-full pt-4 md:pt-6 border-t border-brand-pink/10 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-3">
          <div className="flex gap-4 md:gap-5 text-[9px] font-black uppercase tracking-widest text-[#5C2E3E]/40 order-2 md:order-1">
            <a href="#" className="hover:text-brand-pink transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-pink transition-colors">Terms & Conditions</a>
          </div>

          <p className="text-[9px] font-bold text-gray-400 order-1 md:order-2 tracking-wide uppercase">
            © 2024 Soundarya Shringar Pvt Ltd. Crafted with Love.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
