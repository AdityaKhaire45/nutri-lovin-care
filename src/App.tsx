import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/food"
              element={
                <ProtectedRoute>
                  <ComingSoon
                    title="Food Log Coming Soon"
                    description="We're building a beautiful food logging experience for you. Track your meals, calories, and nutrition with ease."
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/water"
              element={
                <ProtectedRoute>
                  <ComingSoon
                    title="Water Tracker Coming Soon"
                    description="Stay hydrated! We're creating an intuitive water tracking feature to help you reach your daily hydration goals."
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/progress"
              element={
                <ProtectedRoute>
                  <ComingSoon
                    title="Progress Dashboard Coming Soon"
                    description="Visualize your wellness journey with beautiful charts and insights about your nutrition and health trends."
                  />
                </ProtectedRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
