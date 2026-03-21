import React, { useState } from 'react';
import { Link, useLocation, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { 
  FiGrid, 
  FiShoppingBag, 
  FiUsers, 
  FiLayers, 
  FiImage, 
  FiSettings, 
  FiLogOut,
  FiBell,
  FiSearch,
  FiTrendingUp,
  FiMenu,
  FiX
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, setUser, user } = useShop();

  // Route protection
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  React.useEffect(() => {
    // Close sidebar automatically when navigating on mobile
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [location]);

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New order #8821 received', time: '5m ago' },
    { id: 2, text: 'Product "Lakme Face Powder" low in stock', time: '1h ago' }
  ]);

  const removeNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
    if (notifications.length <= 1) setIsNotificationsOpen(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    if (window.confirm('Securely terminating admin session. Proceed to exit?')) {
      setIsAuthenticated(false);
      setUser(null);
      navigate('/admin/login');
    }
  };

  const menuItems = [
    { title: 'Dashboard', path: '/admin', icon: <FiGrid /> },
    { title: 'Products', path: '/admin/products', icon: <FiShoppingBag /> },
    { title: 'Categories', path: '/admin/categories', icon: <FiLayers /> },
    { title: 'Users', path: '/admin/users', icon: <FiUsers /> },
    { title: 'Orders', path: '/admin/orders', icon: <FiShoppingBag /> },
    { title: 'Finance', path: '/admin/finance', icon: <FiTrendingUp /> },
    { title: 'Banners', path: '/admin/banners', icon: <FiImage /> },
    { title: 'Settings', path: '/admin/settings', icon: <FiSettings /> },
  ];

  return (
    <div className="flex min-h-screen bg-brand-light font-['Inter',_sans-serif] overflow-x-hidden">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-[#5C2E3E]/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Persistent and Toggleable */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside 
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-56 bg-[#FBD5DA] text-[#5C2E3E] flex flex-col fixed h-screen z-50 border-r border-brand-pink/5"
          >
            <div className="p-4 border-b border-brand-pink/10 relative">
              <Link to="/admin" className="flex items-center gap-2.5 group">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-12 w-auto transition-all logo-blend group-hover:scale-105"
                />
                <div className="flex flex-col leading-tight">
                  <h2 className="text-[13px] font-serif font-bold text-[#5C2E3E] uppercase tracking-[0.12em]">
                    <span style={{ fontFamily: "'Cinzel Decorative', serif" }}>Soundarya</span>
                  </h2>
                  <span className="text-[8px] text-[#5C2E3E] opacity-70 font-medium uppercase tracking-[0.4em]" style={{ fontFamily: "'Cinzel', serif" }}>
                    Shrinagar
                  </span>
                </div>
              </Link>
            </div>

            <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto no-scrollbar">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-none transition-all duration-300 group relative overflow-hidden ${
                    location.pathname === item.path 
                    ? 'bg-[#5C2E3E] text-white font-bold' 
                    : 'text-[#5C2E3E]/70 hover:bg-white/40 hover:text-[#5C2E3E] hover:pl-5'
                  }`}
                >
                  <div className={`transition-all duration-300 ${location.pathname === item.path ? 'scale-110' : 'group-hover:scale-110 opacity-70 group-hover:opacity-100'}`}>
                    {React.cloneElement(item.icon, { size: 14 })}
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.05em] uppercase">{item.title}</span>
                  {location.pathname !== item.path && (
                    <div className="absolute left-0 w-1 h-full bg-[#5C2E3E] -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                  )}
                </Link>
              ))}
            </nav>

            <div className="p-4 mt-auto border-t border-brand-pink/10 bg-white/10 text-center">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-[#5C2E3E]/60 hover:text-red-500 transition-all group rounded-none hover:bg-white/40"
              >
                <FiLogOut className="text-sm group-hover:-translate-x-1 transition-transform" />
                <span className="text-[8px] font-bold tracking-[0.15em] uppercase">Exit Portal</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-56' : 'ml-0'}`}>
        {/* Header - Premium Navigation */}
        <header className="h-12 bg-white/80 backdrop-blur-xl border-b border-brand-pink/5 flex items-center justify-between px-4 sticky top-0 z-40 transition-all">
          <div className="flex items-center gap-4">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsSidebarOpen(!isSidebarOpen);
              }}
              className="p-2 text-brand-dark hover:bg-brand-light rounded-none transition-all border border-brand-pink/5"
            >
              <FiMenu size={18} />
            </button>
            <div className="hidden lg:flex items-center gap-2 bg-brand-light/50 px-4 py-1.5 rounded-none w-56 lg:w-80 border border-brand-pink/10 group focus-within:border-brand-pink/30 transition-all">
              <FiSearch className="text-brand-pink/50 group-focus-within:text-brand-pink" size={12} />
              <input 
                type="text" 
                placeholder="GLOBAL SEARCH (SKU, CUSTOMER...)" 
                className="bg-transparent border-none outline-none text-[9px] w-full font-medium uppercase tracking-wider text-brand-dark placeholder:text-gray-300"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`relative p-1.5 transition-all ${isNotificationsOpen ? 'text-brand-pink' : 'text-gray-400 hover:text-brand-pink'}`}
              >
                <FiBell size={14} />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-brand-pink rounded-none border border-white"></span>
                )}
              </button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-64 bg-white border border-brand-pink/10 shadow-2xl z-50 rounded-none overflow-hidden"
                  >
                    <div className="p-3 bg-brand-light/30 border-b border-brand-pink/5 flex items-center justify-between">
                      <span className="text-[8px] font-black uppercase tracking-widest text-brand-dark">Security Alerts</span>
                      <span className="text-[6px] bg-brand-pink text-white px-1.5 py-0.5 rounded-none uppercase">{notifications.length} NEW</span>
                    </div>
                    <div className="max-h-60 overflow-y-auto no-scrollbar">
                      {notifications.length > 0 ? (
                        notifications.map((n) => (
                          <div key={n.id} className="p-3 border-b border-brand-pink/[0.02] hover:bg-brand-light/10 transition-colors group">
                            <p className="text-[9px] text-brand-dark font-medium leading-tight mb-1">{n.text}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-[7px] text-gray-400 uppercase tracking-tighter">{n.time}</span>
                              <button 
                                onClick={() => removeNotification(n.id)}
                                className="text-[7px] font-black text-brand-pink uppercase tracking-widest hover:underline"
                              >
                                Mark Read
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-10 text-center">
                          <p className="text-[8px] text-gray-400 uppercase tracking-[0.2em]">Secure Archive Clear</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="w-[1px] h-6 bg-brand-pink/10 hidden sm:block"></div>
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/admin/settings')}>
              <div className="text-right hidden sm:block">
                <p className="text-[9px] font-bold text-brand-dark uppercase tracking-widest leading-none mb-0.5">{user?.name || 'Trisha Mishra'}</p>
                <p className="text-[6px] text-brand-pink font-bold uppercase tracking-tighter opacity-70">{user?.role || 'Super Admin Control'}</p>
              </div>
              <div className="w-9 h-9 rounded-md bg-brand-dark flex items-center justify-center text-brand-gold text-[11px] font-bold shadow-lg transition-transform group-hover:scale-105">
                {user?.name ? user.name.substring(0, 2).toUpperCase() : 'TM'}
              </div>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <main className="p-3 md:p-4 min-h-[calc(100vh-48px)] bg-[#FAF7F8] relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
