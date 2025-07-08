import React from "react";
import styled from "styled-components";
import { theme } from "../theme.ts";
import { BarChart2, Briefcase, Users, TrendingUp, Clock } from "lucide-react";

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart2 },
    { id: "campaigns", label: "Campaigns", icon: Briefcase },
    { id: "influencers", label: "Influencers", icon: Users },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "tasks", label: "Tasks", icon: Clock },
  ];

  return (
    <TabsContainer>
      {tabs.map(({ id, label, icon: Icon }) => (
        <TabButton
          key={id}
          active={activeTab === id}
          onClick={() => setActiveTab(id)}
        >
          <Icon size={16} />
          {label}
        </TabButton>
      ))}
    </TabsContainer>
  );
};

const TabsContainer = styled.div`
  display: flex;
  background-color: ${theme.colors.background};
  border-bottom: 1px solid ${theme.colors.border};
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

interface TabButtonProps {
  active: boolean;
}

const TabButton = styled.button<TabButtonProps>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${(props) =>
    props.active ? theme.colors.primary : theme.colors.textSecondary};
  background-color: transparent;
  border: none;
  border-bottom: 2px solid
    ${(props) => (props.active ? theme.colors.primary : "transparent")};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: ${theme.colors.primary};
    background-color: ${theme.colors.surface};
  }
`;

export default DashboardTabs;
