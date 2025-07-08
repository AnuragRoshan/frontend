// hooks/useCampaigns.ts
import { useState, useMemo } from "react";
import { Campaign, FilterState, SortConfig } from "../types/campaign.types";
import { calculateCampaignStats } from "../utils/campaign.utils";

// Sample data - in real app this would come from API
const sampleCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Summer Collection Launch",
    status: "live",
    startDate: "2024-05-01",
    endDate: "2024-06-30",
    budget: 500000,
    spent: 320000,
    influencers: 15,
    category: "Fashion",
    platform: "Instagram",
    impressions: 2500000,
    engagement: 4.8,
    conversions: 1250,
    roi: 380,
    description:
      "Launch our new summer collection with fashion influencers across India",
    objectives: ["Brand Awareness", "Product Launch", "Sales"],
    targetAudience: "Women 18-35, Fashion enthusiasts",
    contentType: ["Posts", "Stories", "Reels"],
    hashtags: ["#SummerFashion", "#StyleHub", "#OOTD"],
    createdAt: "2024-04-15",
    updatedAt: "2024-05-20",
  },
  {
    id: "2",
    name: "Wellness Week Campaign",
    status: "live",
    startDate: "2024-05-15",
    endDate: "2024-06-15",
    budget: 300000,
    spent: 180000,
    influencers: 8,
    category: "Health",
    platform: "YouTube",
    impressions: 1800000,
    engagement: 5.2,
    conversions: 890,
    roi: 420,
    description:
      "Promote wellness products through health and fitness influencers",
    objectives: ["Brand Awareness", "Education"],
    targetAudience: "Health-conscious individuals 25-45",
    contentType: ["Videos", "Shorts"],
    hashtags: ["#WellnessWeek", "#HealthyLiving", "#Fitness"],
    createdAt: "2024-05-01",
    updatedAt: "2024-05-18",
  },
  {
    id: "3",
    name: "Tech Innovation Showcase",
    status: "live",
    startDate: "2024-04-20",
    endDate: "2024-07-20",
    budget: 750000,
    spent: 450000,
    influencers: 12,
    category: "Technology",
    platform: "TikTok",
    impressions: 3200000,
    engagement: 6.1,
    conversions: 1680,
    roi: 450,
    description:
      "Showcase our latest tech products with tech reviewers and gadget enthusiasts",
    objectives: ["Product Demo", "Sales", "Brand Awareness"],
    targetAudience: "Tech enthusiasts 20-40",
    contentType: ["Videos", "Live Streams"],
    hashtags: ["#TechInnovation", "#Gadgets", "#TechReview"],
    createdAt: "2024-04-01",
    updatedAt: "2024-05-19",
  },
  {
    id: "4",
    name: "Sustainable Living Series",
    status: "draft",
    startDate: "2024-07-01",
    endDate: "2024-08-31",
    budget: 400000,
    spent: 0,
    influencers: 0,
    category: "Lifestyle",
    platform: "Instagram",
    impressions: 0,
    engagement: 0,
    conversions: 0,
    roi: 0,
    description:
      "Promote sustainable living practices and eco-friendly products",
    objectives: ["Education", "Brand Awareness"],
    targetAudience: "Environmentally conscious consumers",
    contentType: ["Posts", "Stories", "IGTV"],
    hashtags: ["#SustainableLiving", "#EcoFriendly", "#GreenLife"],
    createdAt: "2024-05-10",
    updatedAt: "2024-05-10",
  },
  {
    id: "5",
    name: "Holiday Gift Guide",
    status: "ended",
    startDate: "2024-03-01",
    endDate: "2024-04-30",
    budget: 600000,
    spent: 580000,
    influencers: 20,
    category: "Lifestyle",
    platform: "Instagram",
    impressions: 4100000,
    engagement: 4.5,
    conversions: 2100,
    roi: 520,
    description: "Holiday season gift recommendations and shopping guides",
    objectives: ["Sales", "Brand Awareness"],
    targetAudience: "Gift shoppers, families",
    contentType: ["Posts", "Stories", "Reels"],
    hashtags: ["#HolidayGifts", "#GiftGuide", "#Shopping"],
    createdAt: "2024-02-15",
    updatedAt: "2024-04-30",
  },
  {
    id: "6",
    name: "Gaming Championship Sponsorship",
    status: "live",
    startDate: "2024-06-01",
    endDate: "2024-07-15",
    budget: 850000,
    spent: 120000,
    influencers: 25,
    category: "Gaming",
    platform: "YouTube",
    impressions: 5200000,
    engagement: 7.8,
    conversions: 3200,
    roi: 680,
    description:
      "Sponsor major gaming tournament with top gaming influencers and streamers",
    objectives: ["Brand Awareness", "Community Building", "Sales"],
    targetAudience: "Gamers 16-30, Esports fans",
    contentType: ["Live Streams", "Videos", "Shorts"],
    hashtags: ["#GamingChampionship", "#Esports", "#Gaming"],
    createdAt: "2024-05-15",
    updatedAt: "2024-06-05",
  },
  {
    id: "7",
    name: "Monsoon Beauty Essentials",
    status: "paused",
    startDate: "2024-05-20",
    endDate: "2024-07-30",
    budget: 450000,
    spent: 180000,
    influencers: 18,
    category: "Beauty",
    platform: "Instagram",
    impressions: 1900000,
    engagement: 5.1,
    conversions: 950,
    roi: 280,
    description: "Promote monsoon-specific beauty and skincare products",
    objectives: ["Product Launch", "Sales"],
    targetAudience: "Women 20-40, Beauty enthusiasts",
    contentType: ["Posts", "Stories", "Reels"],
    hashtags: ["#MonsoonBeauty", "#Skincare", "#BeautyTips"],
    createdAt: "2024-05-01",
    updatedAt: "2024-05-25",
  },
  {
    id: "8",
    name: "Fitness Challenge 30 Days",
    status: "ended",
    startDate: "2024-01-01",
    endDate: "2024-02-01",
    budget: 350000,
    spent: 340000,
    influencers: 12,
    category: "Health",
    platform: "TikTok",
    impressions: 2800000,
    engagement: 8.2,
    conversions: 1800,
    roi: 620,
    description:
      "30-day fitness challenge with fitness influencers and trainers",
    objectives: ["Community Building", "Brand Awareness"],
    targetAudience: "Fitness enthusiasts 18-45",
    contentType: ["Videos", "Live Streams"],
    hashtags: ["#FitnessChallenge", "#30DayChallenge", "#Workout"],
    createdAt: "2023-12-15",
    updatedAt: "2024-02-01",
  },
  {
    id: "9",
    name: "Food Festival Collaboration",
    status: "live",
    startDate: "2024-06-10",
    endDate: "2024-07-10",
    budget: 280000,
    spent: 95000,
    influencers: 22,
    category: "Food",
    platform: "Instagram",
    impressions: 1600000,
    engagement: 6.5,
    conversions: 720,
    roi: 340,
    description: "Partner with food bloggers for regional cuisine promotion",
    objectives: ["Brand Awareness", "Local Engagement"],
    targetAudience: "Food lovers, Local communities",
    contentType: ["Posts", "Stories", "Reels"],
    hashtags: ["#FoodFestival", "#Foodie", "#LocalCuisine"],
    createdAt: "2024-05-25",
    updatedAt: "2024-06-12",
  },
  {
    id: "10",
    name: "Back to School Campaign",
    status: "draft",
    startDate: "2024-08-01",
    endDate: "2024-09-15",
    budget: 520000,
    spent: 0,
    influencers: 0,
    category: "Education",
    platform: "YouTube",
    impressions: 0,
    engagement: 0,
    conversions: 0,
    roi: 0,
    description:
      "Educational content and supplies promotion for back-to-school season",
    objectives: ["Product Launch", "Sales", "Education"],
    targetAudience: "Students, Parents, Teachers",
    contentType: ["Videos", "Tutorials"],
    hashtags: ["#BackToSchool", "#Education", "#StudyTips"],
    createdAt: "2024-06-01",
    updatedAt: "2024-06-01",
  },
  {
    id: "11",
    name: "Travel Diaries - Wanderlust",
    status: "live",
    startDate: "2024-05-01",
    endDate: "2024-08-31",
    budget: 680000,
    spent: 380000,
    influencers: 16,
    category: "Travel",
    platform: "Instagram",
    impressions: 3800000,
    engagement: 5.8,
    conversions: 1950,
    roi: 450,
    description:
      "Travel experiences and destination promotion with travel influencers",
    objectives: ["Brand Awareness", "Destination Marketing"],
    targetAudience: "Travel enthusiasts 25-50",
    contentType: ["Posts", "Stories", "IGTV"],
    hashtags: ["#TravelDiaries", "#Wanderlust", "#ExploreIndia"],
    createdAt: "2024-04-10",
    updatedAt: "2024-06-15",
  },
  {
    id: "12",
    name: "Luxury Watches Collection",
    status: "paused",
    startDate: "2024-04-15",
    endDate: "2024-06-15",
    budget: 950000,
    spent: 420000,
    influencers: 8,
    category: "Luxury",
    platform: "YouTube",
    impressions: 2100000,
    engagement: 4.2,
    conversions: 580,
    roi: 320,
    description:
      "Luxury watch collection showcase with lifestyle and fashion influencers",
    objectives: ["Product Launch", "Brand Prestige"],
    targetAudience: "Luxury consumers 30-55",
    contentType: ["Videos", "Reviews"],
    hashtags: ["#LuxuryWatches", "#Timepiece", "#Luxury"],
    createdAt: "2024-03-20",
    updatedAt: "2024-05-10",
  },
  {
    id: "13",
    name: "Pet Care Awareness",
    status: "ended",
    startDate: "2024-02-14",
    endDate: "2024-04-14",
    budget: 320000,
    spent: 310000,
    influencers: 14,
    category: "Pets",
    platform: "TikTok",
    impressions: 2400000,
    engagement: 9.1,
    conversions: 1650,
    roi: 580,
    description:
      "Pet care education and product promotion with pet influencers",
    objectives: ["Education", "Product Awareness"],
    targetAudience: "Pet owners, Animal lovers",
    contentType: ["Videos", "Educational Content"],
    hashtags: ["#PetCare", "#PetLovers", "#AnimalWelfare"],
    createdAt: "2024-01-20",
    updatedAt: "2024-04-14",
  },
  {
    id: "14",
    name: "Cryptocurrency Education Series",
    status: "live",
    startDate: "2024-06-01",
    endDate: "2024-09-01",
    budget: 420000,
    spent: 85000,
    influencers: 10,
    category: "Finance",
    platform: "YouTube",
    impressions: 1200000,
    engagement: 6.8,
    conversions: 450,
    roi: 380,
    description:
      "Educational content about cryptocurrency and blockchain technology",
    objectives: ["Education", "Brand Authority"],
    targetAudience: "Tech-savvy investors 25-45",
    contentType: ["Educational Videos", "Tutorials"],
    hashtags: ["#CryptoEducation", "#Blockchain", "#FinTech"],
    createdAt: "2024-05-15",
    updatedAt: "2024-06-10",
  },
  {
    id: "15",
    name: "Home Decor Makeover",
    status: "draft",
    startDate: "2024-07-15",
    endDate: "2024-09-30",
    budget: 380000,
    spent: 0,
    influencers: 0,
    category: "Home",
    platform: "Instagram",
    impressions: 0,
    engagement: 0,
    conversions: 0,
    roi: 0,
    description: "Home decoration and interior design inspiration campaign",
    objectives: ["Inspiration", "Product Sales"],
    targetAudience: "Homeowners, Interior design enthusiasts",
    contentType: ["Posts", "Before/After", "Tutorials"],
    hashtags: ["#HomeDecor", "#InteriorDesign", "#HomeMakeover"],
    createdAt: "2024-06-20",
    updatedAt: "2024-06-20",
  },
  {
    id: "16",
    name: "Electric Vehicle Awareness",
    status: "live",
    startDate: "2024-05-01",
    endDate: "2024-08-01",
    budget: 720000,
    spent: 290000,
    influencers: 9,
    category: "Automotive",
    platform: "YouTube",
    impressions: 2900000,
    engagement: 5.5,
    conversions: 980,
    roi: 420,
    description:
      "Electric vehicle benefits and features showcase with auto influencers",
    objectives: ["Education", "Brand Awareness"],
    targetAudience: "Car enthusiasts, Eco-conscious consumers",
    contentType: ["Reviews", "Test Drives", "Educational Videos"],
    hashtags: ["#ElectricVehicles", "#EcoFriendly", "#AutoReview"],
    createdAt: "2024-04-05",
    updatedAt: "2024-06-08",
  },
  {
    id: "17",
    name: "Music Festival Partnership",
    status: "ended",
    startDate: "2024-03-15",
    endDate: "2024-04-15",
    budget: 580000,
    spent: 565000,
    influencers: 30,
    category: "Entertainment",
    platform: "TikTok",
    impressions: 6200000,
    engagement: 12.5,
    conversions: 4200,
    roi: 780,
    description:
      "Music festival sponsorship with music and lifestyle influencers",
    objectives: ["Brand Awareness", "Youth Engagement"],
    targetAudience: "Music lovers 16-35",
    contentType: ["Live Coverage", "Behind the Scenes", "Performances"],
    hashtags: ["#MusicFestival", "#LiveMusic", "#Festival"],
    createdAt: "2024-02-20",
    updatedAt: "2024-04-15",
  },
  {
    id: "18",
    name: "Artisan Craft Promotion",
    status: "paused",
    startDate: "2024-05-10",
    endDate: "2024-07-10",
    budget: 250000,
    spent: 95000,
    influencers: 15,
    category: "Arts",
    platform: "Instagram",
    impressions: 980000,
    engagement: 7.2,
    conversions: 420,
    roi: 290,
    description: "Promote local artisan crafts and handmade products",
    objectives: ["Cultural Promotion", "Local Business Support"],
    targetAudience: "Art lovers, Culture enthusiasts",
    contentType: ["Process Videos", "Artist Stories", "Product Showcases"],
    hashtags: ["#ArtisanCraft", "#Handmade", "#LocalArt"],
    createdAt: "2024-04-25",
    updatedAt: "2024-05-30",
  },
  {
    id: "19",
    name: "Parenting Tips & Products",
    status: "live",
    startDate: "2024-06-01",
    endDate: "2024-08-15",
    budget: 440000,
    spent: 110000,
    influencers: 13,
    category: "Parenting",
    platform: "YouTube",
    impressions: 1750000,
    engagement: 6.9,
    conversions: 780,
    roi: 410,
    description: "Parenting advice and baby/child product recommendations",
    objectives: ["Education", "Product Awareness"],
    targetAudience: "Parents, Expecting parents",
    contentType: ["Educational Videos", "Product Reviews", "Tips"],
    hashtags: ["#ParentingTips", "#BabyProducts", "#ChildCare"],
    createdAt: "2024-05-10",
    updatedAt: "2024-06-12",
  },
  {
    id: "20",
    name: "Winter Sports Adventure",
    status: "draft",
    startDate: "2024-11-01",
    endDate: "2024-12-31",
    budget: 650000,
    spent: 0,
    influencers: 0,
    category: "Sports",
    platform: "Instagram",
    impressions: 0,
    engagement: 0,
    conversions: 0,
    roi: 0,
    description: "Winter sports equipment and destination promotion",
    objectives: ["Seasonal Promotion", "Adventure Marketing"],
    targetAudience: "Adventure enthusiasts, Winter sports lovers",
    contentType: ["Action Videos", "Equipment Reviews", "Destination Content"],
    hashtags: ["#WinterSports", "#Adventure", "#SnowSports"],
    createdAt: "2024-06-15",
    updatedAt: "2024-06-15",
  },
];

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(sampleCampaigns);
  const [filters, setFilters] = useState<FilterState>({
    status: "all",
    dateRange: { start: "", end: "" },
    budgetRange: { min: 0, max: 1000000 },
    influencerCount: { min: 0, max: 50 },
    search: "",
    platform: "all",
    category: "all",
  });
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const filteredCampaigns = useMemo(() => {
    const filtered = campaigns.filter((campaign) => {
      const matchesStatus =
        filters.status === "all" || campaign.status === filters.status;
      const matchesSearch =
        campaign.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        campaign.category.toLowerCase().includes(filters.search.toLowerCase());
      const matchesPlatform =
        filters.platform === "all" || campaign.platform === filters.platform;
      const matchesCategory =
        filters.category === "all" || campaign.category === filters.category;
      const matchesBudget =
        campaign.budget >= filters.budgetRange.min &&
        campaign.budget <= filters.budgetRange.max;
      const matchesInfluencers =
        campaign.influencers >= filters.influencerCount.min &&
        campaign.influencers <= filters.influencerCount.max;

      return (
        matchesStatus &&
        matchesSearch &&
        matchesPlatform &&
        matchesCategory &&
        matchesBudget &&
        matchesInfluencers
      );
    });

    if (sortConfig) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [campaigns, filters, sortConfig]);

  const stats = useMemo(() => calculateCampaignStats(campaigns), [campaigns]);

  const handleSort = (key: keyof Campaign) => {
    setSortConfig((current) => ({
      key,
      direction:
        current?.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Add campaign function
  const addCampaign = (newCampaign: Campaign) => {
    setCampaigns((prev) => [newCampaign, ...prev]); // Add to the beginning of the array
  };

  // Update campaign function
  const updateCampaign = (campaignId: string, updates: Partial<Campaign>) => {
    setCampaigns((prev) =>
      prev.map((campaign) =>
        campaign.id === campaignId
          ? { ...campaign, ...updates, updatedAt: new Date().toISOString() }
          : campaign
      )
    );
  };

  // Delete campaign function
  const deleteCampaign = (campaignId: string) => {
    setCampaigns((prev) =>
      prev.filter((campaign) => campaign.id !== campaignId)
    );
  };

  // Duplicate campaign function
  const duplicateCampaign = (campaignId: string) => {
    const campaignToDuplicate = campaigns.find((c) => c.id === campaignId);
    if (campaignToDuplicate) {
      const duplicatedCampaign: Campaign = {
        ...campaignToDuplicate,
        id: `campaign_${Date.now()}_copy`,
        name: `${campaignToDuplicate.name} (Copy)`,
        status: "draft",
        spent: 0,
        influencers: 0,
        impressions: 0,
        engagement: 0,
        conversions: 0,
        roi: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      addCampaign(duplicatedCampaign);
    }
  };

  return {
    campaigns,
    filteredCampaigns,
    filters,
    setFilters,
    sortConfig,
    handleSort,
    stats,
    addCampaign,
    updateCampaign,
    deleteCampaign,
    duplicateCampaign,
  };
};

// hooks/usePagination.ts (unchanged)
export const usePagination = <T>(items: T[], itemsPerPage: number = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Reset to page 1 when items change
  const resetPagination = () => setCurrentPage(1);

  return {
    currentPage,
    totalPages,
    paginatedItems,
    handlePageChange,
    resetPagination,
  };
};

// hooks/useSelection.ts (unchanged)
export const useSelection = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelectItem = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = (allItemIds: string[]) => {
    setSelectedItems(
      selectedItems.length === allItemIds.length ? [] : allItemIds
    );
  };

  const clearSelection = () => setSelectedItems([]);

  return {
    selectedItems,
    handleSelectItem,
    handleSelectAll,
    clearSelection,
  };
};
