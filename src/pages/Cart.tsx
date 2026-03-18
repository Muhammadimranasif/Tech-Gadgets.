import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="bg-zinc-900 p-6 rounded-full mb-6 text-emerald-500">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
        <p className="text-zinc-400 mb-8 max-w-md text-center">Looks like you haven't added any tech gadgets to your cart yet.</p>
        <Link to="/" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors flex items-center">
          Start Shopping <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-grow space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
              <Link to={`/product/${item.id}`} className="w-24 h-24 bg-zinc-800 rounded-xl p-2 flex-shrink-0">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain mix-blend-normal" referrerPolicy="no-referrer" />
              </Link>
              
              <div className="flex-grow flex flex-col sm:flex-row justify-between w-full">
                <div className="mb-4 sm:mb-0">
                  <Link to={`/product/${item.id}`} className="text-lg font-semibold text-white hover:text-emerald-400 transition-colors line-clamp-1">
                    {item.name}
                  </Link>
                  <p className="text-zinc-400 text-sm mb-2">{item.category}</p>
                  <p className="text-emerald-400 font-bold">${item.price.toFixed(2)}</p>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end sm:space-x-6 w-full sm:w-auto">
                  <div className="flex items-center border border-zinc-700 rounded-lg bg-zinc-950 p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 text-zinc-400 hover:text-white transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-white font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 text-zinc-400 hover:text-white transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-zinc-500 hover:text-rose-500 transition-colors p-2"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm text-zinc-400 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-emerald-400 font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span className="text-white font-medium">Calculated at checkout</span>
              </div>
            </div>
            
            <div className="border-t border-zinc-800 pt-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-white">Total</span>
                <span className="text-2xl font-bold text-white">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-xl transition-colors flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)]"
            >
              Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            
            <div className="mt-6 text-center text-xs text-zinc-500">
              <p>Secure checkout powered by Stripe.</p>
              <p>30-day money-back guarantee.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
