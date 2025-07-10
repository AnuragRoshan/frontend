// components/CampaignGrid.tsx
import React from "react";
import styled from "styled-components";
import {
  Calendar,
  Eye,
  MoreHorizontal,
  Globe,
  Send,
  Play,
  Pause,
  BarChart,
} from "lucide-react";
import { sharedTheme } from "../../../../../styles/theme/theme";
import { ActionButton } from "../shared/ActionButton";
import { StatusBadge } from "../shared/StatusBadge";
import { PlatformBadge } from "../shared/PlatformBadge";
import { Campaign } from "../types/campaign.types";
import { formatNumber } from "../utils/campaign.utils";

interface CampaignGridProps {
  campaigns: Campaign[];
  onViewDetails: (campaign: Campaign) => void;
  onEditCampaign: (campaign: Campaign) => void;
  onPublishCampaign: (campaign: Campaign) => void;
  onSendDeals: (campaign: Campaign) => void;
  onPauseCampaign?: (campaign: Campaign) => void;
  onResumeCampaign?: (campaign: Campaign) => void;
  onViewAnalytics?: (campaign: Campaign) => void;
}

export const CampaignGrid: React.FC<CampaignGridProps> = ({
  campaigns,
  onViewDetails,
  onPublishCampaign,
  onSendDeals,
  onPauseCampaign,
  onResumeCampaign,
  onViewAnalytics,
}) => {
  const renderActionButtons = (campaign: Campaign) => {
    switch (campaign.status) {
      case "draft":
        return (
          <DraftActions>
            <ActionButton
              small
              onClick={() => onPublishCampaign(campaign)}
              variant="success"
            >
              <Globe size={14} />
              Publish
            </ActionButton>
            <ActionButton small primary onClick={() => onSendDeals(campaign)}>
              <Send size={14} />
              Send Deals
            </ActionButton>
          </DraftActions>
        );

      case "live":
        return (
          <LiveActions>
            <ActionButton
              small
              onClick={() => onViewAnalytics?.(campaign)}
              variant="secondary"
            >
              <BarChart size={14} />
              Analytics
            </ActionButton>
            <ActionButton
              small
              onClick={() => onPauseCampaign?.(campaign)}
              variant="warning"
            >
              <Pause size={14} />
              Pause
            </ActionButton>
            <ActionButton small onClick={() => onSendDeals(campaign)} primary>
              <Send size={14} />
              Add Influencers
            </ActionButton>
          </LiveActions>
        );

      case "paused":
        return (
          <PausedActions>
            <ActionButton
              small
              onClick={() => onResumeCampaign?.(campaign)}
              variant="success"
            >
              <Play size={14} />
              Resume
            </ActionButton>
          </PausedActions>
        );

      case "ended":
        return (
          <EndedActions>
            <ActionButton
              small
              onClick={() => onViewAnalytics?.(campaign)}
              variant="secondary"
            >
              <BarChart size={14} />
              View Report
            </ActionButton>
            <ActionButton
              small
              onClick={() => onViewDetails(campaign)}
              variant="secondary"
            >
              <Eye size={14} />
              View Details
            </ActionButton>
          </EndedActions>
        );

      default:
        return (
          <DefaultActions>
            <ActionButton
              small
              onClick={() => onViewDetails(campaign)}
              variant="secondary"
            >
              <Eye size={14} />
              View Details
            </ActionButton>
          </DefaultActions>
        );
    }
  };

  return (
    <GridContainer>
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} status={campaign.status}>
          <CampaignCardHeader>
            <CampaignCardInfo>
              <CampaignCardName onClick={() => onViewDetails(campaign)}>
                {campaign.name}
              </CampaignCardName>
              <CampaignCardMeta>
                <StatusBadge status={campaign.status}>
                  {campaign.status}
                </StatusBadge>
                <CategoryBadge>{campaign.category}</CategoryBadge>
                <PlatformBadge platform={campaign.platform}>
                  {campaign.platform}
                </PlatformBadge>
              </CampaignCardMeta>
            </CampaignCardInfo>
            <CampaignCardMenuButton>
              <ActionButton small variant="ghost">
                <MoreHorizontal size={14} />
              </ActionButton>
            </CampaignCardMenuButton>
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

              {campaign.status !== "draft" && (
                <>
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
                </>
              )}

              {campaign.status === "draft" && (
                <>
                  <MetricItem>
                    <MetricLabel>Deals Sent</MetricLabel>
                    <MetricValue>0</MetricValue>
                  </MetricItem>
                  <MetricItem>
                    <MetricLabel>Views</MetricLabel>
                    <MetricValue>0</MetricValue>
                  </MetricItem>
                </>
              )}
            </CampaignCardMetrics>

            {campaign.status !== "draft" && campaign.budget > 0 && (
              <>
                <ProgressBar>
                  <ProgressFill
                    width={(campaign.spent / campaign.budget) * 100}
                  />
                </ProgressBar>
                <ProgressLabel>
                  {((campaign.spent / campaign.budget) * 100).toFixed(0)}% of
                  budget used
                </ProgressLabel>
              </>
            )}
          </CampaignCardContent>

          <CampaignCardFooter>
            <CampaignCardDate>
              <Calendar size={14} />
              {new Date(campaign.startDate).toLocaleDateString()} -{" "}
              {new Date(campaign.endDate).toLocaleDateString()}
            </CampaignCardDate>

            <CampaignCardActions>
              {renderActionButtons(campaign)}
            </CampaignCardActions>
          </CampaignCardFooter>
        </CampaignCard>
      ))}
    </GridContainer>
  );
};

// Styled Components
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CampaignCard = styled.div<{ status: string }>`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 2px solid
    ${(props) => {
      switch (props.status) {
        case "draft":
          return "#e5e7eb";
        case "live":
          return "#10b981";
        case "paused":
          return "#f59e0b";
        case "ended":
          return "#6b7280";
        default:
          return "#e5e7eb";
      }
    }};
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background-color: ${(props) => {
      switch (props.status) {
        case "draft":
          return "#6b7280";
        case "live":
          return "#10b981";
        case "paused":
          return "#f59e0b";
        case "ended":
          return "#ef4444";
        default:
          return "#6b7280";
      }
    }};
  }
`;

const CampaignCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  gap: 1rem;
`;

const CampaignCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
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
  line-height: 1.4;

  &:hover {
    text-decoration: underline;
  }
`;

const CampaignCardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const CategoryBadge = styled.span`
  padding: 0.25rem 0.5rem;
  background-color: #f3f4f6;
  color: ${sharedTheme.colorVariants.secondary.dark};
  border-radius: 4px;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
`;

const CampaignCardMenuButton = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const CampaignCardContent = styled.div`
  padding: 0 1.5rem 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;

const CampaignCardDescription = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
  font-weight: ${sharedTheme.typography.fontWeights.medium};
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
  width: ${(props) => Math.min(props.width, 100)}%;
  background: linear-gradient(
    90deg,
    ${sharedTheme.colorVariants.primary.light} 0%,
    ${sharedTheme.colorVariants.primary.dark} 100%
  );
  transition: width 0.3s ease;
`;

const ProgressLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
  text-align: center;
  font-weight: ${sharedTheme.typography.fontWeights.medium};
`;

const CampaignCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  border-top: 1px solid #f3f4f6;
  margin-top: auto;
  gap: 1rem;
`;

const CampaignCardDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
`;

const CampaignCardActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

// Status-specific action containers
const DraftActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const LiveActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const PausedActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const EndedActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const DefaultActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export default CampaignGrid;
