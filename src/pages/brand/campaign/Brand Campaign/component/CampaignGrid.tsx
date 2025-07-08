// components/CampaignGrid.tsx
import React from "react";
import styled from "styled-components";
import { Calendar, Eye, MoreHorizontal } from "lucide-react";
import { sharedTheme } from "../../../../../styles/theme/theme";
import { ActionButton } from "../shared/ActionButton";
import { StatusBadge } from "../shared/StatusBadge";
import { PlatformBadge } from "../shared/PlatformBadge";
import { Campaign } from "../types/campaign.types";
import { formatNumber } from "../utils/campaign.utils";

interface CampaignGridProps {
  campaigns: Campaign[];
  onViewDetails: (campaign: Campaign) => void;
}

export const CampaignGrid: React.FC<CampaignGridProps> = ({
  campaigns,
  onViewDetails,
}) => {
  return (
    <GridContainer>
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id}>
          <CampaignCardHeader>
            <CampaignCardInfo>
              <CampaignCardName onClick={() => onViewDetails(campaign)}>
                {campaign.name}
              </CampaignCardName>
              <CampaignCardMeta>
                <StatusBadge status={campaign.status}>
                  {campaign.status}
                </StatusBadge>
                <PlatformBadge platform={campaign.platform}>
                  {campaign.platform}
                </PlatformBadge>
              </CampaignCardMeta>
            </CampaignCardInfo>
            <CampaignCardActions>
              <ActionButton small onClick={() => onViewDetails(campaign)}>
                <Eye size={14} />
              </ActionButton>
              <ActionButton small>
                <MoreHorizontal size={14} />
              </ActionButton>
            </CampaignCardActions>
          </CampaignCardHeader>

          <CampaignCardContent>
            <CampaignCardDescription>
              {campaign.description}
            </CampaignCardDescription>

            <CampaignCardMetrics>
              <MetricItem>
                <MetricLabel>Budget</MetricLabel>
                <MetricValue>₹{formatNumber(campaign.budget)}</MetricValue>
              </MetricItem>
              <MetricItem>
                <MetricLabel>Spent</MetricLabel>
                <MetricValue>₹{formatNumber(campaign.spent)}</MetricValue>
              </MetricItem>
              <MetricItem>
                <MetricLabel>Influencers</MetricLabel>
                <MetricValue>{campaign.influencers}</MetricValue>
              </MetricItem>
              <MetricItem>
                <MetricLabel>ROI</MetricLabel>
                <MetricValue>{campaign.roi}%</MetricValue>
              </MetricItem>
            </CampaignCardMetrics>

            <ProgressBar>
              <ProgressFill width={(campaign.spent / campaign.budget) * 100} />
            </ProgressBar>
            <ProgressLabel>
              {((campaign.spent / campaign.budget) * 100).toFixed(0)}% of budget
              used
            </ProgressLabel>
          </CampaignCardContent>

          <CampaignCardFooter>
            <CampaignCardDate>
              <Calendar size={14} />
              {new Date(campaign.startDate).toLocaleDateString()} -{" "}
              {new Date(campaign.endDate).toLocaleDateString()}
            </CampaignCardDate>
            <CampaignCardActions>
              <ActionButton
                small
                primary
                onClick={() => onViewDetails(campaign)}
              >
                View Details
              </ActionButton>
            </CampaignCardActions>
          </CampaignCardFooter>
        </CampaignCard>
      ))}
    </GridContainer>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const CampaignCard = styled.div`
  display: flex;
  flex-direction: column;
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

const CampaignCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem 1.5rem 0 1.5rem;
  gap: 1rem;
`;

const CampaignCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const CampaignCardName = styled.button`
  background: none;
  border: none;
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.primary.dark};
  cursor: pointer;
  text-align: left;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const CampaignCardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CampaignCardActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const CampaignCardContent = styled.div`
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CampaignCardDescription = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin: 0;
  line-height: 1.5;
`;

const CampaignCardMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const MetricItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const MetricLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const MetricValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
`;

interface ProgressFillProps {
  width: number;
}

const ProgressFill = styled.div<ProgressFillProps>`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: ${sharedTheme.colorVariants.primary.dark};
  transition: width 0.3s ease;
`;

const ProgressLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
  text-align: center;
`;

const CampaignCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem 1.5rem 1.5rem;
  border-top: 1px solid #f3f4f6;
  margin-top: auto;
  padding-top: 1rem;
`;

const CampaignCardDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;
