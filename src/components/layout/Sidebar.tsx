import { useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { sharedTheme, lightTheme } from "../../styles/theme/theme";
import {
  Home,
  LayoutDashboard,
  Settings,
  ChevronLeft,
  ChevronRight,
  User,
  Bell,
  Clapperboard,
  LogOutIcon,
  BrainCircuit,
  FolderKanban,
  Network,
} from "lucide-react";
import { Tooltip } from "antd";

const SidebarWrapper = styled.aside<{ expanded: boolean }>`
  width: ${({ expanded }) => (expanded ? "180px" : "25px")};
  background-color: ${lightTheme.colors.sidebarBackground || "#333"};
  color: ${lightTheme.colors.sidebarText || "#fff"};
  display: flex;
  flex-direction: column;
  padding: ${sharedTheme.spacing.md};
  align-items: ${({ expanded }) => (expanded ? "start" : "center")};
  gap: 1px;
  transition: width 0.3s ease;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SidebarDivider = styled.div`
  width: 100%;
  height: 1px;
  margin: ${sharedTheme.spacing.sm} 0;
  background-color: white;
  opacity: 0.3;
`;

const SidebarLink = styled(Link)<{ active?: boolean; expanded?: boolean }>`
  color: ${"#fff"};
  text-decoration: none;
  margin: ${sharedTheme.spacing.xs} 0;
  display: flex;

  align-items: center;
  justify-content: ${({ expanded }) => (expanded ? "start" : "center")};
  padding: 8px 8px;
  width: 90%;
  font-weight: ${({ active }) =>
    active
      ? sharedTheme.typography.fontWeights.bold
      : sharedTheme.typography.fontWeights.medium};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  border-radius: ${sharedTheme.borderRadius.md};
  background-color: ${({ active }) =>
    active ? "rgba(59, 72, 94)" : "transparent"};

  &:hover {
    width: webkit-fill-available;
    background-color: rgba(59, 72, 94);
    color: "#fff";
  }
`;

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const [isExpanded, setIsExpanded] = useState(true);
  const toggleSidebar = () => setIsExpanded((prev) => !prev);

  const navItems: {
    to?: string;
    label?: string;
    icon?: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
    divider?: boolean;
    highlight?: boolean;
    badge?: number;
  }[] = [
    { to: "/home", label: "Home", icon: Home },
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/campaigns", label: "Campaigns", icon: FolderKanban },
    { to: "/portfolio", label: "Portfolio", icon: Clapperboard },
    { divider: true },
    {
      to: "/ai-analytics",
      label: "AI Analytics",
      icon: BrainCircuit,
      highlight: true,
    },
    {
      to: "/ai-automations",
      label: "AI Automations",
      icon: Network,
      highlight: true,
    },
    { divider: true },
    { to: "/profile", label: "Profile", icon: User },
    { to: "/notifications", label: "Notifications", icon: Bell, badge: 12 },
    { to: "/settings", label: "Settings", icon: Settings },
    { divider: true },
    { to: "/logout", label: "Logout", icon: LogOutIcon },
  ];

  return (
    <SidebarWrapper expanded={isExpanded}>
      <div
        style={{
          display: "flex",
          justifyContent: isExpanded ? "space-between" : "center",
          alignItems: "center",
          width: "100%",
          marginBottom: sharedTheme.spacing.md,
        }}
      >
        {isExpanded && (
          <div
            style={{
              fontSize: sharedTheme.typography.fontSizes.xxl,
              fontWeight: sharedTheme.typography.fontWeights.bold,
              color: sharedTheme.colorVariants.primary.light,
              whiteSpace: "nowrap",
            }}
          >
            CreatorHub
          </div>
        )}
        <button
          onClick={toggleSidebar}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: lightTheme.colors.sidebarText,
          }}
          title={isExpanded ? "Collapse" : "Expand"}
        >
          {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>
      {navItems.map((item, index) => {
        if (item.divider) return <SidebarDivider key={`divider-${index}`} />;
        const IconComponent = item.icon;
        return (
          <SidebarLink
            key={item.to}
            to={item.to!}
            active={pathname === item.to}
            expanded={isExpanded}
            style={item.highlight ? { color: "#FFD700" } : {}}
          >
            <Tooltip title={item.label}>
              <div style={{ position: "relative", display: "inline-flex" }}>
                {IconComponent && (
                  <IconComponent
                    size={18}
                    style={{
                      marginRight: isExpanded ? "8px" : "0",
                      ...(item.highlight ? { color: "#FFD700" } : {}),
                    }}
                  />
                )}
                {item.badge && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-5px",
                      right: "4px",
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "50%",
                      fontSize: "8px",
                      width: "13px",
                      height: "13px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
            </Tooltip>
            {isExpanded && (
              <span style={item.highlight ? { color: "#FFD700" } : {}}>
                {item.label}
              </span>
            )}
          </SidebarLink>
        );
      })}
    </SidebarWrapper>
  );
};

export default Sidebar;
