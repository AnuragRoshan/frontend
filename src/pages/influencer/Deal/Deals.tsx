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
  ArrowRightLeft, // New icon for counter offers
  TrendingUp,
  TrendingDown,
  // AlertCircle,
  Send,
} from "lucide-react";
import { sharedTheme } from "../../../styles/theme/theme";
import WrapperBox from "../../../components/layout/WrapperBox";
import NegotiationModal from "./DealNegotitationModal";
import RejectDealModal from "./DealRejectModal";
import AcceptDealModal from "./AcceptDealModal";
import ViewDetailsModal from "./ViewDetailModal";
import { useNavigate } from "react-router-dom";

// Types - Enhanced with counter-offer support
export interface CounterOffer {
  id: string;
  fromType: "brand" | "influencer";
  amount: string;
  message: string;
  timestamp: string;
  isActive: boolean;
}

export interface Deal {
  id: string;
  title: string;
  brand: string;
  brandLogo: string;
  amount: string;
  originalAmount?: string; // New field for original offer amount
  status: "pending" | "active" | "completed" | "counter_offer" | "negotiating"; // Enhanced status
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
  counterOffers?: CounterOffer[]; // New field for counter-offer history
  hasUnreadMessages?: boolean; // New field for unread counter-offers
  isNegotiable?: boolean; // New field to determine if deal allows negotiation
  lastActivity?: string; // New field for last negotiation activity
}

// Enhanced mock data with counter-offer examples
const mockDeals: Deal[] = [
  // Pending Deals (including counter-offer scenarios)
  {
    id: "1",
    title: "Summer Fashion Collection",
    brand: "StyleHub",
    brandLogo:
      "https://img.freepik.com/free-vector/gradient-fashion-logo-template_23-2149373528.jpg",
    amount: "₹10,000", // Current negotiated amount
    originalAmount: "₹8,500", // Original offer
    status: "counter_offer", // New status
    createdDate: "July 15, 2025",
    deadline: "July 30, 2025",
    description:
      "Showcase our latest summer collection with authentic styling tips",
    deliverables: ["2 Instagram Posts", "5 Stories", "1 Reel"],
    location: "Mumbai",
    category: "Fashion",
    priority: "High",
    isNegotiable: true,
    hasUnreadMessages: true,
    lastActivity: "July 19, 2025",
    counterOffers: [
      {
        id: "co_1",
        fromType: "influencer",
        amount: "₹12,000",
        message:
          "I can do this for ₹12,000 considering my engagement rates and the additional reel you've requested.",
        timestamp: "2025-07-18T10:30:00Z",
        isActive: false,
      },
      {
        id: "co_2",
        fromType: "brand",
        amount: "₹10,000",
        message:
          "How about ₹10,000? That's our final budget for this collaboration.",
        timestamp: "2025-07-19T09:15:00Z",
        isActive: true,
      },
    ],
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
    isNegotiable: true,
    hasUnreadMessages: false,
  },
  {
    id: "new_negotiating",
    title: "Wellness Product Launch",
    brand: "ZenLife",
    brandLogo:
      "https://img.freepik.com/free-vector/gradient-wellness-logo-template_23-2149373520.jpg",
    amount: "₹9,000", // Current negotiated amount
    originalAmount: "₹7,000", // Original offer
    status: "negotiating", // Currently in negotiation
    createdDate: "July 16, 2025",
    deadline: "July 29, 2025",
    description: "Launch campaign for our new wellness product line",
    deliverables: ["2 Instagram Reels", "3 Posts", "8 Stories"],
    location: "Bangalore",
    category: "Wellness",
    priority: "High",
    isNegotiable: true,
    hasUnreadMessages: true,
    lastActivity: "July 20, 2025",
    counterOffers: [
      {
        id: "co_3",
        fromType: "influencer",
        amount: "₹10,000",
        message: "Given the scope of work, I'd like to propose ₹10,000.",
        timestamp: "2025-07-17T14:20:00Z",
        isActive: false,
      },
      {
        id: "co_4",
        fromType: "brand",
        amount: "₹8,500",
        message:
          "We can go up to ₹8,500. This is a long-term partnership opportunity.",
        timestamp: "2025-07-18T11:30:00Z",
        isActive: false,
      },
      {
        id: "co_5",
        fromType: "influencer",
        amount: "₹9,000",
        message:
          "Let's meet in the middle at ₹9,000. I'm excited about this partnership!",
        timestamp: "2025-07-20T09:45:00Z",
        isActive: true,
      },
    ],
  },
  {
    id: "7",
    title: "Healthy Meal Prep",
    brand: "NutriMeals",
    brandLogo:
      "https://img.freepik.com/free-vector/gradient-food-logo-template_23-2149373515.jpg",
    amount: "₹4,000",
    status: "pending",
    createdDate: "July 12, 2025",
    deadline: "July 26, 2025",
    description: "Create healthy meal prep content for busy professionals",
    deliverables: ["3 Instagram Reels", "5 Posts", "10 Stories"],
    location: "Bangalore",
    category: "Food",
    priority: "Low",
    isNegotiable: false, // This deal is not negotiable
    hasUnreadMessages: false,
  },
  {
    id: "8",
    title: "Fitness Challenge",
    brand: "FitLife",
    brandLogo:
      "https://img.freepik.com/free-vector/gradient-fitness-logo-template_23-2149660633.jpg",
    amount: "₹5,000",
    status: "pending",
    createdDate: "July 10, 2025",
    deadline: "July 24, 2025",
    description: "30-day fitness challenge with daily workout tips",
    deliverables: ["1 YouTube Video", "Daily Stories", "3 Posts"],
    location: "Chennai",
    category: "Fitness",
    priority: "Medium",
    isNegotiable: true,
    hasUnreadMessages: false,
  },

  // Active Deals (unchanged)
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

  // Completed Deals (unchanged)
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

  // New state for counter-offer modal
  const [isCounterOfferModalOpen, setIsCounterOfferModalOpen] = useState(false);
  const [counterOfferAmount, setCounterOfferAmount] = useState("");
  const [counterOfferMessage, setCounterOfferMessage] = useState("");

  // Enhanced filter to include counter-offer and negotiating statuses in pending
  const filteredDeals = mockDeals.filter((deal) => {
    if (activeTab === "pending") {
      return ["pending", "counter_offer", "negotiating"].includes(deal.status);
    }
    return deal.status === activeTab;
  });

  // Search and sort functionality (unchanged)
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

  // Enhanced modal handlers
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

  // New counter-offer handler
  const handleCounterOffer = (deal: Deal) => {
    setSelectedDeal(deal);
    // Pre-populate with current amount or suggest a middle ground
    if (deal.counterOffers && deal.counterOffers.length > 0) {
      // const lastOffer = deal.counterOffers[deal.counterOffers.length - 1];
      const currentAmount = parseInt(deal.amount.replace(/[₹,]/g, ""));
      const originalAmount = parseInt(
        deal.originalAmount?.replace(/[₹,]/g, "") ||
          deal.amount.replace(/[₹,]/g, "")
      );
      const suggestedAmount = Math.round((currentAmount + originalAmount) / 2);
      setCounterOfferAmount(suggestedAmount.toString());
    } else {
      setCounterOfferAmount(deal.amount.replace(/[₹,]/g, ""));
    }
    setIsCounterOfferModalOpen(true);
  };

  // Enhanced negotiation handler
  interface NegotiationData {
    amount?: string;
    message?: string;
  }

  const handleSubmitNegotiation = async (negotiationData: NegotiationData) => {
    console.log("Submitting negotiation:", negotiationData);
    // API call here
  };

  // New counter-offer submission handler
  const handleSubmitCounterOffer = async () => {
    if (!selectedDeal) return;

    const counterOfferData = {
      dealId: selectedDeal.id,
      amount: counterOfferAmount,
      message: counterOfferMessage,
      fromType: "influencer" as const,
    };

    console.log("Submitting counter offer:", counterOfferData);

    // TODO: API call to submit counter offer
    // After successful submission:
    setIsCounterOfferModalOpen(false);
    setCounterOfferAmount("");
    setCounterOfferMessage("");
    setSelectedDeal(null);
  };

  const handleSubmitRejection = async (
    dealId: string,
    reason: string,
    feedback: string
  ) => {
    console.log("Rejecting deal:", { dealId, reason, feedback });
    // API call here
  };

  // Helper function to get negotiation status text
  const getNegotiationStatusText = (deal: Deal): string => {
    if (deal.status === "counter_offer") {
      return "Counter Offer Received";
    } else if (deal.status === "negotiating") {
      return "In Negotiation";
    }
    return "";
  };

  return (
    <PageContainer>
      {/* Header Section (unchanged) */}
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

      {/* Enhanced Navigation Tabs */}
      <WrapperBox>
        <TabsContainer>
          <TabContainer>
            <TabButton
              active={activeTab === "pending"}
              onClick={() => setActiveTab("pending")}
            >
              <Clock size={18} />
              Pending Deals (
              {
                mockDeals.filter((d) =>
                  ["pending", "counter_offer", "negotiating"].includes(d.status)
                ).length
              }
              )
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
              <DealCard key={deal.id} status={deal.status}>
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
                  <DealAmountSection>
                    {/* Enhanced amount display for counter-offers */}
                    {deal.originalAmount &&
                    deal.originalAmount !== deal.amount ? (
                      <AmountComparison>
                        <OriginalAmount>
                          ₹
                          {deal.originalAmount
                            .replace(/[₹,]/g, "")
                            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                        </OriginalAmount>
                        <CurrentAmount>{deal.amount}</CurrentAmount>
                        <AmountChange
                          increase={
                            parseInt(deal.amount.replace(/[₹,]/g, "")) >
                            parseInt(deal.originalAmount.replace(/[₹,]/g, ""))
                          }
                        >
                          {parseInt(deal.amount.replace(/[₹,]/g, "")) >
                          parseInt(deal.originalAmount.replace(/[₹,]/g, "")) ? (
                            <TrendingUp size={14} />
                          ) : (
                            <TrendingDown size={14} />
                          )}
                          {Math.abs(
                            ((parseInt(deal.amount.replace(/[₹,]/g, "")) -
                              parseInt(
                                deal.originalAmount.replace(/[₹,]/g, "")
                              )) /
                              parseInt(
                                deal.originalAmount.replace(/[₹,]/g, "")
                              )) *
                              100
                          ).toFixed(0)}
                          %
                        </AmountChange>
                      </AmountComparison>
                    ) : (
                      <DealAmount>{deal.amount}</DealAmount>
                    )}
                    {deal.hasUnreadMessages && <UnreadBadge />}
                  </DealAmountSection>
                </DealHeader>

                {/* Enhanced status indicator for negotiations */}
                {(deal.status === "counter_offer" ||
                  deal.status === "negotiating") && (
                  <NegotiationStatus status={deal.status}>
                    <StatusIcon>
                      {deal.status === "counter_offer" && (
                        <ArrowRightLeft size={16} />
                      )}
                      {deal.status === "negotiating" && (
                        <MessageSquare size={16} />
                      )}
                    </StatusIcon>
                    <StatusText>{getNegotiationStatusText(deal)}</StatusText>
                    {deal.lastActivity && (
                      <LastActivity>
                        Last activity: {deal.lastActivity}
                      </LastActivity>
                    )}
                  </NegotiationStatus>
                )}

                {/* Counter-offer history preview */}
                {deal.counterOffers && deal.counterOffers.length > 0 && (
                  <CounterOfferPreview>
                    <PreviewTitle>Latest Negotiation:</PreviewTitle>
                    {deal.counterOffers.slice(-1).map((offer) => (
                      <PreviewItem key={offer.id} fromType={offer.fromType}>
                        <PreviewHeader>
                          <span>
                            {offer.fromType === "brand" ? deal.brand : "You"}
                          </span>
                          <span>{offer.amount}</span>
                        </PreviewHeader>
                        <PreviewMessage>{offer.message}</PreviewMessage>
                      </PreviewItem>
                    ))}
                  </CounterOfferPreview>
                )}

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
                  {!deal.isNegotiable && (
                    <NonNegotiableTag>Non-negotiable</NonNegotiableTag>
                  )}
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

                {/* Enhanced Deal Actions with counter-offer support */}
                <DealActions>
                  {activeTab === "pending" && deal.status === "pending" && (
                    <>
                      <ActionButton
                        variant="primary"
                        onClick={() => handleAcceptDeal(deal)}
                      >
                        <CheckCircle size={16} />
                        Accept
                      </ActionButton>
                      {deal.isNegotiable && (
                        <ActionButton
                          variant="secondary"
                          onClick={() => handleNegotiateDeal(deal)}
                        >
                          <Handshake size={16} />
                          Negotiate
                        </ActionButton>
                      )}
                      <ActionButton
                        variant="secondary"
                        onClick={() => handleViewDetails(deal)}
                      >
                        <Eye size={16} />
                        View
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

                  {/* New actions for counter-offer scenarios */}
                  {activeTab === "pending" &&
                    (deal.status === "counter_offer" ||
                      deal.status === "negotiating") && (
                      <>
                        <ActionButton
                          variant="primary"
                          onClick={() => handleAcceptDeal(deal)}
                        >
                          <CheckCircle size={16} />
                          Accept
                        </ActionButton>
                        <ActionButton
                          variant="negotiation"
                          onClick={() => handleCounterOffer(deal)}
                        >
                          <ArrowRightLeft size={16} />
                          Counter
                        </ActionButton>
                        <ActionButton
                          variant="secondary"
                          onClick={() => handleViewDetails(deal)}
                        >
                          <Eye size={16} />
                          View
                        </ActionButton>
                        <ActionButton
                          variant="secondary"
                          onClick={() => handleRejectDeal(deal)}
                        >
                          <X size={16} />
                          Decline
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
                        Submit
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

      {/* Enhanced Modals */}
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

      {/* New Counter Offer Modal */}
      {isCounterOfferModalOpen && selectedDeal && (
        <ModalOverlay onClick={() => setIsCounterOfferModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                <ArrowRightLeft size={24} />
                Send Counter Offer
              </ModalTitle>
              <CloseButton onClick={() => setIsCounterOfferModalOpen(false)}>
                <X size={20} />
              </CloseButton>
            </ModalHeader>

            <ModalBody>
              <DealSummary>
                <DealSummaryTitle>Deal Summary</DealSummaryTitle>
                <SummaryRow>
                  <span>Brand:</span>
                  <span>{selectedDeal.brand}</span>
                </SummaryRow>
                <SummaryRow>
                  <span>Campaign:</span>
                  <span>{selectedDeal.title}</span>
                </SummaryRow>
                <SummaryRow>
                  <span>Their Current Offer:</span>
                  <span>{selectedDeal.amount}</span>
                </SummaryRow>
                {selectedDeal.originalAmount && (
                  <SummaryRow>
                    <span>Original Offer:</span>
                    <span>{selectedDeal.originalAmount}</span>
                  </SummaryRow>
                )}
                <SummaryRow>
                  <span>Deliverables:</span>
                  <span>{selectedDeal.deliverables.join(", ")}</span>
                </SummaryRow>
              </DealSummary>

              {/* Negotiation History */}
              {selectedDeal.counterOffers &&
                selectedDeal.counterOffers.length > 0 && (
                  <NegotiationHistory>
                    <HistoryTitle>Negotiation History</HistoryTitle>
                    {selectedDeal.counterOffers.map((offer) => (
                      <HistoryItem key={offer.id} fromType={offer.fromType}>
                        <HistoryHeader>
                          <HistoryUser>
                            {offer.fromType === "brand"
                              ? selectedDeal.brand
                              : "You"}
                          </HistoryUser>
                          <HistoryAmount>{offer.amount}</HistoryAmount>
                          <HistoryTime>
                            {new Date(offer.timestamp).toLocaleDateString()}
                          </HistoryTime>
                        </HistoryHeader>
                        <HistoryMessage>{offer.message}</HistoryMessage>
                      </HistoryItem>
                    ))}
                  </NegotiationHistory>
                )}

              <FormSection>
                <FormGroup>
                  <FormLabel>Your Counter Offer Amount (₹)</FormLabel>
                  <FormInput
                    type="number"
                    value={counterOfferAmount}
                    onChange={(e) => setCounterOfferAmount(e.target.value)}
                    placeholder="Enter your counter offer amount"
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Message (Optional)</FormLabel>
                  <FormTextarea
                    value={counterOfferMessage}
                    onChange={(e) => setCounterOfferMessage(e.target.value)}
                    placeholder="Explain your counter offer or add any additional details..."
                    rows={4}
                  />
                </FormGroup>
              </FormSection>
            </ModalBody>

            <ModalFooter>
              <CancelButton onClick={() => setIsCounterOfferModalOpen(false)}>
                Cancel
              </CancelButton>
              <SubmitButton onClick={handleSubmitCounterOffer}>
                <Send size={16} />
                Send Counter Offer
              </SubmitButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

// Enhanced Styled Components

// All existing styled components remain unchanged...
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

// Header Styles (unchanged)
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
  width: 85%;
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

// Tabs Styles (unchanged)
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

// Content Styles (unchanged)
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

// Enhanced Deal Card Styles
const DealCard = styled.div<{ status?: Deal["status"] }>`
  background: white;
  border: 2px solid
    ${({ status }) =>
      status === "counter_offer"
        ? "#f59e0b"
        : status === "negotiating"
        ? "#ef4444"
        : "#e5e7eb"};
  border-radius: ${sharedTheme.borderRadius.lg};
  padding: ${sharedTheme.spacing.lg};
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${sharedTheme.shadows.lg};
    border-color: ${({ status }) =>
      status === "counter_offer"
        ? "#f59e0b"
        : status === "negotiating"
        ? "#ef4444"
        : "#1e3a8a40"};
  }

  ${({ status }) =>
    (status === "counter_offer" || status === "negotiating") &&
    `
    animation: glow 2s infinite alternate;
    
    @keyframes glow {
      from { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); }
      to { box-shadow: 0 2px 12px ${
        status === "counter_offer"
          ? "rgba(245, 158, 11, 0.3)"
          : "rgba(239, 68, 68, 0.3)"
      }; }
    }
  `}
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

// Enhanced Amount Display Components
const DealAmountSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const DealAmount = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: #1e3a8a;
`;

const AmountComparison = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
`;

const OriginalAmount = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  text-decoration: line-through;
`;

const CurrentAmount = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: #1e3a8a;
`;

const AmountChange = styled.div<{ increase: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${({ increase }) => (increase ? "#10b981" : "#ef4444")};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
`;

const UnreadBadge = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 12px;
  height: 12px;
  background: #ef4444;
  border-radius: 50%;
  animation: pulse 2s infinite;
`;

// New Negotiation Status Components
const NegotiationStatus = styled.div<{ status: Deal["status"] }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  margin-bottom: ${sharedTheme.spacing.md};
  background: ${({ status }) =>
    status === "counter_offer" ? "#fef3c7" : "#fecaca"};
  border: 1px solid
    ${({ status }) => (status === "counter_offer" ? "#f59e0b" : "#ef4444")};
  border-radius: ${sharedTheme.borderRadius.md};
`;

const StatusIcon = styled.div`
  color: inherit;
`;

const StatusText = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: inherit;
  flex: 1;
`;

const LastActivity = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: inherit;
  opacity: 0.8;
`;

// Counter Offer Preview Components
const CounterOfferPreview = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: ${sharedTheme.spacing.md};
`;

const PreviewTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin-bottom: 0.5rem;
`;

const PreviewItem = styled.div<{ fromType: "brand" | "influencer" }>`
  background: ${({ fromType }) =>
    fromType === "brand" ? "#dbeafe" : "#f0fdf4"};
  border: 1px solid
    ${({ fromType }) => (fromType === "brand" ? "#3b82f6" : "#10b981")};
  border-radius: 6px;
  padding: 0.75rem;
`;

const PreviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
`;

const PreviewMessage = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
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

// New Non-negotiable Tag
const NonNegotiableTag = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: ${sharedTheme.borderRadius.sm};
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  background-color: #6b728020;
  color: #6b7280;
  border: 1px solid #6b728040;
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

// Enhanced Action Button with negotiation variant
const ActionButton = styled.button<{
  variant: "primary" | "secondary" | "negotiation";
}>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: ${sharedTheme.spacing.sm};
  border: 1px solid
    ${(props) =>
      props.variant === "primary"
        ? "#1E3A8A"
        : props.variant === "negotiation"
        ? "#f59e0b"
        : "#1E3A8A"};
  background: ${(props) =>
    props.variant === "primary"
      ? "#1E3A8A"
      : props.variant === "negotiation"
      ? "#f59e0b"
      : "white"};
  color: ${(props) =>
    props.variant === "primary"
      ? "white"
      : props.variant === "negotiation"
      ? "white"
      : "#1E3A8A"};
  border-radius: ${sharedTheme.borderRadius.md};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.variant === "primary"
        ? "#1E3A8A"
        : props.variant === "negotiation"
        ? "#d97706"
        : "#f3f4f6"};
    border-color: ${(props) =>
      props.variant === "primary"
        ? "#1E3A8A"
        : props.variant === "negotiation"
        ? "#d97706"
        : sharedTheme.colorVariants.secondary.light};
    transform: translateY(-1px);
    box-shadow: ${sharedTheme.shadows.sm};
  }

  &:active {
    transform: translateY(0);
  }
`;

// New Modal Styles for Counter Offer
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const ModalTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0;
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${sharedTheme.colorVariants.secondary.light};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    color: ${sharedTheme.colorVariants.secondary.dark};
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const DealSummary = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

const DealSummaryTitle = styled.h4`
  margin: 0 0 0.75rem 0;
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};

  &:last-child {
    margin-bottom: 0;
  }

  span:first-child {
    color: ${sharedTheme.colorVariants.secondary.light};
  }

  span:last-child {
    color: ${sharedTheme.colorVariants.secondary.dark};
    font-weight: ${sharedTheme.typography.fontWeights.medium};
  }
`;

const NegotiationHistory = styled.div`
  margin-bottom: 1.5rem;
`;

const HistoryTitle = styled.h4`
  margin: 0 0 1rem 0;
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const HistoryItem = styled.div<{ fromType: "brand" | "influencer" }>`
  background: ${({ fromType }) =>
    fromType === "brand" ? "#dbeafe" : "#f0fdf4"};
  border: 1px solid
    ${({ fromType }) => (fromType === "brand" ? "#3b82f6" : "#10b981")};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.75rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const HistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const HistoryUser = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const HistoryAmount = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.primary.dark};
`;

const HistoryTime = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const HistoryMessage = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormLabel = styled.label`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const FormInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #3b82f6;
  }

  &::placeholder {
    color: ${sharedTheme.colorVariants.secondary.light};
  }
`;

const FormTextarea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  outline: none;
  transition: border-color 0.2s ease;
  resize: vertical;
  min-height: 100px;

  &:focus {
    border-color: #3b82f6;
  }

  &::placeholder {
    color: ${sharedTheme.colorVariants.secondary.light};
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
`;

const CancelButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: white;
  color: ${sharedTheme.colorVariants.secondary.dark};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f9fafb;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 1px solid #f59e0b;
  border-radius: 6px;
  background: #f59e0b;
  color: white;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #d97706;
  }
`;

export default Deals;
