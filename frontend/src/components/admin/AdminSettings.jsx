import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { FiUser, FiMail, FiShield, FiLock, FiBell, FiChevronRight, FiEdit3, FiSettings, FiX, FiCheck, FiSave, FiImage, FiLogOut } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const AdminSettings = () => {
  const { user, setUser, setIsAuthenticated } = useShop();
  const navigate = useNavigate();

  const [adminInfo, setAdminInfo] = useState({
    name: user?.name || 'Trisha Mishra',
    role: user?.role || 'Super Admin',
    email: user?.email || 'customercare@saundaryashringar.com',
    phone: user?.phone || '+91 9896472169',
    joined: user?.joined || 'Jan 2024',
    password: user?.password || 'admin123'
  });

  // Sync state if user context updates
  useEffect(() => {
    if (user) {
      setAdminInfo(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        password: user.password || prev.password,
        role: user.role || prev.role,
        phone: user.phone || prev.phone
      }));
    }
  }, [user]);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ ...adminInfo });
  const [activeSecurityView, setActiveSecurityView] = useState(null); // 'password', 'notifications', 'presets', 'archive'
  const [passwordForm, setPasswordForm] = useState({ current: adminInfo.password, new: '', confirm: '' });

  useEffect(() => {
    setPasswordForm(prev => ({ ...prev, current: adminInfo.password }));
    setProfileForm({ ...adminInfo });
  }, [adminInfo]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setAdminInfo({ ...profileForm });
    setIsEditingProfile(false);
    alert('Profile updated successfully!');
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (passwordForm.new !== passwordForm.confirm) {
      alert('New passwords do not match!');
      return;
    }
    setAdminInfo(prev => ({ ...prev, password: passwordForm.new }));
    setActiveSecurityView(null);
    setPasswordForm({ current: passwordForm.new, new: '', confirm: '' });
    alert('Password changed successfully!');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    alert('You have been securely logged out.');
    navigate('/admin/login');
  };

  const renderSecurityView = () => {
    switch (activeSecurityView) {
      case 'password':
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="bg-brand-dark rounded-none border border-white/10 shadow-2xl p-6 text-white"
          >
             <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                <h3 className="text-[10px] font-serif font-bold uppercase tracking-[0.2em] text-brand-gold flex items-center gap-2">
                   <FiLock /> Change Master Password
                </h3>
                <button onClick={() => setActiveSecurityView(null)} className="text-white/40 hover:text-white transition-colors"><FiX size={18}/></button>
             </div>
             <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-md">
                <div className="space-y-1.5">
                   <label className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Current Password</label>
                   <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 p-3 text-xs outline-none focus:border-brand-gold transition-all"
                      value={passwordForm.current}
                      onChange={(e) => setPasswordForm({...passwordForm, current: e.target.value})}
                      required
                   />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                     <label className="text-[8px] font-bold text-white/40 uppercase tracking-widest">New Password</label>
                     <input type="password" className="w-full bg-white/5 border border-white/10 p-3 text-xs outline-none focus:border-brand-gold transition-all" value={passwordForm.new} onChange={(e) => setPasswordForm({...passwordForm, new: e.target.value})} required />
                  </div>
                  <div className="space-y-1.5">
                     <label className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Confirm New</label>
                     <input type="password" className="w-full bg-white/5 border border-white/10 p-3 text-xs outline-none focus:border-brand-gold transition-all" value={passwordForm.confirm} onChange={(e) => setPasswordForm({...passwordForm, confirm: e.target.value})} required />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                   <button type="button" onClick={() => setActiveSecurityView(null)} className="text-[9px] font-bold uppercase text-white/40 hover:text-white tracking-widest">Discard</button>
                   <button type="submit" className="bg-brand-gold text-brand-dark px-10 py-3 text-[9px] font-bold uppercase tracking-widest shadow-2xl shadow-brand-gold/10 hover:bg-white transition-all">Save Changes</button>
                </div>
             </form>
          </motion.div>
        );
      case 'notifications':
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-none border border-brand-pink/20 shadow-2xl p-6"
          >
             <div className="flex justify-between items-center mb-6 border-b border-brand-pink/5 pb-4">
                <h3 className="text-[10px] font-serif font-black uppercase tracking-[0.2em] text-brand-pink flex items-center gap-2">
                   <FiBell /> Notification Prep
                </h3>
                <button onClick={() => setActiveSecurityView(null)} className="text-gray-300 hover:text-brand-dark transition-colors"><FiX size={18}/></button>
             </div>
             <div className="space-y-4">
                {[
                  { label: 'Push Notifications', desc: 'Alert browser/mobile on new orders', enabled: true },
                  { label: 'Email Dispatch', desc: 'Send summary reports to master email', enabled: false },
                  { label: 'SMS Gateway', desc: 'High priority customer messages', enabled: true },
                  { label: 'Sound Alerts', desc: 'Play chime on inventory updates', enabled: true },
                ].map((notif, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-brand-light/20 border border-brand-pink/5 group hover:border-brand-pink/30 transition-all">
                    <div>
                      <p className="text-[10px] font-bold text-brand-dark uppercase tracking-tight">{notif.label}</p>
                      <p className="text-[8px] text-gray-400 font-medium uppercase mt-0.5">{notif.desc}</p>
                    </div>
                    <div className={`w-8 h-4 rounded-full p-0.5 transition-colors cursor-pointer ${notif.enabled ? 'bg-green-500' : 'bg-gray-200'}`}>
                      <div className={`w-3 h-3 bg-white rounded-full transition-transform ${notif.enabled ? 'translate-x-4' : 'translate-x-0'}`} />
                    </div>
                  </div>
                ))}
                <button onClick={() => {alert('Configurations synced with server.'); setActiveSecurityView(null);}} className="w-full bg-brand-dark text-white py-3 text-[9px] font-bold uppercase tracking-widest mt-4">Sync Configs</button>
             </div>
          </motion.div>
        );
      case 'presets':
        return (
           <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-none border border-brand-gold/20 shadow-2xl p-6"
          >
             <div className="flex justify-between items-center mb-6 border-b border-brand-pink/5 pb-4">
                <h3 className="text-[10px] font-serif font-black uppercase tracking-[0.2em] text-brand-gold flex items-center gap-2">
                   <FiSettings /> System Presets
                </h3>
                <button onClick={() => setActiveSecurityView(null)} className="text-gray-300 hover:text-brand-dark transition-colors"><FiX size={18}/></button>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[7px] font-bold text-gray-400 uppercase tracking-widest pl-1">Store Currency</label>
                  <select className="w-full bg-brand-light/10 border border-brand-pink/10 p-2 text-[10px] font-medium outline-none">
                    <option>INR (₹)</option>
                    <option>USD ($)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[7px] font-bold text-gray-400 uppercase tracking-widest pl-1">Tax Computation</label>
                  <select className="w-full bg-brand-light/10 border border-brand-pink/10 p-2 text-[10px] font-medium outline-none">
                    <option>Automatic (GST)</option>
                    <option>Manual Override</option>
                  </select>
                </div>
                <div className="col-span-2 p-3 bg-brand-pink/5 border border-dashed border-brand-pink/30 flex justify-between items-center">
                   <span className="text-[9px] font-bold uppercase text-brand-pink">Portal Maintenance Mode</span>
                   <div className="w-8 h-4 bg-gray-200 rounded-full p-0.5 cursor-pointer"><div className="w-3 h-3 bg-white rounded-full translate-x-0 transition-all" /></div>
                </div>
             </div>
             <button onClick={() => setActiveSecurityView(null)} className="w-full bg-brand-dark text-white py-3 text-[9px] font-bold uppercase tracking-widest mt-6">Apply Presets</button>
          </motion.div>
        );
      case 'archive':
        return (
           <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="bg-brand-light/50 rounded-none border border-brand-pink/10 shadow-2xl p-6"
          >
             <div className="flex justify-between items-center mb-6 border-b border-brand-pink/5 pb-4">
                <h3 className="text-[10px] font-serif font-bold uppercase tracking-[0.2em] text-brand-dark flex items-center gap-2">
                   <FiUser /> Session Archive
                </h3>
                <button onClick={() => setActiveSecurityView(null)} className="text-gray-300 hover:text-brand-dark transition-colors"><FiX size={18}/></button>
             </div>
             <div className="space-y-2 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                {[
                  { time: '21 Mar 2026, 01:06 PM', ip: '192.168.1.1', device: 'Windows / Chrome', status: 'Success' },
                  { time: '20 Mar 2026, 11:45 AM', ip: '192.168.1.1', device: 'Windows / Chrome', status: 'Success' },
                  { time: '19 Mar 2026, 09:12 PM', ip: '45.12.33.2', device: 'iPhone / Safari', status: 'Blocked' },
                  { time: '19 Mar 2026, 08:30 PM', ip: '192.168.1.1', device: 'Windows / Chrome', status: 'Success' },
                ].map((session, i) => (
                  <div key={i} className="bg-white p-3 border border-brand-pink/5 flex justify-between items-center group hover:border-brand-pink/20 transition-all">
                    <div>
                      <p className="text-[9px] font-bold text-brand-dark">{session.time}</p>
                      <p className="text-[7px] text-gray-400 uppercase tracking-tighter mt-1">{session.device} • {session.ip}</p>
                    </div>
                    <span className={`text-[7px] font-bold uppercase px-2 py-0.5 ${session.status === 'Success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{session.status}</span>
                  </div>
                ))}
             </div>
             <p className="text-[7px] text-center text-gray-400 mt-4 uppercase tracking-widest">Only displaying activity from last 30 days</p>
          </motion.div>
        );
      default:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-none border border-brand-pink/10 shadow-md p-5">
            <h3 className="text-[10px] font-serif font-black text-brand-dark uppercase tracking-widest mb-6 leading-none flex items-center gap-2">
              <FiShield className="text-brand-gold" size={12} /> Security Controls
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                  { icon: <FiLock />, label: 'Update Password', desc: 'Secure master access', view: 'password', glow: 'bg-brand-gold/10 text-brand-gold' },
                  { icon: <FiBell />, label: 'Notification Prep', desc: 'Alert configurations', view: 'notifications', glow: 'bg-brand-pink/10 text-brand-pink' },
                  { icon: <FiSettings />, label: 'System Presets', desc: 'Store operational opts', view: 'presets', glow: 'bg-indigo-50 text-indigo-500' },
                  { icon: <FiUser />, label: 'Session Archive', desc: 'Recent entry logs', view: 'archive', glow: 'bg-brand-light/50 text-brand-dark' },
              ].map((item, i) => (
                  <div 
                    key={i} 
                    onClick={() => setActiveSecurityView(item.view)}
                    className="flex items-center justify-between p-4 rounded-none hover:bg-brand-light/20 border border-brand-pink/5 transition-all cursor-pointer group shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 ${item.glow} rounded-none group-hover:scale-110 transition-transform shrink-0 shadow-inner`}>
                          {React.cloneElement(item.icon, { size: 16 })}
                      </div>
                      <div>
                          <p className="text-[11px] font-bold text-brand-dark uppercase tracking-wide leading-none group-hover:text-brand-pink transition-colors">{item.label}</p>
                          <p className="text-[8px] text-gray-400 font-medium uppercase tracking-widest mt-1 opacity-70">{item.desc}</p>
                      </div>
                    </div>
                    <FiChevronRight size={14} className="text-gray-200 group-hover:text-brand-pink group-hover:translate-x-1 transition-all" />
                  </div>
              ))}
              
              <div 
                onClick={handleLogout}
                className="col-span-1 md:col-span-2 mt-4 flex items-center justify-center p-4 rounded-none bg-red-50 hover:bg-red-600 border border-red-100 transition-all cursor-pointer group shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <FiLogOut size={16} className="text-red-500 group-hover:text-white transition-colors" />
                  <p className="text-[11px] font-bold text-red-600 group-hover:text-white uppercase tracking-widest leading-none transition-colors">
                    Logout Authority Session
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4 pb-10">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-xl font-serif font-black text-brand-dark uppercase tracking-widest leading-none mb-1">
            Portal Settings
          </h1>
          <p className="text-[8px] text-gray-400 font-medium uppercase tracking-[0.2em]">Identity & Security</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <div className="bg-white rounded-none border border-brand-pink/10 shadow-md overflow-hidden h-full sticky top-20">
             <div className="h-16 bg-brand-light/40" />
             <div className="px-4 pb-6 -mt-8 text-center">
                <div className="w-16 h-16 mx-auto rounded-none bg-white p-1 shadow-lg mb-3 border border-brand-pink/5 relative group cursor-pointer">
                   <div className="w-full h-full rounded-none bg-brand-dark flex items-center justify-center text-brand-gold text-xl font-serif font-black">
                      {adminInfo.name.substring(0, 2).toUpperCase()}
                   </div>
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <FiImage className="text-white" size={14} />
                   </div>
                </div>
                <h2 className="text-sm font-serif font-bold text-brand-dark uppercase leading-tight mb-1">{adminInfo.name}</h2>
                <p className="text-[8px] text-brand-pink font-medium uppercase tracking-widest mb-4">{adminInfo.role}</p>
                
                <div className="space-y-2 text-left">
                   <div className="flex items-center gap-2 p-2 bg-brand-light/10 rounded-none border border-brand-pink/5 overflow-hidden">
                      <FiMail size={12} className="text-brand-pink shrink-0" />
                      <span className="text-[8px] font-medium text-brand-dark truncate">{adminInfo.email}</span>
                   </div>
                   <div className="flex items-center gap-2 p-2 bg-brand-light/10 rounded-none border border-brand-pink/5">
                      <FiShield size={12} className="text-brand-gold shrink-0" />
                      <span className="text-[8px] font-medium text-brand-dark uppercase">Super Admin Control</span>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div className="md:col-span-3 space-y-4">
          <AnimatePresence mode="wait">
            {isEditingProfile ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="bg-white rounded-none border-2 border-brand-gold/20 shadow-2xl p-6 relative"
              >
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-brand-pink/5">
                  <h3 className="text-sm font-serif font-bold text-brand-dark uppercase tracking-widest flex items-center gap-2">
                     <FiEdit3 className="text-brand-gold" /> Refine Profile Details
                  </h3>
                  <button onClick={() => setIsEditingProfile(false)} className="text-gray-300 hover:text-brand-dark p-2 font-bold"><FiX size={16} /></button>
                </div>
                <form onSubmit={handleProfileUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[8px] font-bold text-gray-400 uppercase tracking-widest pl-1">Display Name</label>
                    <input type="text" value={profileForm.name} onChange={(e) => setProfileForm({...profileForm, name: e.target.value})} className="w-full bg-brand-light/10 border border-brand-pink/10 p-3 text-[10px] font-medium outline-none focus:border-brand-pink transition-all uppercase" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[8px] font-bold text-gray-400 uppercase tracking-widest pl-1">Secure Email</label>
                    <input type="email" value={profileForm.email} onChange={(e) => setProfileForm({...profileForm, email: e.target.value})} className="w-full bg-brand-light/10 border border-brand-pink/10 p-3 text-[10px] font-medium outline-none focus:border-brand-pink transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[8px] font-bold text-gray-400 uppercase tracking-widest pl-1">Active Password</label>
                    <input type="text" value={profileForm.password} onChange={(e) => setProfileForm({...profileForm, password: e.target.value})} className="w-full bg-brand-light/10 border border-brand-pink/10 p-3 text-[10px] font-medium outline-none focus:border-brand-pink transition-all" />
                  </div>
                  <div className="flex items-end justify-end gap-3 mt-4 md:col-span-2">
                    <button type="button" onClick={() => setIsEditingProfile(false)} className="text-[9px] font-bold uppercase text-gray-400 hover:text-brand-dark tracking-widest">Discard</button>
                    <button type="submit" className="bg-brand-dark text-white px-8 py-3 rounded-none text-[9px] font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all flex items-center gap-2">
                      <FiSave /> Save Identity
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="bg-white rounded-none border border-brand-pink/10 shadow-md p-5 pb-8 relative group"
              >
                <div className="flex justify-between items-center mb-6 border-b border-brand-pink/5 pb-4">
                  <h3 className="text-[10px] font-serif font-bold text-brand-dark uppercase tracking-widest leading-none flex items-center gap-2">
                    <FiUser className="text-brand-pink" size={12} /> Account Profile
                  </h3>
                  <button 
                    onClick={() => setIsEditingProfile(true)}
                    className="bg-brand-pink/5 text-brand-pink px-4 py-2 rounded-none text-[9px] font-bold uppercase tracking-widest hover:bg-brand-pink hover:text-white transition-all flex items-center gap-2 border border-brand-pink/10"
                  >
                    <FiEdit3 size={11} /> Edit Profile
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Display Name</p>
                    <p className="text-[11px] font-medium text-brand-dark uppercase tracking-tight">{adminInfo.name}</p>
                  </div>
                  <div>
                    <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Authority Role</p>
                    <div className="flex items-center gap-1.5">
                      <p className="text-[11px] font-medium text-brand-dark uppercase tracking-tight">{adminInfo.role}</p>
                      <FiCheck className="text-green-500" size={10} />
                    </div>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Secure Email</p>
                    <p className="text-[11px] font-medium text-brand-dark lowercase overflow-hidden text-ellipsis whitespace-nowrap">{adminInfo.email}</p>
                  </div>
                  <div>
                    <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Active Password</p>
                    <p className="text-[11px] font-medium text-brand-dark tracking-wide">{adminInfo.password}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {renderSecurityView()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
