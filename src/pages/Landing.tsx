import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { Heart, Apple, Droplet, TrendingUp, Shield, Smile } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <Navbar showThemeToggle />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-block">
            <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-2xl mb-6 inline-block shadow-soft">
              <Heart className="h-16 w-16 text-primary-foreground" fill="currentColor" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-heading font-bold leading-tight">
            Your Caring{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Nutrition Companion
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Track your meals, stay hydrated, and achieve your health goals with Nutrovia - 
            designed with simplicity and care for everyone.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              onClick={() => navigate("/auth?mode=signup")}
              className="text-lg px-8 py-6 rounded-xl shadow-soft hover:shadow-lg transition-all"
            >
              Get Started Free
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/auth?mode=login")}
              className="text-lg px-8 py-6 rounded-xl border-2"
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-heading font-bold text-center mb-12">
          Everything You Need for Healthy Living
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="border-2 hover:border-primary transition-colors shadow-soft">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                <Apple className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-semibold">Food Logging</h3>
              <p className="text-muted-foreground leading-relaxed">
                Easily track your meals and nutrition intake with our simple, intuitive interface.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors shadow-soft">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                <Droplet className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-heading font-semibold">Water Tracking</h3>
              <p className="text-muted-foreground leading-relaxed">
                Stay hydrated with reminders and easy tracking of your daily water intake.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors shadow-soft">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-semibold">Progress Monitoring</h3>
              <p className="text-muted-foreground leading-relaxed">
                Watch your journey unfold with clear charts and progress indicators.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors shadow-soft">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-heading font-semibold">Privacy First</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your health data is private and secure, always under your control.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors shadow-soft">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                <Smile className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-semibold">Easy to Use</h3>
              <p className="text-muted-foreground leading-relaxed">
                Large, clear text and buttons designed for comfort and accessibility.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors shadow-soft">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-accent" fill="currentColor" />
              </div>
              <h3 className="text-2xl font-heading font-semibold">Built with Care</h3>
              <p className="text-muted-foreground leading-relaxed">
                Thoughtfully designed to support your wellness journey every step of the way.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20 shadow-soft">
          <CardContent className="py-16 text-center space-y-6">
            <h2 className="text-4xl font-heading font-bold">Ready to Start Your Wellness Journey?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join Nutrovia today and take the first step towards a healthier, happier you.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate("/auth?mode=signup")}
              className="text-lg px-8 py-6 rounded-xl shadow-soft hover:shadow-lg transition-all"
            >
              Create Free Account
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Nutrovia. Built with care for your wellness.</p>
        </div>
      </footer>
    </div>
  );
}