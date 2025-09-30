import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description: string;
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4 lg:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card className="shadow-soft border-2">
          <CardContent className="py-16 text-center space-y-6">
            <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-2xl inline-block">
              <Heart className="h-16 w-16 text-primary-foreground" fill="currentColor" />
            </div>
            <h1 className="text-4xl font-heading font-bold">{title}</h1>
            <p className="text-xl text-muted-foreground max-w-md mx-auto">
              {description}
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="text-lg px-8 py-6"
            >
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}