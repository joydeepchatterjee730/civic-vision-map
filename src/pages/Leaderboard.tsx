import { Trophy, Award, Star, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { leaderboard } from "@/lib/data";

export default function Leaderboard() {
  const getMedalIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Award className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Star className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-muted-foreground font-bold">{position}</span>;
    }
  };

  const getPositionStyle = (position: number, isCurrentUser: boolean) => {
    if (isCurrentUser) {
      return "bg-gradient-accent text-accent-foreground glow-accent";
    }
    
    switch (position) {
      case 1:
        return "bg-gradient-primary text-primary-foreground glow-primary";
      case 2:
        return "bg-secondary/50 text-secondary-foreground";
      case 3:
        return "bg-warning/20 text-warning-foreground";
      default:
        return "bg-gradient-card text-card-foreground hover-glow-accent";
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Citizen Leaderboard</h1>
        <p className="text-muted-foreground">
          Top contributors making their city better
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card border-border/50 hover-glow-accent">
          <CardContent className="p-6 text-center">
            <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
            <p className="text-2xl font-bold text-foreground">245</p>
            <p className="text-sm text-muted-foreground">Top Score</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-border/50 hover-glow-accent">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-12 h-12 text-accent mx-auto mb-3" />
            <p className="text-2xl font-bold text-foreground">87</p>
            <p className="text-sm text-muted-foreground">Total Issues Resolved</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-border/50 hover-glow-accent">
          <CardContent className="p-6 text-center">
            <Award className="w-12 h-12 text-success mx-auto mb-3" />
            <p className="text-2xl font-bold text-foreground">5</p>
            <p className="text-sm text-muted-foreground">Active Citizens</p>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard */}
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent" />
            Top Contributors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {leaderboard.map((user, index) => {
            const position = index + 1;
            const isCurrentUser = user.name === 'You';
            
            return (
              <div
                key={user.name}
                className={`
                  p-4 rounded-lg border transition-all duration-300 hover:scale-[1.02] animate-fade-in-up
                  ${getPositionStyle(position, isCurrentUser)}
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {getMedalIcon(position)}
                      <span className="text-2xl font-bold">#{position}</span>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        {user.name}
                        {isCurrentUser && (
                          <Badge variant="outline" className="text-xs">
                            You
                          </Badge>
                        )}
                      </h3>
                      <p className="text-sm opacity-80">
                        {user.reports} issues reported
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {user.points}
                    </div>
                    <div className="text-sm opacity-80">
                      points
                    </div>
                  </div>
                </div>

                {/* Progress bar for points */}
                <div className="mt-3">
                  <div className="w-full bg-muted/30 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        isCurrentUser 
                          ? 'bg-accent' 
                          : position === 1 
                            ? 'bg-primary' 
                            : position <= 3 
                              ? 'bg-warning' 
                              : 'bg-muted-foreground'
                      }`}
                      style={{ 
                        width: `${Math.min((user.points / leaderboard[0].points) * 100, 100)}%`,
                        animationDelay: `${index * 200}ms`
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-primary text-primary-foreground glow-primary">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Want to climb the leaderboard?</h3>
          <p className="mb-4 opacity-90">
            Report more civic issues and earn citizen points to help improve your city!
          </p>
          <div className="text-sm opacity-80">
            📊 +10 points per issue reported • 🎯 +5 bonus for detailed reports • 🏆 Monthly rewards for top contributors
          </div>
        </CardContent>
      </Card>
    </div>
  );
}