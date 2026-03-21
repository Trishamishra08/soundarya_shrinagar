import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiUser, FiMail, FiLock, FiCheckCircle } from 'react-icons/fi';
import { useShop } from '../../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';

import logoPink from '../../assets/images/logo_pink.png';
import catSkincare from '../../assets/images/cat_skincare_new.png';

const Auth = () => {
  const { setIsAuthenticated, setUser } = useShop();
  const navigate = useNavigate();
  
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      if (!form.email || !form.password) {
        alert("Please enter both email and password.");
        return;
      }

      // Enforce specific fixed credentials for Admin Portal
      if (form.email !== 'customercare@saundaryashrinagar.com' || form.password !== 'admin@123') {
        alert("Invalid email or password. Please try again.");
        return;
      }

      // Set the global user state with the exact email and password entered
      setUser({
        name: 'Trisha Mishra', // Always load the super admin profile name on login
        email: form.email,
        password: form.password,
        role: 'Super Admin',
        phone: '+91 9896472169',
        joined: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      });
      setIsAuthenticated(true);
      alert("Login Successful! Welcome to the Admin Portal.");
      
      // If we are on the admin login page, go to admin dashboard
      if (window.location.pathname.includes('/admin')) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      if (form.name && form.email && form.password) {
        setUser({
          name: form.name,
          email: form.email,
          password: form.password,
          role: 'Admin',
          phone: 'Not Provided',
          joined: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        });
        setIsAuthenticated(true);
        alert("Account Created & Authenticated Successfully!");
        navigate(window.location.pathname.includes('/admin') ? '/admin' : '/');
      }
    }
  };

  return (
    <div className="fixed inset-0 w-full h-[100dvh] bg-[#5C2E3E] font-['Inter',_sans-serif] flex flex-col md:flex-row overflow-y-auto md:overflow-hidden !m-0 !p-0 select-none">
      
      {/* 
        TOP/LEFT PANEL (White background)
      */}
      <div className="bg-[#FAF7F8] md:w-[45%] lg:w-[40%] flex flex-col relative z-10 
        rounded-br-[2.5rem] lg:rounded-br-[8rem] 
        lg:rounded-none lg:rounded-tr-[5rem] lg:rounded-br-[5rem]
        px-6 pt-3 pb-6 md:pt-4 md:pb-10 min-h-[35vh] md:min-h-[50vh] transition-all shadow-xl shrink-0"
      >
        {/* Header / Logo */}
        <div className="flex items-center gap-2 mb-3 md:mb-10 md:px-6">
          <img src={logoPink} alt="Soundarya Shrinagar Logo" className="h-5 md:h-8 w-auto" />
          <div className="flex flex-col leading-none">
             <h2 className="text-[12px] md:text-base font-serif font-black text-[#5C2E3E] tracking-[0.1em]" style={{ fontFamily: "'Cinzel Decorative', serif" }}>
               Soundarya
             </h2>
             <span className="text-[5px] md:text-[7px] text-[#5C2E3E] font-bold uppercase tracking-[0.4em] opacity-80" style={{ fontFamily: "'Cinzel', serif" }}>
               Shrinagar
             </span>
          </div>
        </div>
        
        {/* Center Image Module */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative inline-block"
          >
             <div className="w-24 h-24 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-xl border-2 md:border-[3px] border-white">
                <img src={catSkincare} alt="Brand Aesthetics" className="w-full h-full object-cover origin-center hover:scale-105 transition-transform duration-700" />
             </div>
             
             {/* Floating Icon Badge */}
             <div className="absolute -bottom-1 -right-1 w-7 h-7 md:w-10 md:h-10 bg-[#92B89D] text-white rounded-full flex items-center justify-center shadow-md border-2 md:border-[3px] border-[#FAF7F8]">
                <FiCheckCircle className="w-3 h-3 md:w-4 md:h-4" strokeWidth={3} />
             </div>
          </motion.div>
        </div>

        {/* Visit Site Footer */}
        <div className="absolute bottom-3 left-6 md:absolute md:bottom-4 md:left-12">
           <Link to="/" className="flex items-center gap-1.5 font-black text-[7px] md:text-[8px] uppercase tracking-widest text-[#5C2E3E] hover:text-brand-pink transition-colors">
              <FiArrowUpRight size={10} className="opacity-70" /> Visit site
           </Link>
        </div>
      </div>

      {/* 
        BOTTOM/RIGHT PANEL (Dark background)
        Contains the Login/Registration Forms
      */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-12 lg:px-20 py-4 md:py-16 text-white min-h-[55vh] md:min-h-[50vh]">
        <div className="w-full mx-auto max-w-sm md:max-w-[340px] lg:max-w-[360px]">
          
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="flex items-end justify-between mb-4 md:mb-5">
               <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white leading-none">
                 {isLogin ? 'Login' : 'Register'}
               </h1>
               <div className="flex gap-4">
                  <button 
                    onClick={() => setIsLogin(true)} 
                    className={`text-[8px] md:text-[8px] font-black uppercase tracking-widest transition-all pb-0.5 md:pb-1 relative ${isLogin ? 'text-[#92B89D]' : 'text-white/40 hover:text-white/70'}`}
                  >
                     Sign In
                     {isLogin && <span className="absolute bottom-0 left-0 w-full h-[1px] md:h-0.5 bg-[#92B89D] rounded-full" />}
                  </button>
                  <button 
                    onClick={() => setIsLogin(false)} 
                    className={`text-[8px] md:text-[8px] font-black uppercase tracking-widest transition-all pb-0.5 md:pb-1 relative ${!isLogin ? 'text-[#92B89D]' : 'text-white/40 hover:text-white/70'}`}
                  >
                     Create
                     {!isLogin && <span className="absolute bottom-0 left-0 w-full h-[1px] md:h-0.5 bg-[#92B89D] rounded-full" />}
                  </button>
               </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-3.5">
              {!isLogin && (
                <div className="space-y-1 md:space-y-1">
                  <label className="text-[8px] md:text-[9px] text-white/80 font-medium tracking-wide">Full Name</label>
                  <div className="relative">
                    <FiUser className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-white/50 text-xs" />
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      required={!isLogin}
                      placeholder="Admin Name"
                      className="w-full bg-white/10 border border-white/5 pl-9 md:pl-10 pr-4 py-2 md:py-2.5 rounded-lg text-[10px] md:text-xs font-medium focus:bg-white/20 focus:border-white/20 outline-none transition-all text-white placeholder:text-white/30"
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-1 md:space-y-1">
                <label className="text-[8px] md:text-[9px] text-white/80 font-medium tracking-wide">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-white/50 text-xs" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    required
                    placeholder="admin@saundaryashringar.com"
                    className="w-full bg-white/10 border border-white/5 pl-9 md:pl-10 pr-4 py-2 md:py-2.5 rounded-lg text-[10px] md:text-xs font-medium focus:bg-white/20 focus:border-white/20 outline-none transition-all text-white placeholder:text-white/30"
                  />
                </div>
              </div>

              <div className="space-y-1 md:space-y-1">
                <label className="text-[8px] md:text-[9px] text-white/80 font-medium tracking-wide">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-white/50 text-xs" />
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleInputChange}
                    required
                    placeholder="••••••••"
                    className="w-full bg-white/10 border border-white/5 pl-9 md:pl-10 pr-4 py-2 md:py-2.5 rounded-lg text-[10px] md:text-xs font-medium focus:bg-white/20 focus:border-white/20 outline-none transition-all text-white placeholder:text-white/30"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLogin ? (!form.email || !form.password) : (!form.name || !form.email || !form.password)}
                className="w-full bg-gradient-to-r from-[#82a88d] to-[#92B89D] text-white py-2.5 md:py-3 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] text-center mt-3 md:mt-5 disabled:opacity-50 hover:brightness-110 transition-all shadow-lg active:scale-95"
              >
                {isLogin ? 'Login to Portal' : 'Register Securely'}
              </button>
            </form>
          </motion.div>
          
          <div className="mt-6 md:mt-10 text-center">
             <p className="text-[5px] md:text-[6.5px] text-white/30 font-black uppercase tracking-[0.2em] flex items-center justify-center gap-1.5 md:gap-2">
                &copy; Soundarya Module <span className="w-0.5 h-0.5 md:w-1 md:h-1 bg-white/20 rounded-full" /> Authorized Access
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
