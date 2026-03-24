import { useState } from "react";
import { useNavigate } from "react-router";
import { TrendingUp, Warehouse, DollarSign, Truck, ArrowRight, LayoutDashboard, Play, Sparkles, Zap, Brain, CheckCircle2, Leaf, Sun, Github, Twitter, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

const agents = [
  {
    id: 1,
    title: "Step 1: Predict Your Harvest",
    shortTitle: "Yield Prediction",
    description: "Input your farm details like crop type, season, and acreage to estimate your total harvest in Quintals (QTL).",
    icon: TrendingUp,
    color: "#2E7D32", 
    bgColor: "bg-[#E8F5E9]",
    path: "/agent-yield",
    outputs: ["Total Production (QTL)", "Yield Range"],
  },
  {
    id: 2,
    title: "Step 2: Plan Your Storage",
    shortTitle: "Storage Optimization",
    description: "Get warehouse recommendations and check the required storage capacity for your forecasted yield.",
    icon: Warehouse,
    color: "#7c3aed", // Purple as requested
    bgColor: "bg-purple-50",
    path: "/agent-storage",
    outputs: ["Warehouse Type", "Required Capacity"],
  },
  {
    id: 3,
    title: "Step 3: Check Market Prices",
    shortTitle: "Market Analysis",
    description: "Fetch Mandi prices from our market dataset for your district to calculate your estimated total revenue.",
    icon: DollarSign,
    color: "#F9A825", 
    bgColor: "bg-[#FFF8E1]",
    path: "/agent-price",
    outputs: ["Market Price", "Estimated Revenue"],
  },
  {
    id: 4,
    title: "Step 4: Book Your Transport",
    shortTitle: "Transport Planning",
    description: "Calculate the number of trucks needed for your harvest, recommend suitable vehicle models, and estimate base transport rates.",
    icon: Truck,
    color: "#689F38", 
    bgColor: "bg-[#F1F8E9]",
    path: "/agent-transport",
    outputs: ["Recommended Truck", "Fleet Size & Rate"],
  },
];

export function HomeArchitecture() {
  const navigate = useNavigate();
  const [hoveredAgent, setHoveredAgent] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F8F4] via-white to-[#E8F5E9]">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#2E7D32] via-[#81C784] to-[#F9A825] text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFE082] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2E7D32] rounded-full blur-3xl"></div>
        </div>
        
        <div className="absolute top-10 right-20 opacity-10 animate-pulse">
          <Sun className="w-32 h-32 text-[#FFE082]" />
        </div>
        <div className="absolute bottom-16 left-16 opacity-10">
          <Leaf className="w-40 h-40 text-white" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 px-5 py-2 text-sm backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              GreenHarvest AI - Natural Intelligence for Agriculture
            </Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Multi-Agent AI Architecture
            </h1>
            <p className="text-xl sm:text-2xl text-white/95 mb-10 leading-relaxed max-w-3xl mx-auto drop-shadow">
              Our intelligent agents work together to optimize every step of your farm-to-market journey—as natural and harmonious as the seasons.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => navigate("/agents")}
                size="lg"
                className="h-14 px-10 bg-white text-[#2E7D32] hover:bg-green-50 shadow-2xl gap-2 text-lg rounded-xl font-semibold"
              >
                <Play className="w-5 h-5" />
                Start Workflow
              </Button>
              <Button
                onClick={() => navigate("/dashboard")}
                size="lg"
                variant="outline"
                className="h-14 px-10 bg-white text-[#2E7D32] hover:bg-green-50 shadow-2xl gap-2 text-lg rounded-xl font-semibold"
              >
                <LayoutDashboard className="w-5 h-5" />
                View Dashboard
              </Button>
            </div>
          </div>
          
          {/* UPDATED STAT BOXES HERE */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-5xl mx-auto">
            {[
              { value: "Complete", label: "Supply Chain", icon: Leaf, color: "#FFE082" },
              { value: "4", label: "AI Agents", icon: Brain, color: "#81C784" },
              { value: "Unified", label: "Dashboard Analytics", icon: LayoutDashboard, color: "#FFE082" },
              { value: "Optimized", label: "Cost & Logistics", icon: TrendingUp, color: "#81C784" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/30 text-center hover:bg-white/20 transition-all shadow-xl">
                <stat.icon className="w-8 h-8 mx-auto mb-3" style={{ color: stat.color }} />
                <div className="text-4xl font-bold mb-1 drop-shadow">{stat.value}</div>
                <div className="text-sm text-white/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-20">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#E8F5E9] text-[#2E7D32] border-[#2E7D32]/20 px-4 py-1.5">
              Seamless Workflow Intelligence
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#263238] mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Natural Agent Collaboration
            </h2>
            <p className="text-xl text-[#546E7A] max-w-3xl mx-auto leading-relaxed">
              Like the natural flow from seed to harvest, our AI agents work in harmony—passing data intelligently while giving you complete control.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border-2 border-[#2E7D32]/10 p-10 sm:p-16">
            <div className="hidden lg:flex items-center justify-between gap-4">
              {agents.map((agent, index) => {
                const Icon = agent.icon;
                const isHovered = hoveredAgent === agent.id;
                const isActive = hoveredAgent !== null && hoveredAgent >= agent.id;

                return (
                  <div key={agent.id} className="flex items-center flex-1">
                    <button
                      onClick={() => navigate(agent.path)}
                      onMouseEnter={() => setHoveredAgent(agent.id)}
                      onMouseLeave={() => setHoveredAgent(null)}
                      className={`flex flex-col items-center flex-1 transition-all duration-300 ${isHovered ? "scale-105" : ""}`}
                    >
                      <div className="relative">
                        <div
                          className={`w-28 h-28 rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-300 ${isHovered ? "shadow-3xl scale-110" : ""}`}
                          style={{ background: `linear-gradient(135deg, ${agent.color} 0%, ${agent.color}dd 100%)` }}
                        >
                          <Icon className="w-14 h-14 text-white" />
                        </div>
                        {isHovered && <div className="absolute inset-0 rounded-3xl animate-ping opacity-20" style={{ backgroundColor: agent.color }}></div>}
                      </div>

                      <div className="mt-5 text-center">
                        <Badge className="mb-2 text-xs shadow-md" style={{ backgroundColor: agent.color, color: 'white' }}>
                          Agent {agent.id}
                        </Badge>
                        <div className="font-semibold text-[#263238] text-base">{agent.shortTitle}</div>
                      </div>

                      {isHovered && (
                        <div className="absolute top-44 bg-white rounded-2xl shadow-2xl p-6 border-2 z-10 w-80 animate-in fade-in slide-in-from-top-2 duration-200" style={{ borderColor: agent.color }}>
                          <div className="flex items-start gap-3 mb-2">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${agent.bgColor}`}>
                              <Icon className="w-6 h-6" style={{ color: agent.color }} />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-[#263238] mb-1 text-lg">{agent.title}</h4>
                            </div>
                          </div>
                          <p className="text-sm text-[#546E7A] leading-relaxed mb-4">{agent.description}</p>
                          <div className="space-y-2">
                            {agent.outputs.map((output, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-[#546E7A]">
                                <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: agent.color }} />
                                {output}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </button>

                    {index < agents.length - 1 && (
                      <div className="flex items-center px-8">
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-1.5 w-24 rounded-full transition-all duration-500 ${isActive ? 'animate-pulse' : ''}`}
                            style={{ background: isActive ? `linear-gradient(90deg, ${agent.color} 0%, ${agents[index + 1].color} 100%)` : '#E0E0E0' }}
                          ></div>
                          <ArrowRight className="w-7 h-7" style={{ color: isActive ? agents[index + 1].color : "#E0E0E0" }} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile View */}
            <div className="lg:hidden space-y-5">
              {agents.map((agent, index) => {
                const Icon = agent.icon;
                return (
                  <div key={agent.id}>
                    <button
                      onClick={() => navigate(agent.path)}
                      className="w-full bg-white rounded-2xl p-6 border-2 hover:shadow-2xl transition-all shadow-lg"
                      style={{ borderColor: agent.color }}
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0" style={{ background: `linear-gradient(135deg, ${agent.color} 0%, ${agent.color}dd 100%)` }}>
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <Badge className="mb-2 text-xs" style={{ backgroundColor: agent.color, color: 'white' }}>Agent {agent.id}</Badge>
                          <div className="font-bold text-[#263238] mb-1 text-lg">{agent.title}</div>
                          <div className="text-sm text-[#546E7A] line-clamp-2">{agent.description}</div>
                        </div>
                        <ArrowRight className="w-7 h-7 flex-shrink-0" style={{ color: agent.color }} />
                      </div>
                    </button>
                    {index < agents.length - 1 && (
                      <div className="flex justify-center py-4">
                        <div className="w-1.5 h-10 rounded-full" style={{ background: `linear-gradient(180deg, ${agent.color} 0%, ${agents[index + 1].color} 100%)` }}></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-16 bg-gradient-to-r from-[#E8F5E9] to-[#F1F8F4] rounded-2xl p-8 border-2 border-[#2E7D32]/10 shadow-lg">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2E7D32] to-[#81C784] flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[#263238] mb-3 text-xl">How It Works</h4>
                  <p className="text-[#546E7A] leading-relaxed text-lg">
                    Each agent specializes in a specific task, working together like a digital ecosystem. Data flows sequentially, allowing for automated intelligence with the flexibility of manual refinement at each stage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Grid */}
        <div>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#FFF8E1] text-[#F9A825] border-[#F9A825]/20 px-4 py-1.5">Explore Each Agent</Badge>
            <h2 className="text-4xl font-bold text-[#263238] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Specialized AI Capabilities</h2>
            <p className="text-lg text-[#546E7A] max-w-2xl mx-auto">High-performance AI modules designed for agricultural efficiency.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {agents.map((agent) => {
              const Icon = agent.icon;
              return (
                <Card
                  key={agent.id}
                  className="border-2 hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden"
                  style={{ borderColor: hoveredAgent === agent.id ? agent.color : "#E0E0E0" }}
                  onClick={() => navigate(agent.path)}
                  onMouseEnter={() => setHoveredAgent(agent.id)}
                  onMouseLeave={() => setHoveredAgent(null)}
                >
                  <div className="h-2.5" style={{ background: `linear-gradient(90deg, ${agent.color} 0%, ${agent.color}dd 100%)` }}></div>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl transition-transform group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${agent.color} 0%, ${agent.color}dd 100%)` }}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <Badge variant="outline" className="text-xs" style={{ borderColor: agent.color, color: agent.color }}>#{agent.id}</Badge>
                    </div>
                    <CardTitle className="text-xl leading-tight mb-2">{agent.shortTitle}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">{agent.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {agent.outputs.map((output, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-[#546E7A]">
                          <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: agent.color }} />
                          <span>{output}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
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
          <div className="border-t border-white/10 pt-8 flex flex-col md:row justify-between items-center gap-4 text-sm text-gray-500">
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