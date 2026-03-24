import { useNavigate } from "react-router";
import { 
  ClipboardList, 
  RefreshCw,
  Scale,
  Target,
  Building2,
  Truck, 
  ArrowLeft, 
  Leaf,
  Twitter,
  Github,
  Mail,
  ShieldCheck,
  Zap,
  ChevronRight,
  TrendingUp,
  MapPin,
  Box
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useAgent } from "../context/AgentContext";

export function DashboardNew() {
  const navigate = useNavigate();
  const { agent1Data, agent2Data, agent3Data } = useAgent();

  const clean = (val: any) => {
    const num = parseFloat(String(val).replace(/[^0-9.]/g, ""));
    return isNaN(num) ? 0 : num;
  };

  const yieldAmt = clean(agent1Data.predictedYield);
  const pricePerUnit = clean(agent3Data.expectedPrice);
  const grossRevenue = yieldAmt * pricePerUnit;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900">
      <div className="p-6 md:p-12 max-w-6xl mx-auto">
        
        {/* Header - Removed status tags and "Pro" suffix */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 pb-8 mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 italic">
              GreenHarvest
            </h1>
            <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-widest">Supply Chain Analysis Dashboard</p>
          </div>
          <div className="flex gap-3">
            <Button 
                variant="outline" 
                onClick={() => navigate(-1)} 
                className="border-slate-200 text-slate-600 hover:bg-slate-50 gap-2 h-11 px-6 shadow-sm font-bold transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <Button 
                onClick={() => navigate("/workflow")} 
                className="bg-indigo-600 hover:bg-indigo-700 shadow-md gap-2 h-11 px-6 text-white font-bold transition-all"
            >
              <RefreshCw className="w-4 h-4" /> New Analysis
            </Button>
          </div>
        </div>

        {/* 1. Main Financial Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 bg-white border-none shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden relative border-l-8 border-indigo-600">
            <CardContent className="p-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Settlement Value</p>
                    <h2 className="text-7xl font-black text-slate-900 tracking-tighter">
                        {grossRevenue.toLocaleString()}
                    </h2>
                </div>
                <div className="bg-emerald-50 p-4 rounded-2xl">
                    <TrendingUp className="text-emerald-600" size={32} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-8 border-t border-slate-100">
                <div>
                    <p className="text-[10px] text-slate-400 uppercase font-black">Net Yield Volume</p>
                    {/* Unit changed to Quintals */}
                    <p className="text-xl font-bold text-slate-800">{agent1Data.predictedYield || "0"} Quintals</p>
                </div>
                <div>
                    <p className="text-[10px] text-slate-400 uppercase font-black">Unit Market Rate</p>
                    <p className="text-xl font-bold text-slate-800">{agent3Data.expectedPrice || "0"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6">
              <div className="bg-slate-900 rounded-3xl p-8 text-white h-full flex flex-col justify-between relative overflow-hidden shadow-xl">
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-indigo-400 text-[10px] font-black uppercase tracking-widest">Market Node</span>
                    </div>
                    <h3 className="text-2xl font-black leading-tight">{agent3Data.bestMarket || "Mandi Unassigned"}</h3>
                    <p className="text-slate-400 text-xs mt-2 italic">Optimal logistics route mapped.</p>
                  </div>
                  <Button variant="link" className="text-indigo-400 p-0 h-auto justify-start font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors relative z-10">
                    Market Intelligence <ChevronRight size={14} className="ml-1" />
                  </Button>
                  <MapPin className="absolute -bottom-4 -right-4 text-white opacity-5" size={140} />
              </div>
          </div>
        </div>

        {/* 2. Infrastructure Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm flex items-center justify-between group">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                        <Building2 size={32} />
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black text-indigo-600 uppercase mb-1">Agent 02: Storage</h4>
                        <p className="text-slate-900 font-bold text-lg">{agent2Data.recommendedStorage || "On-field"}</p>
                    </div>
                </div>
                <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full uppercase">Allocated</span>
            </div>

            <div className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm flex items-center justify-between group">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                        <Truck size={32} />
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black text-emerald-600 uppercase mb-1">Agent 04: Transport</h4>
                        <p className="text-slate-900 font-bold text-lg">{agent2Data.transportType || "Standard Freight"}</p>
                    </div>
                </div>
                <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full uppercase">Routed</span>
            </div>
        </div>

        {/* 3. Operational Audit Table */}
        <Card className="border-none shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
            <CardHeader className="bg-slate-50/50 py-5 px-8 border-b border-slate-100 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-indigo-600" />
                    <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-500">System Performance Trace</CardTitle>
                </div>
                <Zap size={16} className="text-amber-400 fill-amber-400" />
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-left">
                <tbody className="text-sm divide-y divide-slate-50">
                  {[
                    { agent: "Agent 01", label: "Predictive Yield Analysis", val: `${agent1Data.predictedYield} Quintals`, icon: Scale, tag: "QUANTITY" },
                    { agent: "Agent 02", label: "Cold Storage Allocation", val: agent2Data.recommendedStorage, icon: Building2, tag: "FACILITY" },
                    { agent: "Agent 03", label: "Target Mandi Strategy", val: agent3Data.bestMarket, icon: Target, tag: "DESTINATION" },
                    { agent: "Agent 04", label: "Logistics Fleet Dispatch", val: agent2Data.transportType || "Secured Logistics", icon: Truck, tag: "TRANSIT" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                        <td className="px-8 py-5">
                            <div className="flex items-center gap-4">
                                <row.icon size={18} className="text-slate-300" />
                                <div>
                                    <p className="text-[9px] font-black text-indigo-400 uppercase leading-none mb-1">{row.agent}</p>
                                    <p className="font-bold text-slate-700">{row.label}</p>
                                </div>
                            </div>
                        </td>
                        <td className="px-8 py-5 text-slate-500 font-medium">{row.val || "Confirmed"}</td>
                        <td className="px-8 py-5 text-right">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">{row.tag}</span>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
        </Card>

      </div>

      {/* Footer */}
      <footer className="bg-[#263238] text-white pt-16 pb-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Leaf className="w-8 h-8 text-[#81C784]" />
                <span className="text-2xl font-bold tracking-tight">GreenHarvest</span>
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
            <p>© 2026 GreenHarvest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}