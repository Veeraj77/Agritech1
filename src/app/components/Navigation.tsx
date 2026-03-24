import { Link, useLocation, useNavigate } from "react-router";
import { Home, Network, GitBranch, LayoutDashboard, User, Sprout, LogOut, Info } from "lucide-react";
import { Button } from "./ui/button";

const navItems = [
  { name: "Home", path: "/home", icon: Home },
  { name: "Agents", path: "/agents", icon: Network },
  { name: "Workflow", path: "/workflow", icon: GitBranch },
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "About Us", path: "/about", icon: Info },
];

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#2E7D32]/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - GreenHarvest AI */}
          <Link to="/home" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-[#2E7D32] to-[#81C784] w-11 h-11 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-[#263238]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                GreenHarvest AI
              </h1>
              <p className="text-xs text-[#546E7A]">Farm-to-Market Intelligence</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant="ghost"
                    className={`gap-2 ${
                      isActive
                        ? "bg-[#E8F5E9] text-[#2E7D32] font-semibold"
                        : "text-[#546E7A] hover:text-[#263238] hover:bg-[#F1F8F4]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden md:inline">{item.name}</span>
                  </Button>
                </Link>
              );
            })}

            {/* Profile/Logout */}
            <div className="ml-2 pl-2 border-l border-[#2E7D32]/10">
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="gap-2 text-[#546E7A] hover:text-[#263238] hover:bg-[#F1F8F4]"
              >
                <User className="w-4 h-4" />
                <span className="hidden md:inline">Profile</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}