import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Heart } from "lucide-react";

interface NavbarProps {
  showThemeToggle?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ showThemeToggle = false }) => {
  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-xl group-hover:scale-105 transition-transform">
              <Heart className="h-6 w-6 text-primary-foreground" fill="currentColor" />
            </div>
            <span className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Nutrovia
            </span>
          </Link>
          
          {showThemeToggle && <ThemeToggle />}
        </div>
      </div>
    </nav>
  );
};