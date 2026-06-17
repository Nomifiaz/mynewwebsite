import React, { useState, useMemo, useEffect } from "react";
import { 
  Filter, 
  X, 
  SlidersHorizontal, 
  Sparkles, 
  MapPin, 
  Clock, 
  Flame, 
  Tag, 
  Gift, 
  FileCheck2, 
  AlertCircle 
} from "lucide-react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import PromoBanners from "./components/PromoBanners";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail";
import CartPage from "./components/CartPage";
import ChatHelper from "./components/ChatHelper";
import Footer from "./components/Footer";
import { Product, CartItem, FilterState } from "./types";
import { PRODUCTS, DEFAULT_CART_ITEMS } from "./data";

export default function App() {
  // Navigation states
  const [currentTab, setCurrentTab] = useState<string>("catalog");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    category: "Electronics", // Start with Electronics matching the screenshot
    searchQuery: "",
    minPrice: 0,
    maxPrice: 3000,
    brands: [],
    rating: 0,
    sortBy: "newest"
  });

  // Basket & Wishlist states
  const [cart, setCart] = useState<CartItem[]>(DEFAULT_CART_ITEMS);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  
  // Mobile filter drawer toggle
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sync global search state with filters
  useEffect(() => {
    setFilters(prev => ({ ...prev, searchQuery }));
    setCurrentPage(1);
  }, [searchQuery]);

  // Sync category change with page index
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.category]);

  // Wishlist addition toggle
  const handleToggleWishlist = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist(prev => {
      const idx = prev.findIndex(item => item.id === product.id);
      if (idx > -1) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  // Add Item to Shopping cart
  const handleAddToCart = (product: Product, quantity: number, color?: string, size?: string) => {
    // Generate unique combination key to differentiate variant configurations
    const comboId = `${product.id}-${color || "default"}-${size || "default"}`;

    setCart(prev => {
      const existingIdx = prev.findIndex(item => item.id === comboId);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: comboId,
            product,
            quantity,
            selectedColor: color,
            selectedSize: size
          }
        ];
      }
    });
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    setCart(prev => 
      prev.map(item => item.id === itemId ? { ...item, quantity: newQty } : item)
    );
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Click on related or specific item to load details page
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentTab("product-detail");
  };

  // Dynamic filter lists calculation
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      // Category match
      if (filters.category && p.category !== filters.category) return false;

      // Brand selection match
      if (filters.brands.length > 0) {
        const isMatch = filters.brands.some((b) => {
          if (b === "Other") {
            return !["Apple", "Samsung", "Sony"].includes(p.brand);
          }
          return p.brand === b;
        });
        if (!isMatch) return false;
      }

      // Price threshold check
      if (p.price > filters.maxPrice) return false;

      // Star rating threshold check (equal or higher)
      if (filters.rating > 0 && p.rating < filters.rating) return false;

      // Text search match
      if (searchQuery) {
        const trg = searchQuery.toLowerCase();
        const nameMatch = p.name.toLowerCase().includes(trg);
        const subMatch = p.subtitle.toLowerCase().includes(trg);
        const descMatch = p.description.toLowerCase().includes(trg);
        const brandMatch = p.brand.toLowerCase().includes(trg);
        if (!nameMatch && !subMatch && !descMatch && !brandMatch) return false;
      }

      return true;
    });
  }, [filters, searchQuery]);

  // Sorting logics
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (filters.sortBy === "low-to-high") {
      list.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "high-to-low") {
      list.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      // "newest" -> prioritize high pricings or tag prominence
      list.sort((a, b) => (b.originalPrice ? 1 : 0) - (a.originalPrice ? 1 : 0));
    }
    return list;
  }, [filteredProducts, filters.sortBy]);

  // Paginated partition
  const paginatedProducts = useMemo(() => {
    const startsAt = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(startsAt, startsAt + itemsPerPage);
  }, [sortedProducts, currentPage]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage) || 1;

  // Fast shortcut triggers for promo actions
  const handleExploreBundle = () => {
    setFilters(prev => ({
      ...prev,
      category: "Electronics",
      sortBy: "high-to-low"
    }));
    setSearchQuery("");
    setCurrentTab("catalog");
    window.scrollTo({ top: 380, behavior: "smooth" });
  };

  const handleShopHeadphones = () => {
    setFilters(prev => ({
      ...prev,
      category: "Electronics"
    }));
    setSearchQuery("headphones");
    setCurrentTab("catalog");
    window.scrollTo({ top: 380, behavior: "smooth" });
  };

  // Direct checkout path
  const handleOpenCartTab = () => {
    setCurrentTab("cart");
  };

  // Wishlist overlay panel
  const [wishlistOpen, setWishlistOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-800 font-sans flex flex-col justify-between">
      {/* Complete Header Panel */}
      <Header
        cart={cart}
        wishlist={wishlist}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenCart={handleOpenCartTab}
        onOpenWishlist={() => setWishlistOpen(true)}
      />

      {/* Main Container Stage */}
      <main className="flex-grow">
        
        {/* TAB 1: PRIMARY WEB STORE / PRODUCT CATALOGUE */}
        {currentTab === "catalog" && (
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 select-none animate-fade-in">
            {/* Breadcrumb row & sorting dropdown */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 text-xs font-semibold select-none">
              <div className="flex items-center gap-1.5 text-gray-400">
                <span>Home</span>
                <span>/</span>
                <span>Department</span>
                <span>/</span>
                <span className="text-gray-700 font-bold">{filters.category || "All Products"}</span>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Mobile Filter Toggle Drawer button */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-700 cursor-pointer"
                >
                  <SlidersHorizontal size={14} />
                  Filters
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Sort by:</span>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    className="bg-white border border-gray-200 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-[#002B24] font-semibold text-gray-700 cursor-pointer"
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="low-to-high">Price: Low to High</option>
                    <option value="high-to-low">Price: High to Low</option>
                    <option value="rating">Popularity & Rating</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Side-by-Side catalog stage */}
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              
              {/* Sidebar filter column (Desktop) */}
              <div className="hidden lg:block w-72 shrink-0">
                <Sidebar 
                  filters={filters} 
                  setFilters={setFilters} 
                  products={PRODUCTS}
                />
              </div>

              {/* Main Catalog grid + promo headers column */}
              <div className="flex-grow w-full flex flex-col">
                {/* Promos (only display if category is Electronics and search is empty) */}
                {filters.category === "Electronics" && !searchQuery && (
                  <PromoBanners 
                    onExploreBundle={handleExploreBundle}
                    onShopHeadphones={handleShopHeadphones}
                  />
                )}

                {/* Sub-header of catalog count */}
                <div className="flex justify-between items-baseline mb-4">
                  <h3 className="font-display font-extrabold text-gray-900 text-lg">
                    {filters.category ? `${filters.category} Department` : "Global Catalogue Collection"}
                  </h3>
                  <span className="text-xs text-gray-400 font-medium">
                    Showing {sortedProducts.length === 0 ? "0" : (currentPage - 1) * itemsPerPage + 1}-
                    {Math.min(currentPage * itemsPerPage, sortedProducts.length)} of {sortedProducts.length} items
                  </span>
                </div>

                {/* Grid */}
                {sortedProducts.length === 0 ? (
                  <div className="bg-white rounded-xl border border-gray-100 p-12 text-center flex flex-col items-center justify-center gap-3">
                    <AlertCircle size={32} className="text-[#F37D35]" />
                    <h4 className="font-display font-bold text-gray-800 text-base">No match found</h4>
                    <p className="text-xs text-gray-400 max-w-sm">
                      We couldn't locate any products matching your specific configurations. Adjust price tags or brand checkboxes to see listings.
                    </p>
                    <button 
                      onClick={() => setFilters({ ...filters, brands: [], rating: 0, minPrice: 0, maxPrice: 3000, category: "Electronics" })}
                      className="mt-2 bg-[#002B24] text-white px-5 py-2 rounded-lg text-xs font-bold cursor-pointer transition-transform active:scale-95"
                    >
                      Reset Store Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                    {paginatedProducts.map((p) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        onSelect={handleSelectProduct}
                        isWishlisted={wishlist.some(item => item.id === p.id)}
                        onToggleWishlist={handleToggleWishlist}
                        onQuickAdd={(product, e) => {
                          e.stopPropagation();
                          handleAddToCart(product, 1);
                          alert(`Added 1x ${product.name} to Cart successfully! Check the Shopping cart!`);
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Pagination bottom bar */}
                {totalPages > 1 && (
                  <div className="mt-10 flex justify-center items-center gap-1">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-50 flex items-center justify-center disabled:opacity-40 cursor-pointer"
                    >
                      &larr;
                    </button>
                    {Array.from({ length: totalPages }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentPage(idx + 1)}
                        className={`w-9 h-9 border rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          currentPage === idx + 1 
                            ? "bg-[#002B24] border-[#002B24] text-white" 
                            : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-50 flex items-center justify-center disabled:opacity-40 cursor-pointer"
                    >
                      &rarr;
                    </button>
                  </div>
                )}

              </div>

            </div>
          </div>
        )}

        {/* TAB 2: DETAILED SINGLE PRODUCT SPECS SHEET VIEW */}
        {currentTab === "product-detail" && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onGoBack={() => setCurrentTab("catalog")}
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            allProducts={PRODUCTS}
            onSelectProduct={setSelectedProduct}
          />
        )}

        {/* TAB 3: SHOPPING BAG / CART OVERVIEW & CALCULATIONS */}
        {currentTab === "cart" && (
          <CartPage
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
            onGoBack={() => setCurrentTab("catalog")}
            allProducts={PRODUCTS}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {/* --- SUPPLEMENTARY STATIC BUT HIGH-FIDELITY MARKETING TAB PAGES --- */}

        {/* TAB 4: SUPER DEALS DISCOUNTS SHEET */}
        {currentTab === "super-deals" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 select-none animate-fade-in text-left">
            <div className="bg-[#fff3ea] border border-[#ffdfcb] rounded-2xl p-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col gap-2">
                <span className="bg-[#F37D35] text-white font-bold text-xs uppercase px-3 py-1 rounded-sm w-fit">
                  Save Big Today
                </span>
                <h1 className="font-display text-4xl font-black text-[#002B24] tracking-tight">Super Deals Outlet</h1>
                <p className="text-gray-600 text-xs max-w-md font-medium">
                  Take dynamic advantage of flash listings with preconfigured discounts up to 30%. These deals refresh nightly based on warehouses stocks!
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0 bg-white p-4 rounded-xl border border-orange-100 shadow-sm">
                <Gift size={32} className="text-[#F37D35]" />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Active Coupon</span>
                  <span className="text-sm font-bold text-[#002B24] font-mono">CODE: PIE30</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {PRODUCTS.filter(p => p.originalPrice !== undefined).map(item => (
                <ProductCard
                  key={item.id}
                  product={item}
                  onSelect={handleSelectProduct}
                  isWishlisted={wishlist.some(w => w.id === item.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onQuickAdd={(p, e) => {
                    e.stopPropagation();
                    handleAddToCart(p, 1);
                    alert(`Added discounted ${p.name} to Cart!`);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PHYSICAL SHIPMENT LOCATOR Timetable */}
        {currentTab === "find-store" && (
          <div className="max-w-4xl mx-auto px-4 py-10 select-none animate-fade-in text-left flex flex-col gap-8">
            <div className="text-center">
              <span className="text-xs uppercase tracking-widest font-black text-[#F37D35]">Find Store</span>
              <h1 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight mt-1">Our Physical Locations</h1>
              <p className="text-xs text-gray-500 max-w-md mx-auto mt-2 font-medium">
                Locate professional help or inspect high-end chronometers with certified representatives.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border rounded-xl p-6 shadow-xs flex flex-col gap-4">
                <div className="flex justify-between items-start pb-3 border-b border-gray-100">
                  <div className="flex flex-col">
                    <h3 className="font-display font-medium text-gray-900 text-base">New York Prime Outlet</h3>
                    <span className="text-xs text-gray-400 mt-1">123 Broadway Avenue, Suite 10, NY</span>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] uppercase font-bold px-3 py-1 rounded-full">
                    Active
                  </span>
                </div>
                <div className="flex flex-col gap-2.5 text-xs text-gray-600">
                  <div className="flex items-center gap-2.5">
                    <Clock size={14} className="text-gray-400" />
                    <span>Monday–Saturday: 08:00 AM – 09:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <FileCheck2 size={14} className="text-gray-400" />
                    <span>Certified Apple & Samsung repair partners onsite</span>
                  </div>
                </div>
                <button 
                  onClick={() => alert("Launching navigation coordinates...")}
                  className="w-full mt-2 bg-[#002B24] hover:bg-[#00352c] text-white py-2.5 text-xs font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Get Route Directions
                </button>
              </div>

              <div className="bg-white border rounded-xl p-6 shadow-xs flex flex-col gap-4">
                <div className="flex justify-between items-start pb-3 border-b border-gray-100">
                  <div className="flex flex-col">
                    <h3 className="font-display font-medium text-gray-900 text-base">San Francisco Bay Hub</h3>
                    <span className="text-xs text-gray-400 mt-1">456 Embarcadero Road, Block B, CA</span>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] uppercase font-bold px-3 py-1 rounded-full">
                    Active
                  </span>
                </div>
                <div className="flex flex-col gap-2.5 text-xs text-gray-600">
                  <div className="flex items-center gap-2.5">
                    <Clock size={14} className="text-gray-400" />
                    <span>Monday–Saturday: 09:00 AM – 10:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <FileCheck2 size={14} className="text-gray-400" />
                    <span>In-store pickups and demo testing lounge</span>
                  </div>
                </div>
                <button 
                  onClick={() => alert("Launching navigation coordinates...")}
                  className="w-full mt-2 bg-[#002B24] hover:bg-[#00352c] text-white py-2.5 text-xs font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Get Route Directions
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: WHAT'S NEW SHEETS */}
        {currentTab === "whats-new" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 select-none animate-fade-in text-left flex flex-col gap-6">
            <div className="border-b pb-5">
              <span className="bg-amber-100 text-amber-700 font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-sm w-fit">
                Vibrant Releases
              </span>
              <h1 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight mt-1">What's New at PieMart</h1>
              <p className="text-xs text-gray-500 mt-1.5 font-medium leading-relaxed">
                Stay updated with our newest arrivals, curated catalog updates, and custom technical integrations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature release stories */}
              <div className="bg-white border rounded-xl overflow-hidden shadow-xs flex flex-col justify-between">
                <img 
                  src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=400" 
                  alt="Zenith Release" 
                  referrerPolicy="no-referrer"
                  className="h-44 w-full object-cover"
                />
                <div className="p-5 flex flex-col gap-2 text-left">
                  <span className="text-[10px] uppercase font-bold text-[#F37D35]">Release Story</span>
                  <h3 className="font-semibold text-gray-900 text-sm">Zenith Series X2 Chronograph is officially live</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans font-medium">
                    Our luxury sports watch made of rugged, sandblasted titanium. Designed with Swiss kinetic quartz accuracy for maximum boardroom confidence.
                  </p>
                  <button 
                    onClick={() => handleSelectProduct(PRODUCTS.find(p => p.id === "zenith-x2")!)}
                    className="mt-2 text-xs font-bold text-[#002B24] hover:underline flex items-center justify-start gap-1 cursor-pointer"
                  >
                    Read Release &rarr;
                  </button>
                </div>
              </div>

              <div className="bg-white border rounded-xl overflow-hidden shadow-xs flex flex-col justify-between">
                <img 
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400" 
                  alt="Pro Laptop" 
                  referrerPolicy="no-referrer"
                  className="h-44 w-full object-cover"
                />
                <div className="p-5 flex flex-col gap-2 text-left">
                  <span className="text-[10px] uppercase font-bold text-[#F37D35]">Technology News</span>
                  <h3 className="font-semibold text-gray-900 text-sm">Pro Laptop Series gets M2 upgrade</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans font-medium">
                    The absolute ultimate workstation setup is now available at our store. Enjoy fanless performance, zero compile stalls, and crystal clear Liquid Retina displays.
                  </p>
                  <button 
                    onClick={() => handleSelectProduct(PRODUCTS.find(p => p.id === "pro-laptop")!)}
                    className="mt-2 text-xs font-bold text-[#002B24] hover:underline flex items-center justify-start gap-1 cursor-pointer"
                  >
                    Read Release &rarr;
                  </button>
                </div>
              </div>

              <div className="bg-white border rounded-xl overflow-hidden shadow-xs flex flex-col justify-between">
                <img 
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400" 
                  alt="Sneakers X1" 
                  referrerPolicy="no-referrer"
                  className="h-44 w-full object-cover"
                />
                <div className="p-5 flex flex-col gap-2 text-left">
                  <span className="text-[10px] uppercase font-bold text-[#F37D35]">Lifestyle & Fashion</span>
                  <h3 className="font-semibold text-gray-900 text-sm">Urban Velocity Active Wear restocked</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans font-medium">
                    Ready to hit the trails or gym sets? Grab the classic orange and pure white Urban Velocity shoes. Features responsive high density rubber bubble outsoles.
                  </p>
                  <button 
                    onClick={() => handleSelectProduct(PRODUCTS.find(p => p.id === "urban-velocity")!)}
                    className="mt-2 text-xs font-bold text-[#002B24] hover:underline flex items-center justify-start gap-1 cursor-pointer"
                  >
                    Read Release &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: SPECIAL OFFERS */}
        {currentTab === "special-offers" && (
          <div className="max-w-xl mx-auto px-4 py-12 select-none animate-fade-in text-left flex flex-col gap-6">
            <div className="text-center">
              <span className="text-xs uppercase tracking-widest font-black text-[#F37D35]">Exclusive Campaign</span>
              <h1 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight mt-1">Active Special Offers</h1>
              <p className="text-xs text-gray-500 max-w-sm mx-auto mt-2 leading-relaxed">
                Unlock specialized discounts by claiming vouchers below. These coupons can be used directly during final checkout.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white border rounded-xl p-5 flex items-center justify-between gap-4 shadow-xs">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center text-[#F37D35] shrink-0">
                    <Flame size={20} />
                  </div>
                  <div className="flex flex-col text-left gap-0.5">
                    <h3 className="font-semibold text-gray-900 text-sm">30% Storewide Holiday Discount</h3>
                    <p className="text-[11px] text-gray-400">Apply code in trolley to redeem 30% reduction</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="font-mono text-sm font-black bg-orange-50 text-[#F37D35] py-1 px-3 border border-orange-100 rounded-lg">
                    PIE30
                  </span>
                </div>
              </div>

              <div className="bg-white border rounded-xl p-5 flex items-center justify-between gap-4 shadow-xs">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <Tag size={20} />
                  </div>
                  <div className="flex flex-col text-left gap-0.5">
                    <h3 className="font-semibold text-gray-900 text-sm">10% Registration Gift</h3>
                    <p className="text-[11px] text-gray-400">Save 10% instantly on all items</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="font-mono text-sm font-black bg-emerald-50 text-emerald-600 py-1 px-3 border border-emerald-100 rounded-lg">
                    WELCOME10
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Floating Concierge Chat AI block */}
      <ChatHelper 
        onSelectProduct={handleSelectProduct}
        onAddToCart={(product, qty) => handleAddToCart(product, qty)}
      />

      {/* Corporate footer */}
      <Footer />

      {/* WISHLIST PANEL OVERLAY MODAL */}
      {wishlistOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-2xs flex items-center justify-end z-50 animate-fade-in10 select-none">
          <div className="bg-white h-full w-[400px] max-w-full shadow-2xl p-6 border-l border-gray-100 flex flex-col justify-between animate-slide-left relative">
            
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="font-display font-bold text-gray-900 text-base">Your Bookmarked Items ({wishlist.length})</h3>
                <button 
                  onClick={() => setWishlistOpen(false)}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {wishlist.length === 0 ? (
                <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
                  <Sparkles size={24} className="text-gray-300" />
                  <p className="text-xs text-gray-400 font-medium">No bookmarked products yet</p>
                  <p className="text-[11px] text-gray-400 font-sans max-w-[200px]">
                    Tap the heart badge on cards to keep track of premium products.
                  </p>
                </div>
              ) : (
                <div className="mt-4 flex flex-col gap-3.5 overflow-y-auto max-h-[70vh]">
                  {wishlist.map((item) => (
                    <div 
                      key={item.id}
                      className="flex gap-3.5 items-center justify-between p-2.5 rounded-lg border hover:bg-gray-50/50"
                    >
                      <div className="flex gap-3 items-center">
                        <div className="w-12 h-12 rounded-lg bg-gray-50 overflow-hidden flex items-center justify-center p-1.5 shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            referrerPolicy="no-referrer"
                            className="max-h-full max-w-full object-contain mix-blend-multiply" 
                          />
                        </div>
                        <div className="text-left">
                          <h4 
                            onClick={() => {
                              handleSelectProduct(item);
                              setWishlistOpen(false);
                            }}
                            className="font-bold text-xs text-gray-900 hover:text-[#F37D35] cursor-pointer line-clamp-1"
                          >
                            {item.name}
                          </h4>
                          <span className="text-xs font-semibold text-gray-400 font-mono">${item.price}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            handleAddToCart(item, 1);
                            setWishlistOpen(false);
                            alert(`Added 1x ${item.name} to Cart via Wishlist!`);
                          }}
                          className="bg-[#002B24] hover:bg-[#00382e] text-white px-2.5 py-1 rounded-md text-[10px] font-bold cursor-pointer"
                        >
                          Add
                        </button>
                        <button
                          onClick={(e) => handleToggleWishlist(item, e)}
                          className="text-red-500 hover:bg-red-50 p-1 rounded-md cursor-pointer"
                        >
                          <X size={14} />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setWishlistOpen(false)}
              className="w-full bg-[#002B24] text-white py-3 font-bold text-xs rounded-xl cursor-pointer hover:bg-[#003a30]"
            >
              Continue Shopping
            </button>

          </div>
        </div>
      )}

      {/* MOBILE COMPACT DRAWER SIDEBAR CABINET */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-2xs z-50 flex items-center justify-start select-none animate-fade-in10">
          <div className="bg-white h-full w-[280px] max-w-full p-5 shadow-2xl flex flex-col justify-between overflow-y-auto relative animate-slide-right">
            
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-bold text-sm tracking-wide text-gray-900">Configure Filter parameters</span>
                <button 
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <Sidebar 
                filters={filters} 
                setFilters={setFilters} 
                products={PRODUCTS}
              />
            </div>

            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full bg-[#002B24] text-white py-3 font-bold text-xs rounded-xl mt-6 cursor-pointer"
            >
              Confirm Selection
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
