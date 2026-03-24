import { useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, TrendingUp, Warehouse, DollarSign, Truck, Brain, Zap, Target, Shield, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

const agents = [
  {
    id: 1,
    title: "Crop Yield Prediction",
    description: "Estimate your total harvest yield based on crop type, season, and acreage.",
    icon: TrendingUp,
    color: "from-green-500 to-green-600",
    path: "/agent-yield",
  },
  {
    id: 2,
    title: "Storage Management",
    description: "Get warehouse recommendations and calculate storage requirements for your harvest.",
    icon: Warehouse,
    color: "from-blue-500 to-blue-600",
    path: "/agent-storage",
  },
  {
    id: 3,
    title: "Price & Market Analysis",
    description: "Check market prices from our database and estimate your total potential revenue.",
    icon: DollarSign,
    color: "from-amber-500 to-amber-600",
    path: "/agent-price",
  },
  {
    id: 4,
    title: "Transport Optimization",
    description: "Calculate required fleet size, discover suitable truck models, and estimate transport costs.",
    icon: Truck,
    color: "from-purple-500 to-purple-600",
    path: "/agent-transport",
  },
];

const features = [
  {
    icon: Brain,
    title: "AI-Powered Intelligence",
    description: "Advanced machine learning algorithms optimize every decision",
  },
  {
    icon: Zap,
    title: "Real-Time Analysis",
    description: "Get instant insights from live market and weather data",
  },
  {
    icon: Target,
    title: "Precision Agriculture",
    description: "Data-driven recommendations for maximum efficiency",
  },
  {
    icon: Shield,
    title: "Reliable & Secure",
    description: "Enterprise-grade security for your farm data",
  },
];

export function Home() {
  const navigate = useNavigate();
  
  // Get the currently logged in user
  const currentUser = localStorage.getItem("currentUser");

  // Protection Check: Redirect if not logged in
  useEffect(() => {
    // Note: change "/login" to "/" if your login page is on the root route
    if (!currentUser) {
      navigate("/login"); 
    }
  }, [navigate, currentUser]);

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  // Don't render the page while redirecting
  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      
      {/* Small Utility Bar for Logout */}
      <div className="w-full flex justify-end p-4">
        <div className="flex items-center gap-4 text-sm font-medium text-gray-600">
           <span>Logged in as: <span className="text-green-700">{currentUser}</span></span>
           <button onClick={handleLogout} className="flex items-center hover:text-red-600 transition-colors">
              <LogOut className="w-4 h-4 mr-1" /> Logout
           </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-200 px-4 py-1">
              AI-Powered AgriTech Platform
            </Badge>
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Agentic AI System for<br />
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Optimized Farm-to-Market Logistics
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform your agricultural operations with our intelligent multi-agent system. 
              Predict yields, optimize storage, identify best markets, and minimize transport costs—all powered by AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/workflow")}
                className="h-14 px-8 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-xl text-lg"
              >
                Start Workflow
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/dashboard")}
                className="h-14 px-8 border-2 border-gray-300 hover:bg-gray-50 text-lg"
              >
                View Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Why Choose AgriTech AI?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with practical agricultural expertise
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-green-200 hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mb-3">
                    <feature.icon className="w-6 h-6 text-green-700" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Agents Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Our AI Agents
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Four specialized agents working together to optimize your entire farm-to-market journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {agents.map((agent) => (
              <Card 
                key={agent.id} 
                className="border-2 hover:border-green-200 hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => navigate(agent.path)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center shadow-lg`}>
                      <agent.icon className="w-7 h-7 text-white" />
                    </div>
                    <Badge variant="secondary">Agent {agent.id}</Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-green-600 transition-colors">
                    {agent.title}
                  </CardTitle>
                  <CardDescription className="text-base">{agent.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between group-hover:bg-green-50 group-hover:text-green-700"
                  >
                    Start Agent
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Ready to Transform Your Farm Operations?
          </h2>
          <p className="text-green-100 text-lg mb-8">
            Join thousands of farmers who are already using AI to maximize their profits
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/workflow")}
            className="h-14 px-8 bg-white text-green-700 hover:bg-gray-50 shadow-xl text-lg"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}