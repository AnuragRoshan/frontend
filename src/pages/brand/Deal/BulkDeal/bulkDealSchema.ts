// schemas/bulkDealSchema.ts
import { z } from "zod";

// Deliverable schema
export const DeliverableSchema = z.object({
  dealDeliverableType: z.enum([
    "Posts",
    "Stories",
    "Reels",
    "IGTV",
    "Live Streams",
    "Videos",
    "Shorts",
    "Premieres",
    "Articles",
    "Live Events",
    "Documents",
    "Tweets",
    "Threads",
    "Spaces",
    "Events",
    "Snaps",
    "Spotlight",
    "Lenses",
  ]),
  dealDeliverablePlatform: z.enum([
    "Instagram",
    "YouTube",
    "LinkedIn",
    "Twitter",
    "Facebook",
    "Snapchat",
  ]),
  dealDeliverableQuantity: z
    .number()
    .min(1, "Quantity must be at least 1")
    .max(50, "Quantity cannot exceed 50"),
  dealDeliverableDescription: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters"),
});

// Dos and Don'ts schema
export const DosAndDontsSchema = z.object({
  dealDos: z.array(z.string()).max(20, "Maximum 20 dos allowed"),
  dealDonts: z.array(z.string()).max(20, "Maximum 20 don'ts allowed"),
});

// Main Bulk Deal Form Schema
export const BulkDealFormBaseSchema = z.object({
  // Financial Terms
  dealAmount: z
    .number()
    .min(1, "Amount must be greater than 0")
    .max(10000000, "Amount cannot exceed 10,000,000"),
  dealCurrency: z.enum(["INR", "USD", "EUR", "GBP"]),
  dealPaymentStructure: z.enum([
    "upfront",
    "milestone",
    "completion",
    "custom",
  ]),
  dealNegotiableAmount: z.boolean(),

  // Deliverables
  dealDeliverables: z
    .array(DeliverableSchema)
    .min(1, "At least one deliverable is required")
    .max(20, "Maximum 20 deliverables allowed"),

  // Timeline
  dealSubmissionDeadline: z
    .string()
    .min(1, "Submission deadline is required")
    .refine((date) => new Date(date) > new Date(), {
      message: "Submission deadline must be in the future",
    }),
  dealPostingDeadline: z
    .string()
    .min(1, "Posting deadline is required")
    .refine((date) => new Date(date) > new Date(), {
      message: "Posting deadline must be in the future",
    }),
  dealExpiryDate: z.enum(["3", "7", "14", "30"]),

  // Content Requirements
  dealHashtags: z
    .array(z.string().regex(/^#[a-zA-Z0-9_]+$/, "Invalid hashtag format"))
    .max(30, "Maximum 30 hashtags allowed"),
  dealContentGuidelines: z
    .array(z.string())
    .max(20, "Maximum 20 content guidelines allowed"),
  dealDosAndDonts: DosAndDontsSchema,

  // Customization flags
  customizeHashtags: z.boolean(),
  customizeGuidelines: z.boolean(),
  customizeDosAndDonts: z.boolean(),

  // Message
  dealApplicationMessage: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message cannot exceed 2000 characters"),
});

export const BulkDealFormSchema = BulkDealFormBaseSchema.refine(
  (data) => {
    // Custom validation: posting deadline should be after submission deadline
    return (
      new Date(data.dealPostingDeadline) >=
      new Date(data.dealSubmissionDeadline)
    );
  },
  {
    message: "Posting deadline must be after submission deadline",
    path: ["dealPostingDeadline"],
  }
);

// Campaign schema for validation
export const CampaignSchema = z.object({
  id: z.string(),
  name: z.string(),
  budget: z.number().positive(),
  spent: z.number().min(0),
  platform: z.string(),
  category: z.string(),
  hashtags: z.array(z.string()),
  contentGuidelines: z.array(z.string()),
  dosAndDonts: z.object({
    dos: z.array(z.string()),
    donts: z.array(z.string()),
  }),
  productDetails: z.string(),
  legalRequirements: z.string(),
  poc: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
  }),
});

// Selected Influencer schema
export const SelectedInfluencerSchema = z.object({
  id: z.string(),
  username: z.string(),
  displayName: z.string(),
  profileImage: z.string().url(),
  followers: z.number().positive(),
  engagementRate: z.number().min(0).max(100),
  location: z.string(),
  suggestedRate: z.number().positive(),
  rating: z.number().min(0).max(5),
});

// Type exports
export type BulkDealFormData = z.infer<typeof BulkDealFormSchema>;
export type Campaign = z.infer<typeof CampaignSchema>;
export type SelectedInfluencer = z.infer<typeof SelectedInfluencerSchema>;
export type Deliverable = z.infer<typeof DeliverableSchema>;
export type DosAndDonts = z.infer<typeof DosAndDontsSchema>;

// Validation helper functions
export const validateBulkDealForm = (data: unknown) => {
  return BulkDealFormSchema.safeParse(data);
};

export const validateDeliverable = (data: unknown) => {
  return DeliverableSchema.safeParse(data);
};

export const validateStep = (step: number, data: Partial<BulkDealFormData>) => {
  switch (step) {
    case 1:
      return BulkDealFormBaseSchema.pick({
        dealAmount: true,
        dealDeliverables: true,
        dealPaymentStructure: true,
      }).safeParse(data);

    case 2:
      return BulkDealFormBaseSchema.pick({
        dealSubmissionDeadline: true,
        dealPostingDeadline: true,
        dealExpiryDate: true,
      }).safeParse(data);

    case 3:
      return BulkDealFormSchema.safeParse(data);

    default:
      return { success: false, error: { issues: [] } };
  }
};
