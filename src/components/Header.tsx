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

  // Load custom header theme preference from local storage
  const [headerTheme, setHeaderTheme] = useState<"duo" | "green" | "white">(() => {
    try {
      const saved = localStorage.getItem("piemart_header_theme");
      return (saved === "green" || saved === "white" || saved === "duo") ? saved : "duo";
    } catch {
      return "duo";
    }
  });

  const handleThemeChange = (newTheme: "duo" | "green" | "white") => {
    setHeaderTheme(newTheme);
    try {
      localStorage.setItem("piemart_header_theme", newTheme);
    } catch (e) {
      console.warn("Local storage not accessible", e);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setCurrentTab("catalog");
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Dynamic Theme Styling configurations
  const isDarkUpper = headerTheme === "green" || headerTheme === "duo";
  const isDarkLower = headerTheme === "green";

  const upperBarBg = isDarkUpper 
    ? "bg-[#002B24] text-white border-b border-[#001D18]" 
    : "bg-white border-b border-gray-100 text-gray-800";

  const logoTextClass = isDarkUpper ? "text-white" : "text-[#002B24]";
  
  const searchInputClass = isDarkUpper
    ? "w-full pl-4 pr-24 py-2 border border-[#00382e] rounded-lg text-sm bg-white text-gray-900 placeholder-gray-400 focus:outline-[#F37D35] focus:outline-2 transition-all outline-none"
    : "w-full pl-4 pr-24 py-2 border border-gray-200 rounded-lg text-sm bg-white text-gray-800 placeholder-gray-400 focus:outline-[#002B24] focus:outline-2 transition-all outline-none";

  const actionIconClass = isDarkUpper
    ? "relative p-2 text-gray-100 hover:text-[#F37D35] transition-colors focus:outline-none cursor-pointer"
    : "relative p-2 text-gray-700 hover:text-[#002B24] transition-colors focus:outline-none cursor-pointer";

  const profileBorderClass = isDarkUpper ? "border-white/10 text-white" : "border-gray-200 text-gray-700";
  const profileSubTextClass = isDarkUpper ? "text-gray-300" : "text-gray-400";
  const profileNameClass = isDarkUpper ? "text-white font-semibold" : "text-gray-800 font-semibold";
  const profileIconBg = isDarkUpper ? "bg-white/10" : "bg-gray-100";

  const navBarBg = isDarkLower
    ? "bg-[#001D18] border-t border-[#00120f] text-white"
    : "bg-white border-t border-gray-100 text-gray-600";

  const switcherContainerClass = isDarkUpper
    ? "flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-full select-none shrink-0"
    : "flex items-center gap-1 p-1 bg-gray-50 border border-gray-200 rounded-full select-none shrink-0";

  return (
    <header className="sticky top-0 z-40 shadow-xs select-none">
      {/* Upper Bar: Logo & Search & Badges */}
      <div className={`${upperBarBg} transition-all duration-300`}>
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
            <span className={`font-display text-2xl font-bold tracking-tight ${logoTextClass} flex items-center transition-colors duration-300`}>
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
                className={`${searchInputClass} transition-all duration-300`}
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

          {/* Actions (Wishlist, Cart, Theme Switcher, User) */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Theme Change Switcher inside design header */}
            <div className="flex items-center gap-2">
              <span className={`text-[10px] uppercase tracking-wider font-extrabold hidden lg:inline-block ${isDarkUpper ? "text-gray-300" : "text-gray-400"}`}>
                Theme:
              </span>
              <div className={switcherContainerClass}>
                <button
                  type="button"
                  onClick={() => handleThemeChange("duo")}
                  className={`p-1.5 rounded-full transition-all flex items-center justify-center cursor-pointer ${
                    headerTheme === "duo"
                      ? "bg-amber-500 scale-105 shadow-sm"
                      : isDarkUpper ? "hover:bg-white/10 text-gray-300" : "hover:bg-gray-200 text-gray-500"
                  }`}
                  title="PieMart Duo (Green & White Both)"
                >
                  <div className="w-3.5 h-3.5 rounded-full border border-white/20 overflow-hidden flex rotate-45 shrink-0">
                    <div className="w-1.75 h-3.5 bg-[#002B24]" />
                    <div className="w-1.75 h-3.5 bg-white" />
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => handleThemeChange("green")}
                  className={`p-1.5 rounded-full transition-all flex items-center justify-center cursor-pointer ${
                    headerTheme === "green"
                      ? "bg-emerald-600 scale-105 shadow-sm text-white"
                      : isDarkUpper ? "hover:bg-white/10 text-gray-300" : "hover:bg-gray-200 text-gray-400"
                  }`}
                  title="Full Forest Green"
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-[#002B24] border border-emerald-950 shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={() => handleThemeChange("white")}
                  className={`p-1.5 rounded-full transition-all flex items-center justify-center cursor-pointer ${
                    headerTheme === "white"
                      ? "bg-white scale-105 shadow-sm text-[#002B24] border border-gray-200"
                      : "hover:bg-white/10 text-gray-300"
                  }`}
                  title="Clean Alabaster White"
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-white border border-gray-300 shrink-0" />
                </button>
              </div>
            </div>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className={`${actionIconClass} transition-colors`}
              title="Wishlist"
            >
              <Heart size={21} className={wishlist.length > 0 ? "fill-red-500 text-red-500" : ""} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white font-sans text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Widget */}
            <button
              onClick={onOpenCart}
              className={`${actionIconClass} transition-colors`}
              title="Shopping Cart"
            >
              <ShoppingCart size={21} />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#F37D35] text-white font-sans text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Access profile */}
            <div className={`flex items-center gap-1.5 pl-2.5 border-l ${profileBorderClass} text-sm select-none`}>
              <div className={`p-1.5 rounded-full ${profileIconBg} transition-colors`}>
                <User size={15} />
              </div>
              <div className="hidden sm:block text-left text-[11px] leading-tight">
                <p className={profileSubTextClass}>Hello & Welcome,</p>
                <p className={profileNameClass}>Sign In / Join</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation and Category Quick Drawer */}
      <div className={`${navBarBg} transition-all duration-300`}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-12">
          {/* Nav Categories Links */}
          <nav className="flex items-center gap-6 text-sm font-medium">
            <button
              onClick={() => { setCurrentTab("catalog"); setSearchQuery(""); }}
              className={`py-3 border-b-2 transition-all cursor-pointer ${
                currentTab === "catalog" && searchQuery === "" 
                  ? "border-[#F37D35] text-[#F37D35] font-semibold" 
                  : isDarkLower ? "border-transparent text-gray-300 hover:text-white" : "border-transparent text-gray-600 hover:text-[#F37D35]"
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => { setCurrentTab("super-deals"); }}
              className={`py-3 border-b-2 transition-all cursor-pointer ${
                currentTab === "super-deals" 
                  ? "border-[#F37D35] text-[#F37D35] font-semibold" 
                  : isDarkLower ? "border-transparent text-gray-300 hover:text-white" : "border-transparent text-gray-600 hover:text-[#F37D35]"
              }`}
            >
              Super Deals
            </button>
            <button
              onClick={() => { setCurrentTab("find-store"); }}
              className={`py-3 border-b-2 transition-all cursor-pointer ${
                currentTab === "find-store" 
                  ? "border-[#F37D35] text-[#F37D35] font-semibold" 
                  : isDarkLower ? "border-transparent text-gray-300 hover:text-white" : "border-transparent text-gray-600 hover:text-[#F37D35]"
              }`}
            >
              Find Store
            </button>
            <button
              onClick={() => { setCurrentTab("whats-new"); }}
              className={`py-3 border-b-2 transition-all cursor-pointer ${
                currentTab === "whats-new" 
                  ? "border-[#F37D35] text-[#F37D35] font-semibold" 
                  : isDarkLower ? "border-transparent text-gray-300 hover:text-white" : "border-transparent text-gray-600 hover:text-[#F37D35]"
              }`}
            >
              What's New
            </button>
            <button
              onClick={() => { setCurrentTab("special-offers"); }}
              className={`py-3 border-b-2 transition-all cursor-pointer ${
                currentTab === "special-offers" 
                  ? "border-[#F37D35] text-[#F37D35] font-semibold" 
                  : isDarkLower ? "border-transparent text-gray-300 hover:text-white" : "border-transparent text-gray-600 hover:text-[#F37D35]"
              }`}
            >
              Special Offer
            </button>
          </nav>

          {/* Quick Support Phone / Locations */}
          <div className={`hidden lg:flex items-center gap-2 text-xs font-semibold select-none ${isDarkLower ? "text-gray-400" : "text-gray-500"}`}>
            <MapPin size={14} className={isDarkLower ? "text-emerald-400" : "text-[#F37D35]"} />
            <span>Store Locator: New York Main, NY</span>
            <ChevronDown size={12} className="opacity-60" />
          </div>
        </div>
      </div>
    </header>
  );
}
