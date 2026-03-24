import { useState } from "react";
import { useNavigate } from "react-router";
import { 
  TrendingUp, ArrowRight, Sparkles, Activity, Map, 
  ChevronLeft, Leaf, Twitter, Github, Mail, AlertCircle 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { useAgent } from "../../context/AgentContext";
import { AgentStepper } from "../AgentStepper";

import { predictYield } from "../../../imports/pasted_text/agritech-api-service";

export function CropYieldAgent() {
  const navigate = useNavigate();
  const { agent1Data, updateAgent1 } = useAgent();

  const [cropSeason, setCropSeason] = useState(agent1Data.cropSeason || "");
  const [cropName, setCropName] = useState(agent1Data.cropName || "");
  const [areaAcre, setAreaAcre] = useState(agent1Data.areaAcre || "");
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(!!agent1Data.predictedYield);

  const handlePredict = async () => {
    if (!cropSeason || !cropName || !areaAcre) {
      alert("Please fill in all fields");
      return;
    }

    setIsCalculating(true);

    try {
      const areaNum = parseFloat(areaAcre);
      let apiFactor = 1;

      try {
        const rawValue = await predictYield({
          season: cropSeason,
          crop: cropName,
          quantity: areaAcre,
        });
        apiFactor = parseFloat(rawValue);
        if (isNaN(apiFactor)) apiFactor = 1;
        apiFactor = Math.max(0.85, Math.min(apiFactor, 1.15));
      } catch (err) {
        apiFactor = 1; 
      }

      const yieldData = {
        Rice: { min: 22, avg: 26, max: 32 },
        Wheat: { min: 18, avg: 20, max: 25 },
      };

      const cropStats = yieldData[cropName] || { min: 20, avg: 22, max: 28 };
      const perAcreYield = cropStats.avg * apiFactor;
      const totalYield = (areaNum * perAcreYield).toFixed(2);
      const minTotal = (areaNum * cropStats.min).toFixed(2);
      const maxTotal = (areaNum * cropStats.max).toFixed(2);

      updateAgent1({
        cropSeason,
        cropName,
        areaAcre,
        predictedYield: totalYield,
        yieldRange: `${minTotal} - ${maxTotal}`,
      });

      setShowResults(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F4FBF6]">
      <div className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
        
        {/* Navigation Back Button */}
        <div className="mb-6">
          <Button 
            onClick={() => navigate(-1)} 
            variant="ghost" 
            className="gap-2 text-slate-600 hover:text-[#1B5E20] hover:bg-white"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
        </div>

        <AgentStepper currentStep={1} />

        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="bg-[#1B5E20] w-14 h-14 rounded-2xl flex items-center justify-center">
            <TrendingUp className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Crop Yield Prediction</h1>
            <p className="text-sm text-gray-500">Realistic AI-assisted prediction</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Card */}
          <Card>
            <CardHeader>
              <CardTitle>Farm Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Crop Season</Label>
                <Select value={cropSeason} onValueChange={setCropSeason}>
                  <SelectTrigger><SelectValue placeholder="Select season" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Rabi">Rabi</SelectItem>
                    <SelectItem value="Kharif">Kharif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Crop Name</Label>
                <Select value={cropName} onValueChange={setCropName}>
                  <SelectTrigger><SelectValue placeholder="Select crop" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Rice">Rice</SelectItem>
                    <SelectItem value="Wheat">Wheat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Area (Acres)</Label>
                <Input
                  type="number"
                  value={areaAcre}
                  onChange={(e) => setAreaAcre(e.target.value)}
                  placeholder="e.g. 23"
                />
              </div>
              <Button onClick={handlePredict} disabled={isCalculating} className="w-full bg-[#1B5E20] hover:bg-[#2E7D32]">
                {isCalculating ? "Calculating..." : "Calculate Yield"}
              </Button>
            </CardContent>
          </Card>

          {/* Output Card */}
          <Card>
            <CardHeader>
              <CardTitle>Forecasted Output</CardTitle>
            </CardHeader>
            <CardContent>
              {!showResults ? (
                <p className="text-gray-400 text-center py-20">
                  Enter details to see prediction
                </p>
              ) : (
                <div className="space-y-4">
                  <div className="p-6 border rounded-xl bg-white">
                    <p className="text-sm text-gray-500">Total Production</p>
                    <h2 className="text-5xl font-bold text-green-700">
                      {agent1Data.predictedYield} QTL
                    </h2>
                  </div>

                  {agent1Data.yieldRange && (
                    <div className="text-sm text-gray-600 font-medium px-1">
                      Expected Range: {agent1Data.yieldRange} QTL
                    </div>
                  )}

                  {/* Note Box */}
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-3 items-start">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 leading-relaxed font-medium">
                      Note: The yield prediction may differ by ±1–5% based on specific field conditions, weather fluctuations, and soil health.
                    </p>
                  </div>

                  <Button onClick={() => navigate("/agent-storage")} className="w-full h-12 text-lg font-semibold bg-[#1B5E20] hover:bg-[#2E7D32]">
                    Next <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
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
              <p className="text-gray-400 max-w-md leading-relaxed mb-6">
                Empowering the global agricultural community with agentic AI intelligence. From soil to sale, we ensure every harvest reaches its maximum potential.
              </p>
              <div className="flex gap-4">
                <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2E7D32] transition-colors"><Twitter className="w-5 h-5" /></button>
                <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2E7D32] transition-colors"><Github className="w-5 h-5" /></button>
                <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2E7D32] transition-colors"><Mail className="w-5 h-5" /></button>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="hover:text-[#81C784] cursor-pointer transition-colors" onClick={() => navigate("/dashboard")}>Dashboard</li>
                <li className="hover:text-[#81C784] cursor-pointer transition-colors" onClick={() => navigate("/workflow")}>AI Workflow</li>
                <li className="hover:text-[#81C784] cursor-pointer transition-colors">Market Trends</li>
                <li className="hover:text-[#81C784] cursor-pointer transition-colors">Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">AI Agents</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="hover:text-[#81C784] cursor-pointer transition-colors">Yield Predictor</li>
                <li className="hover:text-[#81C784] cursor-pointer transition-colors">Smart Storage</li>
                <li className="hover:text-[#81C784] cursor-pointer transition-colors">Market Analyzer</li>
                <li className="hover:text-[#81C784] cursor-pointer transition-colors">Logistics Optimizer</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© 2026 GreenHarvest AI. All rights reserved.</p>
            <div className="flex gap-8">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}