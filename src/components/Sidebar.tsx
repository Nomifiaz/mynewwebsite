import React, { useState, useMemo } from "react";
import { 
  ChevronRight, 
  Smartphone, 
  Tv, 
  Headphones, 
  Laptop, 
  Heart,
  Grid,
  Sparkles,
  Trophy,
  Coffee,
  Shirt,
  Armchair
} from "lucide-react";
import { FilterState, Product } from "../types";
import { CATEGORIES } from "../data";

interface SidebarProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  products: Product[];
}

export default function Sidebar({ filters, setFilters, products }: SidebarProps) {
  // Temporary slider state for smooth sliding before committing
  const [localMaxPrice, setLocalMaxPrice] = useState(filters.maxPrice);

  // Dynamic brand counts based on current category
  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = { Apple: 0, Samsung: 0, Sony: 0, Other: 0 };
    products
      .filter(p => !filters.category || p.category === filters.category)
      .forEach(p => {
        if (counts[p.brand] !== undefined) {
          counts[p.brand]++;
        } else {
          counts["Other"]++;
        }
      });
    return counts;
  }, [products, filters.category]);

  const handleCategoryClick = (cat: string) => {
    setFilters({
      ...filters,
      category: cat === filters.category ? "" : cat, // toggle
    });
  };

  const handleBrandToggle = (brand: string) => {
    const activeBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    setFilters({ ...filters, brands: activeBrands });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setLocalMaxPrice(val);
  };

  const handlePriceCommit = () => {
    setFilters({ ...filters, maxPrice: localMaxPrice });
  };

  // Maps category back to an icon for layout aesthetics
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Furniture":
        return <Armchair size={16} />;
      case "Electronics":
        return <Laptop size={16} />;
      case "Fashion":
        return <Shirt size={16} />;
      case "Home Decor":
        return <Coffee size={16} />;
      case "Health & Beauty":
        return <Sparkles size={16} />;
      case "Sports":
        return <Trophy size={16} />;
      default:
        return <Grid size={16} />;
    }
  };

  return (
    <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-6" id="catalog-sidebar">
      {/* Browse Categories */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs">
        <h3 className="font-display font-bold text-gray-900 border-b border-gray-100 pb-3 text-base flex items-center justify-between select-none">
          <span>Browse Categories</span>
        </h3>
        <p className="text-xs text-gray-400 mt-1 select-none">Shop by Department</p>

        <div className="mt-4 flex flex-col gap-1.5">
          {CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all text-left cursor-pointer select-none ${
                  isSelected
                    ? "bg-[#002B24] text-white font-medium shadow-xs"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isSelected ? "text-white" : "text-gray-400"}>
                    {getCategoryIcon(cat)}
                  </span>
                  <span>{cat}</span>
                </div>
                <ChevronRight size={14} className={isSelected ? "text-white" : "text-gray-400"} />
              </button>
            );
          })}
        </div>

        <button 
          onClick={() => setFilters({ ...filters, category: "" })}
          className="w-full mt-4 border border-gray-200 hover:border-gray-300 text-gray-700 text-xs py-2.5 px-3 rounded-lg flex items-center justify-center font-medium transition-all active:scale-95 cursor-pointer"
        >
          View All Categories
        </button>
      </div>

      {/* Filter by Price */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs select-none">
        <h3 className="font-display font-semibold text-gray-900 text-sm">Price Range</h3>
        
        {/* Double slider style with single range display */}
        <div className="mt-4">
          <input
            type="range"
            min="0"
            max="3000"
            step="50"
            value={localMaxPrice}
            onChange={handlePriceChange}
            onMouseUp={handlePriceCommit}
            onTouchEnd={handlePriceCommit}
            className="w-full accent-[#002B24] cursor-pointer"
          />
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500 font-mono">
            <span>$0</span>
            <span className="font-semibold text-gray-800">${localMaxPrice.toLocaleString()}+</span>
            <span>$3,000+</span>
          </div>
        </div>
      </div>

      {/* Brand Selector */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs select-none">
        <h3 className="font-display font-semibold text-gray-900 text-sm">Brand</h3>
        
        <div className="mt-4 flex flex-col gap-3">
          {["Apple", "Samsung", "Sony", "Other"].map((brand) => {
            const isChecked = filters.brands.includes(brand);
            const count = brandCounts[brand] || 0;
            return (
              <label 
                key={brand} 
                className="flex items-center justify-between text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleBrandToggle(brand)}
                    className="rounded-sm border-gray-300 text-[#002B24] focus:ring-[#002B24] accent-[#002B24] cursor-pointer w-4 h-4"
                  />
                  <span>{brand}</span>
                </div>
                <span className="text-xs text-gray-400 font-mono">({count})</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Rating Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs select-none">
        <h3 className="font-display font-semibold text-gray-900 text-sm">Rating</h3>
        
        <div className="mt-4 flex flex-col gap-2.5">
          {[5, 4, 3].map((val) => {
            const isSelected = filters.rating === val;
            return (
              <button
                key={val}
                onClick={() => setFilters({ ...filters, rating: isSelected ? 0 : val })}
                className={`w-full flex items-center justify-between text-sm p-1.5 rounded-md text-left transition-colors cursor-pointer ${
                  isSelected ? "bg-gray-55 text-gray-900 font-semibold" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span 
                      key={i} 
                      className={i < val ? "text-amber-500 fill-amber-500 text-xs" : "text-gray-200 text-xs"}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-xs text-gray-500 ml-1.5">& Up</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
