// schemas/dealSchema.ts
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

// Main Deal Form Schema
export const DealFormSchema = z
  .object({
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

    // Message
    dealApplicationMessage: z
      .string()
      .min(10, "Message must be at least 10 characters")
      .max(2000, "Message cannot exceed 2000 characters"),
  })
  .refine(
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

// Type exports
export type DealFormData = z.infer<typeof DealFormSchema>;
export type Deliverable = z.infer<typeof DeliverableSchema>;
export type DosAndDonts = z.infer<typeof DosAndDontsSchema>;

// Validation helper functions
export const validateDealForm = (data: unknown) => {
  return DealFormSchema.safeParse(data);
};

export const validateDeliverable = (data: unknown) => {
  return DeliverableSchema.safeParse(data);
};

// Step validation for progressive validation
const DealFormSchemaObject = DealFormSchema._def.schema; // Get the underlying ZodObject

export const validateDealFormPartial = (data: Partial<DealFormData>) => {
  return DealFormSchemaObject.partial().safeParse(data);
};
