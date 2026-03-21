import React from 'react';
import { motion } from 'framer-motion';
import AdminLayout from './AdminLayout';
import { 
  FiArrowUpRight, 
  FiPackage, 
  FiUsers, 
  FiLayers, 
  FiImage,
  FiPlus,
  FiMoreVertical,
  FiLogOut
} from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { initialProducts } from '../../data/products';
import catSkincare from '../../assets/images/cat_skincare_new.png';
import catHaircare from '../../assets/images/cat_haircare_new.png';
import catMakeup from '../../assets/images/cat_makeup_new.png';
import catSoaps from '../../assets/images/cat_soaps.png';
import catJewellery from '../../assets/images/cat_jewellery.png';
import catInnerwear from '../../assets/images/cat_innerwear.png';
import catWellness from '../../assets/images/cat_wellness_new.png';
import catBeautyKits from '../../assets/images/cat_beautykits_new.png';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useShop();

  const categories = [
    { id: 'Skincare', name: 'Skincare', image: catSkincare },
    { id: 'Soaps', name: 'Soaps', image: catSoaps },
    { id: 'Makeup', name: 'Makeup', image: catMakeup },
    { id: 'Jewellery', name: 'Jewellery', image: catJewellery },
    { id: 'Innerwear', name: 'Innerwear', image: catInnerwear },
    { id: 'Haircare', name: 'Haircare', image: catHaircare },
    { id: 'Wellness', name: 'Wellness', image: catWellness },
    { id: 'Combos', name: 'Combos', image: catBeautyKits },
  ];

  const handleExport = () => {
    alert('Generating Inventory Vault Report... Download starting soon.');
  };

  const handleExit = () => {
    if (window.confirm('Securely terminating admin session. Proceed to exit?')) {
      setIsAuthenticated(false);
      setUser(null);
      navigate('/admin/login');
    }
  };

  const recentOrders = [
    { id: '#8821', customer: 'Ananya Sharma', product: initialProducts[0].name, date: '2 mins ago', status: 'Processing', amount: `₹${initialProducts[0].price}` },
    { id: '#8820', customer: 'Rahul Verma', product: initialProducts[1].name, date: '15 mins ago', status: 'Shipped', amount: `₹${initialProducts[1].price}` },
    { id: '#8819', customer: 'Priya Patel', product: initialProducts[2].name, date: '1 hour ago', status: 'Delivered', amount: `₹${initialProducts[2].price}` },
    { id: '#8818', customer: 'Sneha Gupta', product: initialProducts[3].name, date: '3 hours ago', status: 'Pending', amount: `₹${initialProducts[3].price}` },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Compact Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-serif font-black text-brand-dark uppercase tracking-widest leading-none mb-1">
            Store Control Center
          </h1>
          <p className="text-gray-400 text-[9px] font-medium uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="w-6 h-[1px] bg-brand-pink/30" /> Real-time Catalog Tracking
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={handleExport}
            className="hidden md:block bg-white text-brand-dark px-3 mt-1 py-1.5 rounded-none text-[9px] font-bold uppercase tracking-widest border border-brand-pink/10 hover:shadow-md transition-all"
          >
            Export
          </button>
          <button 
            onClick={handleExit}
            className="bg-red-50 text-red-600 px-3 py-1.5 mt-1 rounded-none text-[9px] font-bold uppercase tracking-widest border border-red-100 hover:bg-red-500 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shadow-red-500/10"
          >
            <FiLogOut size={12} /> Exit
          </button>
          <Link to="/admin/products?add=true" className="bg-brand-dark text-white px-3 py-1.5 mt-1 rounded-none text-[9px] font-bold uppercase tracking-widest shadow-lg shadow-brand-dark/10 flex items-center gap-1.5 hover:bg-black transition-all cursor-pointer">
            <FiPlus size={12} /> Entry
          </Link>
        </div>
      </div>

      {/* Stats Grid - Compacted */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Products', value: '1,280', change: '+12%', icon: <FiPackage />, link: '/admin/products' },
          { title: 'Registered Users', value: '24,500', change: '+18%', icon: <FiUsers />, link: '/admin/users' },
          { title: 'Categories', value: '12', change: '8 Active', icon: <FiLayers />, link: '/admin/categories' },
          { title: 'Live Banners', value: '6', change: '4 Active', icon: <FiImage />, link: '/admin/banners' }
        ].map((stat, i) => (
          <Link to={stat.link} key={i}>
            <motion.div 
              whileHover={{ y: -2 }}
              className="bg-white p-3 rounded-none border border-brand-pink/10 shadow-sm group cursor-pointer transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-brand-light/50 text-brand-dark rounded-none group-hover:bg-brand-pink group-hover:text-white transition-colors">
                  {React.cloneElement(stat.icon, { size: 14 })}
                </div>
                <span className="text-[7px] font-bold text-green-600 bg-green-50 px-1 py-0.5 rounded-none border border-green-100">{stat.change}</span>
              </div>
              <h3 className="text-[8px] font-medium text-gray-400 uppercase tracking-widest leading-none mb-1">{stat.title}</h3>
              <p className="text-lg font-serif font-black text-brand-dark tracking-tight">{stat.value}</p>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Categories Directory Section - Compacted */}
      <div className="bg-white/60 p-3 rounded-none border border-brand-pink/10 shadow-sm">
        <h3 className="text-[9px] font-serif font-black text-brand-dark uppercase tracking-widest mb-3 flex items-center gap-2">
          <FiLayers size={10} className="text-brand-gold" /> Store Categories
        </h3>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {categories.map((cat) => (
            <Link to="/admin/categories" key={cat.id} className="flex flex-col items-center group cursor-pointer text-center">
              <div className="w-12 h-12 rounded-none overflow-hidden mb-1 border border-brand-pink/10 group-hover:border-brand-pink transition-all shadow-md bg-white relative">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" />
              </div>
              <span className="text-[7px] font-bold text-brand-dark group-hover:text-brand-pink uppercase truncate w-full tracking-tighter">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Catalog View - Compacted */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-none border border-brand-pink/10 shadow-xl shadow-brand-pink/[0.01] overflow-hidden">
            <div className="p-2 border-b border-brand-pink/5 flex justify-between items-center bg-brand-light/30">
              <h3 className="text-[9px] font-serif font-bold text-brand-dark uppercase tracking-widest uppercase">Active Inventory</h3>
              <span className="px-1.5 py-0.5 bg-brand-pink/10 text-brand-pink text-[6px] font-bold uppercase rounded-none border border-brand-pink/20">
                {initialProducts.length} Items
              </span>
            </div>
            
            <div className="p-3 grid grid-cols-2 md:grid-cols-3 gap-3">
              {initialProducts.slice(0, 6).map((product) => (
                <div key={product.id} className="flex flex-col gap-2 bg-brand-light/10 p-2 rounded-none border border-brand-pink/10 hover:border-brand-pink/30 hover:shadow-md transition-all group overflow-hidden relative">
                  <div className="w-full aspect-square bg-white rounded-none overflow-hidden shrink-0 border border-brand-pink/5 shadow-inner">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-start">
                    <p className="text-[9px] font-bold text-brand-dark uppercase truncate leading-tight mb-1">{product.name}</p>
                    <div className="flex items-center justify-between mt-auto">
                       <span className="text-brand-pink font-bold text-[10px]">₹{product.price}</span>
                       <span className="text-[6px] text-gray-400 font-medium uppercase tracking-tighter">{product.category}</span>
                    </div>
                  </div>
                  {product.flashSale && <div className="absolute top-0 right-0 bg-brand-gold text-brand-dark text-[5px] font-bold px-1 py-0.5 rounded-none uppercase tracking-widest">Sale</div>}
                </div>
              ))}
            </div>
            
            <div className="p-2 bg-brand-light/10 border-t border-brand-pink/5 text-center">
              <Link to="/admin/products" className="text-[8px] font-bold uppercase tracking-widest text-brand-pink hover:text-brand-dark transition-all flex items-center justify-center mx-auto gap-1">
                Full Catalog <FiArrowUpRight />
              </Link>
            </div>
          </div>

          {/* Sales Analytics */}
          <div className="bg-white rounded-none border border-brand-pink/10 shadow-xl shadow-brand-pink/[0.02] overflow-hidden">
             <div className="p-4 border-b border-brand-pink/5 flex items-center justify-between bg-white">
                <div>
                  <h2 className="text-[10px] font-serif font-black text-brand-dark uppercase tracking-widest leading-none mb-1">Revenue Stream</h2>
                  <p className="text-[8px] text-gray-400 font-medium uppercase tracking-tighter opacity-70">Weekly sales analytics</p>
                </div>
                <div className="flex items-center gap-2 text-[8px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-none border border-green-100 uppercase tracking-widest">
                  <FiArrowUpRight size={10} /> Live Data
                </div>
             </div>
             <div className="p-6">
                <div className="h-40 w-full relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 700 160">
                    {[0, 40, 80, 120, 160].map(y => (
                      <line key={y} x1="0" y1={y} x2="700" y2={y} stroke="#FBD5DA" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
                    ))}
                    <motion.polyline
                      fill="none" stroke="#E8B4B8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
                      points="0,120 100,60 200,90 300,30 400,70 500,20 600,50 700,40"
                      initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 2, ease: "easeInOut" }}
                    />
                    {[
                      { x: 0, v: 120, l: 'Mon' }, { x: 100, v: 60, l: 'Tue' }, { x: 200, v: 90, l: 'Wed' }, 
                      { x: 300, v: 30, l: 'Thu' }, { x: 400, v: 70, l: 'Fri' }, { x: 500, v: 20, l: 'Sat' }, 
                      { x: 600, v: 50, l: 'Sun' }, { x: 700, v: 40, l: 'Next' }
                    ].map((p, i) => (
                      <g key={i}>
                        <motion.circle 
                          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 + 1 }}
                          cx={p.x} cy={p.v} r="4" fill="white" stroke="#5C2E3E" strokeWidth="2" 
                        />
                        <text x={p.x} y="180" textAnchor="middle" className="text-[12px] fill-gray-400 font-medium uppercase tracking-tighter">{p.l}</text>
                      </g>
                    ))}
                  </svg>
                </div>
             </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-none border border-brand-pink/10 shadow-xl shadow-brand-pink/[0.01] overflow-hidden">
             <div className="p-4 border-b border-brand-pink/5 bg-gray-50/20 flex items-center justify-between">
                <h3 className="text-[10px] font-serif font-black text-brand-dark uppercase tracking-widest">Recent Sales</h3>
                <button className="text-gray-300 hover:text-brand-dark"><FiMoreVertical size={14}/></button>
             </div>
             <div className="overflow-x-auto">
              <table className="w-full text-left">
                <tbody className="divide-y divide-brand-pink/5">
                  {[
                    ...recentOrders,
                    { id: '#8817', customer: 'Meera Das', product: 'Silk Soap Set', date: '5 hours ago', status: 'Shipped', amount: '₹1,250' },
                    { id: '#8816', customer: 'Vikram Singh', product: 'Kajal Duo', date: '12 hours ago', status: 'Delivered', amount: '₹890' },
                    { id: '#8815', customer: 'Kavita Iyer', product: 'Hair Oil', date: '1 day ago', status: 'Processing', amount: '₹450' }
                  ].map((order) => (
                    <tr key={order.id} className="hover:bg-brand-pink/[0.02] transition-colors group">
                      <td className="px-5 py-2.5">
                        <p className="text-[9px] font-medium text-brand-dark opacity-50">{order.id}</p>
                      </td>
                      <td className="px-5 py-2.5">
                        <p className="text-[10px] font-bold text-brand-dark leading-none mb-1">{order.customer}</p>
                        <p className="text-[8px] text-brand-pink font-medium truncate uppercase opacity-70">{order.product}</p>
                      </td>
                      <td className="px-3 py-2">
                        <span className={`text-[7px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-none border ${
                          order.status === 'Delivered' ? 'bg-green-50 border-green-100 text-green-600' :
                          order.status === 'Shipped' ? 'bg-blue-50 border-blue-100 text-blue-600' :
                          'bg-brand-light/30 border-brand-pink/10 text-brand-dark'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-[10px] font-bold text-brand-dark text-right">
                        {order.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Quick Stats Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-3 rounded-none border border-brand-pink/10 shadow-xl overflow-hidden">
             <div className="flex justify-between items-center mb-2">
                <h3 className="text-[10px] font-serif font-black text-brand-dark uppercase tracking-widest">Growth Trend</h3>
                <span className="text-[8px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-none">+15%</span>
             </div>
             <div className="h-20 w-full relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60">
                  <motion.path
                    d="M0,50 Q40,40 80,10 T150,30 T200,5" fill="none" stroke="#E8B4B8" strokeWidth="3" strokeLinecap="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  <motion.path d="M0,50 Q40,40 80,10 T150,30 T200,5 V60 H0 Z" fill="url(#gradient-side)" initial={{ opacity: 0 }} animate={{ opacity: 0.1 }} transition={{ delay: 0.5 }} />
                  <defs><linearGradient id="gradient-side" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#E8B4B8" /><stop offset="100%" stopColor="transparent" /></linearGradient></defs>
                </svg>
             </div>
             <p className="text-[8px] text-gray-400 font-medium uppercase tracking-widest mt-2 text-center">Engagement last 30 days</p>
          </div>

          <div className="bg-brand-dark text-white p-4 rounded-none shadow-xl border border-brand-pink/10">
            <h3 className="text-[10px] font-serif font-black uppercase tracking-[0.25em] text-brand-gold mb-3 border-b border-white/5 pb-2">Product Distribution</h3>
            <div className="space-y-3">
              {[
                { name: 'Skincare', sales: '85%', color: 'bg-brand-pink' },
                { name: 'Soaps', sales: '65%', color: 'bg-brand-gold' },
                { name: 'Makeup', sales: '45%', color: 'bg-white/40' },
                { name: 'Jewellery', sales: '30%', color: 'bg-brand-pink/60' },
                { name: 'Haircare', sales: '55%', color: 'bg-brand-gold/60' }
              ].map((cat) => (
                <div key={cat.name}>
                  <div className="flex justify-between text-[10px] font-medium uppercase tracking-wider mb-1.5 opacity-90">
                    <span>{cat.name}</span>
                    <span className="text-brand-gold">{cat.sales}</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-none overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: cat.sales }} transition={{ duration: 1 }} className={`h-full ${cat.color}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 rounded-none border border-brand-pink/10 shadow-xl overflow-hidden relative">
            <div className="flex justify-between items-center mb-4 text-brand-dark">
              <Link to="/admin/banners" className="text-[10px] font-serif font-black uppercase tracking-widest hover:text-brand-pink transition-colors">Banner Wall</Link>
              <FiImage className="text-brand-gold" size={12} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((b) => (
                <Link to="/admin/banners" key={b} className="aspect-[4/3] bg-brand-light/30 rounded-none overflow-hidden border border-brand-pink/5 group cursor-pointer relative block">
                  <img src={`/banner_${b % 3 + 1}.png`} alt="B" className="w-full h-full object-cover group-hover:scale-110 transition-all opacity-80" />
                  <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <span className="text-[7px] text-white font-bold uppercase tracking-widest bg-brand-dark/60 px-2 py-1 rounded">Manage</span>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/admin/banners" className="w-full block text-center mt-4 py-2.5 text-[8px] font-bold uppercase tracking-[0.2em] text-brand-pink hover:text-brand-gold transition-colors border border-brand-pink/10 rounded-none bg-brand-pink/5">
              Manage Banners
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
