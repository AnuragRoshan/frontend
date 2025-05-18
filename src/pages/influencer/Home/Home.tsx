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
} from "lucide-react";

import WrapperBox from "../../../components/layout/WrapperBox";
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
    return (
      <>
        <HomeSkeleton />
      </>
    );
  }

  return (
    <PageContainer>
      {/* Welcome Banner */}
      <WrapperBox
        style={{
          marginInline: "auto",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          padding: "1.5rem",
        }}
        themeVariant="grey"
      >
        <BannerImage
          src="https://ik.imagekit.io/i3divn77k/MVP/banner.png?updatedAt=1746481730353"
          alt="Welcome Banner"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            gap: "0.6rem",
          }}
        >
          <WelcomeText>Hey Anurag, Welcome to Creator Hub!</WelcomeText>
          <SubText>
            Empower your influence. Track your growth, manage campaigns, and
            unlock new opportunities — all in one place.
          </SubText>
          <ProfilePrompt>
            Let's get started by completing your&nbsp;
            <ProfileLink
              onClick={() => {
                navigate("/profile");
              }}
            >
              profile
            </ProfileLink>
          </ProfilePrompt>
          <div>75% completed</div>
          <ProgressWrapper>
            <ProgressBar percentage={progress} />
            <ProgressLabel>{progress}%</ProgressLabel>
          </ProgressWrapper>
        </div>
      </WrapperBox>

      {/* Stats Overview Row */}
      <StatsContainer>
        <StatsCard>
          <StatsContent>
            <div>
              <StatsTitle>
                <IconWrapper>
                  <DollarSign size={18} />
                </IconWrapper>
                Earnings
              </StatsTitle>
              <StatsValue color="#059669">₹12,500</StatsValue>
              <StatsTrend>+30% growth this month</StatsTrend>
            </div>
            <StatsImage
              src="https://ik.imagekit.io/i3divn77k/MVP/money1.png?updatedAt=1746485572792"
              alt="Earnings Graphic"
            />
          </StatsContent>
        </StatsCard>

        <StatsCard>
          <StatsContent>
            <div>
              <StatsTitle>
                <IconWrapper>
                  <Heart size={18} />
                </IconWrapper>
                Engagement Rate
              </StatsTitle>
              <StatsValue>4.8%</StatsValue>
              <StatsTrend>+0.6% vs last month</StatsTrend>
            </div>
            <StatsImage
              src="https://ik.imagekit.io/i3divn77k/MVP/engagement.png?updatedAt=1746812608782"
              alt="Engagement Graphic"
            />
          </StatsContent>
        </StatsCard>

        <StatsCard>
          <StatsContent>
            <div>
              <StatsTitle>
                <IconWrapper>
                  <Users size={18} />
                </IconWrapper>
                Followers Growth
              </StatsTitle>
              <StatsValue>2,450</StatsValue>
              <StatsTrend>+15% this month</StatsTrend>
            </div>
            <StatsImage
              src="https://ik.imagekit.io/i3divn77k/MVP/followerGrowth2.png?updatedAt=1746813407506"
              alt="Followers Graphic"
            />
          </StatsContent>
        </StatsCard>
      </StatsContainer>

      <MainContent>
        {/* Left Column - Campaigns and Analytics */}
        <MainColumn>
          {/* Ongoing Campaigns */}

          <WrapperBox themeVariant="grey">
            <SectionTitle>
              Ongoing Campaigns
              <ViewAllLink onClick={() => navigate("/campaigns")}>
                View all <ChevronRight size={16} />
              </ViewAllLink>
            </SectionTitle>
            <CampaignTable />
          </WrapperBox>

          {/* Performance Analytics */}

          <WrapperBox themeVariant="grey">
            <SectionTitle>Performance Analytics</SectionTitle>

            <ChartLegend>
              <LegendItem>
                <LegendColor color="#3b82f6" />
                <span>Followers</span>
              </LegendItem>
              <LegendItem>
                <LegendColor color="#10b981" />
                <span>Engagement Rate</span>
              </LegendItem>
            </ChartLegend>

            <ChartContainer>
              <canvas
                ref={canvasRef}
                style={{ width: "100%", height: "100%" }}
              ></canvas>
            </ChartContainer>
          </WrapperBox>

          {/* Upcoming Deadlines */}
          <WrapperBox themeVariant="grey">
            <SectionTitle>Upcoming Deadlines</SectionTitle>

            <DeadlineItem>
              <IconWrapper
                style={{ backgroundColor: "#FFEDD5", color: "#D97706" }}
              >
                <AlertCircle size={18} />
              </IconWrapper>
              <DeadlineContent>
                <DeadlineTitle>StyleHub Content Submission</DeadlineTitle>
                <DeadlineDate>Due in 2 days</DeadlineDate>
              </DeadlineContent>
            </DeadlineItem>

            <DeadlineItem>
              <IconWrapper
                style={{ backgroundColor: "#DBEAFE", color: "#2563EB" }}
              >
                <Clock size={18} />
              </IconWrapper>
              <DeadlineContent>
                <DeadlineTitle>FitLife Feedback Call</DeadlineTitle>
                <DeadlineDate>May 12, 2025 at 3:00 PM</DeadlineDate>
              </DeadlineContent>
            </DeadlineItem>

            <DeadlineItem>
              <IconWrapper>
                <Star size={18} />
              </IconWrapper>
              <DeadlineContent>
                <DeadlineTitle>NatureEats Contract Review</DeadlineTitle>
                <DeadlineDate>May 15, 2025</DeadlineDate>
              </DeadlineContent>
            </DeadlineItem>
          </WrapperBox>
        </MainColumn>

        {/* Right Column - Notifications, Opportunities, Deadlines */}
        <SideColumn>
          {/* Notifications */}
          <WrapperBox
            style={{
              padding: "1.5rem",
              marginBottom: "1.5rem",
            }}
            themeVariant="grey"
          >
            <SectionTitle>
              Notifications
              <Badge variant="info">5 new</Badge>
            </SectionTitle>

            <NotificationItem>
              <NotificationIconWrapper
                style={{ backgroundColor: "#ECFDF5", color: "#059669" }}
              >
                <CheckCircle size={20} />
              </NotificationIconWrapper>
              <NotificationContent>
                <NotificationTitle>Campaign Approved</NotificationTitle>
                <NotificationDescription>
                  Your proposal for FitLife campaign has been approved!
                </NotificationDescription>
                <NotificationTime>2 hours ago</NotificationTime>
              </NotificationContent>
            </NotificationItem>

            <NotificationItem>
              <NotificationIconWrapper
                style={{ backgroundColor: "#EFF6FF", color: "#2563EB" }}
              >
                <MessageSquare size={20} />
              </NotificationIconWrapper>
              <NotificationContent>
                <NotificationTitle>New Message</NotificationTitle>
                <NotificationDescription>
                  StyleHub sent you a message about your content draft
                </NotificationDescription>
                <NotificationTime>5 hours ago</NotificationTime>
              </NotificationContent>
            </NotificationItem>

            <NotificationItem>
              <NotificationIconWrapper
                style={{ backgroundColor: "#ECFDF5", color: "#059669" }}
              >
                <DollarSign size={20} />
              </NotificationIconWrapper>
              <NotificationContent>
                <NotificationTitle>Payment Received</NotificationTitle>
                <NotificationDescription>
                  You received ₹3,500 from TechGadgets campaign
                </NotificationDescription>
                <NotificationTime>Yesterday</NotificationTime>
              </NotificationContent>
            </NotificationItem>
          </WrapperBox>

          {/* Upcoming Opportunities */}
          <WrapperBox
            style={{ padding: "1.5rem", marginBottom: "1.5rem" }}
            themeVariant="grey"
          >
            <SectionTitle>
              Upcoming Opportunities
              <ViewAllLink onClick={() => navigate("/opportunities")}>
                View all <ChevronRight size={16} />
              </ViewAllLink>
            </SectionTitle>

            <OpportunityItem>
              <OpportunityHeader>
                <OpportunityTitle>Beauty Product Launch</OpportunityTitle>
                <Badge variant="success">92% match</Badge>
              </OpportunityHeader>
              <OpportunityBrand>GlowUp</OpportunityBrand>
              <OpportunityDetails>
                <OpportunityDetail>
                  <DollarSign size={16} />
                  <span>₹6,000-₹8,000</span>
                </OpportunityDetail>
                <OpportunityDetail>
                  <Calendar size={16} />
                  <span>Apply by May 18, 2025</span>
                </OpportunityDetail>
              </OpportunityDetails>
              <OpportunityButton>View Details</OpportunityButton>
            </OpportunityItem>

            <OpportunityItem>
              <OpportunityHeader>
                <OpportunityTitle>Travel Vlog Series</OpportunityTitle>
                <Badge variant="success">85% match</Badge>
              </OpportunityHeader>
              <OpportunityBrand>Wanderlust</OpportunityBrand>
              <OpportunityDetails>
                <OpportunityDetail>
                  <DollarSign size={16} />
                  <span>₹15,000-₹20,000</span>
                </OpportunityDetail>
                <OpportunityDetail>
                  <Calendar size={16} />
                  <span>Apply by May 22, 2025</span>
                </OpportunityDetail>
              </OpportunityDetails>
              <OpportunityButton>View Details</OpportunityButton>
            </OpportunityItem>
            <OpportunityItem>
              <OpportunityHeader>
                <OpportunityTitle>Travel Vlog Series</OpportunityTitle>
                <Badge variant="success">85% match</Badge>
              </OpportunityHeader>
              <OpportunityBrand>Wanderlust</OpportunityBrand>
              <OpportunityDetails>
                <OpportunityDetail>
                  <DollarSign size={16} />
                  <span>₹15,000-₹20,000</span>
                </OpportunityDetail>
                <OpportunityDetail>
                  <Calendar size={16} />
                  <span>Apply by May 22, 2025</span>
                </OpportunityDetail>
              </OpportunityDetails>
              <OpportunityButton>View Details</OpportunityButton>
            </OpportunityItem>
          </WrapperBox>
        </SideColumn>
      </MainContent>
    </PageContainer>
  );
};

export default Home;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 20px;
`;

const BannerImage = styled.img`
  height: 120px;
  width: 120px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
`;

const WelcomeText = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xxl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const SubText = styled.div`
  color: #333;
  font-weight: ${sharedTheme.typography.fontWeights.medium};
`;

const ProfilePrompt = styled.div`
  font-weight: bold;
  color: #555;
  display: flex;
`;

const ProfileLink = styled.span`
  color: ${sharedTheme.colorVariants.link.default};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ProgressWrapper = styled.div`
  height: 10px;
  width: 100%;
  background-color: #d0e6ff;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
`;

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar = styled.div<ProgressBarProps>`
  height: 100%;
  width: ${({ percentage }) => `${percentage}%`};
  background-color: ${({ percentage }) => {
    if (percentage >= 100) return "#059669"; // green
    if (percentage >= 75) return "#3B82F6"; // blue
    if (percentage >= 50) return "#F59E0B"; // yellow
    return "#EF4444"; // red
  }};
  border-radius: 5px 0 0 5px;
  transition: width 0.3s ease-in;
`;

const ProgressLabel = styled.div`
  position: absolute;
  top: -22px;
  right: 0;
  font-size: 12px;
  font-weight: bold;
  color: #007bff;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const StatsCard = styled.div`
  background: ${sharedTheme.extendedDesignTokens.gradients.lightBlue};
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;

  border: 1px solid #5a5a5a2e;
`;

const StatsContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const StatsTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  margin-bottom: 8px;
`;

interface StatsValueProps {
  color?: string;
}

const StatsValue = styled.div<StatsValueProps>`
  font-size: ${sharedTheme.typography.fontSizes.xxxl};
  font-weight: ${sharedTheme.typography.fontWeights.extrabold};
  color: ${(props) => props.color || "#1F2937"};
  margin: 8px 0;
`;

const StatsTrend = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: #6b7280;
`;

const StatsImage = styled.img`
  height: 100px;
  width: 100px;
  object-fit: contain;
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
  gap: 1rem;
`;

const SideColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

// Reusable components

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: #ebf5ff;
  color: ${sharedTheme.colorVariants.primary.light};
  flex-shrink: 0;
`;

const SectionTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ViewAllLink = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.link.default};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    text-decoration: underline;
  }
`;

const Badge = styled.div<{
  variant?: "success" | "warning" | "info" | "default";
}>`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  padding: 4px 8px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;

  background-color: ${({ variant }) => {
    switch (variant) {
      case "success":
        return "#ECFDF5";
      case "warning":
        return "#FFFBEB";
      case "info":
        return "#EFF6FF";
      default:
        return "#F3F4F6";
    }
  }};

  color: ${({ variant }) => {
    switch (variant) {
      case "success":
        return "#059669";
      case "warning":
        return "#D97706";
      case "info":
        return "#2563EB";
      default:
        return "#4B5563";
    }
  }};
`;

const NotificationItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  /* border-bottom: 1px solid #00000025; */
  margin-bottom: 8px;
  border-radius: 8px;
  background-color: #ffffff;
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const NotificationIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  gap: 8px;
  height: 40px;
  border-radius: 50%;
  background-color: #f3f4f6;
  flex-shrink: 0;
`;

const NotificationContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const NotificationTitle = styled.div`
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const NotificationDescription = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: #6b7280;
`;

const NotificationTime = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: #9ca3af;
  margin-top: 4px;
`;

const OpportunityItem = styled.div`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #f3f4f6;
  margin-bottom: 12px;
  transition: all 0.2s ease;

  background-color: #f9fafb;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
`;

const OpportunityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const OpportunityTitle = styled.div`
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const OpportunityBrand = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: #6b7280;
  margin-bottom: 12px;
`;

const OpportunityDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const OpportunityDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: #6b7280;
`;

const OpportunityButton = styled.button`
  background-color: ${sharedTheme.colorVariants.primary.dark};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${sharedTheme.colorVariants.secondary.light};
  }
`;

const DeadlineItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background-color: #ffffff;
  margin-bottom: 8px;
`;

const DeadlineContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const DeadlineTitle = styled.div`
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const DeadlineDate = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: #6b7280;
`;

const ChartContainer = styled.div`
  margin-top: 16px;
  height: 250px;
  position: relative;
`;

const ChartLegend = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  background-color: white;
`;

const LegendColor = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background-color: ${(props) => props.color};
`;
