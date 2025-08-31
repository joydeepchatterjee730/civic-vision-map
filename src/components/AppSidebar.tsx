import { 
  Home, 
  FileText, 
  List, 
  Map, 
  Award,
  Bell,
  Settings
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Report Issue", url: "/report", icon: FileText },
  { title: "My Issues", url: "/my-issues", icon: List },
  { title: "Digital Twin Map", url: "/map", icon: Map },
];

const otherItems = [
  { title: "Leaderboard", url: "/leaderboard", icon: Award },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isCollapsed = state === "collapsed";

  const getNavClassName = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-sidebar-accent text-accent font-medium glow-accent" 
      : "hover:bg-sidebar-accent/50 hover-glow-accent";

  return (
    <Sidebar
      className="bg-sidebar border-sidebar-border animate-slide-in-left"
      collapsible="icon"
    >
      <SidebarContent className="bg-gradient-card">
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center glow-accent">
                <Map className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-sidebar-foreground">Smart City</h2>
                <p className="text-xs text-sidebar-foreground/60">Digital Twin</p>
              </div>
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="transition-all duration-300">
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavClassName}
                    >
                      <item.icon className="mr-3 h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Other Features */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80">
            Features
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {otherItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="transition-all duration-300">
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavClassName}
                    >
                      <item.icon className="mr-3 h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Profile Section */}
        {!isCollapsed && (
          <div className="mt-auto p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">AK</span>
              </div>
              <div>
                <p className="text-sm font-medium text-sidebar-foreground">Arjun Kumar</p>
                <p className="text-xs text-accent">120 Citizen Points</p>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
