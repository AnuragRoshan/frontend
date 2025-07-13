// pages/brand/campaign/InfluencerDiscovery/InfluencerDiscoveryPage.tsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  ArrowLeft,
  Users,
  DollarSign,
  TrendingUp,
  MapPin,
  Hash,
  Eye,
  Star,
  Check,
  HandCoins,
  ChartNetwork,
  CheckCheck,
} from "lucide-react";
import { sharedTheme } from "../../../../../styles/theme/theme";
import ActionButton from "../shared/ActionButton";

// Types
interface Campaign {
  id: string;
  name: string;
  description: string;
  budget: number;
  spent: number;
  category: string;
  platform: string;
  hashtags: string[];
  startDate: string;
  endDate: string;
}

interface Influencer {
  id: string;
  username: string;
  displayName: string;
  profileImage: string;
  followers: number;
  engagementRate: number;
  location: string;
  category: string;
  bio: string;
  averageViews: number;
  rating: number;
  reviewCount: number;
  suggestedRate: number;
  isVerified: boolean;
  recentContent: string[];
}

// interface FilterState {
//   location: string[];
//   followers: { min: number; max: number };
//   engagement: number;
//   category: string[];
//   priceRange: { min: number; max: number };
// }

const InfluencerDiscoveryPage: React.FC = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const navigate = useNavigate();

  // State
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  // const [filters, setFilters] = useState<FilterState>({
  //   location: [],
  //   followers: { min: 0, max: 1000000 },
  //   engagement: 0,
  //   category: [],
  //   priceRange: { min: 0, max: 100000 },
  // });

  // Mock campaign data - replace with actual API call
  useEffect(() => {
    if (campaignId) {
      // Simulate API call
      const mockCampaign: Campaign = {
        id: campaignId,
        name: "Summer Fashion Collection 2024",
        description:
          "Launch our new summer collection with fashion influencers",
        budget: 500000,
        spent: 0,
        category: "Fashion",
        platform: "Instagram",
        hashtags: ["#SummerFashion", "#StyleHub", "#OOTD"],
        startDate: "2024-07-01",
        endDate: "2024-08-31",
      };
      setCampaign(mockCampaign);
    }
  }, [campaignId]);

  // Mock influencer data
  const mockInfluencers: Influencer[] = [
    {
      id: "inf_1",
      username: "@fashionista_priya",
      displayName: "Priya Sharma",
      profileImage:
        "https://images.unsplash.com/photo-1494790108755-2616b332c2a2?w=150",
      followers: 45000,
      engagementRate: 4.2,
      location: "Mumbai",
      category: "Fashion",
      bio: "Fashion blogger & style enthusiast. Sustainable fashion advocate.",
      averageViews: 12000,
      rating: 4.8,
      reviewCount: 47,
      suggestedRate: 12000,
      isVerified: true,
      recentContent: [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100",
      ],
    },
    {
      id: "inf_2",
      username: "@style_with_riya",
      displayName: "Riya Patel",
      profileImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      followers: 28000,
      engagementRate: 5.1,
      location: "Delhi",
      category: "Fashion",
      bio: "Style tips for the modern woman. Affordable fashion finds.",
      averageViews: 8500,
      rating: 4.6,
      reviewCount: 23,
      suggestedRate: 8000,
      isVerified: false,
      recentContent: [
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=100",
      ],
    },
    {
      id: "inf_3",
      username: "@mumbai_fashion",
      displayName: "Fashion Mumbai",
      profileImage:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150",
      followers: 85000,
      engagementRate: 3.8,
      location: "Mumbai",
      category: "Fashion",
      bio: "Mumbai's fashion scene. Street style to runway trends.",
      averageViews: 25000,
      rating: 4.9,
      reviewCount: 89,
      suggestedRate: 20000,
      isVerified: true,
      recentContent: [
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=100",
      ],
    },
    {
      id: "inf_4",
      username: "@delhi_style",
      displayName: "Delhi Style",
      profileImage:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=150",
      followers: 60000,
      engagementRate: 4.5,
      location: "Delhi",
      category: "Fashion",
      bio: "Exploring Delhi's fashion trends. From street style to high fashion.",
      averageViews: 18000,
      rating: 4.7,
      reviewCount: 34,
      suggestedRate: 15000,
      isVerified: false,
      recentContent: [
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=100",
      ],
    },

    {
      id: "inf_5",
      username: "@fashionista_alia",
      displayName: "Alia Khan",
      profileImage:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=150",
      followers: 120000,
      engagementRate: 6.2,
      location: "Bangalore",
      category: "Fashion",
      bio: "Fashion influencer & stylist. Passionate about sustainable fashion.",
      averageViews: 35000,
      rating: 4.9,
      reviewCount: 120,
      suggestedRate: 30000,
      isVerified: true,
      recentContent: [
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=100",
      ],
    },
  ];

  // Handlers
  const handleBack = () => {
    navigate("/brand/campaigns");
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleInfluencerSelect = (influencerId: string) => {
    setSelectedInfluencers((prev) =>
      prev.includes(influencerId)
        ? prev.filter((id) => id !== influencerId)
        : [...prev, influencerId]
    );
  };

  const handleBulkDeals = () => {
    console.log("Navigate to Bulk Deals with:", selectedInfluencers);
    navigate(`/bulk-deal/:campaignId`);
  };

  const handleCustomDeals = () => {
    console.log("Navigate to Custom Deals with:", selectedInfluencers);
    navigate(`/custom-deal/:campaignId`);
  };

  const handleBrowseAll = () => {
    console.log("Navigate to Browse All Influencers");
    // navigate(`/brand/campaigns/${campaignId}/browse-influencers`);
  };

  // Calculate totals
  const selectedInfluencerData = mockInfluencers.filter((inf) =>
    selectedInfluencers.includes(inf.id)
  );

  const totalEstimatedCost = selectedInfluencerData.reduce(
    (sum, inf) => sum + inf.suggestedRate,
    0
  );

  const totalEstimatedReach = selectedInfluencerData.reduce(
    (sum, inf) => sum + inf.followers,
    0
  );

  const remainingBudget = campaign ? campaign.budget - campaign.spent : 0;

  if (!campaign) {
    return (
      <LoadingContainer>
        <div>Loading campaign...</div>
      </LoadingContainer>
    );
  }

  return (
    <PageContainer>
      {/* Header */}
      <PageHeader>
        <BackButton onClick={handleBack}>
          <ArrowLeft size={20} />
          Back to Campaigns
        </BackButton>

        <HeaderContent>
          <CampaignTitle>🔍 Find Influencers</CampaignTitle>
          <CampaignSubtitle>for "{campaign.name}"</CampaignSubtitle>

          <CampaignMetrics>
            <MetricCard>
              <MetricIcon>
                <DollarSign size={20} />
              </MetricIcon>
              <MetricContent>
                <MetricLabel>Campaign Budget</MetricLabel>
                <MetricValue>
                  ₹{remainingBudget.toLocaleString()} remaining
                </MetricValue>
              </MetricContent>
            </MetricCard>

            <MetricCard>
              <MetricIcon>
                <TrendingUp size={20} />
              </MetricIcon>
              <MetricContent>
                <MetricLabel>Estimated Reach</MetricLabel>
                <MetricValue>
                  {totalEstimatedReach.toLocaleString()} / 500K
                </MetricValue>
              </MetricContent>
            </MetricCard>
          </CampaignMetrics>
        </HeaderContent>
      </PageHeader>

      {/* Search & Filters */}
      <SearchSection>
        <SearchContainer>
          <SearchInput>
            <Search size={20} />
            <input
              type="text"
              placeholder="Search influencers by name, category, or location..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </SearchInput>
        </SearchContainer>

        <QuickFilters>
          <FilterButton
            active={false}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            Filters
          </FilterButton>
          <FilterButton active={false}>
            <MapPin size={16} />
            Location
          </FilterButton>
          <FilterButton active={false}>
            <Users size={16} />
            Followers
          </FilterButton>
          <FilterButton active={false}>
            <Hash size={16} />
            Category
          </FilterButton>
        </QuickFilters>
      </SearchSection>

      {/* Selected Influencers Section */}
      {selectedInfluencers.length > 0 && (
        <SelectedSection>
          <SelectedHeader>
            <SelectedTitle>
              <div style={{ color: sharedTheme.colorVariants.primary.darker }}>
                <CheckCheck />
              </div>
              <div>
                {selectedInfluencers.length} Influencer
                {selectedInfluencers.length > 1 ? "s" : ""} Selected
              </div>
            </SelectedTitle>
            <SelectedMetrics>
              <span>
                <HandCoins /> Est. Cost: ₹{totalEstimatedCost.toLocaleString()}
              </span>
              <span>
                <ChartNetwork /> Est. Reach:{" "}
                {totalEstimatedReach.toLocaleString()}
              </span>
            </SelectedMetrics>
          </SelectedHeader>

          <SelectedActions>
            <ActionButton variant="secondary" onClick={handleBulkDeals}>
              Send Bulk Deals
            </ActionButton>
            <ActionButton primary onClick={handleCustomDeals}>
              Send Custom Deals
            </ActionButton>
          </SelectedActions>
        </SelectedSection>
      )}

      {/* Influencer Grid */}
      <ContentSection>
        <InfluencerGrid>
          {mockInfluencers.map((influencer) => (
            <InfluencerCard
              key={influencer.id}
              selected={selectedInfluencers.includes(influencer.id)}
              onClick={() => handleInfluencerSelect(influencer.id)}
            >
              <SelectCheckbox
                checked={selectedInfluencers.includes(influencer.id)}
              >
                <Check size={14} />
              </SelectCheckbox>

              <InfluencerHeader>
                <ProfileImage
                  src={influencer.profileImage}
                  alt={influencer.displayName}
                />
                <InfluencerInfo>
                  <InfluencerName>
                    {influencer.username}
                    {influencer.isVerified && (
                      <span className="verified">✓</span>
                    )}
                  </InfluencerName>
                  <InfluencerMeta>
                    <span>
                      👥 {(influencer.followers / 1000).toFixed(0)}K followers
                    </span>
                    <span>📊 {influencer.engagementRate}% eng</span>
                  </InfluencerMeta>
                  <InfluencerLocation>
                    📍 {influencer.location}
                  </InfluencerLocation>
                </InfluencerInfo>
              </InfluencerHeader>

              <InfluencerStats>
                <StatItem>
                  <Eye size={14} />
                  <span>
                    {(influencer.averageViews / 1000).toFixed(0)}K avg views
                  </span>
                </StatItem>
                <StatItem>
                  <Star size={14} />
                  <span>
                    {influencer.rating} ({influencer.reviewCount} reviews)
                  </span>
                </StatItem>
              </InfluencerStats>

              <InfluencerBio>{influencer.bio}</InfluencerBio>

              <InfluencerFooter>
                <PriceTag>
                  💰 ₹{influencer.suggestedRate.toLocaleString()}/post
                </PriceTag>
                <ViewProfileButton>View Profile</ViewProfileButton>
              </InfluencerFooter>
            </InfluencerCard>
          ))}
        </InfluencerGrid>

        {/* Browse All Button */}
        <BrowseAllContainer>
          <ActionButton onClick={handleBrowseAll} variant="secondary">
            Browse All Influencers
          </ActionButton>
        </BrowseAllContainer>
      </ContentSection>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: ${sharedTheme.typography.fontSizes.lg};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: ${sharedTheme.colorVariants.secondary.light};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  cursor: pointer;
  margin-bottom: 1rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${sharedTheme.colorVariants.secondary.dark};
  }
`;

const HeaderContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const CampaignTitle = styled.h1`
  font-size: ${sharedTheme.typography.fontSizes.xxxl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0 0 0.5rem 0;
`;

const CampaignSubtitle = styled.h2`
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin: 0 0 2rem 0;
`;

const CampaignMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const MetricCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
`;

const MetricIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${sharedTheme.colorVariants.primary.dark}10;
  border-radius: 8px;
  color: ${sharedTheme.colorVariants.primary.dark};
`;

const MetricContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const MetricLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const MetricValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const SearchSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SearchContainer = styled.div`
  margin-bottom: 1rem;
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  color: ${sharedTheme.colorVariants.secondary.light};

  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: ${sharedTheme.typography.fontSizes.md};
    color: ${sharedTheme.colorVariants.secondary.dark};

    &::placeholder {
      color: ${sharedTheme.colorVariants.secondary.light};
    }
  }

  &:focus-within {
    border-color: ${sharedTheme.colorVariants.primary.dark};
    box-shadow: 0 0 0 3px ${sharedTheme.colorVariants.primary.dark}20;
  }
`;

const QuickFilters = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid
    ${(props) =>
      props.active ? sharedTheme.colorVariants.primary.dark : "#e5e7eb"};
  border-radius: 6px;
  background: ${(props) =>
    props.active ? sharedTheme.colorVariants.primary.dark + "10" : "white"};
  color: ${(props) =>
    props.active
      ? sharedTheme.colorVariants.primary.dark
      : sharedTheme.colorVariants.secondary.dark};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${sharedTheme.colorVariants.primary.dark};
    background: ${sharedTheme.colorVariants.primary.dark}05;
  }
`;

const SelectedSection = styled.div`
  background: ${sharedTheme.colorVariants.primary.dark}10;
  border: 2px solid ${sharedTheme.colorVariants.primary.dark}30;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const SelectedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const SelectedTitle = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
  gap: 0.5rem;
`;

const SelectedMetrics = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

const SelectedActions = styled.div`
  display: flex;
  gap: 1rem;

  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;

    span {
      font-size: ${sharedTheme.typography.fontSizes.xs};
      opacity: 0.8;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;

    button {
      flex-direction: row;
      justify-content: center;
    }
  }
`;

const ContentSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const InfluencerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfluencerCard = styled.div<{ selected: boolean }>`
  position: relative;
  padding: 1.5rem;
  border: 2px solid
    ${(props) =>
      props.selected ? sharedTheme.colorVariants.primary.dark : "#e5e7eb"};
  border-radius: 12px;
  background: ${(props) =>
    props.selected ? sharedTheme.colorVariants.primary.dark + "05" : "white"};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${sharedTheme.colorVariants.primary.dark};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const SelectCheckbox = styled.div<{ checked: boolean }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 24px;
  height: 24px;
  border: 2px solid
    ${(props) =>
      props.checked ? sharedTheme.colorVariants.primary.dark : "#e5e7eb"};
  border-radius: 4px;
  background: ${(props) =>
    props.checked ? sharedTheme.colorVariants.primary.dark : "white"};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
`;

const InfluencerHeader = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e5e7eb;
`;

const InfluencerInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const InfluencerName = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};

  .verified {
    color: ${sharedTheme.colorVariants.primary.dark};
    margin-left: 0.25rem;
  }
`;

const InfluencerMeta = styled.div`
  display: flex;
  gap: 0.75rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const InfluencerLocation = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const InfluencerStats = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 0.75rem;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};

  svg {
    color: ${sharedTheme.colorVariants.primary.dark};
  }
`;

const InfluencerBio = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  line-height: 1.4;
  margin: 0 0 1rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const InfluencerFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
`;

const PriceTag = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const ViewProfileButton = styled.button`
  padding: 0.375rem 0.75rem;
  border: 1px solid ${sharedTheme.colorVariants.primary.dark};
  border-radius: 4px;
  background: transparent;
  color: ${sharedTheme.colorVariants.primary.dark};
  font-size: ${sharedTheme.typography.fontSizes.xs};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${sharedTheme.colorVariants.primary.dark};
    color: white;
  }
`;

const BrowseAllContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
`;

export default InfluencerDiscoveryPage;
