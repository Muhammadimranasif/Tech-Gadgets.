import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, query, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, Zap, Clock, ShieldCheck } from 'lucide-react';
import { seedProducts } from '../data/seed';

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Seed products if empty (for demo purposes)
    seedProducts();

    const q = query(collection(db, 'products'), limit(8));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prods: Product[] = [];
      snapshot.forEach((doc) => {
        prods.push({ id: doc.id, ...doc.data() } as Product);
      });
      setProducts(prods);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const flashDeals = products.filter(p => p.isFlashSale);
  const featured = products.filter(p => !p.isFlashSale).slice(0, 4);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 lg:py-32">
          <div className="max-w-2xl">
            <span className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium mb-6 border border-emerald-500/20">
              <Zap className="w-4 h-4" />
              <span>Next-Gen Tech is Here</span>
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 leading-tight">
              Upgrade Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Digital Life.</span>
            </h1>
            <p className="text-lg text-zinc-400 mb-8 max-w-xl leading-relaxed">
              Discover the latest smartphones, premium audio, and cutting-edge accessories. Engineered for performance, designed for you.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/category/smartphones" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-center transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center justify-center">
                Shop Now <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/category/accessories" className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-4 rounded-xl font-semibold text-center transition-colors border border-zinc-700">
                View Accessories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-zinc-900 border-y border-zinc-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-sm font-medium text-zinc-400">
            <div className="flex items-center"><ShieldCheck className="w-5 h-5 mr-2 text-emerald-500" /> Secure Checkout</div>
            <div className="flex items-center"><Clock className="w-5 h-5 mr-2 text-emerald-500" /> 24/7 Support</div>
            <div className="flex items-center"><Zap className="w-5 h-5 mr-2 text-emerald-500" /> Fast Delivery</div>
          </div>
        </div>
      </div>

      {/* Flash Deals */}
      {flashDeals.length > 0 && (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white flex items-center">
                <Zap className="w-8 h-8 mr-3 text-amber-500 fill-amber-500" />
                Flash Deals
              </h2>
              <p className="text-zinc-400 mt-2">Grab them before they're gone!</p>
            </div>
            {/* Simple static timer for demo */}
            <div className="hidden md:flex items-center space-x-2 bg-rose-500/10 border border-rose-500/20 px-4 py-2 rounded-lg text-rose-400 font-mono font-bold">
              <Clock className="w-4 h-4 mr-2" />
              <span>12 : 45 : 30</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashDeals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Categories */}
      <section className="py-16 bg-zinc-900/50 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Smartphones', 'Laptops', 'Audio', 'Accessories'].map((cat, i) => (
              <Link key={i} to={`/category/${cat.toLowerCase()}`} className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-800 border border-zinc-700 hover:border-emerald-500 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 to-transparent z-10"></div>
                <img 
                  src={`https://images.unsplash.com/photo-${['1511707171634-5f897ff02aa9', '1496181133206-80ce9b88a853', '1590658268037-6bf12165a8df', '1527443224154-c4a3942d3acf'][i]}?auto=format&fit=crop&q=80&w=600`} 
                  alt={cat} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <h3 className="text-xl font-bold text-white">{cat}</h3>
                  <span className="text-sm text-emerald-400 font-medium group-hover:underline">Shop Now &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-8">Trending Now</h2>
        {loading ? (
          <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
      
      {/* Email Capture */}
      <section className="py-20 bg-emerald-900/20 border-y border-emerald-900/30 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get 10% Off Your First Order</h2>
          <p className="text-zinc-300 mb-8 text-lg">Join our newsletter for exclusive tech deals, early access to sales, and more.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-grow bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              required
            />
            <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors whitespace-nowrap">
              Unlock Offer
            </button>
          </form>
          <p className="text-xs text-zinc-500 mt-4">By subscribing, you agree to our Terms & Privacy Policy.</p>
        </div>
      </section>
    </div>
  );
};
