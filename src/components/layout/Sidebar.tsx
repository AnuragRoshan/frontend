// components/layout/Sidebar.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { sharedTheme, lightTheme } from "../../styles/theme/theme";
import {
  Home,
  LayoutDashboard,
  Settings,
  ChevronLeft,
  ChevronRight,
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
  gap: ${sharedTheme.spacing.xxs};
  transition: width 0.3s ease;

  @media (max-width: 768px) {
    display: none;
  }
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
  font-weight: ${sharedTheme.typography.fontWeights.regular};
  font-size: ${sharedTheme.typography.fontSizes.md};
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
            LOGO
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
      <SidebarLink
        to="/home"
        active={pathname === "/home"}
        expanded={isExpanded}
      >
        <Tooltip title="Home">
          <Home size={18} style={{ marginRight: isExpanded ? "8px" : "0" }} />
        </Tooltip>
        {isExpanded && <span>Home</span>}
      </SidebarLink>
      <SidebarLink
        to="/dashboard"
        active={pathname === "/dashboard"}
        expanded={isExpanded}
      >
        <Tooltip title="Dashboard">
          <LayoutDashboard
            size={18}
            style={{ marginRight: isExpanded ? "8px" : "0" }}
          />
        </Tooltip>
        {isExpanded && <span>Dashboard</span>}
      </SidebarLink>
      <SidebarLink
        to="/settings"
        active={pathname === "/settings"}
        expanded={isExpanded}
      >
        <Tooltip title="Settings">
          <Settings
            size={18}
            style={{ marginRight: isExpanded ? "8px" : "0" }}
          />
        </Tooltip>
        {isExpanded && <span>Settings</span>}
      </SidebarLink>
    </SidebarWrapper>
  );
};

export default Sidebar;
