import { Brain, Zap, Shield, Users, TrendingUp, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const features = [
  {
    icon: Brain,
    title: "Multi-Agent Architecture",
    description: "Four distinct AI modules designed to handle specific stages of the agricultural supply chain.",
  },
  {
    icon: Zap,
    title: "Data-Driven Processing",
    description: "Utilizes structured datasets for market pricing, vehicle metrics, and crop statistics to generate insights.",
  },
  {
    icon: Shield,
    title: "Seamless Data Flow",
    description: "State variables are intelligently passed between agents to prevent redundant data entry.",
  },
  {
    icon: Users,
    title: "Clear Interface",
    description: "Built with a focus on simplicity, ensuring the output of the data models is easy to read and understand.",
  },
  {
    icon: TrendingUp,
    title: "End-to-End Planning",
    description: "Covers the complete journey: from yield estimation to storage, market selection, and final transport.",
  },
  {
    icon: Award,
    title: "Educational Prototype",
    description: "A comprehensive demonstration of how sequential AI workflows can solve logistical challenges.",
  },
];

const stats = [
  { value: "4", label: "AI Agents Built" },
  { value: "4", label: "Process Steps" },
  { value: "100%", label: "Data Grounded" },
  { value: "1", label: "Unified Dashboard" },
];

export function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              About AgriTech AI
            </h1>
            <p className="text-xl text-green-100 leading-relaxed">
              We built this platform to demonstrate how multi-agent AI systems can 
              organize and optimize the complex farm-to-market journey using data.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Our Goal
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              To build a cohesive pipeline that takes basic farm inputs and transforms them into 
              actionable logistical plans. By connecting yield, storage, pricing, and transport, 
              we showcase how technology can simplify agricultural decision-making.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-green-200 hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-green-700" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Platform Architecture
            </h2>
            <div className="space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Sequential AI Flow</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Our platform uses a connected system where four specialized logic agents 
                    work sequentially to build a complete logistics plan:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span><strong>Agent 1:</strong> Estimates crop yields using regional acreage data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span><strong>Agent 2:</strong> Recommends storage types and calculates required capacities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span><strong>Agent 3:</strong> Pulls Mandi pricing to project potential revenue</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span><strong>Agent 4:</strong> Computes the most cost-effective vehicle models and fleet sizes</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Data Infrastructure</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We ground our application using historical agricultural statistics, regional 
                    Mandi pricing records, and commercial vehicle cost models to ensure the 
                    outputs are highly realistic.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Explore the Architecture
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Experience how data flows through the 4-step pipeline.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/workflow"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start the Workflow
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}