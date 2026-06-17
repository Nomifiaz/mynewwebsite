import React, { useState } from "react";
import { Search, Package, Truck, Compass, CheckCircle2, ShieldAlert, ArrowRight, ClipboardList, Clock, ArrowLeft } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data";

interface TrackingEvent {
  title: string;
  description: string;
  time: string;
  date: string;
  status: "completed" | "current" | "upcoming";
}

interface OrderDetails {
  orderId: string;
  email: string;
  status: "Processing" | "Shipped" | "In Transit" | "Delivered" | "Cancelled";
  estDelivery: string;
  carrier: string;
  trackingNumber: string;
  items: {
    product: Product;
    quantity: number;
    pricePaid: number;
  }[];
  timeline: TrackingEvent[];
}

export default function OrderTracking() {
  const [orderQuery, setOrderQuery] = useState("");
  const [emailQuery, setEmailQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [foundOrder, setFoundOrder] = useState<OrderDetails | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Pre-configured mock database of orders
  const mockOrders: Record<string, OrderDetails> = {
    "PM-2026A": {
      orderId: "PM-2026A",
      email: "guest@example.com",
      status: "In Transit",
      estDelivery: "June 20, 2026 by 8:00 PM",
      carrier: "FedEx Express Priority",
      trackingNumber: "FX-88231920-PM",
      items: [
        { product: PRODUCTS[0], quantity: 1, pricePaid: PRODUCTS[0].price },
        { product: PRODUCTS[2], quantity: 2, pricePaid: PRODUCTS[2].price }
      ],
      timeline: [
        {
          title: "Order Placed Successfully",
          description: "Payment approved and authorized. Order received by PieMart fulfillment center.",
          time: "09:14 AM",
          date: "June 16, 2026",
          status: "completed"
        },
        {
          title: "Processing & Quality Inspection Verified",
          description: "Items picked, double-tested for custom electronics benchmarks and signed off.",
          time: "02:30 PM",
          date: "June 16, 2026",
          status: "completed"
        },
        {
          title: "Dispatched from New York Hub",
          description: "Package loaded onto direct linehaul fleet heading to logistics destination corridor.",
          time: "08:15 PM",
          date: "June 16, 2026",
          status: "completed"
        },
        {
          title: "In Transit near Local Sorting Facility",
          description: "Arrived at destination hub. Sorting in progress for immediate regional courier routing.",
          time: "04:50 AM",
          date: "June 17, 2026",
          status: "current"
        },
        {
          title: "Out for Residential Delivery",
          description: "Assigned to the local postal vehicle driver. Scheduled route completion today.",
          time: "Est: 08:30 AM",
          date: "June 18, 2026",
          status: "upcoming"
        }
      ]
    },
    "PM-2026B": {
      orderId: "PM-2026B",
      email: "hello@world.com",
      status: "Delivered",
      estDelivery: "Completed June 15, 2026",
      carrier: "UPS Next Day Air",
      trackingNumber: "1Z-99AA1012-P1",
      items: [
        { product: PRODUCTS[1], quantity: 1, pricePaid: PRODUCTS[1].price }
      ],
      timeline: [
        {
          title: "Order Placed",
          description: "Authorized with welcome coupons applied.",
          time: "08:00 AM",
          date: "June 14, 2026",
          status: "completed"
        },
        {
          title: "Dispatched",
          description: "Sent out bound courier.",
          time: "11:30 AM",
          date: "June 14, 2026",
          status: "completed"
        },
        {
          title: "Delivered & Signed",
          description: "Successfully dropped off at front porch container box. Standard safety photo logged.",
          time: "02:15 PM",
          date: "June 15, 2026",
          status: "completed"
        }
      ]
    },
    "PM-2026C": {
      orderId: "PM-2026C",
      email: "user@brand.com",
      status: "Processing",
      estDelivery: "June 22, 2026",
      carrier: "DHL International Express-S",
      trackingNumber: "DHL-6671049-PIE",
      items: [
        { product: PRODUCTS[3] || PRODUCTS[0], quantity: 1, pricePaid: (PRODUCTS[3] || PRODUCTS[0]).price }
      ],
      timeline: [
        {
          title: "Order Received",
          description: "PieMart received your product inventory reservation request. Awaiting credit verification.",
          time: "03:10 AM",
          date: "June 17, 2026",
          status: "current"
        },
        {
          title: "Carrier Assignation",
          description: "Scheduled dispatch pickup for shipping label validation.",
          time: "Est: 11:00 AM",
          date: "June 18, 2026",
          status: "upcoming"
        }
      ]
    }
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    const cleanedId = orderQuery.trim().toUpperCase();

    if (!cleanedId) {
      setErrorMessage("Please enter a valid Order Number (e.g. PM-2026A)");
      setFoundOrder(null);
      setSearched(true);
      return;
    }

    if (mockOrders[cleanedId]) {
      setFoundOrder(mockOrders[cleanedId]);
      setErrorMessage("");
    } else {
      // Dynamic fallback trace to support users entering any hypothetical id
      if (cleanedId.startsWith("PM-") || cleanedId.length >= 5) {
        // Generate a random but realistic trace status dynamically so ANY format is supported!
        const randomItem = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
        const generatedOrder: OrderDetails = {
          orderId: cleanedId,
          email: emailQuery || "customer@piemart.com",
          status: "Processing",
          estDelivery: "June 25, 2026 by End of Day",
          carrier: "USPS ground Advantage",
          trackingNumber: `USPS-${Math.floor(1000000 + Math.random() * 9000000)}-PM`,
          items: [
            { product: randomItem, quantity: 1, pricePaid: randomItem.price }
          ],
          timeline: [
            {
              title: "Payment Approved & Logged",
              description: "Cleared checkout merchant validation check and safely queued into live packing pipeline.",
              time: "10:15 AM",
              date: "June 17, 2026",
              status: "completed"
            },
            {
              title: "Preparation & Wrapping Flow",
              description: "Affixing anti-static cellular bubble linings. Initial freight carrier booking.",
              time: "Pending",
              date: "June 18, 2026",
              status: "current"
            }
          ]
        };
        setFoundOrder(generatedOrder);
        setErrorMessage("");
      } else {
        setErrorMessage("Order Number not found in active database. Try checking standard tags PM-2026A, PM-2026B or PM-2026C.");
        setFoundOrder(null);
      }
    }
    setSearched(true);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 select-none animate-fade-in text-left">
      
      {/* Dynamic Header */}
      <div className="bg-[#fff3ea] border border-[#ffdfcb] rounded-2xl p-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <span className="bg-[#F37D35] text-white font-bold text-xs uppercase px-3 py-1 rounded-sm w-fit">
            Parcel Intelligence
          </span>
          <h1 className="font-display text-4xl font-black text-[#002B24] tracking-tight">Order Tracking System</h1>
          <p className="text-gray-600 text-xs max-w-md font-medium leading-relaxed">
            Instantly query shipping telemetry, courier updates, and chronological storage dispatch statuses for PieMart cargo boxes.
          </p>
        </div>
        <div className="flex items-center gap-4 shrink-0 bg-white p-4 rounded-xl border border-orange-150 shadow-sm text-left">
          <Truck size={32} className="text-[#F37D35]" />
          <div className="flex flex-col">
            <span className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Active Carriers</span>
            <span className="text-xs font-bold text-[#002B24]">FedEx, UPS & DHL Express</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Search Parameter Panel Card */}
        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-display font-extrabold text-[#002B24] text-lg mb-2">Track Shipment</h2>
          <p className="text-xs text-gray-400 mb-5 font-medium">Type your invoice ID details and optional purchaser address to trace coordinates.</p>

          <form onSubmit={handleTrackSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs uppercase font-extrabold tracking-wider text-gray-500 mb-1.5 text-left">
                Order Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. PM-2026A"
                  value={orderQuery}
                  onChange={(e) => setOrderQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-mono font-bold focus:outline-none focus:border-[#002B24] text-[#002B24]"
                />
                <Package size={14} className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-extrabold tracking-wider text-gray-500 mb-1.5 text-left">
                Billing Email Address (Optional)
              </label>
              <input
                type="email"
                placeholder="e.g. guest@example.com"
                value={emailQuery}
                onChange={(e) => setEmailQuery(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#002B24]"
              />
            </div>

            {errorMessage && (
              <div className="bg-red-50 border border-red-100 p-3 rounded-lg text-xs text-red-600 flex items-start gap-2">
                <ShieldAlert size={14} className="shrink-0 mt-0.5" />
                <span className="font-semibold leading-relaxed">{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#002B24] hover:bg-[#00382e] text-white py-3 text-xs font-bold rounded-xl cursor-pointer transition-transform active:scale-98 flex items-center justify-center gap-2"
            >
              <Search size={14} /> Search Database
            </button>
          </form>

          {/* Quick shortcuts to play in sandbox */}
          <div className="mt-8 pt-6 border-t border-gray-150 text-left">
            <span className="text-[10px] uppercase font-black text-[#F37D35] tracking-widest block mb-3">
              Sandbox Test Orders
            </span>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setOrderQuery("PM-2026A");
                  setEmailQuery("guest@example.com");
                }}
                className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 border border-gray-200 hover:bg-[#fff9f5] hover:border-[#ffd6bc] text-xs font-medium text-gray-700 transition-colors w-full cursor-pointer text-left"
              >
                <div className="flex flex-col">
                  <span className="font-mono font-bold text-[#002B24]">PM-2026A</span>
                  <span className="text-[10px] text-gray-400">Status: In Transit (Heavy)</span>
                </div>
                <ArrowRight size={12} className="text-gray-400" />
              </button>

              <button
                onClick={() => {
                  setOrderQuery("PM-2026B");
                  setEmailQuery("hello@world.com");
                }}
                className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 border border-gray-200 hover:bg-[#fff9f5] hover:border-[#ffd6bc] text-xs font-medium text-gray-700 transition-colors w-full cursor-pointer text-left"
              >
                <div className="flex flex-col">
                  <span className="font-mono font-bold text-[#002B24]">PM-2026B</span>
                  <span className="text-[10px] text-gray-400">Status: Delivered (Success)</span>
                </div>
                <ArrowRight size={12} className="text-gray-400" />
              </button>

              <button
                onClick={() => {
                  setOrderQuery("PM-2026C");
                  setEmailQuery("user@brand.com");
                }}
                className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 border border-gray-200 hover:bg-[#fff9f5] hover:border-[#ffd6bc] text-xs font-medium text-gray-700 transition-colors w-full cursor-pointer text-left"
              >
                <div className="flex flex-col">
                  <span className="font-mono font-bold text-[#002B24]">PM-2026C</span>
                  <span className="text-[10px] text-gray-400">Status: Processing</span>
                </div>
                <ArrowRight size={12} className="text-gray-400" />
              </button>
            </div>
          </div>

        </div>

        {/* Dynamic Display of order results */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {!searched && !foundOrder ? (
            <div className="bg-white border rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-4 text-gray-400 shadow-sm min-h-[400px]">
              <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center text-[#F37D35]">
                <ClipboardList size={30} />
              </div>
              <h3 className="font-display font-extrabold text-[#002B24] text-lg">Awaiting Query Parameters</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed font-semibold">
                Submit an order identifier (such as <span className="font-mono text-xs font-bold text-[#F37D35]">PM-2026A</span>) to populate dynamic delivery timetables and custom courier details.
              </p>
            </div>
          ) : foundOrder ? (
            <div className="flex flex-col gap-6 animate-fade-in text-left">
              
              {/* Order Metadata Title Panel */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-extrabold text-[#F37D35]">Verified Order</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <h3 className="font-display font-extrabold text-2xl text-[#002B24] font-mono tracking-tight">
                    {foundOrder.orderId}
                  </h3>
                  <p className="text-xs text-gray-400 font-medium">
                    Tracking No: <span className="font-mono font-bold text-gray-700">{foundOrder.trackingNumber}</span> | Carrier: <span className="font-bold text-gray-700">{foundOrder.carrier}</span>
                  </p>
                </div>

                <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
                  <span className="text-[9px] uppercase font-black text-gray-400 tracking-wider">Parcel Status</span>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wide ${
                    foundOrder.status === "Delivered" 
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-150" 
                      : foundOrder.status === "In Transit"
                      ? "bg-blue-50 text-blue-700 border border-blue-150 animate-pulse"
                      : "bg-amber-50 text-amber-700 border border-amber-150"
                  }`}>
                    {foundOrder.status}
                  </span>
                </div>
              </div>

              {/* Progress visual list */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-display font-extrabold text-[#002B24] text-base mb-6 flex items-center gap-2">
                  <Clock size={16} className="text-[#F37D35]" />
                  Delivery Telemetry Checklist
                </h3>

                {/* Vertical timeline stepper */}
                <div className="relative pl-6 border-l border-gray-100 flex flex-col gap-10">
                  {foundOrder.timeline.map((event, index) => {
                    const isCompleted = event.status === "completed";
                    const isCurrent = event.status === "current";

                    return (
                      <div key={index} className="relative select-none">
                        
                        {/* Circle Bullet Badge */}
                        <span className={`absolute -left-10 top-0.5 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                          isCompleted
                            ? "bg-emerald-600 border-emerald-600 text-white"
                            : isCurrent
                            ? "bg-orange-500 border-orange-500 text-white shadow-md animate-bounce"
                            : "bg-white border-gray-200 text-gray-300"
                        }`}>
                          {isCompleted ? (
                            <CheckCircle2 size={15} />
                          ) : isCurrent ? (
                            <Compass size={15} className="animate-spin-slow" />
                          ) : (
                            <Package size={13} />
                          )}
                        </span>

                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 pl-4">
                          <div className="flex-grow">
                            <h4 className={`text-xs font-bold ${isCompleted ? "text-gray-800" : isCurrent ? "text-orange-600" : "text-gray-400"}`}>
                              {event.title}
                            </h4>
                            <p className="text-xs text-gray-500 leading-relaxed font-sans font-medium mt-1">
                              {event.description}
                            </p>
                          </div>
                          <div className="shrink-0 text-left md:text-right font-mono text-[10px] text-gray-450 leading-tight">
                            <p className="font-bold text-gray-600">{event.date}</p>
                            <p>{event.time}</p>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>

                {/* Estimate summary line */}
                <div className="mt-8 pt-6 border-t border-gray-105 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-600 shrink-0" />
                    <span className="text-gray-500">Scheduled Arrival Frame:</span>
                    <span className="font-bold text-[#002B24]">{foundOrder.estDelivery}</span>
                  </div>

                  <span className="text-gray-400 font-bold text-[10px] uppercase font-mono bg-gray-50 border px-2.5 py-1 rounded-md">
                    Secured by PieMart Sentinel &copy;
                  </span>
                </div>
              </div>

              {/* Shopping Bag items inside package */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-left">
                <h3 className="font-display font-extrabold text-[#002B24] text-base mb-4">
                  Package Inventory ({foundOrder.items.reduce((acc, i) => acc + i.quantity, 0)} Items)
                </h3>

                <div className="flex flex-col gap-3">
                  {foundOrder.items.map((it, idx) => (
                    <div key={idx} className="flex gap-4 items-center justify-between p-2.5 bg-gray-50 border border-gray-200/60 rounded-xl">
                      <div className="flex gap-3.5 items-center">
                        <img 
                          src={it.product.image} 
                          alt="preview" 
                          referrerPolicy="no-referrer"
                          className="w-11 h-11 object-contain bg-white rounded-lg border p-1"
                        />
                        <div className="text-left">
                          <h4 className="font-bold text-xs text-gray-800 line-clamp-1">{it.product.name}</h4>
                          <p className="text-[10px] text-gray-400 font-medium">Category: {it.product.category} | Brand: {it.product.brand}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="font-sans font-bold text-xs text-gray-800 font-mono">${it.pricePaid} <span className="font-normal text-gray-400">x{it.quantity}</span></p>
                        <p className="text-[10px] font-black text-emerald-600 font-mono">Total paid: ${it.pricePaid * it.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white border rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-3 text-gray-450 shadow-sm min-h-[400px]">
              <ShieldAlert size={36} className="text-orange-500" />
              <h3 className="font-display font-bold text-[#002B24] text-base">Not Found</h3>
              <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
                We couldn't located the specified tracking token. Validate tags from our sidebar guide blocks or insert a custom string format beginning with "PM-".
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
