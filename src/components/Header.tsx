import React, { useState } from "react";
import { Heart, ShoppingCart, User, Search, MapPin, ChevronDown } from "lucide-react";
import { CartItem, Product } from "../types";

interface HeaderProps {
  cart: CartItem[];
  wishlist: Product[];
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
}

export default function Header({
  cart,
  wishlist,
  currentTab,
  setCurrentTab,
  searchQuery,
  setSearchQuery,
  onOpenCart,
  onOpenWishlist,
}: HeaderProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setCurrentTab("catalog");
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-xs">
      {/* Upper Bar: Logo & Search & Badges */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div 
          onClick={() => {
            setCurrentTab("catalog");
            setSearchQuery("");
            setLocalSearch("");
          }}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <span className="font-display text-2xl font-bold tracking-tight text-[#002B24] flex items-center">
            Pie<span className="text-[#F37D35]">Mart</span>
          </span>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="w-full md:w-2/5 flex items-center">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search in Product..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full pl-4 pr-24 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#F37D35] transition-colors"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-5 bg-[#F37D35] hover:bg-[#e06c25] text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Search size={14} />
              Search
            </button>
          </div>
        </form>

        {/* Actions (Wishlist, Cart, User) */}
        <div className="flex items-center gap-5">
          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-gray-700 hover:text-[#F37D35] transition-colors focus:outline-none cursor-pointer"
            title="Wishlist"
          >
            <Heart size={22} className={wishlist.length > 0 ? "fill-red-500 text-red-500" : ""} />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white font-sans text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-pulse">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Widget */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-gray-700 hover:text-[#002B24] transition-colors focus:outline-none cursor-pointer flex items-center gap-1"
            title="Shopping Cart"
          >
            <ShoppingCart size={22} />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#F37D35] text-white font-sans text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Access profile */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-gray-200 text-gray-700 text-sm select-none">
            <div className="p-1.5 bg-gray-100 rounded-full">
              <User size={16} />
            </div>
            <div className="hidden sm:block text-left text-xs">
              <p className="text-gray-400">Hello,</p>
              <p className="font-semibold text-gray-800">Login/Sign Up</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation and Category Quick Drawer */}
      <div className="bg-white border-t border-gray-100">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-12">
          {/* Nav Categories Links */}
          <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
            <button
              onClick={() => { setCurrentTab("catalog"); setSearchQuery(""); }}
              className={`hover:text-[#F37D35] py-3 border-b-2 transition-colors cursor-pointer ${
                currentTab === "catalog" && searchQuery === "" ? "border-[#F37D35] text-gray-900 font-semibold" : "border-transparent"
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => { setCurrentTab("super-deals"); }}
              className={`hover:text-[#F37D35] py-3 border-b-2 transition-colors cursor-pointer ${
                currentTab === "super-deals" ? "border-[#F37D35] text-gray-900 font-semibold" : "border-transparent"
              }`}
            >
              Super Deals
            </button>
            <button
              onClick={() => { setCurrentTab("find-store"); }}
              className={`hover:text-[#F37D35] py-3 border-b-2 transition-colors cursor-pointer ${
                currentTab === "find-store" ? "border-[#F37D35] text-gray-900 font-semibold" : "border-transparent"
              }`}
            >
              Find Store
            </button>
            <button
              onClick={() => { setCurrentTab("whats-new"); }}
              className={`hover:text-[#F37D35] py-3 border-b-2 transition-colors cursor-pointer ${
                currentTab === "whats-new" ? "border-[#F37D35] text-gray-900 font-semibold" : "border-transparent"
              }`}
            >
              What's New
            </button>
            <button
              onClick={() => { setCurrentTab("special-offers"); }}
              className={`hover:text-[#F37D35] py-3 border-b-2 transition-colors @md:inline-block cursor-pointer ${
                currentTab === "special-offers" ? "border-[#F37D35] text-gray-900 font-semibold" : "border-transparent"
              }`}
            >
              Special Offer
            </button>
          </nav>

          {/* Quick Support Phone / Locations */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-gray-500 font-medium select-none">
            <MapPin size={14} className="text-gray-400" />
            <span>Store Locator: New York Main, NY</span>
            <ChevronDown size={12} className="text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
