import { z } from "zod";

// Sub-schema interfaces
export interface CampaignFAQItem {
  campaignFAQQuestion: string;
  campaignFAQAnswer: string;
}

export interface CampaignFormData {
  campaignName: string;
  campaignDescription: string;
  campaignCategory: string;
  campaignPlatform: string;
  campaignStartDate: string;
  campaignEndDate: string;
  campaignBudget: number;
  campaignTargetAudience: {
    campaignGender: string[];
    campaignAgeRange: {
      campaignMinAge: number;
      campaignMaxAge: number;
    };
    campaignLocation: string[];
    campaignCustomLocation: string;
    campaignInterests: string[];
    campaignCustomInterest: string;
    campaignOccupation: string[];
    campaignCustomOccupation: string;
  };
  campaignObjectives: string[];
  campaignCustomObjective: string;
  campaignContentType: string[];
  campaignHashtags: string[];
  campaignPriority: "low" | "medium" | "high";
  campaignContentGuidelines: string[];
  campaignDosAndDonts: {
    campaignDos: string[];
    campaignDonts: string[];
  };
  campaignProductDetails: string;
  campaignAdditionalResources: {
    campaignResourceDescription: string;
    campaignResourceFiles: File[];
  };
  campaignFAQ: CampaignFAQItem[];
  campaignLegalRequirements: string;
  campaignPOC: {
    campaignPOCName: string;
    campaignPOCEmail: string;
    campaignPOCPhone: string;
  };
  campaignIsPublic: boolean;
}

// Zod Validation Schemas
export const CampaignFAQItemSchema = z.object({
  campaignFAQQuestion: z
    .string()
    .min(5, "Question must be at least 5 characters long")
    .max(200, "Question cannot exceed 200 characters"),
  campaignFAQAnswer: z
    .string()
    .min(10, "Answer must be at least 10 characters long")
    .max(1000, "Answer cannot exceed 1000 characters"),
});

export const CampaignTargetAudienceSchema = z.object({
  campaignGender: z
    .array(z.enum(["Male", "Female", "Non-binary", "All"]))
    .min(1, "At least one gender must be selected"),
  campaignAgeRange: z
    .object({
      campaignMinAge: z
        .number()
        .min(13, "Minimum age must be at least 13")
        .max(100, "Minimum age cannot exceed 100"),
      campaignMaxAge: z
        .number()
        .min(13, "Maximum age must be at least 13")
        .max(100, "Maximum age cannot exceed 100"),
    })
    .refine((data) => data.campaignMaxAge >= data.campaignMinAge, {
      message: "Maximum age must be greater than or equal to minimum age",
      path: ["campaignMaxAge"],
    }),
  campaignLocation: z.array(z.string()).default([]),
  campaignCustomLocation: z.string().default(""),
  campaignInterests: z.array(z.string()).default([]),
  campaignCustomInterest: z.string().default(""),
  campaignOccupation: z.array(z.string()).default([]),
  campaignCustomOccupation: z.string().default(""),
});

export const CampaignDosAndDontsSchema = z.object({
  campaignDos: z.array(z.string()).default([""]),
  campaignDonts: z.array(z.string()).default([""]),
});

export const CampaignAdditionalResourcesSchema = z.object({
  campaignResourceDescription: z
    .string()
    .max(500, "Resource description cannot exceed 500 characters")
    .default(""),
  campaignResourceFiles: z.array(z.instanceof(File)).default([]),
});

export const CampaignPOCSchema = z.object({
  campaignPOCName: z
    .string()
    .min(2, "POC name must be at least 2 characters long")
    .max(100, "POC name cannot exceed 100 characters")
    .default(""),
  campaignPOCEmail: z
    .string()
    .email("Please provide a valid email address")
    .default(""),
  campaignPOCPhone: z
    .string()
    .regex(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
      "Please provide a valid phone number"
    )
    .or(z.literal(""))
    .default(""),
});

export const CampaignFormDataSchema = z
  .object({
    campaignName: z
      .string()
      .min(3, "Campaign name must be at least 3 characters long")
      .max(100, "Campaign name cannot exceed 100 characters")
      .trim(),
    campaignDescription: z
      .string()
      .min(10, "Campaign description must be at least 10 characters long")
      .max(1000, "Campaign description cannot exceed 1000 characters")
      .trim(),
    campaignCategory: z.enum(
      [
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
      ],
      {
        errorMap: () => ({
          message: "Please select a valid campaign category",
        }),
      }
    ),
    campaignPlatform: z.enum(
      ["Instagram", "YouTube", "LinkedIn", "Twitter", "Facebook", "Snapchat"],
      {
        errorMap: () => ({ message: "Please select a supported platform" }),
      }
    ),
    campaignStartDate: z
      .string()
      .min(1, "Campaign start date is required")
      .refine(
        (date) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const startDate = new Date(date);
          return startDate >= today;
        },
        {
          message: "Campaign start date cannot be in the past",
        }
      ),
    campaignEndDate: z.string().min(1, "Campaign end date is required"),
    campaignBudget: z
      .number()
      .min(1, "Campaign budget must be at least 1")
      .max(10000000, "Campaign budget cannot exceed 10,000,000"),
    campaignTargetAudience: CampaignTargetAudienceSchema,
    campaignObjectives: z
      .array(z.string())
      .min(1, "At least one objective must be selected")
      .max(10, "Maximum 10 objectives allowed"),
    campaignCustomObjective: z.string().default(""),
    campaignContentType: z
      .array(z.string())
      .min(1, "At least one content type must be selected"),
    campaignHashtags: z
      .array(z.string())
      .max(30, "Maximum 30 hashtags allowed")
      .refine(
        (hashtags) =>
          hashtags.every((tag) => /^#[a-zA-Z0-9_]+$/.test(tag) || tag === ""),
        {
          message: "Invalid hashtag format",
        }
      )
      .default([]),
    campaignPriority: z.enum(["low", "medium", "high"]).default("medium"),
    campaignContentGuidelines: z
      .array(z.string())
      .max(10, "Maximum 10 content guidelines allowed")
      .default([""]),
    campaignDosAndDonts: CampaignDosAndDontsSchema,
    campaignProductDetails: z
      .string()
      .max(2000, "Product details cannot exceed 2000 characters")
      .default(""),
    campaignAdditionalResources: CampaignAdditionalResourcesSchema,
    campaignFAQ: z
      .array(CampaignFAQItemSchema)
      .max(20, "Maximum 20 FAQ items allowed")
      .default([]),
    campaignLegalRequirements: z
      .string()
      .max(1000, "Legal requirements cannot exceed 1000 characters")
      .default(""),
    campaignPOC: CampaignPOCSchema,
    campaignIsPublic: z.boolean().default(true),
  })
  .refine(
    (data) => {
      const startDate = new Date(data.campaignStartDate);
      const endDate = new Date(data.campaignEndDate);
      return endDate > startDate;
    },
    {
      message: "Campaign end date must be after start date",
      path: ["campaignEndDate"],
    }
  );

// Validation function
export const validateCampaignForm = (data: CampaignFormData) => {
  try {
    CampaignFormDataSchema.parse(data);
    return { success: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path.join(".");
        errors[path] = err.message;
      });
      return { success: false, errors };
    }
    return { success: false, errors: { general: "Validation failed" } };
  }
};

// Initial form data
export const initialCampaignFormData: CampaignFormData = {
  campaignName: "",
  campaignDescription: "",
  campaignCategory: "",
  campaignPlatform: "",
  campaignStartDate: "",
  campaignEndDate: "",
  campaignBudget: 0,
  campaignTargetAudience: {
    campaignGender: [],
    campaignAgeRange: {
      campaignMinAge: 18,
      campaignMaxAge: 65,
    },
    campaignLocation: [],
    campaignCustomLocation: "",
    campaignInterests: [],
    campaignCustomInterest: "",
    campaignOccupation: [],
    campaignCustomOccupation: "",
  },
  campaignObjectives: [],
  campaignCustomObjective: "",
  campaignContentType: [],
  campaignHashtags: [],
  campaignPriority: "medium",
  campaignContentGuidelines: [""],
  campaignDosAndDonts: {
    campaignDos: [""],
    campaignDonts: [""],
  },
  campaignProductDetails: "",
  campaignAdditionalResources: {
    campaignResourceDescription: "",
    campaignResourceFiles: [],
  },
  campaignFAQ: [],
  campaignLegalRequirements: "",
  campaignPOC: {
    campaignPOCName: "",
    campaignPOCEmail: "",
    campaignPOCPhone: "",
  },
  campaignIsPublic: true,
};
