import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiGrid, 
  FiShoppingBag, 
  FiUsers, 
  FiLayers, 
  FiImage, 
  FiSettings, 
  FiLogOut,
  FiBell,
  FiSearch
} from 'react-icons/fi';

const AdminLayout = ({ children }) => {
  const location = useLocation();

  const menuItems = [
    { title: 'Dashboard', path: '/admin', icon: <FiGrid /> },
    { title: 'Products', path: '/admin/products', icon: <FiShoppingBag /> },
    { title: 'Categories', path: '/admin/categories', icon: <FiLayers /> },
    { title: 'Customers', path: '/admin/customers', icon: <FiUsers /> },
    { title: 'Banners', path: '/admin/banners', icon: <FiImage /> },
    { title: 'Settings', path: '/admin/settings', icon: <FiSettings /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#FDFCFB]">
      {/* Sidebar */}
      <aside className="w-56 bg-[#2D161D] text-white hidden md:flex flex-col fixed h-screen z-50">
        <div className="p-6">
          <h2 className="text-lg font-decorative font-black text-brand-gold uppercase tracking-[0.2em] mb-1">
            Soundarya
          </h2>
          <p className="text-[8px] text-gray-400 tracking-[0.3em] uppercase font-bold opacity-60">Admin Portal</p>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 group ${
                location.pathname === item.path 
                ? 'bg-brand-gold text-white shadow-md shadow-brand-gold/10' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className={`text-base transition-transform duration-300 ${location.pathname === item.path ? '' : 'group-hover:scale-110'}`}>
                {item.icon}
              </span>
              <span className="text-[10px] font-black tracking-[0.1em] uppercase">{item.title}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-white/5">
          <Link to="/" className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white transition-colors group">
            <FiLogOut className="text-base group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black tracking-[0.1em] uppercase text-gray-500 group-hover:text-white">Exit Portal</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-56 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white/70 backdrop-blur-md border-b border-gray-50 flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center gap-3 bg-gray-50/50 px-3 py-1.5 rounded-lg w-56 md:w-80 border border-gray-100">
            <FiSearch className="text-gray-300" size={14} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none text-[11px] w-full font-bold uppercase tracking-wider text-brand-dark placeholder:text-gray-300"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-1.5 text-gray-300 hover:text-brand-dark transition-colors">
              <FiBell size={16} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-brand-pink rounded-full border border-white"></span>
            </button>
            <div className="w-[1px] h-6 bg-gray-100"></div>
            <div className="flex items-center gap-2.5">
              <div className="text-right hidden sm:block">
                <p className="text-[9px] font-black text-brand-dark uppercase tracking-widest">Trisha Mishra</p>
                <p className="text-[8px] text-brand-pink font-black uppercase tracking-tighter opacity-70">Super Admin</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20 text-brand-gold text-[10px] font-black shadow-inner">
                TM
              </div>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
