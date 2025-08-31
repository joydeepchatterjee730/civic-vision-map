import { Eye, MapPin, Calendar, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { dummyIssues } from "@/lib/data";
import { useNavigate } from "react-router-dom";

export default function MyIssues() {
  const navigate = useNavigate();
  const myIssues = dummyIssues.filter(issue => issue.reportedBy === 'current_user');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-destructive text-destructive-foreground glow-destructive">New</Badge>;
      case 'progress':
        return <Badge className="bg-warning text-warning-foreground glow-warning">In Progress</Badge>;
      case 'resolved':
        return <Badge className="bg-success text-success-foreground glow-success">Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Pothole': return '🕳️';
      case 'Streetlight': return '💡';
      case 'Garbage': return '🗑️';
      case 'Water leakage': return '💧';
      default: return '📋';
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">My Issues</h1>
        <p className="text-muted-foreground">
          Track all issues you've reported and their status
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-card border-border/50 hover-glow-accent">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{myIssues.length}</p>
              <p className="text-sm text-muted-foreground">Total Issues</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-border/50 hover-glow-accent">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">{myIssues.filter(i => i.status === 'progress').length}</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-border/50 hover-glow-accent">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">{myIssues.filter(i => i.status === 'resolved').length}</p>
              <p className="text-sm text-muted-foreground">Resolved</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        {myIssues.map((issue, index) => (
          <Card 
            key={issue.id} 
            className="bg-gradient-card border-border/50 hover-glow-accent transition-all duration-300 hover:scale-[1.02]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Issue Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getCategoryIcon(issue.category)}</span>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">
                        {issue.category} Issue
                      </h3>
                      <p className="text-accent font-mono text-sm">{issue.id}</p>
                    </div>
                    {getStatusBadge(issue.status)}
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {issue.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span>{issue.location.address}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span>Reported: {new Date(issue.reportedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-accent" />
                      <span>Updated: {new Date(issue.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 min-w-[150px]">
                  <Button 
                    onClick={() => navigate(`/map?issueId=${issue.id}`)}
                    variant="outline" 
                    className="border-accent text-accent hover:bg-accent/10 glow-accent"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View on Map
                  </Button>
                  
                  {issue.status === 'new' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-muted-foreground text-muted-foreground hover:bg-muted/20"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Update Location
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {myIssues.length === 0 && (
        <Card className="bg-gradient-card border-border/50 text-center py-12">
          <CardContent>
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Issues Reported</h3>
            <p className="text-muted-foreground mb-6">
              You haven't reported any issues yet. Help make your city better!
            </p>
            <Button 
              onClick={() => navigate('/report')}
              className="bg-gradient-accent text-accent-foreground hover:bg-accent/90 glow-accent"
            >
              <FileText className="w-4 h-4 mr-2" />
              Report Your First Issue
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}