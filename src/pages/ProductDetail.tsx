import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Star, ShieldCheck, Truck, RotateCcw, Plus, Minus, ShoppingCart, Zap } from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div></div>;
  }

  if (!product) {
    return <div className="min-h-[60vh] flex items-center justify-center text-zinc-400">Product not found.</div>;
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Optional: show toast
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-zinc-900 rounded-2xl border border-zinc-800 p-8 relative overflow-hidden group">
            {discount > 0 && (
              <div className="absolute top-4 left-4 bg-rose-500 text-white text-sm font-bold px-3 py-1 rounded-md z-10">
                Save {discount}%
              </div>
            )}
            <img 
              src={product.images[activeImage]} 
              alt={product.name} 
              className="w-full h-full object-contain mix-blend-normal transition-transform duration-500 group-hover:scale-125 cursor-crosshair"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`flex-shrink-0 w-24 h-24 bg-zinc-900 rounded-xl border-2 p-2 ${activeImage === idx ? 'border-emerald-500' : 'border-zinc-800 hover:border-zinc-600'} transition-colors`}
              >
                <img src={img} alt="" className="w-full h-full object-contain mix-blend-normal" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          {product.isFlashSale && (
            <div className="flex items-center space-x-2 text-amber-500 font-bold mb-4 bg-amber-500/10 w-fit px-3 py-1.5 rounded-lg border border-amber-500/20">
              <Zap className="w-5 h-5 fill-amber-500" />
              <span>Flash Sale Ending Soon!</span>
            </div>
          )}
          
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">{product.name}</h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-zinc-700'}`} />
              ))}
            </div>
            <span className="text-zinc-400 text-sm">{product.rating} ({product.reviewsCount} reviews)</span>
          </div>

          <div className="flex items-end space-x-4 mb-6">
            <span className="text-4xl font-bold text-white">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xl text-zinc-500 line-through mb-1">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="mb-8">
            <h3 className="text-white font-semibold mb-3">Key Features:</h3>
            <ul className="space-y-2">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-zinc-300">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto border-t border-zinc-800 pt-8">
            {product.stock > 0 ? (
              <>
                {product.stock < 10 && (
                  <div className="text-rose-400 font-medium mb-4 flex items-center">
                    <span className="relative flex h-3 w-3 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                    </span>
                    Hurry! Only {product.stock} left in stock.
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex items-center border border-zinc-700 rounded-xl bg-zinc-900/50 p-1 w-fit">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="w-12 text-center text-white font-semibold">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center transition-colors border border-zinc-700"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
                  </button>
                  
                  <button 
                    onClick={handleBuyNow}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                  >
                    Buy Now
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-zinc-900 border border-zinc-800 text-zinc-400 font-bold py-4 px-8 rounded-xl text-center mb-6">
                Out of Stock
              </div>
            )}

            {/* Trust Signals */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="flex items-center text-sm text-zinc-400">
                <Truck className="w-5 h-5 mr-3 text-emerald-500" /> Free Shipping
              </div>
              <div className="flex items-center text-sm text-zinc-400">
                <ShieldCheck className="w-5 h-5 mr-3 text-emerald-500" /> 1 Year Warranty
              </div>
              <div className="flex items-center text-sm text-zinc-400">
                <RotateCcw className="w-5 h-5 mr-3 text-emerald-500" /> 30-Day Returns
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Add to Cart */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 p-4 z-40 flex gap-3">
        <button 
          onClick={handleAddToCart}
          className="flex-1 bg-zinc-800 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
        <button 
          onClick={handleBuyNow}
          className="flex-[3] bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl"
        >
          Buy Now - ${(product.price * quantity).toFixed(2)}
        </button>
      </div>
    </div>
  );
};
