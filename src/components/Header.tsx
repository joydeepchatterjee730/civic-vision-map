import { Bell, Shield } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="hover-glow-accent" />
          
          {/* City Branding */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-accent" />
              <div>
                <h1 className="text-lg font-bold text-foreground">Bangalore Smart City</h1>
                <p className="text-xs text-muted-foreground">Digital Reporting System</p>
              </div>
            </div>
            
            {/* SIH Logo placeholder */}
            <div className="ml-6 px-3 py-1 bg-gradient-accent rounded-md">
              <span className="text-sm font-semibold text-accent-foreground">SIH 2024</span>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative hover-glow-accent">
            <Bell className="w-5 h-5" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs glow-destructive"
            >
              2
            </Badge>
          </Button>

          {/* User info */}
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">Arjun Kumar</p>
            <p className="text-xs text-accent">Citizen ID: CTZ-2024-001</p>
          </div>
        </div>
      </div>
    </header>
  );
}