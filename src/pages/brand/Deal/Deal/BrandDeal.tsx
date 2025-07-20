// pages/brand/Deals/BrandDeals.tsx - Complete Brand Deals Management Page
import React, { useState, useMemo } from "react";
import styled from "styled-components";
import {
  Receipt,
  Search,
  Filter,
  ArrowRightLeft,
  Clock,
  Check,
  X,
  //   AlertCircle,
  DollarSign,
  Calendar,
  //   User,
  MessageSquare,
  Send,
  Eye,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  //   XCircle,
  Star,
  MapPin,
  //   ArrowUpDown,
} from "lucide-react";
import { sharedTheme } from "../../../../styles/theme/theme";
import WrapperBox from "../../../../components/layout/WrapperBox";

// Types
interface Deal {
  id: string;
  campaignId: string;
  campaignName: string;
  influencerId: string;
  influencerName: string;
  influencerUsername: string;
  influencerImage: string;
  influencerFollowers: number;
  originalAmount: number;
  currentAmount: number;
  status:
    | "sent"
    | "counter_offer"
    | "negotiating"
    | "accepted"
    | "rejected"
    | "completed"
    | "expired";
  dealType: "bulk" | "custom";
  sentDate: string;
  expiryDate: string;
  lastActivity: string;
  deliverables: string[];
  paymentStructure: "completion" | "upfront" | "milestone";
  counterOffers?: CounterOffer[];
  isNegotiable: boolean;
  hasUnreadMessages: boolean;
  priority: "High" | "Medium" | "Low";
  location?: string;
  category: string;
  influencerRating?: number;
}

interface CounterOffer {
  id: string;
  fromType: "brand" | "influencer";
  amount: number;
  message: string;
  timestamp: string;
  isActive: boolean;
}

// Enhanced dummy data with more details
const DUMMY_DEALS: Deal[] = [
  {
    id: "deal_001",
    campaignId: "camp_001",
    campaignName: "Summer Collection Launch",
    influencerId: "inf_001",
    influencerName: "Priya Sharma",
    influencerUsername: "@priya_sustainable",
    influencerImage:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    influencerFollowers: 45000,
    originalAmount: 15000,
    currentAmount: 18000,
    status: "counter_offer",
    dealType: "bulk",
    sentDate: "2025-07-15",
    expiryDate: "2025-07-22",
    lastActivity: "2025-07-20",
    deliverables: ["Instagram Reel", "Story Series"],
    paymentStructure: "completion",
    isNegotiable: true,
    hasUnreadMessages: true,
    priority: "High",
    location: "Mumbai",
    category: "Fashion",
    influencerRating: 4.8,
    counterOffers: [
      {
        id: "co_001",
        fromType: "influencer",
        amount: 18000,
        message:
          "I can do this for ₹18,000 considering my engagement rates and the extra story series you've requested.",
        timestamp: "2025-07-20T10:30:00Z",
        isActive: true,
      },
    ],
  },
  {
    id: "deal_002",
    campaignId: "camp_002",
    campaignName: "Tech Product Review",
    influencerId: "inf_002",
    influencerName: "Dev Malhotra",
    influencerUsername: "@dev_lifestyle",
    influencerImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    influencerFollowers: 87000,
    originalAmount: 25000,
    currentAmount: 25000,
    status: "sent",
    dealType: "custom",
    sentDate: "2025-07-18",
    expiryDate: "2025-07-25",
    lastActivity: "2025-07-18",
    deliverables: ["YouTube Video", "Instagram Post"],
    paymentStructure: "milestone",
    isNegotiable: true,
    hasUnreadMessages: false,
    priority: "Medium",
    location: "Delhi",
    category: "Technology",
    influencerRating: 4.6,
    counterOffers: [],
  },
  {
    id: "deal_003",
    campaignId: "camp_001",
    campaignName: "Summer Collection Launch",
    influencerId: "inf_003",
    influencerName: "Anjali Singh",
    influencerUsername: "@anjali_fashion",
    influencerImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    influencerFollowers: 28000,
    originalAmount: 12000,
    currentAmount: 14000,
    status: "negotiating",
    dealType: "bulk",
    sentDate: "2025-07-16",
    expiryDate: "2025-07-23",
    lastActivity: "2025-07-21",
    deliverables: ["Instagram Post", "Story Highlights"],
    paymentStructure: "completion",
    isNegotiable: true,
    hasUnreadMessages: true,
    priority: "High",
    location: "Delhi",
    category: "Fashion",
    influencerRating: 4.9,
    counterOffers: [
      {
        id: "co_002",
        fromType: "influencer",
        amount: 14000,
        message:
          "Can we do ₹14,000? I'll add an extra story highlight for this campaign.",
        timestamp: "2025-07-19T14:20:00Z",
        isActive: false,
      },
      {
        id: "co_003",
        fromType: "brand",
        amount: 13000,
        message: "How about ₹13,000? That's our final budget for this tier.",
        timestamp: "2025-07-20T09:15:00Z",
        isActive: true,
      },
    ],
  },
  {
    id: "deal_004",
    campaignId: "camp_003",
    campaignName: "Wellness Brand Partnership",
    influencerId: "inf_004",
    influencerName: "Riya Patel",
    influencerUsername: "@riya_wellness",
    influencerImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    influencerFollowers: 125000,
    originalAmount: 30000,
    currentAmount: 30000,
    status: "accepted",
    dealType: "custom",
    sentDate: "2025-07-14",
    expiryDate: "2025-07-21",
    lastActivity: "2025-07-19",
    deliverables: ["Instagram Reel", "YouTube Short", "Story Series"],
    paymentStructure: "upfront",
    isNegotiable: false,
    hasUnreadMessages: false,
    priority: "High",
    location: "Goa",
    category: "Wellness",
    influencerRating: 4.7,
    counterOffers: [],
  },
  {
    id: "deal_005",
    campaignId: "camp_004",
    campaignName: "Food Recipe Series",
    influencerId: "inf_005",
    influencerName: "Sneha Gupta",
    influencerUsername: "@sneha_style",
    influencerImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    influencerFollowers: 62000,
    originalAmount: 8000,
    currentAmount: 8000,
    status: "completed",
    dealType: "bulk",
    sentDate: "2025-06-10",
    expiryDate: "2025-06-25",
    lastActivity: "2025-06-24",
    deliverables: ["5 Instagram Reels", "10 Posts"],
    paymentStructure: "completion",
    isNegotiable: true,
    hasUnreadMessages: false,
    priority: "Medium",
    location: "Pune",
    category: "Food",
    influencerRating: 4.5,
    counterOffers: [],
  },
  {
    id: "deal_006",
    campaignId: "camp_005",
    campaignName: "Fitness Challenge",
    influencerId: "inf_006",
    influencerName: "Rohit Fitness",
    influencerUsername: "@rohit_fit",
    influencerImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    influencerFollowers: 95000,
    originalAmount: 20000,
    currentAmount: 22000,
    status: "counter_offer",
    dealType: "custom",
    sentDate: "2025-07-19",
    expiryDate: "2025-07-26",
    lastActivity: "2025-07-21",
    deliverables: ["YouTube Video", "Instagram Reels", "Stories"],
    paymentStructure: "milestone",
    isNegotiable: true,
    hasUnreadMessages: true,
    priority: "Medium",
    location: "Bangalore",
    category: "Fitness",
    influencerRating: 4.4,
    counterOffers: [
      {
        id: "co_004",
        fromType: "influencer",
        amount: 22000,
        message:
          "I'd like ₹22,000 for this collaboration. I can add extra workout tips content.",
        timestamp: "2025-07-21T15:30:00Z",
        isActive: true,
      },
    ],
  },
];

// Helper functions
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

const getStatusColor = (status: Deal["status"]): string => {
  switch (status) {
    case "sent":
      return "#3b82f6";
    case "counter_offer":
      return "#f59e0b";
    case "negotiating":
      return "#ef4444";
    case "accepted":
      return "#10b981";
    case "rejected":
      return "#ef4444";
    case "completed":
      return "#6b7280";
    case "expired":
      return "#9ca3af";
    default:
      return "#6b7280";
  }
};

const BrandDealsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"sent" | "accepted" | "completed">(
    "sent"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "amount" | "priority">("date");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [showCounterOfferModal, setShowCounterOfferModal] = useState(false);
  const [counterOfferAmount, setCounterOfferAmount] = useState("");
  const [counterOfferMessage, setCounterOfferMessage] = useState("");

  // Enhanced filter logic
  const filteredDeals = useMemo(() => {
    return DUMMY_DEALS.filter((deal) => {
      if (activeTab === "sent") {
        return ["sent", "counter_offer", "negotiating"].includes(deal.status);
      } else if (activeTab === "accepted") {
        return ["accepted"].includes(deal.status);
      } else if (activeTab === "completed") {
        return ["completed"].includes(deal.status);
      }
      return false;
    });
  }, [activeTab]);

  // Search and sort functionality
  const processedDeals = filteredDeals
    .filter(
      (deal) =>
        deal.influencerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.influencerUsername.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "amount":
          return b.currentAmount - a.currentAmount;
        case "priority": {
          const priorityOrder = { High: 3, Medium: 2, Low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        default:
          return (
            new Date(b.lastActivity).getTime() -
            new Date(a.lastActivity).getTime()
          );
      }
    });

  // Stats calculations
  const stats = useMemo(() => {
    const totalDeals = DUMMY_DEALS.length;
    const sentDeals = DUMMY_DEALS.filter((d) =>
      ["sent", "counter_offer", "negotiating"].includes(d.status)
    ).length;
    const counterOffers = DUMMY_DEALS.filter(
      (d) => d.status === "counter_offer" || d.status === "negotiating"
    ).length;
    const acceptedDeals = DUMMY_DEALS.filter(
      (d) => d.status === "accepted"
    ).length;
    const unreadMessages = DUMMY_DEALS.filter(
      (d) => d.hasUnreadMessages
    ).length;

    return {
      totalDeals,
      sentDeals,
      counterOffers,
      acceptedDeals,
      unreadMessages,
    };
  }, []);

  const getStatusText = (status: Deal["status"]) => {
    switch (status) {
      case "sent":
        return "Sent";
      case "counter_offer":
        return "Counter Offer";
      case "negotiating":
        return "Negotiating";
      case "accepted":
        return "Accepted";
      case "rejected":
        return "Rejected";
      case "completed":
        return "Completed";
      case "expired":
        return "Expired";
      default:
        return status;
    }
  };

  const getNegotiationStatusText = (deal: Deal): string => {
    if (deal.status === "counter_offer") {
      return "Counter Offer Received";
    } else if (deal.status === "negotiating") {
      return "In Negotiation";
    }
    return "";
  };

  const handleCounterOffer = (deal: Deal) => {
    setSelectedDeal(deal);
    setCounterOfferAmount(deal.currentAmount.toString());
    setShowCounterOfferModal(true);
  };

  const submitCounterOffer = () => {
    console.log("Counter offer submitted:", {
      dealId: selectedDeal?.id,
      amount: counterOfferAmount,
      message: counterOfferMessage,
    });
    setShowCounterOfferModal(false);
    setCounterOfferAmount("");
    setCounterOfferMessage("");
    setSelectedDeal(null);
  };

  return (
    <PageContainer>
      {/* Header Section */}
      <WrapperBox>
        <HeaderSection>
          <HeaderContent>
            <HeaderLeft>
              <HeaderTitle>
                <Receipt size={32} />
                Deals Management
              </HeaderTitle>
              <HeaderSubtitle>
                Manage all your deals, negotiate terms, and track performance
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

      {/* Stats Section */}
      <WrapperBox>
        <StatsContainer>
          <StatCard>
            <StatIcon>
              <Receipt size={20} />
            </StatIcon>
            <StatContent>
              <StatValue>{stats.totalDeals}</StatValue>
              <StatLabel>Total Deals</StatLabel>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIcon>
              <Send size={20} />
            </StatIcon>
            <StatContent>
              <StatValue>{stats.sentDeals}</StatValue>
              <StatLabel>Pending</StatLabel>
            </StatContent>
          </StatCard>

          <StatCard highlight>
            <StatIcon>
              <ArrowRightLeft size={20} />
            </StatIcon>
            <StatContent>
              <StatValue>{stats.counterOffers}</StatValue>
              <StatLabel>Counter Offers</StatLabel>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIcon>
              <CheckCircle size={20} />
            </StatIcon>
            <StatContent>
              <StatValue>{stats.acceptedDeals}</StatValue>
              <StatLabel>Accepted</StatLabel>
            </StatContent>
          </StatCard>

          {stats.unreadMessages > 0 && (
            <StatCard urgent>
              <StatIcon>
                <MessageSquare size={20} />
              </StatIcon>
              <StatContent>
                <StatValue>{stats.unreadMessages}</StatValue>
                <StatLabel>Unread Messages</StatLabel>
              </StatContent>
            </StatCard>
          )}
        </StatsContainer>
      </WrapperBox>

      {/* Navigation Tabs */}
      <WrapperBox>
        <TabsContainer>
          <TabContainer>
            <TabButton
              active={activeTab === "sent"}
              onClick={() => setActiveTab("sent")}
            >
              <Clock size={18} />
              Pending Deals (
              {
                DUMMY_DEALS.filter((d) =>
                  ["sent", "counter_offer", "negotiating"].includes(d.status)
                ).length
              }
              )
            </TabButton>
            <TabButton
              active={activeTab === "accepted"}
              onClick={() => setActiveTab("accepted")}
            >
              <CheckCircle size={18} />
              Accepted Deals (
              {DUMMY_DEALS.filter((d) => d.status === "accepted").length})
            </TabButton>
            <TabButton
              active={activeTab === "completed"}
              onClick={() => setActiveTab("completed")}
            >
              <Check size={18} />
              Completed Deals (
              {DUMMY_DEALS.filter((d) => d.status === "completed").length})
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
                {activeTab === "sent" && <Clock size={48} />}
                {activeTab === "accepted" && <CheckCircle size={48} />}
                {activeTab === "completed" && <Check size={48} />}
              </EmptyStateIcon>
              <EmptyStateTitle>No {activeTab} deals found</EmptyStateTitle>
              <EmptyStateDescription>
                {activeTab === "sent" &&
                  "You don't have any pending deals at the moment."}
                {activeTab === "accepted" &&
                  "No accepted deals to track right now."}
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
                  <InfluencerInfo>
                    <InfluencerAvatar>
                      <InfluencerImage
                        src={deal.influencerImage}
                        alt={deal.influencerName}
                      />
                    </InfluencerAvatar>
                    <InfluencerDetails>
                      <InfluencerName>{deal.influencerName}</InfluencerName>
                      <InfluencerUsername>
                        {deal.influencerUsername}
                      </InfluencerUsername>
                      <InfluencerStats>
                        {(deal.influencerFollowers / 1000).toFixed(0)}K
                        followers
                        {deal.influencerRating && (
                          <RatingDisplay>
                            <Star size={12} fill="#fbbf24" color="#fbbf24" />
                            {deal.influencerRating}
                          </RatingDisplay>
                        )}
                      </InfluencerStats>
                    </InfluencerDetails>
                  </InfluencerInfo>
                  <DealAmountSection>
                    {deal.currentAmount !== deal.originalAmount ? (
                      <AmountComparison>
                        <OriginalAmount>
                          ₹{deal.originalAmount.toLocaleString()}
                        </OriginalAmount>
                        <CurrentAmount>
                          ₹{deal.currentAmount.toLocaleString()}
                        </CurrentAmount>
                        <AmountChange
                          increase={deal.currentAmount > deal.originalAmount}
                        >
                          {deal.currentAmount > deal.originalAmount ? (
                            <TrendingUp size={14} />
                          ) : (
                            <TrendingDown size={14} />
                          )}
                          {Math.abs(
                            ((deal.currentAmount - deal.originalAmount) /
                              deal.originalAmount) *
                              100
                          ).toFixed(0)}
                          %
                        </AmountChange>
                      </AmountComparison>
                    ) : (
                      <DealAmount>
                        ₹{deal.currentAmount.toLocaleString()}
                      </DealAmount>
                    )}
                    {deal.hasUnreadMessages && <UnreadBadge />}
                  </DealAmountSection>
                </DealHeader>

                <CampaignTitle>{deal.campaignName}</CampaignTitle>

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
                        Last activity:{" "}
                        {new Date(deal.lastActivity).toLocaleDateString()}
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
                            {offer.fromType === "brand"
                              ? "You"
                              : deal.influencerName}
                          </span>
                          <span>₹{offer.amount.toLocaleString()}</span>
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
                        ? `Completed: ${new Date(
                            deal.lastActivity
                          ).toLocaleDateString()}`
                        : activeTab === "accepted"
                        ? `Accepted: ${new Date(
                            deal.lastActivity
                          ).toLocaleDateString()}`
                        : `Sent: ${new Date(
                            deal.sentDate
                          ).toLocaleDateString()}`}
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
                  <StatusBadge status={deal.status}>
                    {deal.status === "counter_offer" && (
                      <ArrowRightLeft size={12} />
                    )}
                    {deal.status === "sent" && <Send size={12} />}
                    {deal.status === "accepted" && <Check size={12} />}
                    {deal.status === "rejected" && <X size={12} />}
                    {deal.status === "negotiating" && (
                      <MessageSquare size={12} />
                    )}
                    {deal.status === "completed" && <CheckCircle size={12} />}
                    {deal.status === "expired" && <Clock size={12} />}
                    {getStatusText(deal.status)}
                  </StatusBadge>
                </DealMeta>

                <DeliverablesSection>
                  <SectionTitle>Deliverables</SectionTitle>
                  <DeliverablesList>
                    {deal.deliverables.map((deliverable, index) => (
                      <DeliverableTag key={index}>{deliverable}</DeliverableTag>
                    ))}
                  </DeliverablesList>
                </DeliverablesSection>

                <DealActions>
                  {activeTab === "sent" && deal.status === "sent" && (
                    <>
                      <ActionButton variant="secondary">
                        <MessageSquare size={16} />
                        Message
                      </ActionButton>
                      <ActionButton variant="secondary">
                        <Eye size={16} />
                        View Details
                      </ActionButton>
                    </>
                  )}

                  {activeTab === "sent" &&
                    (deal.status === "counter_offer" ||
                      deal.status === "negotiating") && (
                      <>
                        <ActionButton
                          variant="primary"
                          onClick={() => handleCounterOffer(deal)}
                        >
                          <ArrowRightLeft size={16} />
                          Counter Offer
                        </ActionButton>
                        <ActionButton variant="secondary">
                          <MessageSquare size={16} />
                          View Negotiation
                        </ActionButton>
                        <ActionButton variant="secondary">
                          <Eye size={16} />
                          View Details
                        </ActionButton>
                      </>
                    )}

                  {activeTab === "accepted" && (
                    <>
                      <ActionButton variant="primary">
                        <CheckCircle size={16} />
                        Track Progress
                      </ActionButton>
                      <ActionButton variant="secondary">
                        <MessageSquare size={16} />
                        Message
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

      {/* Counter Offer Modal */}
      {showCounterOfferModal && selectedDeal && (
        <ModalOverlay onClick={() => setShowCounterOfferModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                <ArrowRightLeft size={24} />
                Send Counter Offer
              </ModalTitle>
              <CloseButton onClick={() => setShowCounterOfferModal(false)}>
                <X size={20} />
              </CloseButton>
            </ModalHeader>

            <ModalBody>
              <DealSummary>
                <DealSummaryTitle>Deal Summary</DealSummaryTitle>
                <SummaryRow>
                  <span>Influencer:</span>
                  <span>{selectedDeal.influencerName}</span>
                </SummaryRow>
                <SummaryRow>
                  <span>Campaign:</span>
                  <span>{selectedDeal.campaignName}</span>
                </SummaryRow>
                <SummaryRow>
                  <span>Original Amount:</span>
                  <span>₹{selectedDeal.originalAmount.toLocaleString()}</span>
                </SummaryRow>
                <SummaryRow>
                  <span>Their Offer:</span>
                  <span>₹{selectedDeal.currentAmount.toLocaleString()}</span>
                </SummaryRow>
              </DealSummary>

              {/* Previous Counter Offers */}
              {selectedDeal.counterOffers &&
                selectedDeal.counterOffers.length > 0 && (
                  <CounterOfferHistory>
                    <HistoryTitle>Negotiation History</HistoryTitle>
                    {selectedDeal.counterOffers.map((offer) => (
                      <HistoryItem key={offer.id} fromType={offer.fromType}>
                        <HistoryHeader>
                          <HistoryUser>
                            {offer.fromType === "brand"
                              ? "You"
                              : selectedDeal.influencerName}
                          </HistoryUser>
                          <HistoryAmount>
                            ₹{offer.amount.toLocaleString()}
                          </HistoryAmount>
                          <HistoryTime>
                            {new Date(offer.timestamp).toLocaleDateString()}
                          </HistoryTime>
                        </HistoryHeader>
                        <HistoryMessage>{offer.message}</HistoryMessage>
                      </HistoryItem>
                    ))}
                  </CounterOfferHistory>
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
              <CancelButton onClick={() => setShowCounterOfferModal(false)}>
                Cancel
              </CancelButton>
              <SubmitButton onClick={submitCounterOffer}>
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

// Styled Components using the same structure as influencer deals
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

// Stats Styles
const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const StatCard = styled.div<{ highlight?: boolean; urgent?: boolean }>`
  background: white;
  border: 1px solid
    ${({ highlight }) =>
      highlight ? "#f59e0b" : ({ urgent }) => (urgent ? "#ef4444" : "#e5e7eb")};
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  ${({ highlight }) =>
    highlight &&
    `
    background: linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%);
    border-color: #f59e0b;
  `}

  ${({ urgent }) =>
    urgent &&
    `
    background: linear-gradient(135deg, #fecaca 0%, #ef4444 100%);
    border-color: #ef4444;
    animation: pulse 2s infinite;
  `}

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.02);
    }
  }
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xxl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: white;
`;

const StatLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: rgba(255, 255, 255, 0.8);
`;

// Tabs Styles
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

const InfluencerInfo = styled.div`
  display: flex;
  gap: ${sharedTheme.spacing.sm};
  flex: 1;
`;

const InfluencerAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${sharedTheme.borderRadius.md};
  overflow: hidden;
  border: 2px solid #e5e7eb;
`;

const InfluencerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfluencerDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const InfluencerName = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${"#1E3A8A"};
  margin-bottom: 0.25rem;
`;

const InfluencerUsername = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin-bottom: 0.25rem;
`;

const InfluencerStats = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const RatingDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-left: 0.5rem;
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

const CampaignTitle = styled.h3`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${"#1E3A8A"};
  margin: 0 0 1rem 0;
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

const StatusBadge = styled.div<{ status: Deal["status"] }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: ${sharedTheme.borderRadius.sm};
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${({ status }) => getStatusColor(status)};
  background: ${({ status }) => `${getStatusColor(status)}20`};
  border: 1px solid ${({ status }) => `${getStatusColor(status)}40`};
  text-transform: capitalize;
  white-space: nowrap;
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

// Modal Styles
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

const CounterOfferHistory = styled.div`
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
  border: 1px solid #3b82f6;
  border-radius: 6px;
  background: #3b82f6;
  color: white;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #2563eb;
  }
`;

export default BrandDealsPage;
