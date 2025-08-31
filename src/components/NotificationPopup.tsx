import { useEffect, useState } from "react";
import { X, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NotificationPopupProps {
  message: string;
  type: 'success' | 'warning' | 'info';
  onClose: () => void;
  duration?: number;
}

export function NotificationPopup({ 
  message, 
  type, 
  onClose, 
  duration = 5000 
}: NotificationPopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true);
    
    // Auto-dismiss after duration
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-accent" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return "border-success bg-success/10 glow-success";
      case 'warning':
        return "border-warning bg-warning/10 glow-warning";
      case 'info':
      default:
        return "border-accent bg-accent/10 glow-accent";
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div 
      className={`
        fixed top-4 right-4 z-50 max-w-sm w-full transition-all duration-300 ease-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      <Card className={`${getStyles()} border-l-4 shadow-xl`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              {getIcon()}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground leading-relaxed">
                {message}
              </p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="flex-shrink-0 h-6 w-6 p-0 hover:bg-muted/20 rounded-full"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Hook for managing notifications
export function useNotifications() {
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    message: string;
    type: 'success' | 'warning' | 'info';
  }>>([]);

  const addNotification = (message: string, type: 'success' | 'warning' | 'info' = 'info') => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  return {
    notifications,
    addNotification,
    removeNotification
  };
}