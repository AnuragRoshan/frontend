import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { sharedTheme } from "../../../styles/theme/theme";
import WrapperBox from "../../../components/layout/WrapperBox";
import {
  Calendar,
  ChevronRight,
  Clock,
  DollarSign,
  CheckCircle,
  BarChart2,
  FileText,
  Search,
  Filter,
  Star,
  TrendingUp,
  Award,
  Bell,
  Briefcase,
  // Users,
  Zap,
  Bookmark,
  MessageSquare,
  // ImageIcon,
  // Sliders,
  Tag,
  MapPin,
  RefreshCw,
  ThumbsUp,
  Eye,
  // Heart,
  Share2,
  AlertCircle,
  HelpCircle,
  // Info,
} from "lucide-react";
import SelectOption from "../../../components/layout/SelectOption";

// Sample data for campaigns
const ongoingCampaigns = [
  {
    id: 1,
    title: "Summer Fashion Collection",
    brand: "StyleHub",
    brandLogo:
      "https://img.freepik.com/free-vector/colorful-letter-gradient-logo-design_474888-2309.jpg?semt=ais_hybrid&w=740",
    date: "May 15, 2025",
    payout: "₹5,000",
    status: "In Progress",
    statusVariant: "info",
    description:
      "Showcase our new summer collection with lifestyle photos and videos.",
    deadline: "May 25, 2025",
    requirements: ["2 Instagram Posts", "3 Stories", "1 Reel"],
    engagement: { likes: 1200, comments: 320, shares: 150 },
    category: "Fashion",
    location: "Mumbai",
    tags: ["summer", "fashion", "lifestyle"],
    priority: "High",
  },
  {
    id: 2,
    title: "Fitness App Promotion",
    brand: "FitLife",
    brandLogo:
      "https://img.freepik.com/free-vector/gradient-fitness-logo-template_23-2149457926.jpg?w=740&t=st=1716057889~exp=1716058489~hmac=c9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9",
    date: "May 20, 2025",
    payout: "₹4,500",
    status: "Content Approval",
    statusVariant: "warning",
    description:
      "Create a workout routine using our app and share your experience.",
    deadline: "May 30, 2025",
    requirements: ["1 YouTube Video", "2 Instagram Posts", "5 Stories"],
    engagement: { likes: 850, comments: 210, shares: 95 },
    category: "Health & Fitness",
    location: "Delhi",
    tags: ["fitness", "workout", "app"],
    priority: "Medium",
  },
  {
    id: 3,
    title: "Organic Food Review",
    brand: "NatureEats",
    brandLogo:
      "https://img.freepik.com/free-vector/gradient-organic-food-logo-template_23-2149452309.jpg?w=740&t=st=1716057920~exp=1716058520~hmac=c9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9",
    date: "May 25, 2025",
    payout: "₹3,000",
    status: "Negotiation",
    statusVariant: "default",
    description: "Review our organic food products and share honest feedback.",
    deadline: "June 5, 2025",
    requirements: ["1 Blog Post", "3 Instagram Posts", "1 TikTok Video"],
    engagement: { likes: 650, comments: 180, shares: 75 },
    category: "Food & Beverage",
    location: "Bangalore",
    tags: ["organic", "food", "review"],
    priority: "Low",
  },
  {
    id: 7,
    title: "Travel Backpack Showcase",
    brand: "AdventureGear",
    brandLogo:
      "https://img.freepik.com/free-vector/gradient-adventure-badge_23-2149424074.jpg?w=740&t=st=1716057950~exp=1716058550~hmac=c9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9",
    date: "June 1, 2025",
    payout: "₹6,500",
    status: "In Progress",
    statusVariant: "info",
    description: "Showcase our new travel backpack in outdoor settings.",
    deadline: "June 15, 2025",
    requirements: ["3 Instagram Posts", "1 YouTube Review", "5 Stories"],
    engagement: { likes: 1500, comments: 350, shares: 200 },
    category: "Travel",
    location: "Himachal Pradesh",
    tags: ["travel", "backpack", "outdoor"],
    priority: "High",
  },
  {
    id: 8,
    title: "Beauty Product Launch",
    brand: "GlowBeauty",
    brandLogo:
      "https://img.freepik.com/free-vector/gradient-beauty-logo-template_23-2149373504.jpg?w=740&t=st=1716057980~exp=1716058580~hmac=c9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9",
    date: "June 5, 2025",
    payout: "₹7,000",
    status: "Content Approval",
    statusVariant: "warning",
    description: "Create content for our new skincare line launch.",
    deadline: "June 20, 2025",
    requirements: ["1 IGTV", "4 Instagram Posts", "10 Stories"],
    engagement: { likes: 2000, comments: 450, shares: 300 },
    category: "Beauty",
    location: "Chennai",
    tags: ["beauty", "skincare", "launch"],
    priority: "High",
  },
];

const previousCampaigns = [
  {
    id: 4,
    title: "Tech Gadget Unboxing",
    brand: "TechGadgets",
    brandLogo:
      "https://img.freepik.com/free-vector/gradient-technology-logo-template_23-2149660622.jpg?w=740&t=st=1716058010~exp=1716058610~hmac=c9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9",
    date: "April 10, 2025",
    payout: "₹3,500",
    status: "Completed",
    statusVariant: "success",
    description: "Unboxed and reviewed the latest smartphone model.",
    completedDate: "April 20, 2025",
    performance: {
      impressions: 25000,
      engagement: 8.5,
      clicks: 1200,
      conversions: 85,
    },
    feedback: "Great content! Exactly what we were looking for.",
    rating: 4.8,
  },
  {
    id: 5,
    title: "Skincare Routine",
    brand: "GlowSkin",
    brandLogo:
      "https://img.freepik.com/free-vector/gradient-beauty-logo-template_23-2149373504.jpg?w=740&t=st=1716057980~exp=1716058580~hmac=c9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9",
    date: "March 15, 2025",
    payout: "₹4,200",
    status: "Completed",
    statusVariant: "success",
    description:
      "Demonstrated a morning skincare routine using their products.",
    completedDate: "March 25, 2025",
    performance: {
      impressions: 18000,
      engagement: 7.2,
      clicks: 950,
      conversions: 62,
    },
    feedback: "The content was authentic and resonated with our audience.",
    rating: 4.5,
  },
  {
    id: 6,
    title: "Travel Vlog Sponsorship",
    brand: "Wanderlust",
    brandLogo:
      "https://img.freepik.com/free-vector/gradient-travel-logo-template_23-2149052925.jpg?w=740&t=st=1716058040~exp=1716058640~hmac=c9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9",
    date: "February 5, 2025",
    payout: "₹7,500",
    status: "Completed",
    statusVariant: "success",
    description: "Created a travel vlog featuring their travel accessories.",
    completedDate: "February 20, 2025",
    performance: {
      impressions: 35000,
      engagement: 9.1,
      clicks: 1800,
      conversions: 120,
    },
    feedback:
      "Outstanding work! The video quality and storytelling were exceptional.",
    rating: 5.0,
  },
  {
    id: 9,
    title: "Gaming Headset Review",
    brand: "GameTech",
    brandLogo:
      "https://img.freepik.com/free-vector/gradient-gaming-logo-template_23-2149373547.jpg?w=740&t=st=1716058070~exp=1716058670~hmac=c9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9",
    date: "January 15, 2025",
    payout: "₹5,000",
    status: "Completed",
    statusVariant: "success",
    description: "Reviewed our premium gaming headset during live streams.",
    completedDate: "January 30, 2025",
    performance: {
      impressions: 28000,
      engagement: 8.7,
      clicks: 1500,
      conversions: 95,
    },
    feedback: "The review was detailed and your audience was very engaged.",
    rating: 4.7,
  },
  {
    id: 10,
    title: "Coffee Brand Promotion",
    brand: "MornBrew",
    brandLogo:
      "https://img.freepik.com/free-vector/gradient-coffee-logo-template_23-2149428379.jpg?w=740&t=st=1716058100~exp=1716058700~hmac=c9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9",
    date: "December 5, 2024",
    payout: "₹3,800",
    status: "Completed",
    statusVariant: "success",
    description: "Created content showcasing our premium coffee blends.",
    completedDate: "December 20, 2024",
    performance: {
      impressions: 22000,
      engagement: 7.8,
      clicks: 1100,
      conversions: 75,
    },
    feedback:
      "The aesthetic of your content perfectly matched our brand image.",
    rating: 4.6,
  },
];

// Recommended campaigns based on user profile
const recommendedCampaigns = [
  {
    id: 11,
    title: "Sustainable Fashion Showcase",
    brand: "EcoWear",
    brandLogo:
      "https://img.freepik.com/free-vector/gradient-eco-logo-template_23-2149373243.jpg?w=740&t=st=1716058130~exp=1716058730~hmac=c9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9",
    payout: "₹6,000-₹8,000",
    match: 95,
    description:
      "Promote our eco-friendly clothing line with creative content.",
    requirements: ["3 Instagram Posts", "1 Reel", "5 Stories"],
    category: "Fashion",
    deadline: "Open for 15 more days",
  },
  {
    id: 12,
    title: "Vegan Protein Review",
    brand: "PlantPower",
    brandLogo:
      "https://img.freepik.com/free-vector/gradient-plant-logo-template_23-2149373246.jpg?w=740&t=st=1716058160~exp=1716058760~hmac=c9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9",
    payout: "₹4,500-₹5,500",
    match: 92,
    description:
      "Review our plant-based protein products in your fitness content.",
    requirements: ["1 YouTube Video", "2 Instagram Posts"],
    category: "Health & Fitness",
    deadline: "Open for 10 more days",
  },
  {
    id: 13,
    title: "Smart Home Device Demo",
    brand: "TechHome",
    brandLogo:
      "https://img.freepik.com/free-vector/gradient-smart-home-logo-template_23-2149373244.jpg?w=740&t=st=1716058190~exp=1716058790~hmac=c9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9",
    payout: "₹7,000-₹9,000",
    match: 88,
    description: "Demonstrate our new smart home devices in your content.",
    requirements: ["1 YouTube Video", "3 Instagram Posts", "1 Blog Review"],
    category: "Technology",
    deadline: "Open for 20 more days",
  },
];

// Campaign insights data
const campaignInsights = {
  totalEarnings: "₹24,000",
  activeCampaigns: 5,
  completedCampaigns: 12,
  averageRating: 4.7,
  topPerforming: {
    title: "Travel Vlog Sponsorship",
    engagement: "9.1%",
    earnings: "₹7,500",
  },
  recentActivity: [
    {
      type: "New Campaign",
      message: "You've been invited to 'Summer Fashion Collection'",
      time: "2 hours ago",
    },
    {
      type: "Content Approval",
      message: "Your content for 'Fitness App Promotion' is awaiting approval",
      time: "1 day ago",
    },
    {
      type: "Payment",
      message:
        "Payment of ₹3,500 for 'Tech Gadget Unboxing' has been processed",
      time: "3 days ago",
    },
  ],
};

const Campaigns = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ongoing");
  const [filters, setFilters] = useState({
    brand: "",
    status: "",
    payoutMin: "",
    payoutMax: "",
    dateRange: "",
    category: "",
    location: "",
    priority: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showInsights, setShowInsights] = useState(true);
  const [showRecommended, setShowRecommended] = useState(true);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const parsePayout = (payout: string) =>
    parseInt(payout.replace(/[^\d]/g, ""), 10);

  const filteredOngoingCampaigns = ongoingCampaigns
    .filter((c) => {
      const payoutValue = parsePayout(c.payout);
      const afterDateMatch =
        !filters.dateRange || new Date(c.date) >= new Date(filters.dateRange);
      const minMatch =
        !filters.payoutMin || payoutValue >= parseInt(filters.payoutMin, 10);
      const maxMatch =
        !filters.payoutMax || payoutValue <= parseInt(filters.payoutMax, 10);
      const searchMatch =
        !searchTerm ||
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatch =
        !filters.category || c.category === filters.category;
      const locationMatch =
        !filters.location || c.location === filters.location;
      const priorityMatch =
        !filters.priority || c.priority === filters.priority;

      return (
        (filters.brand === "" || c.brand.includes(filters.brand)) &&
        (filters.status === "" || c.status === filters.status) &&
        minMatch &&
        maxMatch &&
        afterDateMatch &&
        searchMatch &&
        categoryMatch &&
        locationMatch &&
        priorityMatch
      );
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "desc"
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === "payout") {
        return sortOrder === "desc"
          ? parsePayout(b.payout) - parsePayout(a.payout)
          : parsePayout(a.payout) - parsePayout(b.payout);
      } else if (sortBy === "deadline") {
        return sortOrder === "desc"
          ? new Date(b.deadline).getTime() - new Date(a.deadline).getTime()
          : new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
      return 0;
    });

  const filteredPreviousCampaigns = previousCampaigns
    .filter((c) => {
      const payoutValue = parsePayout(c.payout);
      const afterDateMatch =
        !filters.dateRange || new Date(c.date) >= new Date(filters.dateRange);
      const minMatch =
        !filters.payoutMin || payoutValue >= parseInt(filters.payoutMin, 10);
      const maxMatch =
        !filters.payoutMax || payoutValue <= parseInt(filters.payoutMax, 10);
      const searchMatch =
        !searchTerm ||
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase());

      return (
        (filters.brand === "" || c.brand.includes(filters.brand)) &&
        (filters.status === "" || c.status === filters.status) &&
        minMatch &&
        maxMatch &&
        afterDateMatch &&
        searchMatch
      );
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "desc"
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === "payout") {
        return sortOrder === "desc"
          ? parsePayout(b.payout) - parsePayout(a.payout)
          : parsePayout(a.payout) - parsePayout(b.payout);
      } else if (sortBy === "rating") {
        return sortOrder === "desc" ? b.rating - a.rating : a.rating - b.rating;
      }
      return 0;
    });

  const resetFilters = () => {
    setFilters({
      brand: "",
      status: "",
      payoutMin: "",
      payoutMax: "",
      dateRange: "",
      category: "",
      location: "",
      priority: "",
    });
    setSearchTerm("");
    setSortBy("date");
    setSortOrder("desc");
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  return (
    <PageContainer>
      <PageHeader>
        <HeaderTop>
          <div>
            <PageTitle>Campaigns</PageTitle>
            <PageDescription>
              Manage your ongoing and previous brand collaborations
            </PageDescription>
          </div>
          <HeaderActions>
            <NotificationButton>
              <Bell size={20} />
              <NotificationBadge>3</NotificationBadge>
            </NotificationButton>
            <HelpButton>
              <HelpCircle size={20} />
            </HelpButton>
          </HeaderActions>
        </HeaderTop>

        {showInsights && (
          <InsightsContainer>
            <InsightHeader>
              <div>
                <h3>Campaign Insights</h3>
                <p>Your performance at a glance</p>
              </div>
              <CloseButton onClick={() => setShowInsights(false)}>
                ×
              </CloseButton>
            </InsightHeader>
            <InsightCards>
              <InsightCard>
                <DollarSign size={20} />
                <div>
                  <InsightValue>{campaignInsights.totalEarnings}</InsightValue>
                  <InsightLabel>Total Earnings</InsightLabel>
                </div>
              </InsightCard>
              <InsightCard>
                <Briefcase size={20} />
                <div>
                  <InsightValue>
                    {campaignInsights.activeCampaigns}
                  </InsightValue>
                  <InsightLabel>Active Campaigns</InsightLabel>
                </div>
              </InsightCard>
              <InsightCard>
                <CheckCircle size={20} />
                <div>
                  <InsightValue>
                    {campaignInsights.completedCampaigns}
                  </InsightValue>
                  <InsightLabel>Completed</InsightLabel>
                </div>
              </InsightCard>
              <InsightCard>
                <Star size={20} />
                <div>
                  <InsightValue>{campaignInsights.averageRating}</InsightValue>
                  <InsightLabel>Avg. Rating</InsightLabel>
                </div>
              </InsightCard>
              <TopPerformingCard>
                <TrendingUp size={20} />
                <div>
                  <InsightLabel>Top Performing Campaign</InsightLabel>
                  <TopCampaignTitle>
                    {campaignInsights.topPerforming.title}
                  </TopCampaignTitle>
                  <TopCampaignStats>
                    <span>
                      {campaignInsights.topPerforming.engagement} engagement
                    </span>
                    <span>
                      {campaignInsights.topPerforming.earnings} earned
                    </span>
                  </TopCampaignStats>
                </div>
              </TopPerformingCard>
            </InsightCards>
          </InsightsContainer>
        )}
      </PageHeader>

      {showRecommended && (
        <RecommendedSection>
          <RecommendedHeader>
            <div>
              <h3>
                <Award size={18} /> Recommended for You
              </h3>
              <p>Campaigns that match your profile and content style</p>
            </div>
            <CloseButton onClick={() => setShowRecommended(false)}>
              ×
            </CloseButton>
          </RecommendedHeader>
          <RecommendedCards>
            {recommendedCampaigns.map((campaign) => (
              <RecommendedCard key={campaign.id}>
                <RecommendedMatch>
                  <Zap size={14} />
                  {campaign.match}% Match
                </RecommendedMatch>
                <RecommendedBrand>
                  <img
                    src={campaign.brandLogo || "/placeholder.svg"}
                    alt={campaign.brand}
                  />
                  <span>{campaign.brand}</span>
                </RecommendedBrand>
                <RecommendedTitle>{campaign.title}</RecommendedTitle>
                <RecommendedDescription>
                  {campaign.description}
                </RecommendedDescription>
                <RecommendedDetails>
                  <RecommendedDetail>
                    <Tag size={14} />
                    <span>{campaign.category}</span>
                  </RecommendedDetail>
                  <RecommendedDetail>
                    <DollarSign size={14} />
                    <span>{campaign.payout}</span>
                  </RecommendedDetail>
                  <RecommendedDetail>
                    <Clock size={14} />
                    <span>{campaign.deadline}</span>
                  </RecommendedDetail>
                </RecommendedDetails>
                <RecommendedActions>
                  <ActionButton primary>View Details</ActionButton>
                  <BookmarkButton>
                    <Bookmark size={16} />
                  </BookmarkButton>
                </RecommendedActions>
              </RecommendedCard>
            ))}
          </RecommendedCards>
        </RecommendedSection>
      )}

      <SearchAndFilterBar>
        <SearchContainer>
          <SearchIcon>
            <Search size={18} />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search campaigns by title, brand or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <ClearSearchButton onClick={() => setSearchTerm("")}>
              ×
            </ClearSearchButton>
          )}
        </SearchContainer>
        <SortContainer>
          <SortLabel>Sort by:</SortLabel>
          <SelectOption
            options={[
              { label: "Date", value: "date" },
              { label: "Payout", value: "payout" },
              ...(activeTab === "ongoing"
                ? [{ label: "Deadline", value: "deadline" }]
                : [{ label: "Rating", value: "rating" }]),
            ]}
            defaultValue={sortBy}
            onChange={(value) => setSortBy(value)}
          />
          <SortOrderButton onClick={toggleSortOrder}>
            {sortOrder === "desc" ? "↓" : "↑"}
          </SortOrderButton>
        </SortContainer>
      </SearchAndFilterBar>

      <TabContainer>
        <TabButton
          active={activeTab === "ongoing"}
          onClick={() => setActiveTab("ongoing")}
        >
          Ongoing Campaigns
        </TabButton>
        <TabButton
          active={activeTab === "previous"}
          onClick={() => setActiveTab("previous")}
        >
          Previous Campaigns
        </TabButton>
      </TabContainer>

      <ContentContainer>
        <SectionTitle>
          {activeTab === "ongoing" ? (
            <>
              Ongoing Campaigns{" "}
              <Badge variant="info">
                {filteredOngoingCampaigns.length} active
              </Badge>
            </>
          ) : (
            <>
              Previous Campaigns{" "}
              <Badge variant="success">
                {filteredPreviousCampaigns.length} completed
              </Badge>
            </>
          )}
        </SectionTitle>
        <MainContent>
          <FilterPanel>
            <FilterHeader>
              <h3>
                <Filter size={16} /> Filters
              </h3>
              <ResetButton onClick={resetFilters}>
                <RefreshCw size={14} /> Reset
              </ResetButton>
            </FilterHeader>
            <FilterGroup>
              <FilterLabel>Brand:</FilterLabel>
              <input
                type="text"
                value={filters.brand}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, brand: e.target.value }))
                }
                placeholder="Enter brand name"
              />
            </FilterGroup>
            <FilterGroup>
              <FilterLabel>Status:</FilterLabel>
              <SelectOption
                options={[
                  { label: "All", value: "" },
                  { label: "In Progress", value: "In Progress" },
                  { label: "Content Approval", value: "Content Approval" },
                  { label: "Negotiation", value: "Negotiation" },
                  { label: "Completed", value: "Completed" },
                ]}
                defaultValue={filters.status}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, status: value }))
                }
              />
            </FilterGroup>
            <FilterGroup>
              <FilterLabel>Min Payout:</FilterLabel>
              <input
                type="number"
                placeholder="e.g. 3000"
                value={filters.payoutMin}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, payoutMin: e.target.value }))
                }
              />
            </FilterGroup>
            <FilterGroup>
              <FilterLabel>Max Payout:</FilterLabel>
              <input
                type="number"
                placeholder="e.g. 6000"
                value={filters.payoutMax}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, payoutMax: e.target.value }))
                }
              />
            </FilterGroup>
            <FilterGroup>
              <FilterLabel>Date After:</FilterLabel>
              <input
                type="date"
                value={filters.dateRange}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, dateRange: e.target.value }))
                }
              />
            </FilterGroup>
            {activeTab === "ongoing" && (
              <>
                <FilterGroup>
                  <FilterLabel>Category:</FilterLabel>
                  <SelectOption
                    options={[
                      { label: "All", value: "" },
                      { label: "Fashion", value: "Fashion" },
                      { label: "Health & Fitness", value: "Health & Fitness" },
                      { label: "Food & Beverage", value: "Food & Beverage" },
                      { label: "Travel", value: "Travel" },
                      { label: "Beauty", value: "Beauty" },
                      { label: "Technology", value: "Technology" },
                    ]}
                    defaultValue={filters.category}
                    onChange={(value) =>
                      setFilters((prev) => ({ ...prev, category: value }))
                    }
                  />
                </FilterGroup>
                <FilterGroup>
                  <FilterLabel>Location:</FilterLabel>
                  <SelectOption
                    options={[
                      { label: "All", value: "" },
                      { label: "Mumbai", value: "Mumbai" },
                      { label: "Delhi", value: "Delhi" },
                      { label: "Bangalore", value: "Bangalore" },
                      { label: "Chennai", value: "Chennai" },
                      { label: "Himachal Pradesh", value: "Himachal Pradesh" },
                    ]}
                    defaultValue={filters.location}
                    onChange={(value) =>
                      setFilters((prev) => ({ ...prev, location: value }))
                    }
                  />
                </FilterGroup>
                <FilterGroup>
                  <FilterLabel>Priority:</FilterLabel>
                  <SelectOption
                    options={[
                      { label: "All", value: "" },
                      { label: "High", value: "High" },
                      { label: "Medium", value: "Medium" },
                      { label: "Low", value: "Low" },
                    ]}
                    defaultValue={filters.priority}
                    onChange={(value) =>
                      setFilters((prev) => ({ ...prev, priority: value }))
                    }
                  />
                </FilterGroup>
              </>
            )}
          </FilterPanel>
          <CampaignList>
            {(activeTab === "ongoing"
              ? filteredOngoingCampaigns
              : filteredPreviousCampaigns
            ).length > 0 ? (
              (activeTab === "ongoing"
                ? filteredOngoingCampaigns
                : filteredPreviousCampaigns
              ).map((campaign) =>
                activeTab === "ongoing" ? (
                  <WrapperBox
                    themeVariant="white"
                    key={campaign.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    <CampaignHeader>
                      <CampaignTitle>{campaign.title}</CampaignTitle>
                      <Badge
                        variant={
                          campaign.statusVariant as
                            | "success"
                            | "warning"
                            | "info"
                            | "default"
                        }
                      >
                        {campaign.status}
                      </Badge>
                    </CampaignHeader>
                    <CampaignBrand>
                      <img
                        src={campaign.brandLogo || "/placeholder.svg"}
                        alt={campaign.brand}
                        style={{
                          height: "36px",
                          width: "36px",
                          borderRadius: "50%",
                          backgroundColor: "transparent",
                          border: "1px solid #e5e7eb",
                        }}
                      />
                      {campaign.brand}
                    </CampaignBrand>
                    <CampaignDescription>
                      {campaign.description}
                    </CampaignDescription>
                    <CampaignTags>
                      {"tags" in campaign &&
                        campaign.tags.map((tag, index) => (
                          <CampaignTag key={index}>#{tag}</CampaignTag>
                        ))}
                    </CampaignTags>
                    <CampaignRequirements>
                      <RequirementsTitle>Deliverables:</RequirementsTitle>
                      <RequirementsList>
                        {"requirements" in campaign &&
                          campaign.requirements.map((req, index) => (
                            <RequirementItem key={index}>
                              <CheckCircle size={14} />
                              {req}
                            </RequirementItem>
                          ))}
                      </RequirementsList>
                    </CampaignRequirements>
                    <CampaignDetails>
                      <CampaignDetail>
                        <Calendar size={16} />
                        <span>Started: {campaign.date}</span>
                      </CampaignDetail>
                      <CampaignDetail>
                        <Clock size={16} />
                        {"deadline" in campaign && (
                          <span>Deadline: {campaign.deadline}</span>
                        )}
                      </CampaignDetail>
                      <CampaignDetail>
                        <DollarSign size={16} />
                        <PayoutText>{campaign.payout}</PayoutText>
                      </CampaignDetail>
                      {"location" in campaign && campaign.location && (
                        <CampaignDetail>
                          <MapPin size={16} />
                          <span>{campaign.location}</span>
                        </CampaignDetail>
                      )}
                    </CampaignDetails>
                    <CampaignActions>
                      <ActionButton
                        primary
                        onClick={() =>
                          navigate(`/submitContent/${campaign.id}`)
                        }
                      >
                        <FileText size={16} />
                        Submit Content
                      </ActionButton>
                      <ActionButton>
                        <MessageSquare size={16} />
                        Message Brand
                      </ActionButton>
                    </CampaignActions>
                  </WrapperBox>
                ) : (
                  <WrapperBox
                    key={campaign.id}
                    style={{
                      backgroundColor: "white",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    <CampaignHeader>
                      <CampaignTitle>{campaign.title}</CampaignTitle>
                      <Badge
                        variant={
                          campaign.statusVariant as
                            | "success"
                            | "warning"
                            | "info"
                            | "default"
                        }
                      >
                        {campaign.status}
                      </Badge>
                    </CampaignHeader>
                    <CampaignBrand>
                      <img
                        src={campaign.brandLogo || "/placeholder.svg"}
                        alt={campaign.brand}
                        style={{
                          height: "36px",
                          width: "36px",
                          borderRadius: "50%",
                          backgroundColor: "transparent",
                          border: "1px solid #e5e7eb",
                        }}
                      />
                      {campaign.brand}
                    </CampaignBrand>
                    <CampaignDescription>
                      {campaign.description}
                    </CampaignDescription>
                    <CompletedCampaignPerformance>
                      <PerformanceTitle>Campaign Performance</PerformanceTitle>
                      <PerformanceMetrics>
                        <PerformanceMetric>
                          <Eye size={14} />
                          <div>
                            <MetricValue>
                              {"performance" in campaign &&
                                campaign.performance.impressions.toLocaleString()}
                            </MetricValue>
                            <MetricLabel>Impressions</MetricLabel>
                          </div>
                        </PerformanceMetric>
                        <PerformanceMetric>
                          <ThumbsUp size={14} />
                          <div>
                            <MetricValue>
                              {"performance" in campaign
                                ? campaign.performance.engagement
                                : "N/A"}
                              %
                            </MetricValue>
                            <MetricLabel>Engagement</MetricLabel>
                          </div>
                        </PerformanceMetric>
                        <PerformanceMetric>
                          <Share2 size={14} />
                          <div>
                            <MetricValue>
                              {"performance" in campaign &&
                                campaign.performance.clicks.toLocaleString()}
                            </MetricValue>
                            <MetricLabel>Clicks</MetricLabel>
                          </div>
                        </PerformanceMetric>
                        <PerformanceMetric>
                          <DollarSign size={14} />
                          <div>
                            <MetricValue>
                              {"performance" in campaign &&
                                campaign.performance.conversions}
                            </MetricValue>
                            <MetricLabel>Conversions</MetricLabel>
                          </div>
                        </PerformanceMetric>
                      </PerformanceMetrics>
                    </CompletedCampaignPerformance>
                    <CampaignFeedback>
                      <FeedbackTitle>Brand Feedback:</FeedbackTitle>
                      {"feedback" in campaign && (
                        <FeedbackContent>"{campaign.feedback}"</FeedbackContent>
                      )}
                      <FeedbackRating>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill={
                              "rating" in campaign &&
                              i < Math.floor(campaign.rating)
                                ? "#F59E0B"
                                : "none"
                            }
                            color={
                              "rating" in campaign &&
                              i < Math.floor(campaign.rating)
                                ? "#F59E0B"
                                : "#D1D5DB"
                            }
                          />
                        ))}
                        {"rating" in campaign && (
                          <span>{campaign.rating.toFixed(1)}</span>
                        )}
                      </FeedbackRating>
                    </CampaignFeedback>
                    <CampaignDetails>
                      <CampaignDetail>
                        <Calendar size={16} />
                        <span>Started: {campaign.date}</span>
                      </CampaignDetail>
                      <CampaignDetail>
                        <CheckCircle size={16} />
                        {"completedDate" in campaign && (
                          <span>Completed: {campaign.completedDate}</span>
                        )}
                      </CampaignDetail>
                      <CampaignDetail>
                        <DollarSign size={16} />
                        <PayoutText>{campaign.payout}</PayoutText>
                      </CampaignDetail>
                    </CampaignDetails>
                    <CampaignActions>
                      <ActionButton>
                        <BarChart2 size={16} />
                        View Performance
                      </ActionButton>
                      <ViewDetailsLink>
                        View Details <ChevronRight size={16} />
                      </ViewDetailsLink>
                    </CampaignActions>
                  </WrapperBox>
                )
              )
            ) : (
              <EmptyState>
                <AlertCircle size={48} />
                <EmptyStateTitle>No campaigns found</EmptyStateTitle>
                <EmptyStateDescription>
                  Try adjusting your filters or search terms to see more
                  results.
                </EmptyStateDescription>
                <ActionButton onClick={resetFilters}>
                  <RefreshCw size={16} />
                  Reset Filters
                </ActionButton>
              </EmptyState>
            )}
          </CampaignList>
        </MainContent>
      </ContentContainer>

      <RecentActivityPanel>
        <ActivityHeader>
          <h3>Recent Activity</h3>
          <ViewAllLink>View All</ViewAllLink>
        </ActivityHeader>
        <ActivityList>
          {campaignInsights.recentActivity.map((activity, index) => (
            <ActivityItem key={index}>
              <ActivityIcon>
                {activity.type === "New Campaign" && <Briefcase size={16} />}
                {activity.type === "Content Approval" && <FileText size={16} />}
                {activity.type === "Payment" && <DollarSign size={16} />}
              </ActivityIcon>
              <ActivityContent>
                <ActivityMessage>{activity.message}</ActivityMessage>
                <ActivityTime>{activity.time}</ActivityTime>
              </ActivityContent>
            </ActivityItem>
          ))}
        </ActivityList>
      </RecentActivityPanel>
    </PageContainer>
  );
};

export default Campaigns;

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 20px;
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const NotificationButton = styled.button`
  position: relative;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${sharedTheme.colorVariants.secondary.dark};
  transition: all 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: ${sharedTheme.colorVariants.primary.dark};
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HelpButton = styled.button`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${sharedTheme.colorVariants.secondary.dark};
  transition: all 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const PageTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xxl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin-bottom: 0.5rem;
`;

const PageDescription = styled.div`
  color: ${sharedTheme.colorVariants.secondary.light};
  font-size: ${sharedTheme.typography.fontSizes.lg};
`;

const InsightsContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
`;

const InsightHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;

  h3 {
    font-size: ${sharedTheme.typography.fontSizes.lg};
    font-weight: ${sharedTheme.typography.fontWeights.bold};
    color: ${sharedTheme.colorVariants.secondary.dark};
    margin: 0;
  }

  p {
    color: ${sharedTheme.colorVariants.secondary.light};
    font-size: ${sharedTheme.typography.fontSizes.sm};
    margin: 0.25rem 0 0 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  color: ${sharedTheme.colorVariants.secondary.light};
  cursor: pointer;
  padding: 0;
`;

const InsightCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const InsightCard = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;

  svg {
    color: ${sharedTheme.colorVariants.primary.dark};
  }
`;

const InsightValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const InsightLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const TopPerformingCard = styled.div`
  grid-column: span 2;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background-color: #f0f9ff;
  border-radius: 8px;
  border: 1px solid #bae6fd;

  svg {
    color: #0284c7;
  }
`;

const TopCampaignTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0.25rem 0;
`;

const TopCampaignStats = styled.div`
  display: flex;
  gap: 1rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};

  span {
    display: flex;
    align-items: center;
  }
`;

const RecommendedSection = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  margin-bottom: 1.5rem;
`;

const RecommendedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;

  h3 {
    font-size: ${sharedTheme.typography.fontSizes.lg};
    font-weight: ${sharedTheme.typography.fontWeights.bold};
    color: ${sharedTheme.colorVariants.secondary.dark};
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      color: #f59e0b;
    }
  }

  p {
    color: ${sharedTheme.colorVariants.secondary.light};
    font-size: ${sharedTheme.typography.fontSizes.sm};
    margin: 0.25rem 0 0 0;
  }
`;

const RecommendedCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

const RecommendedCard = styled.div`
  position: relative;
  background-color: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
`;

const RecommendedMatch = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #fef3c7;
  color: #92400e;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const RecommendedBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #e5e7eb;
  }

  span {
    font-size: ${sharedTheme.typography.fontSizes.sm};
    color: ${sharedTheme.colorVariants.secondary.light};
    font-weight: ${sharedTheme.typography.fontWeights.medium};
  }
`;

const RecommendedTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.primary.dark};
`;

const RecommendedDescription = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  line-height: 1.5;
`;

const RecommendedDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const RecommendedDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
  background-color: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

const RecommendedActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
`;

const BookmarkButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 0.5rem;
  color: ${sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const SearchAndFilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 2.5rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  background-color: white;

  &:focus {
    outline: none;
    border-color: ${sharedTheme.colorVariants.primary.light};
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: ${sharedTheme.colorVariants.secondary.light};
  }
`;

const ClearSearchButton = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1.25rem;
  line-height: 1;
  color: ${sharedTheme.colorVariants.secondary.light};
  cursor: pointer;
  padding: 0;
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SortLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const SortOrderButton = styled.button`
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${sharedTheme.colorVariants.secondary.dark};
  font-size: ${sharedTheme.typography.fontSizes.md};
  transition: all 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-block: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

interface TabButtonProps {
  active: boolean;
}

const TabButton = styled.button<TabButtonProps>`
  padding: 0.75rem 1.5rem;
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

  &:hover {
    color: ${sharedTheme.colorVariants.primary.dark};
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SectionTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const MainContent = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const FilterPanel = styled.div`
  width: 250px;
  background-color: #fff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  display: flex;
  height: max-content;
  flex-direction: column;
  gap: 1rem;
  position: sticky;
  top: 20px;
  z-index: 10;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  h3 {
    font-size: ${sharedTheme.typography.fontSizes.md};
    font-weight: ${sharedTheme.typography.fontWeights.semibold};
    color: ${sharedTheme.colorVariants.secondary.dark};
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ResetButton = styled.button`
  background: none;
  border: none;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.primary.dark};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  input {
    width: 100%;
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid #e5e7eb;
    font-size: ${sharedTheme.typography.fontSizes.sm};
    color: ${sharedTheme.colorVariants.secondary.dark};

    &:focus {
      outline: none;
      border-color: ${sharedTheme.colorVariants.primary.light};
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
    }
  }
`;

const FilterLabel = styled.label`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
`;

const CampaignList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;

const CampaignHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CampaignTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.primary.dark};
`;

const CampaignBrand = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: start;
  font-size: ${sharedTheme.typography.fontSizes.md};
  color: ${sharedTheme.colorVariants.secondary.dark};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
`;

const CampaignDescription = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  line-height: 1.5;
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
`;

const CampaignTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.25rem;
`;

const CampaignTag = styled.span`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.primary.dark};
  background-color: #eff6ff;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

const CampaignRequirements = styled.div`
  margin-top: 0.5rem;
`;

const RequirementsTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin-bottom: 0.5rem;
`;

const RequirementsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const RequirementItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.dark};
  background-color: #f9fafb;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
`;

const CampaignDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const CampaignDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const PayoutText = styled.span`
  color: #059669;
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
`;

const CampaignActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface ActionButtonProps {
  primary?: boolean;
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
    props.primary ? sharedTheme.colorVariants.primary.dark : "white"};
  color: ${(props) =>
    props.primary ? "white" : sharedTheme.colorVariants.secondary.dark};
  border: 1px solid ${(props) => (props.primary ? "transparent" : "#e5e7eb")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.primary ? sharedTheme.colorVariants.primary.darker : "#f9fafb"};
  }
`;

const ViewDetailsLink = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  color: ${sharedTheme.colorVariants.link.default};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const CompletedCampaignPerformance = styled.div`
  background-color: #f0f9ff;
  border-radius: 8px;
  padding: 1rem;
  margin: 0.5rem 0;
`;

const PerformanceTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin-bottom: 0.75rem;
`;

const PerformanceMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.75rem;
`;

const PerformanceMetric = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: ${sharedTheme.colorVariants.primary.dark};
  }
`;

const MetricValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const MetricLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const CampaignFeedback = styled.div`
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 1rem;
  margin: 0.5rem 0;
`;

const FeedbackTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin-bottom: 0.5rem;
`;

const FeedbackContent = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  font-style: italic;
  margin-bottom: 0.5rem;
`;

const FeedbackRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  span {
    margin-left: 0.5rem;
    font-size: ${sharedTheme.typography.fontSizes.sm};
    font-weight: ${sharedTheme.typography.fontWeights.semibold};
    color: ${sharedTheme.colorVariants.secondary.dark};
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  text-align: center;

  svg {
    color: ${sharedTheme.colorVariants.secondary.light};
    margin-bottom: 1rem;
  }
`;

const EmptyStateTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin-bottom: 0.5rem;
`;

const EmptyStateDescription = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin-bottom: 1.5rem;
`;

const RecentActivityPanel = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  margin-top: 1.5rem;
`;

const ActivityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h3 {
    font-size: ${sharedTheme.typography.fontSizes.lg};
    font-weight: ${sharedTheme.typography.fontWeights.bold};
    color: ${sharedTheme.colorVariants.secondary.dark};
    margin: 0;
  }
`;

const ViewAllLink = styled.a`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.link.default};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ActivityItem = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 8px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
`;

const ActivityIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #eff6ff;
  color: ${sharedTheme.colorVariants.primary.dark};
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityMessage = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin-bottom: 0.25rem;
`;

const ActivityTime = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

interface BadgeProps {
  variant?: "success" | "warning" | "info" | "default";
}

const Badge = styled.div<BadgeProps>`
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
