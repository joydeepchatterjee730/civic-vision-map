import { useState, useEffect } from "react";
import { Map, ToggleLeft, ToggleRight, MapPin, Calendar, Eye, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { dummyIssues, Issue } from "@/lib/data";
import { useSearchParams } from "react-router-dom";

// Simulated 3D map component
function DigitalTwinMapView({ 
  issues, 
  selectedIssue, 
  onMarkerClick,
  heatmapMode = false 
}: { 
  issues: Issue[], 
  selectedIssue: Issue | null,
  onMarkerClick: (issue: Issue) => void,
  heatmapMode?: boolean
}) {
  return (
    <div className="relative w-full h-96 bg-card rounded-lg border border-border overflow-hidden">
      {/* Simulated 3D Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent_70%)]" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.2),transparent_70%)]" />
        </div>
      </div>

      {/* Grid overlay for digital effect */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      {/* Heatmap Mode Overlay */}
      {heatmapMode && (
        <div className="absolute inset-0 bg-gradient-radial from-destructive/40 via-warning/30 to-transparent opacity-60" />
      )}

      {/* Issue Markers */}
      <div className="absolute inset-0">
        {issues.map((issue, index) => {
          const x = 20 + (index * 120) % 80; // Simulate spread
          const y = 30 + (index * 80) % 60;
          
          return (
            <div
              key={issue.id}
              className={`absolute transition-all duration-300 cursor-pointer hover:scale-125 animate-float ${
                selectedIssue?.id === issue.id ? 'scale-125 z-20' : 'z-10'
              }`}
              style={{ 
                left: `${x}%`, 
                top: `${y}%`,
                animationDelay: `${index * 0.2}s`
              }}
              onClick={() => onMarkerClick(issue)}
            >
              <div 
                className={`
                  w-6 h-6 rounded-full border-2 border-white shadow-lg animate-glow-pulse
                  ${issue.status === 'new' ? 'marker-new' : ''}
                  ${issue.status === 'progress' ? 'marker-progress' : ''}
                  ${issue.status === 'resolved' ? 'marker-resolved' : ''}
                `}
              />
              
              {/* Pulse effect */}
              <div 
                className={`
                  absolute inset-0 rounded-full animate-ping opacity-75
                  ${issue.status === 'new' ? 'bg-destructive' : ''}
                  ${issue.status === 'progress' ? 'bg-warning' : ''}
                  ${issue.status === 'resolved' ? 'bg-success' : ''}
                `}
                style={{ animationDuration: '2s' }}
              />
            </div>
          );
        })}
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <Button size="sm" variant="outline" className="bg-card/80 backdrop-blur-sm">
          <Map className="w-4 h-4" />
        </Button>
      </div>

      {/* Location Info */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 border border-border">
        <p className="text-sm font-medium text-foreground">Bangalore Digital Twin</p>
        <p className="text-xs text-muted-foreground">Real-time Civic Issues</p>
      </div>
    </div>
  );
}

export default function DigitalTwinMap() {
  const [searchParams] = useSearchParams();
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [heatmapMode, setHeatmapMode] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Handle direct linking to specific issue
  useEffect(() => {
    const issueId = searchParams.get('issueId');
    if (issueId) {
      const issue = dummyIssues.find(i => i.id === issueId);
      if (issue) {
        setSelectedIssue(issue);
      }
    }
  }, [searchParams]);

  // Filter issues
  const filteredIssues = dummyIssues.filter(issue => {
    if (statusFilter !== 'all' && issue.status !== statusFilter) return false;
    if (categoryFilter !== 'all' && issue.category !== categoryFilter) return false;
    return true;
  });

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

  const handleMarkerClick = (issue: Issue) => {
    setSelectedIssue(issue);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Digital Twin Map</h1>
          <p className="text-muted-foreground">
            3D visualization of civic issues across the city
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3">
          {/* Heatmap Toggle */}
          <Button
            variant="outline"
            onClick={() => setHeatmapMode(!heatmapMode)}
            className={`${heatmapMode ? 'bg-accent text-accent-foreground glow-accent' : 'border-accent text-accent hover:bg-accent/10'}`}
          >
            {heatmapMode ? <ToggleRight className="w-4 h-4 mr-2" /> : <ToggleLeft className="w-4 h-4 mr-2" />}
            Heatmap View
          </Button>

          {/* Filters */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Pothole">Pothole</SelectItem>
              <SelectItem value="Streetlight">Streetlight</SelectItem>
              <SelectItem value="Garbage">Garbage</SelectItem>
              <SelectItem value="Water leakage">Water leakage</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Legend */}
      <Card className="bg-gradient-card border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-6 items-center justify-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full marker-new" />
              <span className="text-destructive font-medium">New Issue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full marker-progress" />
              <span className="text-warning font-medium">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full marker-resolved" />
              <span className="text-success font-medium">Resolved</span>
            </div>
            <div className="text-muted-foreground">
              Total Issues: <span className="text-accent font-semibold">{filteredIssues.length}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-card border-border/50 hover-glow-accent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="w-5 h-5 text-accent" />
                {heatmapMode ? 'Heatmap View' : '3D Digital Twin'}
              </CardTitle>
              {heatmapMode && (
                <p className="text-sm text-muted-foreground">
                  Complaint density visualization across city zones
                </p>
              )}
            </CardHeader>
            <CardContent>
              <DigitalTwinMapView 
                issues={filteredIssues}
                selectedIssue={selectedIssue}
                onMarkerClick={handleMarkerClick}
                heatmapMode={heatmapMode}
              />
            </CardContent>
          </Card>
        </div>

        {/* Issue Details */}
        <div>
          <Card className="bg-gradient-card border-border/50 hover-glow-accent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-accent" />
                Issue Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedIssue ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg text-foreground">
                      {selectedIssue.category}
                    </h3>
                    {getStatusBadge(selectedIssue.status)}
                  </div>

                  <div className="space-y-2">
                    <p className="text-accent font-mono text-sm">{selectedIssue.id}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {selectedIssue.description}
                    </p>
                  </div>

                  {selectedIssue.photo && (
                    <div className="rounded-lg overflow-hidden border border-border">
                      <img 
                        src={selectedIssue.photo} 
                        alt="Issue photo"
                        className="w-full h-32 object-cover"
                      />
                    </div>
                  )}

                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{selectedIssue.location.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground">
                        Reported: {new Date(selectedIssue.reportedDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground">
                        Updated: {new Date(selectedIssue.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Mock admin action for demo */}
                  {selectedIssue.status === 'new' && (
                    <Button 
                      size="sm" 
                      className="w-full bg-warning text-warning-foreground hover:bg-warning/90 glow-warning"
                      onClick={() => {
                        // Simulate status change
                        setSelectedIssue({
                          ...selectedIssue,
                          status: 'progress' as const,
                          lastUpdated: new Date().toISOString()
                        });
                      }}
                    >
                      Mark as In Progress
                    </Button>
                  )}

                  {selectedIssue.status === 'progress' && (
                    <Button 
                      size="sm" 
                      className="w-full bg-success text-success-foreground hover:bg-success/90 glow-success"
                      onClick={() => {
                        // Simulate status change
                        setSelectedIssue({
                          ...selectedIssue,
                          status: 'resolved' as const,
                          lastUpdated: new Date().toISOString()
                        });
                      }}
                    >
                      Mark as Resolved
                    </Button>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Map className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Click on a marker to view issue details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}