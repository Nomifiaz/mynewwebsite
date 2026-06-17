import React from "react";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  onQuickAdd: (product: Product, e: React.MouseEvent) => void;
}

export default function ProductCard({
  product,
  onSelect,
  isWishlisted,
  onToggleWishlist,
  onQuickAdd
}: ProductCardProps) {
  return (
    <div 
      onClick={() => onSelect(product)}
      className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer select-none h-full relative"
    >
      {/* Wishlist Toggle Button (Absolute top-right) */}
      <button
        onClick={(e) => onToggleWishlist(product, e)}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-500 hover:text-red-500 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
        title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        <Heart 
          size={16} 
          className={isWishlisted ? "fill-red-500 text-red-500 text-xs transition-transform transform scale-110" : "text-xs"} 
        />
      </button>

      {/* Product Image Container */}
      <div className="bg-[#f0f2f1]/40 aspect-square w-full relative overflow-hidden flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 duration-500 transition-transform"
          loading="lazy"
        />
        
        {/* Little Discount or Custom Tag (Absolute top-left) */}
        {product.tag && (
          <span className="absolute top-3 left-3 bg-[#002B24] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">
            {product.tag}
          </span>
        )}
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-grow justify-between gap-2.5">
        <div className="flex flex-col gap-1">
          {/* Brand & Category details */}
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#F37D35]">
            {product.subtitle || product.brand}
          </span>
          {/* Title */}
          <h4 className="font-display font-medium text-gray-800 text-sm group-hover:text-gray-900 line-clamp-1">
            {product.name}
          </h4>
        </div>

        {/* Rating and Reviews count */}
        <div className="flex items-center gap-1">
          <Star size={12} className="text-amber-500 fill-amber-500" />
          <span className="text-xs text-gray-700 font-bold">{product.rating.toFixed(1)}</span>
          <span className="text-xs text-gray-400 font-mono">({product.ratingCount})</span>
        </div>

        {/* Price & Cart Actions Panel */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="font-display font-bold text-gray-900 text-base">
              ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through font-mono">
                ${product.originalPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            )}
          </div>

          {/* Quick Add To Cart Button */}
          <button 
            onClick={(e) => onQuickAdd(product, e)}
            className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-[#F37D35] text-[#002B24] hover:text-white flex items-center justify-center transition-all active:scale-90 cursor-pointer"
            title="Quick Add to Cart"
          >
            <ShoppingCart size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
