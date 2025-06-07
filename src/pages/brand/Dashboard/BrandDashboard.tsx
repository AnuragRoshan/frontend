"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { sharedTheme } from "../../../styles/theme/theme";
import {
  //   ArrowLeft,
  Calendar,
  Download,
  Search,
  ChevronDown,
  BarChart2,
  TrendingUp,
  Users,
  DollarSign,
  Eye,
  Target,
  Briefcase,
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Plus,
  MoreHorizontal,
  Share2,
  Bell,
  //   Settings,
  RefreshCw,
  FileText,
  Star,
  MapPin,
  //   Hash,
  //   Play,
  //   Pause,
  Edit,
  //   Trash2,
  //   ExternalLink,
  MessageSquare,
  //   Heart,
  //   ThumbsUp,
  //   Share,
  //   Bookmark,
  Activity,
  //   Zap,
  //   Award,
  //   Globe,
  //   Smartphone,
  //   Monitor,
  //   Tablet,
  //   Instagram,
  //   Youtube,
  //   Twitter,
  //   Facebook,
} from "lucide-react";

// Sample brand dashboard data
const brandData = {
  overview: {
    activeCampaigns: 12,
    activeCampaignsChange: 8.3,
    totalSpent: 2450000,
    totalSpentChange: 15.2,
    totalInfluencers: 89,
    totalInfluencersChange: 12.4,
    totalImpressions: 8750000,
    totalImpressionsChange: 22.8,
    avgEngagementRate: 4.2,
    avgEngagementChange: 0.8,
    conversionRate: 3.8,
    conversionChange: 1.2,
    roi: 420,
    roiChange: 18.5,
    reachGrowth: 35.6,
  },
  campaigns: [
    {
      id: 1,
      name: "Summer Collection Launch",
      status: "running",
      budget: 500000,
      spent: 320000,
      influencers: 15,
      startDate: "2024-05-01",
      endDate: "2024-06-30",
      platform: "Instagram",
      category: "Fashion",
      impressions: 2500000,
      engagement: 4.8,
      conversions: 1250,
      roi: 380,
      progress: 64,
    },
    {
      id: 2,
      name: "Wellness Week Campaign",
      status: "running",
      budget: 300000,
      spent: 180000,
      influencers: 8,
      startDate: "2024-05-15",
      endDate: "2024-06-15",
      platform: "YouTube",
      category: "Health",
      impressions: 1800000,
      engagement: 5.2,
      conversions: 890,
      roi: 420,
      progress: 60,
    },
    {
      id: 3,
      name: "Tech Innovation Showcase",
      status: "running",
      budget: 750000,
      spent: 450000,
      influencers: 12,
      startDate: "2024-04-20",
      endDate: "2024-07-20",
      platform: "TikTok",
      category: "Technology",
      impressions: 3200000,
      engagement: 6.1,
      conversions: 1680,
      roi: 450,
      progress: 60,
    },
    {
      id: 4,
      name: "Sustainable Living Series",
      status: "draft",
      budget: 400000,
      spent: 0,
      influencers: 0,
      startDate: "2024-07-01",
      endDate: "2024-08-31",
      platform: "Instagram",
      category: "Lifestyle",
      impressions: 0,
      engagement: 0,
      conversions: 0,
      roi: 0,
      progress: 0,
    },
    {
      id: 5,
      name: "Holiday Gift Guide",
      status: "ended",
      budget: 600000,
      spent: 580000,
      influencers: 20,
      startDate: "2024-03-01",
      endDate: "2024-04-30",
      platform: "Instagram",
      category: "Lifestyle",
      impressions: 4100000,
      engagement: 4.5,
      conversions: 2100,
      roi: 520,
      progress: 100,
    },
  ],
  topInfluencers: [
    {
      id: 1,
      name: "Priya Sharma",
      username: "@priyacreates",
      avatar:
        "https://img.freepik.com/free-photo/portrait-young-indian-top-manager-t-shirt-tie-crossed-arms-smiling-white-isolated-wall_496169-1513.jpg",
      followers: 125000,
      engagement: 4.8,
      niche: "Fashion",
      campaigns: 3,
      totalEarned: 180000,
      rating: 4.9,
      location: "Mumbai",
    },
    {
      id: 2,
      name: "Arjun Patel",
      username: "@techwitharjun",
      avatar:
        "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
      followers: 89000,
      engagement: 5.2,
      niche: "Technology",
      campaigns: 2,
      totalEarned: 120000,
      rating: 4.7,
      location: "Bangalore",
    },
    {
      id: 3,
      name: "Sneha Gupta",
      username: "@wellnesswithsneha",
      avatar:
        "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg",
      followers: 156000,
      engagement: 5.8,
      niche: "Health & Wellness",
      campaigns: 4,
      totalEarned: 220000,
      rating: 4.8,
      location: "Delhi",
    },
    {
      id: 4,
      name: "Rahul Singh",
      username: "@travelwithrahul",
      avatar:
        "https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg",
      followers: 98000,
      engagement: 4.5,
      niche: "Travel",
      campaigns: 2,
      totalEarned: 95000,
      rating: 4.6,
      location: "Goa",
    },
  ],
  pendingTasks: [
    {
      id: 1,
      type: "approval_pending",
      title: "Content Approval Required",
      description:
        "5 influencers have submitted content for Summer Collection campaign",
      priority: "high",
      dueDate: "2024-05-25",
      campaign: "Summer Collection Launch",
    },
    {
      id: 2,
      type: "payment_due",
      title: "Payment Release Pending",
      description: "₹85,000 payment pending for completed deliverables",
      priority: "high",
      dueDate: "2024-05-24",
      campaign: "Wellness Week Campaign",
    },
    {
      id: 3,
      type: "campaign_ending",
      title: "Campaign Ending Soon",
      description: "Wellness Week Campaign ends in 3 days",
      priority: "medium",
      dueDate: "2024-05-27",
      campaign: "Wellness Week Campaign",
    },
    {
      id: 4,
      type: "influencer_application",
      title: "New Influencer Applications",
      description: "12 new applications for Tech Innovation Showcase",
      priority: "medium",
      dueDate: "2024-05-26",
      campaign: "Tech Innovation Showcase",
    },
    {
      id: 5,
      type: "report_ready",
      title: "Campaign Report Ready",
      description: "Holiday Gift Guide final report is ready for download",
      priority: "low",
      dueDate: "2024-05-23",
      campaign: "Holiday Gift Guide",
    },
  ],
  recentActivity: [
    {
      id: 1,
      type: "campaign_milestone",
      title: "Summer Collection reached 2M impressions",
      timestamp: "2 hours ago",
      campaign: "Summer Collection Launch",
    },
    {
      id: 2,
      type: "influencer_joined",
      title: "Priya Sharma joined Tech Innovation Showcase",
      timestamp: "4 hours ago",
      campaign: "Tech Innovation Showcase",
    },
    {
      id: 3,
      type: "content_approved",
      title: "Content approved for Wellness Week Campaign",
      timestamp: "6 hours ago",
      campaign: "Wellness Week Campaign",
    },
    {
      id: 4,
      type: "payment_completed",
      title: "Payment of ₹45,000 released to Sneha Gupta",
      timestamp: "1 day ago",
      campaign: "Summer Collection Launch",
    },
  ],
  analytics: {
    campaignPerformance: [
      { month: "Jan", campaigns: 8, spent: 1200000, roi: 380 },
      { month: "Feb", campaigns: 10, spent: 1500000, roi: 420 },
      { month: "Mar", campaigns: 12, spent: 1800000, roi: 450 },
      { month: "Apr", campaigns: 15, spent: 2100000, roi: 480 },
      { month: "May", campaigns: 12, spent: 2450000, roi: 420 },
    ],
    platformDistribution: [
      { platform: "Instagram", campaigns: 45, budget: 60 },
      { platform: "YouTube", campaigns: 25, budget: 25 },
      { platform: "TikTok", campaigns: 20, budget: 10 },
      { platform: "Twitter", campaigns: 10, budget: 5 },
    ],
    categoryPerformance: [
      { category: "Fashion", campaigns: 35, engagement: 4.8, roi: 420 },
      { category: "Technology", campaigns: 25, engagement: 5.2, roi: 450 },
      { category: "Health", campaigns: 20, engagement: 5.8, roi: 480 },
      { category: "Travel", campaigns: 15, engagement: 4.5, roi: 380 },
      { category: "Lifestyle", campaigns: 25, engagement: 4.2, roi: 400 },
    ],
  },
};

const BrandDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("last30Days");
  const [showNotifications, setShowNotifications] = useState(false);

  // Helper function to format numbers
  const formatNumber = (num: number): string => {
    if (num >= 10000000) {
      return (num / 10000000).toFixed(1) + "Cr";
    }
    if (num >= 100000) {
      return (num / 100000).toFixed(1) + "L";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  // Helper function to render trend indicators
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

  //   const getStatusColor = (status: string) => {
  //     switch (status) {
  //       case "running":
  //         return "#10b981";
  //       case "draft":
  //         return "#f59e0b";
  //       case "ended":
  //         return "#6b7280";
  //       default:
  //         return "#6b7280";
  //     }
  //   };

  //   const getPriorityColor = (priority: string) => {
  //     switch (priority) {
  //       case "high":
  //         return "#dc2626";
  //       case "medium":
  //         return "#f59e0b";
  //       case "low":
  //         return "#10b981";
  //       default:
  //         return "#6b7280";
  //     }
  //   };

  return (
    <PageContainer>
      <DashboardHeader>
        <HeaderLeft>
          <BrandInfo>
            <BrandLogo>
              <img
                src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg"
                alt="Brand Logo"
              />
            </BrandLogo>
            <BrandDetails>
              <BrandName>StyleHub Fashion</BrandName>
              <BrandTagline>Premium Fashion Brand</BrandTagline>
            </BrandDetails>
          </BrandInfo>
        </HeaderLeft>
        <HeaderRight>
          <DateRangeSelector>
            <Calendar size={16} />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="last7Days">Last 7 Days</option>
              <option value="last30Days">Last 30 Days</option>
              <option value="last90Days">Last 90 Days</option>
              <option value="lastYear">Last Year</option>
            </select>
            <ChevronDown size={14} />
          </DateRangeSelector>
          <ActionButton>
            <RefreshCw size={16} />
            Refresh
          </ActionButton>
          <ActionButton>
            <Download size={16} />
            Export
          </ActionButton>
          <ActionButton>
            <Share2 size={16} />
            Share
          </ActionButton>
          <NotificationButton
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            <NotificationBadge>3</NotificationBadge>
          </NotificationButton>
        </HeaderRight>
      </DashboardHeader>

      <TabsContainer>
        <TabButton
          active={activeTab === "overview"}
          onClick={() => setActiveTab("overview")}
        >
          <BarChart2 size={16} />
          Overview
        </TabButton>
        <TabButton
          active={activeTab === "campaigns"}
          onClick={() => setActiveTab("campaigns")}
        >
          <Briefcase size={16} />
          Campaigns
        </TabButton>
        <TabButton
          active={activeTab === "influencers"}
          onClick={() => setActiveTab("influencers")}
        >
          <Users size={16} />
          Influencers
        </TabButton>
        <TabButton
          active={activeTab === "analytics"}
          onClick={() => setActiveTab("analytics")}
        >
          <TrendingUp size={16} />
          Analytics
        </TabButton>
        <TabButton
          active={activeTab === "tasks"}
          onClick={() => setActiveTab("tasks")}
        >
          <Clock size={16} />
          Tasks
        </TabButton>
      </TabsContainer>

      <DashboardContent>
        {activeTab === "overview" && (
          <OverviewSection>
            {/* Top KPI Cards */}
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
                <MetricValue>{brandData.overview.activeCampaigns}</MetricValue>
                <MetricTrend>
                  {renderTrendIndicator(
                    brandData.overview.activeCampaignsChange
                  )}
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
                <MetricValue>
                  ₹{formatNumber(brandData.overview.totalSpent)}
                </MetricValue>
                <MetricTrend>
                  {renderTrendIndicator(brandData.overview.totalSpentChange)}
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
                <MetricValue>{brandData.overview.totalInfluencers}</MetricValue>
                <MetricTrend>
                  {renderTrendIndicator(
                    brandData.overview.totalInfluencersChange
                  )}
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
                  {formatNumber(brandData.overview.totalImpressions)}
                </MetricValue>
                <MetricTrend>
                  {renderTrendIndicator(
                    brandData.overview.totalImpressionsChange
                  )}
                  <MetricTrendLabel>reach growth</MetricTrendLabel>
                </MetricTrend>
              </MetricCard>
            </MetricsGrid>

            {/* Ongoing Campaigns Overview */}
            <CampaignsOverviewSection>
              <SectionHeader>
                <SectionTitle>Ongoing Campaigns</SectionTitle>
                <ActionButton primary>
                  <Plus size={16} />
                  Create Campaign
                </ActionButton>
              </SectionHeader>
              <CampaignsGrid>
                {brandData.campaigns
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
                            <PlatformBadge platform={campaign.platform}>
                              {campaign.platform}
                            </PlatformBadge>
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
                          <MetricValue2>
                            {campaign.influencers} assigned
                          </MetricValue2>
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
                {brandData.pendingTasks.slice(0, 4).map((task) => (
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
                {brandData.recentActivity.map((activity) => (
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
                ))}
              </ActivityList>
            </RecentActivitySection>
          </OverviewSection>
        )}

        {activeTab === "campaigns" && (
          <CampaignsSection>
            <SectionHeader>
              <SectionTitle>Campaign Management</SectionTitle>
              <HeaderActions>
                <SearchBox>
                  <Search size={16} />
                  <input type="text" placeholder="Search campaigns..." />
                </SearchBox>
                <FilterButton>
                  <Filter size={16} />
                  Filter
                </FilterButton>
                <ActionButton primary>
                  <Plus size={16} />
                  Create Campaign
                </ActionButton>
              </HeaderActions>
            </SectionHeader>

            <CampaignFilters>
              <FilterPill active>All Campaigns</FilterPill>
              <FilterPill>Running</FilterPill>
              <FilterPill>Draft</FilterPill>
              <FilterPill>Ended</FilterPill>
              <FilterPill>Paused</FilterPill>
            </CampaignFilters>

            <CampaignsTable>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Campaign</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell>Budget</TableHeaderCell>
                  <TableHeaderCell>Spent</TableHeaderCell>
                  <TableHeaderCell>Influencers</TableHeaderCell>
                  <TableHeaderCell>Performance</TableHeaderCell>
                  <TableHeaderCell>Actions</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {brandData.campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      <CampaignInfo>
                        <CampaignName>{campaign.name}</CampaignName>
                        <CampaignCategory>{campaign.category}</CampaignCategory>
                      </CampaignInfo>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={campaign.status}>
                        {campaign.status}
                      </StatusBadge>
                    </TableCell>
                    <TableCell>₹{formatNumber(campaign.budget)}</TableCell>
                    <TableCell>
                      <SpentInfo>
                        <SpentAmount>
                          ₹{formatNumber(campaign.spent)}
                        </SpentAmount>
                        <SpentPercentage>
                          {((campaign.spent / campaign.budget) * 100).toFixed(
                            0
                          )}
                          %
                        </SpentPercentage>
                      </SpentInfo>
                    </TableCell>
                    <TableCell>{campaign.influencers}</TableCell>
                    <TableCell>
                      <PerformanceInfo>
                        <PerformanceMetric>
                          {formatNumber(campaign.impressions)} impressions
                        </PerformanceMetric>
                        <PerformanceMetric>
                          {campaign.engagement}% engagement
                        </PerformanceMetric>
                      </PerformanceInfo>
                    </TableCell>
                    <TableCell>
                      <TableActions>
                        <ActionButton small>
                          <Eye size={14} />
                        </ActionButton>
                        <ActionButton small>
                          <Edit size={14} />
                        </ActionButton>
                        <ActionButton small>
                          <MoreHorizontal size={14} />
                        </ActionButton>
                      </TableActions>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </CampaignsTable>
          </CampaignsSection>
        )}

        {activeTab === "influencers" && (
          <InfluencersSection>
            <SectionHeader>
              <SectionTitle>Top Performing Influencers</SectionTitle>
              <HeaderActions>
                <SearchBox>
                  <Search size={16} />
                  <input type="text" placeholder="Search influencers..." />
                </SearchBox>
                <ActionButton>
                  <Users size={16} />
                  Discover New
                </ActionButton>
              </HeaderActions>
            </SectionHeader>

            <InfluencersGrid>
              {brandData.topInfluencers.map((influencer) => (
                <InfluencerCard key={influencer.id}>
                  <InfluencerHeader>
                    <InfluencerAvatar>
                      <img
                        src={influencer.avatar || "/placeholder.svg"}
                        alt={influencer.name}
                      />
                    </InfluencerAvatar>
                    <InfluencerInfo>
                      <InfluencerName>{influencer.name}</InfluencerName>
                      <InfluencerUsername>
                        {influencer.username}
                      </InfluencerUsername>
                      <InfluencerLocation>
                        <MapPin size={12} />
                        {influencer.location}
                      </InfluencerLocation>
                    </InfluencerInfo>
                    <InfluencerRating>
                      <Star size={14} />
                      {influencer.rating}
                    </InfluencerRating>
                  </InfluencerHeader>

                  <InfluencerStats>
                    <StatItem>
                      <StatLabel>Followers</StatLabel>
                      <StatValue>
                        {formatNumber(influencer.followers)}
                      </StatValue>
                    </StatItem>
                    <StatItem>
                      <StatLabel>Engagement</StatLabel>
                      <StatValue>{influencer.engagement}%</StatValue>
                    </StatItem>
                    <StatItem>
                      <StatLabel>Campaigns</StatLabel>
                      <StatValue>{influencer.campaigns}</StatValue>
                    </StatItem>
                  </InfluencerStats>

                  <InfluencerMeta>
                    <NicheBadge>{influencer.niche}</NicheBadge>
                    <EarningsInfo>
                      Total Earned: ₹{formatNumber(influencer.totalEarned)}
                    </EarningsInfo>
                  </InfluencerMeta>

                  <InfluencerActions>
                    <ActionButton small>
                      <MessageSquare size={14} />
                      Message
                    </ActionButton>
                    <ActionButton small primary>
                      <Plus size={14} />
                      Invite
                    </ActionButton>
                  </InfluencerActions>
                </InfluencerCard>
              ))}
            </InfluencersGrid>
          </InfluencersSection>
        )}

        {activeTab === "analytics" && (
          <AnalyticsSection>
            <SectionHeader>
              <SectionTitle>Campaign Analytics</SectionTitle>
              <SectionDescription>
                Detailed performance insights and ROI analysis
              </SectionDescription>
            </SectionHeader>

            <AnalyticsGrid>
              <AnalyticsCard>
                <CardHeader>
                  <CardTitle>Campaign Performance Trend</CardTitle>
                </CardHeader>
                <ChartContainer>
                  <ChartPlaceholder>
                    <BarChart2 size={48} />
                    <span>Campaign performance chart would appear here</span>
                  </ChartPlaceholder>
                </ChartContainer>
              </AnalyticsCard>

              <AnalyticsCard>
                <CardHeader>
                  <CardTitle>Platform Distribution</CardTitle>
                </CardHeader>
                <PlatformStats>
                  {brandData.analytics.platformDistribution.map((platform) => (
                    <PlatformStat key={platform.platform}>
                      <PlatformName>{platform.platform}</PlatformName>
                      <PlatformMetrics>
                        <PlatformMetric>
                          {platform.campaigns} campaigns
                        </PlatformMetric>
                        <PlatformMetric>
                          {platform.budget}% budget
                        </PlatformMetric>
                      </PlatformMetrics>
                    </PlatformStat>
                  ))}
                </PlatformStats>
              </AnalyticsCard>

              <AnalyticsCard>
                <CardHeader>
                  <CardTitle>Category Performance</CardTitle>
                </CardHeader>
                <CategoryStats>
                  {brandData.analytics.categoryPerformance.map((category) => (
                    <CategoryStat key={category.category}>
                      <CategoryName>{category.category}</CategoryName>
                      <CategoryMetrics>
                        <CategoryMetric>
                          {category.campaigns} campaigns
                        </CategoryMetric>
                        <CategoryMetric>
                          {category.engagement}% engagement
                        </CategoryMetric>
                        <CategoryMetric>{category.roi}% ROI</CategoryMetric>
                      </CategoryMetrics>
                    </CategoryStat>
                  ))}
                </CategoryStats>
              </AnalyticsCard>

              <AnalyticsCard fullWidth>
                <CardHeader>
                  <CardTitle>ROI & Engagement Insights</CardTitle>
                </CardHeader>
                <InsightsGrid>
                  <InsightCard>
                    <InsightIcon>
                      <Target size={20} />
                    </InsightIcon>
                    <InsightContent>
                      <InsightTitle>Average ROI</InsightTitle>
                      <InsightValue>{brandData.overview.roi}%</InsightValue>
                      <InsightDescription>
                        18.5% increase from last quarter
                      </InsightDescription>
                    </InsightContent>
                  </InsightCard>

                  <InsightCard>
                    <InsightIcon>
                      <TrendingUp size={20} />
                    </InsightIcon>
                    <InsightContent>
                      <InsightTitle>Engagement Rate</InsightTitle>
                      <InsightValue>
                        {brandData.overview.avgEngagementRate}%
                      </InsightValue>
                      <InsightDescription>
                        Above industry average of 3.2%
                      </InsightDescription>
                    </InsightContent>
                  </InsightCard>

                  <InsightCard>
                    <InsightIcon>
                      <Eye size={20} />
                    </InsightIcon>
                    <InsightContent>
                      <InsightTitle>Conversion Rate</InsightTitle>
                      <InsightValue>
                        {brandData.overview.conversionRate}%
                      </InsightValue>
                      <InsightDescription>
                        1.2% improvement this month
                      </InsightDescription>
                    </InsightContent>
                  </InsightCard>

                  <InsightCard>
                    <InsightIcon>
                      <Users size={20} />
                    </InsightIcon>
                    <InsightContent>
                      <InsightTitle>Reach Growth</InsightTitle>
                      <InsightValue>
                        {brandData.overview.reachGrowth}%
                      </InsightValue>
                      <InsightDescription>
                        Organic reach expansion
                      </InsightDescription>
                    </InsightContent>
                  </InsightCard>
                </InsightsGrid>
              </AnalyticsCard>
            </AnalyticsGrid>
          </AnalyticsSection>
        )}

        {activeTab === "tasks" && (
          <TasksSection>
            <SectionHeader>
              <SectionTitle>Tasks & Notifications</SectionTitle>
              <HeaderActions>
                <FilterButton>
                  <Filter size={16} />
                  Priority
                </FilterButton>
                <ActionButton>
                  <CheckCircle size={16} />
                  Mark All Read
                </ActionButton>
              </HeaderActions>
            </SectionHeader>

            <TasksGrid>
              <TasksColumn>
                <ColumnHeader priority="high">
                  <AlertCircle size={16} />
                  High Priority (
                  {
                    brandData.pendingTasks.filter((t) => t.priority === "high")
                      .length
                  }
                  )
                </ColumnHeader>
                {brandData.pendingTasks
                  .filter((t) => t.priority === "high")
                  .map((task) => (
                    <TaskCard key={task.id} priority={task.priority}>
                      <TaskCardHeader>
                        <TaskTitle>{task.title}</TaskTitle>
                        <TaskDue>{task.dueDate}</TaskDue>
                      </TaskCardHeader>
                      <TaskDescription>{task.description}</TaskDescription>
                      <TaskCampaign>{task.campaign}</TaskCampaign>
                      <TaskCardActions>
                        <ActionButton small primary>
                          Take Action
                        </ActionButton>
                        <ActionButton small>View Details</ActionButton>
                      </TaskCardActions>
                    </TaskCard>
                  ))}
              </TasksColumn>

              <TasksColumn>
                <ColumnHeader priority="medium">
                  <Clock size={16} />
                  Medium Priority (
                  {
                    brandData.pendingTasks.filter(
                      (t) => t.priority === "medium"
                    ).length
                  }
                  )
                </ColumnHeader>
                {brandData.pendingTasks
                  .filter((t) => t.priority === "medium")
                  .map((task) => (
                    <TaskCard key={task.id} priority={task.priority}>
                      <TaskCardHeader>
                        <TaskTitle>{task.title}</TaskTitle>
                        <TaskDue>{task.dueDate}</TaskDue>
                      </TaskCardHeader>
                      <TaskDescription>{task.description}</TaskDescription>
                      <TaskCampaign>{task.campaign}</TaskCampaign>
                      <TaskCardActions>
                        <ActionButton small primary>
                          Take Action
                        </ActionButton>
                        <ActionButton small>View Details</ActionButton>
                      </TaskCardActions>
                    </TaskCard>
                  ))}
              </TasksColumn>

              <TasksColumn>
                <ColumnHeader priority="low">
                  <CheckCircle size={16} />
                  Low Priority (
                  {
                    brandData.pendingTasks.filter((t) => t.priority === "low")
                      .length
                  }
                  )
                </ColumnHeader>
                {brandData.pendingTasks
                  .filter((t) => t.priority === "low")
                  .map((task) => (
                    <TaskCard key={task.id} priority={task.priority}>
                      <TaskCardHeader>
                        <TaskTitle>{task.title}</TaskTitle>
                        <TaskDue>{task.dueDate}</TaskDue>
                      </TaskCardHeader>
                      <TaskDescription>{task.description}</TaskDescription>
                      <TaskCampaign>{task.campaign}</TaskCampaign>
                      <TaskCardActions>
                        <ActionButton small primary>
                          Take Action
                        </ActionButton>
                        <ActionButton small>View Details</ActionButton>
                      </TaskCardActions>
                    </TaskCard>
                  ))}
              </TasksColumn>
            </TasksGrid>
          </TasksSection>
        )}
      </DashboardContent>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9fafb;
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const DashboardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const BrandInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BrandLogo = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BrandDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const BrandName = styled.h1`
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  margin: 0;
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const BrandTagline = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin: 0;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }
`;

const DateRangeSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  position: relative;

  select {
    appearance: none;
    background: transparent;
    border: none;
    font-size: ${sharedTheme.typography.fontSizes.sm};
    color: ${sharedTheme.colorVariants.secondary.dark};
    padding-right: 1.5rem;
    cursor: pointer;
    outline: none;
  }

  svg:last-child {
    position: absolute;
    right: 0.75rem;
    pointer-events: none;
  }
`;

interface ActionButtonProps {
  primary?: boolean;
  small?: boolean;
}

const ActionButton = styled.button<ActionButtonProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: ${(props) => (props.small ? "0.375rem 0.75rem" : "0.5rem 1rem")};
  background-color: ${(props) =>
    props.primary ? sharedTheme.colorVariants.primary.dark : "#f9fafb"};
  border: 1px solid
    ${(props) =>
      props.primary ? sharedTheme.colorVariants.primary.dark : "#e5e7eb"};
  border-radius: 8px;
  font-size: ${(props) =>
    props.small
      ? sharedTheme.typography.fontSizes.xs
      : sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${(props) =>
    props.primary ? "white" : sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.primary ? sharedTheme.colorVariants.primary.light : "#f3f4f6"};
    transform: translateY(-1px);
  }
`;

const NotificationButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  color: ${sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
    transform: translateY(-1px);
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background-color: #dc2626;
  color: white;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  border-radius: 50%;
`;

const TabsContainer = styled.div`
  display: flex;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
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
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${(props) =>
    props.active
      ? sharedTheme.colorVariants.primary.dark
      : sharedTheme.colorVariants.secondary.light};
  background-color: transparent;
  border: none;
  border-bottom: 2px solid
    ${(props) =>
      props.active ? sharedTheme.colorVariants.primary.dark : "transparent"};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: ${sharedTheme.colorVariants.primary.dark};
    background-color: #f9fafb;
  }
`;

const DashboardContent = styled.main`
  flex: 1;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const OverviewSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  margin: 0;
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const SectionDescription = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.md};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin: 0.25rem 0 0 0;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
`;

const MetricCard = styled.div`
  display: flex;
  flex-direction: column;
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

const MetricHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MetricTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const MetricIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: #f3f4f6;
  color: ${sharedTheme.colorVariants.primary.dark};
`;

const MetricValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xxxl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;
const MetricValue2 = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const MetricTrend = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
`;

const TrendPositive = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #10b981;
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
`;

const TrendNegative = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #dc2626;
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
`;

const TrendNeutral = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${sharedTheme.colorVariants.secondary.light};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
`;

const MetricTrendLabel = styled.div`
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const CampaignsOverviewSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CampaignsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const CampaignCard = styled.div`
  display: flex;
  flex-direction: column;
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

const CampaignHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

const CampaignInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const CampaignName = styled.h3`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  margin: 0;
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const CampaignMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = styled.div<StatusBadgeProps>`
  padding: 0.25rem 0.75rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: white;
  border-radius: 6px;
  background-color: ${(props) => getStatusColor(props.status)};
  text-transform: capitalize;
`;

interface PlatformBadgeProps {
  platform: string;
}

const PlatformBadge = styled.div<PlatformBadgeProps>`
  padding: 0.25rem 0.75rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background-color: #f9fafb;
`;

const CampaignActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const CampaignMetrics = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const MetricRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MetricLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
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

const CampaignFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 1px solid #f3f4f6;
`;

const CampaignDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const ViewDetailsButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: ${sharedTheme.colorVariants.primary.dark};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    text-decoration: underline;
  }
`;

const PendingTasksSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ViewAllButton = styled.button`
  background: none;
  border: none;
  color: ${sharedTheme.colorVariants.primary.dark};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    text-decoration: underline;
  }
`;

const TasksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TaskItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
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
  border-radius: 10px;
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
  gap: 0.5rem;
  flex: 1;
`;

const TaskTitle = styled.h4`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  margin: 0;
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const TaskDescription = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin: 0;
`;

const TaskMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.25rem;
`;

const TaskCampaign = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.primary.dark};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
`;

const TaskDue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const TaskActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
`;

const RecentActivitySection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
`;

const ActivityIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #f3f4f6;
  color: ${sharedTheme.colorVariants.primary.dark};
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const ActivityMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ActivityCampaign = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.primary.dark};
`;

const ActivityTime = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

// Campaigns Section
const CampaignsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  min-width: 200px;

  input {
    border: none;
    background: transparent;
    outline: none;
    font-size: ${sharedTheme.typography.fontSizes.sm};
    color: ${sharedTheme.colorVariants.secondary.dark};
    width: 100%;

    &::placeholder {
      color: ${sharedTheme.colorVariants.secondary.light};
    }
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const CampaignFilters = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
`;

interface FilterPillProps {
  active?: boolean;
}

const FilterPill = styled.button<FilterPillProps>`
  padding: 0.5rem 1rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  background-color: ${(props) =>
    props.active ? sharedTheme.colorVariants.primary.dark : "#f9fafb"};
  border: 1px solid
    ${(props) =>
      props.active ? sharedTheme.colorVariants.primary.dark : "#e5e7eb"};
  border-radius: 8px;
  color: ${(props) =>
    props.active ? "white" : sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.active ? sharedTheme.colorVariants.primary.light : "#f3f4f6"};
  }
`;

const CampaignsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.thead`
  background-color: #f9fafb;
`;

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #f3f4f6;
  }

  &:hover {
    background-color: #f9fafb;
  }
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  text-align: left;
`;

const TableBody = styled.tbody``;

const TableCell = styled.td`
  padding: 1rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  vertical-align: top;
`;

const CampaignCategory = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin-top: 0.25rem;
`;

const SpentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const SpentAmount = styled.div`
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
`;

const SpentPercentage = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const PerformanceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const PerformanceMetric = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const TableActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

// Influencers Section
const InfluencersSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InfluencersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
`;

const InfluencerCard = styled.div`
  display: flex;
  flex-direction: column;
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

const InfluencerHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const InfluencerAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InfluencerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
`;

const InfluencerName = styled.h4`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  margin: 0;
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const InfluencerUsername = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const InfluencerLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const InfluencerRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: #f59e0b;
`;

const InfluencerStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const StatValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const InfluencerMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const NicheBadge = styled.div`
  padding: 0.25rem 0.75rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.primary.dark};
  background-color: ${sharedTheme.colorVariants.primary.dark}20;
  border-radius: 6px;
`;

const EarningsInfo = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const InfluencerActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

// Analytics Section
const AnalyticsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const AnalyticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

interface AnalyticsCardProps {
  fullWidth?: boolean;
}

const AnalyticsCard = styled.div<AnalyticsCardProps>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  grid-column: ${(props) => (props.fullWidth ? "1 / -1" : "auto")};
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.h3`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  margin: 0;
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;

const ChartPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: #f9fafb;
  border-radius: 8px;
  color: ${sharedTheme.colorVariants.secondary.light};
  text-align: center;
  gap: 0.75rem;
`;

const PlatformStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PlatformStat = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background-color: #f9fafb;
  border-radius: 8px;
`;

const PlatformName = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const PlatformMetrics = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
`;

const PlatformMetric = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const CategoryStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CategoryStat = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background-color: #f9fafb;
  border-radius: 8px;
`;

const CategoryName = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const CategoryMetrics = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
`;

const CategoryMetric = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const InsightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const InsightCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 8px;
`;

const InsightIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  color: ${sharedTheme.colorVariants.primary.dark};
`;

const InsightContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const InsightTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const InsightValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.primary.dark};
`;

const InsightDescription = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

// Tasks Section
const TasksSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TasksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const TasksColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

interface ColumnHeaderProps {
  priority: string;
}

const ColumnHeader = styled.div<ColumnHeaderProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: ${(props) => {
    const color = getPriorityColor(props.priority);
    return `${color}10`;
  }};
  border: 1px solid
    ${(props) => {
      const color = getPriorityColor(props.priority);
      return `${color}30`;
    }};
  border-radius: 8px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${(props) => getPriorityColor(props.priority)};
`;

interface TaskCardProps {
  priority: string;
}

const TaskCard = styled.div<TaskCardProps>`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-left: 4px solid ${(props) => getPriorityColor(props.priority)};
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

const TaskCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
`;

const TaskCardActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

// Helper function implementations
function getStatusColor(status: string): string {
  switch (status) {
    case "running":
      return "#10b981";
    case "draft":
      return "#f59e0b";
    case "ended":
      return "#6b7280";
    default:
      return "#6b7280";
  }
}

function getPriorityColor(priority: string): string {
  switch (priority) {
    case "high":
      return "#dc2626";
    case "medium":
      return "#f59e0b";
    case "low":
      return "#10b981";
    default:
      return "#6b7280";
  }
}

export default BrandDashboard;
