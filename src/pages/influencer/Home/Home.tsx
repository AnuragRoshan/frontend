import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  Calendar,
  Clock,
  DollarSign,
  Heart,
  MessageSquare,
  Users,
  ChevronRight,
  Star,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  BarChart2,
  Bell,
  Briefcase,
} from "lucide-react";

import { sharedTheme } from "../../../styles/theme/theme";
import { useNavigate } from "react-router-dom";
import CampaignTable from "../../../components/layout/CampaignTable";
import HomeSkeleton from "./HomeSkeleton";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        setProgress(current);
        if (current >= 75) {
          clearInterval(interval);
        }
      }, 15);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  if (isLoading) {
    return <HomeSkeleton />;
  }

  return (
    <PageContainer>
      {/* Welcome Banner */}
      <WelcomeBanner>
        <BannerContent>
          <BannerLeft>
            <BannerImage
              src="https://ik.imagekit.io/i3divn77k/MVP/banner.png?updatedAt=1746481730353"
              alt="Welcome Banner"
            />
          </BannerLeft>
          <BannerRight>
            <WelcomeText>Hey Anurag, Welcome to Vibeco !</WelcomeText>
            <SubText>
              Empower your influence. Track your growth, manage campaigns, and
              unlock new opportunities — all in one place.
            </SubText>
            <ProfilePrompt>
              Let's get started by completing your&nbsp;
              <ProfileLink onClick={() => navigate("/profile")}>
                profile
              </ProfileLink>
            </ProfilePrompt>
            <ProgressSection>
              <ProgressInfo>
                <ProgressText>Profile Completion</ProgressText>
                <ProgressPercentage>{progress}%</ProgressPercentage>
              </ProgressInfo>
              <ProgressWrapper>
                <ProgressBar percentage={progress} />
              </ProgressWrapper>
            </ProgressSection>
          </BannerRight>
        </BannerContent>
      </WelcomeBanner>

      {/* Stats Overview */}
      <StatsSection>
        <StatsCard variant="earnings">
          <StatsHeader>
            <StatsIcon>
              <DollarSign size={20} />
            </StatsIcon>
            <StatsTitle>Total Earnings</StatsTitle>
          </StatsHeader>
          <StatsContent>
            <StatsValue>₹12,500</StatsValue>
            <StatsTrend positive>
              <TrendingUp size={16} />
              +30% this month
            </StatsTrend>
          </StatsContent>
          <StatsImage
            src="https://ik.imagekit.io/i3divn77k/MVP/money1.png?updatedAt=1746485572792"
            alt="Earnings"
          />
        </StatsCard>

        <StatsCard variant="engagement">
          <StatsHeader>
            <StatsIcon>
              <Heart size={20} />
            </StatsIcon>
            <StatsTitle>Engagement Rate</StatsTitle>
          </StatsHeader>
          <StatsContent>
            <StatsValue>4.8%</StatsValue>
            <StatsTrend positive>
              <TrendingUp size={16} />
              +0.6% vs last month
            </StatsTrend>
          </StatsContent>
          <StatsImage
            src="https://ik.imagekit.io/i3divn77k/MVP/engagement.png?updatedAt=1746812608782"
            alt="Engagement"
          />
        </StatsCard>

        <StatsCard variant="followers">
          <StatsHeader>
            <StatsIcon>
              <Users size={20} />
            </StatsIcon>
            <StatsTitle>Followers Growth</StatsTitle>
          </StatsHeader>
          <StatsContent>
            <StatsValue>2,450</StatsValue>
            <StatsTrend positive>
              <TrendingUp size={16} />
              +15% this month
            </StatsTrend>
          </StatsContent>
          <StatsImage
            src="https://ik.imagekit.io/i3divn77k/MVP/followerGrowth2.png?updatedAt=1746813407506"
            alt="Followers"
          />
        </StatsCard>
      </StatsSection>

      <MainContent>
        {/* Left Column */}
        <MainColumn>
          {/* Ongoing Campaigns */}
          <ContentCard>
            <CardHeader>
              <SectionTitle>
                <Briefcase size={20} />
                Ongoing Campaigns
              </SectionTitle>
              <ViewAllLink onClick={() => navigate("/campaigns")}>
                View all
                <ChevronRight size={16} />
              </ViewAllLink>
            </CardHeader>
            <CampaignTable />
          </ContentCard>

          {/* Performance Analytics */}
          <ContentCard>
            <CardHeader>
              <SectionTitle>
                <BarChart2 size={20} />
                Performance Analytics
              </SectionTitle>
            </CardHeader>

            <ChartLegend>
              <LegendItem>
                <LegendDot color="#3b82f6" />
                <LegendLabel>Followers</LegendLabel>
              </LegendItem>
              <LegendItem>
                <LegendDot color="#10b981" />
                <LegendLabel>Engagement Rate</LegendLabel>
              </LegendItem>
            </ChartLegend>

            <ChartContainer>
              <canvas
                ref={canvasRef}
                style={{ width: "100%", height: "100%" }}
              />
            </ChartContainer>
          </ContentCard>

          {/* Upcoming Deadlines */}
          <ContentCard>
            <CardHeader>
              <SectionTitle>
                <Clock size={20} />
                Upcoming Deadlines
              </SectionTitle>
            </CardHeader>

            <DeadlinesList>
              <DeadlineItem priority="high">
                <DeadlineIcon variant="warning">
                  <AlertCircle size={18} />
                </DeadlineIcon>
                <DeadlineContent>
                  <DeadlineTitle>StyleHub Content Submission</DeadlineTitle>
                  <DeadlineDate>Due in 2 days</DeadlineDate>
                </DeadlineContent>
                <DeadlineBadge variant="warning">Urgent</DeadlineBadge>
              </DeadlineItem>

              <DeadlineItem priority="medium">
                <DeadlineIcon variant="info">
                  <Clock size={18} />
                </DeadlineIcon>
                <DeadlineContent>
                  <DeadlineTitle>FitLife Feedback Call</DeadlineTitle>
                  <DeadlineDate>May 12, 2025 at 3:00 PM</DeadlineDate>
                </DeadlineContent>
                <DeadlineBadge variant="info">Scheduled</DeadlineBadge>
              </DeadlineItem>

              <DeadlineItem priority="low">
                <DeadlineIcon variant="success">
                  <Star size={18} />
                </DeadlineIcon>
                <DeadlineContent>
                  <DeadlineTitle>NatureEats Contract Review</DeadlineTitle>
                  <DeadlineDate>May 15, 2025</DeadlineDate>
                </DeadlineContent>
                <DeadlineBadge variant="default">Review</DeadlineBadge>
              </DeadlineItem>
            </DeadlinesList>
          </ContentCard>
        </MainColumn>

        {/* Right Column */}
        <SideColumn>
          {/* Notifications */}
          <ContentCard>
            <CardHeader>
              <SectionTitle>
                <Bell size={20} />
                Notifications
              </SectionTitle>
              <NotificationBadge>5 new</NotificationBadge>
            </CardHeader>

            <NotificationsList>
              <NotificationItem>
                <NotificationIcon variant="success">
                  <CheckCircle size={20} />
                </NotificationIcon>
                <NotificationContent>
                  <NotificationTitle>Campaign Approved</NotificationTitle>
                  <NotificationDescription>
                    Your proposal for FitLife campaign has been approved!
                  </NotificationDescription>
                  <NotificationTime>2 hours ago</NotificationTime>
                </NotificationContent>
              </NotificationItem>

              <NotificationItem>
                <NotificationIcon variant="info">
                  <MessageSquare size={20} />
                </NotificationIcon>
                <NotificationContent>
                  <NotificationTitle>New Message</NotificationTitle>
                  <NotificationDescription>
                    StyleHub sent you a message about your content draft
                  </NotificationDescription>
                  <NotificationTime>5 hours ago</NotificationTime>
                </NotificationContent>
              </NotificationItem>

              <NotificationItem>
                <NotificationIcon variant="success">
                  <DollarSign size={20} />
                </NotificationIcon>
                <NotificationContent>
                  <NotificationTitle>Payment Received</NotificationTitle>
                  <NotificationDescription>
                    You received ₹3,500 from TechGadgets campaign
                  </NotificationDescription>
                  <NotificationTime>Yesterday</NotificationTime>
                </NotificationContent>
              </NotificationItem>
            </NotificationsList>
          </ContentCard>

          {/* Upcoming Opportunities */}
          <ContentCard>
            <CardHeader>
              <SectionTitle>
                <Star size={20} />
                Opportunities
              </SectionTitle>
              <ViewAllLink onClick={() => navigate("/opportunities")}>
                View all
                <ChevronRight size={16} />
              </ViewAllLink>
            </CardHeader>

            <OpportunitiesList>
              <OpportunityItem>
                <OpportunityHeader>
                  <OpportunityTitle>Beauty Product Launch</OpportunityTitle>
                  <MatchBadge variant="high">92% match</MatchBadge>
                </OpportunityHeader>
                <OpportunityBrand>GlowUp</OpportunityBrand>
                <OpportunityDetails>
                  <OpportunityDetail>
                    <DollarSign size={14} />
                    <span>₹6,000-₹8,000</span>
                  </OpportunityDetail>
                  <OpportunityDetail>
                    <Calendar size={14} />
                    <span>Apply by May 18</span>
                  </OpportunityDetail>
                </OpportunityDetails>
                <OpportunityActions>
                  <OpportunityButton variant="primary">
                    View Details
                  </OpportunityButton>
                </OpportunityActions>
              </OpportunityItem>

              <OpportunityItem>
                <OpportunityHeader>
                  <OpportunityTitle>Travel Vlog Series</OpportunityTitle>
                  <MatchBadge variant="medium">85% match</MatchBadge>
                </OpportunityHeader>
                <OpportunityBrand>Wanderlust</OpportunityBrand>
                <OpportunityDetails>
                  <OpportunityDetail>
                    <DollarSign size={14} />
                    <span>₹15,000-₹20,000</span>
                  </OpportunityDetail>
                  <OpportunityDetail>
                    <Calendar size={14} />
                    <span>Apply by May 22</span>
                  </OpportunityDetail>
                </OpportunityDetails>
                <OpportunityActions>
                  <OpportunityButton variant="primary">
                    View Details
                  </OpportunityButton>
                </OpportunityActions>
              </OpportunityItem>

              <OpportunityItem>
                <OpportunityHeader>
                  <OpportunityTitle>Tech Review Campaign</OpportunityTitle>
                  <MatchBadge variant="medium">78% match</MatchBadge>
                </OpportunityHeader>
                <OpportunityBrand>TechHub</OpportunityBrand>
                <OpportunityDetails>
                  <OpportunityDetail>
                    <DollarSign size={14} />
                    <span>₹4,500-₹6,500</span>
                  </OpportunityDetail>
                  <OpportunityDetail>
                    <Calendar size={14} />
                    <span>Apply by May 20</span>
                  </OpportunityDetail>
                </OpportunityDetails>
                <OpportunityActions>
                  <OpportunityButton variant="primary">
                    View Details
                  </OpportunityButton>
                </OpportunityActions>
              </OpportunityItem>
            </OpportunitiesList>
          </ContentCard>
        </SideColumn>
      </MainContent>
    </PageContainer>
  );
};

export default Home;

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const WelcomeBanner = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
`;

const BannerContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const BannerLeft = styled.div`
  flex-shrink: 0;
`;

const BannerImage = styled.img`
  height: 120px;
  width: 120px;
  object-fit: cover;
  border-radius: 12px;
`;

const BannerRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const WelcomeText = styled.h1`
  font-size: ${sharedTheme.typography.fontSizes.xxl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
`;

const SubText = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.md};
  color: ${sharedTheme.colorVariants.secondary.light};
  line-height: 1.5;
  margin: 0;
`;

const ProfilePrompt = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const ProfileLink = styled.span`
  color: ${sharedTheme.colorVariants.primary.dark};
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: ${sharedTheme.colorVariants.primary.darker};
  }
`;

const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProgressText = styled.span`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const ProgressPercentage = styled.span`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.primary.dark};
`;

const ProgressWrapper = styled.div`
  height: 8px;
  width: 100%;
  background-color: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressBar = styled.div<{ percentage: number }>`
  height: 100%;
  width: ${({ percentage }) => `${percentage}%`};
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  border-radius: 4px;
  transition: width 0.5s ease;
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const StatsCard = styled.div<{ variant?: string }>`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StatsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const StatsIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: #f3f4f6;
  color: ${sharedTheme.colorVariants.primary.dark};
`;

const StatsTitle = styled.h3`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
`;

const StatsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const StatsValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xxxl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const StatsTrend = styled.div<{ positive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${({ positive }) => (positive ? "#059669" : "#dc2626")};
`;

const StatsImage = styled.img`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  height: 60px;
  width: 60px;
  object-fit: contain;
  opacity: 0.8;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SideColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ContentCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
`;

const ViewAllLink = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.primary.dark};
  cursor: pointer;

  &:hover {
    color: ${sharedTheme.colorVariants.primary.darker};
    text-decoration: underline;
  }
`;

const ChartLegend = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LegendDot = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

const LegendLabel = styled.span`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const ChartContainer = styled.div`
  height: 250px;
  width: 100%;
  background-color: #f9fafb;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const DeadlinesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DeadlineItem = styled.div<{ priority?: string }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid
    ${({ priority }) => {
      switch (priority) {
        case "high":
          return "#ef4444";
        case "medium":
          return "#f59e0b";
        case "low":
          return "#10b981";
        default:
          return "#6b7280";
      }
    }};
`;

const DeadlineIcon = styled.div<{ variant?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${({ variant }) => {
    switch (variant) {
      case "warning":
        return "#fef3c7";
      case "info":
        return "#dbeafe";
      case "success":
        return "#d1fae5";
      default:
        return "#f3f4f6";
    }
  }};
  color: ${({ variant }) => {
    switch (variant) {
      case "warning":
        return "#d97706";
      case "info":
        return "#2563eb";
      case "success":
        return "#059669";
      default:
        return "#6b7280";
    }
  }};
`;

const DeadlineContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const DeadlineTitle = styled.h4`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
`;

const DeadlineDate = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin: 0;
`;

const DeadlineBadge = styled.div<{ variant?: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  background-color: ${({ variant }) => {
    switch (variant) {
      case "warning":
        return "#fef3c7";
      case "info":
        return "#dbeafe";
      case "success":
        return "#d1fae5";
      default:
        return "#f3f4f6";
    }
  }};
  color: ${({ variant }) => {
    switch (variant) {
      case "warning":
        return "#d97706";
      case "info":
        return "#2563eb";
      case "success":
        return "#059669";
      default:
        return "#6b7280";
    }
  }};
`;

const NotificationBadge = styled.div`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  background-color: #dbeafe;
  color: #2563eb;
`;

const NotificationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NotificationItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 8px;
`;

const NotificationIcon = styled.div<{ variant?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  background-color: ${({ variant }) => {
    switch (variant) {
      case "success":
        return "#d1fae5";
      case "info":
        return "#dbeafe";
      case "warning":
        return "#fef3c7";
      default:
        return "#f3f4f6";
    }
  }};
  color: ${({ variant }) => {
    switch (variant) {
      case "success":
        return "#059669";
      case "info":
        return "#2563eb";
      case "warning":
        return "#d97706";
      default:
        return "#6b7280";
    }
  }};
`;

const NotificationContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const NotificationTitle = styled.h4`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
`;

const NotificationDescription = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin: 0;
  line-height: 1.4;
`;

const NotificationTime = styled.span`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: #9ca3af;
`;

const OpportunitiesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OpportunityItem = styled.div`
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
`;

const OpportunityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

const OpportunityTitle = styled.h4`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
  flex: 1;
`;

const MatchBadge = styled.div<{ variant?: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  background-color: ${({ variant }) => {
    switch (variant) {
      case "high":
        return "#d1fae5";
      case "medium":
        return "#fef3c7";
      case "low":
        return "#fee2e2";
      default:
        return "#f3f4f6";
    }
  }};
  color: ${({ variant }) => {
    switch (variant) {
      case "high":
        return "#059669";
      case "medium":
        return "#d97706";
      case "low":
        return "#dc2626";
      default:
        return "#6b7280";
    }
  }};
`;

const OpportunityBrand = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin: 0 0 0.75rem 0;
`;

const OpportunityDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const OpportunityDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const OpportunityActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const OpportunityButton = styled.button<{ variant?: string }>`
  flex: 1;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid;

  ${({ variant }) => {
    switch (variant) {
      case "primary":
        return `
          background-color: ${sharedTheme.colorVariants.primary.dark};
          color: white;
          border-color: ${sharedTheme.colorVariants.primary.dark};
          
          &:hover {
            background-color: ${sharedTheme.colorVariants.primary.darker};
            border-color: ${sharedTheme.colorVariants.primary.darker};
          }
        `;
      case "secondary":
        return `
          background-color: white;
          color: ${sharedTheme.colorVariants.secondary.dark};
          border-color: #e5e7eb;
          
          &:hover {
            background-color: #f9fafb;
          }
        `;
      default:
        return `
          background-color: #f9fafb;
          color: ${sharedTheme.colorVariants.secondary.dark};
          border-color: #e5e7eb;
          
          &:hover {
            background-color: #f3f4f6;
          }
        `;
    }
  }}
`;
