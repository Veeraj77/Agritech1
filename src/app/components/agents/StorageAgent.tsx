import { useState } from "react";
import { useNavigate } from "react-router";
import { 
  Warehouse, ArrowRight, MapPin, ShieldCheck, 
  Box, Thermometer, Activity, Star, ChevronLeft,
  Leaf, Twitter, Github, Mail 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useAgent } from "../../context/AgentContext";
import { getStorage } from "../../../imports/pasted_text/agritech-api-service";

export function StorageAgent() {
  const navigate = useNavigate();
  const { agent1Data, updateAgent2 } = useAgent(); 
  
  const currentCrop = agent1Data?.cropName || "RICE";
  const currentYield = agent1Data?.predictedYield || "0"; // e.g., "1091" (in Quintals)
  
  // ✅ CORRECT CONVERSION: Quintals to Metric Tons (MT)
  // Formula: MT = Quintals / 10
  const yieldInMT = (parseFloat(currentYield) / 10).toFixed(2);

  const [location, setLocation] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [storageData, setStorageData] = useState<any>(null);
  const [topFacility, setTopFacility] = useState<{name: string, cap: string} | null>(null);

  const findMaxCapacityStorage = (listString: string) => {
    try {
      const lines = listString.split('\n');
      let maxCap = -1;
      let maxName = "";
      let maxCapStr = "";
      lines.forEach(line => {
        const parts = line.split('|');
        if (parts.length > 1) {
          const name = parts[0].replace('🏠', '').trim();
          const capValue = parseInt(parts[1].replace(/[^0-9]/g, ''), 10);
          if (capValue > maxCap) {
            maxCap = capValue;
            maxName = name;
            maxCapStr = parts[1].trim();
          }
        }
      });
      return { name: maxName, cap: maxCapStr };
    } catch (e) { return null; }
  };

  const handleAnalyze = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!location) return alert("Please select a Target District");
    
    setIsCalculating(true);
    setShowResults(false);

    try {
      const res = await getStorage({ 
        location, 
        quantity: yieldInMT, // Passing the corrected MT value
        crop: currentCrop 
      });

      if (res) {
        setStorageData(res);
        const topOne = findMaxCapacityStorage(res.warehouseList);
        setTopFacility(topOne);
        
        updateAgent2({
          location: location,
          recommendedStorage: topOne?.name || "Local Warehouse",
          yieldQuantity: yieldInMT,
          requiredCapacity: res.spaceNeeded
        });

        setShowResults(true);
      }
    } catch (err) {
      alert("System Offline: API Connection failed.");
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] font-sans">
      <div className="flex-grow p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="flex justify-start">
            <Button 
              onClick={() => navigate(-1)} 
              variant="ghost" 
              className="gap-2 text-slate-500 hover:text-slate-900"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Yield
            </Button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2 uppercase tracking-tight">
                <Warehouse className="text-emerald-600 w-8 h-8" /> AGRI-LOGISTICS AGENT
              </h1>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">Warehouse Discovery</p>
            </div>
            <div className="flex items-center gap-3 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
              <Activity className="w-3 h-3 text-emerald-600 animate-pulse" />
              <span className="text-emerald-800 text-[10px] font-black tracking-widest uppercase">HAFED/HSWC Records</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4">
              <Card className="border-none shadow-xl bg-white rounded-3xl overflow-hidden h-full">
                <div className="h-2 bg-emerald-600" />
                <CardHeader>
                  <CardTitle className="text-slate-800 text-xs font-black uppercase flex items-center gap-2 tracking-widest">
                    <MapPin className="w-4 h-4 text-emerald-600" /> Dispatch Control
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Commodity</Label>
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <Box className="w-5 h-5 text-emerald-600" />
                      <span className="font-black text-slate-700 uppercase text-sm">{currentCrop}</span>
                    </div>
                  </div>

                  {/* ✅ Action Context Box with Corrected MT Logic */}
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <p className="text-[9px] font-bold text-blue-600 uppercase mb-1 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3"/> Action Context
                      </p>
                      <div className="flex flex-col">
                          <span className="text-[10px] text-blue-700 uppercase font-bold tracking-tighter">Total Production for Storage</span>
                          <span className="text-xl text-blue-900 font-black">{yieldInMT} MT</span>
                          <span className="text-[9px] text-blue-500 italic mt-1 font-medium italic">Converted from {currentYield} Quintals</span>
                      </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target District</Label>
                    <Select onValueChange={setLocation} value={location}>
                      <SelectTrigger className="h-14 border-2 border-slate-100 rounded-xl bg-slate-50 font-bold">
                        <SelectValue placeholder="Select Region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ROHTAK">Rohtak</SelectItem>
                        <SelectItem value="SONIPAT">Sonipat</SelectItem>
                        <SelectItem value="PANIPAT">Panipat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={handleAnalyze} 
                    disabled={isCalculating} 
                    className="w-full h-16 bg-slate-900 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-lg transition-all flex gap-2 text-sm uppercase tracking-widest"
                  >
                    {isCalculating ? "Scanning..." : "Scan for Storage"}
                    {!isCalculating && <ArrowRight className="w-4 h-4" />}
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-8 space-y-6">
              {showResults ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                      <div className="p-4 bg-blue-50 rounded-2xl">
                        <Thermometer className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Environment</p>
                        <p className="text-lg font-black text-slate-800 uppercase">{storageData.storageType}</p>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 border-l-4 border-l-emerald-500">
                      <div className="p-4 bg-emerald-50 rounded-2xl">
                        <Star className="w-6 h-6 text-emerald-600 fill-emerald-600" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Primary Selection</p>
                        <p className="text-xs font-black text-slate-800 uppercase truncate">
                          {topFacility?.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Card className="border-none shadow-2xl bg-[#0f172a] rounded-3xl overflow-hidden">
                    <div className="px-6 py-4 bg-slate-800/50 border-b border-slate-700 flex justify-between items-center text-slate-400 text-[10px] font-black uppercase">
                      Regional Log: {location}
                    </div>
                    <CardContent className="p-8 font-mono text-emerald-400 text-xs leading-relaxed">
                      <pre className="whitespace-pre-wrap">{storageData.warehouseList}</pre>
                    </CardContent>
                  </Card>

                  <Button 
                    onClick={() => navigate("/agent-price")} 
                    className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-xl flex gap-3 uppercase tracking-widest text-xs"
                  >
                    Proceed to Market Intelligence <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center bg-white rounded-3xl border-2 border-dashed border-slate-100 p-12 text-center">
                  <Warehouse className="w-16 h-16 text-slate-100 mb-4" />
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em]">Initialize System Scan</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[#263238] text-white pt-16 pb-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Leaf className="w-8 h-8 text-[#81C784]" />
                <span className="text-2xl font-bold tracking-tight">GreenHarvest AI</span>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed mb-6">
                Empowering the global agricultural community with agentic AI intelligence.
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
                <li className="hover:text-[#81C784] cursor-pointer" onClick={() => navigate("/workflow")}>AI Workflow</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">AI Agents</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li>Yield Predictor</li>
                <li>Smart Storage</li>
                <li>Market Analyzer</li>
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