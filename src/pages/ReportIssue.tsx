import { useState, useEffect } from "react";
import { MapPin, Upload, Camera, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { NotificationPopup, useNotifications } from "@/components/NotificationPopup";

export default function ReportIssue() {
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    photo: null as File | null
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [issueId, setIssueId] = useState('');
  const [aiDetection, setAiDetection] = useState('');
  const { toast } = useToast();
  const { notifications, addNotification, removeNotification } = useNotifications();

  // Simulated GPS location
  const currentLocation = {
    lat: 12.9716,
    lng: 77.5946,
    address: "MG Road, Bangalore, Karnataka 560001"
  };

  // Simulate popup notifications
  useEffect(() => {
    if (isSubmitted) {
      setTimeout(() => {
        addNotification(
          `Your issue #${issueId} is now In Progress`,
          'info'
        );
      }, 3000);
    }
  }, [isSubmitted, issueId, addNotification]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      
      // Simulate AI detection
      const detections = ['Pothole', 'Streetlight', 'Garbage', 'Water leakage'];
      const randomDetection = detections[Math.floor(Math.random() * detections.length)];
      setAiDetection(randomDetection);
      
      toast({
        title: "AI Analysis Complete",
        description: `Detected: ${randomDetection}`,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Generate issue ID
    const newIssueId = `ISS-${Math.floor(Math.random() * 9000) + 1000}`;
    setIssueId(newIssueId);
    setIsSubmitted(true);

    toast({
      title: "Issue Reported Successfully!",
      description: `Your issue has been assigned ID: ${newIssueId}`,
    });
  };

  if (isSubmitted) {
    return (
      <>
        <div className="p-6 flex items-center justify-center min-h-[60vh]">
          <Card className="max-w-md w-full bg-gradient-card border-success glow-success animate-fade-in-up">
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Issue Reported Successfully!
              </h2>
              <p className="text-muted-foreground mb-4">
                Your issue has been submitted and assigned ID:
              </p>
              <div className="bg-accent/10 border border-accent rounded-lg p-3 mb-6">
                <p className="text-accent font-mono font-bold text-lg">{issueId}</p>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                You've earned <span className="text-accent font-semibold">+10 Citizen Points</span> for reporting this issue!
              </p>
              <Button 
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ category: '', description: '', photo: null });
                  setAiDetection('');
                }}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 glow-accent"
              >
                Report Another Issue
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Notification Popups */}
        {notifications.map((notification) => (
          <NotificationPopup
            key={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto animate-fade-in-up">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Report New Issue</h1>
        <p className="text-muted-foreground">
          Help make your city better by reporting civic issues
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Photo Upload */}
        <Card className="bg-gradient-card border-border/50 hover-glow-accent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-accent" />
              Upload Photo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-accent/30 rounded-lg p-8 text-center hover:border-accent/50 transition-colors">
              <Upload className="w-12 h-12 text-accent mx-auto mb-4" />
              <p className="text-foreground mb-2">Drag and drop your photo here</p>
              <p className="text-muted-foreground text-sm mb-4">or</p>
              <Label htmlFor="photo-upload">
                <Button type="button" variant="outline" className="border-accent text-accent hover:bg-accent/10">
                  Choose File
                </Button>
              </Label>
              <Input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>
            
            {aiDetection && (
              <div className="mt-4 p-3 bg-accent/10 border border-accent rounded-lg">
                <p className="text-sm">
                  <span className="text-accent font-semibold">AI Detected:</span> {aiDetection}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Location */}
        <Card className="bg-gradient-card border-border/50 hover-glow-accent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-accent" />
              Location (Auto-captured)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-1" />
                <div>
                  <p className="text-foreground font-medium">Current Location</p>
                  <p className="text-muted-foreground text-sm">{currentLocation.address}</p>
                  <p className="text-accent text-xs mt-1">
                    {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Selection */}
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle>Issue Category</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select issue category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pothole">🕳️ Pothole</SelectItem>
                <SelectItem value="Streetlight">💡 Streetlight</SelectItem>
                <SelectItem value="Garbage">🗑️ Garbage</SelectItem>
                <SelectItem value="Water leakage">💧 Water Leakage</SelectItem>
                <SelectItem value="Others">📋 Others</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Description */}
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Describe the issue in detail..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="min-h-[120px] resize-none"
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full bg-gradient-accent text-accent-foreground hover:bg-accent/90 glow-accent py-6 text-lg font-semibold"
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          Submit Issue Report
        </Button>
      </form>

      {/* Notification Popups */}
      {notifications.map((notification) => (
        <NotificationPopup
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
}