// components/modals/DealCreationModal.tsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";
import {
  Edit,
  CheckCircle,
  Plus,
  X,
  AlertCircle,
  DollarSign,
  Target,
  Calendar,
  FileText,
} from "lucide-react";
import { sharedTheme } from "../../../../styles/theme/theme";
import ActionButton from "../../Campaign/Brand Campaign/shared/ActionButton";
import Drawer from "../../../../components/layout/Drawer";
import {
  //   DealFormSchema,
  validateDealForm,
  type DealFormData,
} from "./customDealSchema";

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

// Tab interface
interface Tab {
  id: number;
  label: string;
  icon: React.ComponentType<{ size: number }>;
}

interface DealCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  influencer: SelectedInfluencer | null;
  campaign: Campaign | null;
  existingDealData?: DealFormData;
  onSaveDeal: (dealData: DealFormData) => void;
}

// Optimized Deal Creation Modal Component
const DealCreationModal: React.FC<DealCreationModalProps> = React.memo(
  ({ isOpen, onClose, influencer, campaign, existingDealData, onSaveDeal }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [formData, setFormData] = useState<DealFormData | null>(null);
    const [validationErrors, setValidationErrors] = useState<
      Record<string, string>
    >({});

    // Memoize tabs - now only 2 tabs
    const tabs: Tab[] = useMemo(
      () => [
        { id: 0, label: "Deal Configuration", icon: Edit },
        { id: 1, label: "Review & Save", icon: CheckCircle },
      ],
      []
    );

    // Memoize default deal data function
    const getDefaultDealData = useCallback(
      (inf: SelectedInfluencer): DealFormData => ({
        dealAmount: inf.suggestedRate,
        dealCurrency: "INR",
        dealPaymentStructure: "completion",
        dealNegotiableAmount: true,
        dealDeliverables: [
          {
            dealDeliverableType: "Posts",
            dealDeliverablePlatform: [
              "Instagram",
              "YouTube",
              "LinkedIn",
              "Twitter",
              "Facebook",
              "Snapchat",
            ].includes(campaign?.platform ?? "")
              ? (campaign?.platform as
                  | "Instagram"
                  | "YouTube"
                  | "LinkedIn"
                  | "Twitter"
                  | "Facebook"
                  | "Snapchat")
              : "Instagram",
            dealDeliverableQuantity: 2,
            dealDeliverableDescription:
              "High-quality posts featuring the product",
          },
        ],
        dealSubmissionDeadline: "",
        dealPostingDeadline: "",
        dealExpiryDate: "7",
        dealHashtags: campaign?.hashtags || [],
        dealContentGuidelines: campaign?.contentGuidelines || [],
        dealDosAndDonts: campaign
          ? {
              dealDos: campaign.dosAndDonts.dos,
              dealDonts: campaign.dosAndDonts.donts,
            }
          : { dealDos: [], dealDonts: [] },
        dealApplicationMessage: `Hi ${inf.displayName}! We love your content and would love to collaborate with you for our latest campaign. Your style perfectly aligns with our brand values. Please check the details and let us know if you're interested!`,
      }),
      [campaign]
    );

    // Initialize form data only when modal opens or influencer changes
    useEffect(() => {
      if (isOpen && influencer) {
        const initialData = existingDealData || getDefaultDealData(influencer);
        setFormData(initialData);
        setActiveTab(0); // Reset to first tab when opening
        setValidationErrors({});
      }
    }, [isOpen, influencer, existingDealData, getDefaultDealData]);

    // Memoized input change handler with validation
    const handleInputChange = useCallback(
      <K extends keyof DealFormData>(field: K, value: DealFormData[K]) => {
        setFormData((prev) => {
          if (!prev) return null;
          const newData = { ...prev, [field]: value };

          // Clear validation error for this field
          setValidationErrors((errors) => {
            const newErrors = { ...errors };
            delete newErrors[field as string];
            return newErrors;
          });

          return newData;
        });
      },
      []
    );

    // Validate form data
    const validateForm = useCallback(() => {
      if (!formData) return false;

      const result = validateDealForm(formData);

      if (!result.success) {
        const errors: Record<string, string> = {};
        interface ValidationError {
          path: (string | number)[];
          message: string;
        }

        interface ValidationResult {
          success: boolean;
          error: {
            errors: ValidationError[];
          };
        }

        (result as ValidationResult).error.errors.forEach(
          (error: ValidationError) => {
            const path: string = error.path.join(".");
            errors[path] = error.message;
          }
        );
        setValidationErrors(errors);
        return false;
      }

      setValidationErrors({});
      return true;
    }, [formData]);

    // Memoized deliverable handlers
    const addDeliverable = useCallback(() => {
      setFormData((prev) =>
        prev
          ? {
              ...prev,
              dealDeliverables: [
                ...prev.dealDeliverables,
                {
                  dealDeliverableType: "Posts",
                  dealDeliverablePlatform:
                    (campaign?.platform as
                      | "Instagram"
                      | "YouTube"
                      | "LinkedIn"
                      | "Twitter"
                      | "Facebook"
                      | "Snapchat") || "Instagram",
                  dealDeliverableQuantity: 1,
                  dealDeliverableDescription: "Additional deliverable",
                },
              ],
            }
          : null
      );
    }, [campaign?.platform]);

    const updateDeliverable = useCallback(
      (index: number, field: string, value: string | number) => {
        setFormData((prev: DealFormData | null) =>
          prev
            ? {
                ...prev,
                dealDeliverables: prev.dealDeliverables.map(
                  (del: DealFormData["dealDeliverables"][number], i: number) =>
                    i === index
                      ? { ...del, [field as keyof typeof del]: value }
                      : del
                ),
              }
            : null
        );
      },
      []
    );

    const removeDeliverable = useCallback((index: number) => {
      setFormData((prev: DealFormData | null) =>
        prev
          ? {
              ...prev,
              dealDeliverables: prev.dealDeliverables.filter(
                (_: DealFormData["dealDeliverables"][number], i: number) =>
                  i !== index
              ),
            }
          : null
      );
    }, []);

    // Add hashtag handler
    const addHashtag = useCallback(
      (hashtag: string) => {
        if (!formData || !hashtag.startsWith("#")) return;

        setFormData((prev) => {
          if (!prev) return null;
          if (prev.dealHashtags.includes(hashtag)) return prev;

          return {
            ...prev,
            dealHashtags: [...prev.dealHashtags, hashtag],
          };
        });
      },
      [formData]
    );

    const removeHashtag = useCallback((index: number) => {
      setFormData((prev: DealFormData | null) =>
        prev
          ? {
              ...prev,
              dealHashtags: prev.dealHashtags.filter(
                (_: string, i: number) => i !== index
              ),
            }
          : null
      );
    }, []);

    // Memoized save handler
    const handleSave = useCallback(() => {
      if (formData && validateForm()) {
        onSaveDeal(formData);
      }
    }, [formData, onSaveDeal, validateForm]);

    // Memoized tab change handler
    const handleTabChange = useCallback(
      (tabId: number) => {
        if (tabId === 1) {
          // Validate before going to summary tab
          validateForm();
        }
        setActiveTab(tabId);
      },
      [validateForm]
    );

    // Calculate deal summary
    const dealSummary = useMemo(() => {
      if (!formData) return null;

      interface Deliverable {
        dealDeliverableType: string;
        dealDeliverablePlatform: string;
        dealDeliverableQuantity: number;
        dealDeliverableDescription: string;
      }

      const totalDeliverables = formData.dealDeliverables.reduce(
        (sum: number, del: Deliverable) => sum + del.dealDeliverableQuantity,
        0
      );

      return {
        amount: formData.dealAmount,
        currency: formData.dealCurrency,
        totalDeliverables,
        paymentStructure: formData.dealPaymentStructure,
        negotiable: formData.dealNegotiableAmount,
        hashtagCount: formData.dealHashtags.length,
        guidelineCount: formData.dealContentGuidelines.length,
      };
    }, [formData]);

    // Check if form is valid
    const isFormValid = useMemo(() => {
      return Object.keys(validationErrors).length === 0 && formData;
    }, [validationErrors, formData]);

    if (!formData || !influencer) return null;

    return (
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        title={`Deal: ${influencer.username}`}
        size="lg"
      >
        <ModalContent>
          <InfluencerPreview>
            <img src={influencer.profileImage} alt={influencer.displayName} />
            <div>
              <h3>{influencer.username}</h3>
              <p>
                {(influencer.followers / 1000).toFixed(0)}K followers •{" "}
                {influencer.engagementRate}% engagement
              </p>
            </div>
          </InfluencerPreview>

          <TabNavigation>
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => handleTabChange(tab.id)}
              >
                <tab.icon size={16} />
                {tab.label}
              </TabButton>
            ))}
          </TabNavigation>

          <TabContent>
            {activeTab === 0 ? (
              // All form content in one scrollable tab
              <FormContainer>
                {/* Payment Section */}
                <SectionCard>
                  <SectionTitle>
                    <DollarSign size={18} />
                    Payment Details
                  </SectionTitle>

                  <FormRow>
                    <FormGroup>
                      <FormLabel required>Payment Amount (₹)</FormLabel>
                      <FormInput
                        type="number"
                        value={formData.dealAmount}
                        onChange={(e) =>
                          handleInputChange(
                            "dealAmount",
                            Number(e.target.value)
                          )
                        }
                        placeholder="Enter amount"
                        error={!!validationErrors.dealAmount}
                      />
                      {validationErrors.dealAmount && (
                        <ErrorText>{validationErrors.dealAmount}</ErrorText>
                      )}
                      <SuggestedPricing>
                        Suggested: ₹{influencer.suggestedRate.toLocaleString()}
                      </SuggestedPricing>
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>Payment Structure</FormLabel>
                      <FormSelect
                        value={formData.dealPaymentStructure}
                        onChange={(e) =>
                          handleInputChange(
                            "dealPaymentStructure",
                            e.target
                              .value as DealFormData["dealPaymentStructure"]
                          )
                        }
                      >
                        <option value="completion">On Completion</option>
                        <option value="upfront">Upfront Payment</option>
                        <option value="milestone">Milestone Based</option>
                      </FormSelect>
                    </FormGroup>
                  </FormRow>

                  <CheckboxGroup>
                    <Checkbox
                      checked={formData.dealNegotiableAmount}
                      onChange={(e) =>
                        handleInputChange(
                          "dealNegotiableAmount",
                          e.target.checked
                        )
                      }
                    />
                    <label>Allow negotiation</label>
                  </CheckboxGroup>
                </SectionCard>

                {/* Deliverables Section */}
                <SectionCard>
                  <SectionTitle>
                    <Target size={18} />
                    Deliverables
                  </SectionTitle>

                  <DeliverablesContainer>
                    {formData.dealDeliverables.map((deliverable, index) => (
                      <DeliverableCard key={index}>
                        <DeliverableHeader>
                          <h4>Deliverable {index + 1}</h4>
                          {formData.dealDeliverables.length > 1 && (
                            <RemoveButton
                              onClick={() => removeDeliverable(index)}
                            >
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
                </SectionCard>

                {/* Timeline Section */}
                <SectionCard>
                  <SectionTitle>
                    <Calendar size={18} />
                    Timeline
                  </SectionTitle>

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
                        error={!!validationErrors.dealSubmissionDeadline}
                      />
                      {validationErrors.dealSubmissionDeadline && (
                        <ErrorText>
                          {validationErrors.dealSubmissionDeadline}
                        </ErrorText>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <FormLabel required>Go-Live Date</FormLabel>
                      <FormInput
                        type="datetime-local"
                        value={formData.dealPostingDeadline}
                        onChange={(e) =>
                          handleInputChange(
                            "dealPostingDeadline",
                            e.target.value
                          )
                        }
                        error={!!validationErrors.dealPostingDeadline}
                      />
                      {validationErrors.dealPostingDeadline && (
                        <ErrorText>
                          {validationErrors.dealPostingDeadline}
                        </ErrorText>
                      )}
                    </FormGroup>
                  </FormRow>

                  <FormGroup>
                    <FormLabel>Deal Expiry</FormLabel>
                    <FormSelect
                      value={formData.dealExpiryDate}
                      onChange={(e) =>
                        handleInputChange(
                          "dealExpiryDate",
                          e.target.value as DealFormData["dealExpiryDate"]
                        )
                      }
                    >
                      <option value="3">3 days</option>
                      <option value="7">7 days</option>
                      <option value="14">14 days</option>
                      <option value="30">30 days</option>
                    </FormSelect>
                  </FormGroup>
                </SectionCard>

                {/* Content Section */}
                <SectionCard>
                  <SectionTitle>
                    <FileText size={18} />
                    Content Requirements
                  </SectionTitle>

                  <FormGroup>
                    <FormLabel>
                      Required Hashtags ({formData.dealHashtags.length})
                    </FormLabel>
                    <TagContainer>
                      {formData.dealHashtags.map((hashtag, index) => (
                        <Tag key={index}>
                          {hashtag}
                          <button onClick={() => removeHashtag(index)}>
                            <X size={12} />
                          </button>
                        </Tag>
                      ))}
                    </TagContainer>
                    <FormInput
                      type="text"
                      placeholder="Add hashtag (e.g., #campaign)"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          const value = (
                            e.target as HTMLInputElement
                          ).value.trim();
                          if (value && value.startsWith("#")) {
                            addHashtag(value);
                            (e.target as HTMLInputElement).value = "";
                          }
                        }
                      }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Personalized Message</FormLabel>
                    <FormTextarea
                      value={formData.dealApplicationMessage}
                      onChange={(e) =>
                        handleInputChange(
                          "dealApplicationMessage",
                          e.target.value
                        )
                      }
                      placeholder="Write a personalized message..."
                      rows={4}
                      error={!!validationErrors.dealApplicationMessage}
                    />
                    {validationErrors.dealApplicationMessage && (
                      <ErrorText>
                        {validationErrors.dealApplicationMessage}
                      </ErrorText>
                    )}
                  </FormGroup>
                </SectionCard>
              </FormContainer>
            ) : (
              // Summary Tab
              <SummaryContainer>
                <SummaryTitle>Deal Summary</SummaryTitle>

                {dealSummary && (
                  <SummaryGrid>
                    <SummaryItem>
                      <SummaryLabel>Payment Amount:</SummaryLabel>
                      <SummaryValue>
                        {dealSummary.currency}{" "}
                        {dealSummary.amount.toLocaleString()}
                      </SummaryValue>
                    </SummaryItem>

                    <SummaryItem>
                      <SummaryLabel>Payment Structure:</SummaryLabel>
                      <SummaryValue>
                        {dealSummary.paymentStructure === "completion" &&
                          "On Completion"}
                        {dealSummary.paymentStructure === "upfront" &&
                          "Upfront Payment"}
                        {dealSummary.paymentStructure === "milestone" &&
                          "Milestone Based"}
                      </SummaryValue>
                    </SummaryItem>

                    <SummaryItem>
                      <SummaryLabel>Total Deliverables:</SummaryLabel>
                      <SummaryValue>
                        {dealSummary.totalDeliverables}
                      </SummaryValue>
                    </SummaryItem>

                    <SummaryItem>
                      <SummaryLabel>Negotiable:</SummaryLabel>
                      <SummaryValue>
                        {dealSummary.negotiable ? "Yes" : "No"}
                      </SummaryValue>
                    </SummaryItem>

                    <SummaryItem>
                      <SummaryLabel>Required Hashtags:</SummaryLabel>
                      <SummaryValue>{dealSummary.hashtagCount}</SummaryValue>
                    </SummaryItem>

                    <SummaryItem>
                      <SummaryLabel>Content Guidelines:</SummaryLabel>
                      <SummaryValue>{dealSummary.guidelineCount}</SummaryValue>
                    </SummaryItem>
                  </SummaryGrid>
                )}

                {/* Validation Status */}
                {Object.keys(validationErrors).length > 0 && (
                  <ValidationAlert>
                    <AlertCircle size={16} />
                    <div>
                      <strong>Please fix the following issues:</strong>
                      <ul>
                        {Object.entries(validationErrors).map(
                          ([field, error]) => (
                            <li key={field}>{error}</li>
                          )
                        )}
                      </ul>
                    </div>
                  </ValidationAlert>
                )}

                {/* {isFormValid && (
                  <SuccessAlert>
                    <CheckCircle size={16} />
                    <span>Deal is ready to be saved!</span>
                  </SuccessAlert>
                )} */}
              </SummaryContainer>
            )}
          </TabContent>

          <ModalFooter>
            <ActionButton onClick={onClose} variant="secondary">
              Cancel
            </ActionButton>
            {activeTab === 0 ? (
              <ActionButton
                onClick={() => handleTabChange(1)}
                primary
                disabled={!formData}
              >
                Review Deal
              </ActionButton>
            ) : (
              <ActionButton
                onClick={handleSave}
                primary
                disabled={!isFormValid}
              >
                Save Deal
              </ActionButton>
            )}
          </ModalFooter>
        </ModalContent>
      </Drawer>
    );
  }
);

DealCreationModal.displayName = "DealCreationModal";

// Styled Components
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
  padding: 0.75rem 1.5rem;
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
  flex: 1;
  justify-content: center;

  &:hover {
    color: ${sharedTheme.colorVariants.primary.dark};
  }
`;

const TabContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 1rem;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SectionCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  background: #fafbfc;
`;

const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 1.5rem 0;
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
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

const FormInput = styled.input<{ error?: boolean }>`
  padding: 0.75rem;
  border: 1px solid ${(props) => (props.error ? "#ef4444" : "#e5e7eb")};
  border-radius: 8px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.error ? "#ef4444" : sharedTheme.colorVariants.primary.dark};
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.error
          ? "#ef444420"
          : sharedTheme.colorVariants.primary.dark + "20"};
  }
`;

const FormSelect = styled.select<{ error?: boolean }>`
  padding: 0.75rem;
  border: 1px solid ${(props) => (props.error ? "#ef4444" : "#e5e7eb")};
  border-radius: 8px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  background-color: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.error ? "#ef4444" : sharedTheme.colorVariants.primary.dark};
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.error
          ? "#ef444420"
          : sharedTheme.colorVariants.primary.dark + "20"};
  }
`;

const FormTextarea = styled.textarea<{ error?: boolean }>`
  padding: 0.75rem;
  border: 1px solid ${(props) => (props.error ? "#ef4444" : "#e5e7eb")};
  border-radius: 8px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  min-height: 80px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.error ? "#ef4444" : sharedTheme.colorVariants.primary.dark};
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.error
          ? "#ef444420"
          : sharedTheme.colorVariants.primary.dark + "20"};
  }
`;

const ErrorText = styled.span`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: #ef4444;
  margin-top: 0.25rem;
`;

const SuggestedPricing = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
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
  background: white;
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

// Summary Components
const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SummaryTitle = styled.h2`
  margin: 0;
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  text-align: center;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
`;

const SummaryLabel = styled.span`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const SummaryValue = styled.span`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const ValidationAlert = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: #fee2e2;
  border: 1px solid #ef4444;
  border-radius: 8px;
  color: #991b1b;

  ul {
    margin: 0.5rem 0 0 0;
    padding-left: 1rem;
  }

  li {
    margin-bottom: 0.25rem;
  }
`;

// const SuccessAlert = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   padding: 1rem;
//   background: #dcfce7;
//   border: 1px solid #16a34a;
//   border-radius: 8px;
//   color: #166534;
//   font-weight: ${sharedTheme.typography.fontWeights.medium};
// `;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
  margin-top: auto;
`;

export default DealCreationModal;
