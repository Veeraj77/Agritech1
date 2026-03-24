import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Agent1Data {
  cropSeason: string;
  cropName: string;
  quantity: string;
  predictedYield: string;
  confidence: string;
}

interface Agent2Data {
  yieldQuantity: string;
  location: string;
  recommendedStorage: string;
  requiredCapacity: string;
  distance: string;
}

interface Agent3Data {
  storageLocation: string;
  cropQuality: string;
  cropQuantity: string;
  bestMarket: string;
  expectedPrice: string;
  marketDemand: string;
}

interface Agent4Data {
  marketLocation: string;
  cropType: string;
  cropQuantity: string;
  transportCost: string;
  distance: string;
  transportMethod: string;
}

interface AgentContextType {
  agent1Data: Agent1Data;
  agent2Data: Agent2Data;
  agent3Data: Agent3Data;
  agent4Data: Agent4Data;
  updateAgent1: (data: Partial<Agent1Data>) => void;
  updateAgent2: (data: Partial<Agent2Data>) => void;
  updateAgent3: (data: Partial<Agent3Data>) => void;
  updateAgent4: (data: Partial<Agent4Data>) => void;
  resetAllData: () => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

const initialAgent1: Agent1Data = {
  cropSeason: '',
  cropName: '',
  quantity: '',
  predictedYield: '',
  confidence: '',
};

const initialAgent2: Agent2Data = {
  yieldQuantity: '',
  location: '',
  recommendedStorage: '',
  requiredCapacity: '',
  distance: '',
};

const initialAgent3: Agent3Data = {
  storageLocation: '',
  cropQuality: '',
  cropQuantity: '',
  bestMarket: '',
  expectedPrice: '',
  marketDemand: '',
};

const initialAgent4: Agent4Data = {
  marketLocation: '',
  cropType: '',
  cropQuantity: '',
  transportCost: '',
  distance: '',
  transportMethod: '',
};

export function AgentProvider({ children }: { children: ReactNode }) {
  const [agent1Data, setAgent1Data] = useState<Agent1Data>(initialAgent1);
  const [agent2Data, setAgent2Data] = useState<Agent2Data>(initialAgent2);
  const [agent3Data, setAgent3Data] = useState<Agent3Data>(initialAgent3);
  const [agent4Data, setAgent4Data] = useState<Agent4Data>(initialAgent4);

  const updateAgent1 = (data: Partial<Agent1Data>) => {
    setAgent1Data(prev => ({ ...prev, ...data }));
  };

  const updateAgent2 = (data: Partial<Agent2Data>) => {
    setAgent2Data(prev => ({ ...prev, ...data }));
  };

  const updateAgent3 = (data: Partial<Agent3Data>) => {
    setAgent3Data(prev => ({ ...prev, ...data }));
  };

  const updateAgent4 = (data: Partial<Agent4Data>) => {
    setAgent4Data(prev => ({ ...prev, ...data }));
  };

  const resetAllData = () => {
    setAgent1Data(initialAgent1);
    setAgent2Data(initialAgent2);
    setAgent3Data(initialAgent3);
    setAgent4Data(initialAgent4);
  };

  return (
    <AgentContext.Provider
      value={{
        agent1Data,
        agent2Data,
        agent3Data,
        agent4Data,
        updateAgent1,
        updateAgent2,
        updateAgent3,
        updateAgent4,
        resetAllData,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent() {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error('useAgent must be used within an AgentProvider');
  }
  return context;
}