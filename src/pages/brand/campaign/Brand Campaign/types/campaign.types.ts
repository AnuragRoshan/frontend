// types/campaign.types.ts

export interface Campaign {
  id: string;
  name: string;
  status: "draft" | "live" | "ended" | "paused";
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  influencers: number;
  category: string;
  platform: string;
  impressions: number;
  engagement: number;
  conversions: number;
  roi: number;
  description: string;
  objectives: string[];
  targetAudience: string;
  contentType: string[];
  hashtags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface FilterState {
  status: string;
  dateRange: { start: string; end: string };
  budgetRange: { min: number; max: number };
  influencerCount: { min: number; max: number };
  search: string;
  platform: string;
  category: string;
}

export interface SortConfig {
  key: keyof Campaign;
  direction: "asc" | "desc";
}

export type ViewMode = "table" | "grid";

export interface CampaignStats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalSpent: number;
  totalInfluencers: number;
}
