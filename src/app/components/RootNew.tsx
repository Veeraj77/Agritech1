import { Outlet, useLocation } from "react-router";
import { Navigation } from "./Navigation";
import { AgentProvider } from "../context/AgentContext";

export function RootNew() {
  const location = useLocation();
  const isMobileView = location.pathname === "/mobile";

  return (
    <AgentProvider>
      <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
        {!isMobileView && <Navigation />}
        <Outlet />
      </div>
    </AgentProvider>
  );
}