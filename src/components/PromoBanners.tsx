import { Star } from "lucide-react";
import { Product } from "../types";

interface PromoBannersProps {
  onExploreBundle: () => void;
  onShopHeadphones: () => void;
}

export default function PromoBanners({ onExploreBundle, onShopHeadphones }: PromoBannersProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 select-none">
      {/* Main Promo Banner (The Ultimate Workstation) - spans 2 cols */}
      <div 
        className="lg:col-span-2 relative h-[320px] rounded-2xl overflow-hidden shadow-xs bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=1200')`
        }}
      >
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#000000]/30 to-[#000000]/85" />
        <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10 flex flex-col items-start gap-3 text-white z-10">
          <span className="bg-[#F37D35] text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest leading-none">
            Limited Offer
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
            The Ultimate Workstation
          </h2>
          <p className="text-gray-200 text-xs md:text-sm max-w-lg font-sans leading-relaxed">
            Experience uncompromising power with our latest collection of premium computing hardware. Curated for developers, designers, and high-performance workflows.
          </p>
          <button 
            onClick={onExploreBundle}
            className="mt-2 bg-white hover:bg-gray-100 text-[#002B24] text-xs font-bold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            Explore Bundle
          </button>
        </div>
      </div>

      {/* Side Promo Banner (Noise Canceling Audio) - spans 1 col */}
      <div className="bg-[#1D322E] rounded-2xl overflow-hidden p-8 flex flex-col justify-between text-white relative h-[320px] shadow-xs">
        <div className="flex flex-col gap-2.5 z-10">
          <h3 className="font-display text-2xl font-bold tracking-tight leading-snug">
            Noise Canceling Audio
          </h3>
          <p className="text-gray-300 text-xs leading-relaxed max-w-[200px]">
            Up to 40% off selected wireless headphones. Immerse in unmatched acoustics today.
          </p>
          <button 
            onClick={onShopHeadphones}
            className="w-fit mt-3 bg-[#F37D35] hover:bg-[#e06c25] text-white text-xs font-bold py-2.5 px-5 rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            Shop Now
          </button>
        </div>
        
        {/* Floating headphone render inside the container */}
        <div className="absolute -bottom-6 -right-6 w-48 h-48 select-none pointer-events-none opacity-85">
          <img 
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=350" 
            alt="Wireless Headphone decoration" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-full border-4 border-emerald-950/20"
          />
        </div>
      </div>
    </div>
  );
}
