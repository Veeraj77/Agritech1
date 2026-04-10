import { useState, useEffect } from "react";
import { 
  IndianRupee, MapPin, Box, Scale, Loader2, 
  ChevronLeft, AlertCircle, Leaf, Twitter, Github, Mail 
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useAgent } from "../../context/AgentContext";
import { getPriceInsights } from "../../../imports/pasted_text/agritech-api-service.js";
import { useNavigate } from "react-router";

export function PriceMarketAgent() {
  const { agent1Data, agent2Data, updateAgent3 } = useAgent();
  const navigate = useNavigate();
  
  const cropName = (agent1Data?.cropName || "WHEAT").toUpperCase();
  const district = (agent2Data?.location || "SONIPAT").toUpperCase(); 
  
  // ✅ Quantity handling: Use context value if available, else fallback to calculation
  const yieldQuintals = agent1Data?.predictedYield 
    ? parseFloat(agent1Data.predictedYield) 
    : (parseFloat(agent1Data?.predictedYield || "1.05") * (parseFloat(agent1Data?.quantity || "1000") / 1000)) * 10;

  const [loading, setLoading] = useState(true);
  const [marketData, setMarketData] = useState<any>(null);

  // THIS IS THE ONLY PART THAT WAS CHANGED
  const handleProceed = () => {
    // 1. Convert Quintals to Tons
    const yieldInTons = yieldQuintals / 10;
    
    // 2. Navigate and pass the state to the Transport Agent
    navigate("/agent-transport", {
      state: {
        quantity: yieldInTons,
        distance: 150 // Defaulting to 150km as established
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getPriceInsights({
          district: district,
          commodity: cropName
        });
        setMarketData(result);
        updateAgent3({
          expectedPrice: result.price,
          bestMarket: result.market,
          marketDemand: result.trend,
          cropQuantity: yieldQuintals.toFixed(2)
        });
      } catch (err) {
        console.error("UI Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [district, cropName]);

  const calculateTotalValue = () => {
    if (!marketData?.price) return "0";
    const priceValue = parseFloat(marketData.price.replace(/[^\d.]/g, ""));
    return (priceValue * yieldQuintals).toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <div className="flex-grow p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Navigation */}
          <div className="flex justify-start">
            <Button 
              onClick={() => navigate(-1)} 
              variant="ghost" 
              className="gap-2 text-slate-500 hover:text-slate-900"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Logistics
            </Button>
          </div>

          {/* TOP INFO STRIP */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border shadow-sm flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <MapPin className="text-blue-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Market District</p>
                <p className="font-black text-slate-800">{district}</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border shadow-sm flex items-center gap-4">
              <div className="p-3 bg-emerald-50 rounded-xl">
                <Box className="text-emerald-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Commodity</p>
                <p className="font-black text-slate-800">{cropName}</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border shadow-sm flex items-center gap-4">
              <div className="p-3 bg-orange-50 rounded-xl">
                <Scale className="text-orange-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inventory</p>
                <p className="font-black text-slate-800">{yieldQuintals.toFixed(2)} Qtl</p>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col justify-center items-center p-20 space-y-4">
              <Loader2 className="animate-spin w-10 h-10 text-emerald-600" />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fetching Real-time Mandi Rates...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white">
                <div className="h-2 bg-emerald-500" />
                <CardContent className="p-8 space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-5xl font-black text-slate-900 mb-2">{marketData?.price}</h1>
                      <p className="text-sm font-bold text-emerald-600 flex items-center gap-1 uppercase">
                        {marketData?.market} • {marketData?.variety}
                      </p>
                    </div>
                    
                  </div>

                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Estimated Total Revenue</p>
                      <div className="flex items-center gap-2 text-3xl font-black text-slate-800">
                        <IndianRupee className="w-6 h-6 text-slate-400" /> {calculateTotalValue()}
                      </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Agent Advice</p>
                        <p className="font-black text-slate-700">{marketData?.advice}</p>
                    </div>
                  </div>

                  {/* Estimation Disclaimer Note */}
                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3 items-start">
                    <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-blue-800 font-medium leading-relaxed">
                      Note: This revenue estimation is based on real-time Mandi averages. Final earnings may differ based on crop quality (grade), moisture content, and precise Mandi arrival timings.
                    </p>
                  </div>

                  <Button
                    onClick={handleProceed}
                    className="w-full h-16 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl text-sm uppercase tracking-widest transition-all shadow-lg"
                  >
                    Proceed to Transportation
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
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
              <p className="text-gray-400 max-w-md leading-relaxed mb-6">
                Maximizing agricultural profitability through real-time market intelligence and smart logistics coordination.
              </p>
              <div className="flex gap-4">
                <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2E7D32] transition-colors"><Twitter className="w-5 h-5" /></button>
                <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2E7D32] transition-colors"><Github className="w-5 h-5" /></button>
                <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2E7D32] transition-colors"><Mail className="w-5 h-5" /></button>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="hover:text-[#81C784] cursor-pointer" onClick={() => navigate("/dashboard")}>Dashboard</li>
                <li className="hover:text-[#81C784] cursor-pointer" onClick={() => navigate("/workflow")}>Workflow</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Market Intel</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li>Price Trends</li>
                <li>Mandi Directory</li>
                <li>Variety Analysis</li>
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
