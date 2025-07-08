import React from "react";
import styled from "styled-components";
import { theme, formatNumber } from "../theme.ts";
import {
  Briefcase,
  DollarSign,
  Users,
  Eye,
  Plus,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  CheckCircle,
  Clock,
  FileText,
  Activity,
} from "lucide-react";
import { getStatusColor, getPriorityColor } from "../theme.ts";

interface OverviewData {
  overview: {
    activeCampaigns: number;
    activeCampaignsChange: number;
    totalSpent: number;
    totalSpentChange: number;
    totalInfluencers: number;
    totalInfluencersChange: number;
    totalImpressions: number;
    totalImpressionsChange: number;
  };
  campaigns: Array<{
    id: string | number;
    name: string;
    status: string;
    platform: string;
    spent: number;
    budget: number;
    influencers: number;
    impressions: number;
    endDate: string;
  }>;
  pendingTasks: Array<{
    id: string | number;
    type: string;
    priority: string;
    title: string;
    description: string;
    campaign: string;
    dueDate: string;
  }>;
  recentActivity: Array<{
    id: string | number;
    title: string;
    campaign: string;
    timestamp: string;
  }>;
}

interface OverviewSectionProps {
  data: OverviewData;
}

const OverviewSection: React.FC<OverviewSectionProps> = ({ data }) => {
  const renderTrendIndicator = (value: number) => {
    if (value > 0) {
      return (
        <TrendPositive>
          <ArrowUpRight size={14} />
          {value}%
        </TrendPositive>
      );
    } else if (value < 0) {
      return (
        <TrendNegative>
          <ArrowDownRight size={14} />
          {Math.abs(value)}%
        </TrendNegative>
      );
    } else {
      return <TrendNeutral>{value}%</TrendNeutral>;
    }
  };

  return (
    <SectionContainer>
      {/* Performance Overview */}
      <SectionHeader>
        <SectionTitle>Performance Overview</SectionTitle>
        <SectionDescription>
          Key metrics and insights for your brand campaigns
        </SectionDescription>
      </SectionHeader>

      <MetricsGrid>
        <MetricCard>
          <MetricHeader>
            <MetricTitle>Active Campaigns</MetricTitle>
            <MetricIcon>
              <Briefcase size={18} />
            </MetricIcon>
          </MetricHeader>
          <MetricValue>{data.overview.activeCampaigns}</MetricValue>
          <MetricTrend>
            {renderTrendIndicator(data.overview.activeCampaignsChange)}
            <MetricTrendLabel>vs. previous period</MetricTrendLabel>
          </MetricTrend>
        </MetricCard>

        <MetricCard>
          <MetricHeader>
            <MetricTitle>Total Spent</MetricTitle>
            <MetricIcon>
              <DollarSign size={18} />
            </MetricIcon>
          </MetricHeader>
          <MetricValue>₹{formatNumber(data.overview.totalSpent)}</MetricValue>
          <MetricTrend>
            {renderTrendIndicator(data.overview.totalSpentChange)}
            <MetricTrendLabel>vs. previous period</MetricTrendLabel>
          </MetricTrend>
        </MetricCard>

        <MetricCard>
          <MetricHeader>
            <MetricTitle>Total Influencers</MetricTitle>
            <MetricIcon>
              <Users size={18} />
            </MetricIcon>
          </MetricHeader>
          <MetricValue>{data.overview.totalInfluencers}</MetricValue>
          <MetricTrend>
            {renderTrendIndicator(data.overview.totalInfluencersChange)}
            <MetricTrendLabel>collaborations</MetricTrendLabel>
          </MetricTrend>
        </MetricCard>

        <MetricCard>
          <MetricHeader>
            <MetricTitle>Total Impressions</MetricTitle>
            <MetricIcon>
              <Eye size={18} />
            </MetricIcon>
          </MetricHeader>
          <MetricValue>
            {formatNumber(data.overview.totalImpressions)}
          </MetricValue>
          <MetricTrend>
            {renderTrendIndicator(data.overview.totalImpressionsChange)}
            <MetricTrendLabel>reach growth</MetricTrendLabel>
          </MetricTrend>
        </MetricCard>
      </MetricsGrid>

      {/* Ongoing Campaigns */}
      <CampaignsOverviewSection>
        <SectionHeader>
          <SectionTitle>Ongoing Campaigns</SectionTitle>
          <ActionButton primary>
            <Plus size={16} />
            Create Campaign
          </ActionButton>
        </SectionHeader>

        <CampaignsGrid>
          {data.campaigns
            .filter((c) => c.status === "running")
            .map((campaign) => (
              <CampaignCard key={campaign.id}>
                <CampaignHeader>
                  <CampaignInfo>
                    <CampaignName>{campaign.name}</CampaignName>
                    <CampaignMeta>
                      <StatusBadge status={campaign.status}>
                        {campaign.status}
                      </StatusBadge>
                      <PlatformBadge>{campaign.platform}</PlatformBadge>
                    </CampaignMeta>
                  </CampaignInfo>
                  <CampaignActions>
                    <ActionButton small>
                      <Eye size={14} />
                    </ActionButton>
                    <ActionButton small>
                      <MoreHorizontal size={14} />
                    </ActionButton>
                  </CampaignActions>
                </CampaignHeader>

                <CampaignMetrics>
                  <MetricRow>
                    <MetricLabel>Budget vs Spent</MetricLabel>
                    <MetricValue2>
                      ₹{formatNumber(campaign.spent)} / ₹
                      {formatNumber(campaign.budget)}
                    </MetricValue2>
                  </MetricRow>
                  <ProgressBar>
                    <ProgressFill
                      width={(campaign.spent / campaign.budget) * 100}
                    />
                  </ProgressBar>
                  <MetricRow>
                    <MetricLabel>Influencers</MetricLabel>
                    <MetricValue2>{campaign.influencers} assigned</MetricValue2>
                  </MetricRow>
                  <MetricRow>
                    <MetricLabel>Performance</MetricLabel>
                    <MetricValue2>
                      {formatNumber(campaign.impressions)} impressions
                    </MetricValue2>
                  </MetricRow>
                </CampaignMetrics>

                <CampaignFooter>
                  <CampaignDate>
                    <Calendar size={14} />
                    Ends {campaign.endDate}
                  </CampaignDate>
                  <ViewDetailsButton>
                    View Details
                    <ArrowUpRight size={14} />
                  </ViewDetailsButton>
                </CampaignFooter>
              </CampaignCard>
            ))}
        </CampaignsGrid>
      </CampaignsOverviewSection>

      {/* Pending Tasks */}
      <PendingTasksSection>
        <SectionHeader>
          <SectionTitle>Pending Tasks & Notifications</SectionTitle>
          <ViewAllButton>View All</ViewAllButton>
        </SectionHeader>

        <TasksList>
          {data.pendingTasks
            .slice(0, 4)
            .map((task: OverviewData["pendingTasks"][number]) => (
              <TaskItem key={task.id}>
                <TaskIcon priority={task.priority}>
                  {task.type === "approval_pending" && (
                    <CheckCircle size={18} />
                  )}
                  {task.type === "payment_due" && <DollarSign size={18} />}
                  {task.type === "campaign_ending" && <Clock size={18} />}
                  {task.type === "influencer_application" && (
                    <Users size={18} />
                  )}
                  {task.type === "report_ready" && <FileText size={18} />}
                </TaskIcon>
                <TaskContent>
                  <TaskTitle>{task.title}</TaskTitle>
                  <TaskDescription>{task.description}</TaskDescription>
                  <TaskMeta>
                    <TaskCampaign>{task.campaign}</TaskCampaign>
                    <TaskDue>Due: {task.dueDate}</TaskDue>
                  </TaskMeta>
                </TaskContent>
                <TaskActions>
                  <ActionButton small primary>
                    Action
                  </ActionButton>
                </TaskActions>
              </TaskItem>
            ))}
        </TasksList>
      </PendingTasksSection>

      {/* Recent Activity */}
      <RecentActivitySection>
        <SectionHeader>
          <SectionTitle>Recent Activity</SectionTitle>
        </SectionHeader>

        <ActivityList>
          {data.recentActivity.map(
            (activity: OverviewData["recentActivity"][number]) => (
              <ActivityItem key={activity.id}>
                <ActivityIcon>
                  <Activity size={16} />
                </ActivityIcon>
                <ActivityContent>
                  <ActivityTitle>{activity.title}</ActivityTitle>
                  <ActivityMeta>
                    <ActivityCampaign>{activity.campaign}</ActivityCampaign>
                    <ActivityTime>{activity.timestamp}</ActivityTime>
                  </ActivityMeta>
                </ActivityContent>
              </ActivityItem>
            )
          )}
        </ActivityList>
      </RecentActivitySection>
    </SectionContainer>
  );
};

// Styled Components
const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
`;

const SectionTitle = styled.h2`
  font-size: ${theme.typography.fontSizes.xl};
  font-weight: ${theme.typography.fontWeights.bold};
  margin: 0;
  color: ${theme.colors.textPrimary};
`;

const SectionDescription = styled.p`
  font-size: ${theme.typography.fontSizes.md};
  color: ${theme.colors.textSecondary};
  margin: ${theme.spacing.xs} 0 0 0;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
`;

const MetricCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
`;

const MetricHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MetricTitle = styled.div`
  font-size: ${theme.typography.fontSizes.md};
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.textSecondary};
`;

const MetricIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.md};
  background: ${theme.gradients.lightBlue};
  color: ${theme.colors.primary};
`;

const MetricValue = styled.div`
  font-size: ${theme.typography.fontSizes.xxxl};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.textPrimary};
`;

const MetricValue2 = styled.div`
  font-size: ${theme.typography.fontSizes.lg};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.textPrimary};
`;

const MetricTrend = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: ${theme.typography.fontSizes.sm};
`;

const TrendPositive = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.success};
  font-weight: ${theme.typography.fontWeights.semibold};
`;

const TrendNegative = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.error};
  font-weight: ${theme.typography.fontWeights.semibold};
`;

const TrendNeutral = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.textSecondary};
  font-weight: ${theme.typography.fontWeights.semibold};
`;

const MetricTrendLabel = styled.div`
  color: ${theme.colors.textSecondary};
`;

interface ActionButtonProps {
  primary?: boolean;
  small?: boolean;
}

const ActionButton = styled.button<ActionButtonProps>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${(props) =>
    props.small
      ? `${theme.spacing.sm} ${theme.spacing.md}`
      : `${theme.spacing.md} ${theme.spacing.lg}`};
  background-color: ${(props) =>
    props.primary ? theme.colors.primary : theme.colors.surface};
  border: 1px solid
    ${(props) => (props.primary ? theme.colors.primary : theme.colors.border)};
  border-radius: ${theme.borderRadius.md};
  font-size: ${(props) =>
    props.small
      ? theme.typography.fontSizes.xs
      : theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${(props) =>
    props.primary ? theme.colors.background : theme.colors.textPrimary};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.primary ? theme.colors.primaryDark : theme.colors.border};
    transform: translateY(-1px);
  }
`;

const CampaignsOverviewSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const CampaignsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.lg};
`;

const CampaignCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
`;

const CampaignHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${theme.spacing.md};
`;

const CampaignInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  flex: 1;
`;

const CampaignName = styled.h3`
  font-size: ${theme.typography.fontSizes.lg};
  font-weight: ${theme.typography.fontWeights.semibold};
  margin: 0;
  color: ${theme.colors.textPrimary};
`;

const CampaignMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = styled.div<StatusBadgeProps>`
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  font-size: ${theme.typography.fontSizes.xs};
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.sm};
  background-color: ${(props) => getStatusColor(props.status)};
  text-transform: capitalize;
`;

const PlatformBadge = styled.div`
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  font-size: ${theme.typography.fontSizes.xs};
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.textPrimary};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  background-color: ${theme.colors.surface};
`;

const CampaignActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const CampaignMetrics = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const MetricRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MetricLabel = styled.div`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.textSecondary};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.sm};
  overflow: hidden;
`;

interface ProgressFillProps {
  width: number;
}

const ProgressFill = styled.div<ProgressFillProps>`
  height: 100%;
  width: ${(props) => props.width}%;
  background: ${theme.gradients.primary};
  transition: width 0.3s ease;
`;

const CampaignFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.border};
`;

const CampaignDate = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.textSecondary};
`;

const ViewDetailsButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: none;
  border: none;
  color: ${theme.colors.primary};
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    text-decoration: underline;
  }
`;

const ViewAllButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primary};
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    text-decoration: underline;
  }
`;

const PendingTasksSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const TasksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const TaskItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.md};
  }
`;

interface TaskIconProps {
  priority: string;
}

const TaskIcon = styled.div<TaskIconProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.md};
  background-color: ${(props) => {
    const color = getPriorityColor(props.priority);
    return `${color}20`;
  }};
  color: ${(props) => getPriorityColor(props.priority)};
  flex-shrink: 0;
`;

const TaskContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  flex: 1;
`;

const TaskTitle = styled.h4`
  font-size: ${theme.typography.fontSizes.md};
  font-weight: ${theme.typography.fontWeights.semibold};
  margin: 0;
  color: ${theme.colors.textPrimary};
`;

const TaskDescription = styled.p`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  margin: 0;
`;

const TaskMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xs};
`;

const TaskCampaign = styled.div`
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.primary};
  font-weight: ${theme.typography.fontWeights.medium};
`;

const TaskDue = styled.div`
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.textSecondary};
`;

const TaskActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  flex-shrink: 0;
`;

const RecentActivitySection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
`;

const ActivityIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${theme.colors.surface};
  color: ${theme.colors.primary};
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.textPrimary};
`;

const ActivityMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const ActivityCampaign = styled.div`
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.primary};
`;

const ActivityTime = styled.div`
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.textSecondary};
`;

export default OverviewSection;
