import { Heart, Target, Eye, Leaf, TrendingUp, Shield, Lightbulb, Users, CheckCircle2, Sprout, Sun, Cloud } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

export function AboutUs() {
  const values = [
    {
      icon: Users,
      title: "Farmer First",
      description: "We built this tool to prioritize the needs of farmers, ensuring our data helps them make informed decisions.",
      color: "#2E7D32",
    },
    {
      icon: Shield,
      title: "Transparency",
      description: "We believe in clear, honest processes. Our pipeline shows exactly how your data is used at every step.",
      color: "#81C784",
    },
    {
      icon: Leaf,
      title: "Practicality",
      description: "Building technology that addresses the actual, day-to-step logistical challenges of moving crops.",
      color: "#689F38",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Using multi-agent AI architecture to connect the dots between the field, the warehouse, and the market.",
      color: "#F9A825",
    },
  ];

  const technologies = [
    {
      title: "Yield Prediction",
      description: "Data-driven models estimate your total harvest based on crop type, season, and total acreage.",
      icon: TrendingUp,
      color: "#2E7D32",
    },
    {
      title: "Storage Planning",
      description: "Calculates required storage space and recommends appropriate facilities based on your predicted yield.",
      icon: Sprout,
      color: "#81C784",
    },
    {
      title: "Market Analysis",
      description: "Analyzes district-level Mandi datasets to estimate potential revenue based on current pricing trends.",
      icon: Target,
      color: "#F9A825",
    },
    {
      title: "Transport Logistics",
      description: "Calculates required fleet sizes and estimates base transport costs for heavy agricultural logistics.",
      icon: Cloud,
      color: "#689F38",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F8F4] via-white to-[#E8F5E9]">
      {/* Hero Section - Sunrise Inspired */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#2E7D32] via-[#81C784] to-[#FFE082] text-white">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFE082] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2E7D32] rounded-full blur-3xl"></div>
        </div>
        
        {/* Floating natural elements */}
        <div className="absolute top-16 right-20 opacity-10 animate-pulse">
          <Sun className="w-32 h-32 text-[#FFE082]" />
        </div>
        <div className="absolute bottom-20 left-20 opacity-10">
          <Leaf className="w-40 h-40 text-white" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 px-5 py-2 backdrop-blur-sm">
              <Heart className="w-4 h-4 mr-2" />
              Our Story & Mission
            </Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
              About GreenHarvest AI
            </h1>
            <p className="text-xl sm:text-2xl text-white/95 leading-relaxed drop-shadow">
              Empowering farmers with a structured, data-driven pipeline to plan their farm-to-market journey.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Mission Section */}
        <div className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-[#E8F5E9] text-[#2E7D32] border-[#2E7D32]/20 px-4 py-1.5">
                Our Mission
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#263238] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Simplifying the Supply Chain
              </h2>
              <p className="text-lg text-[#546E7A] leading-relaxed mb-6">
                Moving crops from the field to the market involves a complex web of decisions regarding yield forecasting, storage capacities, pricing, and transportation logistics.
              </p>
              <p className="text-lg text-[#546E7A] leading-relaxed">
                GreenHarvest AI is a multi-agent system built to streamline this process. Our mission is to demonstrate how data integration can help farmers make organized, informed decisions about their harvest pipeline.
              </p>
            </div>
            <div className="bg-white rounded-3xl shadow-2xl border-2 border-[#2E7D32]/10 p-8">
              <div className="space-y-6">
                {[
                  { icon: TrendingUp, text: "Data-driven yield estimation", color: "#2E7D32" },
                  { icon: Sprout, text: "Capacity-based storage planning", color: "#81C784" },
                  { icon: Target, text: "Mandi market price analysis", color: "#F9A825" },
                  { icon: Cloud, text: "Fleet size and cost calculations", color: "#689F38" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)` }}
                    >
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-lg text-[#263238] font-medium flex-1">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="mb-24 bg-gradient-to-r from-[#E8F5E9] to-[#F1F8F4] rounded-3xl p-12 border-2 border-[#2E7D32]/10 shadow-xl">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2E7D32] to-[#81C784] flex items-center justify-center shadow-lg">
                <Eye className="w-8 h-8 text-white" />
              </div>
            </div>
            <Badge className="mb-4 bg-white text-[#2E7D32] border-[#2E7D32]/20 px-4 py-1.5">
              Our Vision
            </Badge>
            <h2 className="text-4xl font-bold text-[#263238] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              A Connected Agricultural Architecture
            </h2>
            <p className="text-xl text-[#546E7A] leading-relaxed mb-8">
              We envision a system where information flows seamlessly. By connecting yield data directly to storage and transport calculations, we remove the guesswork from agricultural planning.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Structured Planning", description: "Step-by-step guidance for your harvest" },
                { title: "Grounded Data", description: "Calculations based on actual market datasets" },
                { title: "Agentic Flow", description: "Data moves automatically between stages" },
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-[#263238] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#546E7A]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What We Do */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#FFF8E1] text-[#F9A825] border-[#F9A825]/20 px-4 py-1.5">
              What We Do
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#263238] mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
              End-to-End Logistics Planning
            </h2>
            <p className="text-xl text-[#546E7A] max-w-3xl mx-auto leading-relaxed">
              Our multi-agent system provides sequential decision support for the agricultural supply chain
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-2 border-[#2E7D32]/10 shadow-xl hover:shadow-2xl transition-all">
              <div className="h-2 bg-gradient-to-r from-[#2E7D32] to-[#81C784]"></div>
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2E7D32] to-[#81C784] flex items-center justify-center mb-4 shadow-lg">
                  <Sprout className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-2xl">4-Agent Architecture</CardTitle>
                <CardDescription className="text-base">
                  Four specialized modules working in harmony to process your farm data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Crop Yield Prediction Module",
                    "Storage Management Module",
                    "Price & Market Analysis Module",
                    "Transport Cost Calculation Module",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#2E7D32] flex-shrink-0" />
                      <span className="text-[#546E7A]">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#F9A825]/10 shadow-xl hover:shadow-2xl transition-all">
              <div className="h-2 bg-gradient-to-r from-[#F9A825] to-[#FFE082]"></div>
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F9A825] to-[#FFE082] flex items-center justify-center mb-4 shadow-lg">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-2xl">Decision Support</CardTitle>
                <CardDescription className="text-base">
                  Intelligent processing backed by datasets, offering transparency at every step
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Automated data flow between agents",
                    "Dataset-backed estimates",
                    "Sequential pipeline logic",
                    "Clear, accessible UI dashboards",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#F9A825] flex-shrink-0" />
                      <span className="text-[#546E7A]">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Our Technology */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#E3F2FD] text-[#689F38] border-[#689F38]/20 px-4 py-1.5">
              System Architecture
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#263238] mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Structured Data Flow
            </h2>
            <p className="text-xl text-[#546E7A] max-w-3xl mx-auto leading-relaxed">
              Designed specifically to process agricultural logic sequentially
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <Card key={idx} className="border-2 hover:shadow-2xl transition-all group" style={{ borderColor: `${tech.color}20` }}>
                  <div className="h-2" style={{ background: `linear-gradient(90deg, ${tech.color} 0%, ${tech.color}dd 100%)` }}></div>
                  <CardHeader>
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform"
                      style={{ background: `linear-gradient(135deg, ${tech.color} 0%, ${tech.color}dd 100%)` }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl mb-2">{tech.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">{tech.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Values Section */}
        <div>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#E8F5E9] text-[#2E7D32] border-[#2E7D32]/20 px-4 py-1.5">
              Our Core Principles
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#263238] mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
              What Drives Our Design
            </h2>
            <p className="text-xl text-[#546E7A] max-w-3xl mx-auto leading-relaxed">
              The framework behind how we structured the GreenHarvest AI platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <Card 
                  key={idx} 
                  className="border-2 hover:shadow-2xl transition-all group text-center"
                  style={{ borderColor: `${value.color}20` }}
                >
                  <CardHeader className="pb-6">
                    <div 
                      className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-xl group-hover:scale-110 transition-transform"
                      style={{ background: `linear-gradient(135deg, ${value.color} 0%, ${value.color}dd 100%)` }}
                    >
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-3">{value.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">{value.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-gradient-to-br from-[#2E7D32] via-[#81C784] to-[#F9A825] rounded-3xl p-12 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFE082] rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2E7D32] rounded-full blur-3xl"></div>
          </div>
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 drop-shadow-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Ready to Explore the Platform?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Step into the workflow and test the multi-agent pipeline yourself.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}