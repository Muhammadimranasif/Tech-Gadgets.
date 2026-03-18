import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] flex flex-col h-full">
      <Link to={`/product/${product.id}`} className="relative block aspect-square overflow-hidden bg-zinc-800 p-6">
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
            -{discount}%
          </div>
        )}
        {product.isFlashSale && (
          <div className="absolute top-3 right-3 bg-amber-500 text-zinc-950 text-xs font-bold px-2 py-1 rounded-md z-10">
            Flash Sale
          </div>
        )}
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-contain mix-blend-normal group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center space-x-1 mb-2">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium text-zinc-300">{product.rating}</span>
          <span className="text-xs text-zinc-500">({product.reviewsCount})</span>
        </div>
        
        <Link to={`/product/${product.id}`} className="block mb-2">
          <h3 className="text-base font-semibold text-white line-clamp-2 group-hover:text-emerald-400 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto pt-4 flex items-end justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-white">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-sm text-zinc-500 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            {product.stock < 10 && product.stock > 0 && (
              <p className="text-xs text-rose-400 mt-1 font-medium">Only {product.stock} left in stock!</p>
            )}
          </div>
          
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="bg-zinc-800 hover:bg-emerald-500 text-white p-3 rounded-xl transition-colors group-hover:shadow-lg"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
