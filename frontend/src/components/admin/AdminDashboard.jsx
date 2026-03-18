import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from './AdminLayout';
import { 
  FiArrowUpRight, 
  FiPackage, 
  FiUsers, 
  FiLayers, 
  FiImage,
  FiPlus,
  FiMoreVertical
} from 'react-icons/fi';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { title: 'Total Products', value: '1,248', change: '+12%', icon: <FiPackage />, color: 'bg-blue-500' },
    { title: 'Registered Users', value: '8,420', change: '+5%', icon: <FiUsers />, color: 'bg-purple-500' },
    { title: 'Categories', value: '24', change: '0%', icon: <FiLayers />, color: 'bg-brand-gold' },
    { title: 'Active Banners', value: '5', change: '+2', icon: <FiImage />, color: 'bg-brand-pink' },
  ];

  const recentOrders = [
    { id: '#8821', customer: 'Ananya Sharma', product: 'Silk Radiance Cream', date: '2 mins ago', status: 'Processing', amount: '₹1,250' },
    { id: '#8820', customer: 'Rahul Verma', product: 'Gold Glow Serum', date: '15 mins ago', status: 'Shipped', amount: '₹2,400' },
    { id: '#8819', customer: 'Priya Patel', product: 'Organic Face Wash', date: '1 hour ago', status: 'Delivered', amount: '₹850' },
    { id: '#8818', customer: 'Sneha Gupta', product: 'Bridal Kit Premium', date: '3 hours ago', status: 'Pending', amount: '₹5,600' },
  ];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-decorative font-black text-brand-dark uppercase tracking-tight mb-1">
              Dashboard Overview
            </h1>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Store performance metrics</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="bg-white text-brand-dark px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest border border-brand-pink/10 shadow-sm hover:bg-gray-50 transition-all">
              Export
            </button>
            <button className="bg-brand-dark text-white px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg shadow-brand-dark/10 flex items-center gap-2 hover:bg-black transition-all">
              <FiPlus /> Add New
            </button>
          </div>
        </div>

        {/* Compact Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white p-4 rounded-xl border border-brand-pink/5 shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-3">
                <div className={`${stat.color} p-2 rounded-lg text-white shadow-sm opacity-80 group-hover:opacity-100 transition-opacity`}>
                  {React.cloneElement(stat.icon, { size: 14 })}
                </div>
                <div className="flex items-center text-[8px] font-black text-green-500 bg-green-50 px-1.5 py-0.5 rounded">
                  {stat.change} <FiArrowUpRight className="ml-0.5" />
                </div>
              </div>
              <p className="text-gray-400 text-[8px] font-black uppercase tracking-[0.2em] mb-0.5">{stat.title}</p>
              <p className="text-xl font-serif font-black text-brand-dark">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Table Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-brand-pink/5 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-[#FDFCFB]">
                <h3 className="text-xs font-decorative font-black text-[#5C2E3E] uppercase tracking-wider">Recent Orders</h3>
                <button className="text-gray-300 hover:text-brand-dark"><FiMoreVertical /></button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/30">
                      <th className="px-5 py-3 text-[8px] font-black uppercase tracking-widest text-gray-400">Order</th>
                      <th className="px-5 py-3 text-[8px] font-black uppercase tracking-widest text-gray-400">Customer</th>
                      <th className="px-5 py-3 text-[8px] font-black uppercase tracking-widest text-gray-400">Status</th>
                      <th className="px-5 py-3 text-[8px] font-black uppercase tracking-widest text-gray-400">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-brand-pink/[0.02] transition-colors group">
                        <td className="px-5 py-3">
                          <p className="text-[11px] font-black text-brand-dark">{order.id}</p>
                          <p className="text-[9px] text-gray-400 font-medium">{order.date}</p>
                        </td>
                        <td className="px-5 py-3">
                          <p className="text-[11px] font-bold text-brand-dark">{order.customer}</p>
                          <p className="text-[9px] text-gray-400 font-medium">{order.product}</p>
                        </td>
                        <td className="px-5 py-3">
                          <span className={`text-[7px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                            order.status === 'Delivered' ? 'bg-green-50 text-green-600' :
                            order.status === 'Processing' ? 'bg-blue-50 text-blue-600' :
                            order.status === 'Shipped' ? 'bg-purple-50 text-purple-600' :
                            'bg-yellow-50 text-yellow-600'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-[11px] font-black text-brand-dark">
                          {order.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="p-3 bg-gray-50/20 border-t border-gray-50 text-center">
                <button className="text-[8px] font-black uppercase tracking-widest text-brand-gold hover:text-brand-dark transition-colors">
                  Full Order History
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats / Management Area */}
          <div className="space-y-4">
            {/* Category Performance */}
            <div className="bg-[#1A1A1A] text-white p-5 rounded-xl shadow-lg relative group overflow-hidden">
              <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-gold mb-5 relative z-10">Categories Performance</h3>
              <div className="space-y-4 relative z-10">
                {[
                  { name: 'Skincare', sales: '₹42K', color: 'bg-brand-pink', width: '85%' },
                  { name: 'Makeup', sales: '₹28K', color: 'bg-brand-gold', width: '65%' },
                  { name: 'Wellness', sales: '₹12K', color: 'bg-white/20', width: '35%' }
                ].map((cat) => (
                  <div key={cat.name}>
                    <div className="flex justify-between text-[10px] font-bold uppercase mb-1.5 opacity-80">
                      <span>{cat.name}</span>
                      <span className="text-brand-gold">{cat.sales}</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full ${cat.color} rounded-full`} style={{ width: cat.width }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Banner Preview Card */}
            <div className="bg-white p-5 rounded-xl border border-brand-pink/5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[8px] font-black uppercase tracking-widest text-gray-400 font-sans">Brand Banners</h3>
                <span className="text-[7px] bg-brand-pink text-white px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">Live</span>
              </div>
              <div className="space-y-2.5">
                {[1, 2].map((b) => (
                  <div key={b} className="flex gap-3 items-center bg-gray-50/50 p-2 rounded-lg group cursor-pointer hover:bg-brand-pink/[0.05] transition-colors border border-transparent hover:border-brand-pink/10">
                    <div className="w-10 h-10 bg-gray-100 rounded-md overflow-hidden shrink-0">
                      <img src={`https://picsum.photos/seed/${b+50}/100/100`} alt="Banner" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-black text-brand-dark uppercase truncate">Carousel {b}</p>
                      <p className="text-[7px] text-gray-400 font-bold uppercase tracking-widest">Active</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-[8px] font-black uppercase tracking-[0.2em] text-[#5C2E3E]/40 border border-dashed border-gray-200 rounded-lg hover:border-brand-gold hover:text-brand-gold transition-all">
                Update Carousel
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
