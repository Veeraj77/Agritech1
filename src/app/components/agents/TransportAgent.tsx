import { useState, useEffect } from "react";
import { 
  Truck, ChevronLeft, AlertCircle, Leaf, 
  Twitter, Github, Mail, Info, CopyCheck
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useNavigate, useLocation } from "react-router";
import { getTransportCost } from "../../../imports/pasted_text/agritech-api-service.js";

export function TransportAgent() {
  const navigate = useNavigate();
  const location = useLocation();

  const vehicleImages: Record<string, string> = {
    "Tata Ace": "/vehicles/tata-ace.jpg",
    "Ashok Leyland Dost": "/vehicles/ashok-leyland-dost.jpg",
    "Tata 407": "/vehicles/tata-407.jpg",
    "Mahindra Bolero Pickup": "/vehicles/mahindra-bolero-pickup.jpg",
    "Eicher Pro 2049": "/vehicles/eicher-pro-2049.jpg",
    "Tata 709g LPT": "/vehicles/tata-709g-lpt.jpg",
    "Tata LPT 1615": "/vehicles/tata-lpt-1615.jpg",
    "Ashok Leyland 1618": "/vehicles/ashok-leyland-1618.jpg",
    "BharatBenz 1923C": "/vehicles/bharatbenz-1923c.jpg",
    "default": "/vehicles/default.png",
  };

  const [vehicleData, setVehicleData] = useState<any>(null);
  
  // Lift the quantity variable up so our UI can use it for math!
  const totalLoad = location.state?.quantity || 10; 
  const distance = location.state?.distance || 150;

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const result = await getTransportCost(totalLoad, distance); 
        
        if (result && !result.error) {
            setVehicleData(result);
        } else {
            console.error("Invalid transport data received", result);
        }
      } catch (error) {
        console.error("Transport fetch failed:", error);
      }
    };

    fetchVehicle();
  }, [totalLoad, distance]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <div className="flex-grow p-6">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* Navigation Back Button */}
          <div className="flex justify-start">
            <Button 
              onClick={() => navigate(-1)} 
              variant="ghost" 
              className="gap-2 text-slate-500 hover:text-slate-900"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Market Rates
            </Button>
          </div>

          <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white">
            <div className="h-2 bg-slate-900" />
            <CardContent className="p-8 space-y-6">

              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2 uppercase tracking-tight">
                  <Truck className="text-blue-600 w-8 h-8" /> Transport Recommendation
                </h2>
                <div className="bg-blue-50 px-3 py-1 rounded-full border border-blue-100 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">Optimal Logistics</span>
                </div>
              </div>

              {vehicleData ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

                  {/* SAFE IMAGE LOGIC */}
                  {(() => {
                    const normalizeKey = (str: string) => {
                      return str?.toLowerCase().replace(/[^a-z0-9]/g, "");
                    };

                    const modelKey = vehicleData.model || "";

                    const matchedKey = Object.keys(vehicleImages).find(
                      (key) => normalizeKey(key) === normalizeKey(modelKey)
                    );

                    const imageSrc = matchedKey
                      ? vehicleImages[matchedKey]
                      : "/vehicles/default.png";

                    return (
                      // FIXED: Added bg-white to the container
                      <div className="relative group overflow-hidden rounded-2xl border border-slate-200 bg-white">
                        <img
                          src={imageSrc}
                          alt={modelKey}
                          // FIXED: Changed object-cover to object-contain and added p-4
                          className="w-full h-64 object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.src = "/vehicles/default.png";
                          }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex justify-between items-end">
                          <div>
                            <p className="text-white text-xs font-bold uppercase tracking-widest opacity-80">Recommended Model</p>
                            <h3 className="text-white text-3xl font-black uppercase">{vehicleData.model}</h3>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* FLEET REQUIREMENT BANNER (Only shows if multiple trucks are needed) */}
                  {totalLoad > vehicleData.capacity && (
                    <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-200 flex justify-between items-center shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-600 rounded-xl text-white shadow-md">
                          <CopyCheck className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1">Fleet Requirement</p>
                          <h3 className="text-2xl font-black text-slate-800">
                            {Math.ceil(totalLoad / vehicleData.capacity)} Trucks Needed
                          </h3>
                        </div>
                      </div>
                      <div className="text-right bg-white p-3 rounded-xl border border-indigo-100">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Harvest Load</p>
                          <p className="font-black text-slate-700">{Number(totalLoad).toFixed(1)} Tons</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* VEHICLE TYPE */}
                    <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">Vehicle Class</p>
                      <h3 className="text-xl font-black text-slate-800 uppercase">
                        {vehicleData.vehicle_type}
                      </h3>
                    </div>

                    {/* SPECS */}
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Max Payload</p>
                        <p className="font-black text-slate-700">{vehicleData.capacity} Tons</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Efficiency</p>
                        <p className="font-black text-slate-700">{vehicleData.mileage} KM/L</p>
                      </div>
                    </div>
                  </div>

                  {/* COST */}
                  <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">
                        Base Rate (Estimated)
                      </p>
                      <h3 className="text-3xl font-black text-slate-900">
                        ₹{vehicleData.cost_per_tonne_per_km} <span className="text-sm font-medium text-slate-500">/ tonne / km</span>
                      </h3>
                    </div>
                    <div className="p-4 bg-white rounded-xl shadow-sm border border-emerald-100">
                      <Info className="w-5 h-5 text-emerald-600" />
                    </div>
                  </div>

                  {/* Note Box */}
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-3 items-start">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
                      Disclaimer: Transport costs are dynamic estimations based on current fuel prices and typical regional scales. Final rates may vary based on route difficulty, loading/unloading wait times, and seasonal demand.
                    </p>
                  </div>

                  {/* DASHBOARD BUTTON */}
                  <Button
                    onClick={handleDashboard}
                    className="w-full h-16 bg-slate-900 hover:bg-emerald-600 text-white font-black rounded-2xl text-sm uppercase tracking-widest transition-all shadow-lg"
                  >
                    View Dashboard Analytics
                  </Button>

                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                   <Loader2 className="animate-spin w-10 h-10 text-slate-300" />
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">
                    Scanning Logistics Network...
                   </p>
                </div>
              )}

            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#263238] text-white pt-16 pb-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Leaf className="w-8 h-8 text-[#81C784]" />
                <span className="text-2xl font-bold tracking-tight">GreenHarvest AI</span>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed mb-6 text-sm">
                Bridging the gap between the field and the market through intelligent logistics and vehicle recommendations.
              </p>
              <div className="flex gap-4">
                <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2E7D32] transition-colors"><Twitter className="w-4 h-4" /></button>
                <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2E7D32] transition-colors"><Github className="w-4 h-4" /></button>
                <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2E7D32] transition-colors"><Mail className="w-4 h-4" /></button>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Explore</h4>
              <ul className="space-y-4 text-gray-400 text-xs uppercase tracking-widest">
                <li className="hover:text-[#81C784] cursor-pointer" onClick={() => navigate("/dashboard")}>Analytics</li>
                <li className="hover:text-[#81C784] cursor-pointer" onClick={() => navigate("/workflow")}>Agent Flow</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Logistics</h4>
              <ul className="space-y-4 text-gray-400 text-xs uppercase tracking-widest">
                <li>Vehicle Specs</li>
                <li>Fuel Efficiency</li>
                <li>Route Optimizer</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-500">
            <p>© 2026 GreenHarvest AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Dummy loader component in case it's missing from your UI folder
function Loader2({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
  )
}