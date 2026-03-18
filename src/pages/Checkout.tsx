import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { ShieldCheck, Lock, CreditCard, Truck } from 'lucide-react';

export const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || '',
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'US',
    paymentMethod: 'card'
  });

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Create order in Firestore
      const orderData = {
        userId: user ? user.uid : null,
        items: cart,
        total: cartTotal,
        status: 'pending',
        shippingAddress: {
          fullName: formData.fullName,
          street: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        paymentMethod: formData.paymentMethod,
        createdAt: new Date(),
      };

      await addDoc(collection(db, 'orders'), orderData);
      
      clearCart();
      // In a real app, redirect to a success page
      alert('Order placed successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Checkout Form */}
        <div className="flex-grow">
          <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>
          
          {!user && (
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl mb-8 flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Already have an account?</h3>
                <p className="text-sm text-zinc-400">Log in for faster checkout</p>
              </div>
              <Link to="/login?redirect=/checkout" className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Log In
              </Link>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Info */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-white mb-4">Contact Information</h2>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-white mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Street Address</label>
                  <input 
                    type="text" 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">City</label>
                  <input 
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">ZIP / Postal Code</label>
                  <input 
                    type="text" 
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-white mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${formData.paymentMethod === 'card' ? 'border-emerald-500 bg-emerald-500/10' : 'border-zinc-800 bg-zinc-950'}`}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="card" 
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="text-emerald-500 focus:ring-emerald-500 bg-zinc-900 border-zinc-700"
                  />
                  <div className="ml-3 flex items-center">
                    <CreditCard className="w-5 h-5 text-zinc-400 mr-2" />
                    <span className="text-white font-medium">Credit / Debit Card</span>
                  </div>
                </label>
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${formData.paymentMethod === 'cod' ? 'border-emerald-500 bg-emerald-500/10' : 'border-zinc-800 bg-zinc-950'}`}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="cod" 
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    className="text-emerald-500 focus:ring-emerald-500 bg-zinc-900 border-zinc-700"
                  />
                  <div className="ml-3 flex items-center">
                    <Truck className="w-5 h-5 text-zinc-400 mr-2" />
                    <span className="text-white font-medium">Cash on Delivery</span>
                  </div>
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-xl transition-colors flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                <>
                  <Lock className="w-5 h-5 mr-2" /> Pay ${cartTotal.toFixed(2)}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative w-16 h-16 bg-zinc-800 rounded-lg p-1 flex-shrink-0">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain mix-blend-normal" referrerPolicy="no-referrer" />
                    <span className="absolute -top-2 -right-2 bg-zinc-700 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium text-white line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-zinc-400">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="text-sm font-bold text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 text-sm text-zinc-400 mb-6 border-t border-zinc-800 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-emerald-400 font-medium">Free</span>
              </div>
            </div>
            
            <div className="border-t border-zinc-800 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-white">Total</span>
                <span className="text-2xl font-bold text-white">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center text-xs text-zinc-500">
              <ShieldCheck className="w-4 h-4 mr-1 text-emerald-500" />
              Secure 256-bit encrypted checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
