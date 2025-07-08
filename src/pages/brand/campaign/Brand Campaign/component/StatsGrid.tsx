// components/StatsGrid.tsx
import React from "react";
import styled from "styled-components";
import { Briefcase, Play, DollarSign, Users } from "lucide-react";
import { sharedTheme } from "../../../../../styles/theme/theme";
import { formatNumber } from "../utils/campaign.utils";
import { CampaignStats } from "../types/campaign.types";

interface StatsGridProps {
  stats: CampaignStats;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  const statItems = [
    {
      icon: Briefcase,
      value: stats.totalCampaigns,
      label: "Total Campaigns",
      format: false,
    },
    {
      icon: Play,
      value: stats.activeCampaigns,
      label: "Active Campaigns",
      format: false,
    },
    {
      icon: DollarSign,
      value: stats.totalSpent,
      label: "Total Spent",
      format: true,
      prefix: "₹",
    },
    {
      icon: Users,
      value: stats.totalInfluencers,
      label: "Total Influencers",
      format: false,
    },
  ];

  return (
    <StatsContainer>
      {statItems.map((item, index) => (
        <StatCard key={index}>
          <StatIcon>
            <item.icon size={20} />
          </StatIcon>
          <StatContent>
            <StatValue>
              {item.prefix || ""}
              {item.format ? formatNumber(item.value) : item.value}
            </StatValue>
            <StatLabel>{item.label}</StatLabel>
          </StatContent>
        </StatCard>
      ))}
    </StatsContainer>
  );
};

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const StatIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${sharedTheme.colorVariants.primary.dark}20;
  color: ${sharedTheme.colorVariants.primary.dark};
`;

const StatContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const StatValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xxl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const StatLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;
