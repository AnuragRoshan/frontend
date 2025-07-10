// pages/brand/campaign/BulkDeals/BulkDealsPage.tsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  DollarSign,
  Calendar,
  CheckCircle,
  AlertCircle,
  Plus,
  X,
  Send,
  Settings,
  Users,
} from "lucide-react";
import { sharedTheme } from "../../../../styles/theme/theme";
import ActionButton from "../../Campaign/Brand Campaign/shared/ActionButton";

// Extended Campaign interface with more realistic inherited data
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

interface BulkDealFormData {
  // Financial Terms
  dealAmount: number;
  dealCurrency: string;
  dealPaymentStructure: "upfront" | "milestone" | "completion" | "custom";
  dealNegotiableAmount: boolean;

  // Deliverables
  dealDeliverables: {
    dealDeliverableType: string;
    dealDeliverablePlatform: string;
    dealDeliverableQuantity: number;
    dealDeliverableDescription: string;
  }[];

  // Timeline
  dealSubmissionDeadline: string;
  dealPostingDeadline: string;
  dealExpiryDate: string;

  // Content Requirements (with inheritance flags)
  dealHashtags: string[];
  dealContentGuidelines: string[];
  dealDosAndDonts: {
    dealDos: string[];
    dealDonts: string[];
  };

  // Customization overrides
  customizeHashtags: boolean;
  customizeGuidelines: boolean;
  customizeDosAndDonts: boolean;

  // Message
  dealApplicationMessage: string;
}

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
  {
    id: "inf_007",
    username: "@kavya_beauty",
    displayName: "Kavya Reddy",
    profileImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    followers: 34000,
    engagementRate: 4.8,
    location: "Hyderabad, India",
    suggestedRate: 14000,
    rating: 4.8,
  },
  {
    id: "inf_008",
    username: "@rohan_fitness",
    displayName: "Rohan Kumar",
    profileImage:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&h=400&fit=crop&crop=face",
    followers: 93000,
    engagementRate: 4.3,
    location: "Kolkata, India",
    suggestedRate: 20000,
    rating: 4.6,
  },
];

const BulkDealsPage: React.FC = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const navigate = useNavigate();

  const selectedInfluencers: SelectedInfluencer[] = DUMMY_SELECTED_INFLUENCERS;
  const [currentStep, setCurrentStep] = useState(1);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [formData, setFormData] = useState<BulkDealFormData>({
    dealAmount: 0,
    dealCurrency: "INR",
    dealPaymentStructure: "completion",
    dealNegotiableAmount: true,
    dealDeliverables: [
      {
        dealDeliverableType: "Posts",
        dealDeliverablePlatform: "Instagram",
        dealDeliverableQuantity: 2,
        dealDeliverableDescription:
          "High-quality Instagram posts featuring the product",
      },
    ],
    dealSubmissionDeadline: "",
    dealPostingDeadline: "",
    dealExpiryDate: "7",
    dealHashtags: [],
    dealContentGuidelines: [],
    dealDosAndDonts: {
      dealDos: [],
      dealDonts: [],
    },
    customizeHashtags: false,
    customizeGuidelines: false,
    customizeDosAndDonts: false,
    dealApplicationMessage:
      "Hi {name}! We love your content and would love to collaborate with you for our latest campaign. Please check the details and let us know if you're interested!",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Enhanced mock campaign data with inherited content
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

      // Initialize form data with campaign-inherited content
      setFormData((prev) => ({
        ...prev,
        dealHashtags: mockCampaign.hashtags,
        dealContentGuidelines: mockCampaign.contentGuidelines,
        dealDosAndDonts: {
          dealDos: mockCampaign.dosAndDonts.dos,
          dealDonts: mockCampaign.dosAndDonts.donts,
        },
        dealDeliverables: prev.dealDeliverables.map((d) => ({
          ...d,
          dealDeliverablePlatform: mockCampaign.platform,
        })),
      }));
    }
  }, [campaignId]);

  // Calculate totals
  const totalEstimatedCost = selectedInfluencers.length * formData.dealAmount;
  const totalEstimatedReach = selectedInfluencers.reduce(
    (sum, inf) => sum + inf.followers,
    0
  );
  const remainingBudget = campaign ? campaign.budget - campaign.spent : 0;

  // Content type options by platform
  const getContentTypesByPlatform = (platform: string): string[] => {
    const contentMap: Record<string, string[]> = {
      Instagram: ["Posts", "Stories", "Reels", "IGTV", "Live Streams"],
      YouTube: ["Videos", "Shorts", "Premieres"],
      LinkedIn: ["Articles", "Live Events", "Documents"],
      Twitter: ["Tweets", "Threads", "Spaces"],
      Facebook: ["Posts", "Stories", "Videos", "Events"],
      Snapchat: ["Snaps", "Spotlight", "Lenses"],
    };
    return contentMap[platform] || [];
  };

  const handleInputChange = <K extends keyof BulkDealFormData>(
    field: K,
    value: BulkDealFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const addDeliverable = () => {
    const newDeliverable = {
      dealDeliverableType: "Posts",
      dealDeliverablePlatform: campaign?.platform || "Instagram",
      dealDeliverableQuantity: 1,
      dealDeliverableDescription: "Additional content deliverable",
    };
    setFormData((prev) => ({
      ...prev,
      dealDeliverables: [...prev.dealDeliverables, newDeliverable],
    }));
  };

  const removeDeliverable = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      dealDeliverables: prev.dealDeliverables.filter((_, i) => i !== index),
    }));
  };

  const updateDeliverable = (
    index: number,
    field: string,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      dealDeliverables: prev.dealDeliverables.map((deliverable, i) =>
        i === index ? { ...deliverable, [field]: value } : deliverable
      ),
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1: // Payment & Deliverables
        if (!formData.dealAmount || formData.dealAmount <= 0) {
          newErrors.dealAmount = "Amount must be greater than 0";
        }
        if (totalEstimatedCost > remainingBudget) {
          newErrors.budget = "Total cost exceeds remaining campaign budget";
        }
        if (formData.dealDeliverables.length === 0) {
          newErrors.deliverables = "At least one deliverable is required";
        }
        break;

      case 2: // Timeline & Customization
        if (!formData.dealSubmissionDeadline) {
          newErrors.dealSubmissionDeadline = "Submission deadline is required";
        }
        if (!formData.dealPostingDeadline) {
          newErrors.dealPostingDeadline = "Posting deadline is required";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleBack = () => {
    navigate(`/brand/campaigns/${campaignId}/influencer-discovery`);
  };

  const handleSendDeals = () => {
    if (validateStep(currentStep)) {
      console.log("Sending bulk deals:", {
        campaignId,
        selectedInfluencers,
        dealData: formData,
      });

      navigate(`/brand/campaigns/${campaignId}/deals-sent`, {
        state: {
          dealsCount: selectedInfluencers.length,
          totalCost: totalEstimatedCost,
          dealType: "bulk",
        },
      });
    }
  };

  // Influencer Glimpse Component
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
          Est. Reach: {(totalEstimatedReach / 1000).toFixed(0)}K
        </EstimatedReach>
      </InfluencerGlimpseContainer>
    );
  };

  if (!campaign) {
    return (
      <LoadingContainer>
        <div>Loading campaign...</div>
      </LoadingContainer>
    );
  }

  const renderStepIndicator = () => (
    <StepIndicator>
      {[1, 2, 3].map((step) => (
        <StepItem
          key={step}
          active={step <= currentStep}
          current={step === currentStep}
        >
          <StepNumber
            active={step <= currentStep}
            current={step === currentStep}
          >
            {step}
          </StepNumber>
          <StepLabel>
            {step === 1 && "Payment & Deliverables"}
            {step === 2 && "Timeline & Customization"}
            {step === 3 && "Review & Send"}
          </StepLabel>
        </StepItem>
      ))}
    </StepIndicator>
  );

  const renderStep1 = () => (
    <StepContent>
      <SectionTitle>
        <DollarSign size={20} />
        Payment & Deliverables
      </SectionTitle>

      {/* Payment Section */}
      <SectionCard>
        <SectionCardTitle>💰 Payment Strategy</SectionCardTitle>

        <FormGroup>
          <FormLabel required>Payment Amount per Influencer (₹)</FormLabel>
          <FormInput
            type="number"
            value={formData.dealAmount || ""}
            onChange={(e) =>
              handleInputChange("dealAmount", Number(e.target.value))
            }
            placeholder="Enter amount per influencer"
            error={!!errors.dealAmount}
          />
          {errors.dealAmount && <ErrorText>{errors.dealAmount}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <FormLabel>Payment Structure</FormLabel>
          <PaymentOptions>
            {(["completion", "upfront", "milestone"] as const).map(
              (structure) => (
                <PaymentOption
                  key={structure}
                  active={formData.dealPaymentStructure === structure}
                  onClick={() =>
                    handleInputChange("dealPaymentStructure", structure)
                  }
                >
                  <div className="title">
                    {structure === "completion" && "On Completion"}
                    {structure === "upfront" && "Upfront Payment"}
                    {structure === "milestone" && "Milestone Based"}
                  </div>
                  <div className="description">
                    {structure === "completion" && "Pay after content is live"}
                    {structure === "upfront" && "Pay immediately on acceptance"}
                    {structure === "milestone" && "Pay in stages"}
                  </div>
                </PaymentOption>
              )
            )}
          </PaymentOptions>
        </FormGroup>

        <CheckboxGroup>
          <Checkbox
            checked={formData.dealNegotiableAmount}
            onChange={(e) =>
              handleInputChange("dealNegotiableAmount", e.target.checked)
            }
          />
          <label>Allow individual negotiation</label>
        </CheckboxGroup>

        <BudgetSummary error={!!errors.budget}>
          <BudgetItem>
            <span>Selected Influencers:</span>
            <span>{selectedInfluencers.length}</span>
          </BudgetItem>
          <BudgetItem>
            <span>Amount per Influencer:</span>
            <span>₹{formData.dealAmount.toLocaleString()}</span>
          </BudgetItem>
          <BudgetItem className="total">
            <span>Total Estimated Cost:</span>
            <span>₹{totalEstimatedCost.toLocaleString()}</span>
          </BudgetItem>
          <BudgetItem>
            <span>Remaining Budget:</span>
            <span>₹{remainingBudget.toLocaleString()}</span>
          </BudgetItem>
          {errors.budget && <ErrorText>{errors.budget}</ErrorText>}
        </BudgetSummary>
      </SectionCard>

      {/* Deliverables Section */}
      <SectionCard>
        <SectionCardTitle>📝 Deliverables</SectionCardTitle>

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
                    {getContentTypesByPlatform(campaign.platform).map(
                      (type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      )
                    )}
                  </FormSelect>
                </FormGroup>

                <FormGroup>
                  <FormLabel>Quantity</FormLabel>
                  <FormInput
                    type="number"
                    min="1"
                    max="50"
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
                  placeholder="Describe what this deliverable should include..."
                />
              </FormGroup>
            </DeliverableCard>
          ))}

          <AddButton onClick={addDeliverable}>
            <Plus size={16} />
            Add Another Deliverable
          </AddButton>
        </DeliverablesContainer>

        {errors.deliverables && <ErrorText>{errors.deliverables}</ErrorText>}
      </SectionCard>
    </StepContent>
  );

  const renderStep2 = () => (
    <StepContent>
      <SectionTitle>
        <Calendar size={20} />
        Timeline & Customization
      </SectionTitle>

      {/* Timeline Section */}
      <SectionCard>
        <SectionCardTitle>📅 Timeline</SectionCardTitle>

        <FormRow>
          <FormGroup>
            <FormLabel required>Content Submission Deadline</FormLabel>
            <FormInput
              type="datetime-local"
              value={formData.dealSubmissionDeadline}
              onChange={(e) =>
                handleInputChange("dealSubmissionDeadline", e.target.value)
              }
              error={!!errors.dealSubmissionDeadline}
            />
            {errors.dealSubmissionDeadline && (
              <ErrorText>{errors.dealSubmissionDeadline}</ErrorText>
            )}
          </FormGroup>

          <FormGroup>
            <FormLabel required>Content Go-Live Date</FormLabel>
            <FormInput
              type="datetime-local"
              value={formData.dealPostingDeadline}
              onChange={(e) =>
                handleInputChange("dealPostingDeadline", e.target.value)
              }
              error={!!errors.dealPostingDeadline}
            />
            {errors.dealPostingDeadline && (
              <ErrorText>{errors.dealPostingDeadline}</ErrorText>
            )}
          </FormGroup>
        </FormRow>

        <FormGroup>
          <FormLabel>Deal Expiry Period</FormLabel>
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
      </SectionCard>

      {/* Content Customization Section */}
      <SectionCard>
        <SectionCardTitle>
          ⚙️ Content Guidelines (Inherited from Campaign)
        </SectionCardTitle>

        <InheritanceInfo>
          <AlertCircle size={16} />
          <div>
            <strong>Smart Inheritance:</strong> Content guidelines, hashtags,
            and dos/don'ts are automatically inherited from your campaign
            settings. You can customize them below if needed.
          </div>
        </InheritanceInfo>

        {/* Hashtags */}
        <FormGroup>
          <FormLabelRow>
            <FormLabel>
              Required Hashtags ({formData.dealHashtags.length})
            </FormLabel>
            <CustomizeToggle
              active={formData.customizeHashtags}
              onClick={() =>
                handleInputChange(
                  "customizeHashtags",
                  !formData.customizeHashtags
                )
              }
            >
              <Settings size={14} />
              {formData.customizeHashtags
                ? "Using Custom"
                : "Using Campaign Default"}
            </CustomizeToggle>
          </FormLabelRow>

          <TagContainer>
            {formData.dealHashtags.map((hashtag, index) => (
              <Tag key={index} inherited={!formData.customizeHashtags}>
                {hashtag}
                {formData.customizeHashtags && (
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
                )}
              </Tag>
            ))}
          </TagContainer>

          {formData.customizeHashtags && (
            <FormInput
              type="text"
              placeholder="Add hashtag (e.g., #campaign)"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  const value = (e.target as HTMLInputElement).value.trim();
                  if (value && value.startsWith("#")) {
                    handleInputChange("dealHashtags", [
                      ...formData.dealHashtags,
                      value,
                    ]);
                    (e.target as HTMLInputElement).value = "";
                  }
                }
              }}
            />
          )}
        </FormGroup>

        {/* Content Guidelines */}
        <FormGroup>
          <FormLabelRow>
            <FormLabel>
              Content Guidelines ({formData.dealContentGuidelines.length})
            </FormLabel>
            <CustomizeToggle
              active={formData.customizeGuidelines}
              onClick={() =>
                handleInputChange(
                  "customizeGuidelines",
                  !formData.customizeGuidelines
                )
              }
            >
              <Settings size={14} />
              {formData.customizeGuidelines
                ? "Using Custom"
                : "Using Campaign Default"}
            </CustomizeToggle>
          </FormLabelRow>

          <GuidelinesList>
            {formData.dealContentGuidelines.map((guideline, index) => (
              <GuidelineItem
                key={index}
                inherited={!formData.customizeGuidelines}
              >
                <span>• {guideline}</span>
                {formData.customizeGuidelines && (
                  <button
                    onClick={() => {
                      const newGuidelines =
                        formData.dealContentGuidelines.filter(
                          (_, i) => i !== index
                        );
                      handleInputChange("dealContentGuidelines", newGuidelines);
                    }}
                  >
                    <X size={14} />
                  </button>
                )}
              </GuidelineItem>
            ))}
          </GuidelinesList>

          {formData.customizeGuidelines && (
            <FormInput
              type="text"
              placeholder="Add new guideline..."
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  const value = (e.target as HTMLInputElement).value.trim();
                  if (value) {
                    handleInputChange("dealContentGuidelines", [
                      ...formData.dealContentGuidelines,
                      value,
                    ]);
                    (e.target as HTMLInputElement).value = "";
                  }
                }
              }}
            />
          )}
        </FormGroup>

        {/* Message Template */}
        <FormGroup>
          <FormLabel>Message Template</FormLabel>
          <FormTextarea
            value={formData.dealApplicationMessage}
            onChange={(e) =>
              handleInputChange("dealApplicationMessage", e.target.value)
            }
            placeholder="Hi {name}! We love your content and would love to collaborate..."
            rows={3}
          />
        </FormGroup>
      </SectionCard>
    </StepContent>
  );

  const renderStep3 = () => (
    <StepContent>
      <SectionTitle>
        <CheckCircle size={20} />
        Review & Send Deals
      </SectionTitle>

      <ReviewSection>
        <ReviewTitle>Deal Summary</ReviewTitle>

        <ReviewGrid>
          <ReviewItem>
            <ReviewLabel>Payment per Influencer:</ReviewLabel>
            <ReviewValue>₹{formData.dealAmount.toLocaleString()}</ReviewValue>
          </ReviewItem>
          <ReviewItem>
            <ReviewLabel>Payment Structure:</ReviewLabel>
            <ReviewValue>{formData.dealPaymentStructure}</ReviewValue>
          </ReviewItem>
          <ReviewItem>
            <ReviewLabel>Total Deliverables:</ReviewLabel>
            <ReviewValue>{formData.dealDeliverables.length} types</ReviewValue>
          </ReviewItem>
          <ReviewItem>
            <ReviewLabel>Content Guidelines:</ReviewLabel>
            <ReviewValue>
              {formData.dealContentGuidelines.length} guidelines
            </ReviewValue>
          </ReviewItem>
          <ReviewItem>
            <ReviewLabel>Required Hashtags:</ReviewLabel>
            <ReviewValue>{formData.dealHashtags.length} hashtags</ReviewValue>
          </ReviewItem>
          <ReviewItem>
            <ReviewLabel>Negotiable:</ReviewLabel>
            <ReviewValue>
              {formData.dealNegotiableAmount ? "Yes" : "No"}
            </ReviewValue>
          </ReviewItem>
        </ReviewGrid>

        <CostBreakdown>
          <CostItem>
            <span>Cost per Influencer:</span>
            <span>₹{formData.dealAmount.toLocaleString()}</span>
          </CostItem>
          <CostItem>
            <span>Number of Influencers:</span>
            <span>{selectedInfluencers.length}</span>
          </CostItem>
          <CostItem className="total">
            <span>Total Campaign Cost:</span>
            <span>₹{totalEstimatedCost.toLocaleString()}</span>
          </CostItem>
          <CostItem>
            <span>Estimated Reach:</span>
            <span>{totalEstimatedReach.toLocaleString()}</span>
          </CostItem>
          <CostItem>
            <span>Cost per Reach:</span>
            <span>
              ₹{(totalEstimatedCost / totalEstimatedReach).toFixed(2)}
            </span>
          </CostItem>
        </CostBreakdown>
      </ReviewSection>
    </StepContent>
  );

  return (
    <PageContainer>
      <PageHeader>
        <BackButton onClick={handleBack}>
          <ArrowLeft size={20} />
          Back to Discovery
        </BackButton>

        <HeaderContent>
          <PageTitle>📦 Bulk Deal Setup</PageTitle>
          <PageSubtitle>{campaign.name}</PageSubtitle>
        </HeaderContent>

        <InfluencerGlimpse />
      </PageHeader>

      {renderStepIndicator()}

      <FormContainer>
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
      </FormContainer>

      <StickyFooter>
        <FooterActions>
          {currentStep > 1 && (
            <ActionButton onClick={handlePrevious} variant="secondary">
              <ArrowLeft size={16} />
              Previous
            </ActionButton>
          )}

          <div style={{ flex: 1 }} />

          {currentStep < 3 ? (
            <ActionButton onClick={handleNext} primary>
              Next
              <ArrowRight size={16} />
            </ActionButton>
          ) : (
            <ActionButton onClick={handleSendDeals} primary>
              <Send size={16} />
              Send All Deals
            </ActionButton>
          )}
        </FooterActions>
      </StickyFooter>
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

// Influencer Glimpse Components
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

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    overflow-x: auto;
    justify-content: flex-start;
  }
`;

const StepItem = styled.div<{ active: boolean; current: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin: 0 1.5rem;
  opacity: ${(props) => (props.active ? 1 : 0.5)};

  @media (max-width: 768px) {
    margin: 0 0.75rem;
  }
`;

const StepNumber = styled.div<{ active?: boolean; current?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.current
      ? sharedTheme.colorVariants.primary.dark
      : props.active
      ? sharedTheme.colorVariants.primary.light
      : "#e5e7eb"};
  color: ${(props) =>
    props.active ? "white" : sharedTheme.colorVariants.secondary.light};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  font-size: ${sharedTheme.typography.fontSizes.sm};
`;

const StepLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  text-align: center;
  color: ${sharedTheme.colorVariants.secondary.dark};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  white-space: nowrap;
  max-width: 120px;
`;

const FormContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0 0 1rem 0;
`;

const SectionCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  background: #fafbfc;
`;

const SectionCardTitle = styled.h4`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0 0 1.5rem 0;
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

const FormLabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const CustomizeToggle = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid
    ${(props) =>
      props.active ? sharedTheme.colorVariants.primary.dark : "#e5e7eb"};
  border-radius: 4px;
  background: ${(props) =>
    props.active ? sharedTheme.colorVariants.primary.dark + "10" : "white"};
  color: ${(props) =>
    props.active
      ? sharedTheme.colorVariants.primary.dark
      : sharedTheme.colorVariants.secondary.light};
  font-size: ${sharedTheme.typography.fontSizes.xs};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${sharedTheme.colorVariants.primary.dark};
  }
`;

const FormInput = styled.input<{ error?: boolean }>`
  padding: 0.75rem;
  border: 1px solid ${(props) => (props.error ? "#ef4444" : "#e5e7eb")};
  border-radius: 8px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${sharedTheme.colorVariants.primary.dark};
    box-shadow: 0 0 0 3px ${sharedTheme.colorVariants.primary.dark}20;
  }

  &::placeholder {
    color: ${sharedTheme.colorVariants.secondary.light};
  }
`;

const FormSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
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
  color: ${sharedTheme.colorVariants.secondary.dark};
  min-height: 80px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${sharedTheme.colorVariants.primary.dark};
    box-shadow: 0 0 0 3px ${sharedTheme.colorVariants.primary.dark}20;
  }
`;

const ErrorText = styled.span`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: #ef4444;
  margin-top: 0.25rem;
`;

const PaymentOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const PaymentOption = styled.button<{ active: boolean }>`
  padding: 1rem;
  border: 2px solid
    ${(props) =>
      props.active ? sharedTheme.colorVariants.primary.dark : "#e5e7eb"};
  border-radius: 8px;
  background: ${(props) =>
    props.active ? sharedTheme.colorVariants.primary.dark + "10" : "white"};
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;

  .title {
    font-weight: ${sharedTheme.typography.fontWeights.semibold};
    color: ${(props) =>
      props.active
        ? sharedTheme.colorVariants.primary.dark
        : sharedTheme.colorVariants.secondary.dark};
    margin-bottom: 0.25rem;
  }

  .description {
    font-size: ${sharedTheme.typography.fontSizes.xs};
    color: ${sharedTheme.colorVariants.secondary.light};
  }

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

const BudgetSummary = styled.div<{ error?: boolean }>`
  background: ${(props) => (props.error ? "#fee2e2" : "#f9fafb")};
  border: 1px solid ${(props) => (props.error ? "#ef4444" : "#e5e7eb")};
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
`;

const BudgetItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  font-size: ${sharedTheme.typography.fontSizes.sm};

  &.total {
    border-top: 1px solid #e5e7eb;
    margin-top: 0.5rem;
    padding-top: 1rem;
    font-weight: ${sharedTheme.typography.fontWeights.semibold};
    font-size: ${sharedTheme.typography.fontSizes.md};
  }
`;

const DeliverablesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DeliverableCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  background: white;
`;

const DeliverableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h4 {
    margin: 0;
    font-size: ${sharedTheme.typography.fontSizes.md};
    font-weight: ${sharedTheme.typography.fontWeights.semibold};
    color: ${sharedTheme.colorVariants.secondary.dark};
  }
`;

const RemoveButton = styled.button`
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

const AddButton = styled.button`
  padding: 0.75rem 1rem;
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

const InheritanceInfo = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: #dbeafe;
  border: 1px solid #93c5fd;
  border-radius: 8px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  margin-bottom: 1.5rem;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Tag = styled.div<{ inherited?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: ${(props) =>
    props.inherited
      ? "#f3f4f6"
      : sharedTheme.colorVariants.primary.dark + "10"};
  border: 1px solid
    ${(props) =>
      props.inherited
        ? "#d1d5db"
        : sharedTheme.colorVariants.primary.dark + "30"};
  border-radius: 4px;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${(props) =>
    props.inherited
      ? sharedTheme.colorVariants.secondary.light
      : sharedTheme.colorVariants.primary.dark};

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

const GuidelinesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const GuidelineItem = styled.div<{ inherited?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: ${(props) => (props.inherited ? "#f9fafb" : "white")};
  border: 1px solid ${(props) => (props.inherited ? "#e5e7eb" : "#d1d5db")};
  border-radius: 4px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${(props) =>
    props.inherited
      ? sharedTheme.colorVariants.secondary.light
      : sharedTheme.colorVariants.secondary.dark};

  button {
    background: none;
    border: none;
    color: #ef4444;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 4px;
    display: flex;
    align-items: center;

    &:hover {
      background: #fee2e2;
    }
  }
`;

const ReviewSection = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
`;

const ReviewTitle = styled.h4`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0 0 1.5rem 0;
`;

const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ReviewItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
`;

const ReviewLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const ReviewValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const CostBreakdown = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
`;

const CostItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  font-size: ${sharedTheme.typography.fontSizes.sm};

  &.total {
    border-top: 1px solid #e5e7eb;
    margin-top: 0.5rem;
    padding-top: 1rem;
    font-weight: ${sharedTheme.typography.fontWeights.semibold};
    font-size: ${sharedTheme.typography.fontSizes.md};
    color: ${sharedTheme.colorVariants.primary.dark};
  }
`;

const StickyFooter = styled.div`
  border-radius: 12px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  background: white;
  border: 1px solid #e5e7eb;
  padding: 1rem 2rem;
  z-index: 10;
`;

const FooterActions = styled.div`
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  gap: 1rem;
`;

export default BulkDealsPage;
