import React from 'react';
import { useShop } from '../../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiPhone, FiMail, FiMapPin, FiShoppingBag, FiHeart, FiLogOut, FiEdit2 } from 'react-icons/fi';

const Profile = () => {
  const { user, isAuthenticated, setIsAuthenticated, setUser } = useShop();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = React.useState(false);
  const [editForm, setEditForm] = React.useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  React.useEffect(() => {
    if (!isAuthenticated) navigate('/login');
    if (user) {
      setEditForm({
        name: user.name,
        email: user.email,
        phone: user.phone
      });
    }
  }, [isAuthenticated, navigate, user]);

  if (!user) return null;

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  const handleSave = () => {
    setUser({ ...user, ...editForm });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-serif font-black text-[#5C2E3E] uppercase tracking-tighter mb-8 border-b border-gray-100 pb-4">
          Your <span className="text-brand-pink italic">Sanctuary</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main User Card */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-[2rem] p-8 text-center border border-gray-100 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-32 bg-brand-pink/10 -z-10 group-hover:bg-brand-pink/20 transition-colors"></div>
              
              <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-md mx-auto mb-4 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-[#5C2E3E] rounded-full flex items-center justify-center">
                  <span className="text-3xl font-serif text-brand-gold italic">
                    {editForm.name ? editForm.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                {!isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="absolute bottom-0 right-0 p-1.5 bg-brand-gold text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform"
                  >
                    <FiEdit2 size={10} />
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4 mb-4">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full text-center font-serif font-bold text-[#5C2E3E] border-b border-brand-pink/30 focus:border-brand-pink outline-none bg-transparent py-1"
                    placeholder="Full Name"
                  />
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Editing Profile</p>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-serif font-bold text-[#5C2E3E] mb-1">{user?.name}</h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">VIP Member</p>
                </>
              )}
              
              <div className="space-y-4 text-left border-t border-gray-100 pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F9F6F4] flex items-center justify-center text-[#5C2E3E]">
                    <FiPhone size={14} />
                  </div>
                  <div>
                    <span className="block text-[8px] font-black uppercase tracking-widest text-[#5C2E3E]/50">Mobile</span>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="text-xs font-bold text-brand-dark border-b border-brand-pink/20 focus:border-brand-pink outline-none bg-transparent w-full"
                      />
                    ) : (
                      <span className="text-xs font-bold text-brand-dark">+91 {user?.phone}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F9F6F4] flex items-center justify-center text-[#5C2E3E]">
                    <FiMail size={14} />
                  </div>
                  <div>
                    <span className="block text-[8px] font-black uppercase tracking-widest text-[#5C2E3E]/50">Email</span>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="text-xs font-bold text-brand-dark border-b border-brand-pink/20 focus:border-brand-pink outline-none bg-transparent w-full"
                      />
                    ) : (
                      <span className="text-xs font-bold text-brand-dark">{user?.email}</span>
                    )}
                  </div>
                </div>
              </div>

              {isEditing ? (
                <div className="grid grid-cols-2 gap-2 mt-8">
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="py-3 bg-gray-50 text-gray-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    className="py-3 bg-[#5C2E3E] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-pink shadow-lg shadow-brand-pink/20 transition-all"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleLogout}
                  className="w-full mt-8 py-3 bg-red-50 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                >
                  <FiLogOut /> Logout
                </button>
              )}
            </div>
          </div>

          {/* Quick Stats & Details */}
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4 hover:border-brand-pink/30 hover:shadow-lg transition-all cursor-pointer">
                <div className="w-12 h-12 bg-brand-pink/10 rounded-full flex items-center justify-center text-brand-pink">
                  <FiShoppingBag size={20} />
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400">Total Orders</span>
                  <span className="text-2xl font-serif text-[#5C2E3E] font-bold">12</span>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4 hover:border-brand-pink/30 hover:shadow-lg transition-all cursor-pointer">
                <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold">
                  <FiHeart size={20} />
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400">Wishlist</span>
                  <span className="text-2xl font-serif text-[#5C2E3E] font-bold">24</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#5C2E3E] flex items-center gap-2">
                  <FiMapPin /> Saved Addresses
                </h3>
                <button className="text-[9px] font-black uppercase tracking-widest text-brand-pink border-b border-brand-pink hover:text-[#5C2E3E] hover:border-[#5C2E3E] transition-colors">
                  Add New
                </button>
              </div>

              <div className="border border-brand-pink/20 bg-brand-pink/5 rounded-xl p-5 relative">
                <div className="absolute top-4 right-4 text-[9px] font-black uppercase tracking-widest text-[#5C2E3E] bg-white px-2 py-0.5 rounded-full shadow-sm">
                  Primary
                </div>
                <h4 className="font-bold text-[#5C2E3E] mb-1">{user?.name}</h4>
                <p className="text-sm text-gray-600 font-medium">123, Rose Valley Apartments</p>
                <p className="text-sm text-gray-600 font-medium pb-2">Koramangala, Bangalore, Karnataka - 560034</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 border-t border-brand-pink/20 pt-2 w-max text-left mt-2 block w-full">+91 {user?.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
