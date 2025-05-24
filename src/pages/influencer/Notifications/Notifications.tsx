"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Bell,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  DollarSign,
  Star,
  TrendingUp,
  Users,
  Heart,
  Award,
  Clock,
  Target,
  Briefcase,
  Camera,
  MoreHorizontal,
} from "lucide-react";

import WrapperBox from "../../../components/layout/WrapperBox";
import { sharedTheme } from "../../../styles/theme/theme";

interface Notification {
  id: string;
  type:
    | "campaign"
    | "payment"
    | "message"
    | "achievement"
    | "deadline"
    | "opportunity"
    | "engagement"
    | "system";
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  priority: "high" | "medium" | "low";
  actionUrl?: string;
  metadata?: {
    amount?: string;
    campaignName?: string;
    brandName?: string;
    platform?: string;
    engagementCount?: number;
  };
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<
    Notification[]
  >([]);

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: "1",
        type: "campaign",
        title: "Campaign Approved",
        description:
          "Your proposal for FitLife Summer Collection campaign has been approved! Start creating content by May 15th.",
        timestamp: "2 hours ago",
        isRead: false,
        priority: "high",
        metadata: {
          campaignName: "FitLife Summer Collection",
          brandName: "FitLife",
        },
      },
      {
        id: "2",
        type: "payment",
        title: "Payment Received",
        description:
          "You received ₹8,500 for the TechGadgets Pro review campaign. Payment has been credited to your account.",
        timestamp: "4 hours ago",
        isRead: false,
        priority: "high",
        metadata: {
          amount: "₹8,500",
          campaignName: "TechGadgets Pro Review",
          brandName: "TechGadgets",
        },
      },
      {
        id: "3",
        type: "message",
        title: "New Message from StyleHub",
        description:
          "StyleHub sent you feedback on your latest content draft. They love the creative direction!",
        timestamp: "6 hours ago",
        isRead: true,
        priority: "medium",
        metadata: {
          brandName: "StyleHub",
        },
      },
      {
        id: "4",
        type: "achievement",
        title: "Milestone Reached!",
        description:
          "Congratulations! You've reached 50K followers on Instagram. Your influence is growing!",
        timestamp: "1 day ago",
        isRead: false,
        priority: "medium",
        metadata: {
          platform: "Instagram",
          engagementCount: 50000,
        },
      },
      {
        id: "5",
        type: "deadline",
        title: "Content Submission Due Soon",
        description:
          "Your content for NatureEats Organic campaign is due in 2 days. Don't forget to submit!",
        timestamp: "1 day ago",
        isRead: true,
        priority: "high",
        metadata: {
          campaignName: "NatureEats Organic",
          brandName: "NatureEats",
        },
      },
      {
        id: "6",
        type: "opportunity",
        title: "New Campaign Match",
        description:
          "Perfect match found! Beauty brand GlowUp is looking for creators like you. 95% compatibility score.",
        timestamp: "2 days ago",
        isRead: false,
        priority: "medium",
        metadata: {
          brandName: "GlowUp",
        },
      },
      {
        id: "7",
        type: "engagement",
        title: "Post Performance Update",
        description:
          "Your recent post for WellnessWorks gained 2.5K likes and 150 comments in 24 hours!",
        timestamp: "2 days ago",
        isRead: true,
        priority: "low",
        metadata: {
          campaignName: "WellnessWorks",
          engagementCount: 2500,
        },
      },
      {
        id: "8",
        type: "system",
        title: "Profile Verification Complete",
        description:
          "Your creator profile has been successfully verified. You now have access to premium campaigns!",
        timestamp: "3 days ago",
        isRead: true,
        priority: "medium",
      },
      {
        id: "9",
        type: "campaign",
        title: "Campaign Contract Signed",
        description:
          "Contract for Wanderlust Travel Series has been digitally signed. Campaign starts next week!",
        timestamp: "3 days ago",
        isRead: true,
        priority: "medium",
        metadata: {
          campaignName: "Wanderlust Travel Series",
          brandName: "Wanderlust",
        },
      },
      {
        id: "10",
        type: "payment",
        title: "Bonus Payment",
        description:
          "You earned a ₹2,000 performance bonus for exceeding engagement targets on your last campaign!",
        timestamp: "4 days ago",
        isRead: true,
        priority: "medium",
        metadata: {
          amount: "₹2,000",
        },
      },
    ];

    setNotifications(mockNotifications);
    setFilteredNotifications(mockNotifications);
  }, []);

  const getNotificationIcon = (type: string) => {
    const iconProps = { size: 20 };

    switch (type) {
      case "campaign":
        return <Briefcase {...iconProps} />;
      case "payment":
        return <DollarSign {...iconProps} />;
      case "message":
        return <MessageSquare {...iconProps} />;
      case "achievement":
        return <Award {...iconProps} />;
      case "deadline":
        return <Clock {...iconProps} />;
      case "opportunity":
        return <Target {...iconProps} />;
      case "engagement":
        return <Heart {...iconProps} />;
      case "system":
        return <Bell {...iconProps} />;
      default:
        return <Bell {...iconProps} />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "campaign":
        return { bg: "#EFF6FF", color: "#334155" };
      case "payment":
        return { bg: "#ECFDF5", color: "#334155" };
      case "message":
        return { bg: "#F0F9FF", color: "#334155" };
      case "achievement":
        return { bg: "#FEF3C7", color: "#334155" };
      case "deadline":
        return { bg: "#FFEDD5", color: "#334155" };
      case "opportunity":
        return { bg: "#F3E8FF", color: "#334155" };
      case "engagement":
        return { bg: "#FCE7F3", color: "#334155" };
      case "system":
        return { bg: "#F3F4F6", color: "#334155" };
      default:
        return { bg: "#F3F4F6", color: "#334155" };
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  //   const deleteNotification = (id: string) => {
  //     setNotifications((prev) => prev.filter((n) => n.id !== id));
  //   };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <PageContainer>
      {/* Header Section */}
      <HeaderSection>
        <WrapperBox themeVariant="grey">
          <HeaderContent>
            <HeaderLeft>
              <HeaderTitle>
                <Bell size={28} />
                Notifications
              </HeaderTitle>
              <HeaderSubtitle>
                Stay updated with your campaigns, payments, and opportunities
              </HeaderSubtitle>
            </HeaderLeft>
            <HeaderActions>
              <ActionButton
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                <CheckCircle size={16} />
                Mark All Read
              </ActionButton>
            </HeaderActions>
          </HeaderContent>
        </WrapperBox>
      </HeaderSection>

      {/* Notifications List */}
      <NotificationsContainer>
        <WrapperBox themeVariant="grey">
          <NotificationsHeader>
            <NotificationsCount>
              {filteredNotifications.length} notification
              {filteredNotifications.length !== 1 ? "s" : ""}
            </NotificationsCount>
          </NotificationsHeader>

          {filteredNotifications.length === 0 ? (
            <EmptyState>
              <EmptyIcon>
                <Bell size={48} />
              </EmptyIcon>
              <EmptyTitle>No notifications found</EmptyTitle>
            </EmptyState>
          ) : (
            <NotificationsList>
              {filteredNotifications.map((notification) => {
                const colors = getNotificationColor(notification.type);
                return (
                  <NotificationItem
                    key={notification.id}
                    isRead={notification.isRead}
                    priority={notification.priority}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <NotificationIconWrapper style={colors}>
                      {getNotificationIcon(notification.type)}
                    </NotificationIconWrapper>

                    <NotificationContent>
                      <NotificationHeader>
                        <NotificationTitle isRead={notification.isRead}>
                          {notification.title}
                        </NotificationTitle>
                        <NotificationActions>
                          <NotificationTime>
                            {notification.timestamp}
                          </NotificationTime>
                          <ActionMenu>
                            <MoreHorizontal size={16} />
                          </ActionMenu>
                        </NotificationActions>
                      </NotificationHeader>

                      <NotificationDescription>
                        {notification.description}
                      </NotificationDescription>

                      {notification.metadata && (
                        <NotificationMetadata>
                          {notification.metadata.brandName && (
                            <MetadataItem>
                              <Briefcase size={14} />
                              {notification.metadata.brandName}
                            </MetadataItem>
                          )}
                          {notification.metadata.amount && (
                            <MetadataItem>
                              <DollarSign size={14} />
                              {notification.metadata.amount}
                            </MetadataItem>
                          )}
                          {notification.metadata.platform && (
                            <MetadataItem>
                              <Users size={14} />
                              {notification.metadata.platform}
                            </MetadataItem>
                          )}
                          {notification.metadata.engagementCount && (
                            <MetadataItem>
                              <Heart size={14} />
                              {notification.metadata.engagementCount.toLocaleString()}{" "}
                              interactions
                            </MetadataItem>
                          )}
                          {notification.priority === "high" && (
                            <PriorityBadge>
                              <AlertCircle size={12} />
                              High Priority
                            </PriorityBadge>
                          )}
                        </NotificationMetadata>
                      )}
                    </NotificationContent>

                    {!notification.isRead && <UnreadIndicator />}
                  </NotificationItem>
                );
              })}
            </NotificationsList>
          )}
        </WrapperBox>
      </NotificationsContainer>

      {/* Quick Stats */}
      <StatsSection>
        <WrapperBox themeVariant="grey">
          <StatsTitle>Notification Summary</StatsTitle>
          <StatsGrid>
            <StatCard>
              <StatIcon
                style={{ backgroundColor: "#EFF6FF", color: "#2563EB" }}
              >
                <Briefcase size={20} />
              </StatIcon>
              <StatContent>
                <StatValue>
                  {notifications.filter((n) => n.type === "campaign").length}
                </StatValue>
                <StatLabel>Campaign Updates</StatLabel>
              </StatContent>
            </StatCard>

            <StatCard>
              <StatIcon
                style={{ backgroundColor: "#ECFDF5", color: "#059669" }}
              >
                <DollarSign size={20} />
              </StatIcon>
              <StatContent>
                <StatValue>
                  {notifications.filter((n) => n.type === "payment").length}
                </StatValue>
                <StatLabel>Payment Notifications</StatLabel>
              </StatContent>
            </StatCard>

            <StatCard>
              <StatIcon
                style={{ backgroundColor: "#FEF3C7", color: "#D97706" }}
              >
                <Award size={20} />
              </StatIcon>
              <StatContent>
                <StatValue>
                  {notifications.filter((n) => n.type === "achievement").length}
                </StatValue>
                <StatLabel>Achievements</StatLabel>
              </StatContent>
            </StatCard>

            <StatCard>
              <StatIcon
                style={{ backgroundColor: "#FCE7F3", color: "#DB2777" }}
              >
                <Heart size={20} />
              </StatIcon>
              <StatContent>
                <StatValue>
                  {notifications.filter((n) => n.type === "engagement").length}
                </StatValue>
                <StatLabel>Engagement Updates</StatLabel>
              </StatContent>
            </StatCard>
          </StatsGrid>
        </WrapperBox>
      </StatsSection>

      {/* Portfolio Showcase */}
      <PortfolioSection>
        <WrapperBox themeVariant="grey">
          <PortfolioHeader>
            <PortfolioTitle>Creator Portfolio Highlights</PortfolioTitle>
            <PortfolioSubtitle>
              Showcasing your recent achievements and campaign successes
            </PortfolioSubtitle>
          </PortfolioHeader>

          <PortfolioGrid>
            <PortfolioCard>
              <PortfolioCardHeader>
                <Camera size={24} />
                <PortfolioCardTitle>Content Creation</PortfolioCardTitle>
              </PortfolioCardHeader>
              <PortfolioStats>
                <PortfolioStat>
                  <PortfolioStatValue>47</PortfolioStatValue>
                  <PortfolioStatLabel>Posts Created</PortfolioStatLabel>
                </PortfolioStat>
                <PortfolioStat>
                  <PortfolioStatValue>2.8M</PortfolioStatValue>
                  <PortfolioStatLabel>Total Reach</PortfolioStatLabel>
                </PortfolioStat>
              </PortfolioStats>
            </PortfolioCard>

            <PortfolioCard>
              <PortfolioCardHeader>
                <TrendingUp size={24} />
                <PortfolioCardTitle>Performance</PortfolioCardTitle>
              </PortfolioCardHeader>
              <PortfolioStats>
                <PortfolioStat>
                  <PortfolioStatValue>4.8%</PortfolioStatValue>
                  <PortfolioStatLabel>Avg. Engagement</PortfolioStatLabel>
                </PortfolioStat>
                <PortfolioStat>
                  <PortfolioStatValue>95%</PortfolioStatValue>
                  <PortfolioStatLabel>Client Satisfaction</PortfolioStatLabel>
                </PortfolioStat>
              </PortfolioStats>
            </PortfolioCard>

            <PortfolioCard>
              <PortfolioCardHeader>
                <Star size={24} />
                <PortfolioCardTitle>Achievements</PortfolioCardTitle>
              </PortfolioCardHeader>
              <PortfolioStats>
                <PortfolioStat>
                  <PortfolioStatValue>12</PortfolioStatValue>
                  <PortfolioStatLabel>Campaigns Completed</PortfolioStatLabel>
                </PortfolioStat>
                <PortfolioStat>
                  <PortfolioStatValue>₹45K</PortfolioStatValue>
                  <PortfolioStatLabel>Total Earnings</PortfolioStatLabel>
                </PortfolioStat>
              </PortfolioStats>
            </PortfolioCard>
          </PortfolioGrid>
        </WrapperBox>
      </PortfolioSection>
    </PageContainer>
  );
};

export default NotificationsPage;

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 20px;
`;

const HeaderSection = styled.div`
  width: 100%;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const HeaderTitle = styled.h1`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: ${sharedTheme.typography.fontSizes.xxxl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
`;

const HeaderSubtitle = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  color: #6b7280;
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

// Define the ActionButtonProps interface
interface ActionButtonProps {
  primary?: boolean;
  secondary?: boolean;
  danger?: boolean;
}

const ActionButton = styled.button<ActionButtonProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  background-color: ${(props) =>
    props.primary
      ? sharedTheme.colorVariants.primary.dark
      : props.secondary
      ? "#f3f4f6"
      : props.danger
      ? "#fee2e2"
      : "white"};
  color: ${(props) =>
    props.primary
      ? "white"
      : props.danger
      ? "#dc2626"
      : sharedTheme.colorVariants.secondary.dark};
  border: 1px solid
    ${(props) =>
      props.primary
        ? "transparent"
        : props.secondary
        ? "#d1d5db"
        : props.danger
        ? "#fecaca"
        : "#e5e7eb"};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.primary
        ? sharedTheme.colorVariants.primary.darker
        : props.secondary
        ? "#e5e7eb"
        : props.danger
        ? "#fecaca"
        : "#f3f4f6"};
  }
`;

const NotificationsContainer = styled.div`
  width: 100%;
`;

const NotificationsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const NotificationsCount = styled.span`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: #6b7280;
`;

const NotificationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const NotificationItem = styled.div<{ isRead: boolean; priority: string }>`
  display: flex;
  gap: 0rem;
  padding: 0.75rem;
  background-color: ${(props) => (props.isRead ? "#ffffff" : "#f8fafc")};
  border: 1px solid
    ${(props) => (props.priority === "high" ? "#fecaca" : "#e5e7eb")};
  border-left: 4px solid
    ${(props) => {
      if (props.priority === "high") return "#ef4444";
    }};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const NotificationIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
`;

const NotificationContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.5rem;
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

const NotificationTitle = styled.h3<{ isRead: boolean }>`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${(props) =>
    props.isRead
      ? sharedTheme.typography.fontWeights.medium
      : sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
  line-height: 1.4;
`;

const NotificationActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
`;

const NotificationTime = styled.span`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: #9ca3af;
  white-space: nowrap;
`;

const ActionMenu = styled.button`
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const NotificationDescription = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
`;

const NotificationMetadata = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const MetadataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: #6b7280;
  background-color: #e9e9e9;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
`;

const PriorityBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: #dc2626;
  background-color: #fef2f2;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  width: fit-content;
`;

const UnreadIndicator = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 8px;
  height: 8px;
  background-color: #3b82f6;
  border-radius: 50%;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
`;

const EmptyIcon = styled.div`
  color: #d1d5db;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h3`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0 0 0.5rem 0;
`;

const StatsSection = styled.div`
  width: 100%;
`;

const StatsTitle = styled.h2`
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0 0 1rem 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const StatCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

const StatIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  flex-shrink: 0;
`;

const StatContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const StatLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: #6b7280;
`;

const PortfolioSection = styled.div`
  width: 100%;
`;

const PortfolioHeader = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const PortfolioTitle = styled.h2`
  font-size: ${sharedTheme.typography.fontSizes.xxl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0 0 0.5rem 0;
`;

const PortfolioSubtitle = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  color: #6b7280;
  margin: 0;
`;

const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const PortfolioCard = styled.div`
  background: ${sharedTheme.extendedDesignTokens.gradients.lightBlue};
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const PortfolioCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  color: ${sharedTheme.colorVariants.primary.dark};
`;

const PortfolioCardTitle = styled.h3`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  margin: 0;
`;

const PortfolioStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const PortfolioStat = styled.div`
  text-align: center;
`;

const PortfolioStatValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xxl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const PortfolioStatLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: #6b7280;
  margin-top: 0.25rem;
`;
