import { FileText, CheckCircle, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/StatsCard";
import { userStats, dummyNotifications } from "@/lib/data";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6 animate-fade-in-up">
      {/* Welcome Section */}
      <div className="bg-gradient-primary rounded-lg p-6 text-primary-foreground glow-primary">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, Arjun! 👋
        </h1>
        <p className="text-primary-foreground/80">
          Ready to make your city better? You've earned {userStats.citizenPoints} citizen points so far!
        </p>
        <Button 
          onClick={() => navigate('/report')}
          className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90 glow-accent"
        >
          <FileText className="w-4 h-4 mr-2" />
          Report New Issue
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Issues Reported by You"
          value={userStats.issuesReported}
          icon={<FileText className="w-8 h-8" />}
          variant="default"
        />
        <StatsCard
          title="Issues Resolved"
          value={userStats.issuesResolved}
          icon={<CheckCircle className="w-8 h-8" />}
          variant="success"
        />
        <StatsCard
          title="Pending Issues"
          value={userStats.pendingIssues}
          icon={<Clock className="w-8 h-8" />}
          variant="warning"
        />
        <StatsCard
          title="Citizen Points"
          value={userStats.citizenPoints}
          icon={<Award className="w-8 h-8" />}
          variant="default"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Notifications */}
        <Card className="bg-gradient-card border-border/50 hover-glow-accent">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />
              Recent Updates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {dummyNotifications.map((notification) => (
              <div 
                key={notification.id}
                className="p-3 rounded-lg bg-muted/50 border-l-4 border-l-accent"
              >
                <p className="text-sm text-foreground">{notification.message}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(notification.timestamp).toLocaleDateString()}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gradient-card border-border/50 hover-glow-accent">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={() => navigate('/report')}
              className="w-full justify-start bg-primary hover:bg-primary/90 glow-primary"
            >
              <FileText className="w-4 h-4 mr-2" />
              Report New Issue
            </Button>
            <Button 
              onClick={() => navigate('/map')}
              variant="outline" 
              className="w-full justify-start border-accent text-accent hover:bg-accent/10"
            >
              <FileText className="w-4 h-4 mr-2" />
              View Digital Twin Map
            </Button>
            <Button 
              onClick={() => navigate('/my-issues')}
              variant="outline" 
              className="w-full justify-start border-muted-foreground text-muted-foreground hover:bg-muted/20"
            >
              <FileText className="w-4 h-4 mr-2" />
              Check My Issues
            </Button>
            <Button 
              onClick={() => navigate('/leaderboard')}
              variant="outline" 
              className="w-full justify-start border-warning text-warning hover:bg-warning/10"
            >
              <Award className="w-4 h-4 mr-2" />
              View Leaderboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}