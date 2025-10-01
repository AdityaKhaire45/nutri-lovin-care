import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { supabase } from "@/integrations/supabase/client";
import AIMealSuggestions from "./AIMealSuggestions";
import {
  Home,
  Apple,
  Droplet,
  TrendingUp,
  Settings,
  LogOut,
  Heart,
  Menu,
  X
} from "lucide-react";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (data) {
      setProfile(data);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const menuItems = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: Apple, label: "Food Log", path: "/dashboard/food" },
    { icon: Droplet, label: "Water Tracker", path: "/dashboard/water" },
    { icon: TrendingUp, label: "Progress", path: "/dashboard/progress" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-xl">
              <Heart className="h-5 w-5 text-primary-foreground" fill="currentColor" />
            </div>
            <span className="text-xl font-heading font-bold">Nutrovia</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-0 h-screen bg-sidebar border-r z-40
            transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            w-64
          `}
        >
          <div className="flex flex-col h-full p-4">
            {/* Logo - Desktop Only */}
            <div className="hidden lg:flex items-center gap-2 mb-8 px-2">
              <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-xl">
                <Heart className="h-6 w-6 text-primary-foreground" fill="currentColor" />
              </div>
              <span className="text-2xl font-heading font-bold">Nutrovia</span>
            </div>

            {/* Profile Card */}
            <Card className="mb-6 shadow-soft">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-primary">
                      {profile?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "?"}
                    </span>
                  </div>
                  <p className="font-semibold truncate text-base">
                    {profile?.full_name || "User"}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {user?.email}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg text-base
                      transition-colors
                      ${isActive
                        ? "bg-primary text-primary-foreground shadow-soft"
                        : "hover:bg-sidebar-accent text-sidebar-foreground"
                      }
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Theme Toggle */}
            <div className="hidden lg:block mb-4">
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
            </div>

            {/* Sign Out Button */}
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="w-full justify-start gap-3 h-12 text-base"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div>
              <h1 className="text-4xl font-heading font-bold mb-2">
                Hello, {profile?.full_name?.split(' ')[0] || "Friend"}! 👋
              </h1>
              <p className="text-xl text-muted-foreground">
                Let's stay healthy today
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="shadow-soft border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Apple className="h-6 w-6 text-primary" />
                    </div>
                    Food Log
                  </CardTitle>
                  <CardDescription className="text-base">Track your meals</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full h-11">
                    <Link to="/dashboard/food">Open Food Log</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-soft border-2 hover:border-accent transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <div className="bg-accent/10 p-2 rounded-lg">
                      <Droplet className="h-6 w-6 text-accent" />
                    </div>
                    Water Intake
                  </CardTitle>
                  <CardDescription className="text-base">Stay hydrated</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full h-11">
                    <Link to="/dashboard/water">Track Water</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-soft border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    Your Progress
                  </CardTitle>
                  <CardDescription className="text-base">View your journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full h-11">
                    <Link to="/dashboard/progress">View Progress</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Coming Soon Notice + AI Suggestions */}
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20">
              <CardContent className="py-8 text-center">
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" fill="currentColor" />
                <h3 className="text-2xl font-heading font-bold mb-2">More Features Coming Soon!</h3>
                <p className="text-muted-foreground text-base max-w-2xl mx-auto mb-6">
                  We're working hard to bring you detailed food logging, water tracking, 
                  and progress charts. Stay tuned for updates!
                </p>
                <div className="max-w-xl mx-auto">
                  <AIMealSuggestions />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}