import { Globe, Share2, Mail, MessageSquare, HelpCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#002B24] text-white pt-12 pb-8 border-t border-[#001D18] select-none text-left">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Brand Mission Column */}
        <div className="md:col-span-5 flex flex-col gap-5">
          <span className="font-display text-2xl font-bold tracking-tight text-white flex items-center">
            Pie<span className="text-[#F37D35]">Mart</span>
          </span>
          <p className="text-gray-300 text-xs leading-relaxed max-w-sm font-sans font-medium">
            Your premier destination for high-quality electronics and curated lifestyle products. Elevate your daily work and home experience with PieMart, designed specifically to fit your premium standards.
          </p>
          
          {/* Social icons / custom actions from screenshot */}
          <div className="flex items-center gap-3 mt-1">
            <button 
              className="p-2.5 rounded-full border border-gray-100/10 bg-white/5 text-gray-200 hover:text-white hover:bg-white/10 hover-scale cursor-pointer transition-all"
              title="Change Language"
            >
              <Globe size={15} />
            </button>
            <button 
              className="p-2.5 rounded-full border border-gray-100/10 bg-white/5 text-gray-200 hover:text-white hover:bg-white/10 hover-scale cursor-pointer transition-all"
              title="Share"
            >
              <Share2 size={15} />
            </button>
            <button 
              className="p-2.5 rounded-full border border-gray-100/10 bg-white/5 text-gray-200 hover:text-white hover:bg-white/10 hover-scale cursor-pointer transition-all"
              title="Email support"
            >
              <Mail size={15} />
            </button>
            <button 
              className="p-2.5 rounded-full border border-gray-100/10 bg-white/5 text-gray-200 hover:text-white hover:bg-white/10 hover-scale cursor-pointer transition-all"
              title="Help desk chat"
            >
              <MessageSquare size={15} />
            </button>
          </div>
        </div>

        {/* Categories Right Menus (Spans 7 of 12 cols) */}
        <div className="md:col-span-7 grid grid-cols-3 gap-6">
          {/* Column 1: Shop */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest text-[#F37D35] font-extrabold select-none">
              Shop
            </h4>
            <div className="flex flex-col gap-2 text-xs text-gray-300 font-medium">
              <span className="hover:text-white transition-colors cursor-pointer">Computers</span>
              <span className="hover:text-white transition-colors cursor-pointer">Phones</span>
              <span className="hover:text-white transition-colors cursor-pointer">Audio & Wearables</span>
              <span className="hover:text-white transition-colors cursor-pointer">Sports & Gear</span>
              <span className="hover:text-white transition-colors cursor-pointer">Special Bundles</span>
            </div>
          </div>

          {/* Column 2: Support */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest text-[#F37D35] font-extrabold select-none">
              Support
            </h4>
            <div className="flex flex-col gap-2 text-xs text-gray-300 font-medium">
              <span className="hover:text-white transition-colors cursor-pointer">Shipping Policy</span>
              <span className="hover:text-white transition-colors cursor-pointer">Returns Center</span>
              <span className="hover:text-white transition-colors cursor-pointer">Warranty Terms</span>
              <span className="hover:text-white transition-colors cursor-pointer">Privacy Safeguards</span>
              <span className="hover:text-white transition-colors cursor-pointer">Contact Desk</span>
            </div>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest text-[#F37D35] font-extrabold select-none">
              Company
            </h4>
            <div className="flex flex-col gap-2 text-xs text-gray-300 font-medium">
              <span className="hover:text-white transition-colors cursor-pointer">About Us</span>
              <span className="hover:text-white transition-colors cursor-pointer">Careers</span>
              <span className="hover:text-white transition-colors cursor-pointer">Store Locator</span>
              <span className="hover:text-white transition-colors cursor-pointer">Our Partners</span>
              <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright rules bar at bottom */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-gray-100/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
        <p className="font-medium font-sans">
          &copy; {new Date().getFullYear()} PieMart E-commerce. All rights reserved.
        </p>

        {/* Payments provider badges */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest mr-1 font-bold">Payments:</span>
          <div className="text-gray-400 flex items-center gap-2.5">
            {/* Visual Credit Card boxes inside styling */}
            <span className="bg-white/5 border border-white/10 px-2 py-1 rounded-sm text-[10px] font-mono tracking-wider">VISA</span>
            <span className="bg-white/5 border border-white/10 px-2 py-1 rounded-sm text-[10px] font-mono tracking-wider">AMEX</span>
            <span className="bg-white/5 border border-white/10 px-2 py-1 rounded-sm text-[10px] font-mono tracking-wider">BANK</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
