// pages/brand/campaign/CustomDeals/CustomDealsPage.tsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Send,
  Users,
  Edit3,
  //   Eye,
  Plus,
  Check,
  Clock,
  DollarSign,
  Target,
  Calendar,
  FileText,
  //   Settings,
  X,
  AlertCircle,
} from "lucide-react";
import { sharedTheme } from "../../../../styles/theme/theme";
import ActionButton from "../../Campaign/Brand Campaign/shared/ActionButton";
import Drawer from "../../../../components/layout/Drawer";

// Types
interface Campaign {
  id: string;
  name: string;
  budget: number;
  spent: number;
  platform: string;
  category: string;
  hashtags: string[];
  contentGuidelines: string[];
  dosAndDonts: {
    dos: string[];
    donts: string[];
  };
  productDetails: string;
  legalRequirements: string;
  poc: {
    name: string;
    email: string;
    phone: string;
  };
}

interface SelectedInfluencer {
  id: string;
  username: string;
  displayName: string;
  profileImage: string;
  followers: number;
  engagementRate: number;
  location: string;
  suggestedRate: number;
  rating: number;
}

interface DealFormData {
  dealAmount: number;
  dealCurrency: string;
  dealPaymentStructure: "upfront" | "milestone" | "completion" | "custom";
  dealNegotiableAmount: boolean;
  dealDeliverables: {
    dealDeliverableType: string;
    dealDeliverablePlatform: string;
    dealDeliverableQuantity: number;
    dealDeliverableDescription: string;
  }[];
  dealSubmissionDeadline: string;
  dealPostingDeadline: string;
  dealExpiryDate: string;
  dealHashtags: string[];
  dealContentGuidelines: string[];
  dealDosAndDonts: {
    dealDos: string[];
    dealDonts: string[];
  };
  dealApplicationMessage: string;
}

type DealStatus = "pending" | "configured" | "editing";

// Dummy Data
const DUMMY_SELECTED_INFLUENCERS: SelectedInfluencer[] = [
  {
    id: "inf_001",
    username: "@priya_sustainable",
    displayName: "Priya Sharma",
    profileImage:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    followers: 45000,
    engagementRate: 4.5,
    location: "Mumbai, India",
    suggestedRate: 15000,
    rating: 4.8,
  },
  {
    id: "inf_002",
    username: "@riya_beachbabe",
    displayName: "Riya Patel",
    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    followers: 125000,
    engagementRate: 3.8,
    location: "Goa, India",
    suggestedRate: 25000,
    rating: 4.6,
  },
  {
    id: "inf_003",
    username: "@anjali_fashion",
    displayName: "Anjali Singh",
    profileImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    followers: 28000,
    engagementRate: 5.2,
    location: "Delhi, India",
    suggestedRate: 12000,
    rating: 4.9,
  },
  {
    id: "inf_004",
    username: "@dev_lifestyle",
    displayName: "Dev Malhotra",
    profileImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    followers: 87000,
    engagementRate: 4.1,
    location: "Bangalore, India",
    suggestedRate: 18000,
    rating: 4.7,
  },
  {
    id: "inf_005",
    username: "@sneha_style",
    displayName: "Sneha Gupta",
    profileImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    followers: 62000,
    engagementRate: 3.9,
    location: "Pune, India",
    suggestedRate: 16000,
    rating: 4.5,
  },
  {
    id: "inf_006",
    username: "@arjun_travel",
    displayName: "Arjun Mehta",
    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    followers: 156000,
    engagementRate: 3.2,
    location: "Chennai, India",
    suggestedRate: 28000,
    rating: 4.4,
  },
];

const CustomDealsPage: React.FC = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const navigate = useNavigate();

  const selectedInfluencers: SelectedInfluencer[] = DUMMY_SELECTED_INFLUENCERS;
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [dealConfigurations, setDealConfigurations] = useState<
    Record<string, DealFormData>
  >({});
  const [dealStatuses, setDealStatuses] = useState<Record<string, DealStatus>>(
    {}
  );
  const [currentEditingInfluencer, setCurrentEditingInfluencer] =
    useState<SelectedInfluencer | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Enhanced mock campaign data
  useEffect(() => {
    if (campaignId) {
      const mockCampaign: Campaign = {
        id: campaignId,
        name: "Summer Fashion Collection 2024",
        budget: 500000,
        spent: 0,
        platform: "Instagram",
        category: "Fashion",
        hashtags: [
          "#SummerFashion2024",
          "#StyleHub",
          "#OOTD",
          "#SustainableFashion",
        ],
        contentGuidelines: [
          "Use natural lighting for product shots",
          "Show product in lifestyle settings",
          "Include styling tips in captions",
          "Tag our brand handle prominently",
        ],
        dosAndDonts: {
          dos: [
            "Showcase multiple outfit combinations",
            "Highlight fabric quality and comfort",
            "Share authentic styling experiences",
            "Use provided discount codes",
          ],
          donts: [
            "Don't use heavy filters that distort colors",
            "Avoid competitor brand mentions",
            "Don't post during restricted hours (12-2 AM)",
            "Don't use inappropriate background music",
          ],
        },
        productDetails:
          "Sustainable summer collection featuring organic cotton and recycled materials",
        legalRequirements:
          "Must include #ad disclosure and follow ASCI guidelines",
        poc: {
          name: "Sarah Marketing",
          email: "sarah@stylehub.com",
          phone: "+91 98765 43210",
        },
      };
      setCampaign(mockCampaign);

      // Initialize all influencers as pending
      const initialStatuses: Record<string, DealStatus> = {};
      selectedInfluencers.forEach((inf) => {
        initialStatuses[inf.id] = "pending";
      });
      setDealStatuses(initialStatuses);
    }
  }, [campaignId]);

  // Calculate progress and totals
  const configuredDeals = Object.keys(dealConfigurations).length;
  const totalInfluencers = selectedInfluencers.length;
  const progressPercentage = (configuredDeals / totalInfluencers) * 100;
  const totalConfiguredCost = Object.values(dealConfigurations).reduce(
    (sum, deal) => sum + deal.dealAmount,
    0
  );
  const remainingBudget = campaign
    ? campaign.budget - campaign.spent - totalConfiguredCost
    : 0;

  const getDefaultDealData = (
    influencer: SelectedInfluencer
  ): DealFormData => ({
    dealAmount: influencer.suggestedRate,
    dealCurrency: "INR",
    dealPaymentStructure: "completion",
    dealNegotiableAmount: true,
    dealDeliverables: [
      {
        dealDeliverableType: "Posts",
        dealDeliverablePlatform: campaign?.platform || "Instagram",
        dealDeliverableQuantity: 2,
        dealDeliverableDescription: "High-quality posts featuring the product",
      },
    ],
    dealSubmissionDeadline: "",
    dealPostingDeadline: "",
    dealExpiryDate: "7",
    dealHashtags: campaign?.hashtags || [],
    dealContentGuidelines: campaign?.contentGuidelines || [],
    dealDosAndDonts: campaign?.dosAndDonts || { dos: [], donts: [] },
    dealApplicationMessage: `Hi ${influencer.displayName}! We love your content and would love to collaborate with you for our latest campaign. Your style perfectly aligns with our brand values. Please check the details and let us know if you're interested!`,
  });

  const handleCreateDeal = (influencer: SelectedInfluencer) => {
    setCurrentEditingInfluencer(influencer);
    setActiveTab(0);
    setModalOpen(true);
  };

  const handleEditDeal = (influencer: SelectedInfluencer) => {
    setCurrentEditingInfluencer(influencer);
    setActiveTab(0);
    setModalOpen(true);
  };

  const handleSaveDeal = (dealData: DealFormData) => {
    if (currentEditingInfluencer) {
      setDealConfigurations((prev) => ({
        ...prev,
        [currentEditingInfluencer.id]: dealData,
      }));
      setDealStatuses((prev) => ({
        ...prev,
        [currentEditingInfluencer.id]: "configured",
      }));
    }
    setModalOpen(false);
    setCurrentEditingInfluencer(null);
  };

  const handleDeleteDeal = (influencerId: string) => {
    setDealConfigurations((prev) => {
      const updated = { ...prev };
      delete updated[influencerId];
      return updated;
    });
    setDealStatuses((prev) => ({
      ...prev,
      [influencerId]: "pending",
    }));
  };

  const handleSendAllDeals = () => {
    console.log("Sending all custom deals:", {
      campaignId,
      dealConfigurations,
      totalCost: totalConfiguredCost,
    });

    navigate(`/brand/campaigns/${campaignId}/deals-sent`, {
      state: {
        dealsCount: configuredDeals,
        totalCost: totalConfiguredCost,
        dealType: "custom",
      },
    });
  };

  const handleBack = () => {
    navigate(`/brand/campaigns/${campaignId}/influencer-discovery`);
  };

  // Influencer Glimpse Component (reused from bulk deals)
  const InfluencerGlimpse: React.FC = () => {
    const displayCount = 4;
    const remainingCount = selectedInfluencers.length - displayCount;

    return (
      <InfluencerGlimpseContainer>
        <GlimpseHeader>
          <Users size={16} />
          <span>Selected Influencers ({selectedInfluencers.length})</span>
        </GlimpseHeader>
        <ProfilePicsContainer>
          {selectedInfluencers
            .slice(0, displayCount)
            .map((influencer, index) => (
              <ProfilePic
                key={influencer.id}
                src={influencer.profileImage}
                alt={influencer.displayName}
                style={{ zIndex: displayCount - index }}
              />
            ))}
          {remainingCount > 0 && (
            <RemainingCount>+{remainingCount}</RemainingCount>
          )}
        </ProfilePicsContainer>
        <EstimatedReach>
          Est. Total Reach:{" "}
          {(
            selectedInfluencers.reduce((sum, inf) => sum + inf.followers, 0) /
            1000
          ).toFixed(0)}
          K
        </EstimatedReach>
      </InfluencerGlimpseContainer>
    );
  };

  // Deal Status Badge Component
  const DealStatusBadge: React.FC<{ status: DealStatus }> = ({ status }) => (
    <StatusBadge status={status}>
      {status === "pending" && <Clock size={14} />}
      {status === "configured" && <Check size={14} />}
      {status === "editing" && <Edit3 size={14} />}
      <span>
        {status === "pending" && "Pending"}
        {status === "configured" && "Configured"}
        {status === "editing" && "Editing"}
      </span>
    </StatusBadge>
  );

  // Individual Influencer Deal Card
  const InfluencerDealCard: React.FC<{ influencer: SelectedInfluencer }> = ({
    influencer,
  }) => {
    const dealData = dealConfigurations[influencer.id];
    const status = dealStatuses[influencer.id] || "pending";

    return (
      <DealCard status={status}>
        <CardHeader>
          <InfluencerInfo>
            <InfluencerAvatar
              src={influencer.profileImage}
              alt={influencer.displayName}
            />
            <div>
              <InfluencerName>{influencer.username}</InfluencerName>
              <InfluencerStats>
                {(influencer.followers / 1000).toFixed(0)}K followers •{" "}
                {influencer.engagementRate}% engagement
              </InfluencerStats>
              <InfluencerLocation>{influencer.location}</InfluencerLocation>
            </div>
          </InfluencerInfo>
          <DealStatusBadge status={status} />
        </CardHeader>

        <CardContent>
          {status === "pending" ? (
            <PendingContent>
              <SuggestedRate>
                <DollarSign size={16} />
                Suggested: ₹{influencer.suggestedRate.toLocaleString()}
              </SuggestedRate>
              <CreateDealButton onClick={() => handleCreateDeal(influencer)}>
                <Plus size={16} />
                Create Deal
              </CreateDealButton>
            </PendingContent>
          ) : (
            <ConfiguredContent>
              <DealSummary>
                <DealAmount>₹{dealData.dealAmount.toLocaleString()}</DealAmount>
                <DealDetails>
                  {dealData.dealDeliverables.reduce(
                    (sum, del) => sum + del.dealDeliverableQuantity,
                    0
                  )}{" "}
                  deliverables
                  {dealData.dealNegotiableAmount && " • Negotiable"}
                </DealDetails>
              </DealSummary>
              <CardActions>
                <ActionButton
                  onClick={() => handleEditDeal(influencer)}
                  variant="secondary"
                  //   size="sm"
                >
                  <Edit3 size={14} />
                  Edit
                </ActionButton>
                <DeleteButton onClick={() => handleDeleteDeal(influencer.id)}>
                  <X size={14} />
                </DeleteButton>
              </CardActions>
            </ConfiguredContent>
          )}
        </CardContent>
      </DealCard>
    );
  };

  // Deal Creation Modal Component
  const DealCreationModal: React.FC = () => {
    const [formData, setFormData] = useState<DealFormData>(() =>
      currentEditingInfluencer
        ? dealConfigurations[currentEditingInfluencer.id] ||
          getDefaultDealData(currentEditingInfluencer)
        : getDefaultDealData(selectedInfluencers[0])
    );

    const tabs = [
      { id: 0, label: "Payment", icon: DollarSign },
      { id: 1, label: "Deliverables", icon: Target },
      { id: 2, label: "Timeline", icon: Calendar },
      { id: 3, label: "Content", icon: FileText },
    ];

    const handleInputChange = <K extends keyof DealFormData>(
      field: K,
      value: DealFormData[K]
    ) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const addDeliverable = () => {
      setFormData((prev) => ({
        ...prev,
        dealDeliverables: [
          ...prev.dealDeliverables,
          {
            dealDeliverableType: "Posts",
            dealDeliverablePlatform: campaign?.platform || "Instagram",
            dealDeliverableQuantity: 1,
            dealDeliverableDescription: "Additional deliverable",
          },
        ],
      }));
    };

    const updateDeliverable = (
      index: number,
      field: string,
      value: string | number
    ) => {
      setFormData((prev) => ({
        ...prev,
        dealDeliverables: prev.dealDeliverables.map((del, i) =>
          i === index ? { ...del, [field]: value } : del
        ),
      }));
    };

    const removeDeliverable = (index: number) => {
      setFormData((prev) => ({
        ...prev,
        dealDeliverables: prev.dealDeliverables.filter((_, i) => i !== index),
      }));
    };

    const renderTabContent = () => {
      switch (activeTab) {
        case 0: // Payment
          return (
            <TabContent>
              <FormGroup>
                <FormLabel required>Payment Amount (₹)</FormLabel>
                <FormInput
                  type="number"
                  value={formData.dealAmount}
                  onChange={(e) =>
                    handleInputChange("dealAmount", Number(e.target.value))
                  }
                  placeholder="Enter amount"
                />
                <SuggestedPricing>
                  Suggested: ₹
                  {currentEditingInfluencer?.suggestedRate.toLocaleString()}
                </SuggestedPricing>
              </FormGroup>

              <FormGroup>
                <FormLabel>Payment Structure</FormLabel>
                <PaymentOptions>
                  {["completion", "upfront", "milestone"].map((structure) => (
                    <PaymentOption
                      key={structure}
                      active={formData.dealPaymentStructure === structure}
                      onClick={() =>
                        handleInputChange(
                          "dealPaymentStructure",
                          structure as DealFormData["dealPaymentStructure"]
                        )
                      }
                    >
                      {structure === "completion" && "On Completion"}
                      {structure === "upfront" && "Upfront Payment"}
                      {structure === "milestone" && "Milestone Based"}
                    </PaymentOption>
                  ))}
                </PaymentOptions>
              </FormGroup>

              <CheckboxGroup>
                <Checkbox
                  checked={formData.dealNegotiableAmount}
                  onChange={(e) =>
                    handleInputChange("dealNegotiableAmount", e.target.checked)
                  }
                />
                <label>Allow negotiation</label>
              </CheckboxGroup>
            </TabContent>
          );

        case 1: // Deliverables
          return (
            <TabContent>
              <DeliverablesContainer>
                {formData.dealDeliverables.map((deliverable, index) => (
                  <DeliverableCard key={index}>
                    <DeliverableHeader>
                      <h4>Deliverable {index + 1}</h4>
                      {formData.dealDeliverables.length > 1 && (
                        <RemoveButton onClick={() => removeDeliverable(index)}>
                          <X size={16} />
                        </RemoveButton>
                      )}
                    </DeliverableHeader>

                    <FormRow>
                      <FormGroup>
                        <FormLabel>Content Type</FormLabel>
                        <FormSelect
                          value={deliverable.dealDeliverableType}
                          onChange={(e) =>
                            updateDeliverable(
                              index,
                              "dealDeliverableType",
                              e.target.value
                            )
                          }
                        >
                          <option value="Posts">Posts</option>
                          <option value="Stories">Stories</option>
                          <option value="Reels">Reels</option>
                          <option value="IGTV">IGTV</option>
                        </FormSelect>
                      </FormGroup>

                      <FormGroup>
                        <FormLabel>Quantity</FormLabel>
                        <FormInput
                          type="number"
                          min="1"
                          value={deliverable.dealDeliverableQuantity}
                          onChange={(e) =>
                            updateDeliverable(
                              index,
                              "dealDeliverableQuantity",
                              Number(e.target.value)
                            )
                          }
                        />
                      </FormGroup>
                    </FormRow>

                    <FormGroup>
                      <FormLabel>Description</FormLabel>
                      <FormTextarea
                        value={deliverable.dealDeliverableDescription}
                        onChange={(e) =>
                          updateDeliverable(
                            index,
                            "dealDeliverableDescription",
                            e.target.value
                          )
                        }
                        placeholder="Describe this deliverable..."
                      />
                    </FormGroup>
                  </DeliverableCard>
                ))}

                <AddButton onClick={addDeliverable}>
                  <Plus size={16} />
                  Add Deliverable
                </AddButton>
              </DeliverablesContainer>
            </TabContent>
          );

        case 2: // Timeline
          return (
            <TabContent>
              <FormRow>
                <FormGroup>
                  <FormLabel required>Submission Deadline</FormLabel>
                  <FormInput
                    type="datetime-local"
                    value={formData.dealSubmissionDeadline}
                    onChange={(e) =>
                      handleInputChange(
                        "dealSubmissionDeadline",
                        e.target.value
                      )
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel required>Go-Live Date</FormLabel>
                  <FormInput
                    type="datetime-local"
                    value={formData.dealPostingDeadline}
                    onChange={(e) =>
                      handleInputChange("dealPostingDeadline", e.target.value)
                    }
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <FormLabel>Deal Expiry</FormLabel>
                <FormSelect
                  value={formData.dealExpiryDate}
                  onChange={(e) =>
                    handleInputChange("dealExpiryDate", e.target.value)
                  }
                >
                  <option value="3">3 days</option>
                  <option value="7">7 days</option>
                  <option value="14">14 days</option>
                  <option value="30">30 days</option>
                </FormSelect>
              </FormGroup>
            </TabContent>
          );

        case 3: // Content
          return (
            <TabContent>
              <FormGroup>
                <FormLabel>
                  Required Hashtags ({formData.dealHashtags.length})
                </FormLabel>
                <TagContainer>
                  {formData.dealHashtags.map((hashtag, index) => (
                    <Tag key={index}>
                      {hashtag}
                      <button
                        onClick={() => {
                          const newHashtags = formData.dealHashtags.filter(
                            (_, i) => i !== index
                          );
                          handleInputChange("dealHashtags", newHashtags);
                        }}
                      >
                        <X size={12} />
                      </button>
                    </Tag>
                  ))}
                </TagContainer>
              </FormGroup>

              <FormGroup>
                <FormLabel>Personalized Message</FormLabel>
                <FormTextarea
                  value={formData.dealApplicationMessage}
                  onChange={(e) =>
                    handleInputChange("dealApplicationMessage", e.target.value)
                  }
                  placeholder="Write a personalized message..."
                  rows={4}
                />
              </FormGroup>
            </TabContent>
          );

        default:
          return null;
      }
    };

    return (
      <Drawer
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Deal: ${currentEditingInfluencer?.username}`}
        size="lg"
      >
        <ModalContent>
          <InfluencerPreview>
            <img
              src={currentEditingInfluencer?.profileImage}
              alt={currentEditingInfluencer?.displayName}
            />
            <div>
              <h3>{currentEditingInfluencer?.username}</h3>
              <p>
                {(currentEditingInfluencer?.followers || 0) / 1000}K followers •{" "}
                {currentEditingInfluencer?.engagementRate}% engagement
              </p>
            </div>
          </InfluencerPreview>

          <TabNavigation>
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon size={16} />
                {tab.label}
              </TabButton>
            ))}
          </TabNavigation>

          {renderTabContent()}

          <ModalFooter>
            <ActionButton
              onClick={() => setModalOpen(false)}
              variant="secondary"
            >
              Cancel
            </ActionButton>
            <ActionButton onClick={() => handleSaveDeal(formData)} primary>
              Save Deal
            </ActionButton>
          </ModalFooter>
        </ModalContent>
      </Drawer>
    );
  };

  if (!campaign) {
    return (
      <LoadingContainer>
        <div>Loading campaign...</div>
      </LoadingContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader>
        <BackButton onClick={handleBack}>
          <ArrowLeft size={20} />
          Back to Discovery
        </BackButton>

        <HeaderContent>
          <PageTitle>🎨 Custom Deal Creation</PageTitle>
          <PageSubtitle>{campaign.name}</PageSubtitle>
        </HeaderContent>

        <InfluencerGlimpse />
      </PageHeader>

      {/* Progress Section */}
      <ProgressSection>
        <ProgressInfo>
          <ProgressTitle>
            📊 Progress: {configuredDeals}/{totalInfluencers} deals configured
          </ProgressTitle>
          <ProgressBar>
            <ProgressFill style={{ width: `${progressPercentage}%` }} />
          </ProgressBar>
          <ProgressText>{progressPercentage.toFixed(0)}% complete</ProgressText>
        </ProgressInfo>

        <BudgetInfo>
          <BudgetItem>
            <span>Total Cost:</span>
            <span>₹{totalConfiguredCost.toLocaleString()}</span>
          </BudgetItem>
          <BudgetItem>
            <span>Remaining Budget:</span>
            <span>₹{remainingBudget.toLocaleString()}</span>
          </BudgetItem>
        </BudgetInfo>
      </ProgressSection>

      {/* Influencer Cards Grid */}
      <CardsGrid>
        {selectedInfluencers.map((influencer) => (
          <InfluencerDealCard key={influencer.id} influencer={influencer} />
        ))}
      </CardsGrid>

      {/* Summary & Actions */}
      <SummarySection>
        <SummaryCard>
          <SummaryTitle>Deal Summary</SummaryTitle>
          <SummaryGrid>
            <SummaryItem>
              <span>Configured Deals:</span>
              <span>
                {configuredDeals}/{totalInfluencers}
              </span>
            </SummaryItem>
            <SummaryItem>
              <span>Total Investment:</span>
              <span>₹{totalConfiguredCost.toLocaleString()}</span>
            </SummaryItem>
            <SummaryItem>
              <span>Avg. Cost per Deal:</span>
              <span>
                ₹
                {configuredDeals > 0
                  ? (totalConfiguredCost / configuredDeals).toLocaleString()
                  : "0"}
              </span>
            </SummaryItem>
            <SummaryItem>
              <span>Budget Remaining:</span>
              <span className={remainingBudget < 0 ? "negative" : "positive"}>
                ₹{remainingBudget.toLocaleString()}
              </span>
            </SummaryItem>
          </SummaryGrid>

          {configuredDeals === totalInfluencers ? (
            <SendAllButton onClick={handleSendAllDeals}>
              <Send size={16} />
              Send All Deals ({configuredDeals})
            </SendAllButton>
          ) : (
            <IncompleteMessage>
              <AlertCircle size={16} />
              Configure {totalInfluencers - configuredDeals} more deal(s) to
              send all
            </IncompleteMessage>
          )}
        </SummaryCard>
      </SummarySection>

      {/* Deal Creation Modal */}
      {modalOpen && <DealCreationModal />}
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
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
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
  transition: color 0.2s ease;

  &:hover {
    color: ${sharedTheme.colorVariants.secondary.dark};
  }
`;

const HeaderContent = styled.div`
  flex: 1;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: ${sharedTheme.typography.fontSizes.xxxl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0 0 0.5rem 0;
`;

const PageSubtitle = styled.h2`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin: 0;
`;

// Influencer Glimpse Components (reused from bulk deals)
const InfluencerGlimpseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-width: 200px;

  @media (max-width: 768px) {
    min-width: auto;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const GlimpseHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const ProfilePicsContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const ProfilePic = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid white;
  margin-left: -8px;
  position: relative;
  object-fit: cover;

  &:first-child {
    margin-left: 0;
  }
`;

const RemainingCount = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${sharedTheme.colorVariants.primary.dark};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  margin-left: -8px;
  border: 2px solid white;
`;

const EstimatedReach = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
  text-align: center;
`;

// Progress Section
const ProgressSection = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ProgressInfo = styled.div`
  flex: 1;
`;

const ProgressTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(
    90deg,
    ${sharedTheme.colorVariants.primary.light},
    ${sharedTheme.colorVariants.primary.dark}
  );
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const BudgetInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const BudgetItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};

  span:first-child {
    color: ${sharedTheme.colorVariants.secondary.light};
  }

  span:last-child {
    font-weight: ${sharedTheme.typography.fontWeights.semibold};
    color: ${sharedTheme.colorVariants.secondary.dark};
  }
`;

// Cards Grid
const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Deal Card Components
const DealCard = styled.div<{ status: DealStatus }>`
  background: white;
  border: 2px solid
    ${(props) =>
      props.status === "configured"
        ? sharedTheme.colorVariants.primary.light
        : props.status === "editing"
        ? "#f59e0b"
        : "#e5e7eb"};
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.2s ease;

  &:hover {
    shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const InfluencerInfo = styled.div`
  display: flex;
  gap: 0.75rem;
  flex: 1;
`;

const InfluencerAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const InfluencerName = styled.h4`
  margin: 0 0 0.25rem 0;
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const InfluencerStats = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin-bottom: 0.25rem;
`;

const InfluencerLocation = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const StatusBadge = styled.div<{ status: DealStatus }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};

  background: ${(props) =>
    props.status === "configured"
      ? "#dcfce7"
      : props.status === "editing"
      ? "#fef3c7"
      : "#f3f4f6"};

  color: ${(props) =>
    props.status === "configured"
      ? "#16a34a"
      : props.status === "editing"
      ? "#d97706"
      : "#6b7280"};
`;

const CardContent = styled.div`
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PendingContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SuggestedRate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const CreateDealButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 2px dashed ${sharedTheme.colorVariants.primary.dark};
  border-radius: 8px;
  background: transparent;
  color: ${sharedTheme.colorVariants.primary.dark};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${sharedTheme.colorVariants.primary.dark}10;
  }
`;

const ConfiguredContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DealSummary = styled.div`
  flex: 1;
`;

const DealAmount = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.primary.dark};
  margin-bottom: 0.25rem;
`;

const DealDetails = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const DeleteButton = styled.button`
  padding: 0.5rem;
  border: 1px solid #ef4444;
  border-radius: 6px;
  background: white;
  color: #ef4444;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: #ef4444;
    color: white;
  }
`;

// Summary Section
const SummarySection = styled.div`
  margin-bottom: 2rem;
`;

const SummaryCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 2rem;
`;

const SummaryTitle = styled.h3`
  margin: 0 0 1.5rem 0;
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;

  span:first-child {
    color: ${sharedTheme.colorVariants.secondary.light};
    font-size: ${sharedTheme.typography.fontSizes.sm};
  }

  span:last-child {
    font-weight: ${sharedTheme.typography.fontWeights.semibold};
    color: ${sharedTheme.colorVariants.secondary.dark};
    font-size: ${sharedTheme.typography.fontSizes.md};

    &.positive {
      color: #16a34a;
    }

    &.negative {
      color: #ef4444;
    }
  }
`;

const SendAllButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  background: ${sharedTheme.colorVariants.primary.dark};
  color: white;
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${sharedTheme.colorVariants.primary.darker};
    transform: translateY(-1px);
  }
`;

const IncompleteMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  background: #fef3c7;
  border: 1px solid #f59e0b;
  border-radius: 8px;
  color: #92400e;
  font-size: ${sharedTheme.typography.fontSizes.sm};
`;

// Modal Components
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const InfluencerPreview = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 1.5rem;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }

  h3 {
    margin: 0;
    font-size: ${sharedTheme.typography.fontSizes.md};
    color: ${sharedTheme.colorVariants.secondary.dark};
  }

  p {
    margin: 0.25rem 0 0 0;
    font-size: ${sharedTheme.typography.fontSizes.sm};
    color: ${sharedTheme.colorVariants.secondary.light};
  }
`;

const TabNavigation = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1.5rem;
`;

const TabButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  color: ${(props) =>
    props.active
      ? sharedTheme.colorVariants.primary.dark
      : sharedTheme.colorVariants.secondary.light};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  cursor: pointer;
  border-bottom: 2px solid
    ${(props) =>
      props.active ? sharedTheme.colorVariants.primary.dark : "transparent"};
  transition: all 0.2s ease;

  &:hover {
    color: ${sharedTheme.colorVariants.primary.dark};
  }
`;

const TabContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormLabel = styled.label<{ required?: boolean }>`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};

  ${(props) =>
    props.required &&
    `
    &::after {
      content: " *";
      color: #ef4444;
    }
  `}
`;

const FormInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${sharedTheme.colorVariants.primary.dark};
    box-shadow: 0 0 0 3px ${sharedTheme.colorVariants.primary.dark}20;
  }
`;

const FormSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  background-color: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${sharedTheme.colorVariants.primary.dark};
    box-shadow: 0 0 0 3px ${sharedTheme.colorVariants.primary.dark}20;
  }
`;

const FormTextarea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  min-height: 80px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${sharedTheme.colorVariants.primary.dark};
    box-shadow: 0 0 0 3px ${sharedTheme.colorVariants.primary.dark}20;
  }
`;

const SuggestedPricing = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const PaymentOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.75rem;
`;

const PaymentOption = styled.button<{ active: boolean }>`
  padding: 0.75rem;
  border: 2px solid
    ${(props) =>
      props.active ? sharedTheme.colorVariants.primary.dark : "#e5e7eb"};
  border-radius: 8px;
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
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  label {
    font-size: ${sharedTheme.typography.fontSizes.sm};
    color: ${sharedTheme.colorVariants.secondary.dark};
  }
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 16px;
  height: 16px;
  accent-color: ${sharedTheme.colorVariants.primary.dark};
`;

const DeliverablesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DeliverableCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  background: #fafbfc;
`;

const DeliverableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h4 {
    margin: 0;
    font-size: ${sharedTheme.typography.fontSizes.sm};
    font-weight: ${sharedTheme.typography.fontWeights.semibold};
    color: ${sharedTheme.colorVariants.secondary.dark};
  }
`;

const RemoveButton = styled.button`
  padding: 0.25rem;
  border: 1px solid #ef4444;
  border-radius: 4px;
  background: white;
  color: #ef4444;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    background: #ef4444;
    color: white;
  }
`;

const AddButton = styled.button`
  padding: 0.75rem;
  border: 1px dashed ${sharedTheme.colorVariants.primary.dark};
  border-radius: 8px;
  background: transparent;
  color: ${sharedTheme.colorVariants.primary.dark};
  cursor: pointer;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;

  &:hover {
    background: ${sharedTheme.colorVariants.primary.dark}10;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: ${sharedTheme.colorVariants.primary.dark}10;
  border: 1px solid ${sharedTheme.colorVariants.primary.dark}30;
  border-radius: 4px;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.primary.dark};

  button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
  margin-top: auto;
`;

export default CustomDealsPage;
