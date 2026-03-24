import { useNavigate } from "react-router";
// Added Twitter, Github, and Mail for the footer
import { 
  TrendingUp, Warehouse, DollarSign, Truck, RotateCcw, ArrowRight, 
  CheckCircle2, Clock, Sparkles, Lock, Leaf, Sun, Twitter, Github, Mail 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useAgent } from "../context/AgentContext";

const agents = [
  {
    id: 1,
    title: "Step 1: Predict Your Harvest",
    shortTitle: "Yield Prediction",
    description: "Figure out how much crop you will have based on the season and your land.",
    icon: TrendingUp,
    color: "#2E7D32", 
    bgColor: "bg-[#E8F5E9]",
    path: "/agent-yield",
    outputs: [ "Confidence in Estimate"],
  },
  {
    id: 2,
    title: "Step 2: Plan Your Storage",
    shortTitle: "Storage Optimization",
    description: "Find the best warehouse for your harvest size and type to reduce waste.",
    icon: Warehouse,
    color: "#7c3aed", 
    bgColor: "bg-[#F1F8F4]",
    path: "/agent-storage",
    outputs: ["Recommended Warehouse", "Space Needed"],
  },
  {
    id: 3,
    title: "Step 3: Check Market Prices",
    shortTitle: "Market Analysis",
    description: "See what buyers are paying and where demand is highest before you sell.",
    icon: DollarSign,
    color: "#F9A825", 
    bgColor: "bg-[#FFF8E1]",
    path: "/agent-price",
    outputs: ["Best Market to Sell", "Expected Sale Price"],
  },
  {
    id: 4,
    title: "Step 4: Book Your Transport",
    shortTitle: "Transport Planning",
    description: "Arrange a truck to get your crops from storage to the market at the best price.",
    icon: Truck,
    color: "#689F38", 
    bgColor: "bg-[#F1F8E9]",
    path: "/agent-transport",
    outputs: ["Transport Cost", "Truck Type"],
  },
];

export function Workflow() {
  const navigate = useNavigate();
  const { agent1Data, agent2Data, agent3Data, agent4Data, resetAllData } = useAgent();

  const agentStatus = [
    !!agent1Data.predictedYield,
    !!agent2Data.recommendedStorage,
    !!agent3Data.bestMarket,
    !!agent4Data.transportCost,
  ];

  const completedCount = agentStatus.filter(Boolean).length;

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all data and start over?")) {
      resetAllData();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F8F4] via-white to-[#E8F5E9] relative overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFE082] rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#2E7D32] rounded-full blur-3xl"></div>
      </div>
      <div className="absolute top-20 right-40 opacity-5 animate-pulse">
          <Sun className="w-20 h-20 text-[#FFE082]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Section */}
        <div className="mb-12">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-white/50 text-[#1B5E20] border-[#1B5E20]/20 px-4 py-1.5 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Guided Supply Chain
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#263238] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Your GreenHarvest Journey
            </h1>
            <p className="text-lg text-[#546E7A] max-w-2xl mx-auto">
              Follow these simple steps in order. Information from each step helps plan the next one, ensuring a smooth journey for your crops.
            </p>
          </div>

          <div className="flex justify-center gap-3 mb-10">
            <Button 
              onClick={() => navigate("/dashboard")}
              size="lg"
              className="gap-2 bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] hover:from-[#2E7D32] hover:to-[#1B5E20] shadow-lg rounded-xl font-semibold"
            >
              View Dashboard
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button 
              onClick={handleReset} 
              size="lg"
              variant="outline" 
              className="gap-2 border-2 border-[#E0E0E0] hover:bg-red-50 hover:border-red-300 hover:text-red-700 rounded-xl font-semibold"
            >
              <RotateCcw className="w-4 h-4" />
              Start New Plan
            </Button>
          </div>

          {/* Progress Card */}
          <Card className="bg-white/50 border-2 shadow-lg backdrop-blur-sm rounded-2xl overflow-hidden" style={{ borderColor: '#2E7D3220' }}>
            <CardContent className="py-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md" style={{ background: 'linear-gradient(135deg, #2E7D32 0%, #2E7D32dd 100%)' }}>
                    <Leaf className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-[#546E7A]">Planning Progress</span>
                    <div className="text-2xl font-bold text-[#263238]">{completedCount} of 4 Steps Complete</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-[#2E7D32]">
                    {Math.round((completedCount / 4) * 100)}%
                  </div>
                </div>
              </div>
              <div className="w-full bg-[#E0E0E0] rounded-full h-5 shadow-inner">
                <div
                  className="bg-gradient-to-r from-[#2E7D32] to-[#81C784] h-5 rounded-full transition-all duration-700 shadow-md"
                  style={{ width: `${(completedCount / 4) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {agents.map((agent, index) => {
            const isCompleted = agentStatus[index];
            const isLocked = index > 0 && !agentStatus[index - 1];
            const Icon = agent.icon;

            return (
              <Card
                key={agent.id}
                className={`border-2 transition-all duration-300 relative overflow-hidden rounded-2xl shadow-lg ${
                  isLocked ? "bg-slate-50 grayscale" : "hover:shadow-2xl bg-white/80"
                } ${isCompleted ? "border-2 shadow-md" : "border-[#E0E0E0]"}`}
                style={{ borderColor: isCompleted ? agent.color : '#2E7D3210' }}
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105"
                      style={{ background: isLocked ? '#94a3b8' : `linear-gradient(135deg, ${agent.color} 0%, ${agent.color}dd 100%)` }}
                    >
                      {isLocked ? <Lock className="w-8 h-8 text-white" /> : <Icon className="w-8 h-8 text-white" />}
                    </div>
                    <Badge variant={isCompleted ? "default" : "outline"} style={{ 
                        backgroundColor: isCompleted ? agent.color : 'transparent',
                        borderColor: agent.color,
                        color: isCompleted ? 'white' : agent.color 
                    }} className="font-semibold text-xs py-1 px-3">
                      {isCompleted ? "Plan Saved" : isLocked ? "Waiting" : "Next Step"}
                    </Badge>
                  </div>
                  <CardTitle className="mt-5 text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>{agent.title}</CardTitle>
                  <CardDescription className="text-base text-slate-600 leading-relaxed">{agent.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-5">
                  <div className={`${agent.bgColor} rounded-xl p-4 border border-black/5`}>
                    <p className="text-xs font-semibold mb-3" style={{ color: agent.color }}>RESULTS TO LOOK FOR:</p>
                    <div className="flex flex-wrap gap-2">
                      {agent.outputs.map((out, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs font-medium bg-white" style={{
                          borderColor: agent.color,
                          color: agent.color
                        }}>
                          {out}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => !isLocked && navigate(agent.path)}
                    disabled={isLocked}
                    className="w-full h-14 text-lg font-semibold shadow-lg group-hover:shadow-xl transition-all rounded-xl text-white"
                    style={{ background: isLocked ? '#cbd5e1' : `linear-gradient(135deg, ${agent.color} 0%, ${agent.color}dd 100%)` }}
                  >
                    {isCompleted ? "Change Details" : isLocked ? "Waiting on Previous Step" : "Start Agent"}
                    {!isLocked && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
                  </Button>

                  {isLocked && (
                    <p className="text-sm text-center text-slate-500 font-medium">
                      Please finish {agents[index-1].title.split(': ')[1]} first.
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="bg-white/90 rounded-3xl p-10 shadow-2xl backdrop-blur-sm border-2 overflow-hidden mb-20" style={{ borderColor: '#2E7D3210' }}>
            <div className="absolute inset-0 opacity-5">
                <Sun className="w-60 h-60 text-[#FFE082] absolute -top-10 -right-10" />
            </div>
          <div className="relative text-center mb-12">
            <h3 className="text-3xl font-bold text-[#263238] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Why Choose Us</h3>
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gradient-to-br from-[#E8F5E9] to-[#F1F8F4] p-8 rounded-2xl border-2 border-[#2E7D32]/10 shadow-lg">
              <div className="mx-auto w-16 h-16 bg-[#2E7D32] text-white rounded-full flex items-center justify-center mb-6 font-bold text-2xl shadow-xl">1</div>
              <h4 className="font-bold mb-3 text-xl" style={{ color: '#1B5E20' }}>Zero-Waste Logistics</h4>
              <p className="text-base text-slate-700 leading-relaxed">By syncing harvest predictions directly with storage and transport, you eliminate the risk of overbooking or crop spoilage due to lack of space.</p>
            </div>
            <div className="bg-gradient-to-br from-[#F1F8F4] to-[#FFF8E1] p-8 rounded-2xl border-2 border-[#F9A825]/10 shadow-lg">
              <div className="mx-auto w-16 h-16 bg-[#F9A825] text-white rounded-full flex items-center justify-center mb-6 font-bold text-2xl shadow-xl">2</div>
              <h4 className="font-bold mb-3 text-xl" style={{ color: '#F57F17' }}>Reliable Data Chain</h4>
              <p className="text-base text-slate-700 leading-relaxed">We connect your harvest, storage, and market data into a single chain. This removes the risk of using incorrect information, making your entire plan dependable.</p>
            </div>
            <div className="bg-gradient-to-br from-[#FFF8E1] to-[#E8F5E9] p-8 rounded-2xl border-2 border-[#2E7D32]/10 shadow-lg">
              <div className="mx-auto w-16 h-16 bg-[#689F38] text-white rounded-full flex items-center justify-center mb-6 font-bold text-2xl shadow-xl">3</div>
              <h4 className="font-bold mb-3 text-xl" style={{ color: '#558B2F' }}>Scalable Operations</h4>
              <p className="text-base text-slate-700 leading-relaxed">Whether managing one farm or a regional cooperative, the pipeline scales to handle any volume without losing precision.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section Integrated Here */}
      <footer className="bg-[#263238] text-white pt-16 pb-8">
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
                <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2E7D32] transition-colors">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2E7D32] transition-colors">
                  <Github className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2E7D32] transition-colors">
                  <Mail className="w-5 h-5" />
                </button>
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