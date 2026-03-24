import { useState } from "react";
import { useNavigate } from "react-router";
import { Sprout, Mail, Lock, ArrowRight, Leaf, Sun, Cloud } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // New State variables for Local Storage logic
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (isRegistering) {
      // --- REGISTRATION LOGIC ---
      if (localStorage.getItem(email)) {
        setError("Account already exists. Please sign in.");
        return;
      }
      localStorage.setItem(email, password);
      alert("Account created successfully! You can now sign in.");
      setIsRegistering(false); // Switch back to login mode
      setPassword(""); // Clear password field for safety
      
    } else {
      // --- LOGIN LOGIC ---
      const storedPassword = localStorage.getItem(email);
      
      if (storedPassword && storedPassword === password) {
        localStorage.setItem("currentUser", email); // Create session
        navigate("/home");
      } else {
        setError("Invalid email or password.");
      }
    }
  };

  const handleGuest = () => {
    localStorage.setItem("currentUser", "Guest Farmer");
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2E7D32] via-[#81C784] to-[#FFE082] relative overflow-hidden flex items-center justify-center p-4">
      {/* Sunrise-inspired decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#F9A825]/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-[#2E7D32]/40 to-transparent"></div>
      </div>
      
      {/* Floating decorative icons - agricultural landscape */}
      <div className="absolute top-16 left-10 opacity-10 animate-pulse">
        <Sun className="w-24 h-24 text-[#F9A825]" />
      </div>
      <div className="absolute top-32 right-20 opacity-10">
        <Cloud className="w-32 h-32 text-white" />
      </div>
      <div className="absolute bottom-24 left-24 opacity-10">
        <Leaf className="w-40 h-40 text-[#2E7D32]" />
      </div>
      <div className="absolute bottom-32 right-16 opacity-10">
        <Sprout className="w-36 h-36 text-[#81C784]" />
      </div>

      <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding & Information */}
        <div className="text-center lg:text-left space-y-8">
          <div className="flex items-center justify-center lg:justify-start gap-4">
            <div className="bg-white w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl">
              <Sprout className="w-11 h-11 text-[#2E7D32]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                GreenHarvest AI
              </h1>
              <p className="text-white/90 text-sm mt-1 drop-shadow">Intelligent Farm-to-Market System</p>
            </div>
          </div>

          <div className="space-y-4 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight drop-shadow-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
              From Farm to Market,<br/>Powered by Intelligence
            </h2>
            <p className="text-lg text-white/90 leading-relaxed">
              Experience the calm and clarity of AI-driven agriculture. Optimize yield prediction, 
              storage, market selection, and transport—all inspired by the natural rhythm of farming.
            </p>
          </div>

          {/* UPDATED VISUALLY HEAVY STAT BOXES */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-[#2E7D32]/10 flex flex-col justify-center">
              <div className="text-2xl font-bold text-[#2E7D32]">4-Step</div>
              <div className="text-sm text-[#546E7A] mt-1">AI Pipeline</div>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-[#F9A825]/10 flex flex-col justify-center">
              <div className="text-2xl font-bold text-[#F9A825]">End-to-End</div>
              <div className="text-sm text-[#546E7A] mt-1">Logistics</div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/95">
          <CardHeader className="space-y-3 pb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#2E7D32] to-[#81C784] rounded-xl flex items-center justify-center mx-auto shadow-lg">
              <Sprout className="w-7 h-7 text-white" />
            </div>
            <CardTitle className="text-2xl text-center text-[#263238]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {isRegistering ? "Create an Account" : "Welcome Back"}
            </CardTitle>
            <CardDescription className="text-center text-base text-[#546E7A]">
              {isRegistering ? "Sign up to start optimizing your farm" : "Sign in to access your farm-to-market dashboard"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#263238]">Email or Mobile Number</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#546E7A]" />
                  <Input
                    id="email"
                    type="text"
                    placeholder="farmer@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-11 h-12 border-[#E0E0E0] focus:border-[#2E7D32] focus:ring-[#2E7D32] bg-white rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-[#263238]">Password</Label>
                  {!isRegistering && (
                    <button type="button" className="text-sm text-[#2E7D32] hover:underline font-medium">
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#546E7A]" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11 h-12 border-[#E0E0E0] focus:border-[#2E7D32] focus:ring-[#2E7D32] bg-white rounded-xl"
                  />
                </div>
              </div>

              {/* Error Message Display */}
              {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

              <Button
                type="submit"
                className="w-full h-12 bg-[#2E7D32] hover:bg-[#1B5E20] text-white shadow-lg text-base rounded-xl font-semibold"
              >
                {isRegistering ? "Sign Up" : "Sign In to Dashboard"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E0E0E0]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-[#546E7A]">or</span>
                </div>
              </div>

              <Button
                type="button"
                onClick={handleGuest}
                variant="outline"
                className="w-full h-12 border-2 border-[#81C784] text-[#2E7D32] hover:bg-[#81C784] hover:text-white text-base rounded-xl font-medium"
              >
                Continue as Guest
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-[#546E7A]">
                {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
                <button 
                  type="button"
                  onClick={() => {
                    setIsRegistering(!isRegistering);
                    setError(""); // Clear errors when switching modes
                  }}
                  className="text-[#2E7D32] font-semibold hover:underline"
                >
                  {isRegistering ? "Sign in" : "Sign up now"}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}