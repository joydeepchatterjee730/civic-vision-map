import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'destructive';
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  icon, 
  variant = 'default',
  className 
}: StatsCardProps) {
  const variantStyles = {
    default: "hover-glow-accent",
    success: "glow-success hover:glow-success",
    warning: "glow-warning hover:glow-warning", 
    destructive: "glow-destructive hover:glow-destructive"
  };

  return (
    <Card className={cn(
      "bg-gradient-card border-border/50 transition-all duration-300 hover:scale-105 animate-fade-in-up",
      variantStyles[variant],
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              {title}
            </p>
            <p className="text-3xl font-bold text-foreground">
              {value}
            </p>
          </div>
          <div className="text-accent">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}