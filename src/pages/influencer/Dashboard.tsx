"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { sharedTheme } from "../../styles/theme/theme";
import {
  ArrowLeft,
  Calendar,
  Download,
  Search,
  ChevronDown,
  BarChart2,
  TrendingUp,
  Users,
  Percent,
  Globe,
  DollarSign,
  Eye,
  ThumbsUp,
  Heart,
  Share2,
  MessageSquare,
  Clock,
  Zap,
  Award,
  Target,
  PieChart,
  LineChart,
  RefreshCw,
  Bell,
  ChevronRight,
  Info,
  AlertCircle,
  CheckCircle,
  Layers,
  Bookmark,
  ArrowUpRight,
  ArrowDownRight,
  Smartphone,
  Monitor,
  Tablet,
  Hash,
  MapPin,
  Briefcase,
  FileText,
  ImageIcon,
  Video,
  Link,
} from "lucide-react";

// Sample analytics data
const analyticsData = {
  overview: {
    totalFollowers: 78500,
    followerGrowth: 7300,
    followerGrowthPercent: 10.2,
    engagementRate: 3.8,
    engagementChange: 0.3,
    impressions: 1250000,
    impressionsChange: 15.4,
    clicks: 42800,
    clicksChange: 8.7,
    conversionRate: 3.42,
    conversionChange: 0.5,
  },
  followerGrowth: {
    daily: [
      { date: "2024-05-01", value: 71200 },
      { date: "2024-05-02", value: 71450 },
      { date: "2024-05-03", value: 71800 },
      { date: "2024-05-04", value: 72100 },
      { date: "2024-05-05", value: 72400 },
      { date: "2024-05-06", value: 72900 },
      { date: "2024-05-07", value: 73200 },
      { date: "2024-05-08", value: 73600 },
      { date: "2024-05-09", value: 74100 },
      { date: "2024-05-10", value: 74500 },
      { date: "2024-05-11", value: 74800 },
      { date: "2024-05-12", value: 75200 },
      { date: "2024-05-13", value: 75600 },
      { date: "2024-05-14", value: 76100 },
      { date: "2024-05-15", value: 76500 },
      { date: "2024-05-16", value: 76900 },
      { date: "2024-05-17", value: 77200 },
      { date: "2024-05-18", value: 77600 },
      { date: "2024-05-19", value: 78000 },
      { date: "2024-05-20", value: 78500 },
    ],
    monthly: [
      { date: "2023-11", value: 42000 },
      { date: "2023-12", value: 45800 },
      { date: "2024-01", value: 51200 },
      { date: "2024-02", value: 58900 },
      { date: "2024-03", value: 64500 },
      { date: "2024-04", value: 71200 },
      { date: "2024-05", value: 78500 },
    ],
  },
  engagement: {
    daily: [
      { date: "2024-05-01", value: 3.5 },
      { date: "2024-05-02", value: 3.6 },
      { date: "2024-05-03", value: 3.4 },
      { date: "2024-05-04", value: 3.7 },
      { date: "2024-05-05", value: 3.9 },
      { date: "2024-05-06", value: 3.8 },
      { date: "2024-05-07", value: 3.7 },
      { date: "2024-05-08", value: 3.6 },
      { date: "2024-05-09", value: 3.8 },
      { date: "2024-05-10", value: 4.0 },
      { date: "2024-05-11", value: 3.9 },
      { date: "2024-05-12", value: 3.7 },
      { date: "2024-05-13", value: 3.8 },
      { date: "2024-05-14", value: 3.9 },
      { date: "2024-05-15", value: 4.1 },
      { date: "2024-05-16", value: 3.9 },
      { date: "2024-05-17", value: 3.8 },
      { date: "2024-05-18", value: 3.7 },
      { date: "2024-05-19", value: 3.9 },
      { date: "2024-05-20", value: 3.8 },
    ],
    byContentType: [
      { type: "Photos", value: 4.2 },
      { type: "Videos", value: 5.1 },
      { type: "Stories", value: 3.8 },
      { type: "Reels", value: 6.3 },
      { type: "Blog Posts", value: 2.9 },
    ],
    byPlatform: [
      { platform: "Instagram", value: 4.5 },
      { platform: "YouTube", value: 5.2 },
      { platform: "TikTok", value: 6.8 },
      { platform: "Twitter", value: 2.1 },
      { platform: "Blog", value: 1.9 },
    ],
  },
  demographics: {
    ageGroups: [
      { group: "13-17", value: 5 },
      { group: "18-24", value: 35 },
      { group: "25-34", value: 42 },
      { group: "35-44", value: 15 },
      { group: "45+", value: 3 },
    ],
    gender: [
      { gender: "Female", value: 70 },
      { gender: "Male", value: 28 },
      { gender: "Non-binary", value: 2 },
    ],
    locations: [
      { location: "Mumbai", value: 32 },
      { location: "Delhi", value: 18 },
      { location: "Bangalore", value: 15 },
      { location: "Chennai", value: 12 },
      { location: "Other India", value: 18 },
      { location: "International", value: 5 },
    ],
    devices: [
      { device: "Mobile", value: 78 },
      { device: "Desktop", value: 15 },
      { device: "Tablet", value: 7 },
    ],
  },
  contentPerformance: {
    topPosts: [
      {
        id: 1,
        title: "Summer in Santorini",
        type: "image",
        platform: "Instagram",
        date: "2024-05-15",
        thumbnail:
          "https://img.freepik.com/free-photo/full-shot-travel-concept-with-landmarks_23-2149153258.jpg?w=740&t=st=1716064117~exp=1716064717~hmac=f26b2ec80ee68923cbf0c03a8b2c9a9a82dbfba7ef3fd348ef801c1e9d11b829",
        metrics: {
          impressions: 125000,
          engagement: 5.8,
          likes: 18500,
          comments: 432,
          shares: 215,
          saves: 1850,
        },
      },
      {
        id: 2,
        title: "Natural Makeup Tutorial",
        type: "video",
        platform: "YouTube",
        date: "2024-05-10",
        thumbnail:
          "https://img.freepik.com/free-photo/makeup-accessories-arranged-table_23-2148363696.jpg?w=740&t=st=1716064150~exp=1716064750~hmac=db6d5e0ab394be38c3e10b5cf06f15ef9b2ae4a8e00e2fe82de86a08741a67a1",
        metrics: {
          impressions: 98000,
          engagement: 5.2,
          views: 124000,
          likes: 15200,
          comments: 876,
          shares: 320,
          watchTime: "4:25",
        },
      },
      {
        id: 3,
        title: "Zero Waste Challenge",
        type: "image",
        platform: "Instagram",
        date: "2024-05-05",
        thumbnail:
          "https://img.freepik.com/free-photo/flat-lay-colorful-arrangement-plastic-waste_23-2148696411.jpg?w=740&t=st=1716064186~exp=1716064786~hmac=6fef26ce5d1c77c8aabcc071ef89da32d2ed5f70e1c5eb14b0d7cf77ad75b6ed",
        metrics: {
          impressions: 85000,
          engagement: 4.8,
          likes: 12300,
          comments: 528,
          shares: 342,
          saves: 1240,
        },
      },
      {
        id: 4,
        title: "Morning Yoga Routine",
        type: "video",
        platform: "Instagram",
        date: "2024-04-28",
        thumbnail:
          "https://img.freepik.com/free-photo/woman-practicing-yoga-home_23-2148766843.jpg?w=740&t=st=1716064226~exp=1716064826~hmac=80ba5c9f7cd5bcc6bfbe12c9e06e9b057e14e7afcb94d2cf38c94a3a0f8ceac2",
        metrics: {
          impressions: 78000,
          engagement: 4.5,
          views: 98000,
          likes: 8700,
          comments: 412,
          shares: 185,
          watchTime: "3:12",
        },
      },
      {
        id: 5,
        title: "Spring Fashion Essentials",
        type: "image",
        platform: "Instagram",
        date: "2024-04-20",
        thumbnail:
          "https://img.freepik.com/free-photo/fashion-elegance-styled-shot-blue-top-skirt-high-heels-earrings-bracelet-other-accessories_146671-14656.jpg?w=740&t=st=1716064258~exp=1716064858~hmac=c2254478a34ecde45c9a3e9a86e0e11afca76651d29ebc85e7ca7b6b5cb28eaa",
        metrics: {
          impressions: 92000,
          engagement: 4.2,
          likes: 14500,
          comments: 378,
          shares: 189,
          saves: 980,
        },
      },
    ],
    byCategory: [
      { category: "Fashion", value: 4.2, posts: 42 },
      { category: "Travel", value: 5.1, posts: 38 },
      { category: "Lifestyle", value: 3.8, posts: 45 },
      { category: "Beauty", value: 4.5, posts: 30 },
      { category: "Sustainability", value: 4.9, posts: 25 },
    ],
    postingFrequency: [
      { day: "Monday", posts: 12 },
      { day: "Tuesday", posts: 15 },
      { day: "Wednesday", posts: 18 },
      { day: "Thursday", posts: 20 },
      { day: "Friday", posts: 25 },
      { day: "Saturday", posts: 15 },
      { day: "Sunday", posts: 10 },
    ],
    postingTimes: [
      { time: "6-9 AM", engagement: 3.2 },
      { time: "9-12 PM", engagement: 3.8 },
      { time: "12-3 PM", engagement: 4.5 },
      { time: "3-6 PM", engagement: 5.2 },
      { time: "6-9 PM", engagement: 4.8 },
      { time: "9-12 AM", engagement: 3.5 },
    ],
  },
  campaigns: {
    performance: [
      {
        id: 1,
        title: "Summer Collection Launch",
        brand: "StyleHub",
        date: "May 2024",
        metrics: {
          impressions: 125000,
          engagement: 5.2,
          clicks: 3800,
          conversion: 3.8,
          roi: 420,
        },
      },
      {
        id: 2,
        title: "Wellness Retreat Series",
        brand: "ZenLife",
        date: "April 2024",
        metrics: {
          impressions: 98000,
          engagement: 4.8,
          clicks: 2900,
          conversion: 3.2,
          roi: 380,
        },
      },
      {
        id: 3,
        title: "Eco-Friendly Travel Gear",
        brand: "TravelEco",
        date: "March 2024",
        metrics: {
          impressions: 112000,
          engagement: 6.1,
          clicks: 4200,
          conversion: 4.5,
          roi: 520,
        },
      },
      {
        id: 4,
        title: "Clean Beauty Collection",
        brand: "PureGlow",
        date: "February 2024",
        metrics: {
          impressions: 104000,
          engagement: 5.5,
          clicks: 3400,
          conversion: 3.9,
          roi: 450,
        },
      },
    ],
    byPlatform: [
      { platform: "Instagram", campaigns: 28, avgEngagement: 4.8 },
      { platform: "YouTube", campaigns: 12, avgEngagement: 5.2 },
      { platform: "TikTok", campaigns: 8, avgEngagement: 6.5 },
      { platform: "Blog", campaigns: 5, avgEngagement: 2.8 },
    ],
    byCategory: [
      { category: "Fashion", campaigns: 15, avgEngagement: 4.5 },
      { category: "Beauty", campaigns: 12, avgEngagement: 4.8 },
      { category: "Travel", campaigns: 10, avgEngagement: 5.2 },
      { category: "Lifestyle", campaigns: 8, avgEngagement: 4.2 },
      { category: "Sustainability", campaigns: 7, avgEngagement: 5.5 },
    ],
    monthlyRevenue: [
      { month: "Nov 2023", value: 120000 },
      { month: "Dec 2023", value: 150000 },
      { month: "Jan 2024", value: 135000 },
      { month: "Feb 2024", value: 180000 },
      { month: "Mar 2024", value: 210000 },
      { month: "Apr 2024", value: 195000 },
      { month: "May 2024", value: 225000 },
    ],
  },
  audienceInsights: {
    interests: [
      { interest: "Fashion", value: 85 },
      { interest: "Travel", value: 78 },
      { interest: "Beauty", value: 72 },
      { interest: "Fitness", value: 65 },
      { interest: "Food", value: 58 },
      { interest: "Sustainability", value: 52 },
      { interest: "Technology", value: 45 },
      { interest: "Home Decor", value: 42 },
    ],
    activeTimes: [
      { time: "6 AM", value: 15 },
      { time: "9 AM", value: 35 },
      { time: "12 PM", value: 48 },
      { time: "3 PM", value: 65 },
      { time: "6 PM", value: 85 },
      { time: "9 PM", value: 72 },
      { time: "12 AM", value: 28 },
      { time: "3 AM", value: 10 },
    ],
    followersGrowthSource: [
      { source: "Organic Reach", value: 45 },
      { source: "Hashtags", value: 25 },
      { source: "Collaborations", value: 15 },
      { source: "Paid Promotions", value: 10 },
      { source: "Referrals", value: 5 },
    ],
    audienceOverlap: [
      { creator: "FashionForward", value: 35 },
      { creator: "TravelWithMe", value: 28 },
      { creator: "BeautyGuru", value: 22 },
      { creator: "FitnessFreak", value: 18 },
      { creator: "SustainableLiving", value: 15 },
    ],
  },
  benchmarks: {
    engagementRate: {
      user: 3.8,
      industry: 2.5,
      topPerformers: 5.2,
    },
    followerGrowth: {
      user: 10.2,
      industry: 7.5,
      topPerformers: 15.8,
    },
    postFrequency: {
      user: 15,
      industry: 12,
      topPerformers: 18,
    },
    conversionRate: {
      user: 3.42,
      industry: 2.8,
      topPerformers: 4.5,
    },
  },
  recentActivity: [
    {
      id: 1,
      type: "follower_milestone",
      title: "Reached 75,000 followers!",
      date: "2024-05-15",
      description: "Your account has reached 75,000 followers milestone.",
      status: "success",
    },
    {
      id: 2,
      type: "campaign_completed",
      title: "Campaign Completed: StyleHub",
      date: "2024-05-12",
      description:
        "Your campaign with StyleHub has been successfully completed.",
      status: "success",
    },
    {
      id: 3,
      type: "engagement_alert",
      title: "High Engagement Alert",
      date: "2024-05-10",
      description:
        "Your recent post 'Summer in Santorini' is performing 35% above average.",
      status: "info",
    },
    {
      id: 4,
      type: "campaign_started",
      title: "New Campaign Started: EcoTravel",
      date: "2024-05-08",
      description: "Your campaign with EcoTravel has officially started.",
      status: "info",
    },
    {
      id: 5,
      type: "content_reminder",
      title: "Content Schedule Reminder",
      date: "2024-05-05",
      description:
        "You have 3 scheduled posts due this week for the ZenLife campaign.",
      status: "warning",
    },
  ],
  recommendations: [
    {
      id: 1,
      title: "Increase posting frequency on weekends",
      description:
        "Your weekend engagement is high but posting frequency is low. Consider posting more content on Saturdays and Sundays.",
      impact: "high",
      category: "content",
    },
    {
      id: 2,
      title: "Focus more on video content",
      description:
        "Your video content has 28% higher engagement than images. Consider creating more video content.",
      impact: "high",
      category: "content",
    },
    {
      id: 3,
      title: "Optimize posting time",
      description:
        "Your audience is most active between 6-9 PM. Schedule more posts during this time frame.",
      impact: "medium",
      category: "timing",
    },
    {
      id: 4,
      title: "Engage with sustainability topics",
      description:
        "Content related to sustainability has shown 15% higher engagement. Consider creating more content in this category.",
      impact: "medium",
      category: "topics",
    },
    {
      id: 5,
      title: "Collaborate with complementary creators",
      description:
        "Collaborations have driven 20% of your recent follower growth. Consider more partnerships with complementary creators.",
      impact: "high",
      category: "growth",
    },
  ],
};

// Sample user data
const userData = {
  id: "inf123",
  name: "Priya Sharma",
  username: "@priyacreates",
  profilePicture:
    "https://img.freepik.com/free-photo/portrait-young-indian-top-manager-t-shirt-tie-crossed-arms-smiling-white-isolated-wall_496169-1513.jpg?w=740&t=st=1716063772~exp=1716064372~hmac=bdb3ba1fae1e15d9f38f3e71887c8c3df0d46c89a41318169ff2db00c47ea93a",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState("last30Days");
  const [activeTab, setActiveTab] = useState("overview");
  const [showNotifications, setShowNotifications] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  // Helper function to format numbers (e.g., 1500 to 1.5K)
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
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

  return (
    <PageContainer>
      <DashboardHeader>
        <HeaderLeft>
          <BackButton onClick={handleBack}>
            <ArrowLeft size={20} />
            Back to Profile
          </BackButton>
          <DashboardTitle>Analytics Dashboard</DashboardTitle>
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
              <option value="custom">Custom Range</option>
            </select>
            <ChevronDown size={14} />
          </DateRangeSelector>
          <RefreshButton>
            <RefreshCw size={16} />
            Refresh
          </RefreshButton>
          <ExportButton>
            <Download size={16} />
            Export
          </ExportButton>
          <NotificationButton
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            {showNotifications && (
              <NotificationsDropdown>
                <NotificationsHeader>
                  <span>Notifications</span>
                  <MarkAllReadButton>Mark all as read</MarkAllReadButton>
                </NotificationsHeader>
                <NotificationsList>
                  {analyticsData.recentActivity.slice(0, 3).map((activity) => (
                    <NotificationItem key={activity.id}>
                      {activity.status === "success" && (
                        <NotificationIcon status="success">
                          <CheckCircle size={16} />
                        </NotificationIcon>
                      )}
                      {activity.status === "info" && (
                        <NotificationIcon status="info">
                          <Info size={16} />
                        </NotificationIcon>
                      )}
                      {activity.status === "warning" && (
                        <NotificationIcon status="warning">
                          <AlertCircle size={16} />
                        </NotificationIcon>
                      )}
                      <NotificationContent>
                        <NotificationTitle>{activity.title}</NotificationTitle>
                        <NotificationDescription>
                          {activity.description}
                        </NotificationDescription>
                        <NotificationTime>{activity.date}</NotificationTime>
                      </NotificationContent>
                    </NotificationItem>
                  ))}
                </NotificationsList>
                <ViewAllNotifications>
                  View all notifications
                </ViewAllNotifications>
              </NotificationsDropdown>
            )}
          </NotificationButton>
          <UserProfile>
            <UserProfileImage
              src={userData.profilePicture}
              alt={userData.name}
            />
            <UserProfileInfo>
              <UserProfileName>{userData.name}</UserProfileName>
              <UserProfileUsername>{userData.username}</UserProfileUsername>
            </UserProfileInfo>
            <ChevronDown size={14} />
          </UserProfile>
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
          active={activeTab === "audience"}
          onClick={() => setActiveTab("audience")}
        >
          <Users size={16} />
          Audience Insights
        </TabButton>
        <TabButton
          active={activeTab === "content"}
          onClick={() => setActiveTab("content")}
        >
          <Layers size={16} />
          Content Performance
        </TabButton>
        <TabButton
          active={activeTab === "campaigns"}
          onClick={() => setActiveTab("campaigns")}
        >
          <Briefcase size={16} />
          Campaign Analytics
        </TabButton>
        <TabButton
          active={activeTab === "benchmarks"}
          onClick={() => setActiveTab("benchmarks")}
        >
          <Target size={16} />
          Benchmarks
        </TabButton>
        <TabButton
          active={activeTab === "recommendations"}
          onClick={() => setActiveTab("recommendations")}
        >
          <Zap size={16} />
          Recommendations
        </TabButton>
      </TabsContainer>

      <DashboardContent>
        {activeTab === "overview" && (
          <OverviewSection>
            <SectionHeader>
              <SectionTitle>Performance Overview</SectionTitle>
              <SectionDescription>
                Key metrics and trends for your account over the selected time
                period
              </SectionDescription>
            </SectionHeader>

            <MetricsGrid>
              <MetricCard>
                <MetricHeader>
                  <MetricTitle>Total Followers</MetricTitle>
                  <MetricIcon>
                    <Users size={18} />
                  </MetricIcon>
                </MetricHeader>
                <MetricValue>
                  {formatNumber(analyticsData.overview.totalFollowers)}
                </MetricValue>
                <MetricTrend>
                  {renderTrendIndicator(
                    analyticsData.overview.followerGrowthPercent
                  )}
                  <MetricTrendLabel>
                    +{formatNumber(analyticsData.overview.followerGrowth)} new
                    followers
                  </MetricTrendLabel>
                </MetricTrend>
              </MetricCard>

              <MetricCard>
                <MetricHeader>
                  <MetricTitle>Engagement Rate</MetricTitle>
                  <MetricIcon>
                    <Percent size={18} />
                  </MetricIcon>
                </MetricHeader>
                <MetricValue>
                  {analyticsData.overview.engagementRate}%
                </MetricValue>
                <MetricTrend>
                  {renderTrendIndicator(
                    analyticsData.overview.engagementChange
                  )}
                  <MetricTrendLabel>vs. previous period</MetricTrendLabel>
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
                  {formatNumber(analyticsData.overview.impressions)}
                </MetricValue>
                <MetricTrend>
                  {renderTrendIndicator(
                    analyticsData.overview.impressionsChange
                  )}
                  <MetricTrendLabel>vs. previous period</MetricTrendLabel>
                </MetricTrend>
              </MetricCard>

              <MetricCard>
                <MetricHeader>
                  <MetricTitle>Link Clicks</MetricTitle>
                  <MetricIcon>
                    <Link size={18} />
                  </MetricIcon>
                </MetricHeader>
                <MetricValue>
                  {formatNumber(analyticsData.overview.clicks)}
                </MetricValue>
                <MetricTrend>
                  {renderTrendIndicator(analyticsData.overview.clicksChange)}
                  <MetricTrendLabel>vs. previous period</MetricTrendLabel>
                </MetricTrend>
              </MetricCard>
            </MetricsGrid>

            <ChartsGrid>
              <ChartCard fullWidth>
                <ChartHeader>
                  <ChartTitle>
                    <TrendingUp size={18} />
                    Follower Growth
                  </ChartTitle>
                  <ChartActions>
                    <ChartActionButton active>Daily</ChartActionButton>
                    <ChartActionButton>Weekly</ChartActionButton>
                    <ChartActionButton>Monthly</ChartActionButton>
                  </ChartActions>
                </ChartHeader>
                <ChartContainer>
                  <LineChartPlaceholder>
                    <LineChart size={48} />
                    <span>Follower growth chart would appear here</span>
                    <ChartDataPoints>
                      <DataPoint>
                        <DataPointLabel>Starting</DataPointLabel>
                        <DataPointValue>
                          {formatNumber(
                            analyticsData.followerGrowth.daily[0].value
                          )}
                        </DataPointValue>
                      </DataPoint>
                      <DataPoint>
                        <DataPointLabel>Current</DataPointLabel>
                        <DataPointValue>
                          {formatNumber(
                            analyticsData.followerGrowth.daily[
                              analyticsData.followerGrowth.daily.length - 1
                            ].value
                          )}
                        </DataPointValue>
                      </DataPoint>
                      <DataPoint>
                        <DataPointLabel>Growth</DataPointLabel>
                        <DataPointValue>
                          +
                          {formatNumber(
                            analyticsData.followerGrowth.daily[
                              analyticsData.followerGrowth.daily.length - 1
                            ].value -
                              analyticsData.followerGrowth.daily[0].value
                          )}
                        </DataPointValue>
                      </DataPoint>
                    </ChartDataPoints>
                  </LineChartPlaceholder>
                </ChartContainer>
              </ChartCard>

              <ChartCard>
                <ChartHeader>
                  <ChartTitle>
                    <Percent size={18} />
                    Engagement Rate Trend
                  </ChartTitle>
                </ChartHeader>
                <ChartContainer>
                  <LineChartPlaceholder>
                    <LineChart size={36} />
                    <span>Engagement rate chart would appear here</span>
                    <ChartDataPoints>
                      <DataPoint>
                        <DataPointLabel>Average</DataPointLabel>
                        <DataPointValue>
                          {(
                            analyticsData.engagement.daily.reduce(
                              (sum, item) => sum + item.value,
                              0
                            ) / analyticsData.engagement.daily.length
                          ).toFixed(1)}
                          %
                        </DataPointValue>
                      </DataPoint>
                      <DataPoint>
                        <DataPointLabel>Peak</DataPointLabel>
                        <DataPointValue>
                          {Math.max(
                            ...analyticsData.engagement.daily.map(
                              (item) => item.value
                            )
                          ).toFixed(1)}
                          %
                        </DataPointValue>
                      </DataPoint>
                    </ChartDataPoints>
                  </LineChartPlaceholder>
                </ChartContainer>
              </ChartCard>

              <ChartCard>
                <ChartHeader>
                  <ChartTitle>
                    <PieChart size={18} />
                    Content Type Performance
                  </ChartTitle>
                </ChartHeader>
                <ChartContainer>
                  <PieChartPlaceholder>
                    <PieChart size={36} />
                    <span>Content type chart would appear here</span>
                  </PieChartPlaceholder>
                  <ContentTypeList>
                    {analyticsData.engagement.byContentType.map((item) => (
                      <ContentTypeItem key={item.type}>
                        <ContentTypeColor type={item.type} />
                        <ContentTypeName>{item.type}</ContentTypeName>
                        <ContentTypeValue>{item.value}%</ContentTypeValue>
                      </ContentTypeItem>
                    ))}
                  </ContentTypeList>
                </ChartContainer>
              </ChartCard>
            </ChartsGrid>

            <RecentActivitySection>
              <SectionHeader>
                <SectionTitle>Recent Activity</SectionTitle>
                <ViewAllButton>
                  View All
                  <ChevronRight size={14} />
                </ViewAllButton>
              </SectionHeader>
              <ActivityList>
                {analyticsData.recentActivity.map((activity) => (
                  <ActivityItem key={activity.id}>
                    <ActivityIconContainer status={activity.status}>
                      {activity.status === "success" && (
                        <CheckCircle size={18} />
                      )}
                      {activity.status === "info" && <Info size={18} />}
                      {activity.status === "warning" && (
                        <AlertCircle size={18} />
                      )}
                    </ActivityIconContainer>
                    <ActivityContent>
                      <ActivityTitle>{activity.title}</ActivityTitle>
                      <ActivityDescription>
                        {activity.description}
                      </ActivityDescription>
                    </ActivityContent>
                    <ActivityDate>
                      <Calendar size={14} />
                      {activity.date}
                    </ActivityDate>
                  </ActivityItem>
                ))}
              </ActivityList>
            </RecentActivitySection>

            <TopPerformingContent>
              <SectionHeader>
                <SectionTitle>Top Performing Content</SectionTitle>
                <ViewAllButton>
                  View All
                  <ChevronRight size={14} />
                </ViewAllButton>
              </SectionHeader>
              <TopContentGrid>
                {analyticsData.contentPerformance.topPosts
                  .slice(0, 3)
                  .map((post) => (
                    <TopContentCard key={post.id}>
                      <TopContentThumbnail>
                        <img
                          src={post.thumbnail || "/placeholder.svg"}
                          alt={post.title}
                        />
                        {post.type === "video" && (
                          <VideoIndicator>
                            <Video size={24} />
                          </VideoIndicator>
                        )}
                      </TopContentThumbnail>
                      <TopContentInfo>
                        <TopContentHeader>
                          <TopContentTitle>{post.title}</TopContentTitle>
                          <TopContentPlatform>
                            {post.platform}
                          </TopContentPlatform>
                        </TopContentHeader>
                        <TopContentMetrics>
                          <TopContentMetric>
                            <Eye size={14} />
                            {formatNumber(post.metrics.impressions)} impressions
                          </TopContentMetric>
                          <TopContentMetric>
                            <Percent size={14} />
                            {post.metrics.engagement}% engagement
                          </TopContentMetric>
                          {post.type === "video" ? (
                            <TopContentMetric>
                              <Clock size={14} />
                              {post.metrics.watchTime} avg. watch time
                            </TopContentMetric>
                          ) : (
                            <TopContentMetric>
                              <Bookmark size={14} />
                              {formatNumber(post.metrics.saves ?? 0)} saves
                            </TopContentMetric>
                          )}
                        </TopContentMetrics>
                        <TopContentDate>
                          <Calendar size={14} />
                          {post.date}
                        </TopContentDate>
                      </TopContentInfo>
                    </TopContentCard>
                  ))}
              </TopContentGrid>
            </TopPerformingContent>
          </OverviewSection>
        )}

        {activeTab === "audience" && (
          <AudienceSection>
            <SectionHeader>
              <SectionTitle>Audience Insights</SectionTitle>
              <SectionDescription>
                Detailed breakdown of your audience demographics and behavior
              </SectionDescription>
            </SectionHeader>

            <ChartsGrid>
              <ChartCard>
                <ChartHeader>
                  <ChartTitle>
                    <Users size={18} />
                    Age Distribution
                  </ChartTitle>
                </ChartHeader>
                <ChartContainer>
                  <BarChartPlaceholder>
                    <BarChart2 size={36} />
                    <span>Age distribution chart would appear here</span>
                  </BarChartPlaceholder>
                  <DemographicsList>
                    {analyticsData.demographics.ageGroups.map((item) => (
                      <DemographicItem key={item.group}>
                        <DemographicName>{item.group}</DemographicName>
                        <DemographicBar>
                          <DemographicFill width={item.value * 2} />
                        </DemographicBar>
                        <DemographicValue>{item.value}%</DemographicValue>
                      </DemographicItem>
                    ))}
                  </DemographicsList>
                </ChartContainer>
              </ChartCard>

              <ChartCard>
                <ChartHeader>
                  <ChartTitle>
                    <Users size={18} />
                    Gender Distribution
                  </ChartTitle>
                </ChartHeader>
                <ChartContainer>
                  <PieChartPlaceholder>
                    <PieChart size={36} />
                    <span>Gender distribution chart would appear here</span>
                  </PieChartPlaceholder>
                  <GenderList>
                    {analyticsData.demographics.gender.map((item) => (
                      <GenderItem key={item.gender}>
                        <GenderColor gender={item.gender} />
                        <GenderName>{item.gender}</GenderName>
                        <GenderValue>{item.value}%</GenderValue>
                      </GenderItem>
                    ))}
                  </GenderList>
                </ChartContainer>
              </ChartCard>

              <ChartCard>
                <ChartHeader>
                  <ChartTitle>
                    <Globe size={18} />
                    Geographic Distribution
                  </ChartTitle>
                </ChartHeader>
                <ChartContainer>
                  <MapChartPlaceholder>
                    <Globe size={36} />
                    <span>Location map would appear here</span>
                  </MapChartPlaceholder>
                  <LocationsList>
                    {analyticsData.demographics.locations.map((item) => (
                      <LocationItem key={item.location}>
                        <LocationName>
                          <MapPin size={14} />
                          {item.location}
                        </LocationName>
                        <LocationBar>
                          <LocationFill width={item.value * 2} />
                        </LocationBar>
                        <LocationValue>{item.value}%</LocationValue>
                      </LocationItem>
                    ))}
                  </LocationsList>
                </ChartContainer>
              </ChartCard>

              <ChartCard>
                <ChartHeader>
                  <ChartTitle>
                    <Smartphone size={18} />
                    Device Usage
                  </ChartTitle>
                </ChartHeader>
                <ChartContainer>
                  <PieChartPlaceholder>
                    <PieChart size={36} />
                    <span>Device usage chart would appear here</span>
                  </PieChartPlaceholder>
                  <DeviceList>
                    {analyticsData.demographics.devices.map((item) => (
                      <DeviceItem key={item.device}>
                        <DeviceIcon>
                          {item.device === "Mobile" && <Smartphone size={16} />}
                          {item.device === "Desktop" && <Monitor size={16} />}
                          {item.device === "Tablet" && <Tablet size={16} />}
                        </DeviceIcon>
                        <DeviceName>{item.device}</DeviceName>
                        <DeviceValue>{item.value}%</DeviceValue>
                      </DeviceItem>
                    ))}
                  </DeviceList>
                </ChartContainer>
              </ChartCard>

              <ChartCard>
                <ChartHeader>
                  <ChartTitle>
                    <Hash size={18} />
                    Audience Interests
                  </ChartTitle>
                </ChartHeader>
                <ChartContainer>
                  <InterestsList>
                    {analyticsData.audienceInsights.interests.map((item) => (
                      <InterestItem key={item.interest}>
                        <InterestName>{item.interest}</InterestName>
                        <InterestBar>
                          <InterestFill width={(item.value / 100) * 100} />
                        </InterestBar>
                        <InterestValue>{item.value}%</InterestValue>
                      </InterestItem>
                    ))}
                  </InterestsList>
                </ChartContainer>
              </ChartCard>

              <ChartCard>
                <ChartHeader>
                  <ChartTitle>
                    <Clock size={18} />
                    Audience Active Times
                  </ChartTitle>
                </ChartHeader>
                <ChartContainer>
                  <LineChartPlaceholder>
                    <LineChart size={36} />
                    <span>Active times chart would appear here</span>
                  </LineChartPlaceholder>
                  <ActiveTimesPeaks>
                    <ActiveTimesPeak>
                      <ActiveTimesPeakLabel>Peak Activity</ActiveTimesPeakLabel>
                      <ActiveTimesPeakValue>6 PM - 9 PM</ActiveTimesPeakValue>
                    </ActiveTimesPeak>
                    <ActiveTimesPeak>
                      <ActiveTimesPeakLabel>
                        Lowest Activity
                      </ActiveTimesPeakLabel>
                      <ActiveTimesPeakValue>3 AM - 6 AM</ActiveTimesPeakValue>
                    </ActiveTimesPeak>
                  </ActiveTimesPeaks>
                </ChartContainer>
              </ChartCard>

              <ChartCard fullWidth>
                <ChartHeader>
                  <ChartTitle>
                    <TrendingUp size={18} />
                    Follower Growth Sources
                  </ChartTitle>
                </ChartHeader>
                <ChartContainer>
                  <SourcesChartPlaceholder>
                    <PieChart size={48} />
                    <span>Follower sources chart would appear here</span>
                  </SourcesChartPlaceholder>
                  <SourcesList>
                    {analyticsData.audienceInsights.followersGrowthSource.map(
                      (item) => (
                        <SourceItem key={item.source}>
                          <SourceColor source={item.source} />
                          <SourceName>{item.source}</SourceName>
                          <SourceValue>{item.value}%</SourceValue>
                        </SourceItem>
                      )
                    )}
                  </SourcesList>
                </ChartContainer>
              </ChartCard>
            </ChartsGrid>

            <AudienceInsightsSection>
              <SectionHeader>
                <SectionTitle>Audience Behavior Insights</SectionTitle>
              </SectionHeader>
              <InsightsGrid>
                <InsightCard>
                  <InsightIcon>
                    <Clock size={20} />
                  </InsightIcon>
                  <InsightContent>
                    <InsightTitle>Best Time to Post</InsightTitle>
                    <InsightValue>6 PM - 9 PM</InsightValue>
                    <InsightDescription>
                      Your audience is most active during evening hours.
                      Schedule your most important content during this time
                      frame for maximum engagement.
                    </InsightDescription>
                  </InsightContent>
                </InsightCard>

                <InsightCard>
                  <InsightIcon>
                    <Calendar size={20} />
                  </InsightIcon>
                  <InsightContent>
                    <InsightTitle>Best Days to Post</InsightTitle>
                    <InsightValue>Friday, Wednesday</InsightValue>
                    <InsightDescription>
                      Your content receives 25% higher engagement on Fridays and
                      Wednesdays compared to other days of the week.
                    </InsightDescription>
                  </InsightContent>
                </InsightCard>

                <InsightCard>
                  <InsightIcon>
                    <Users size={20} />
                  </InsightIcon>
                  <InsightContent>
                    <InsightTitle>Audience Overlap</InsightTitle>
                    <InsightValue>35% with FashionForward</InsightValue>
                    <InsightDescription>
                      Your audience has significant overlap with similar
                      creators in your niche, indicating strong audience
                      alignment.
                    </InsightDescription>
                  </InsightContent>
                </InsightCard>

                <InsightCard>
                  <InsightIcon>
                    <Globe size={20} />
                  </InsightIcon>
                  <InsightContent>
                    <InsightTitle>International Reach</InsightTitle>
                    <InsightValue>5% of audience</InsightValue>
                    <InsightDescription>
                      While your audience is primarily from India, you're
                      starting to gain traction internationally, especially in
                      Southeast Asia.
                    </InsightDescription>
                  </InsightContent>
                </InsightCard>
              </InsightsGrid>
            </AudienceInsightsSection>
          </AudienceSection>
        )}

        {activeTab === "content" && (
          <ContentSection>
            <SectionHeader>
              <SectionTitle>Content Performance</SectionTitle>
              <SectionDescription>
                Detailed analysis of your content performance across platforms
              </SectionDescription>
            </SectionHeader>

            <ContentFilters>
              <FilterGroup>
                <FilterLabel>Platform:</FilterLabel>
                <FilterPill active>All</FilterPill>
                <FilterPill>Instagram</FilterPill>
                <FilterPill>YouTube</FilterPill>
                <FilterPill>TikTok</FilterPill>
                <FilterPill>Blog</FilterPill>
              </FilterGroup>
              <FilterGroup>
                <FilterLabel>Content Type:</FilterLabel>
                <FilterPill active>All</FilterPill>
                <FilterPill>Photos</FilterPill>
                <FilterPill>Videos</FilterPill>
                <FilterPill>Stories</FilterPill>
                <FilterPill>Reels</FilterPill>
              </FilterGroup>
              <FilterGroup>
                <FilterLabel>Category:</FilterLabel>
                <FilterPill active>All</FilterPill>
                <FilterPill>Fashion</FilterPill>
                <FilterPill>Travel</FilterPill>
                <FilterPill>Lifestyle</FilterPill>
                <FilterPill>Beauty</FilterPill>
              </FilterGroup>
              <SearchFilter>
                <Search size={16} />
                <input type="text" placeholder="Search content..." />
              </SearchFilter>
            </ContentFilters>

            <ChartsGrid>
              <ChartCard>
                <ChartHeader>
                  <ChartTitle>
                    <BarChart2 size={18} />
                    Performance by Content Type
                  </ChartTitle>
                </ChartHeader>
                <ChartContainer>
                  <BarChartPlaceholder>
                    <BarChart2 size={36} />
                    <span>
                      Content type performance chart would appear here
                    </span>
                  </BarChartPlaceholder>
                  <ContentTypePerformance>
                    {analyticsData.engagement.byContentType.map((item) => (
                      <ContentTypePerformanceItem key={item.type}>
                        <ContentTypePerformanceName>
                          {item.type}
                        </ContentTypePerformanceName>
                        <ContentTypePerformanceBar>
                          <ContentTypePerformanceFill width={item.value * 10} />
                        </ContentTypePerformanceBar>
                        <ContentTypePerformanceValue>
                          {item.value}%
                        </ContentTypePerformanceValue>
                      </ContentTypePerformanceItem>
                    ))}
                  </ContentTypePerformance>
                </ChartContainer>
              </ChartCard>

              <ChartCard>
                <ChartHeader>
                  <ChartTitle>
                    <BarChart2 size={18} />
                    Performance by Category
                  </ChartTitle>
                </ChartHeader>
                <ChartContainer>
                  <BarChartPlaceholder>
                    <BarChart2 size={36} />
                    <span>Category performance chart would appear here</span>
                  </BarChartPlaceholder>
                  <CategoryPerformance>
                    {analyticsData.contentPerformance.byCategory.map((item) => (
                      <CategoryPerformanceItem key={item.category}>
                        <CategoryPerformanceName>
                          {item.category}
                        </CategoryPerformanceName>
                        <CategoryPerformanceBar>
                          <CategoryPerformanceFill width={item.value * 10} />
                        </CategoryPerformanceBar>
                        <CategoryPerformanceValue>
                          {item.value}%
                        </CategoryPerformanceValue>
                      </CategoryPerformanceItem>
                    ))}
                  </CategoryPerformance>
                </ChartContainer>
              </ChartCard>

              <ChartCard>
                <ChartHeader>
                  <ChartTitle>
                    <Calendar size={18} />
                    Posting Frequency
                  </ChartTitle>
                </ChartHeader>
                <ChartContainer>
                  <BarChartPlaceholder>
                    <BarChart2 size={36} />
                    <span>Posting frequency chart would appear here</span>
                  </BarChartPlaceholder>
                  <PostingFrequency>
                    {analyticsData.contentPerformance.postingFrequency.map(
                      (item) => (
                        <PostingFrequencyItem key={item.day}>
                          <PostingFrequencyDay>{item.day}</PostingFrequencyDay>
                          <PostingFrequencyBar>
                            <PostingFrequencyFill
                              width={(item.posts / 25) * 100}
                            />
                          </PostingFrequencyBar>
                          <PostingFrequencyValue>
                            {item.posts}
                          </PostingFrequencyValue>
                        </PostingFrequencyItem>
                      )
                    )}
                  </PostingFrequency>
                </ChartContainer>
              </ChartCard>

              <ChartCard>
                <ChartHeader>
                  <ChartTitle>
                    <Clock size={18} />
                    Best Time to Post
                  </ChartTitle>
                </ChartHeader>
                <ChartContainer>
                  <LineChartPlaceholder>
                    <LineChart size={36} />
                    <span>Best time to post chart would appear here</span>
                  </LineChartPlaceholder>
                  <PostingTimes>
                    {analyticsData.contentPerformance.postingTimes.map(
                      (item) => (
                        <PostingTimeItem key={item.time}>
                          <PostingTimeRange>{item.time}</PostingTimeRange>
                          <PostingTimeBar>
                            <PostingTimeFill
                              width={(item.engagement / 6) * 100}
                            />
                          </PostingTimeBar>
                          <PostingTimeValue>
                            {item.engagement}%
                          </PostingTimeValue>
                        </PostingTimeItem>
                      )
                    )}
                  </PostingTimes>
                </ChartContainer>
              </ChartCard>
            </ChartsGrid>

            <TopContentSection>
              <SectionHeader>
                <SectionTitle>Top Performing Content</SectionTitle>
                <ContentViewToggle>
                  <ContentViewButton active>Grid</ContentViewButton>
                  <ContentViewButton>List</ContentViewButton>
                </ContentViewToggle>
              </SectionHeader>
              <TopContentTable>
                <TopContentTableHeader>
                  <TopContentTableHeaderCell width="50px">
                    #
                  </TopContentTableHeaderCell>
                  <TopContentTableHeaderCell width="80px">
                    Type
                  </TopContentTableHeaderCell>
                  <TopContentTableHeaderCell>Content</TopContentTableHeaderCell>
                  <TopContentTableHeaderCell width="100px">
                    Platform
                  </TopContentTableHeaderCell>
                  <TopContentTableHeaderCell width="100px">
                    Date
                  </TopContentTableHeaderCell>
                  <TopContentTableHeaderCell width="120px">
                    Impressions
                  </TopContentTableHeaderCell>
                  <TopContentTableHeaderCell width="120px">
                    Engagement
                  </TopContentTableHeaderCell>
                  <TopContentTableHeaderCell width="100px">
                    Actions
                  </TopContentTableHeaderCell>
                </TopContentTableHeader>
                <TopContentTableBody>
                  {analyticsData.contentPerformance.topPosts.map(
                    (post, index) => (
                      <TopContentTableRow key={post.id}>
                        <TopContentTableCell width="50px">
                          {index + 1}
                        </TopContentTableCell>
                        <TopContentTableCell width="80px">
                          <ContentTypeIcon type={post.type}>
                            {post.type === "image" ? (
                              <ImageIcon size={18} />
                            ) : (
                              <Video size={18} />
                            )}
                          </ContentTypeIcon>
                        </TopContentTableCell>
                        <TopContentTableCell>
                          <ContentPreview>
                            <ContentThumbnail>
                              <img
                                src={post.thumbnail || "/placeholder.svg"}
                                alt={post.title}
                              />
                            </ContentThumbnail>
                            <ContentInfo>
                              <ContentTitle>{post.title}</ContentTitle>
                              <ContentMetrics>
                                {post.type === "image" ? (
                                  <>
                                    <ContentMetric>
                                      <Heart size={12} />
                                      {formatNumber(post.metrics.likes)}
                                    </ContentMetric>
                                    <ContentMetric>
                                      <MessageSquare size={12} />
                                      {formatNumber(post.metrics.comments)}
                                    </ContentMetric>
                                  </>
                                ) : (
                                  <>
                                    <ContentMetric>
                                      <Eye size={12} />
                                      {formatNumber(post.metrics.views || 0)}
                                    </ContentMetric>
                                    <ContentMetric>
                                      <ThumbsUp size={12} />
                                      {formatNumber(post.metrics.likes)}
                                    </ContentMetric>
                                  </>
                                )}
                              </ContentMetrics>
                            </ContentInfo>
                          </ContentPreview>
                        </TopContentTableCell>
                        <TopContentTableCell width="100px">
                          <PlatformBadge platform={post.platform}>
                            {post.platform}
                          </PlatformBadge>
                        </TopContentTableCell>
                        <TopContentTableCell width="100px">
                          {post.date}
                        </TopContentTableCell>
                        <TopContentTableCell width="120px">
                          {formatNumber(post.metrics.impressions)}
                        </TopContentTableCell>
                        <TopContentTableCell width="120px">
                          <EngagementBadge value={post.metrics.engagement}>
                            {post.metrics.engagement}%
                          </EngagementBadge>
                        </TopContentTableCell>
                        <TopContentTableCell width="100px">
                          <ActionButtons>
                            <ActionButton title="View Details">
                              <Eye size={16} />
                            </ActionButton>
                            <ActionButton title="Share Report">
                              <Share2 size={16} />
                            </ActionButton>
                          </ActionButtons>
                        </TopContentTableCell>
                      </TopContentTableRow>
                    )
                  )}
                </TopContentTableBody>
              </TopContentTable>
              <Pagination>
                <PaginationButton disabled>Previous</PaginationButton>
                <PaginationNumbers>
                  <PaginationNumber active>1</PaginationNumber>
                  <PaginationNumber>2</PaginationNumber>
                  <PaginationNumber>3</PaginationNumber>
                  <PaginationEllipsis>...</PaginationEllipsis>
                  <PaginationNumber>10</PaginationNumber>
                </PaginationNumbers>
                <PaginationButton>Next</PaginationButton>
              </Pagination>
            </TopContentSection>

            <ContentInsightsSection>
              <SectionHeader>
                <SectionTitle>Content Insights</SectionTitle>
              </SectionHeader>
              <InsightsGrid>
                <InsightCard>
                  <InsightIcon>
                    <Video size={20} />
                  </InsightIcon>
                  <InsightContent>
                    <InsightTitle>Video Outperforms Images</InsightTitle>
                    <InsightValue>+28% Higher Engagement</InsightValue>
                    <InsightDescription>
                      Your video content consistently outperforms image posts.
                      Consider creating more video content to maximize
                      engagement.
                    </InsightDescription>
                  </InsightContent>
                </InsightCard>

                <InsightCard>
                  <InsightIcon>
                    <Clock size={20} />
                  </InsightIcon>
                  <InsightContent>
                    <InsightTitle>Optimal Post Length</InsightTitle>
                    <InsightValue>60-90 seconds for videos</InsightValue>
                    <InsightDescription>
                      Videos between 60-90 seconds have the highest completion
                      rate and engagement. Aim for this sweet spot for maximum
                      impact.
                    </InsightDescription>
                  </InsightContent>
                </InsightCard>

                <InsightCard>
                  <InsightIcon>
                    <Hash size={20} />
                  </InsightIcon>
                  <InsightContent>
                    <InsightTitle>Top Performing Hashtags</InsightTitle>
                    <InsightValue>
                      #sustainablefashion #traveldiary
                    </InsightValue>
                    <InsightDescription>
                      Posts with these hashtags receive 35% more reach than your
                      average posts. Use them strategically in your content.
                    </InsightDescription>
                  </InsightContent>
                </InsightCard>

                <InsightCard>
                  <InsightIcon>
                    <MessageSquare size={20} />
                  </InsightIcon>
                  <InsightContent>
                    <InsightTitle>Caption Length Impact</InsightTitle>
                    <InsightValue>150-200 words optimal</InsightValue>
                    <InsightDescription>
                      Captions between 150-200 words generate 22% more comments.
                      Include questions to further boost engagement.
                    </InsightDescription>
                  </InsightContent>
                </InsightCard>
              </InsightsGrid>
            </ContentInsightsSection>
          </ContentSection>
        )}

        {activeTab === "campaigns" && (
          <CampaignsSection>
            <SectionHeader>
              <SectionTitle>Campaign Analytics</SectionTitle>
              <SectionDescription>
                Performance metrics for your brand collaborations and campaigns
              </SectionDescription>
            </SectionHeader>

            <MetricsGrid>
              <MetricCard>
                <MetricHeader>
                  <MetricTitle>Total Campaigns</MetricTitle>
                  <MetricIcon>
                    <Briefcase size={18} />
                  </MetricIcon>
                </MetricHeader>
                <MetricValue>47</MetricValue>
                <MetricTrend>
                  {renderTrendIndicator(15)}
                  <MetricTrendLabel>vs. previous period</MetricTrendLabel>
                </MetricTrend>
              </MetricCard>

              <MetricCard>
                <MetricHeader>
                  <MetricTitle>Avg. Engagement</MetricTitle>
                  <MetricIcon>
                    <Percent size={18} />
                  </MetricIcon>
                </MetricHeader>
                <MetricValue>4.8%</MetricValue>
                <MetricTrend>
                  {renderTrendIndicator(0.5)}
                  <MetricTrendLabel>vs. previous period</MetricTrendLabel>
                </MetricTrend>
              </MetricCard>

              <MetricCard>
                <MetricHeader>
                  <MetricTitle>Avg. Conversion</MetricTitle>
                  <MetricIcon>
                    <Target size={18} />
                  </MetricIcon>
                </MetricHeader>
                <MetricValue>3.4%</MetricValue>
                <MetricTrend>
                  {renderTrendIndicator(0.8)}
                  <MetricTrendLabel>vs. previous period</MetricTrendLabel>
                </MetricTrend>
              </MetricCard>

              <MetricCard>
                <MetricHeader>
                  <MetricTitle>Monthly Revenue</MetricTitle>
                  <MetricIcon>
                    <DollarSign size={18} />
                  </MetricIcon>
                </MetricHeader>
                <MetricValue>₹225K</MetricValue>
                <MetricTrend>
                  {renderTrendIndicator(12.5)}
                  <MetricTrendLabel>vs. previous period</MetricTrendLabel>
                </MetricTrend>
              </MetricCard>
            </MetricsGrid>

            <ChartsGrid>
              <ChartCard fullWidth>
                <ChartHeader>
                  <ChartTitle>
                    <DollarSign size={18} />
                    Monthly Revenue Trend
                  </ChartTitle>
                </ChartHeader>
                <ChartContainer>
                  <LineChartPlaceholder>
                    <LineChart size={48} />
                    <span>Monthly revenue chart would appear here</span>
                    <ChartDataPoints>
                      <DataPoint>
                        <DataPointLabel>Average</DataPointLabel>
                        <DataPointValue>
                          ₹
                          {formatNumber(
                            analyticsData.campaigns.monthlyRevenue.reduce(
                              (sum, item) => sum + item.value,
                              0
                            ) / analyticsData.campaigns.monthlyRevenue.length
                          )}
                        </DataPointValue>
                      </DataPoint>
                      <DataPoint>
                        <DataPointLabel>Highest</DataPointLabel>
                        <DataPointValue>
                          ₹
                          {formatNumber(
                            Math.max(
                              ...analyticsData.campaigns.monthlyRevenue.map(
                                (item) => item.value
                              )
                            )
                          )}
                        </DataPointValue>
                      </DataPoint>
                      <DataPoint>
                        <DataPointLabel>Growth</DataPointLabel>
                        <DataPointValue>
                          +
                          {(
                            ((analyticsData.campaigns.monthlyRevenue[
                              analyticsData.campaigns.monthlyRevenue.length - 1
                            ].value -
                              analyticsData.campaigns.monthlyRevenue[0].value) /
                              analyticsData.campaigns.monthlyRevenue[0].value) *
                            100
                          ).toFixed(1)}
                          %
                        </DataPointValue>
                      </DataPoint>
                    </ChartDataPoints>
                  </LineChartPlaceholder>
                </ChartContainer>
              </ChartCard>

              <ChartCard>
                <ChartHeader>
                  <ChartTitle>
                    <BarChart2 size={18} />
                    Campaign Performance by Platform
                  </ChartTitle>
                </ChartHeader>
                <ChartContainer>
                  <BarChartPlaceholder>
                    <BarChart2 size={36} />
                    <span>Platform performance chart would appear here</span>
                  </BarChartPlaceholder>
                  <PlatformPerformance>
                    {analyticsData.campaigns.byPlatform.map((item) => (
                      <PlatformPerformanceItem key={item.platform}>
                        <PlatformPerformanceName>
                          {item.platform}
                        </PlatformPerformanceName>
                        <PlatformPerformanceMetrics>
                          <PlatformPerformanceMetric>
                            <PlatformPerformanceMetricLabel>
                              Campaigns
                            </PlatformPerformanceMetricLabel>
                            <PlatformPerformanceMetricValue>
                              {item.campaigns}
                            </PlatformPerformanceMetricValue>
                          </PlatformPerformanceMetric>
                          <PlatformPerformanceMetric>
                            <PlatformPerformanceMetricLabel>
                              Engagement
                            </PlatformPerformanceMetricLabel>
                            <PlatformPerformanceMetricValue>
                              {item.avgEngagement}%
                            </PlatformPerformanceMetricValue>
                          </PlatformPerformanceMetric>
                        </PlatformPerformanceMetrics>
                      </PlatformPerformanceItem>
                    ))}
                  </PlatformPerformance>
                </ChartContainer>
              </ChartCard>

              <ChartCard>
                <ChartHeader>
                  <ChartTitle>
                    <PieChart size={18} />
                    Campaigns by Category
                  </ChartTitle>
                </ChartHeader>
                <ChartContainer>
                  <PieChartPlaceholder>
                    <PieChart size={36} />
                    <span>Campaign categories chart would appear here</span>
                  </PieChartPlaceholder>
                  <CategoryList>
                    {analyticsData.campaigns.byCategory.map((item) => (
                      <CategoryItem key={item.category}>
                        <CategoryColor category={item.category} />
                        <CategoryInfo>
                          <CategoryName>{item.category}</CategoryName>
                          <CategoryMetrics>
                            <CategoryMetric>
                              {item.campaigns} campaigns
                            </CategoryMetric>
                            <CategoryMetric>
                              {item.avgEngagement}% avg. engagement
                            </CategoryMetric>
                          </CategoryMetrics>
                        </CategoryInfo>
                      </CategoryItem>
                    ))}
                  </CategoryList>
                </ChartContainer>
              </ChartCard>
            </ChartsGrid>

            <CampaignPerformanceSection>
              <SectionHeader>
                <SectionTitle>Campaign Performance</SectionTitle>
              </SectionHeader>
              <CampaignTable>
                <CampaignTableHeader>
                  <CampaignTableHeaderCell>Campaign</CampaignTableHeaderCell>
                  <CampaignTableHeaderCell>Brand</CampaignTableHeaderCell>
                  <CampaignTableHeaderCell>Date</CampaignTableHeaderCell>
                  <CampaignTableHeaderCell>Impressions</CampaignTableHeaderCell>
                  <CampaignTableHeaderCell>Engagement</CampaignTableHeaderCell>
                  <CampaignTableHeaderCell>Clicks</CampaignTableHeaderCell>
                  <CampaignTableHeaderCell>Conversion</CampaignTableHeaderCell>
                  <CampaignTableHeaderCell>ROI</CampaignTableHeaderCell>
                </CampaignTableHeader>
                <CampaignTableBody>
                  {analyticsData.campaigns.performance.map((campaign) => (
                    <CampaignTableRow key={campaign.id}>
                      <CampaignTableCell>{campaign.title}</CampaignTableCell>
                      <CampaignTableCell>{campaign.brand}</CampaignTableCell>
                      <CampaignTableCell>{campaign.date}</CampaignTableCell>
                      <CampaignTableCell>
                        {formatNumber(campaign.metrics.impressions)}
                      </CampaignTableCell>
                      <CampaignTableCell>
                        <EngagementBadge value={campaign.metrics.engagement}>
                          {campaign.metrics.engagement}%
                        </EngagementBadge>
                      </CampaignTableCell>
                      <CampaignTableCell>
                        {formatNumber(campaign.metrics.clicks)}
                      </CampaignTableCell>
                      <CampaignTableCell>
                        {campaign.metrics.conversion}%
                      </CampaignTableCell>
                      <CampaignTableCell>
                        <ROIBadge value={campaign.metrics.roi}>
                          {campaign.metrics.roi}%
                        </ROIBadge>
                      </CampaignTableCell>
                    </CampaignTableRow>
                  ))}
                </CampaignTableBody>
              </CampaignTable>
            </CampaignPerformanceSection>

            <CampaignInsightsSection>
              <SectionHeader>
                <SectionTitle>Campaign Insights</SectionTitle>
              </SectionHeader>
              <InsightsGrid>
                <InsightCard>
                  <InsightIcon>
                    <Target size={20} />
                  </InsightIcon>
                  <InsightContent>
                    <InsightTitle>Top Performing Campaign</InsightTitle>
                    <InsightValue>Eco-Friendly Travel Gear</InsightValue>
                    <InsightDescription>
                      This campaign achieved 6.1% engagement rate, 35% above
                      your average. Sustainability-focused campaigns
                      consistently outperform others.
                    </InsightDescription>
                  </InsightContent>
                </InsightCard>

                <InsightCard>
                  <InsightIcon>
                    <DollarSign size={20} />
                  </InsightIcon>
                  <InsightContent>
                    <InsightTitle>Revenue Growth</InsightTitle>
                    <InsightValue>+87.5% in 6 months</InsightValue>
                    <InsightDescription>
                      Your campaign revenue has grown from ₹120K to ₹225K in the
                      last 6 months, indicating strong brand value growth.
                    </InsightDescription>
                  </InsightContent>
                </InsightCard>

                <InsightCard>
                  <InsightIcon>
                    <TrendingUp size={20} />
                  </InsightIcon>
                  <InsightContent>
                    <InsightTitle>Conversion Rate Trend</InsightTitle>
                    <InsightValue>+0.8% improvement</InsightValue>
                    <InsightDescription>
                      Your campaign conversion rates have improved from 2.6% to
                      3.4% over the last quarter, outperforming industry
                      benchmarks.
                    </InsightDescription>
                  </InsightContent>
                </InsightCard>

                <InsightCard>
                  <InsightIcon>
                    <Award size={20} />
                  </InsightIcon>
                  <InsightContent>
                    <InsightTitle>Brand Retention</InsightTitle>
                    <InsightValue>68% repeat collaborations</InsightValue>
                    <InsightDescription>
                      68% of brands have worked with you on multiple campaigns,
                      indicating strong satisfaction with your content and
                      results.
                    </InsightDescription>
                  </InsightContent>
                </InsightCard>
              </InsightsGrid>
            </CampaignInsightsSection>
          </CampaignsSection>
        )}

        {activeTab === "benchmarks" && (
          <BenchmarksSection>
            <SectionHeader>
              <SectionTitle>Industry Benchmarks</SectionTitle>
              <SectionDescription>
                See how your performance compares to industry standards and top
                creators
              </SectionDescription>
            </SectionHeader>

            <BenchmarkCards>
              <BenchmarkCard>
                <BenchmarkHeader>
                  <BenchmarkTitle>Engagement Rate</BenchmarkTitle>
                  <BenchmarkIcon>
                    <Percent size={18} />
                  </BenchmarkIcon>
                </BenchmarkHeader>
                <BenchmarkValue>
                  {analyticsData.benchmarks.engagementRate.user}%
                </BenchmarkValue>
                <BenchmarkComparison>
                  <BenchmarkBar>
                    <BenchmarkIndicator
                      position={
                        (analyticsData.benchmarks.engagementRate.industry /
                          analyticsData.benchmarks.engagementRate
                            .topPerformers) *
                        100
                      }
                    >
                      <BenchmarkLabel>Industry</BenchmarkLabel>
                      <BenchmarkLabelValue>
                        {analyticsData.benchmarks.engagementRate.industry}%
                      </BenchmarkLabelValue>
                    </BenchmarkIndicator>
                    <BenchmarkIndicator
                      position={
                        (analyticsData.benchmarks.engagementRate.user /
                          analyticsData.benchmarks.engagementRate
                            .topPerformers) *
                        100
                      }
                      active
                    >
                      <BenchmarkLabel>You</BenchmarkLabel>
                      <BenchmarkLabelValue>
                        {analyticsData.benchmarks.engagementRate.user}%
                      </BenchmarkLabelValue>
                    </BenchmarkIndicator>
                    <BenchmarkIndicator position={100}>
                      <BenchmarkLabel>Top</BenchmarkLabel>
                      <BenchmarkLabelValue>
                        {analyticsData.benchmarks.engagementRate.topPerformers}%
                      </BenchmarkLabelValue>
                    </BenchmarkIndicator>
                  </BenchmarkBar>
                </BenchmarkComparison>
                <BenchmarkInsight>
                  <CheckCircle size={16} />
                  Your engagement rate is 52% above industry average
                </BenchmarkInsight>
              </BenchmarkCard>

              <BenchmarkCard>
                <BenchmarkHeader>
                  <BenchmarkTitle>Follower Growth</BenchmarkTitle>
                  <BenchmarkIcon>
                    <TrendingUp size={18} />
                  </BenchmarkIcon>
                </BenchmarkHeader>
                <BenchmarkValue>
                  {analyticsData.benchmarks.followerGrowth.user}%
                </BenchmarkValue>
                <BenchmarkComparison>
                  <BenchmarkBar>
                    <BenchmarkIndicator
                      position={
                        (analyticsData.benchmarks.followerGrowth.industry /
                          analyticsData.benchmarks.followerGrowth
                            .topPerformers) *
                        100
                      }
                    >
                      <BenchmarkLabel>Industry</BenchmarkLabel>
                      <BenchmarkLabelValue>
                        {analyticsData.benchmarks.followerGrowth.industry}%
                      </BenchmarkLabelValue>
                    </BenchmarkIndicator>
                    <BenchmarkIndicator
                      position={
                        (analyticsData.benchmarks.followerGrowth.user /
                          analyticsData.benchmarks.followerGrowth
                            .topPerformers) *
                        100
                      }
                      active
                    >
                      <BenchmarkLabel>You</BenchmarkLabel>
                      <BenchmarkLabelValue>
                        {analyticsData.benchmarks.followerGrowth.user}%
                      </BenchmarkLabelValue>
                    </BenchmarkIndicator>
                    <BenchmarkIndicator position={100}>
                      <BenchmarkLabel>Top</BenchmarkLabel>
                      <BenchmarkLabelValue>
                        {analyticsData.benchmarks.followerGrowth.topPerformers}%
                      </BenchmarkLabelValue>
                    </BenchmarkIndicator>
                  </BenchmarkBar>
                </BenchmarkComparison>
                <BenchmarkInsight>
                  <CheckCircle size={16} />
                  Your follower growth is 36% above industry average
                </BenchmarkInsight>
              </BenchmarkCard>

              <BenchmarkCard>
                <BenchmarkHeader>
                  <BenchmarkTitle>Post Frequency</BenchmarkTitle>
                  <BenchmarkIcon>
                    <Calendar size={18} />
                  </BenchmarkIcon>
                </BenchmarkHeader>
                <BenchmarkValue>
                  {analyticsData.benchmarks.postFrequency.user}/month
                </BenchmarkValue>
                <BenchmarkComparison>
                  <BenchmarkBar>
                    <BenchmarkIndicator
                      position={
                        (analyticsData.benchmarks.postFrequency.industry /
                          analyticsData.benchmarks.postFrequency
                            .topPerformers) *
                        100
                      }
                    >
                      <BenchmarkLabel>Industry</BenchmarkLabel>
                      <BenchmarkLabelValue>
                        {analyticsData.benchmarks.postFrequency.industry}
                      </BenchmarkLabelValue>
                    </BenchmarkIndicator>
                    <BenchmarkIndicator
                      position={
                        (analyticsData.benchmarks.postFrequency.user /
                          analyticsData.benchmarks.postFrequency
                            .topPerformers) *
                        100
                      }
                      active
                    >
                      <BenchmarkLabel>You</BenchmarkLabel>
                      <BenchmarkLabelValue>
                        {analyticsData.benchmarks.postFrequency.user}
                      </BenchmarkLabelValue>
                    </BenchmarkIndicator>
                    <BenchmarkIndicator position={100}>
                      <BenchmarkLabel>Top</BenchmarkLabel>
                      <BenchmarkLabelValue>
                        {analyticsData.benchmarks.postFrequency.topPerformers}
                      </BenchmarkLabelValue>
                    </BenchmarkIndicator>
                  </BenchmarkBar>
                </BenchmarkComparison>
                <BenchmarkInsight>
                  <CheckCircle size={16} />
                  Your posting frequency is 25% above industry average
                </BenchmarkInsight>
              </BenchmarkCard>

              <BenchmarkCard>
                <BenchmarkHeader>
                  <BenchmarkTitle>Conversion Rate</BenchmarkTitle>
                  <BenchmarkIcon>
                    <Target size={18} />
                  </BenchmarkIcon>
                </BenchmarkHeader>
                <BenchmarkValue>
                  {analyticsData.benchmarks.conversionRate.user}%
                </BenchmarkValue>
                <BenchmarkComparison>
                  <BenchmarkBar>
                    <BenchmarkIndicator
                      position={
                        (analyticsData.benchmarks.conversionRate.industry /
                          analyticsData.benchmarks.conversionRate
                            .topPerformers) *
                        100
                      }
                    >
                      <BenchmarkLabel>Industry</BenchmarkLabel>
                      <BenchmarkLabelValue>
                        {analyticsData.benchmarks.conversionRate.industry}%
                      </BenchmarkLabelValue>
                    </BenchmarkIndicator>
                    <BenchmarkIndicator
                      position={
                        (analyticsData.benchmarks.conversionRate.user /
                          analyticsData.benchmarks.conversionRate
                            .topPerformers) *
                        100
                      }
                      active
                    >
                      <BenchmarkLabel>You</BenchmarkLabel>
                      <BenchmarkLabelValue>
                        {analyticsData.benchmarks.conversionRate.user}%
                      </BenchmarkLabelValue>
                    </BenchmarkIndicator>
                    <BenchmarkIndicator position={100}>
                      <BenchmarkLabel>Top</BenchmarkLabel>
                      <BenchmarkLabelValue>
                        {analyticsData.benchmarks.conversionRate.topPerformers}%
                      </BenchmarkLabelValue>
                    </BenchmarkIndicator>
                  </BenchmarkBar>
                </BenchmarkComparison>
                <BenchmarkInsight>
                  <CheckCircle size={16} />
                  Your conversion rate is 22% above industry average
                </BenchmarkInsight>
              </BenchmarkCard>
            </BenchmarkCards>

            <CompetitorAnalysisSection>
              <SectionHeader>
                <SectionTitle>Competitor Analysis</SectionTitle>
                <CompetitorSelector>
                  <span>Compare with:</span>
                  <select defaultValue="similar">
                    <option value="similar">Similar Creators</option>
                    <option value="top">Top Performers</option>
                    <option value="custom">Custom Selection</option>
                  </select>
                  <ChevronDown size={14} />
                </CompetitorSelector>
              </SectionHeader>
              <CompetitorGrid>
                <CompetitorCard>
                  <CompetitorHeader>
                    <CompetitorName>FashionForward</CompetitorName>
                    <CompetitorFollowers>95K followers</CompetitorFollowers>
                  </CompetitorHeader>
                  <CompetitorMetrics>
                    <CompetitorMetric>
                      <CompetitorMetricLabel>Engagement</CompetitorMetricLabel>
                      <CompetitorMetricValue>4.2%</CompetitorMetricValue>
                      <CompetitorComparison negative>
                        -0.4% vs. you
                      </CompetitorComparison>
                    </CompetitorMetric>
                    <CompetitorMetric>
                      <CompetitorMetricLabel>Growth</CompetitorMetricLabel>
                      <CompetitorMetricValue>8.5%</CompetitorMetricValue>
                      <CompetitorComparison negative>
                        -1.7% vs. you
                      </CompetitorComparison>
                    </CompetitorMetric>
                    <CompetitorMetric>
                      <CompetitorMetricLabel>Post Freq.</CompetitorMetricLabel>
                      <CompetitorMetricValue>18/mo</CompetitorMetricValue>
                      <CompetitorComparison>+3 vs. you</CompetitorComparison>
                    </CompetitorMetric>
                  </CompetitorMetrics>
                  <CompetitorOverlap>
                    <CompetitorOverlapLabel>
                      Audience Overlap
                    </CompetitorOverlapLabel>
                    <CompetitorOverlapValue>35%</CompetitorOverlapValue>
                  </CompetitorOverlap>
                </CompetitorCard>

                <CompetitorCard>
                  <CompetitorHeader>
                    <CompetitorName>TravelWithMe</CompetitorName>
                    <CompetitorFollowers>120K followers</CompetitorFollowers>
                  </CompetitorHeader>
                  <CompetitorMetrics>
                    <CompetitorMetric>
                      <CompetitorMetricLabel>Engagement</CompetitorMetricLabel>
                      <CompetitorMetricValue>5.1%</CompetitorMetricValue>
                      <CompetitorComparison>+1.3% vs. you</CompetitorComparison>
                    </CompetitorMetric>
                    <CompetitorMetric>
                      <CompetitorMetricLabel>Growth</CompetitorMetricLabel>
                      <CompetitorMetricValue>12.2%</CompetitorMetricValue>
                      <CompetitorComparison>+2.0% vs. you</CompetitorComparison>
                    </CompetitorMetric>
                    <CompetitorMetric>
                      <CompetitorMetricLabel>Post Freq.</CompetitorMetricLabel>
                      <CompetitorMetricValue>12/mo</CompetitorMetricValue>
                      <CompetitorComparison negative>
                        -3 vs. you
                      </CompetitorComparison>
                    </CompetitorMetric>
                  </CompetitorMetrics>
                  <CompetitorOverlap>
                    <CompetitorOverlapLabel>
                      Audience Overlap
                    </CompetitorOverlapLabel>
                    <CompetitorOverlapValue>28%</CompetitorOverlapValue>
                  </CompetitorOverlap>
                </CompetitorCard>

                <CompetitorCard>
                  <CompetitorHeader>
                    <CompetitorName>BeautyGuru</CompetitorName>
                    <CompetitorFollowers>85K followers</CompetitorFollowers>
                  </CompetitorHeader>
                  <CompetitorMetrics>
                    <CompetitorMetric>
                      <CompetitorMetricLabel>Engagement</CompetitorMetricLabel>
                      <CompetitorMetricValue>3.9%</CompetitorMetricValue>
                      <CompetitorComparison>+0.1% vs. you</CompetitorComparison>
                    </CompetitorMetric>
                    <CompetitorMetric>
                      <CompetitorMetricLabel>Growth</CompetitorMetricLabel>
                      <CompetitorMetricValue>7.8%</CompetitorMetricValue>
                      <CompetitorComparison negative>
                        -2.4% vs. you
                      </CompetitorComparison>
                    </CompetitorMetric>
                    <CompetitorMetric>
                      <CompetitorMetricLabel>Post Freq.</CompetitorMetricLabel>
                      <CompetitorMetricValue>20/mo</CompetitorMetricValue>
                      <CompetitorComparison>+5 vs. you</CompetitorComparison>
                    </CompetitorMetric>
                  </CompetitorMetrics>
                  <CompetitorOverlap>
                    <CompetitorOverlapLabel>
                      Audience Overlap
                    </CompetitorOverlapLabel>
                    <CompetitorOverlapValue>22%</CompetitorOverlapValue>
                  </CompetitorOverlap>
                </CompetitorCard>

                <CompetitorCard>
                  <CompetitorHeader>
                    <CompetitorName>SustainableLiving</CompetitorName>
                    <CompetitorFollowers>65K followers</CompetitorFollowers>
                  </CompetitorHeader>
                  <CompetitorMetrics>
                    <CompetitorMetric>
                      <CompetitorMetricLabel>Engagement</CompetitorMetricLabel>
                      <CompetitorMetricValue>5.5%</CompetitorMetricValue>
                      <CompetitorComparison>+1.7% vs. you</CompetitorComparison>
                    </CompetitorMetric>
                    <CompetitorMetric>
                      <CompetitorMetricLabel>Growth</CompetitorMetricLabel>
                      <CompetitorMetricValue>15.5%</CompetitorMetricValue>
                      <CompetitorComparison>+5.3% vs. you</CompetitorComparison>
                    </CompetitorMetric>
                    <CompetitorMetric>
                      <CompetitorMetricLabel>Post Freq.</CompetitorMetricLabel>
                      <CompetitorMetricValue>10/mo</CompetitorMetricValue>
                      <CompetitorComparison negative>
                        -5 vs. you
                      </CompetitorComparison>
                    </CompetitorMetric>
                  </CompetitorMetrics>
                  <CompetitorOverlap>
                    <CompetitorOverlapLabel>
                      Audience Overlap
                    </CompetitorOverlapLabel>
                    <CompetitorOverlapValue>15%</CompetitorOverlapValue>
                  </CompetitorOverlap>
                </CompetitorCard>
              </CompetitorGrid>
            </CompetitorAnalysisSection>

            <IndustryTrendsSection>
              <SectionHeader>
                <SectionTitle>Industry Trends</SectionTitle>
              </SectionHeader>
              <TrendsGrid>
                <TrendCard>
                  <TrendIcon>
                    <Video size={20} />
                  </TrendIcon>
                  <TrendContent>
                    <TrendTitle>Short-form Video Dominance</TrendTitle>
                    <TrendDescription>
                      Short-form video content (15-60 seconds) is seeing 3.2x
                      higher engagement than static posts across the industry.
                      Your video content is performing well but could be
                      optimized further.
                    </TrendDescription>
                  </TrendContent>
                </TrendCard>

                <TrendCard>
                  <TrendIcon>
                    <Users size={20} />
                  </TrendIcon>
                  <TrendContent>
                    <TrendTitle>Micro-Communities Focus</TrendTitle>
                    <TrendDescription>
                      Creators focusing on building engaged micro-communities
                      are seeing 45% higher conversion rates than those pursuing
                      pure follower growth. Your engagement metrics suggest
                      you're building strong community connections.
                    </TrendDescription>
                  </TrendContent>
                </TrendCard>

                <TrendCard>
                  <TrendIcon>
                    <Globe size={20} />
                  </TrendIcon>
                  <TrendContent>
                    <TrendTitle>Sustainability Content Growth</TrendTitle>
                    <TrendDescription>
                      Sustainability-focused content has seen a 78% increase in
                      engagement over the past year. Your sustainability content
                      is performing above industry benchmarks, suggesting this
                      is a strength area.
                    </TrendDescription>
                  </TrendContent>
                </TrendCard>

                <TrendCard>
                  <TrendIcon>
                    <MessageSquare size={20} />
                  </TrendIcon>
                  <TrendContent>
                    <TrendTitle>Authentic Storytelling</TrendTitle>
                    <TrendDescription>
                      Content featuring personal stories and behind-the-scenes
                      glimpses is generating 2.5x more comments and shares than
                      polished, promotional content. Consider incorporating more
                      authentic storytelling in your content strategy.
                    </TrendDescription>
                  </TrendContent>
                </TrendCard>
              </TrendsGrid>
            </IndustryTrendsSection>
          </BenchmarksSection>
        )}

        {activeTab === "recommendations" && (
          <RecommendationsSection>
            <SectionHeader>
              <SectionTitle>Personalized Recommendations</SectionTitle>
              <SectionDescription>
                AI-powered insights to optimize your content strategy and
                improve performance
              </SectionDescription>
            </SectionHeader>

            <RecommendationsGrid>
              {analyticsData.recommendations.map((recommendation) => (
                <RecommendationCard
                  key={recommendation.id}
                  impact={recommendation.impact}
                >
                  <RecommendationHeader>
                    <RecommendationTitle>
                      {recommendation.title}
                    </RecommendationTitle>
                    <RecommendationImpact impact={recommendation.impact}>
                      {recommendation.impact} impact
                    </RecommendationImpact>
                  </RecommendationHeader>
                  <RecommendationDescription>
                    {recommendation.description}
                  </RecommendationDescription>
                  <RecommendationCategory>
                    <RecommendationCategoryIcon
                      category={recommendation.category}
                    >
                      {recommendation.category === "content" && (
                        <FileText size={14} />
                      )}
                      {recommendation.category === "timing" && (
                        <Clock size={14} />
                      )}
                      {recommendation.category === "topics" && (
                        <Hash size={14} />
                      )}
                      {recommendation.category === "growth" && (
                        <TrendingUp size={14} />
                      )}
                    </RecommendationCategoryIcon>
                    <RecommendationCategoryLabel>
                      {recommendation.category}
                    </RecommendationCategoryLabel>
                  </RecommendationCategory>
                  <RecommendationActions>
                    <RecommendationActionButton primary>
                      Apply
                    </RecommendationActionButton>
                    <RecommendationActionButton>
                      Learn More
                    </RecommendationActionButton>
                  </RecommendationActions>
                </RecommendationCard>
              ))}
            </RecommendationsGrid>

            <OpportunitySection>
              <SectionHeader>
                <SectionTitle>Growth Opportunities</SectionTitle>
              </SectionHeader>
              <OpportunityGrid>
                <OpportunityCard>
                  <OpportunityIcon>
                    <Users size={20} />
                  </OpportunityIcon>
                  <OpportunityContent>
                    <OpportunityTitle>Audience Expansion</OpportunityTitle>
                    <OpportunityDescription>
                      Your content resonates well with the 25-34 age group, but
                      there's potential to expand to the 18-24 demographic.
                      Consider creating more trend-focused content to appeal to
                      younger audiences.
                    </OpportunityDescription>
                    <OpportunityMetric>
                      <OpportunityMetricLabel>
                        Potential Reach
                      </OpportunityMetricLabel>
                      <OpportunityMetricValue>
                        +15K followers
                      </OpportunityMetricValue>
                    </OpportunityMetric>
                  </OpportunityContent>
                </OpportunityCard>

                <OpportunityCard>
                  <OpportunityIcon>
                    <Globe size={20} />
                  </OpportunityIcon>
                  <OpportunityContent>
                    <OpportunityTitle>International Expansion</OpportunityTitle>
                    <OpportunityDescription>
                      Your content is gaining traction internationally. Consider
                      creating content with English subtitles or captions to
                      better serve this growing audience segment.
                    </OpportunityDescription>
                    <OpportunityMetric>
                      <OpportunityMetricLabel>
                        Potential Growth
                      </OpportunityMetricLabel>
                      <OpportunityMetricValue>
                        +8% engagement
                      </OpportunityMetricValue>
                    </OpportunityMetric>
                  </OpportunityContent>
                </OpportunityCard>

                <OpportunityCard>
                  <OpportunityIcon>
                    <Briefcase size={20} />
                  </OpportunityIcon>
                  <OpportunityContent>
                    <OpportunityTitle>Brand Partnership</OpportunityTitle>
                    <OpportunityDescription>
                      Based on your audience demographics and content
                      performance, you're well-positioned for partnerships with
                      premium sustainable fashion brands. Consider proactively
                      reaching out to these brands.
                    </OpportunityDescription>
                    <OpportunityMetric>
                      <OpportunityMetricLabel>
                        Revenue Potential
                      </OpportunityMetricLabel>
                      <OpportunityMetricValue>
                        +₹75K/month
                      </OpportunityMetricValue>
                    </OpportunityMetric>
                  </OpportunityContent>
                </OpportunityCard>

                <OpportunityCard>
                  <OpportunityIcon>
                    <Video size={20} />
                  </OpportunityIcon>
                  <OpportunityContent>
                    <OpportunityTitle>Content Diversification</OpportunityTitle>
                    <OpportunityDescription>
                      Your audience shows high engagement with tutorial and
                      how-to content. Consider creating more educational content
                      series to boost watch time and subscriber loyalty.
                    </OpportunityDescription>
                    <OpportunityMetric>
                      <OpportunityMetricLabel>
                        Engagement Potential
                      </OpportunityMetricLabel>
                      <OpportunityMetricValue>
                        +25% watch time
                      </OpportunityMetricValue>
                    </OpportunityMetric>
                  </OpportunityContent>
                </OpportunityCard>
              </OpportunityGrid>
            </OpportunitySection>

            <ActionPlanSection>
              <SectionHeader>
                <SectionTitle>Recommended Action Plan</SectionTitle>
              </SectionHeader>
              <ActionPlanTimeline>
                <ActionPlanTimelineItem>
                  <ActionPlanTimelinePoint>
                    <ActionPlanTimelineNumber>1</ActionPlanTimelineNumber>
                  </ActionPlanTimelinePoint>
                  <ActionPlanTimelineContent>
                    <ActionPlanTimelineHeader>
                      <ActionPlanTimelineTitle>
                        Optimize Content Schedule
                      </ActionPlanTimelineTitle>
                      <ActionPlanTimelineTag>This Week</ActionPlanTimelineTag>
                    </ActionPlanTimelineHeader>
                    <ActionPlanTimelineDescription>
                      Adjust your posting schedule to publish more content
                      during peak engagement hours (6-9 PM) and increase weekend
                      content.
                    </ActionPlanTimelineDescription>
                    <ActionPlanTimelineAction>
                      Schedule Content
                    </ActionPlanTimelineAction>
                  </ActionPlanTimelineContent>
                </ActionPlanTimelineItem>

                <ActionPlanTimelineItem>
                  <ActionPlanTimelinePoint>
                    <ActionPlanTimelineNumber>2</ActionPlanTimelineNumber>
                  </ActionPlanTimelinePoint>
                  <ActionPlanTimelineContent>
                    <ActionPlanTimelineHeader>
                      <ActionPlanTimelineTitle>
                        Increase Video Content
                      </ActionPlanTimelineTitle>
                      <ActionPlanTimelineTag>
                        Next 2 Weeks
                      </ActionPlanTimelineTag>
                    </ActionPlanTimelineHeader>
                    <ActionPlanTimelineDescription>
                      Create at least 5 new video posts focusing on
                      sustainability topics, which have shown 28% higher
                      engagement than static posts.
                    </ActionPlanTimelineDescription>
                    <ActionPlanTimelineAction>
                      Plan Content
                    </ActionPlanTimelineAction>
                  </ActionPlanTimelineContent>
                </ActionPlanTimelineItem>

                <ActionPlanTimelineItem>
                  <ActionPlanTimelinePoint>
                    <ActionPlanTimelineNumber>3</ActionPlanTimelineNumber>
                  </ActionPlanTimelinePoint>
                  <ActionPlanTimelineContent>
                    <ActionPlanTimelineHeader>
                      <ActionPlanTimelineTitle>
                        Engage Younger Audience
                      </ActionPlanTimelineTitle>
                      <ActionPlanTimelineTag>Next Month</ActionPlanTimelineTag>
                    </ActionPlanTimelineHeader>
                    <ActionPlanTimelineDescription>
                      Create a content series specifically targeting the 18-24
                      demographic, focusing on trending topics and formats
                      popular with this age group.
                    </ActionPlanTimelineDescription>
                    <ActionPlanTimelineAction>
                      Research Trends
                    </ActionPlanTimelineAction>
                  </ActionPlanTimelineContent>
                </ActionPlanTimelineItem>

                <ActionPlanTimelineItem>
                  <ActionPlanTimelinePoint>
                    <ActionPlanTimelineNumber>4</ActionPlanTimelineNumber>
                  </ActionPlanTimelinePoint>
                  <ActionPlanTimelineContent>
                    <ActionPlanTimelineHeader>
                      <ActionPlanTimelineTitle>
                        Strategic Collaborations
                      </ActionPlanTimelineTitle>
                      <ActionPlanTimelineTag>
                        Next Quarter
                      </ActionPlanTimelineTag>
                    </ActionPlanTimelineHeader>
                    <ActionPlanTimelineDescription>
                      Initiate collaborations with 3-5 complementary creators to
                      tap into new audience segments and boost follower growth.
                    </ActionPlanTimelineDescription>
                    <ActionPlanTimelineAction>
                      Find Partners
                    </ActionPlanTimelineAction>
                  </ActionPlanTimelineContent>
                </ActionPlanTimelineItem>
              </ActionPlanTimeline>
            </ActionPlanSection>
          </RecommendationsSection>
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
  padding: 20px;
`;

const DashboardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: ${sharedTheme.colorVariants.secondary.dark};
  font-size: ${sharedTheme.typography.fontSizes.md};
  cursor: pointer;
  padding: 0.5rem 0;

  &:hover {
    color: ${sharedTheme.colorVariants.primary.dark};
  }
`;

const DashboardTitle = styled.h1`
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  margin: 0;

  @media (max-width: 768px) {
    font-size: ${sharedTheme.typography.fontSizes.lg};
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 0.5rem;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const DateRangeSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
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

const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #f3f4f6;
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
  border-radius: 6px;
  color: ${sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const NotificationsDropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 320px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;

  @media (max-width: 768px) {
    width: 280px;
    right: -100px;
  }
`;

const NotificationsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
`;

const MarkAllReadButton = styled.button`
  background: none;
  border: none;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.primary.dark};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const NotificationsList = styled.div`
  max-height: 320px;
  overflow-y: auto;
`;

const NotificationItem = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f9fafb;
  }
`;

interface NotificationIconProps {
  status: string;
}

const NotificationIcon = styled.div<NotificationIconProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
  background-color: ${(props) =>
    props.status === "success"
      ? "#ecfdf5"
      : props.status === "info"
      ? "#eff6ff"
      : "#fff7ed"};
  color: ${(props) =>
    props.status === "success"
      ? "#059669"
      : props.status === "info"
      ? "#3b82f6"
      : "#f59e0b"};
`;

const NotificationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
`;

const NotificationTitle = styled.div`
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  font-size: ${sharedTheme.typography.fontSizes.sm};
`;

const NotificationDescription = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const NotificationTime = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin-top: 0.25rem;
`;

const ViewAllNotifications = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem;
  text-align: center;
  background-color: #f9fafb;
  border: none;
  border-top: 1px solid #e5e7eb;
  color: ${sharedTheme.colorVariants.primary.dark};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  cursor: pointer;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #f9fafb;
  }
`;

const UserProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserProfileInfo = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    display: none;
  }
`;

const UserProfileName = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
`;

const UserProfileUsername = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
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
  }
`;

const DashboardContent = styled.main`
  flex: 1;
  padding: 1.5rem;
`;

// Overview Section Styles
const OverviewSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  margin: 0;
`;

const SectionDescription = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.md};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin: 0.25rem 0 0 0;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
`;

const MetricCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
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
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: #f3f4f6;
  color: ${sharedTheme.colorVariants.primary.dark};
`;

const MetricValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xxl};
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
  color: #059669;
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

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

interface ChartCardProps {
  fullWidth?: boolean;
}

const ChartCard = styled.div<ChartCardProps>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  grid-column: ${(props) => (props.fullWidth ? "1 / -1" : "auto")};
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ChartTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
`;

const ChartActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

interface ChartActionButtonProps {
  active?: boolean;
}

const ChartActionButton = styled.button<ChartActionButtonProps>`
  padding: 0.5rem 0.75rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  background-color: ${(props) => (props.active ? "#f3f4f6" : "transparent")};
  border: 1px solid ${(props) => (props.active ? "#e5e7eb" : "transparent")};
  border-radius: 6px;
  color: ${(props) =>
    props.active
      ? sharedTheme.colorVariants.secondary.dark
      : sharedTheme.colorVariants.secondary.light};
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
    border-color: #e5e7eb;
  }
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;

const LineChartPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 1rem;
  color: ${sharedTheme.colorVariants.secondary.light};
  text-align: center;
  gap: 0.75rem;
`;

const BarChartPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 1rem;
  color: ${sharedTheme.colorVariants.secondary.light};
  text-align: center;
  gap: 0.75rem;
`;

const PieChartPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 1rem;
  color: ${sharedTheme.colorVariants.secondary.light};
  text-align: center;
  gap: 0.75rem;
`;

const MapChartPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 1rem;
  color: ${sharedTheme.colorVariants.secondary.light};
  text-align: center;
  gap: 0.75rem;
`;

const SourcesChartPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 1rem;
  color: ${sharedTheme.colorVariants.secondary.light};
  text-align: center;
  gap: 0.75rem;
`;

const ChartDataPoints = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 1rem;
`;

const DataPoint = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

const DataPointLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const DataPointValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const ContentTypeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

interface ContentTypeColorProps {
  type: string;
}

const ContentTypeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ContentTypeColor = styled.div<ContentTypeColorProps>`
  width: 12px;
  height: 12px;
`;

const ContentTypeName = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
  flex: 1;
`;

const ContentTypeValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const RecentActivitySection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ViewAllButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  color: ${sharedTheme.colorVariants.primary.dark};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ActivityList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ActivityItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
`;

interface ActivityIconContainerProps {
  status: string;
}

const ActivityIconContainer = styled.div<ActivityIconContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.status === "success"
      ? "#ecfdf5"
      : props.status === "info"
      ? "#eff6ff"
      : "#fff7ed"};
  color: ${(props) =>
    props.status === "success"
      ? "#059669"
      : props.status === "info"
      ? "#3b82f6"
      : "#f59e0b"};
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const ActivityDescription = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const ActivityDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
  white-space: nowrap;
`;

const TopPerformingContent = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TopContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const TopContentCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
`;

const TopContentThumbnail = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const VideoIndicator = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
`;

const TopContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
`;

const TopContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
`;

const TopContentTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  flex: 1;
`;

const TopContentPlatform = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
  white-space: nowrap;
`;

const TopContentMetrics = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const TopContentMetric = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  white-space: nowrap;
`;

const TopContentDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
  white-space: nowrap;
`;

// Audience Section Styles
const AudienceSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const DemographicsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const DemographicItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const DemographicName = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
  flex: 1;
`;

const DemographicBar = styled.div`
  flex: 1;
  height: 8px;
  background-color: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
`;

interface DemographicFillProps {
  width: number;
}

const DemographicFill = styled.div<DemographicFillProps>`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: ${sharedTheme.colorVariants.primary.dark};
`;

const DemographicValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  width: 40px;
  text-align: right;
`;

const GenderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const GenderItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

interface GenderColorProps {
  gender: string;
}

const GenderColor = styled.div<GenderColorProps>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.gender === "Female"
      ? "#f472b6"
      : props.gender === "Male"
      ? "#3b82f6"
      : "#a855f7"};
`;

const GenderName = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
  flex: 1;
`;

const GenderValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  width: 40px;
  text-align: right;
`;

const LocationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const LocationItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LocationName = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const LocationBar = styled.div`
  flex: 1;
  height: 8px;
  background-color: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
`;

interface LocationFillProps {
  width: number;
}

const LocationFill = styled.div<LocationFillProps>`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: ${sharedTheme.colorVariants.primary.dark};
`;

const LocationValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  width: 40px;
  text-align: right;
`;

const DeviceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const DeviceItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const DeviceIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const DeviceName = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
  flex: 1;
`;

const DeviceValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  width: 40px;
  text-align: right;
`;

const InterestsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const InterestItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const InterestName = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
  flex: 1;
`;

const InterestBar = styled.div`
  flex: 1;
  height: 8px;
  background-color: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
`;

interface InterestFillProps {
  width: number;
}

const InterestFill = styled.div<InterestFillProps>`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: ${sharedTheme.colorVariants.primary.dark};
`;

const InterestValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  width: 40px;
  text-align: right;
`;

const ActiveTimesPeaks = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
`;

const ActiveTimesPeak = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

const ActiveTimesPeakLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const ActiveTimesPeakValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const SourcesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const SourceItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

interface SourceColorProps {
  source: string;
}

const SourceColor = styled.div<SourceColorProps>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.source === "Organic Reach"
      ? "#f472b6"
      : props.source === "Hashtags"
      ? "#3b82f6"
      : props.source === "Collaborations"
      ? "#a855f7"
      : props.source === "Paid Promotions"
      ? "#f59e0b"
      : "#10b981"};
`;

const SourceName = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
  flex: 1;
`;

const SourceValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  width: 40px;
  text-align: right;
`;

const AudienceInsightsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InsightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const InsightCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.25rem;
  gap: 0.75rem;
`;

const InsightIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f3f4f6;
  color: ${sharedTheme.colorVariants.primary.dark};
`;

const InsightContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const InsightTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const InsightValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const InsightDescription = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

// Content Section Styles
const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ContentFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FilterLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
  white-space: nowrap;
`;

interface FilterPillProps {
  active?: boolean;
}

const FilterPill = styled.button<FilterPillProps>`
  padding: 0.5rem 0.75rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  background-color: ${(props) => (props.active ? "#f3f4f6" : "transparent")};
  border: 1px solid ${(props) => (props.active ? "#e5e7eb" : "transparent")};
  border-radius: 6px;
  color: ${(props) =>
    props.active
      ? sharedTheme.colorVariants.secondary.dark
      : sharedTheme.colorVariants.secondary.light};
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
    border-color: #e5e7eb;
  }
`;

const SearchFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};

  input {
    border: none;
    background: transparent;
    outline: none;
    font-size: inherit;
    color: inherit;
    width: 100%;
  }
`;

const ContentTypePerformance = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const ContentTypePerformanceItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ContentTypePerformanceName = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
  flex: 1;
`;

const ContentTypePerformanceBar = styled.div`
  flex: 1;
  height: 8px;
  background-color: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
`;

interface ContentTypePerformanceFillProps {
  width: number;
}

const ContentTypePerformanceFill = styled.div<ContentTypePerformanceFillProps>`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: ${sharedTheme.colorVariants.primary.dark};
`;

const ContentTypePerformanceValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  width: 40px;
  text-align: right;
`;

const CategoryPerformance = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const CategoryPerformanceItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CategoryPerformanceName = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
  flex: 1;
`;

const CategoryPerformanceBar = styled.div`
  flex: 1;
  height: 8px;
  background-color: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
`;

interface CategoryPerformanceFillProps {
  width: number;
}

const CategoryPerformanceFill = styled.div<CategoryPerformanceFillProps>`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: ${sharedTheme.colorVariants.primary.dark};
`;

const CategoryPerformanceValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  width: 40px;
  text-align: right;
`;

const PostingFrequency = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const PostingFrequencyItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const PostingFrequencyDay = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
  flex: 1;
`;

const PostingFrequencyBar = styled.div`
  flex: 1;
  height: 8px;
  background-color: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
`;

interface PostingFrequencyFillProps {
  width: number;
}

const PostingFrequencyFill = styled.div<PostingFrequencyFillProps>`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: ${sharedTheme.colorVariants.primary.dark};
`;

const PostingFrequencyValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  width: 40px;
  text-align: right;
`;

const PostingTimes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const PostingTimeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const PostingTimeRange = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
  flex: 1;
`;

const PostingTimeBar = styled.div`
  flex: 1;
  height: 8px;
  background-color: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
`;

interface PostingTimeFillProps {
  width: number;
}

const PostingTimeFill = styled.div<PostingTimeFillProps>`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: ${sharedTheme.colorVariants.primary.dark};
`;

const PostingTimeValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  width: 40px;
  text-align: right;
`;

const TopContentSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContentViewToggle = styled.div`
  display: flex;
  gap: 0.5rem;
`;

interface ContentViewButtonProps {
  active?: boolean;
}

const ContentViewButton = styled.button<ContentViewButtonProps>`
  padding: 0.5rem 0.75rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  background-color: ${(props) => (props.active ? "#f3f4f6" : "transparent")};
  border: 1px solid ${(props) => (props.active ? "#e5e7eb" : "transparent")};
  border-radius: 6px;
  color: ${(props) =>
    props.active
      ? sharedTheme.colorVariants.secondary.dark
      : sharedTheme.colorVariants.secondary.light};
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
    border-color: #e5e7eb;
  }
`;

const TopContentTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TopContentTableHeader = styled.thead`
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
`;

const TopContentTableHeaderCell = styled.th<{ width?: string }>`
  padding: 0.75rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  text-align: left;
  width: ${(props) => props.width || "auto"};
`;

const TopContentTableBody = styled.tbody``;

const TopContentTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9fafb;
  }

  &:hover {
    background-color: #f3f4f6;
  }
`;

const TopContentTableCell = styled.td<{ width?: string }>`
  padding: 0.75rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  width: ${(props) => props.width || "auto"};
`;

const ContentPreview = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ContentThumbnail = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 6px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ContentTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const ContentMetrics = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ContentMetric = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

interface PlatformBadgeProps {
  platform: string;
}

const PlatformBadge = styled.div<PlatformBadgeProps>`
  padding: 0.25rem 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: white;
  border-radius: 4px;
  background-color: ${(props) =>
    props.platform === "Instagram"
      ? "#e4405f"
      : props.platform === "YouTube"
      ? "#cd201f"
      : props.platform === "TikTok"
      ? "#00f2ea"
      : "#1da1f2"};
  white-space: nowrap;
`;

interface EngagementBadgeProps {
  value: number;
}

const EngagementBadge = styled.div<EngagementBadgeProps>`
  padding: 0.25rem 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: white;
  border-radius: 4px;
  background-color: ${(props) =>
    props.value > 5 ? "#10b981" : props.value > 3 ? "#f59e0b" : "#dc2626"};
  white-space: nowrap;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #f3f4f6;
  border: none;
  color: ${sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;

  &:hover {
    background-color: #e5e7eb;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const PaginationButton = styled.button<{ disabled?: boolean }>`
  padding: 0.5rem 0.75rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  color: ${sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;
  white-space: nowrap;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  &:hover {
    background-color: #f3f4f6;
  }
`;

const PaginationNumbers = styled.div`
  display: flex;
  gap: 0.25rem;
`;

interface PaginationNumberProps {
  active?: boolean;
}

const PaginationNumber = styled.button<PaginationNumberProps>`
  padding: 0.5rem 0.75rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  background-color: ${(props) => (props.active ? "#e5e7eb" : "transparent")};
  border: none;
  border-radius: 6px;
  color: ${sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const PaginationEllipsis = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const ContentInsightsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

interface ContentTypeIconProps {
  type: string;
}

const ContentTypeIcon = styled.div<ContentTypeIconProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

// Campaigns Section Styles
const CampaignsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PlatformPerformance = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const PlatformPerformanceItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const PlatformPerformanceName = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
  flex: 1;
`;

const PlatformPerformanceMetrics = styled.div`
  display: flex;
  gap: 1rem;
`;

const PlatformPerformanceMetric = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PlatformPerformanceMetricLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const PlatformPerformanceMetricValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

interface CategoryColorProps {
  category: string;
}

const CategoryColor = styled.div<CategoryColorProps>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.category === "Fashion"
      ? "#f472b6"
      : props.category === "Beauty"
      ? "#3b82f6"
      : props.category === "Travel"
      ? "#a855f7"
      : props.category === "Lifestyle"
      ? "#f59e0b"
      : "#10b981"};
`;

const CategoryInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
`;

const CategoryName = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const CategoryMetrics = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CategoryMetric = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const CampaignPerformanceSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CampaignTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const CampaignTableHeader = styled.thead`
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
`;

const CampaignTableHeaderCell = styled.th`
  padding: 0.75rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  text-align: left;
`;

const CampaignTableBody = styled.tbody``;

const CampaignTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9fafb;
  }

  &:hover {
    background-color: #f3f4f6;
  }
`;

const CampaignTableCell = styled.td`
  padding: 0.75rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

interface ROIBadgeProps {
  value: number;
}

const ROIBadge = styled.div<ROIBadgeProps>`
  padding: 0.25rem 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: white;
  border-radius: 4px;
  background-color: ${(props) =>
    props.value > 500 ? "#10b981" : props.value > 400 ? "#f59e0b" : "#dc2626"};
  white-space: nowrap;
`;

const CampaignInsightsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// Benchmarks Section Styles
const BenchmarksSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const BenchmarkCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const BenchmarkCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.25rem;
  gap: 0.75rem;
`;

const BenchmarkHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BenchmarkTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const BenchmarkIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: #f3f4f6;
  color: ${sharedTheme.colorVariants.primary.dark};
`;

const BenchmarkValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const BenchmarkComparison = styled.div`
  margin-top: 0.5rem;
`;

const BenchmarkBar = styled.div`
  position: relative;
  height: 12px;
  background-color: #f3f4f6;
  border-radius: 6px;
  overflow: hidden;
`;

interface BenchmarkIndicatorProps {
  position: number;
  active?: boolean;
}

const BenchmarkIndicator = styled.div<BenchmarkIndicatorProps>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${(props) => props.position}%;
  background-color: ${(props) =>
    props.active ? sharedTheme.colorVariants.primary.dark : "#a1a1aa"};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.5rem;
`;

const BenchmarkLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: white;
  font-weight: ${sharedTheme.typography.fontWeights.medium};
`;

const BenchmarkLabelValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: white;
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  margin-left: 0.25rem;
`;

const BenchmarkInsight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin-top: 0.5rem;
`;

const CompetitorAnalysisSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CompetitorSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};

  select {
    appearance: none;
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    padding: 0.25rem 0.5rem;
    font-size: inherit;
    color: inherit;
    cursor: pointer;
    outline: none;
  }
`;

const CompetitorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const CompetitorCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.25rem;
  gap: 0.75rem;
`;

const CompetitorHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const CompetitorName = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const CompetitorFollowers = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const CompetitorMetrics = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CompetitorMetric = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CompetitorMetricLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const CompetitorMetricValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

interface CompetitorComparisonProps {
  negative?: boolean;
}

const CompetitorComparison = styled.div<CompetitorComparisonProps>`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${(props) =>
    props.negative ? "#dc2626" : sharedTheme.colorVariants.secondary.light};
`;

const CompetitorOverlap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CompetitorOverlapLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const CompetitorOverlapValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const IndustryTrendsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TrendsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const TrendCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.25rem;
  gap: 0.75rem;
`;

const TrendIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f3f4f6;
  color: ${sharedTheme.colorVariants.primary.dark};
`;

const TrendContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const TrendTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const TrendDescription = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

// Recommendations Section Styles
const RecommendationsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const RecommendationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

interface RecommendationCardProps {
  impact: string;
}

const RecommendationCard = styled.div<RecommendationCardProps>`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.25rem;
  gap: 0.75rem;
  border-left: 4px solid
    ${(props) =>
      props.impact === "high"
        ? "#dc2626"
        : props.impact === "medium"
        ? "#f59e0b"
        : "#10b981"};
`;

const RecommendationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
`;

const RecommendationTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  flex: 1;
`;

interface RecommendationImpactProps {
  impact: string;
}

const RecommendationImpact = styled.div<RecommendationImpactProps>`
  padding: 0.25rem 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: white;
  border-radius: 4px;
  background-color: ${(props) =>
    props.impact === "high"
      ? "#dc2626"
      : props.impact === "medium"
      ? "#f59e0b"
      : "#10b981"};
  white-space: nowrap;
`;

const RecommendationDescription = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const RecommendationCategory = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

interface RecommendationCategoryIconProps {
  category: string;
}

const RecommendationCategoryIcon = styled.div<RecommendationCategoryIconProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #f3f4f6;
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const RecommendationCategoryLabel = styled.div`
  font-weight: ${sharedTheme.typography.fontWeights.medium};
`;

const RecommendationActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

interface RecommendationActionButtonProps {
  primary?: boolean;
}

const RecommendationActionButton = styled.button<RecommendationActionButtonProps>`
  padding: 0.5rem 0.75rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  background-color: ${(props) =>
    props.primary ? sharedTheme.colorVariants.primary.dark : "#f9fafb"};
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  color: ${(props) =>
    props.primary ? "white" : sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.primary ? sharedTheme.colorVariants.primary.light : "#f3f4f6"};
  }
`;

const OpportunitySection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OpportunityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const OpportunityCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.25rem;
  gap: 0.75rem;
`;

const OpportunityIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f3f4f6;
  color: ${sharedTheme.colorVariants.primary.dark};
`;

const OpportunityContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const OpportunityTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const OpportunityDescription = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const OpportunityMetric = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid #e5e7eb;
`;

const OpportunityMetricLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const OpportunityMetricValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.primary.dark};
`;

const ActionPlanSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActionPlanTimeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 18px;
    width: 2px;
    background-color: #e5e7eb;
  }
`;

const ActionPlanTimelineItem = styled.div`
  display: flex;
  gap: 1.5rem;
  position: relative;
`;

const ActionPlanTimelinePoint = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: white;
`;
const ActionPlanTimelineNumber = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.primary.dark};
`;

const ActionPlanTimelineContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.25rem;
  flex: 1;
`;

const ActionPlanTimelineHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
`;

const ActionPlanTimelineTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const ActionPlanTimelineTag = styled.div`
  padding: 0.25rem 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: white;
  border-radius: 4px;
  background-color: ${sharedTheme.colorVariants.primary.dark};
  white-space: nowrap;
`;

const ActionPlanTimelineDescription = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const ActionPlanTimelineAction = styled.button`
  align-self: flex-start;
  padding: 0.5rem 0.75rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  color: ${sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;
  margin-top: 0.5rem;

  &:hover {
    background-color: #f3f4f6;
  }
`;

export default Dashboard;
