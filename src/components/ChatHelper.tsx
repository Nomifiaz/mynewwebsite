import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Sparkles, User, ShoppingCart, Tag } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data";

interface ChatHelperProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, qty: number) => void;
}

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
  suggestedProduct?: Product;
}

export default function ChatHelper({ onSelectProduct, onAddToCart }: ChatHelperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m0",
      sender: "bot",
      text: "Hello! I am your PieMart Assistant. 🍰 Look up high-tech accessories, ask about active promotions, or request specs for the Zenith Series X2!",
      timestamp: new Date()
    }
  ]);

  const listEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      listEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `m-usr-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setQuery("");

    // Simulate smart bot responses based on natural keywords
    setTimeout(() => {
      const lowerText = userMsg.text.toLowerCase();
      let replyText = "I'm here to help! I can assist with product search, check specs, or find active discounts. Ask me about 'watches', 'laptops', or 'discounts'!";
      let suggestedProduct: Product | undefined;

      if (lowerText.includes("discount") || lowerText.includes("coupon") || lowerText.includes("promo") || lowerText.includes("code")) {
        replyText = "We have wonderful offers active! Try placing 'PIE30' in your Shopping Cart for a substantial 30% off, or 'WELCOME10' to save 10% on your registration!";
      } 
      else if (lowerText.includes("watch") || lowerText.includes("zenith") || lowerText.includes("chronograph") || lowerText.includes("wearable")) {
        suggestedProduct = PRODUCTS.find(p => p.id === "zenith-x2");
        replyText = "The Zenith Series X2 Chronograph is our best seller right now, constructed with grade-5 titanium and a Swiss movement, currently 30% off!";
      } 
      else if (lowerText.includes("laptop") || lowerText.includes("mac") || lowerText.includes("computer")) {
        suggestedProduct = PRODUCTS.find(p => p.id === "pro-laptop");
        replyText = "Our top model computer is the Pro Series Laptop M2, a professional workhouse with 16GB RAM and a fluid Liquid Retina screen, priced at $2,499!";
      } 
      else if (lowerText.includes("headphone") || lowerText.includes("audio") || lowerText.includes("speaker") || lowerText.includes("buds")) {
        suggestedProduct = PRODUCTS.find(p => p.id === "soundpure-anc");
        replyText = "Looking for high fidelity? Check out the SoundPure Active ANC over-ear headphones, sporting custom 40mm drivers and hybrid ANC!";
      } 
      else if (lowerText.includes("search") || lowerText.includes("find")) {
        // Try searching by exact names
        const found = PRODUCTS.find(p => lowerText.includes(p.name.toLowerCase()) || lowerText.includes(p.brand.toLowerCase()));
        if (found) {
          suggestedProduct = found;
          replyText = `Absolutely, I located the ${found.name}! Under department ${found.category}, styled in custom color layouts. Here are the details:`;
        } else {
          replyText = "I searched our electronics department but couldn't locate that exact keyword. Try search queries like 'Nexus', 'Nomad', or 'Canvas Pad'!";
        }
      }

      const botMsg: Message = {
        id: `m-bot-${Date.now()}`,
        sender: "bot",
        text: replyText,
        timestamp: new Date(),
        suggestedProduct
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      {/* Floating Button Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-[#002B24] hover:bg-[#00382e] shadow-xl text-white flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 group relative"
          title="Open Shopping Assistant"
        >
          <MessageSquare size={22} className="group-hover:rotate-6 transition-transform" />
          <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white leading-none">
            !
          </span>
        </button>
      )}

      {/* Floating Chat Panel Box */}
      {isOpen && (
        <div className="bg-white rounded-2xl w-[340px] h-[460px] shadow-2xl flex flex-col border border-gray-100 overflow-hidden animate-fade-in relative">
          
          {/* Panel Header */}
          <div className="bg-[#002B24] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#F37D35] flex items-center justify-center text-white text-xs font-bold font-mono">
                PM
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold tracking-wide">PieMart Concierge</h4>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[9px] text-emerald-400 font-semibold font-sans uppercase">Online Helper</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/75 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages Streams */}
          <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-3 font-sans">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 max-w-[85%] ${
                  m.sender === "user" ? "self-end flex-row-reverse" : "self-start"
                }`}
              >
                {/* Visual sender badge */}
                <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] ${
                  m.sender === "user" ? "bg-gray-100 text-gray-600" : "bg-emerald-50 text-emerald-700 font-bold"
                }`}>
                  {m.sender === "user" ? "U" : "P"}
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <div className={`rounded-xl p-3 text-xs leading-relaxed ${
                    m.sender === "user"
                      ? "bg-[#002B24] text-white font-medium"
                      : "bg-[#f5fbf9] border border-gray-100 text-gray-800"
                  }`}>
                    {m.text}

                    {/* Suggested Product card attachment */}
                    {m.sender === "bot" && m.suggestedProduct && (
                      <div className="mt-3 bg-white border border-gray-100 rounded-lg p-2.5 flex items-center gap-2.5 shadow-xs select-none">
                        <img 
                          src={m.suggestedProduct.image} 
                          alt="preview" 
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 object-contain rounded-md"
                        />
                        <div className="flex-grow text-left">
                          <p className="font-bold text-[10px] text-gray-800 line-clamp-1">{m.suggestedProduct.name}</p>
                          <p className="text-[10px] font-semibold text-emerald-600">${m.suggestedProduct.price}</p>
                        </div>
                        <div className="flex flex-col gap-1 shrink-0">
                          <button
                            onClick={() => {
                              onSelectProduct(m.suggestedProduct!);
                              setIsOpen(false);
                            }}
                            className="bg-gray-50 border hover:bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-[9px] font-bold cursor-pointer transition-colors"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => {
                              onAddToCart(m.suggestedProduct!, 1);
                              alert(`Added 1x ${m.suggestedProduct!.name} to Cart via Concierge!`);
                            }}
                            className="bg-[#F37D35] hover:bg-[#e06c25] text-white px-2 py-1 rounded-md text-[9px] font-bold cursor-pointer transition-colors flex items-center gap-0.5"
                          >
                            <ShoppingCart size={8} /> Add
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-gray-400 font-mono pl-1 text-left">
                    {m.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={listEndRef} />
          </div>

          {/* Form Action Sender */}
          <form 
            onSubmit={handleSendMessage}
            className="p-3 bg-gray-50 border-t border-gray-100 flex gap-2 items-center"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask for discount codes, zenith watch..."
              className="w-full pl-3 pr-2 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#002B24]"
            />
            <button
              type="submit"
              className="bg-[#002B24] hover:bg-[#003c32] text-white p-2.5 rounded-lg cursor-pointer transition-colors shrink-0"
              title="Send query"
            >
              <Send size={12} />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
