import { TrendingUp, Warehouse, DollarSign, Truck, Check } from "lucide-react";

interface AgentStepperProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

const steps = [
  { id: 1, name: "Crop Yield", shortName: "Yield", icon: TrendingUp, color: "#1B5E20" },
  { id: 2, name: "Storage Management", shortName: "Storage", icon: Warehouse, color: "#26C6DA" },
  { id: 3, name: "Price & Market", shortName: "Market", icon: DollarSign, color: "#F9A825" },
  { id: 4, name: "Transport Cost", shortName: "Transport", icon: Truck, color: "#1E88E5" },
];

export function AgentStepper({ currentStep, onStepClick }: AgentStepperProps) {
  return (
    <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 shadow-md">
      <h3 className="text-sm font-semibold text-[#263238] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
        Agent Workflow Progress
      </h3>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const Icon = step.icon;

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center flex-1">
                <button
                  onClick={() => onStepClick && onStepClick(step.id)}
                  className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    onStepClick ? "cursor-pointer hover:scale-105" : ""
                  } ${
                    isCurrent ? "shadow-xl scale-110" : isCompleted ? "shadow-md" : "shadow-sm"
                  }`}
                  style={{
                    backgroundColor: isCompleted || isCurrent ? step.color : "#E0E0E0",
                  }}
                >
                  {isCompleted ? (
                    <Check className="w-7 h-7 text-white" />
                  ) : (
                    <Icon className={`w-7 h-7 ${isCurrent ? "text-white" : "text-[#9E9E9E]"}`} />
                  )}
                </button>
                <span
                  className={`mt-2 text-xs font-medium text-center ${
                    isCurrent || isCompleted ? "text-[#263238]" : "text-[#9E9E9E]"
                  }`}
                >
                  <span className="hidden sm:inline">{step.name}</span>
                  <span className="sm:hidden">{step.shortName}</span>
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 h-1 relative top-[-20px]">
                  <div
                    className={`h-full transition-all duration-300 rounded`}
                    style={{
                      backgroundColor: currentStep > step.id ? step.color : "#E0E0E0",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}