import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';

// User Module Imports
import Navbar from './components/user/Navbar';
import Home from './components/user/Home';
import AboutSection from './components/user/AboutSection';
import Contact from './components/user/Contact';
import Shop from './components/user/Shop';
import Wishlist from './components/user/Wishlist';
import Checkout from './components/user/Checkout';
import TrackOrder from './components/user/TrackOrder';
import Footer from './components/user/Footer';
import CartDrawer from './components/user/CartDrawer';
import Auth from './components/user/Auth';
import Profile from './components/user/Profile';
import BlogSection from './components/user/BlogSection';
import Offers from './components/user/Offers';
import ScrollToTop from './components/user/ScrollToTop';

// Admin Module Imports
import AdminDashboard from './components/admin/AdminDashboard';

const UserRoutes = () => (
  <>
    <CartDrawer />
    <div className="min-h-screen bg-brand-light">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/blog" element={<BlogSection />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </>
);

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<AdminDashboard />} />
    {/* Add more admin routes here later like /admin/products, /admin/orders */}
  </Routes>
);

function App() {
  return (
    <ShopProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/*" element={<UserRoutes />} />
        </Routes>
      </Router>
    </ShopProvider>
  );
}

export default App;
