import { Bell, CheckCircle, Clock, AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { dummyNotifications, Notification } from "@/lib/data";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    ...dummyNotifications,
    {
      id: 'notif-3',
      message: 'New issue reported in your area: Pothole on MG Road',
      type: 'info' as const,
      timestamp: '2024-01-19T10:30:00Z'
    },
    {
      id: 'notif-4',
      message: 'Reminder: Follow up on issue #ISS-1001 for location verification',
      type: 'warning' as const,
      timestamp: '2024-01-18T15:45:00Z'
    }
  ]);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case 'info':
      default:
        return <Bell className="w-5 h-5 text-accent" />;
    }
  };

  const getNotificationStyle = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return "border-l-success bg-success/5";
      case 'warning':
        return "border-l-warning bg-warning/5";
      case 'info':
      default:
        return "border-l-accent bg-accent/5";
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    // In a real app, this would update the backend
    console.log('All notifications marked as read');
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated on your reported issues and city updates
          </p>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={markAllAsRead}
            className="border-accent text-accent hover:bg-accent/10"
          >
            Mark All as Read
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={clearAll}
            className="border-muted-foreground text-muted-foreground hover:bg-muted/20"
          >
            Clear All
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-card border-border/50 hover-glow-accent">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Bell className="w-8 h-8 text-accent" />
              <div>
                <p className="text-2xl font-bold text-foreground">{notifications.length}</p>
                <p className="text-sm text-muted-foreground">Total Notifications</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-border/50 hover-glow-accent">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-success" />
              <div>
                <p className="text-2xl font-bold text-success">
                  {notifications.filter(n => n.type === 'success').length}
                </p>
                <p className="text-sm text-muted-foreground">Success Updates</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-border/50 hover-glow-accent">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-warning" />
              <div>
                <p className="text-2xl font-bold text-warning">
                  {notifications.filter(n => n.type === 'warning').length}
                </p>
                <p className="text-sm text-muted-foreground">Action Required</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .map((notification, index) => (
              <Card 
                key={notification.id}
                className={`
                  bg-gradient-card border-l-4 hover-glow-accent transition-all duration-300 hover:scale-[1.01] animate-fade-in-up
                  ${getNotificationStyle(notification.type)}
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      {getNotificationIcon(notification.type)}
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground leading-relaxed">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            {new Date(notification.timestamp).toLocaleString()}
                          </p>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              notification.type === 'success' ? 'border-success text-success' :
                              notification.type === 'warning' ? 'border-warning text-warning' :
                              'border-accent text-accent'
                            }`}
                          >
                            {notification.type}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeNotification(notification.id)}
                      className="flex-shrink-0 hover:bg-destructive/20 hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
        ) : (
          /* Empty State */
          <Card className="bg-gradient-card border-border/50 text-center py-12">
            <CardContent>
              <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Notifications</h3>
              <p className="text-muted-foreground">
                You're all caught up! Notifications will appear here when there are updates on your issues.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Notification Settings */}
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-accent" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
              <span className="text-foreground">Issue Status Updates</span>
              <Badge className="bg-success text-success-foreground">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
              <span className="text-foreground">Nearby Issues</span>
              <Badge className="bg-success text-success-foreground">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
              <span className="text-foreground">Weekly Summary</span>
              <Badge className="bg-success text-success-foreground">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
              <span className="text-foreground">Achievement Alerts</span>
              <Badge className="bg-success text-success-foreground">Enabled</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}