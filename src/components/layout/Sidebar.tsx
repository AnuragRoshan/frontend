// src/components/layout/Sidebar.tsx - Smooth transition version
import { useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { sharedTheme, lightTheme } from "../../styles/theme/theme";
import {
  Home,
  LayoutDashboard,
  Settings,
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
  PanelLeft,
  PanelRight,
} from "lucide-react";
// import { Tooltip } from "antd";
import { useLogout } from "../../hooks/useLogout";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/slices/authSlices";
import LogoutConfirmationModal from "../auth/LogoutConfirmationModal";

const SidebarWrapper = styled.aside<{ expanded: boolean }>`
  width: ${({ expanded }) => (expanded ? "180px" : "50px")};
  background-color: ${lightTheme.colors.sidebarBackground || "#333"};
  color: ${lightTheme.colors.sidebarText || "#fff"};
  display: flex;
  flex-direction: column;
  padding: ${sharedTheme.spacing.sm};
  gap: 1px;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin: 0.5rem;
  border-radius: ${sharedTheme.borderRadius.xl};
  overflow-y: scroll;
  position: relative;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SidebarHeader = styled.div<{ expanded: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: ${sharedTheme.spacing.sm};
  height: 35px;
  position: relative;
  width: 100%;
`;

const LogoText = styled.div<{ expanded: boolean }>`
  font-size: ${sharedTheme.typography.fontSizes.xxl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.primary.light};
  white-space: nowrap;
  opacity: ${({ expanded }) => (expanded ? 1 : 0)};
  visibility: ${({ expanded }) => (expanded ? "visible" : "hidden")};
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    visibility 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex: 1;
  margin-left: 10px;
`;

const ToggleButton = styled.button<{ expanded: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${lightTheme.colors.sidebarText};
  padding: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background-color: rgba(59, 72, 94, 0.5);
  }
`;

const SidebarDivider = styled.div`
  width: 100%;
  height: 1px;
  margin: ${sharedTheme.spacing.xs} 0;
  background-color: white;
  opacity: 0.3;
`;

const NavItemContainer = styled.div<{ expanded: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 2px 0;
  position: relative;
`;

const IconContainer = styled.div<{ expanded: boolean }>`
  min-width: 28px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const TextContainer = styled.span<{ expanded: boolean }>`
  margin-left: 8px;
  opacity: ${({ expanded }) => (expanded ? 1 : 0)};
  visibility: ${({ expanded }) => (expanded ? "visible" : "hidden")};
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    visibility 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  overflow: hidden;
`;

const SidebarLink = styled(Link)<{
  active?: boolean;
  expanded?: boolean;
  disabled?: boolean;
}>`
  color: ${({ disabled }) => (disabled ? "#aaa" : "#fff")};
  text-decoration: none;
  justify-content: ${({ expanded }) => (expanded ? "flex-start" : "center")};
  display: flex;
  align-items: center;
  padding: 6px;
  width: 100%;
  font-weight: ${({ active }) =>
    active
      ? sharedTheme.typography.fontWeights.bold
      : sharedTheme.typography.fontWeights.medium};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  border-radius: ${sharedTheme.borderRadius.md};
  background-color: ${({ active }) =>
    active ? "rgba(59, 72, 94)" : "transparent"};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  transition: background-color 0.2s ease;

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
  display: flex;
  align-items: center;
  padding: 6px;
  width: 100%;
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  border-radius: ${sharedTheme.borderRadius.md};
  background-color: transparent;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? "transparent" : "rgba(59, 72, 94)"};
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -2px;
  right: -2px;
  background-color: red;
  color: white;
  border-radius: 50%;
  font-size: 8px;
  width: 13px;
  height: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  z-index: 1;
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
    user?.userType === "BRAND" ? "brand" : "brand";

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
        <SidebarHeader expanded={isExpanded}>
          <LogoText expanded={isExpanded}>Vibeco</LogoText>
          <ToggleButton
            expanded={isExpanded}
            onClick={toggleSidebar}
            title={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? <PanelLeft size={24} /> : <PanelRight size={24} />}
          </ToggleButton>
        </SidebarHeader>

        {filteredNavItems.map((item, index) => {
          if (item.divider) return <SidebarDivider key={`divider-${index}`} />;

          const IconComponent = item.icon;
          const isActive = pathname === item.to;
          const isDisabled = item.isLocked;

          // Handle logout button differently
          if (item.isLogout) {
            return (
              <NavItemContainer key="logout-button" expanded={isExpanded}>
                <SidebarButton
                  expanded={isExpanded}
                  disabled={isLoggingOut}
                  onClick={item.onClick}
                  style={{
                    opacity: isLoggingOut ? 0.6 : 1,
                    cursor: isLoggingOut ? "not-allowed" : "pointer",
                  }}
                >
                  <IconContainer expanded={isExpanded}>
                    {IconComponent && <IconComponent size={18} />}
                  </IconContainer>
                  <TextContainer expanded={isExpanded}>
                    {item.label}
                  </TextContainer>
                </SidebarButton>
              </NavItemContainer>
            );
          }

          // Regular navigation items
          return (
            <NavItemContainer key={item.to} expanded={isExpanded}>
              <SidebarLink
                to={item.to!}
                active={isActive}
                expanded={isExpanded}
                disabled={isDisabled}
                style={{
                  ...(isDisabled
                    ? { cursor: "not-allowed", opacity: 0.6 }
                    : {}),
                }}
                onClick={(e) => {
                  if (isDisabled) {
                    e.preventDefault();
                  }
                }}
              >
                <IconContainer expanded={isExpanded}>
                  {IconComponent && (
                    <IconComponent
                      size={16}
                      style={{
                        ...(item.highlight ? { color: "#FFD700" } : {}),
                      }}
                    />
                  )}
                  {item.badge && <Badge>{item.badge}</Badge>}
                </IconContainer>
                {isExpanded && (
                  <TextContainer
                    expanded={isExpanded}
                    style={{
                      ...(item.highlight ? { color: "#FFD700" } : {}),
                      ...(isDisabled ? { color: "#aaa" } : {}),
                    }}
                  >
                    {item.label}
                  </TextContainer>
                )}
              </SidebarLink>
            </NavItemContainer>
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
