import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, CreditCard } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 border-b border-zinc-800 pb-12">
          <div className="flex flex-col items-center text-center">
            <div className="bg-zinc-900 p-3 rounded-full mb-3 text-emerald-400">
              <Truck className="h-6 w-6" />
            </div>
            <h4 className="text-white font-medium text-sm mb-1">Free Shipping</h4>
            <p className="text-xs">On orders over $50</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-zinc-900 p-3 rounded-full mb-3 text-emerald-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h4 className="text-white font-medium text-sm mb-1">1 Year Warranty</h4>
            <p className="text-xs">On all electronics</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-zinc-900 p-3 rounded-full mb-3 text-emerald-400">
              <RotateCcw className="h-6 w-6" />
            </div>
            <h4 className="text-white font-medium text-sm mb-1">30-Day Returns</h4>
            <p className="text-xs">No questions asked</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-zinc-900 p-3 rounded-full mb-3 text-emerald-400">
              <CreditCard className="h-6 w-6" />
            </div>
            <h4 className="text-white font-medium text-sm mb-1">Secure Checkout</h4>
            <p className="text-xs">256-bit encryption</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold tracking-tighter text-emerald-400 mb-4 inline-block">
              TechGadget<span className="text-white">.</span>
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              Your ultimate destination for the latest tech gadgets, smartphones, and accessories. Premium quality, unbeatable prices.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/category/smartphones" className="hover:text-emerald-400 transition-colors">Smartphones</Link></li>
              <li><Link to="/category/laptops" className="hover:text-emerald-400 transition-colors">Laptops & PCs</Link></li>
              <li><Link to="/category/audio" className="hover:text-emerald-400 transition-colors">Audio & Earbuds</Link></li>
              <li><Link to="/category/accessories" className="hover:text-emerald-400 transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-emerald-400 transition-colors">FAQs</Link></li>
              <li><Link to="/shipping" className="hover:text-emerald-400 transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-emerald-400 transition-colors">Returns & Exchanges</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-zinc-900 border border-zinc-700 text-white px-4 py-2 rounded-l-md w-full focus:outline-none focus:border-emerald-500 text-sm"
              />
              <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-r-md font-medium transition-colors text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} TechGadget. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
