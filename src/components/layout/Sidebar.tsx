// src/components/layout/Sidebar.tsx - Final version with logout modal
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
  BookUser,
  Handshake,
  Receipt,
} from "lucide-react";
import { Tooltip } from "antd";
import { useLogout } from "../../hooks/useLogout";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/slices/authSlices";
import LogoutConfirmationModal from "../auth/LogoutConfirmationModal";

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
  margin: 0.5rem;
  border-radius: ${sharedTheme.borderRadius.xl};

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

const SidebarLink = styled(Link)<{
  active?: boolean;
  expanded?: boolean;
  disabled?: boolean;
}>`
  color: ${({ disabled }) => (disabled ? "#aaa" : "#fff")};
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
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? "transparent" : "rgba(59, 72, 94)"};
  }
`;

const SidebarButton = styled.button<{
  expanded?: boolean;
  disabled?: boolean;
}>`
  color: ${({ disabled }) => (disabled ? "#aaa" : "#fff")};
  background: none;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  margin: ${sharedTheme.spacing.xs} 0;
  display: flex;
  align-items: center;
  justify-content: ${({ expanded }) => (expanded ? "start" : "center")};
  padding: 8px 8px;
  width: 90%;
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  border-radius: ${sharedTheme.borderRadius.md};
  background-color: transparent;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? "transparent" : "rgba(59, 72, 94)"};
  }
`;

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const user = useAppSelector(selectUser);
  const { logoutUser, isLoading: isLoggingOut } = useLogout();

  const [isExpanded, setIsExpanded] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleSidebar = () => setIsExpanded((prev) => !prev);

  // Handle logout button click - show confirmation modal
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  // Handle logout confirmation
  const handleLogoutConfirm = async () => {
    try {
      await logoutUser({
        silent: false,
        redirectTo: "/", // Redirect to landing page
      });
      setShowLogoutModal(false);
    } catch (error) {
      console.error("Logout failed:", error);
      setShowLogoutModal(false);
    }
  };

  // Handle logout cancel
  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  const navItems: {
    to?: string;
    label?: string;
    icon?: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
    divider?: boolean;
    highlight?: boolean;
    badge?: number;
    isLocked?: boolean;
    userType?: "influencer" | "brand" | "admin" | "all";
    isLogout?: boolean;
    onClick?: () => void;
  }[] = [
    { to: "/home", label: "Home", icon: Home, userType: "influencer" },
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      userType: "influencer",
      isLocked: true,
    },
    {
      to: "/brandDashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      userType: "brand",
    },
    {
      to: "/campaigns",
      label: "Campaigns",
      icon: FolderKanban,
      userType: "influencer",
    },
    {
      to: "/brandDeals",
      label: "Deals",
      icon: Receipt,
      badge: 8, // Number of pending deals
      userType: "brand",
    },
    {
      to: "/deals",
      label: "Deals",
      icon: Handshake,
      userType: "influencer",
    },
    {
      to: "/brandCampaign",
      label: "Campaigns",
      icon: FolderKanban,
      userType: "brand",
    },
    {
      to: "/brandApplication",
      label: "Applications",
      icon: BookUser,
      userType: "brand",
    },
    {
      to: "/collabManagement",
      label: "Collab Management",
      icon: Handshake,
      userType: "brand",
    },
    {
      to: "/portfolio",
      label: "Portfolio",
      icon: Clapperboard,
      userType: "influencer",
    },
    { divider: true },
    {
      to: "/ai-analytics",
      label: "AI Analytics",
      icon: BrainCircuit,
      highlight: true,
      isLocked: true, // 🔒 Locked
      userType: "all",
    },
    {
      to: "/ai-automations",
      label: "AI Automations",
      icon: Network,
      highlight: true,
      isLocked: true,
      userType: "all",
    },
    { divider: true },
    { to: "/profile", label: "Profile", icon: User, userType: "influencer" },
    {
      to: "/notifications",
      label: "Notifications",
      icon: Bell,
      badge: 12,
      userType: "influencer",
    },
    {
      to: "/settings",
      label: "Settings",
      icon: Settings,
      userType: "influencer",
    },
    { divider: true },
    {
      label: "Logout",
      icon: LogOutIcon,
      userType: "all",
      isLogout: true,
      onClick: handleLogoutClick,
    },
  ];

  // Determine user type - fallback to influencer if not set
  const userType: "influencer" | "brand" =
    user?.userType === "BRAND" ? "brand" : "influencer";

  // Filter nav items based on userType
  const filteredNavItems = navItems.filter((item) => {
    return (
      item.userType === userType ||
      item.userType === "all" ||
      typeof item.userType === "undefined" || // fallback if userType not set
      item.divider
    );
  });

  return (
    <>
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
              Vibeco
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
            {isExpanded ? (
              <ChevronLeft size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>
        </div>

        {filteredNavItems.map((item, index) => {
          if (item.divider) return <SidebarDivider key={`divider-${index}`} />;

          const IconComponent = item.icon;
          const isActive = pathname === item.to;
          const isDisabled = item.isLocked;

          // Handle logout button differently
          if (item.isLogout) {
            return (
              <SidebarButton
                key="logout-button"
                expanded={isExpanded}
                disabled={isLoggingOut}
                onClick={item.onClick}
                style={{
                  opacity: isLoggingOut ? 0.6 : 1,
                  cursor: isLoggingOut ? "not-allowed" : "pointer",
                }}
              >
                <Tooltip title={isLoggingOut ? "Logging out..." : item.label}>
                  <div style={{ position: "relative", display: "inline-flex" }}>
                    {IconComponent && (
                      <IconComponent
                        size={18}
                        style={{
                          marginRight: isExpanded ? "8px" : "0",
                        }}
                      />
                    )}
                  </div>
                </Tooltip>
                {isExpanded && <span>{item.label}</span>}
              </SidebarButton>
            );
          }

          // Regular navigation items
          return (
            <SidebarLink
              key={item.to}
              to={item.to!}
              active={isActive}
              expanded={isExpanded}
              disabled={isDisabled}
              style={{
                ...(item.highlight ? { color: "#FFD700" } : {}),
                ...(isDisabled ? { cursor: "not-allowed", opacity: 0.6 } : {}),
              }}
              onClick={(e) => {
                if (isDisabled) {
                  e.preventDefault();
                }
              }}
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
                <span
                  style={{
                    ...(item.highlight ? { color: "#FFD700" } : {}),
                    ...(isDisabled ? { color: "#aaa" } : {}),
                  }}
                >
                  {item.label}
                </span>
              )}
            </SidebarLink>
          );
        })}
      </SidebarWrapper>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        isLoading={isLoggingOut}
        userName={user ? `${user.firstName} ${user.lastName}` : undefined}
      />
    </>
  );
};

export default Sidebar;
