import { createBrowserRouter } from "react-router";
import { Login } from "./components/Login";
import { RootNew } from "./components/RootNew";
import { HomeArchitecture } from "./components/HomeArchitecture";
import { Workflow } from "./components/Workflow";
import { DashboardNew } from "./components/DashboardNew";
import { AboutUs } from "./components/AboutUs";
import { MobileView } from "./components/MobileView";
import { CropYieldAgent } from "./components/agents/CropYieldAgent";
import { StorageAgent } from "./components/agents/StorageAgent";
import { PriceMarketAgent } from "./components/agents/PriceMarketAgent";
import { TransportAgent } from "./components/agents/TransportAgent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <RootNew />,
    children: [
      {
        path: "home",
        element: <HomeArchitecture />,
      },
      {
        path: "agents",
        element: <Workflow />,
      },
      {
        path: "workflow",
        element: <Workflow />,
      },
      {
        path: "dashboard",
        element: <DashboardNew />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "mobile",
        element: <MobileView />,
      },
      {
        path: "agent-yield",
        element: <CropYieldAgent />,
      },
      {
        path: "agent-storage",
        element: <StorageAgent />,
      },
      {
        path: "agent-price",
        element: <PriceMarketAgent />,
      },
      {
        path: "agent-transport",
        element: <TransportAgent />,
      },
    ],
  },
]);