import { useState } from "react";
import { useNavigate } from "react-router";
import { TrendingUp, Warehouse, DollarSign, Truck, Home, LayoutDashboard, User, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useAgent } from "../context/AgentContext";

const agents = [
  { id: 1, title: "Crop Yield", icon: TrendingUp, color: "#1B5E20", path: "/agent-yield" },
  { id: 2, title: "Storage", icon: Warehouse, color: "#26C6DA", path: "/agent-storage" },
  { id: 3, title: "Market & Price", icon: DollarSign, color: "#F9A825", path: "/agent-price" },
  { id: 4, title: "Transport", icon: Truck, color: "#1E88E5", path: "/agent-transport" },
];

export function MobileView() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("agents");
  const { agent1Data, agent2Data, agent3Data, agent4Data } = useAgent();

  const agentStatus = [
    !!agent1Data.predictedYield,
    !!agent2Data.recommendedStorage,
    !!agent3Data.bestMarket,
    !!agent4Data.transportCost,
  ];

  const completedCount = agentStatus.filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#F4FBF6] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-[#E0E0E0] p-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-[#263238]" style={{ fontFamily: 'Poppins, sans-serif' }}>
          AgriTech AI Mobile
        </h1>
        <p className="text-sm text-[#546E7A]">Smart Farm Logistics</p>
      </div>

      <div className="p-4 space-y-4">
        {activeTab === "agents" && (
          <>
            {/* Progress Card */}
            <Card className="border border-[#E0E0E0] shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Workflow Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#546E7A]">{completedCount} of 4 completed</span>
                  <span className="text-sm font-bold text-[#1B5E20]">{Math.round((completedCount / 4) * 100)}%</span>
                </div>
                <div className="w-full bg-[#E0E0E0] rounded-full h-2">
                  <div
                    className="bg-[#1B5E20] h-2 rounded-full transition-all"
                    style={{ width: `${(completedCount / 4) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Agent Cards */}
            <div className="space-y-3">
              {agents.map((agent, index) => {
                const Icon = agent.icon;
                const isCompleted = agentStatus[index];

                return (
                  <Card
                    key={agent.id}
                    className="border border-[#E0E0E0] shadow-md cursor-pointer active:scale-98 transition-all"
                    onClick={() => navigate(agent.path)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center shadow-md flex-shrink-0"
                          style={{ backgroundColor: agent.color }}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-[#546E7A] mb-1">AGENT {agent.id}</div>
                          <div className="font-semibold text-[#263238]">{agent.title}</div>
                          {isCompleted && (
                            <div className="text-xs text-[#1B5E20] mt-1">✓ Completed</div>
                          )}
                        </div>
                        <ChevronRight className="w-5 h-5 text-[#9E9E9E]" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        )}

        {activeTab === "dashboard" && (
          <Card className="border border-[#E0E0E0] shadow-md">
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {agent1Data.predictedYield && (
                <div className="bg-[#E8F5E9] rounded-lg p-3">
                  <div className="text-xs text-[#546E7A] mb-1">Predicted Yield</div>
                  <div className="text-2xl font-bold text-[#1B5E20]">{agent1Data.predictedYield} kg</div>
                </div>
              )}
              {agent3Data.expectedPrice && (
                <div className="bg-[#FFF8E1] rounded-lg p-3">
                  <div className="text-xs text-[#546E7A] mb-1">Expected Price</div>
                  <div className="text-2xl font-bold text-[#F9A825]">₹{agent3Data.expectedPrice}/kg</div>
                </div>
              )}
              {agent4Data.transportCost && (
                <div className="bg-[#E3F2FD] rounded-lg p-3">
                  <div className="text-xs text-[#546E7A] mb-1">Transport Cost</div>
                  <div className="text-2xl font-bold text-[#1E88E5]">₹{agent4Data.transportCost}</div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === "profile" && (
          <Card className="border border-[#E0E0E0] shadow-md">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 pb-3 border-b border-[#E0E0E0]">
                <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-medium text-[#263238]">Farmer Name</div>
                  <div className="text-sm text-[#546E7A]">farmer@example.com</div>
                </div>
              </div>
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                className="w-full border-[#E0E0E0]"
              >
                Logout
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E0E0E0] shadow-lg z-20">
        <div className="grid grid-cols-3 h-16">
          <button
            onClick={() => setActiveTab("agents")}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === "agents" ? "text-[#1B5E20]" : "text-[#9E9E9E]"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Agents</span>
          </button>
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === "dashboard" ? "text-[#1B5E20]" : "text-[#9E9E9E]"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-xs font-medium">Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === "profile" ? "text-[#1B5E20]" : "text-[#9E9E9E]"
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
