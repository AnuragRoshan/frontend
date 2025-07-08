import React, { useState } from "react";
import styled from "styled-components";
import {
  Calendar,
  Target,
  Camera,
  Save,
  X,
  Upload,
  FileText,
  Image,
  Trash2,
  Globe,
  Lock,
  Plus,
  Edit3,
} from "lucide-react";
import { sharedTheme } from "../../../../../styles/theme/theme";
import Drawer from "../../../../../components/layout/Drawer";
import { ActionButton } from "../shared/ActionButton";
import {
  CampaignFormData,
  CampaignFAQItem,
  initialCampaignFormData,
  validateCampaignForm,
} from "./createCampaignSchema";

interface CreateCampaignDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (campaignData: CampaignFormData) => void;
  onSaveDraft?: (campaignData: CampaignFormData) => void;
}

export const CreateCampaignDrawer: React.FC<CreateCampaignDrawerProps> = ({
  isOpen,
  onClose,
  onSave,
  onSaveDraft,
}) => {
  const [formData, setFormData] = useState<CampaignFormData>(
    initialCampaignFormData
  );
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    "Fashion",
    "Technology",
    "Health",
    "Lifestyle",
    "Gaming",
    "Beauty",
    "Food",
    "Fitness",
    "Travel",
    "Finance",
    "Automotive",
    "Home & Garden",
    "Education",
    "Pets",
    "Entertainment",
    "Sports",
    "Baby & Kids",
  ];

  const platforms = [
    "Instagram",
    "YouTube",
    "LinkedIn",
    "Twitter",
    "Facebook",
    "Snapchat",
  ];

  const objectiveOptions = [
    "Brand Awareness",
    "Product Launch",
    "Sales",
    "Education",
    "User Acquisition",
    "App Downloads",
    "Engagement",
    "Lead Generation",
  ];

  // Platform-specific content types
  const getContentTypesByPlatform = (platform: string): string[] => {
    const contentMap: Record<string, string[]> = {
      Instagram: ["Posts", "Stories", "Reels", "IGTV", "Live Streams"],
      YouTube: ["Videos", "Shorts", "Live Streams", "Premieres"],
      LinkedIn: ["Posts", "Articles", "Stories", "Live Events", "Documents"],
      Twitter: ["Tweets", "Threads", "Spaces", "Fleets"],
      Facebook: ["Posts", "Stories", "Videos", "Live Streams", "Events"],
      Snapchat: ["Snaps", "Stories", "Spotlight", "Lenses"],
    };
    return contentMap[platform] || [];
  };

  const genderOptions = ["Male", "Female", "Non-binary", "All"];
  const locationOptions = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Surat",
    "Jaipur",
    "Pan India",
    "Metro Cities",
    "Tier 1 Cities",
    "Tier 2 Cities",
    "Tier 3 Cities",
  ];
  const interestOptions = [
    "Fashion",
    "Technology",
    "Travel",
    "Food",
    "Fitness",
    "Music",
    "Movies",
    "Books",
    "Gaming",
    "Sports",
    "Art",
    "Photography",
    "Health",
    "Beauty",
    "Lifestyle",
  ];
  const occupationOptions = [
    "Students",
    "Working Professionals",
    "Business Owners",
    "Homemakers",
    "Freelancers",
    "Retired",
    "Artists/Creators",
    "Healthcare Workers",
    "Teachers/Educators",
    "IT Professionals",
  ];

  const handleInputChange = <K extends keyof CampaignFormData>(
    field: K,
    value: CampaignFormData[K]
  ) => {
    setFormData((prev: CampaignFormData) => ({ ...prev, [field]: value }));
    if (errors[field as string]) {
      setErrors((prev) => ({ ...prev, [field as string]: "" }));
    }
  };

  const handleNestedInputChange = (
    parentField: keyof CampaignFormData,
    childField: string,
    value:
      | string
      | number
      | boolean
      | string[]
      | number[]
      | boolean[]
      | Record<string, unknown>
  ) => {
    setFormData((prev: CampaignFormData) => ({
      ...prev,
      [parentField]: {
        ...(prev[parentField] as Record<string, unknown>),
        [childField]: value,
      },
    }));
  };

  const handleArrayInputChange = (
    field: keyof CampaignFormData,
    value: string[]
  ) => {
    setFormData((prev: CampaignFormData) => ({ ...prev, [field]: value }));
  };

  const handleMultiSelectChange = (
    field: keyof CampaignFormData | string,
    option: string,
    parentField?: keyof CampaignFormData
  ) => {
    if (parentField) {
      const currentArray = (formData[parentField] as Record<string, string[]>)[
        String(field)
      ] as string[];
      const newArray = currentArray.includes(option)
        ? currentArray.filter((item) => item !== option)
        : [...currentArray, option];
      handleNestedInputChange(parentField, String(field), newArray);
    } else {
      const currentArray = formData[
        field as keyof CampaignFormData
      ] as string[];
      const newArray = currentArray.includes(option)
        ? currentArray.filter((item) => item !== option)
        : [...currentArray, option];
      handleArrayInputChange(field as keyof CampaignFormData, newArray);
    }
  };

  const handleCustomOptionAdd = (
    field: string,
    customValue: string,
    parentField?: keyof CampaignFormData
  ) => {
    if (customValue.trim()) {
      if (parentField) {
        const currentArray = (
          formData[parentField] as Record<string, string[]>
        )[field] as string[];
        if (!currentArray.includes(customValue.trim())) {
          handleNestedInputChange(parentField, field, [
            ...currentArray,
            customValue.trim(),
          ]);
          handleNestedInputChange(
            parentField,
            `campaign${
              field.charAt(0).toUpperCase() +
              field.slice(1).replace("campaign", "")
            }`,
            ""
          );
        }
      } else {
        const currentArray = formData[
          field as keyof CampaignFormData
        ] as string[];
        if (!currentArray.includes(customValue.trim())) {
          handleArrayInputChange(field as keyof CampaignFormData, [
            ...currentArray,
            customValue.trim(),
          ]);
          setFormData((prev: CampaignFormData) => ({
            ...prev,
            [`campaign${
              field.charAt(0).toUpperCase() +
              field.slice(1).replace("campaign", "")
            }`]: "",
          }));
        }
      }
    }
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files).filter(
        (file) =>
          file.type.startsWith("image/") ||
          file.type === "application/pdf" ||
          file.type.includes("document")
      );
      setFormData((prev: CampaignFormData) => ({
        ...prev,
        campaignAdditionalResources: {
          ...prev.campaignAdditionalResources,
          campaignResourceFiles: [
            ...prev.campaignAdditionalResources.campaignResourceFiles,
            ...newFiles,
          ],
        },
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData((prev: CampaignFormData) => ({
      ...prev,
      campaignAdditionalResources: {
        ...prev.campaignAdditionalResources,
        campaignResourceFiles:
          prev.campaignAdditionalResources.campaignResourceFiles.filter(
            (_, i) => i !== index
          ),
      },
    }));
  };

  const addToArray = (
    field: "campaignContentGuidelines" | "campaignDos" | "campaignDonts"
  ) => {
    if (field === "campaignDos" || field === "campaignDonts") {
      setFormData((prev: CampaignFormData) => ({
        ...prev,
        campaignDosAndDonts: {
          ...prev.campaignDosAndDonts,
          [field]: [...prev.campaignDosAndDonts[field], ""],
        },
      }));
    } else {
      setFormData((prev: CampaignFormData) => ({
        ...prev,
        [field]: [...prev[field], ""],
      }));
    }
  };

  const updateArrayItem = (
    field: "campaignContentGuidelines" | "campaignDos" | "campaignDonts",
    index: number,
    value: string
  ) => {
    if (field === "campaignDos" || field === "campaignDonts") {
      setFormData((prev: CampaignFormData) => ({
        ...prev,
        campaignDosAndDonts: {
          ...prev.campaignDosAndDonts,
          [field]: (prev.campaignDosAndDonts[field] as string[]).map(
            (item: string, i: number): string => (i === index ? value : item)
          ),
        },
      }));
    } else {
      setFormData((prev: CampaignFormData) => ({
        ...prev,
        [field]: (prev[field] as string[]).map(
          (item: string, i: number): string => (i === index ? value : item)
        ),
      }));
    }
  };

  const removeFromArray = (
    field: "campaignContentGuidelines" | "campaignDos" | "campaignDonts",
    index: number
  ) => {
    if (field === "campaignDos" || field === "campaignDonts") {
      setFormData((prev: CampaignFormData) => ({
        ...prev,
        campaignDosAndDonts: {
          ...prev.campaignDosAndDonts,
          [field]: (prev.campaignDosAndDonts[field] as string[]).filter(
            (_: string, i: number) => i !== index
          ),
        },
      }));
    } else {
      setFormData((prev: CampaignFormData) => ({
        ...prev,
        [field]: (prev[field] as string[]).filter(
          (_: string, i: number) => i !== index
        ),
      }));
    }
  };

  // FAQ handlers
  const addFAQItem = () => {
    setFormData((prev: CampaignFormData) => ({
      ...prev,
      campaignFAQ: [
        ...prev.campaignFAQ,
        { campaignFAQQuestion: "", campaignFAQAnswer: "" },
      ],
    }));
  };

  const updateFAQItem = (
    index: number,
    field: "campaignFAQQuestion" | "campaignFAQAnswer",
    value: string
  ) => {
    setFormData((prev: CampaignFormData) => ({
      ...prev,
      campaignFAQ: prev.campaignFAQ.map(
        (item: CampaignFAQItem, i: number): CampaignFAQItem =>
          i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const removeFAQItem = (index: number) => {
    setFormData((prev: CampaignFormData) => ({
      ...prev,
      campaignFAQ: prev.campaignFAQ.filter(
        (_: CampaignFAQItem, i: number) => i !== index
      ),
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.campaignName.trim())
        newErrors.campaignName = "Campaign name is required";
      if (!formData.campaignDescription.trim())
        newErrors.campaignDescription = "Description is required";
      if (!formData.campaignCategory)
        newErrors.campaignCategory = "Category is required";
      if (!formData.campaignPlatform)
        newErrors.campaignPlatform = "Platform is required";
    }

    if (step === 2) {
      if (!formData.campaignStartDate)
        newErrors.campaignStartDate = "Start date is required";
      if (!formData.campaignEndDate)
        newErrors.campaignEndDate = "End date is required";
      if (!formData.campaignBudget || formData.campaignBudget <= 0)
        newErrors.campaignBudget = "Budget must be greater than 0";
      if (formData.campaignTargetAudience.campaignGender.length === 0)
        newErrors.campaignGender = "Please select at least one gender";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    const validation = validateCampaignForm(formData);
    if (validation.success) {
      onSave(formData);
      setFormData(initialCampaignFormData);
      console.log("Campaign created successfully:", formData);
      setCurrentStep(1);
      onClose();
    } else {
      setErrors(validation.errors);
    }
  };

  const handleSaveDraft = () => {
    if (onSaveDraft) {
      onSaveDraft(formData);
      setFormData(initialCampaignFormData);
      setCurrentStep(1);
      onClose();
    }
  };

  const handleClose = () => {
    setFormData(initialCampaignFormData);
    setCurrentStep(1);
    setErrors({});
    onClose();
  };

  const renderStepIndicator = () => (
    <StepIndicator>
      {[1, 2, 3, 4].map((step) => (
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
            {step === 1 && "Basic Info"}
            {step === 2 && "Campaign Details"}
            {step === 3 && "Content & Guidelines"}
            {step === 4 && "Review & Create"}
          </StepLabel>
        </StepItem>
      ))}
    </StepIndicator>
  );

  const renderStep1 = () => (
    <StepContent>
      <SectionTitle>
        <Target size={20} />
        Basic Campaign Information
      </SectionTitle>

      <FormGroup>
        <FormLabel required>Campaign Name</FormLabel>
        <FormInput
          type="text"
          value={formData.campaignName}
          onChange={(e) => handleInputChange("campaignName", e.target.value)}
          placeholder="Enter campaign name"
          error={!!errors.campaignName}
        />
        {errors.campaignName && <ErrorText>{errors.campaignName}</ErrorText>}
      </FormGroup>

      <FormGroup>
        <FormLabel required>Campaign Description</FormLabel>
        <FormTextarea
          value={formData.campaignDescription}
          onChange={(e) =>
            handleInputChange("campaignDescription", e.target.value)
          }
          placeholder="Describe your campaign objectives and goals"
          error={!!errors.campaignDescription}
        />
        {errors.campaignDescription && (
          <ErrorText>{errors.campaignDescription}</ErrorText>
        )}
      </FormGroup>

      <FormRow>
        <FormGroup>
          <FormLabel required>Campaign Category</FormLabel>
          <FormSelect
            value={formData.campaignCategory}
            onChange={(e) =>
              handleInputChange("campaignCategory", e.target.value)
            }
            error={!!errors.campaignCategory}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </FormSelect>
          {errors.campaignCategory && (
            <ErrorText>{errors.campaignCategory}</ErrorText>
          )}
        </FormGroup>

        <FormGroup>
          <FormLabel required>Campaign Platform</FormLabel>
          <FormSelect
            value={formData.campaignPlatform}
            onChange={(e) =>
              handleInputChange("campaignPlatform", e.target.value)
            }
            error={!!errors.campaignPlatform}
          >
            <option value="">Select platform</option>
            {platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </FormSelect>
          {errors.campaignPlatform && (
            <ErrorText>{errors.campaignPlatform}</ErrorText>
          )}
        </FormGroup>
      </FormRow>

      <FormGroup>
        <FormLabel>Campaign Priority</FormLabel>
        <PrioritySelector>
          {(["low", "medium", "high"] as const).map((priority) => (
            <PriorityOption
              key={priority}
              active={formData.campaignPriority === priority}
              onClick={() => handleInputChange("campaignPriority", priority)}
            >
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </PriorityOption>
          ))}
        </PrioritySelector>
      </FormGroup>

      {/* Campaign Visibility Toggle */}
      <VisibilitySection>
        <SectionSubtitle>Campaign Visibility</SectionSubtitle>
        <VisibilityToggle>
          <ToggleButton
            active={formData.campaignIsPublic}
            onClick={() => handleInputChange("campaignIsPublic", true)}
          >
            <Globe size={16} />
            <ToggleContent>
              <ToggleTitle>Public Campaign</ToggleTitle>
              <ToggleDescription>
                Visible to all influencers on platform
              </ToggleDescription>
            </ToggleContent>
          </ToggleButton>

          <ToggleButton
            active={!formData.campaignIsPublic}
            onClick={() => handleInputChange("campaignIsPublic", false)}
          >
            <Lock size={16} />
            <ToggleContent>
              <ToggleTitle>Private Campaign</ToggleTitle>
              <ToggleDescription>
                Invite-only for selected influencers
              </ToggleDescription>
            </ToggleContent>
          </ToggleButton>
        </VisibilityToggle>
      </VisibilitySection>
    </StepContent>
  );

  const renderStep2 = () => (
    <StepContent>
      <SectionTitle>
        <Calendar size={20} />
        Campaign Timeline & Budget
      </SectionTitle>

      <FormRow>
        <FormGroup>
          <FormLabel required>Campaign Start Date</FormLabel>
          <FormInput
            type="date"
            value={formData.campaignStartDate}
            onChange={(e) =>
              handleInputChange("campaignStartDate", e.target.value)
            }
            error={!!errors.campaignStartDate}
          />
          {errors.campaignStartDate && (
            <ErrorText>{errors.campaignStartDate}</ErrorText>
          )}
        </FormGroup>

        <FormGroup>
          <FormLabel required>Campaign End Date</FormLabel>
          <FormInput
            type="date"
            value={formData.campaignEndDate}
            onChange={(e) =>
              handleInputChange("campaignEndDate", e.target.value)
            }
            error={!!errors.campaignEndDate}
          />
          {errors.campaignEndDate && (
            <ErrorText>{errors.campaignEndDate}</ErrorText>
          )}
        </FormGroup>
      </FormRow>

      <FormGroup>
        <FormLabel required>Campaign Budget (₹)</FormLabel>
        <FormInput
          type="number"
          value={formData.campaignBudget || ""}
          onChange={(e) =>
            handleInputChange("campaignBudget", Number(e.target.value))
          }
          placeholder="Enter campaign budget"
          error={!!errors.campaignBudget}
        />
        {errors.campaignBudget && (
          <ErrorText>{errors.campaignBudget}</ErrorText>
        )}
      </FormGroup>

      {/* Enhanced Target Audience Section */}
      <TargetAudienceSection>
        <SectionSubtitle>Campaign Target Audience Details</SectionSubtitle>

        <FormGroup>
          <FormLabel required>Campaign Gender</FormLabel>
          <MultiSelectGrid>
            {genderOptions.map((gender) => (
              <MultiSelectItem
                key={gender}
                selected={formData.campaignTargetAudience.campaignGender.includes(
                  gender
                )}
                onClick={() =>
                  handleMultiSelectChange(
                    "campaignGender",
                    gender,
                    "campaignTargetAudience"
                  )
                }
              >
                {gender}
              </MultiSelectItem>
            ))}
          </MultiSelectGrid>
          {errors.campaignGender && (
            <ErrorText>{errors.campaignGender}</ErrorText>
          )}
        </FormGroup>

        <FormGroup>
          <FormLabel>Campaign Age Range</FormLabel>
          <AgeRangeContainer>
            <FormInput
              type="number"
              value={
                formData.campaignTargetAudience.campaignAgeRange.campaignMinAge
              }
              onChange={(e) =>
                handleNestedInputChange(
                  "campaignTargetAudience",
                  "campaignAgeRange",
                  {
                    ...formData.campaignTargetAudience.campaignAgeRange,
                    campaignMinAge: Number(e.target.value),
                  }
                )
              }
              placeholder="Min age"
              min="13"
              max="100"
            />
            <span>to</span>
            <FormInput
              type="number"
              value={
                formData.campaignTargetAudience.campaignAgeRange.campaignMaxAge
              }
              onChange={(e) =>
                handleNestedInputChange(
                  "campaignTargetAudience",
                  "campaignAgeRange",
                  {
                    ...formData.campaignTargetAudience.campaignAgeRange,
                    campaignMaxAge: Number(e.target.value),
                  }
                )
              }
              placeholder="Max age"
              min="13"
              max="100"
            />
          </AgeRangeContainer>
        </FormGroup>

        <FormGroup>
          <FormLabel>Campaign Location</FormLabel>
          <MultiSelectGrid>
            {locationOptions.map((location) => (
              <MultiSelectItem
                key={location}
                selected={formData.campaignTargetAudience.campaignLocation.includes(
                  location
                )}
                onClick={() =>
                  handleMultiSelectChange(
                    "campaignLocation",
                    location,
                    "campaignTargetAudience"
                  )
                }
              >
                {location}
              </MultiSelectItem>
            ))}
          </MultiSelectGrid>
          <CustomInputContainer>
            <FormInput
              type="text"
              value={formData.campaignTargetAudience.campaignCustomLocation}
              onChange={(e) =>
                handleNestedInputChange(
                  "campaignTargetAudience",
                  "campaignCustomLocation",
                  e.target.value
                )
              }
              placeholder="Add custom location"
            />
            <AddCustomButton
              onClick={() =>
                handleCustomOptionAdd(
                  "campaignLocation",
                  formData.campaignTargetAudience.campaignCustomLocation,
                  "campaignTargetAudience"
                )
              }
              disabled={
                !formData.campaignTargetAudience.campaignCustomLocation.trim()
              }
            >
              <Plus size={16} />
            </AddCustomButton>
          </CustomInputContainer>
        </FormGroup>

        <FormGroup>
          <FormLabel>Campaign Interests</FormLabel>
          <MultiSelectGrid>
            {interestOptions.map((interest) => (
              <MultiSelectItem
                key={interest}
                selected={formData.campaignTargetAudience.campaignInterests.includes(
                  interest
                )}
                onClick={() =>
                  handleMultiSelectChange(
                    "campaignInterests",
                    interest,
                    "campaignTargetAudience"
                  )
                }
              >
                {interest}
              </MultiSelectItem>
            ))}
          </MultiSelectGrid>
          <CustomInputContainer>
            <FormInput
              type="text"
              value={formData.campaignTargetAudience.campaignCustomInterest}
              onChange={(e) =>
                handleNestedInputChange(
                  "campaignTargetAudience",
                  "campaignCustomInterest",
                  e.target.value
                )
              }
              placeholder="Add custom interest"
            />
            <AddCustomButton
              onClick={() =>
                handleCustomOptionAdd(
                  "campaignInterests",
                  formData.campaignTargetAudience.campaignCustomInterest,
                  "campaignTargetAudience"
                )
              }
              disabled={
                !formData.campaignTargetAudience.campaignCustomInterest.trim()
              }
            >
              <Plus size={16} />
            </AddCustomButton>
          </CustomInputContainer>
        </FormGroup>

        <FormGroup>
          <FormLabel>Campaign Occupation</FormLabel>
          <MultiSelectGrid>
            {occupationOptions.map((occupation) => (
              <MultiSelectItem
                key={occupation}
                selected={formData.campaignTargetAudience.campaignOccupation.includes(
                  occupation
                )}
                onClick={() =>
                  handleMultiSelectChange(
                    "campaignOccupation",
                    occupation,
                    "campaignTargetAudience"
                  )
                }
              >
                {occupation}
              </MultiSelectItem>
            ))}
          </MultiSelectGrid>
          <CustomInputContainer>
            <FormInput
              type="text"
              value={formData.campaignTargetAudience.campaignCustomOccupation}
              onChange={(e) =>
                handleNestedInputChange(
                  "campaignTargetAudience",
                  "campaignCustomOccupation",
                  e.target.value
                )
              }
              placeholder="Add custom occupation"
            />
            <AddCustomButton
              onClick={() =>
                handleCustomOptionAdd(
                  "campaignOccupation",
                  formData.campaignTargetAudience.campaignCustomOccupation,
                  "campaignTargetAudience"
                )
              }
              disabled={
                !formData.campaignTargetAudience.campaignCustomOccupation.trim()
              }
            >
              <Plus size={16} />
            </AddCustomButton>
          </CustomInputContainer>
        </FormGroup>
      </TargetAudienceSection>

      <FormGroup>
        <FormLabel>Campaign Objectives</FormLabel>
        <MultiSelectGrid>
          {objectiveOptions.map((objective) => (
            <MultiSelectItem
              key={objective}
              selected={formData.campaignObjectives.includes(objective)}
              onClick={() =>
                handleMultiSelectChange("campaignObjectives", objective)
              }
            >
              {objective}
            </MultiSelectItem>
          ))}
        </MultiSelectGrid>
        <CustomInputContainer>
          <FormInput
            type="text"
            value={formData.campaignCustomObjective}
            onChange={(e) =>
              handleInputChange("campaignCustomObjective", e.target.value)
            }
            placeholder="Add custom objective"
          />
          <AddCustomButton
            onClick={() =>
              handleCustomOptionAdd(
                "campaignObjectives",
                formData.campaignCustomObjective
              )
            }
            disabled={!formData.campaignCustomObjective.trim()}
          >
            <Plus size={16} />
          </AddCustomButton>
        </CustomInputContainer>
      </FormGroup>

      {/* Enhanced Campaign POC Section */}
      <POCSection>
        <SectionSubtitle>Campaign Point of Contact</SectionSubtitle>

        <FormGroup>
          <FormLabel>Campaign POC Name</FormLabel>
          <FormInput
            type="text"
            value={formData.campaignPOC.campaignPOCName}
            onChange={(e) =>
              handleNestedInputChange(
                "campaignPOC",
                "campaignPOCName",
                e.target.value
              )
            }
            placeholder="Enter POC name"
          />
        </FormGroup>

        <FormRow>
          <FormGroup>
            <FormLabel>Campaign POC Email</FormLabel>
            <FormInput
              type="email"
              value={formData.campaignPOC.campaignPOCEmail}
              onChange={(e) =>
                handleNestedInputChange(
                  "campaignPOC",
                  "campaignPOCEmail",
                  e.target.value
                )
              }
              placeholder="Enter email address"
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Campaign POC Phone</FormLabel>
            <FormInput
              type="tel"
              value={formData.campaignPOC.campaignPOCPhone}
              onChange={(e) =>
                handleNestedInputChange(
                  "campaignPOC",
                  "campaignPOCPhone",
                  e.target.value
                )
              }
              placeholder="Enter phone number"
            />
          </FormGroup>
        </FormRow>
      </POCSection>
    </StepContent>
  );

  const renderStep3 = () => (
    <StepContent>
      <SectionTitle>
        <Camera size={20} />
        Campaign Content Guidelines & Requirements
      </SectionTitle>

      <FormGroup>
        <FormLabel>Campaign Content Types</FormLabel>
        {formData.campaignPlatform ? (
          <MultiSelectGrid>
            {getContentTypesByPlatform(formData.campaignPlatform).map(
              (type) => (
                <MultiSelectItem
                  key={type}
                  selected={formData.campaignContentType.includes(type)}
                  onClick={() =>
                    handleMultiSelectChange("campaignContentType", type)
                  }
                >
                  {type}
                </MultiSelectItem>
              )
            )}
          </MultiSelectGrid>
        ) : (
          <PlatformRequiredMessage>
            Please select a platform in Step 1 to see available content types
          </PlatformRequiredMessage>
        )}
      </FormGroup>

      <FormGroup>
        <FormLabel>Campaign Content Guidelines (Max 10 points)</FormLabel>
        <ArrayInputContainer>
          {formData.campaignContentGuidelines.map((guideline, index) => (
            <ArrayInputRow key={index}>
              <FormInput
                type="text"
                value={guideline}
                style={{ width: "100%" }}
                onChange={(e) =>
                  updateArrayItem(
                    "campaignContentGuidelines",
                    index,
                    e.target.value
                  )
                }
                placeholder={`Guideline ${index + 1}`}
              />
              {formData.campaignContentGuidelines.length > 1 && (
                <RemoveButton
                  onClick={() =>
                    removeFromArray("campaignContentGuidelines", index)
                  }
                >
                  <X size={16} />
                </RemoveButton>
              )}
            </ArrayInputRow>
          ))}
          {formData.campaignContentGuidelines.length < 10 && (
            <AddButton onClick={() => addToArray("campaignContentGuidelines")}>
              + Add Guideline
            </AddButton>
          )}
        </ArrayInputContainer>
      </FormGroup>

      <FormRow>
        <FormGroup>
          <FormLabel>Campaign Do's</FormLabel>
          <ArrayInputContainer>
            {formData.campaignDosAndDonts.campaignDos.map((dos, index) => (
              <ArrayInputRow key={index}>
                <FormInput
                  type="text"
                  value={dos}
                  style={{ width: "100%" }}
                  onChange={(e) =>
                    updateArrayItem("campaignDos", index, e.target.value)
                  }
                  placeholder={`Do ${index + 1}`}
                />
                {formData.campaignDosAndDonts.campaignDos.length > 1 && (
                  <RemoveButton
                    onClick={() => removeFromArray("campaignDos", index)}
                  >
                    <X size={16} />
                  </RemoveButton>
                )}
              </ArrayInputRow>
            ))}
            <AddButton onClick={() => addToArray("campaignDos")}>
              + Add Do
            </AddButton>
          </ArrayInputContainer>
        </FormGroup>

        <FormGroup>
          <FormLabel>Campaign Don'ts</FormLabel>
          <ArrayInputContainer>
            {formData.campaignDosAndDonts.campaignDonts.map((dont, index) => (
              <ArrayInputRow key={index}>
                <FormInput
                  type="text"
                  value={dont}
                  style={{ width: "100%" }}
                  onChange={(e) =>
                    updateArrayItem("campaignDonts", index, e.target.value)
                  }
                  placeholder={`Don't ${index + 1}`}
                />
                {formData.campaignDosAndDonts.campaignDonts.length > 1 && (
                  <RemoveButton
                    onClick={() => removeFromArray("campaignDonts", index)}
                  >
                    <X size={16} />
                  </RemoveButton>
                )}
              </ArrayInputRow>
            ))}
            <AddButton onClick={() => addToArray("campaignDonts")}>
              + Add Don't
            </AddButton>
          </ArrayInputContainer>
        </FormGroup>
      </FormRow>

      <FormGroup>
        <FormLabel>Campaign Hashtags</FormLabel>
        <HashtagInput
          type="text"
          value={formData.campaignHashtags.join(", ")}
          onChange={(e) =>
            handleInputChange(
              "campaignHashtags",
              e.target.value.split(",").map((tag) => tag.trim())
            )
          }
          placeholder="Enter hashtags separated by commas (e.g., #campaign, #brand, #product)"
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>Campaign Product Details</FormLabel>
        <FormTextarea
          value={formData.campaignProductDetails}
          onChange={(e) =>
            handleInputChange("campaignProductDetails", e.target.value)
          }
          placeholder="Product specifications, USPs, features"
        />
      </FormGroup>
    </StepContent>
  );

  const renderStep4 = () => (
    <StepContent>
      <SectionTitle>
        <Save size={20} />
        Additional Information & Review
      </SectionTitle>

      {/* Enhanced Additional Resources with File Upload */}
      <FormGroup>
        <FormLabel>Campaign Additional Resources</FormLabel>
        <FormTextarea
          value={
            formData.campaignAdditionalResources.campaignResourceDescription
          }
          onChange={(e) =>
            handleNestedInputChange(
              "campaignAdditionalResources",
              "campaignResourceDescription",
              e.target.value
            )
          }
          placeholder="Describe the additional resources (brand assets, reference content, logos, etc.)"
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>Upload Campaign Files (Images, PDFs, Documents)</FormLabel>
        <FileUploadContainer>
          <FileUploadArea>
            <Upload size={24} />
            <span>Click to upload or drag and drop files</span>
            <FileInput
              type="file"
              multiple
              accept="image/*,.pdf,.doc,.docx"
              onChange={(e) => handleFileUpload(e.target.files)}
            />
          </FileUploadArea>

          {formData.campaignAdditionalResources.campaignResourceFiles.length >
            0 && (
            <UploadedFilesList>
              {formData.campaignAdditionalResources.campaignResourceFiles.map(
                (file, index: number) => (
                  <UploadedFileItem key={index}>
                    <FileIcon>
                      {file.type.startsWith("image/") ? (
                        <Image size={16} />
                      ) : (
                        <FileText size={16} />
                      )}
                    </FileIcon>
                    <FileName>{file.name}</FileName>
                    <FileSize>
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </FileSize>
                    <RemoveFileButton onClick={() => removeFile(index)}>
                      <Trash2 size={14} />
                    </RemoveFileButton>
                  </UploadedFileItem>
                )
              )}
            </UploadedFilesList>
          )}
        </FileUploadContainer>
      </FormGroup>

      {/* Enhanced FAQ Section */}
      <FormGroup>
        <FormLabel>Campaign FAQ</FormLabel>
        <FAQContainer>
          {formData.campaignFAQ.map(
            (faqItem: CampaignFAQItem, index: number) => (
              <FAQItem key={index}>
                <FAQItemHeader>
                  <FAQItemTitle>Question {index + 1}</FAQItemTitle>
                  <RemoveButton onClick={() => removeFAQItem(index)}>
                    <X size={16} />
                  </RemoveButton>
                </FAQItemHeader>
                <FormInput
                  type="text"
                  value={faqItem.campaignFAQQuestion}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateFAQItem(index, "campaignFAQQuestion", e.target.value)
                  }
                  placeholder="Enter question"
                />
                <FormTextarea
                  value={faqItem.campaignFAQAnswer}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    updateFAQItem(index, "campaignFAQAnswer", e.target.value)
                  }
                  placeholder="Enter answer"
                  style={{ minHeight: "80px" }}
                />
              </FAQItem>
            )
          )}
          <AddButton onClick={addFAQItem}>
            <Plus size={16} />
            Add FAQ
          </AddButton>
        </FAQContainer>
      </FormGroup>

      <FormGroup>
        <FormLabel>Campaign Legal Requirements</FormLabel>
        <FormTextarea
          value={formData.campaignLegalRequirements}
          onChange={(e) =>
            handleInputChange("campaignLegalRequirements", e.target.value)
          }
          placeholder="Compliance needs, disclosure requirements"
        />
      </FormGroup>

      <ReviewSection>
        <ReviewTitle>Campaign Summary</ReviewTitle>
        <ReviewGrid>
          <ReviewItem>
            <ReviewLabel>Campaign Name:</ReviewLabel>
            <ReviewValue>
              {formData.campaignName || "Not specified"}
            </ReviewValue>
          </ReviewItem>
          <ReviewItem>
            <ReviewLabel>Campaign Category:</ReviewLabel>
            <ReviewValue>
              {formData.campaignCategory || "Not specified"}
            </ReviewValue>
          </ReviewItem>
          <ReviewItem>
            <ReviewLabel>Campaign Platform:</ReviewLabel>
            <ReviewValue>
              {formData.campaignPlatform || "Not specified"}
            </ReviewValue>
          </ReviewItem>
          <ReviewItem>
            <ReviewLabel>Campaign Visibility:</ReviewLabel>
            <ReviewValue>
              {formData.campaignIsPublic ? "Public" : "Private"}
            </ReviewValue>
          </ReviewItem>
          <ReviewItem>
            <ReviewLabel>Campaign Budget:</ReviewLabel>
            <ReviewValue>
              ₹{formData.campaignBudget?.toLocaleString() || "0"}
            </ReviewValue>
          </ReviewItem>
          <ReviewItem>
            <ReviewLabel>Campaign Duration:</ReviewLabel>
            <ReviewValue>
              {formData.campaignStartDate && formData.campaignEndDate
                ? `${formData.campaignStartDate} to ${formData.campaignEndDate}`
                : "Not specified"}
            </ReviewValue>
          </ReviewItem>
          <ReviewItem>
            <ReviewLabel>Target Gender:</ReviewLabel>
            <ReviewValue>
              {formData.campaignTargetAudience.campaignGender.join(", ") ||
                "Not specified"}
            </ReviewValue>
          </ReviewItem>
          <ReviewItem>
            <ReviewLabel>Age Range:</ReviewLabel>
            <ReviewValue>
              {`${formData.campaignTargetAudience.campaignAgeRange.campaignMinAge} - ${formData.campaignTargetAudience.campaignAgeRange.campaignMaxAge} years`}
            </ReviewValue>
          </ReviewItem>
          <ReviewItem>
            <ReviewLabel>Campaign Locations:</ReviewLabel>
            <ReviewValue>
              {formData.campaignTargetAudience.campaignLocation.join(", ") ||
                "Not specified"}
            </ReviewValue>
          </ReviewItem>
          <ReviewItem>
            <ReviewLabel>Campaign Objectives:</ReviewLabel>
            <ReviewValue>
              {formData.campaignObjectives.join(", ") || "None selected"}
            </ReviewValue>
          </ReviewItem>
          <ReviewItem>
            <ReviewLabel>Campaign Content Types:</ReviewLabel>
            <ReviewValue>
              {formData.campaignContentType.join(", ") || "None selected"}
            </ReviewValue>
          </ReviewItem>
          <ReviewItem>
            <ReviewLabel>Campaign POC:</ReviewLabel>
            <ReviewValue>
              {formData.campaignPOC.campaignPOCName || "Not specified"}
              {formData.campaignPOC.campaignPOCEmail &&
                ` (${formData.campaignPOC.campaignPOCEmail})`}
            </ReviewValue>
          </ReviewItem>
          <ReviewItem>
            <ReviewLabel>Files Uploaded:</ReviewLabel>
            <ReviewValue>
              {
                formData.campaignAdditionalResources.campaignResourceFiles
                  .length
              }{" "}
              file(s)
            </ReviewValue>
          </ReviewItem>
          <ReviewItem>
            <ReviewLabel>FAQ Items:</ReviewLabel>
            <ReviewValue>{formData.campaignFAQ.length} question(s)</ReviewValue>
          </ReviewItem>
        </ReviewGrid>
      </ReviewSection>
    </StepContent>
  );

  return (
    <DrawerContainer>
      <Drawer isOpen={isOpen} onClose={handleClose} size="xl" anchor="right">
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Create New Campaign</DrawerTitle>
            <DrawerSubtitle>Step {currentStep} of 4</DrawerSubtitle>
          </DrawerHeader>

          {renderStepIndicator()}

          <DrawerBody>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </DrawerBody>
        </DrawerContent>

        {/* Sticky Footer */}
        <StickyFooter>
          <FooterActions>
            {currentStep > 1 && (
              <ActionButton onClick={handlePrevious}>Previous</ActionButton>
            )}
            <ActionButton onClick={handleClose}>Cancel</ActionButton>
            {onSaveDraft && (
              <ActionButton onClick={handleSaveDraft}>
                <Edit3 size={16} />
                Save as Draft
              </ActionButton>
            )}
            {currentStep < 4 ? (
              <ActionButton primary onClick={handleNext}>
                Next
              </ActionButton>
            ) : (
              <ActionButton primary onClick={handleSubmit}>
                <Save size={16} />
                Create Campaign
              </ActionButton>
            )}
          </FooterActions>
        </StickyFooter>
      </Drawer>
    </DrawerContainer>
  );
};

// Styled Components (keeping all the same styled components from original)
const DrawerContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const DrawerContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const DrawerHeader = styled.div`
  padding: 1.5rem 0 1rem 0;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1rem;
  flex-shrink: 0;
`;

const DrawerTitle = styled.h2`
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  margin: 0 0 0.5rem 0;
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const DrawerSubtitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  flex-shrink: 0;
`;

const StepItem = styled.div<{ active: boolean; current: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: ${(props) => (props.active ? 1 : 0.5)};
`;

const StepNumber = styled.div<{ active?: boolean; current?: boolean }>`
  width: 32px;
  height: 32px;
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
`;

const DrawerBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 0.5rem;
  padding-bottom: 1rem;
`;

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
`;

const SectionSubtitle = styled.h4`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0 0 1rem 0;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

const FormTextarea = styled.textarea<{ error?: boolean }>`
  padding: 0.75rem;
  border: 1px solid ${(props) => (props.error ? "#ef4444" : "#e5e7eb")};
  border-radius: 8px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  min-height: 100px;
  resize: vertical;
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

const FormSelect = styled.select<{ error?: boolean }>`
  padding: 0.75rem;
  border: 1px solid ${(props) => (props.error ? "#ef4444" : "#e5e7eb")};
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

const ErrorText = styled.span`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: #ef4444;
  margin-top: 0.25rem;
`;

const PrioritySelector = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const PriorityOption = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid
    ${(props) =>
      props.active ? sharedTheme.colorVariants.primary.dark : "#e5e7eb"};
  border-radius: 6px;
  background-color: ${(props) =>
    props.active ? sharedTheme.colorVariants.primary.dark : "white"};
  color: ${(props) =>
    props.active ? "white" : sharedTheme.colorVariants.secondary.dark};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${sharedTheme.colorVariants.primary.dark};
  }
`;

const VisibilitySection = styled.div`
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem 0;
`;

const VisibilityToggle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ToggleButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border: 2px solid
    ${(props) =>
      props.active ? sharedTheme.colorVariants.primary.dark : "#e5e7eb"};
  border-radius: 8px;
  background-color: ${(props) =>
    props.active ? sharedTheme.colorVariants.primary.dark + "10" : "white"};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    border-color: ${sharedTheme.colorVariants.primary.dark};
  }

  svg {
    color: ${(props) =>
      props.active
        ? sharedTheme.colorVariants.primary.dark
        : sharedTheme.colorVariants.secondary.light};
    margin-top: 0.1rem;
    flex-shrink: 0;
  }
`;

const ToggleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ToggleTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const ToggleDescription = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
  line-height: 1.4;
`;

const TargetAudienceSection = styled.div`
  gap: 1rem;
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem 0;
`;

const POCSection = styled.div`
  gap: 1rem;
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem 0;
`;

const AgeRangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    font-size: ${sharedTheme.typography.fontSizes.sm};
    color: ${sharedTheme.colorVariants.secondary.dark};
  }

  input {
    width: 80px;
  }
`;

const MultiSelectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
`;

const MultiSelectItem = styled.button<{ selected: boolean }>`
  padding: 0.5rem;
  border: 1px solid
    ${(props) =>
      props.selected ? sharedTheme.colorVariants.primary.dark : "#e5e7eb"};
  border-radius: 6px;
  background-color: ${(props) =>
    props.selected ? sharedTheme.colorVariants.primary.dark + "10" : "white"};
  color: ${(props) =>
    props.selected
      ? sharedTheme.colorVariants.primary.dark
      : sharedTheme.colorVariants.secondary.dark};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;

  &:hover {
    border-color: ${sharedTheme.colorVariants.primary.dark};
  }
`;

const CustomInputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const AddCustomButton = styled.button<{ disabled?: boolean }>`
  padding: 0.75rem;
  border: 1px solid ${sharedTheme.colorVariants.primary.dark};
  border-radius: 6px;
  background-color: ${(props) =>
    props.disabled ? "#f3f4f6" : sharedTheme.colorVariants.primary.dark};
  color: ${(props) => (props.disabled ? "#9ca3af" : "white")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${sharedTheme.colorVariants.primary.darker};
  }
`;

const PlatformRequiredMessage = styled.div`
  padding: 1rem;
  background-color: #fef3cd;
  border: 1px solid #fbbf24;
  border-radius: 6px;
  color: #92400e;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  text-align: center;
`;

const ArrayInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ArrayInputRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const RemoveButton = styled.button`
  padding: 0.5rem;
  border: 1px solid #ef4444;
  border-radius: 6px;
  background-color: white;
  color: #ef4444;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #ef4444;
    color: white;
  }
`;

const AddButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px dashed ${sharedTheme.colorVariants.primary.dark};
  border-radius: 6px;
  background-color: transparent;
  color: ${sharedTheme.colorVariants.primary.dark};
  cursor: pointer;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${sharedTheme.colorVariants.primary.dark}10;
  }
`;

const HashtagInput = styled(FormInput)`
  &::before {
    content: "#";
    position: absolute;
    left: 0.75rem;
    color: ${sharedTheme.colorVariants.secondary.light};
  }
`;

const FAQContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FAQItem = styled.div`
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FAQItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FAQItemTitle = styled.h5`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
`;

const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FileUploadArea = styled.div`
  position: relative;
  border: 2px dashed ${sharedTheme.colorVariants.primary.dark};
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  background-color: ${sharedTheme.colorVariants.primary.dark}05;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${sharedTheme.colorVariants.primary.dark}10;
  }

  span {
    display: block;
    margin-top: 0.5rem;
    font-size: ${sharedTheme.typography.fontSizes.sm};
    color: ${sharedTheme.colorVariants.secondary.dark};
  }
`;

const FileInput = styled.input`
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
`;

const UploadedFilesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const UploadedFileItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background-color: white;
`;

const FileIcon = styled.div`
  color: ${sharedTheme.colorVariants.primary.dark};
`;

const FileName = styled.span`
  flex: 1;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileSize = styled.span`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const RemoveFileButton = styled.button`
  padding: 0.25rem;
  border: none;
  background-color: #ef4444;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #dc2626;
  }
`;

const ReviewSection = styled.div`
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
`;

const ReviewTitle = styled.h4`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0 0 1rem 0;
`;

const ReviewGrid = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const ReviewItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 0.5rem;
`;

const ReviewLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const ReviewValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const StickyFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 1rem;
  z-index: 10;
`;

const FooterActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
`;

export default CreateCampaignDrawer;
