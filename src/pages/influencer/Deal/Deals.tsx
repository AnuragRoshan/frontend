// pages/influencer/Deals/Deals.tsx
import React, { useState } from "react";
import styled from "styled-components";
import {
  Clock,
  Play,
  CheckCircle,
  Calendar,
  MapPin,
  Eye,
  MessageSquare,
  Star,
  Filter,
  Search,
  ArrowUpDown,
  Bookmark,
  Bell,
  DollarSign,
  Handshake,
  X,
} from "lucide-react";
import { sharedTheme } from "../../../styles/theme/theme";
import WrapperBox from "../../../components/layout/WrapperBox";
import NegotiationModal from "./DealNegotitationModal";
import RejectDealModal from "./DealRejectModal";
import AcceptDealModal from "./AcceptDealModal";
import ViewDetailsModal from "./ViewDetailModal";
import { useNavigate } from "react-router-dom";

// Types
interface Deal {
  id: string;
  title: string;
  brand: string;
  brandLogo: string;
  amount: string;
  status: "pending" | "active" | "completed";
  createdDate: string;
  deadline?: string;
  completedDate?: string;
  description: string;
  deliverables: string[];
  location?: string;
  category: string;
  priority: "High" | "Medium" | "Low";
  engagement?: {
    likes?: number;
    comments?: number;
    shares?: number;
  };
  rating?: number;
  feedback?: string;
}

// Mock data
const mockDeals: Deal[] = [
  // Pending Deals
  {
    id: "1",
    title: "Summer Fashion Collection",
    brand: "StyleHub",
    brandLogo:
      "https://img.freepik.com/free-vector/gradient-fashion-logo-template_23-2149373528.jpg",
    amount: "₹8,500",
    status: "pending",
    createdDate: "July 15, 2025",
    deadline: "July 30, 2025",
    description:
      "Showcase our latest summer collection with authentic styling tips",
    deliverables: ["2 Instagram Posts", "5 Stories", "1 Reel"],
    location: "Mumbai",
    category: "Fashion",
    priority: "High",
  },
  {
    id: "2",
    title: "Tech Gadget Review",
    brand: "TechnovateGadgets",
    brandLogo:
      "https://img.freepik.com/free-vector/gradient-technology-logo-template_23-2149660622.jpg",
    amount: "₹12,000",
    status: "pending",
    createdDate: "July 14, 2025",
    deadline: "July 28, 2025",
    description:
      "In-depth review of our latest smartphone with unboxing content",
    deliverables: ["1 YouTube Video", "3 Instagram Posts", "10 Stories"],
    location: "Delhi",
    category: "Technology",
    priority: "Medium",
  },

  // Active Deals
  {
    id: "3",
    title: "Skincare Routine Campaign",
    brand: "GlowSkin",
    brandLogo:
      "https://img.freepik.com/free-vector/gradient-beauty-logo-template_23-2149373504.jpg",
    amount: "₹6,500",
    status: "active",
    createdDate: "July 10, 2025",
    deadline: "July 22, 2025",
    description: "Create morning and evening skincare routine content",
    deliverables: ["2 Instagram Posts", "1 IGTV", "8 Stories"],
    location: "Bangalore",
    category: "Beauty",
    priority: "High",
  },
  {
    id: "4",
    title: "Fitness Challenge",
    brand: "FitLife",
    brandLogo:
      "https://img.freepik.com/free-vector/gradient-fitness-logo-template_23-2149660633.jpg",
    amount: "₹5,000",
    status: "active",
    createdDate: "July 8, 2025",
    deadline: "July 25, 2025",
    description: "30-day fitness challenge with daily workout tips",
    deliverables: ["1 YouTube Video", "Daily Stories", "3 Posts"],
    location: "Chennai",
    category: "Fitness",
    priority: "Medium",
  },

  // Completed Deals
  {
    id: "5",
    title: "Travel Destination Showcase",
    brand: "Wanderlust",
    brandLogo:
      "https://img.freepik.com/free-vector/gradient-travel-logo-template_23-2149052925.jpg",
    amount: "₹15,000",
    status: "completed",
    createdDate: "June 20, 2025",
    completedDate: "July 5, 2025",
    description: "Showcase hidden gems in Goa with travel tips",
    deliverables: ["3 YouTube Videos", "10 Instagram Posts", "20 Stories"],
    location: "Goa",
    category: "Travel",
    priority: "High",
    engagement: { likes: 2500, comments: 450, shares: 320 },
    rating: 4.8,
    feedback:
      "Outstanding content! The videos perfectly captured the essence of our brand.",
  },
  {
    id: "6",
    title: "Food Recipe Series",
    brand: "TastyBites",
    brandLogo:
      "https://img.freepik.com/free-vector/gradient-food-logo-template_23-2149373515.jpg",
    amount: "₹7,500",
    status: "completed",
    createdDate: "June 15, 2025",
    completedDate: "June 30, 2025",
    description: "Create healthy recipe content with step-by-step tutorials",
    deliverables: ["5 Instagram Reels", "10 Posts", "15 Stories"],
    location: "Pune",
    category: "Food",
    priority: "Medium",
    engagement: { likes: 1800, comments: 320, shares: 150 },
    rating: 4.5,
    feedback: "Great recipes! Your audience engagement was fantastic.",
  },
];

// Helper function for priority colors
const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case "High":
      return "#ef4444";
    case "Medium":
      return "#f59e0b";
    case "Low":
      return "#10b981";
    default:
      return "#6b7280";
  }
};

const Deals: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "pending" | "active" | "completed"
  >("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "amount" | "priority">("date");
  const [showFilters, setShowFilters] = useState(false);

  // Modal states
  const [isNegotiationModalOpen, setIsNegotiationModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  // Filter deals based on active tab
  const filteredDeals = mockDeals.filter((deal) => deal.status === activeTab);

  // Search and sort functionality
  const processedDeals = filteredDeals
    .filter(
      (deal) =>
        deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "amount":
          return (
            parseInt(b.amount.replace(/[₹,]/g, "")) -
            parseInt(a.amount.replace(/[₹,]/g, ""))
          );
        case "priority": {
          const priorityOrder = { High: 3, Medium: 2, Low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        default:
          return (
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
          );
      }
    });

  // Modal handlers
  const handleNegotiateDeal = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsNegotiationModalOpen(true);
  };

  const handleRejectDeal = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsRejectModalOpen(true);
  };

  const handleAcceptDeal = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsAcceptModalOpen(true);
  };

  const handleViewDetails = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsViewDetailsModalOpen(true);
  };

  // interface AcceptanceData {
  //   // Define expected fields for acceptance data, e.g.:
  //   acceptedTerms?: boolean;
  //   message?: string;
  //   // Add more fields as needed
  // }

  // const handleSubmitAcceptance = async (
  //   dealId: string,
  //   acceptanceData: AcceptanceData
  // ) => {
  //   // TODO: Implement API call to accept deal
  //   console.log("Accepting deal:", { dealId, acceptanceData });
  //   // API call here
  //   // Show success message
  //   // Maybe refresh the deals list or update the deal status
  // };

  interface NegotiationData {
    amount?: string;
    message?: string;
    // Add other fields as required for negotiation
  }

  const handleSubmitNegotiation = async (negotiationData: NegotiationData) => {
    // TODO: Implement API call to submit negotiation
    console.log("Submitting negotiation:", negotiationData);
    // API call here
  };

  const handleSubmitRejection = async (
    dealId: string,
    reason: string,
    feedback: string
  ) => {
    // TODO: Implement API call to reject deal
    console.log("Rejecting deal:", { dealId, reason, feedback });
    // API call here
  };

  return (
    <PageContainer>
      {/* Header Section */}
      <WrapperBox>
        <HeaderSection>
          <HeaderContent>
            <HeaderLeft>
              <HeaderTitle>
                <DollarSign size={32} />
                My Deals
              </HeaderTitle>
              <HeaderSubtitle>
                Manage your brand collaborations and deals
              </HeaderSubtitle>
            </HeaderLeft>
            <HeaderActions>
              <SearchContainer>
                <SearchIcon>
                  <Search size={18} />
                </SearchIcon>
                <SearchInput
                  type="text"
                  placeholder="Search deals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </SearchContainer>
            </HeaderActions>
          </HeaderContent>
        </HeaderSection>
      </WrapperBox>

      {/* Navigation Tabs */}
      <WrapperBox>
        <TabsContainer>
          <TabContainer>
            <TabButton
              active={activeTab === "pending"}
              onClick={() => setActiveTab("pending")}
            >
              <Clock size={18} />
              Pending Deals (
              {mockDeals.filter((d) => d.status === "pending").length})
            </TabButton>
            <TabButton
              active={activeTab === "active"}
              onClick={() => setActiveTab("active")}
            >
              <Play size={18} />
              Active Deals (
              {mockDeals.filter((d) => d.status === "active").length})
            </TabButton>
            <TabButton
              active={activeTab === "completed"}
              onClick={() => setActiveTab("completed")}
            >
              <CheckCircle size={18} />
              Completed Deals (
              {mockDeals.filter((d) => d.status === "completed").length})
            </TabButton>
          </TabContainer>

          <TabFilters>
            <FilterButton onClick={() => setShowFilters(!showFilters)}>
              <Filter size={16} />
              Filters
            </FilterButton>
            <SortContainer>
              <SortLabel>Sort:</SortLabel>
              <SortSelect
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "date" | "amount" | "priority")
                }
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="priority">Priority</option>
              </SortSelect>
            </SortContainer>
          </TabFilters>
        </TabsContainer>
      </WrapperBox>

      {/* Deals Content */}
      <DealsSection>
        {processedDeals.length === 0 ? (
          <WrapperBox>
            <EmptyState>
              <EmptyStateIcon>
                {activeTab === "pending" && <Clock size={48} />}
                {activeTab === "active" && <Play size={48} />}
                {activeTab === "completed" && <CheckCircle size={48} />}
              </EmptyStateIcon>
              <EmptyStateTitle>No {activeTab} deals found</EmptyStateTitle>
              <EmptyStateDescription>
                {activeTab === "pending" &&
                  "You don't have any pending deals at the moment."}
                {activeTab === "active" &&
                  "No active deals to work on right now."}
                {activeTab === "completed" &&
                  "You haven't completed any deals yet."}
              </EmptyStateDescription>
            </EmptyState>
          </WrapperBox>
        ) : (
          <DealsGrid>
            {processedDeals.map((deal) => (
              <DealCard key={deal.id}>
                <DealHeader>
                  <BrandInfo>
                    <BrandAvatar>
                      <BrandLogo src={deal.brandLogo} alt={deal.brand} />
                    </BrandAvatar>
                    <BrandDetails>
                      <BrandName>{deal.brand}</BrandName>
                      <DealTitle>{deal.title}</DealTitle>
                    </BrandDetails>
                  </BrandInfo>
                  <DealAmount>{deal.amount}</DealAmount>
                </DealHeader>

                <DealMeta>
                  <MetaItem>
                    <Calendar size={14} />
                    <MetaText>
                      {activeTab === "completed"
                        ? `Completed: ${deal.completedDate}`
                        : activeTab === "active"
                        ? `Due: ${deal.deadline}`
                        : `Received: ${deal.createdDate}`}
                    </MetaText>
                  </MetaItem>
                  {deal.location && (
                    <MetaItem>
                      <MapPin size={14} />
                      <MetaText>{deal.location}</MetaText>
                    </MetaItem>
                  )}
                  <PriorityTag priority={deal.priority}>
                    {deal.priority} Priority
                  </PriorityTag>
                </DealMeta>

                <DealDescription>{deal.description}</DealDescription>

                <DeliverablesSection>
                  <SectionTitle>Deliverables</SectionTitle>
                  <DeliverablesList>
                    {deal.deliverables.map((deliverable, index) => (
                      <DeliverableTag key={index}>{deliverable}</DeliverableTag>
                    ))}
                  </DeliverablesList>
                </DeliverablesSection>

                {deal.engagement && (
                  <EngagementSection>
                    <SectionTitle>Performance</SectionTitle>
                    <EngagementGrid>
                      <EngagementStat>
                        <Eye size={16} />
                        <StatValue>
                          {deal.engagement.likes?.toLocaleString()}
                        </StatValue>
                        <StatLabel>Likes</StatLabel>
                      </EngagementStat>
                      <EngagementStat>
                        <MessageSquare size={16} />
                        <StatValue>{deal.engagement.comments}</StatValue>
                        <StatLabel>Comments</StatLabel>
                      </EngagementStat>
                      <EngagementStat>
                        <ArrowUpDown size={16} />
                        <StatValue>{deal.engagement.shares}</StatValue>
                        <StatLabel>Shares</StatLabel>
                      </EngagementStat>
                    </EngagementGrid>
                  </EngagementSection>
                )}

                {deal.rating && (
                  <RatingSection>
                    <RatingHeader>
                      <SectionTitle>Brand Rating</SectionTitle>
                      <RatingDisplay>
                        <RatingStars>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              fill={
                                i < Math.floor(deal.rating!)
                                  ? "#fbbf24"
                                  : "none"
                              }
                              color="#fbbf24"
                            />
                          ))}
                        </RatingStars>
                        <RatingValue>{deal.rating}/5</RatingValue>
                      </RatingDisplay>
                    </RatingHeader>
                    {deal.feedback && (
                      <FeedbackText>"{deal.feedback}"</FeedbackText>
                    )}
                  </RatingSection>
                )}

                <DealActions>
                  {activeTab === "pending" && (
                    <>
                      <ActionButton
                        variant="primary"
                        onClick={() => handleAcceptDeal(deal)}
                      >
                        <CheckCircle size={16} />
                        Accept Deal
                      </ActionButton>
                      <ActionButton
                        variant="secondary"
                        onClick={() => handleNegotiateDeal(deal)}
                      >
                        <Handshake size={16} />
                        Negotiate
                      </ActionButton>
                      <ActionButton
                        variant="secondary"
                        onClick={() => handleViewDetails(deal)}
                      >
                        <Eye size={16} />
                        View Details
                      </ActionButton>
                      <ActionButton
                        variant="secondary"
                        onClick={() => handleRejectDeal(deal)}
                      >
                        <X size={16} />
                        Reject
                      </ActionButton>
                    </>
                  )}
                  {activeTab === "active" && (
                    <>
                      <ActionButton
                        variant="primary"
                        onClick={() => {
                          navigate(`/submitContent/8`);
                        }}
                      >
                        <Bell size={16} />
                        Submit Content
                      </ActionButton>
                      <ActionButton variant="secondary">
                        <Bookmark size={16} />
                        View Requirements
                      </ActionButton>
                    </>
                  )}
                  {activeTab === "completed" && (
                    <>
                      <ActionButton variant="secondary">
                        <Eye size={16} />
                        View Content
                      </ActionButton>
                      <ActionButton variant="secondary">
                        <DollarSign size={16} />
                        Download Invoice
                      </ActionButton>
                    </>
                  )}
                </DealActions>
              </DealCard>
            ))}
          </DealsGrid>
        )}
      </DealsSection>

      {/* Modals */}
      <NegotiationModal
        isOpen={isNegotiationModalOpen}
        onClose={() => setIsNegotiationModalOpen(false)}
        deal={selectedDeal}
        onSubmitNegotiation={handleSubmitNegotiation}
      />

      <RejectDealModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        deal={selectedDeal}
        onRejectDeal={handleSubmitRejection}
      />

      <AcceptDealModal
        isOpen={isAcceptModalOpen}
        onClose={() => setIsAcceptModalOpen(false)}
        deal={selectedDeal}
        onAcceptDeal={() => {}}
      />

      <ViewDetailsModal
        isOpen={isViewDetailsModalOpen}
        onClose={() => setIsViewDetailsModalOpen(false)}
        deal={selectedDeal}
      />
    </PageContainer>
  );
};

// Styled Components using correct theme structure
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  padding: ${sharedTheme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${sharedTheme.spacing.lg};

  @media (max-width: 768px) {
    padding: ${sharedTheme.spacing.md};
    gap: ${sharedTheme.spacing.md};
  }
`;

// Header Styles
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
    align-items: stretch;
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
  font-size: ${sharedTheme.typography.fontSizes.xxl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${"#1E3A8A"};
  margin: 0;
`;

const HeaderSubtitle = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.md};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  min-width: 300px;

  @media (max-width: 768px) {
    min-width: auto;
    width: 100%;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${sharedTheme.colorVariants.secondary.light};
  z-index: 1;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${sharedTheme.spacing.sm} ${sharedTheme.spacing.sm}
    ${sharedTheme.spacing.sm} 2.5rem;
  border: 1px solid #e5e7eb;
  border-radius: ${sharedTheme.borderRadius.md};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  background: white;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1e3a8a;
    box-shadow: 0 0 0 3px #1e3a8a20;
  }
`;

// Tabs Styles - Updated to match Campaign.tsx
const TabsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.25rem;
  }
`;

const TabButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: ${sharedTheme.spacing.sm};
  border: 1px solid ${(props) => (props.active ? "#1E3A8A" : "#e5e7eb")};
  background: ${(props) => (props.active ? "#1E3A8A" : "white")};
  color: ${(props) => (props.active ? "white" : "#1E3A8A")};
  border-radius: ${sharedTheme.borderRadius.md};
  cursor: pointer;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${(props) =>
    props.active
      ? sharedTheme.typography.fontWeights.semibold
      : sharedTheme.typography.fontWeights.medium};
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${(props) => (props.active ? "#1E3A8A" : "#f9fafb")};
    border-color: ${(props) =>
      props.active ? "#1E3A8A" : sharedTheme.colorVariants.secondary.light};
  }

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;

const TabFilters = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: space-between;
    width: 100%;
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: ${sharedTheme.spacing.sm} ${sharedTheme.spacing.md};
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: ${sharedTheme.borderRadius.md};
  cursor: pointer;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${"#1E3A8A"};
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    border-color: ${sharedTheme.colorVariants.secondary.light};
  }
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SortLabel = styled.span`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
`;

const SortSelect = styled.select`
  padding: ${sharedTheme.spacing.sm};
  border: 1px solid #e5e7eb;
  border-radius: ${sharedTheme.borderRadius.md};
  background: white;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #1e3a8a;
  }
`;

// Content Styles
const DealsSection = styled.div`
  flex: 1;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
`;

const EmptyStateIcon = styled.div`
  color: ${sharedTheme.colorVariants.secondary.light};
  margin-bottom: ${sharedTheme.spacing.lg};
`;

const EmptyStateTitle = styled.h3`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${"#1E3A8A"};
  margin: 0 0 ${sharedTheme.spacing.sm} 0;
`;

const EmptyStateDescription = styled.p`
  color: ${sharedTheme.colorVariants.secondary.light};
  margin: 0;
  max-width: 400px;
`;

const DealsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: ${sharedTheme.spacing.lg};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${sharedTheme.spacing.md};
  }
`;

// Deal Card Styles
const DealCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: ${sharedTheme.borderRadius.lg};
  padding: ${sharedTheme.spacing.lg};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${sharedTheme.shadows.lg};
    border-color: #1e3a8a40;
  }
`;

const DealHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${sharedTheme.spacing.md};
`;

const BrandInfo = styled.div`
  display: flex;
  gap: ${sharedTheme.spacing.sm};
  flex: 1;
`;

const BrandAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${sharedTheme.borderRadius.md};
  overflow: hidden;
  border: 2px solid #e5e7eb;
`;

const BrandLogo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BrandDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const BrandName = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin-bottom: 0.25rem;
  font-weight: ${sharedTheme.typography.fontWeights.medium};
`;

const DealTitle = styled.h3`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${"#1E3A8A"};
  margin: 0;
  line-height: 1.4;
`;

const DealAmount = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: #1e3a8a;
`;

const DealMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${sharedTheme.spacing.sm};
  margin-bottom: ${sharedTheme.spacing.md};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const MetaText = styled.span`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const PriorityTag = styled.span<{ priority: string }>`
  padding: 0.25rem 0.5rem;
  border-radius: ${sharedTheme.borderRadius.sm};
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  background-color: ${(props) => getPriorityColor(props.priority)}20;
  color: ${(props) => getPriorityColor(props.priority)};
`;

const DealDescription = styled.p`
  color: ${sharedTheme.colorVariants.secondary.light};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  line-height: 1.5;
  margin: 0 0 ${sharedTheme.spacing.md} 0;
`;

const DeliverablesSection = styled.div`
  margin-bottom: ${sharedTheme.spacing.md};
`;

const SectionTitle = styled.h4`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${"#1E3A8A"};
  margin: 0 0 ${sharedTheme.spacing.sm} 0;
`;

const DeliverablesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${sharedTheme.spacing.xs};
`;

const DeliverableTag = styled.span`
  padding: 0.25rem 0.5rem;
  background: #1e3a8a10;
  color: #1e3a8a;
  border-radius: ${sharedTheme.borderRadius.sm};
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  border: 1px solid #1e3a8a20;
`;

const EngagementSection = styled.div`
  margin-bottom: ${sharedTheme.spacing.md};
`;

const EngagementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${sharedTheme.spacing.sm};
`;

const EngagementStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${sharedTheme.spacing.sm};
  background: #f3f4f6;
  border-radius: ${sharedTheme.borderRadius.md};
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${"#1E3A8A"};
  margin: 0.25rem 0;
`;

const StatLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
`;

const RatingSection = styled.div`
  margin-bottom: ${sharedTheme.spacing.md};
  padding: ${sharedTheme.spacing.md};
  background: #f3f4f6;
  border-radius: ${sharedTheme.borderRadius.md};
`;

const RatingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${sharedTheme.spacing.sm};
`;

const RatingDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RatingStars = styled.div`
  display: flex;
  gap: 0.125rem;
`;

const RatingValue = styled.span`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${"#1E3A8A"};
`;

const FeedbackText = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  font-style: italic;
  margin: 0;
  line-height: 1.4;
  background: white;
  padding: ${sharedTheme.spacing.sm};
  border-radius: ${sharedTheme.borderRadius.sm};
  border-left: 3px solid #1e3a8a;
`;

const DealActions = styled.div`
  display: flex;
  gap: ${sharedTheme.spacing.sm};
  margin-top: ${sharedTheme.spacing.md};

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button<{ variant: "primary" | "secondary" }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: ${sharedTheme.spacing.sm};
  border: 1px solid
    ${(props) => (props.variant === "primary" ? "#1E3A8A" : "#1E3A8A")};
  background: ${(props) => (props.variant === "primary" ? "#1E3A8A" : "white")};
  color: ${(props) => (props.variant === "primary" ? "white" : "#1E3A8A")};
  border-radius: ${sharedTheme.borderRadius.md};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.variant === "primary" ? "#1E3A8A" : "#f3f4f6"};
    border-color: ${(props) =>
      props.variant === "primary"
        ? "#1E3A8A"
        : sharedTheme.colorVariants.secondary.light};
    transform: translateY(-1px);
    box-shadow: ${sharedTheme.shadows.sm};
  }

  &:active {
    transform: translateY(0);
  }
`;

export default Deals;
