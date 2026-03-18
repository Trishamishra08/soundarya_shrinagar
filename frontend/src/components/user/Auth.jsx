import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiUser, FiPhone, FiMail } from 'react-icons/fi';
import { useShop } from '../../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import logoPink from '../../assets/images/logo_pink.png';

const Auth = () => {
  const { setIsAuthenticated, setUser } = useShop();
  const navigate = useNavigate();
  
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const [step, setStep] = useState(1); // 1 = Details, 2 = simulated OTP
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      if (form.phone.length === 10) setStep(2);
    } else {
      if (form.name && form.phone.length === 10 && form.email) setStep(2);
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp.join('').length === 4) {
      setIsAuthenticated(true);
      setUser({
        name: isLogin ? 'Guest User' : form.name,
        phone: form.phone,
        email: form.email || 'guest@example.com'
      });
      navigate('/'); // redirect to shop or home
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex flex-col items-center justify-start p-4 pt-12 md:pt-20">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(232,180,184,0.15)_0%,transparent_70%)]"></div>
      </div>

      <div className="w-full max-w-[400px] bg-white rounded-[2rem] overflow-hidden shadow-[0_25px_60px_rgba(92,46,62,0.12)] border border-gray-100 flex flex-col relative z-10">
        {/* Header Section */}
        <div className="bg-[#FFEFEF] p-8 text-center border-b border-brand-pink/5 relative">
          <div className="mb-4">
            <img src={logoPink} alt="Logo" className="h-10 mx-auto" />
          </div>
          
          <h2 
            className="text-lg md:text-xl font-black text-[#5C2E3E] uppercase tracking-[0.15em] leading-[1.2] mb-8 flex flex-col items-center"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className="text-[9px] font-sans font-black tracking-[0.4em] opacity-40 mb-1">Welcome to the</span>
            World of Soundarya
          </h2>
          
          {/* Custom Toggle */}
          <div className="absolute -bottom-px left-6 right-6 flex gap-6">
            <button 
              onClick={() => { setIsLogin(true); setStep(1); }}
              className={`flex-1 pb-3 text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${isLogin ? 'text-[#5C2E3E] border-b-2 border-[#5C2E3E]' : 'text-gray-300 hover:text-brand-pink'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => { setIsLogin(false); setStep(1); }}
              className={`flex-1 pb-3 text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${!isLogin ? 'text-[#5C2E3E] border-b-2 border-[#5C2E3E]' : 'text-gray-300 hover:text-brand-pink'}`}
            >
              Registration
            </button>
          </div>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.form 
                key="details"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleDetailsSubmit}
                className="space-y-5"
              >
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#5C2E3E]/60 block">Full Name</label>
                    <div className="relative">
                      <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        required={!isLogin}
                        placeholder="Arjun Shrinagar"
                        className="w-full bg-gray-50 border border-gray-100 pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium focus:border-brand-pink/50 outline-none transition-all"
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#5C2E3E]/60 block">Mobile Number</label>
                  <div className="relative">
                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      maxLength="10"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '') })}
                      required
                      placeholder="9876543210"
                      className="w-full bg-gray-50 border border-gray-100 pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium focus:border-brand-pink/50 outline-none transition-all"
                    />
                  </div>
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#5C2E3E]/60 block">Email Address</label>
                    <div className="relative">
                      <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        required={!isLogin}
                        placeholder="arjun@example.com"
                        className="w-full bg-gray-50 border border-gray-100 pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium focus:border-brand-pink/50 outline-none transition-all"
                      />
                    </div>
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isLogin ? form.phone.length !== 10 : (!form.name || form.phone.length !== 10 || !form.email)}
                  className="w-full bg-[#5C2E3E] text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-brand-pink transition-all active:scale-95 mt-8 disabled:opacity-50 disabled:bg-gray-300"
                >
                  Continue <FiArrowRight />
                </button>
              </motion.form>
            ) : (
              <motion.form 
                key="otp"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleOtpSubmit}
              >
                <div className="text-center mb-8">
                  <h3 className="font-serif font-bold text-2xl text-brand-dark mb-2">Verify Number</h3>
                  <p className="text-sm text-gray-500 font-medium">OTP sent to +91 {form.phone}</p>
                </div>
                
                <div className="flex justify-center gap-4 mb-8">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      required
                      value={digit}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        const newOtp = [...otp];
                        newOtp[index] = val;
                        setOtp(newOtp);
                        if (val && index < 3) document.getElementById(`otp-${index + 1}`).focus();
                      }}
                      className="w-14 h-14 bg-gray-50 text-center border border-gray-200 rounded-xl text-xl font-black focus:ring-2 focus:ring-brand-pink/50 focus:border-brand-pink outline-none transition-all text-[#5C2E3E]"
                    />
                  ))}
                </div>

                <button 
                  type="submit"
                  disabled={otp.join('').length !== 4}
                  className="w-full bg-[#5C2E3E] text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-brand-pink transition-all active:scale-95 disabled:opacity-50 disabled:bg-gray-300"
                >
                  Authenticate & Enter
                </button>
                
                <p className="text-[10px] font-black uppercase tracking-widest text-center text-gray-400 mt-6 cursor-pointer hover:text-brand-pink transition-colors">
                  Resend OTP
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Auth;
