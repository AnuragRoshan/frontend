// utils/campaign.utils.ts

import { Campaign } from "../types/campaign.types";
import { Instagram, Youtube, Twitter, Facebook, Globe } from "lucide-react";

export const formatNumber = (num: number): string => {
  if (num >= 10000000) return (num / 10000000).toFixed(1) + "Cr";
  if (num >= 100000) return (num / 100000).toFixed(1) + "L";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
};

export const getPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "instagram":
      return Instagram;
    case "youtube":
      return Youtube;
    case "twitter":
      return Twitter;
    case "facebook":
      return Facebook;
    case "tiktok":
      return Globe;
    default:
      return Globe;
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "live":
      return "#10b981";
    case "draft":
      return "#f59e0b";
    case "ended":
      return "#6b7280";
    case "paused":
      return "#ef4444";
    default:
      return "#6b7280";
  }
};

export const calculateCampaignStats = (campaigns: Campaign[]) => {
  return {
    totalCampaigns: campaigns.length,
    activeCampaigns: campaigns.filter((c) => c.status === "live").length,
    totalSpent: campaigns.reduce((sum, c) => sum + c.spent, 0),
    totalInfluencers: campaigns.reduce((sum, c) => sum + c.influencers, 0),
  };
};
