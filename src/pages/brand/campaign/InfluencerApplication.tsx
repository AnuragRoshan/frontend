import React, { useState, useMemo } from "react";
import styled from "styled-components";
import {
  Search,
  //   Filter,
  Users,
  MapPin,
  Calendar,
  Eye,
  Check,
  X,
  Star,
  Instagram,
  Youtube,
  TrendingUp,
  MessageSquare,
  Download,
  MoreHorizontal,
  //   ChevronDown,
  //   ChevronRight,
  //   Heart,
  //   Share2,
  Bookmark,
  Clock,
  DollarSign,
  Target,
  Globe,
  //   Camera,
  //   Video,
  //   Mic,
  //   ImageIcon,
  //   FileText,
  ExternalLink,
  //   Mail,
  //   Phone,
  Award,
  //   Zap,
  TrendingDown,
  Activity,
  BarChart3,
  PieChart,
  Settings,
  RefreshCw,
  //   AlertCircle,
  CheckCircle,
  XCircle,
  //   Info,
} from "lucide-react";
import { lightTheme } from "../../../styles/theme/theme";
import WrapperBox from "../../../components/layout/WrapperBox";

interface Influencer {
  id: string;
  name: string;
  handle: string;
  platform: "instagram" | "youtube" | "tiktok" | "twitter";
  profileImage: string;
  followers: number;
  engagementRate: number;
  location: string;
  category: string;
  applicationDate: string;
  status: "pending" | "accepted" | "rejected";
  pitch: string;
  averageViews: number;
  audienceAge: string;
  audienceGender: string;
  previousBrands: string[];
  rating: number;
  priceRange: string;
  contentTypes: string[];
  languages: string[];
  verified: boolean;
  responseTime: string;
  completionRate: number;
}

interface Campaign {
  id: string;
  title: string;
  status: "live" | "completed" | "draft";
  applicationsCount: number;
  budget: string;
  deadline: string;
  description: string;
  requirements: string[];
  targetAudience: string;
  deliverables: string[];
}

const InfluencerApplications: React.FC = () => {
  const [selectedCampaign] = useState<Campaign>({
    id: "1",
    title: "Summer Fashion Collection Launch",
    status: "live",
    applicationsCount: 47,
    budget: "₹2,50,000",
    deadline: "2025-06-15",
    description:
      "Launch campaign for our new summer collection targeting young fashion enthusiasts",
    requirements: [
      "Fashion/Lifestyle niche",
      "10K+ followers",
      "High engagement rate",
      "Indian audience",
    ],
    targetAudience: "Women aged 18-35 interested in fashion",
    deliverables: ["2 Instagram Posts", "4 Instagram Stories", "1 Reel"],
  });

  const [filters, setFilters] = useState({
    status: "all",
    platform: "all",
    minFollowers: "",
    maxFollowers: "",
    minEngagement: "",
    category: "all",
    location: "all",
    search: "",
  });

  const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [sortBy, setSortBy] = useState<
    "applicationDate" | "followers" | "engagement" | "rating"
  >("applicationDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedInfluencer, setSelectedInfluencer] =
    useState<Influencer | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const mockInfluencers: Influencer[] = [
    {
      id: "1",
      name: "Priya Sharma",
      handle: "@priya_fashion",
      platform: "instagram",
      profileImage: "/placeholder.svg?height=50&width=50",
      followers: 45000,
      engagementRate: 4.8,
      location: "Mumbai, India",
      category: "Fashion & Lifestyle",
      applicationDate: "2025-01-08",
      status: "pending",
      pitch:
        "I love creating authentic fashion content that resonates with young women. My audience trusts my recommendations and I have worked with several fashion brands successfully.",
      averageViews: 12000,
      audienceAge: "18-34 (78%)",
      audienceGender: "Female (85%)",
      previousBrands: ["Zara", "H&M", "Myntra", "Nykaa Fashion"],
      rating: 4.9,
      priceRange: "₹8,000-₹12,000",
      contentTypes: ["Posts", "Stories", "Reels", "IGTV"],
      languages: ["Hindi", "English"],
      verified: true,
      responseTime: "< 2 hours",
      completionRate: 98,
    },
    {
      id: "2",
      name: "Arjun Mehta",
      handle: "@arjun_lifestyle",
      platform: "instagram",
      profileImage: "/placeholder.svg?height=50&width=50",
      followers: 28000,
      engagementRate: 6.2,
      location: "Delhi, India",
      category: "Lifestyle",
      applicationDate: "2025-01-07",
      status: "pending",
      pitch:
        "As a lifestyle influencer, I focus on creating relatable content around fashion, fitness, and daily life. My audience engagement is consistently high.",
      averageViews: 8500,
      audienceAge: "22-35 (82%)",
      audienceGender: "Mixed (60% F, 40% M)",
      previousBrands: ["Nike", "Adidas", "Boat", "OnePlus"],
      rating: 4.7,
      priceRange: "₹5,000-₹8,000",
      contentTypes: ["Posts", "Stories", "Reels"],
      languages: ["Hindi", "English", "Punjabi"],
      verified: false,
      responseTime: "< 4 hours",
      completionRate: 95,
    },
    {
      id: "3",
      name: "Sneha Patel",
      handle: "@sneha_style",
      platform: "instagram",
      profileImage: "/placeholder.svg?height=50&width=50",
      followers: 67000,
      engagementRate: 3.9,
      location: "Bangalore, India",
      category: "Fashion",
      applicationDate: "2025-01-06",
      status: "accepted",
      pitch:
        "Fashion is my passion and I love showcasing different styles to my audience. I have a strong female following who actively engage with fashion content.",
      averageViews: 15000,
      audienceAge: "20-30 (75%)",
      audienceGender: "Female (90%)",
      previousBrands: ["Forever 21", "Shein", "Ajio", "Koovs"],
      rating: 4.8,
      priceRange: "₹10,000-₹15,000",
      contentTypes: ["Posts", "Stories", "Reels", "Live"],
      languages: ["English", "Hindi", "Gujarati"],
      verified: true,
      responseTime: "< 1 hour",
      completionRate: 100,
    },
    {
      id: "4",
      name: "Rahul Singh",
      handle: "@rahul_creates",
      platform: "youtube",
      profileImage: "/placeholder.svg?height=50&width=50",
      followers: 125000,
      engagementRate: 5.4,
      location: "Pune, India",
      category: "Fashion & Tech",
      applicationDate: "2025-01-05",
      status: "rejected",
      pitch:
        "I create detailed review videos and fashion hauls. My audience values honest opinions and detailed product reviews.",
      averageViews: 25000,
      audienceAge: "18-28 (70%)",
      audienceGender: "Mixed (55% F, 45% M)",
      previousBrands: ["Samsung", "Realme", "Flipkart", "Amazon Fashion"],
      rating: 4.6,
      priceRange: "₹15,000-₹25,000",
      contentTypes: ["Videos", "Shorts", "Community Posts"],
      languages: ["Hindi", "English", "Marathi"],
      verified: true,
      responseTime: "< 6 hours",
      completionRate: 92,
    },
    {
      id: "5",
      name: "Kavya Reddy",
      handle: "@kavya_fashion",
      platform: "instagram",
      profileImage: "/placeholder.svg?height=50&width=50",
      followers: 89000,
      engagementRate: 4.2,
      location: "Hyderabad, India",
      category: "Fashion & Beauty",
      applicationDate: "2025-01-04",
      status: "pending",
      pitch:
        "I specialize in affordable fashion and beauty content. My audience loves budget-friendly fashion tips and styling advice.",
      averageViews: 18000,
      audienceAge: "19-32 (80%)",
      audienceGender: "Female (88%)",
      previousBrands: ["Nykaa", "Sugar Cosmetics", "Myntra", "Jabong"],
      rating: 4.5,
      priceRange: "₹12,000-₹18,000",
      contentTypes: ["Posts", "Stories", "Reels", "IGTV"],
      languages: ["Telugu", "Hindi", "English"],
      verified: true,
      responseTime: "< 3 hours",
      completionRate: 96,
    },
  ];

  const filteredInfluencers = useMemo(() => {
    return mockInfluencers
      .filter((influencer) => {
        if (filters.status !== "all" && influencer.status !== filters.status)
          return false;
        if (
          filters.platform !== "all" &&
          influencer.platform !== filters.platform
        )
          return false;
        if (
          filters.category !== "all" &&
          !influencer.category
            .toLowerCase()
            .includes(filters.category.toLowerCase())
        )
          return false;
        if (
          filters.minFollowers &&
          influencer.followers < parseInt(filters.minFollowers)
        )
          return false;
        if (
          filters.maxFollowers &&
          influencer.followers > parseInt(filters.maxFollowers)
        )
          return false;
        if (
          filters.minEngagement &&
          influencer.engagementRate < parseFloat(filters.minEngagement)
        )
          return false;
        if (
          filters.search &&
          !influencer.name
            .toLowerCase()
            .includes(filters.search.toLowerCase()) &&
          !influencer.handle
            .toLowerCase()
            .includes(filters.search.toLowerCase())
        )
          return false;
        return true;
      })
      .sort((a, b) => {
        const aValue = a[sortBy as keyof Influencer];
        const bValue = b[sortBy as keyof Influencer];
        const multiplier = sortOrder === "asc" ? 1 : -1;

        if (typeof aValue === "string" && typeof bValue === "string") {
          return aValue.localeCompare(bValue) * multiplier;
        }
        return ((aValue as number) - (bValue as number)) * multiplier;
      });
  }, [filters, sortBy, sortOrder]);

  const handleInfluencerAction = (
    influencerId: string,
    action: "accept" | "reject"
  ) => {
    console.log(`${action} influencer ${influencerId}`);
    // Implementation for accepting/rejecting influencer
  };

  const handleBulkAction = (action: "accept" | "reject" | "message") => {
    console.log(`Bulk ${action} for influencers:`, selectedInfluencers);
    // Implementation for bulk actions
  };

  const handleViewProfile = (influencer: Influencer) => {
    setSelectedInfluencer(influencer);
    setShowProfileModal(true);
  };

  //   const getStatusColor = (status: string) => {
  //     switch (status) {
  //       case "accepted":
  //         return lightTheme.semanticColors.success;
  //       case "rejected":
  //         return lightTheme.semanticColors.error;
  //       default:
  //         return lightTheme.semanticColors.warning;
  //     }
  //   };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle size={16} />;
      case "rejected":
        return <XCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram size={16} />;
      case "youtube":
        return <Youtube size={16} />;
      default:
        return <Globe size={16} />;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <PageContainer>
      {/* Campaign Header */}
      <WrapperBox themeVariant="grey">
        <CampaignHeader>
          <CampaignInfo>
            <CampaignTitle>{selectedCampaign.title}</CampaignTitle>
            <CampaignMeta>
              <StatusBadge status={selectedCampaign.status}>
                <Activity size={14} />
                {selectedCampaign.status.toUpperCase()}
              </StatusBadge>
              <MetaItem>
                <Users size={16} />
                {selectedCampaign.applicationsCount} Applications
              </MetaItem>
              <MetaItem>
                <DollarSign size={16} />
                Budget: {selectedCampaign.budget}
              </MetaItem>
              <MetaItem>
                <Calendar size={16} />
                Deadline:{" "}
                {new Date(selectedCampaign.deadline).toLocaleDateString()}
              </MetaItem>
            </CampaignMeta>
          </CampaignInfo>
          <CampaignActions>
            <ActionButton variant="secondary">
              <Download size={16} />
              Export Report
            </ActionButton>
            <ActionButton variant="secondary">
              <MessageSquare size={16} />
              Message All
            </ActionButton>
            <ActionButton variant="primary">
              <Eye size={16} />
              View Campaign Brief
            </ActionButton>
          </CampaignActions>
        </CampaignHeader>

        <CampaignDetails>
          <DetailSection>
            <DetailTitle>Campaign Description</DetailTitle>
            <DetailText>{selectedCampaign.description}</DetailText>
          </DetailSection>
          <DetailSection>
            <DetailTitle>Requirements</DetailTitle>
            <RequirementsList>
              {selectedCampaign.requirements.map((req, index) => (
                <RequirementItem key={index}>
                  <CheckCircle size={14} />
                  {req}
                </RequirementItem>
              ))}
            </RequirementsList>
          </DetailSection>
          <DetailSection>
            <DetailTitle>Deliverables</DetailTitle>
            <DeliverablesList>
              {selectedCampaign.deliverables.map((deliverable, index) => (
                <DeliverableItem key={index}>
                  <Target size={14} />
                  {deliverable}
                </DeliverableItem>
              ))}
            </DeliverablesList>
          </DetailSection>
        </CampaignDetails>
      </WrapperBox>

      {/* Quick Filters */}
      <WrapperBox themeVariant="white">
        <QuickFilters>
          <FilterGroup>
            <QuickFilterButton
              active={filters.status === "all"}
              onClick={() => setFilters({ ...filters, status: "all" })}
            >
              All Applications ({mockInfluencers.length})
            </QuickFilterButton>
            <QuickFilterButton
              active={filters.status === "pending"}
              onClick={() => setFilters({ ...filters, status: "pending" })}
            >
              <Clock size={16} />
              Pending (
              {mockInfluencers.filter((i) => i.status === "pending").length})
            </QuickFilterButton>
            <QuickFilterButton
              active={filters.status === "accepted"}
              onClick={() => setFilters({ ...filters, status: "accepted" })}
            >
              <CheckCircle size={16} />
              Accepted (
              {mockInfluencers.filter((i) => i.status === "accepted").length})
            </QuickFilterButton>
            <QuickFilterButton
              active={filters.status === "rejected"}
              onClick={() => setFilters({ ...filters, status: "rejected" })}
            >
              <XCircle size={16} />
              Rejected (
              {mockInfluencers.filter((i) => i.status === "rejected").length})
            </QuickFilterButton>
          </FilterGroup>
          <ViewToggle>
            <ViewButton
              active={viewMode === "table"}
              onClick={() => setViewMode("table")}
            >
              <BarChart3 size={16} />
              Table
            </ViewButton>
            <ViewButton
              active={viewMode === "cards"}
              onClick={() => setViewMode("cards")}
            >
              <PieChart size={16} />
              Cards
            </ViewButton>
          </ViewToggle>
        </QuickFilters>
      </WrapperBox>

      {/* Filters and Search */}
      <WrapperBox themeVariant="white">
        <FiltersContainer>
          <SearchContainer>
            <SearchIcon>
              <Search size={20} />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search by name, handle, or keywords..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </SearchContainer>

          <FiltersRow>
            <FilterSelect
              value={filters.platform}
              onChange={(e) =>
                setFilters({ ...filters, platform: e.target.value })
              }
            >
              <option value="all">All Platforms</option>
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
              <option value="tiktok">TikTok</option>
              <option value="twitter">Twitter</option>
            </FilterSelect>

            <FilterSelect
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
            >
              <option value="all">All Categories</option>
              <option value="fashion">Fashion</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="beauty">Beauty</option>
              <option value="tech">Tech</option>
              <option value="fitness">Fitness</option>
            </FilterSelect>

            <FilterInputGroup>
              <FilterInput
                type="number"
                placeholder="Min followers"
                value={filters.minFollowers}
                onChange={(e) =>
                  setFilters({ ...filters, minFollowers: e.target.value })
                }
              />
              <FilterInput
                type="number"
                placeholder="Max followers"
                value={filters.maxFollowers}
                onChange={(e) =>
                  setFilters({ ...filters, maxFollowers: e.target.value })
                }
              />
            </FilterInputGroup>

            <FilterInput
              type="number"
              step="0.1"
              placeholder="Min engagement %"
              value={filters.minEngagement}
              onChange={(e) =>
                setFilters({ ...filters, minEngagement: e.target.value })
              }
            />

            <SortContainer>
              <SortSelect
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as
                      | "applicationDate"
                      | "followers"
                      | "engagement"
                      | "rating"
                  )
                }
              >
                <option value="applicationDate">Application Date</option>
                <option value="followers">Followers</option>
                <option value="engagement">Engagement Rate</option>
                <option value="rating">Rating</option>
              </SortSelect>
              <SortButton
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
              >
                {sortOrder === "asc" ? (
                  <TrendingUp size={16} />
                ) : (
                  <TrendingDown size={16} />
                )}
              </SortButton>
            </SortContainer>
          </FiltersRow>
        </FiltersContainer>
      </WrapperBox>

      {/* Bulk Actions */}
      {selectedInfluencers.length > 0 && (
        <WrapperBox themeVariant="white">
          <BulkActionsContainer>
            <BulkInfo>
              <CheckCircle size={16} />
              {selectedInfluencers.length} influencer
              {selectedInfluencers.length > 1 ? "s" : ""} selected
            </BulkInfo>
            <BulkActions>
              <BulkActionButton onClick={() => handleBulkAction("accept")}>
                <Check size={16} />
                Accept Selected
              </BulkActionButton>
              <BulkActionButton onClick={() => handleBulkAction("reject")}>
                <X size={16} />
                Reject Selected
              </BulkActionButton>
              <BulkActionButton onClick={() => handleBulkAction("message")}>
                <MessageSquare size={16} />
                Message Selected
              </BulkActionButton>
            </BulkActions>
          </BulkActionsContainer>
        </WrapperBox>
      )}

      {/* Applications List */}
      <WrapperBox themeVariant="grey">
        <ApplicationsHeader>
          <ApplicationsTitle>
            Applications ({filteredInfluencers.length})
          </ApplicationsTitle>
          <ApplicationsActions>
            <ActionButton variant="secondary">
              <RefreshCw size={16} />
              Refresh
            </ActionButton>
            <ActionButton variant="secondary">
              <Settings size={16} />
              Customize View
            </ActionButton>
          </ApplicationsActions>
        </ApplicationsHeader>

        {viewMode === "table" ? (
          <ApplicationsTable>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedInfluencers(
                          filteredInfluencers.map((i) => i.id)
                        );
                      } else {
                        setSelectedInfluencers([]);
                      }
                    }}
                  />
                </TableHeaderCell>
                <TableHeaderCell>Influencer</TableHeaderCell>
                <TableHeaderCell>Platform</TableHeaderCell>
                <TableHeaderCell>Followers</TableHeaderCell>
                <TableHeaderCell>Engagement</TableHeaderCell>
                <TableHeaderCell>Location</TableHeaderCell>
                <TableHeaderCell>Applied</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInfluencers.map((influencer) => (
                <TableRow key={influencer.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedInfluencers.includes(influencer.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedInfluencers([
                            ...selectedInfluencers,
                            influencer.id,
                          ]);
                        } else {
                          setSelectedInfluencers(
                            selectedInfluencers.filter(
                              (id) => id !== influencer.id
                            )
                          );
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <InfluencerInfo>
                      <InfluencerAvatar
                        src={influencer.profileImage}
                        alt={influencer.name}
                      />
                      <InfluencerDetails>
                        <InfluencerName>
                          {influencer.name}
                          {influencer.verified && (
                            <VerifiedBadge>
                              <Award size={12} />
                            </VerifiedBadge>
                          )}
                        </InfluencerName>
                        <InfluencerHandle>{influencer.handle}</InfluencerHandle>
                        <InfluencerCategory>
                          {influencer.category}
                        </InfluencerCategory>
                      </InfluencerDetails>
                    </InfluencerInfo>
                  </TableCell>
                  <TableCell>
                    <PlatformBadge>
                      {getPlatformIcon(influencer.platform)}
                      {influencer.platform}
                    </PlatformBadge>
                  </TableCell>
                  <TableCell>
                    <MetricValue>
                      {formatNumber(influencer.followers)}
                    </MetricValue>
                  </TableCell>
                  <TableCell>
                    <EngagementRate rate={influencer.engagementRate}>
                      {influencer.engagementRate}%
                    </EngagementRate>
                  </TableCell>
                  <TableCell>
                    <LocationText>
                      <MapPin size={14} />
                      {influencer.location}
                    </LocationText>
                  </TableCell>
                  <TableCell>
                    <DateText>
                      {new Date(
                        influencer.applicationDate
                      ).toLocaleDateString()}
                    </DateText>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={influencer.status}>
                      {getStatusIcon(influencer.status)}
                      {influencer.status}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <ActionsContainer>
                      {/* <ActionButton
                        variant="secondary"
                        size="sm"
                        onClick={() => handleViewProfile(influencer)}
                      >
                        <Eye size={14} />
                        View
                      </ActionButton> */}
                      {/* {influencer.status === "pending" && (
                        <>
                          <ActionButton
                            variant="success"
                            size="sm"
                            onClick={() =>
                              handleInfluencerAction(influencer.id, "accept")
                            }
                          >
                            <Check size={14} />
                            Accept
                          </ActionButton>
                          <ActionButton
                            variant="danger"
                            size="sm"
                            onClick={() =>
                              handleInfluencerAction(influencer.id, "reject")
                            }
                          >
                            <X size={14} />
                            Reject
                          </ActionButton>
                        </>
                      )} */}
                      <MoreButton>
                        <MoreHorizontal size={14} />
                      </MoreButton>
                    </ActionsContainer>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </ApplicationsTable>
        ) : (
          <CardsGrid>
            {filteredInfluencers.map((influencer) => (
              <InfluencerCard key={influencer.id}>
                <CardHeader>
                  <CardCheckbox>
                    <input
                      type="checkbox"
                      checked={selectedInfluencers.includes(influencer.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedInfluencers([
                            ...selectedInfluencers,
                            influencer.id,
                          ]);
                        } else {
                          setSelectedInfluencers(
                            selectedInfluencers.filter(
                              (id) => id !== influencer.id
                            )
                          );
                        }
                      }}
                    />
                  </CardCheckbox>
                  <StatusBadge status={influencer.status}>
                    {getStatusIcon(influencer.status)}
                    {influencer.status}
                  </StatusBadge>
                </CardHeader>

                <CardContent>
                  <InfluencerInfo>
                    <InfluencerAvatar
                      src={influencer.profileImage}
                      alt={influencer.name}
                    />
                    <InfluencerDetails>
                      <InfluencerName>
                        {influencer.name}
                        {influencer.verified && (
                          <VerifiedBadge>
                            <Award size={12} />
                          </VerifiedBadge>
                        )}
                      </InfluencerName>
                      <InfluencerHandle>{influencer.handle}</InfluencerHandle>
                      <PlatformBadge>
                        {getPlatformIcon(influencer.platform)}
                        {influencer.platform}
                      </PlatformBadge>
                    </InfluencerDetails>
                  </InfluencerInfo>

                  <MetricsGrid>
                    <MetricItem>
                      <MetricLabel>Followers</MetricLabel>
                      <MetricValue>
                        {formatNumber(influencer.followers)}
                      </MetricValue>
                    </MetricItem>
                    <MetricItem>
                      <MetricLabel>Engagement</MetricLabel>
                      <EngagementRate rate={influencer.engagementRate}>
                        {influencer.engagementRate}%
                      </EngagementRate>
                    </MetricItem>
                    <MetricItem>
                      <MetricLabel>Rating</MetricLabel>
                      <RatingContainer>
                        <Star
                          size={14}
                          fill={lightTheme.semanticColors.warning}
                          color={lightTheme.semanticColors.warning}
                        />
                        {influencer.rating}
                      </RatingContainer>
                    </MetricItem>
                    <MetricItem>
                      <MetricLabel>Price Range</MetricLabel>
                      <MetricValue>{influencer.priceRange}</MetricValue>
                    </MetricItem>
                  </MetricsGrid>

                  <LocationText>
                    <MapPin size={14} />
                    {influencer.location}
                  </LocationText>

                  <PitchText>{influencer.pitch}</PitchText>

                  <TagsContainer>
                    {influencer.contentTypes.slice(0, 3).map((type, index) => (
                      <Tag key={index}>{type}</Tag>
                    ))}
                    {influencer.contentTypes.length > 3 && (
                      <Tag>+{influencer.contentTypes.length - 3} more</Tag>
                    )}
                  </TagsContainer>
                </CardContent>

                <CardFooter>
                  <CardActions>
                    <ActionButton
                      variant="secondary"
                      size="sm"
                      onClick={() => handleViewProfile(influencer)}
                    >
                      <Eye size={14} />
                      View Profile
                    </ActionButton>
                    {influencer.status === "pending" && (
                      <>
                        <ActionButton
                          variant="success"
                          size="sm"
                          onClick={() =>
                            handleInfluencerAction(influencer.id, "accept")
                          }
                        >
                          <Check size={14} />
                          Accept
                        </ActionButton>
                        <ActionButton
                          variant="danger"
                          size="sm"
                          onClick={() =>
                            handleInfluencerAction(influencer.id, "reject")
                          }
                        >
                          <X size={14} />
                          Reject
                        </ActionButton>
                      </>
                    )}
                  </CardActions>
                  <DateText>
                    Applied:{" "}
                    {new Date(influencer.applicationDate).toLocaleDateString()}
                  </DateText>
                </CardFooter>
              </InfluencerCard>
            ))}
          </CardsGrid>
        )}
      </WrapperBox>

      {/* Profile Modal */}
      {showProfileModal && selectedInfluencer && (
        <ModalOverlay onClick={() => setShowProfileModal(false)}>
          <ProfileModal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Influencer Profile</ModalTitle>
              <CloseButton onClick={() => setShowProfileModal(false)}>
                <X size={20} />
              </CloseButton>
            </ModalHeader>

            <ModalContent>
              <ProfileSection>
                <ProfileHeader>
                  <InfluencerAvatar
                    src={selectedInfluencer.profileImage}
                    alt={selectedInfluencer.name}
                    style={{ width: "80px", height: "80px" }}
                  />
                  <ProfileInfo>
                    <InfluencerName
                      style={{ fontSize: lightTheme.typography.fontSizes.xl }}
                    >
                      {selectedInfluencer.name}
                      {selectedInfluencer.verified && (
                        <VerifiedBadge>
                          <Award size={16} />
                        </VerifiedBadge>
                      )}
                    </InfluencerName>
                    <InfluencerHandle
                      style={{ fontSize: lightTheme.typography.fontSizes.lg }}
                    >
                      {selectedInfluencer.handle}
                    </InfluencerHandle>
                    <PlatformBadge>
                      {getPlatformIcon(selectedInfluencer.platform)}
                      {selectedInfluencer.platform}
                    </PlatformBadge>
                    <LocationText>
                      <MapPin size={16} />
                      {selectedInfluencer.location}
                    </LocationText>
                  </ProfileInfo>
                  <ProfileActions>
                    <ActionButton variant="primary">
                      <MessageSquare size={16} />
                      Message
                    </ActionButton>
                    <ActionButton variant="secondary">
                      <ExternalLink size={16} />
                      View Profile
                    </ActionButton>
                  </ProfileActions>
                </ProfileHeader>

                <ProfileStats>
                  <StatCard>
                    <StatValue>
                      {formatNumber(selectedInfluencer.followers)}
                    </StatValue>
                    <StatLabel>Followers</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatValue>{selectedInfluencer.engagementRate}%</StatValue>
                    <StatLabel>Engagement Rate</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatValue>
                      {formatNumber(selectedInfluencer.averageViews)}
                    </StatValue>
                    <StatLabel>Avg. Views</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatValue>
                      <Star
                        size={16}
                        fill={lightTheme.semanticColors.warning}
                        color={lightTheme.semanticColors.warning}
                      />
                      {selectedInfluencer.rating}
                    </StatValue>
                    <StatLabel>Rating</StatLabel>
                  </StatCard>
                </ProfileStats>
              </ProfileSection>

              <ProfileDetails>
                <DetailSection>
                  <DetailTitle>Application Pitch</DetailTitle>
                  <DetailText>{selectedInfluencer.pitch}</DetailText>
                </DetailSection>

                <DetailSection>
                  <DetailTitle>Audience Demographics</DetailTitle>
                  <DemographicsGrid>
                    <DemographicItem>
                      <DemographicLabel>Age Distribution</DemographicLabel>
                      <DemographicValue>
                        {selectedInfluencer.audienceAge}
                      </DemographicValue>
                    </DemographicItem>
                    <DemographicItem>
                      <DemographicLabel>Gender Split</DemographicLabel>
                      <DemographicValue>
                        {selectedInfluencer.audienceGender}
                      </DemographicValue>
                    </DemographicItem>
                  </DemographicsGrid>
                </DetailSection>

                <DetailSection>
                  <DetailTitle>Content Types</DetailTitle>
                  <TagsContainer>
                    {selectedInfluencer.contentTypes.map((type, index) => (
                      <Tag key={index}>{type}</Tag>
                    ))}
                  </TagsContainer>
                </DetailSection>

                <DetailSection>
                  <DetailTitle>Languages</DetailTitle>
                  <TagsContainer>
                    {selectedInfluencer.languages.map((lang, index) => (
                      <Tag key={index}>{lang}</Tag>
                    ))}
                  </TagsContainer>
                </DetailSection>

                <DetailSection>
                  <DetailTitle>Previous Brand Collaborations</DetailTitle>
                  <BrandsList>
                    {selectedInfluencer.previousBrands.map((brand, index) => (
                      <BrandItem key={index}>
                        <Award size={14} />
                        {brand}
                      </BrandItem>
                    ))}
                  </BrandsList>
                </DetailSection>

                <DetailSection>
                  <DetailTitle>Performance Metrics</DetailTitle>
                  <MetricsGrid>
                    <MetricItem>
                      <MetricLabel>Response Time</MetricLabel>
                      <MetricValue>
                        {selectedInfluencer.responseTime}
                      </MetricValue>
                    </MetricItem>
                    <MetricItem>
                      <MetricLabel>Completion Rate</MetricLabel>
                      <MetricValue>
                        {selectedInfluencer.completionRate}%
                      </MetricValue>
                    </MetricItem>
                    <MetricItem>
                      <MetricLabel>Price Range</MetricLabel>
                      <MetricValue>{selectedInfluencer.priceRange}</MetricValue>
                    </MetricItem>
                  </MetricsGrid>
                </DetailSection>
              </ProfileDetails>
            </ModalContent>

            <ModalFooter>
              {selectedInfluencer.status === "pending" && (
                <>
                  <ActionButton
                    variant="success"
                    onClick={() => {
                      handleInfluencerAction(selectedInfluencer.id, "accept");
                      setShowProfileModal(false);
                    }}
                  >
                    <Check size={16} />
                    Accept Application
                  </ActionButton>
                  <ActionButton
                    variant="danger"
                    onClick={() => {
                      handleInfluencerAction(selectedInfluencer.id, "reject");
                      setShowProfileModal(false);
                    }}
                  >
                    <X size={16} />
                    Reject Application
                  </ActionButton>
                </>
              )}
              <ActionButton variant="secondary">
                <Bookmark size={16} />
                Save for Later
              </ActionButton>
            </ModalFooter>
          </ProfileModal>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default InfluencerApplications;

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 20px;
`;

const CampaignHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const CampaignInfo = styled.div`
  flex: 1;
`;

const CampaignTitle = styled.h1`
  font-size: ${lightTheme.typography.fontSizes.xxxl};
  font-weight: ${lightTheme.typography.fontWeights.bold};
  color: ${lightTheme.colors.textPrimary};
  margin-bottom: 0.5rem;
`;

const CampaignMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${lightTheme.colors.textSecondary};
  font-size: ${lightTheme.typography.fontSizes.sm};
`;

const StatusBadge = styled.div<{ status: string }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: ${lightTheme.borderRadius.full};
  font-size: ${lightTheme.typography.fontSizes.xs};
  font-weight: ${lightTheme.typography.fontWeights.medium};
  text-transform: capitalize;

  background-color: ${({ status }) => {
    switch (status) {
      case "live":
        return "#ECFDF5";
      case "accepted":
        return "#ECFDF5";
      case "rejected":
        return "#FEF2F2";
      case "pending":
        return "#FFFBEB";
      default:
        return "#F3F4F6";
    }
  }};

  color: ${({ status }) => {
    switch (status) {
      case "live":
        return lightTheme.semanticColors.success;
      case "accepted":
        return lightTheme.semanticColors.success;
      case "rejected":
        return lightTheme.semanticColors.error;
      case "pending":
        return lightTheme.semanticColors.warning;
      default:
        return lightTheme.colors.textSecondary;
    }
  }};
`;

const CampaignActions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button<{
  variant?: "primary" | "secondary" | "success" | "danger";
  size?: "sm" | "md" | "lg";
}>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: ${({ size }) => {
    switch (size) {
      case "sm":
        return "0.5rem 0.75rem";
      case "lg":
        return "0.75rem 1.5rem";
      default:
        return "0.625rem 1rem";
    }
  }};
  border: none;
  border-radius: ${lightTheme.borderRadius.md};
  font-size: ${lightTheme.typography.fontSizes.sm};
  font-weight: ${lightTheme.typography.fontWeights.medium};
  cursor: pointer;
  transition: ${lightTheme.transitions.fast};

  background-color: ${({ variant }) => {
    switch (variant) {
      case "primary":
        return lightTheme.colors.primary;
      case "success":
        return lightTheme.semanticColors.success;
      case "danger":
        return lightTheme.semanticColors.error;
      default:
        return lightTheme.colors.surface;
    }
  }};

  color: ${({ variant }) => {
    switch (variant) {
      case "primary":
      case "success":
      case "danger":
        return "#FFFFFF";
      default:
        return lightTheme.colors.textPrimary;
    }
  }};

  border: ${({ variant }) =>
    variant === "secondary" ? `1px solid ${lightTheme.colors.border}` : "none"};

  &:hover {
    transform: translateY(-1px);
    /* box-shadow: ${lightTheme.shadows.md}; */

    background-color: ${({ variant }) => {
      switch (variant) {
        case "primary":
          return lightTheme.colors.primaryDark;
        case "success":
          return "#047857";
        case "danger":
          return "#991B1B";
        default:
          return lightTheme.colors.border;
      }
    }};
  }

  &:active {
    transform: translateY(0);
  }
`;

const CampaignDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DetailTitle = styled.h3`
  font-size: ${lightTheme.typography.fontSizes.lg};
  font-weight: ${lightTheme.typography.fontWeights.semibold};
  color: ${lightTheme.colors.textPrimary};
`;

const DetailText = styled.p`
  color: ${lightTheme.colors.textSecondary};
  line-height: ${lightTheme.typography.lineHeights.md};
`;

const RequirementsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const RequirementItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${lightTheme.colors.textSecondary};
  font-size: ${lightTheme.typography.fontSizes.sm};

  svg {
    color: ${lightTheme.semanticColors.success};
    flex-shrink: 0;
  }
`;

const DeliverablesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DeliverableItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${lightTheme.colors.textSecondary};
  font-size: ${lightTheme.typography.fontSizes.sm};

  svg {
    color: ${lightTheme.colors.primary};
    flex-shrink: 0;
  }
`;

const QuickFilters = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const QuickFilterButton = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid
    ${({ active }) =>
      active ? lightTheme.colors.primary : lightTheme.colors.border};
  border-radius: ${lightTheme.borderRadius.md};
  background-color: ${({ active }) =>
    active ? lightTheme.colors.primary : "transparent"};
  color: ${({ active }) =>
    active ? "#FFFFFF" : lightTheme.colors.textPrimary};
  font-size: ${lightTheme.typography.fontSizes.sm};
  font-weight: ${lightTheme.typography.fontWeights.medium};
  cursor: pointer;
  transition: ${lightTheme.transitions.fast};

  &:hover {
    background-color: ${({ active }) =>
      active ? lightTheme.colors.primaryDark : lightTheme.colors.surface};
  }
`;

const ViewToggle = styled.div`
  display: flex;
  border: 1px solid ${lightTheme.colors.border};
  border-radius: ${lightTheme.borderRadius.md};
  overflow: hidden;
`;

const ViewButton = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  background-color: ${({ active }) =>
    active ? lightTheme.colors.primary : "transparent"};
  color: ${({ active }) =>
    active ? "#FFFFFF" : lightTheme.colors.textPrimary};
  font-size: ${lightTheme.typography.fontSizes.sm};
  font-weight: ${lightTheme.typography.fontWeights.medium};
  cursor: pointer;
  transition: ${lightTheme.transitions.fast};

  &:hover {
    background-color: ${({ active }) =>
      active ? lightTheme.colors.primaryDark : lightTheme.colors.surface};
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${lightTheme.colors.textSecondary};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid ${lightTheme.colors.border};
  border-radius: ${lightTheme.borderRadius.md};
  font-size: ${lightTheme.typography.fontSizes.md};
  background-color: ${lightTheme.colors.background};
  transition: ${lightTheme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${lightTheme.colors.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: ${lightTheme.colors.textSecondary};
  }
`;

const FiltersRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
`;

const FilterSelect = styled.select`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${lightTheme.colors.border};
  border-radius: ${lightTheme.borderRadius.md};
  font-size: ${lightTheme.typography.fontSizes.sm};
  background-color: ${lightTheme.colors.background};
  cursor: pointer;
  transition: ${lightTheme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${lightTheme.colors.primary};
  }
`;

const FilterInputGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const FilterInput = styled.input`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${lightTheme.colors.border};
  border-radius: ${lightTheme.borderRadius.md};
  font-size: ${lightTheme.typography.fontSizes.sm};
  background-color: ${lightTheme.colors.background};
  width: 120px;
  transition: ${lightTheme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${lightTheme.colors.primary};
  }

  &::placeholder {
    color: ${lightTheme.colors.textSecondary};
  }
`;

const SortContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const SortSelect = styled.select`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${lightTheme.colors.border};
  border-radius: ${lightTheme.borderRadius.md};
  font-size: ${lightTheme.typography.fontSizes.sm};
  background-color: ${lightTheme.colors.background};
  cursor: pointer;
  transition: ${lightTheme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${lightTheme.colors.primary};
  }
`;

const SortButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: 1px solid ${lightTheme.colors.border};
  border-radius: ${lightTheme.borderRadius.md};
  background-color: ${lightTheme.colors.background};
  cursor: pointer;
  transition: ${lightTheme.transitions.fast};

  &:hover {
    background-color: ${lightTheme.colors.surface};
  }
`;

const BulkActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #eff6ff;
  border: 1px solid ${lightTheme.colors.primary};
  border-radius: ${lightTheme.borderRadius.md};
`;

const BulkInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${lightTheme.colors.primary};
  font-weight: ${lightTheme.typography.fontWeights.medium};
`;

const BulkActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const BulkActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid ${lightTheme.colors.primary};
  border-radius: ${lightTheme.borderRadius.md};
  background-color: ${lightTheme.colors.background};
  color: ${lightTheme.colors.primary};
  font-size: ${lightTheme.typography.fontSizes.sm};
  font-weight: ${lightTheme.typography.fontWeights.medium};
  cursor: pointer;
  transition: ${lightTheme.transitions.fast};

  &:hover {
    background-color: ${lightTheme.colors.primary};
    color: #ffffff;
  }
`;

const ApplicationsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ApplicationsTitle = styled.h2`
  font-size: ${lightTheme.typography.fontSizes.xl};
  font-weight: ${lightTheme.typography.fontWeights.bold};
  color: ${lightTheme.colors.textPrimary};
`;

const ApplicationsActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ApplicationsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${lightTheme.colors.background};
  border-radius: ${lightTheme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${lightTheme.shadows.sm};
`;

const TableHeader = styled.thead`
  background-color: ${lightTheme.colors.surface};
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid ${lightTheme.colors.border};
  transition: ${lightTheme.transitions.fast};

  &:hover {
    background-color: ${lightTheme.colors.surface};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: ${lightTheme.typography.fontWeights.semibold};
  color: ${lightTheme.colors.textPrimary};
  font-size: ${lightTheme.typography.fontSizes.sm};
`;

const TableCell = styled.td`
  padding: 1rem;
  vertical-align: middle;
`;

const InfluencerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const InfluencerAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: ${lightTheme.borderRadius.full};
  object-fit: cover;
  border: 2px solid ${lightTheme.colors.border};
`;

const InfluencerDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const InfluencerName = styled.div`
  font-weight: ${lightTheme.typography.fontWeights.semibold};
  color: ${lightTheme.colors.textPrimary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InfluencerHandle = styled.div`
  font-size: ${lightTheme.typography.fontSizes.sm};
  color: ${lightTheme.colors.textSecondary};
`;

const InfluencerCategory = styled.div`
  font-size: ${lightTheme.typography.fontSizes.xs};
  color: ${lightTheme.colors.textSecondary};
`;

const VerifiedBadge = styled.span`
  color: ${lightTheme.colors.primary};
`;

const PlatformBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background-color: ${lightTheme.colors.surface};
  border-radius: ${lightTheme.borderRadius.sm};
  font-size: ${lightTheme.typography.fontSizes.xs};
  font-weight: ${lightTheme.typography.fontWeights.medium};
  text-transform: capitalize;
`;

const MetricValue = styled.div`
  font-weight: ${lightTheme.typography.fontWeights.semibold};
  color: ${lightTheme.colors.textPrimary};
`;

const EngagementRate = styled.div<{ rate: number }>`
  font-weight: ${lightTheme.typography.fontWeights.semibold};
  color: ${({ rate }) => {
    if (rate >= 5) return lightTheme.semanticColors.success;
    if (rate >= 3) return lightTheme.semanticColors.warning;
    return lightTheme.semanticColors.error;
  }};
`;

const LocationText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${lightTheme.typography.fontSizes.sm};
  color: ${lightTheme.colors.textSecondary};
`;

const DateText = styled.div`
  font-size: ${lightTheme.typography.fontSizes.sm};
  color: ${lightTheme.colors.textSecondary};
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const MoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: none;
  background-color: transparent;
  color: ${lightTheme.colors.textSecondary};
  cursor: pointer;
  border-radius: ${lightTheme.borderRadius.sm};
  transition: ${lightTheme.transitions.fast};

  &:hover {
    background-color: ${lightTheme.colors.surface};
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const InfluencerCard = styled.div`
  background-color: ${lightTheme.colors.background};
  border: 1px solid ${lightTheme.colors.border};
  border-radius: ${lightTheme.borderRadius.lg};
  padding: 1.5rem;
  transition: ${lightTheme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${lightTheme.shadows.lg};
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CardCheckbox = styled.div``;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MetricsGrid = styled.div`
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
  font-size: ${lightTheme.typography.fontSizes.xs};
  color: ${lightTheme.colors.textSecondary};
  text-transform: uppercase;
  font-weight: ${lightTheme.typography.fontWeights.medium};
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: ${lightTheme.typography.fontWeights.semibold};
`;

const PitchText = styled.p`
  font-size: ${lightTheme.typography.fontSizes.sm};
  color: ${lightTheme.colors.textSecondary};
  line-height: ${lightTheme.typography.lineHeights.md};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  padding: 0.25rem 0.5rem;
  background-color: ${lightTheme.colors.surface};
  border-radius: ${lightTheme.borderRadius.sm};
  font-size: ${lightTheme.typography.fontSizes.xs};
  color: ${lightTheme.colors.textSecondary};
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${lightTheme.colors.border};
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${lightTheme.zIndex.modal};
  padding: 1rem;
`;

const ProfileModal = styled.div`
  background-color: ${lightTheme.colors.background};
  border-radius: ${lightTheme.borderRadius.lg};
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${lightTheme.shadows.xxl};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid ${lightTheme.colors.border};
`;

const ModalTitle = styled.h2`
  font-size: ${lightTheme.typography.fontSizes.xl};
  font-weight: ${lightTheme.typography.fontWeights.bold};
  color: ${lightTheme.colors.textPrimary};
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: none;
  background-color: transparent;
  color: ${lightTheme.colors.textSecondary};
  cursor: pointer;
  border-radius: ${lightTheme.borderRadius.sm};
  transition: ${lightTheme.transitions.fast};

  &:hover {
    background-color: ${lightTheme.colors.surface};
  }
`;

const ModalContent = styled.div`
  padding: 1.5rem;
`;

const ProfileSection = styled.div`
  margin-bottom: 2rem;
`;

const ProfileHeader = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProfileActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const ProfileStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
`;

const StatCard = styled.div`
  text-align: center;
  padding: 1rem;
  background-color: ${lightTheme.colors.surface};
  border-radius: ${lightTheme.borderRadius.md};
`;

const StatValue = styled.div`
  font-size: ${lightTheme.typography.fontSizes.xl};
  font-weight: ${lightTheme.typography.fontWeights.bold};
  color: ${lightTheme.colors.textPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: ${lightTheme.typography.fontSizes.sm};
  color: ${lightTheme.colors.textSecondary};
  margin-top: 0.25rem;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const DemographicsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const DemographicItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const DemographicLabel = styled.div`
  font-size: ${lightTheme.typography.fontSizes.sm};
  color: ${lightTheme.colors.textSecondary};
  font-weight: ${lightTheme.typography.fontWeights.medium};
`;

const DemographicValue = styled.div`
  font-weight: ${lightTheme.typography.fontWeights.semibold};
  color: ${lightTheme.colors.textPrimary};
`;

const BrandsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const BrandItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: ${lightTheme.colors.surface};
  border-radius: ${lightTheme.borderRadius.sm};
  font-size: ${lightTheme.typography.fontSizes.sm};
`;

const ModalFooter = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid ${lightTheme.colors.border};
  flex-wrap: wrap;
`;
