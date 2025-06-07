"use client";

import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { sharedTheme } from "../../../styles/theme/theme";
import {
  Plus,
  Search,
  Filter,
  Calendar,
  DollarSign,
  Users,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  //   ChevronDown,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Play,
  Pause,
  Copy,
  Download,
  ExternalLink,
  Target,
  TrendingUp,
  //   BarChart3,
  Clock,
  //   CheckCircle,
  AlertCircle,
  X,
  Briefcase,
  //   MapPin,
  //   Hash,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  Globe,
  //   Zap,
  //   Award,
  //   Star,
  Heart,
  //   MessageSquare,
  //   ThumbsUp,
  //   Bookmark,
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   RefreshCw,
} from "lucide-react";

// Types
interface Campaign {
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

interface FilterState {
  status: string;
  dateRange: { start: string; end: string };
  budgetRange: { min: number; max: number };
  influencerCount: { min: number; max: number };
  search: string;
  platform: string;
  category: string;
}

// Sample data
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
];

// Reusable Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer size={size} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>
        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

// Drawer Component (provided by user)
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg";
  anchor?: "left" | "right";
  children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  size = "md",
  anchor = "right",
  children,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <DrawerOverlay onClick={onClose} />
      <DrawerContainer size={size} anchor={anchor}>
        <DrawerCloseButton onClick={onClose} anchor={anchor}>
          <X size={20} />
        </DrawerCloseButton>
        <DrawerContent>{children}</DrawerContent>
      </DrawerContainer>
    </>
  );
};

// Main Component
const CampaignsPage: React.FC = () => {
  const [campaigns] = useState<Campaign[]>(sampleCampaigns);
  const [filters, setFilters] = useState<FilterState>({
    status: "all",
    dateRange: { start: "", end: "" },
    budgetRange: { min: 0, max: 1000000 },
    influencerCount: { min: 0, max: 50 },
    search: "",
    platform: "all",
    category: "all",
  });
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Campaign;
    direction: "asc" | "desc";
  } | null>(null);
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid");

  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );

  // Drawer states
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false);

  // Helper functions
  const formatNumber = (num: number): string => {
    if (num >= 10000000) return (num / 10000000).toFixed(1) + "Cr";
    if (num >= 100000) return (num / 100000).toFixed(1) + "L";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  //   const getStatusColor = (status: string) => {
  //     switch (status) {
  //       case "live":
  //         return "#10b981";
  //       case "draft":
  //         return "#f59e0b";
  //       case "ended":
  //         return "#6b7280";
  //       case "paused":
  //         return "#ef4444";
  //       default:
  //         return "#6b7280";
  //     }
  //   };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <Instagram size={16} />;
      case "youtube":
        return <Youtube size={16} />;
      case "twitter":
        return <Twitter size={16} />;
      case "facebook":
        return <Facebook size={16} />;
      case "tiktok":
        return <Globe size={16} />;
      default:
        return <Globe size={16} />;
    }
  };

  // Filtered and sorted campaigns
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

  // Pagination
  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const paginatedCampaigns = filteredCampaigns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key: keyof Campaign) => {
    setSortConfig((current) => ({
      key,
      direction:
        current?.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSelectCampaign = (campaignId: string) => {
    setSelectedCampaigns((prev) =>
      prev.includes(campaignId)
        ? prev.filter((id) => id !== campaignId)
        : [...prev, campaignId]
    );
  };

  const handleSelectAll = () => {
    setSelectedCampaigns(
      selectedCampaigns.length === paginatedCampaigns.length
        ? []
        : paginatedCampaigns.map((c) => c.id)
    );
  };

  const handleDeleteCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setShowDeleteModal(true);
  };

  const handleEndCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setShowEndModal(true);
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setShowEditDrawer(true);
  };

  const handleViewDetails = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setShowDetailsDrawer(true);
  };

  return (
    <PageContainer>
      {/* Header */}
      <PageHeader>
        <HeaderLeft>
          <PageTitle>Campaign Management</PageTitle>
          <PageDescription>
            Manage and track all your influencer marketing campaigns
          </PageDescription>
        </HeaderLeft>
        <HeaderRight>
          <HeaderActions>
            <ActionButton onClick={() => setShowFilters(!showFilters)}>
              <Filter size={16} />
              Filters
            </ActionButton>
            <ActionButton>
              <Download size={16} />
              Export
            </ActionButton>

            <PrimaryButton>
              <Plus size={16} />
              Create Campaign
            </PrimaryButton>
          </HeaderActions>
        </HeaderRight>
      </PageHeader>

      {/* Stats Cards */}
      <StatsGrid>
        <StatCard>
          <StatIcon>
            <Briefcase size={20} />
          </StatIcon>
          <StatContent>
            <StatValue>{campaigns.length}</StatValue>
            <StatLabel>Total Campaigns</StatLabel>
          </StatContent>
        </StatCard>
        <StatCard>
          <StatIcon>
            <Play size={20} />
          </StatIcon>
          <StatContent>
            <StatValue>
              {campaigns.filter((c) => c.status === "live").length}
            </StatValue>
            <StatLabel>Active Campaigns</StatLabel>
          </StatContent>
        </StatCard>
        <StatCard>
          <StatIcon>
            <DollarSign size={20} />
          </StatIcon>
          <StatContent>
            <StatValue>
              ₹{formatNumber(campaigns.reduce((sum, c) => sum + c.spent, 0))}
            </StatValue>
            <StatLabel>Total Spent</StatLabel>
          </StatContent>
        </StatCard>
        <StatCard>
          <StatIcon>
            <Users size={20} />
          </StatIcon>
          <StatContent>
            <StatValue>
              {campaigns.reduce((sum, c) => sum + c.influencers, 0)}
            </StatValue>
            <StatLabel>Total Influencers</StatLabel>
          </StatContent>
        </StatCard>
      </StatsGrid>

      {/* Filters */}
      {showFilters && (
        <FiltersContainer>
          <FiltersGrid>
            <FilterGroup>
              <FilterLabel>Search</FilterLabel>
              <SearchInput>
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, search: e.target.value }))
                  }
                />
              </SearchInput>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Status</FilterLabel>
              <FilterSelect
                value={filters.status}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, status: e.target.value }))
                }
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="live">Live</option>
                <option value="ended">Ended</option>
                <option value="paused">Paused</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Platform</FilterLabel>
              <FilterSelect
                value={filters.platform}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, platform: e.target.value }))
                }
              >
                <option value="all">All Platforms</option>
                <option value="Instagram">Instagram</option>
                <option value="YouTube">YouTube</option>
                <option value="TikTok">TikTok</option>
                <option value="Twitter">Twitter</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Category</FilterLabel>
              <FilterSelect
                value={filters.category}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, category: e.target.value }))
                }
              >
                <option value="all">All Categories</option>
                <option value="Fashion">Fashion</option>
                <option value="Technology">Technology</option>
                <option value="Health">Health</option>
                <option value="Lifestyle">Lifestyle</option>
              </FilterSelect>
            </FilterGroup>
          </FiltersGrid>
        </FiltersContainer>
      )}

      {/* Quick Filters */}
      <QuickFilters>
        <QuickFilterPill
          active={filters.status === "all"}
          onClick={() => setFilters((prev) => ({ ...prev, status: "all" }))}
        >
          All Campaigns ({campaigns.length})
        </QuickFilterPill>
        <QuickFilterPill
          active={filters.status === "live"}
          onClick={() => setFilters((prev) => ({ ...prev, status: "live" }))}
        >
          Live ({campaigns.filter((c) => c.status === "live").length})
        </QuickFilterPill>
        <QuickFilterPill
          active={filters.status === "draft"}
          onClick={() => setFilters((prev) => ({ ...prev, status: "draft" }))}
        >
          Draft ({campaigns.filter((c) => c.status === "draft").length})
        </QuickFilterPill>
        <QuickFilterPill
          active={filters.status === "ended"}
          onClick={() => setFilters((prev) => ({ ...prev, status: "ended" }))}
        >
          Ended ({campaigns.filter((c) => c.status === "ended").length})
        </QuickFilterPill>
      </QuickFilters>

      {/* Table Controls */}
      <TableControls>
        <TableControlsLeft>
          <ViewToggle>
            <ViewButton
              active={viewMode === "table"}
              onClick={() => setViewMode("table")}
            >
              Table
            </ViewButton>
            <ViewButton
              active={viewMode === "grid"}
              onClick={() => setViewMode("grid")}
            >
              Grid
            </ViewButton>
          </ViewToggle>
          {selectedCampaigns.length > 0 && (
            <BulkActions>
              <span>{selectedCampaigns.length} selected</span>
              <ActionButton small>
                <Copy size={14} />
                Duplicate
              </ActionButton>
              <ActionButton small>
                <Trash2 size={14} />
                Delete
              </ActionButton>
            </BulkActions>
          )}
        </TableControlsLeft>
        <TableControlsRight>
          <ResultsInfo>
            Showing {paginatedCampaigns.length} of {filteredCampaigns.length}{" "}
            campaigns
          </ResultsInfo>
        </TableControlsRight>
      </TableControls>

      {/* Empty State */}
      {filteredCampaigns.length === 0 && (
        <EmptyState>
          <EmptyStateIcon>
            <Briefcase size={48} />
          </EmptyStateIcon>
          <EmptyStateTitle>No campaigns found</EmptyStateTitle>
          <EmptyStateDescription>
            {campaigns.length === 0
              ? "Create your first campaign to get started with influencer marketing"
              : "Try adjusting your filters to find the campaigns you're looking for"}
          </EmptyStateDescription>
          <PrimaryButton>
            <Plus size={16} />
            Create Your First Campaign
          </PrimaryButton>
        </EmptyState>
      )}

      {/* Table View */}
      {viewMode === "table" && filteredCampaigns.length > 0 && (
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>
                  <Checkbox
                    checked={
                      selectedCampaigns.length === paginatedCampaigns.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableHeaderCell>
                <TableHeaderCell onClick={() => handleSort("name")}>
                  <SortableHeader>
                    Campaign Name
                    <SortIcon>
                      {sortConfig?.key === "name" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUp size={14} />
                        ) : (
                          <ArrowDown size={14} />
                        )
                      ) : (
                        <ArrowUpDown size={14} />
                      )}
                    </SortIcon>
                  </SortableHeader>
                </TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell onClick={() => handleSort("startDate")}>
                  <SortableHeader>
                    Start Date
                    <SortIcon>
                      {sortConfig?.key === "startDate" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUp size={14} />
                        ) : (
                          <ArrowDown size={14} />
                        )
                      ) : (
                        <ArrowUpDown size={14} />
                      )}
                    </SortIcon>
                  </SortableHeader>
                </TableHeaderCell>
                <TableHeaderCell onClick={() => handleSort("endDate")}>
                  <SortableHeader>
                    End Date
                    <SortIcon>
                      {sortConfig?.key === "endDate" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUp size={14} />
                        ) : (
                          <ArrowDown size={14} />
                        )
                      ) : (
                        <ArrowUpDown size={14} />
                      )}
                    </SortIcon>
                  </SortableHeader>
                </TableHeaderCell>
                <TableHeaderCell onClick={() => handleSort("budget")}>
                  <SortableHeader>
                    Budget
                    <SortIcon>
                      {sortConfig?.key === "budget" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUp size={14} />
                        ) : (
                          <ArrowDown size={14} />
                        )
                      ) : (
                        <ArrowUpDown size={14} />
                      )}
                    </SortIcon>
                  </SortableHeader>
                </TableHeaderCell>
                <TableHeaderCell onClick={() => handleSort("influencers")}>
                  <SortableHeader>
                    Influencers
                    <SortIcon>
                      {sortConfig?.key === "influencers" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUp size={14} />
                        ) : (
                          <ArrowDown size={14} />
                        )
                      ) : (
                        <ArrowUpDown size={14} />
                      )}
                    </SortIcon>
                  </SortableHeader>
                </TableHeaderCell>
                <TableHeaderCell onClick={() => handleSort("spent")}>
                  <SortableHeader>
                    Spent
                    <SortIcon>
                      {sortConfig?.key === "spent" ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUp size={14} />
                        ) : (
                          <ArrowDown size={14} />
                        )
                      ) : (
                        <ArrowUpDown size={14} />
                      )}
                    </SortIcon>
                  </SortableHeader>
                </TableHeaderCell>
                <TableHeaderCell>Performance</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedCampaigns.includes(campaign.id)}
                      onChange={() => handleSelectCampaign(campaign.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <CampaignInfo>
                      <CampaignName onClick={() => handleViewDetails(campaign)}>
                        {campaign.name}
                      </CampaignName>
                      <CampaignMeta>
                        <PlatformBadge>
                          {getPlatformIcon(campaign.platform)}
                          {campaign.platform}
                        </PlatformBadge>
                        <CategoryBadge>{campaign.category}</CategoryBadge>
                      </CampaignMeta>
                    </CampaignInfo>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={campaign.status}>
                      {campaign.status}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    {new Date(campaign.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(campaign.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>₹{formatNumber(campaign.budget)}</TableCell>
                  <TableCell>{campaign.influencers}</TableCell>
                  <TableCell>
                    <SpentInfo>
                      <SpentAmount>₹{formatNumber(campaign.spent)}</SpentAmount>
                      <SpentPercentage>
                        {((campaign.spent / campaign.budget) * 100).toFixed(0)}%
                      </SpentPercentage>
                    </SpentInfo>
                  </TableCell>
                  <TableCell>
                    <PerformanceInfo>
                      <PerformanceMetric>
                        {formatNumber(campaign.impressions)} impressions
                      </PerformanceMetric>
                      <PerformanceMetric>
                        {campaign.engagement}% engagement
                      </PerformanceMetric>
                    </PerformanceInfo>
                  </TableCell>
                  <TableCell>
                    <ActionButtons>
                      <ActionButton
                        small
                        onClick={() => handleViewDetails(campaign)}
                      >
                        <Eye size={14} />
                      </ActionButton>
                      {(campaign.status === "draft" ||
                        campaign.status === "live") && (
                        <ActionButton
                          small
                          onClick={() => handleEditCampaign(campaign)}
                        >
                          <Edit size={14} />
                        </ActionButton>
                      )}
                      {campaign.status === "live" && (
                        <ActionButton
                          small
                          onClick={() => handleEndCampaign(campaign)}
                        >
                          <Pause size={14} />
                        </ActionButton>
                      )}
                      <DropdownMenu>
                        <DropdownTrigger>
                          <ActionButton small>
                            <MoreHorizontal size={14} />
                          </ActionButton>
                        </DropdownTrigger>
                        <DropdownContent>
                          <DropdownItem
                            onClick={() => handleViewDetails(campaign)}
                          >
                            <Eye size={14} />
                            View Details
                          </DropdownItem>
                          <DropdownItem>
                            <Copy size={14} />
                            Duplicate
                          </DropdownItem>
                          <DropdownItem>
                            <ExternalLink size={14} />
                            Share Link
                          </DropdownItem>
                          <DropdownDivider />
                          <DropdownItem
                            danger
                            onClick={() => handleDeleteCampaign(campaign)}
                          >
                            <Trash2 size={14} />
                            Delete
                          </DropdownItem>
                        </DropdownContent>
                      </DropdownMenu>
                    </ActionButtons>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Grid View */}
      {viewMode === "grid" && filteredCampaigns.length > 0 && (
        <GridContainer>
          {paginatedCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id}>
              <CampaignCardHeader>
                <CampaignCardInfo>
                  <CampaignCardName onClick={() => handleViewDetails(campaign)}>
                    {campaign.name}
                  </CampaignCardName>
                  <CampaignCardMeta>
                    <StatusBadge status={campaign.status}>
                      {campaign.status}
                    </StatusBadge>
                    <PlatformBadge>
                      {getPlatformIcon(campaign.platform)}
                      {campaign.platform}
                    </PlatformBadge>
                  </CampaignCardMeta>
                </CampaignCardInfo>
                <CampaignCardActions>
                  <ActionButton
                    small
                    onClick={() => handleViewDetails(campaign)}
                  >
                    <Eye size={14} />
                  </ActionButton>
                  <ActionButton small>
                    <MoreHorizontal size={14} />
                  </ActionButton>
                </CampaignCardActions>
              </CampaignCardHeader>

              <CampaignCardContent>
                <CampaignCardDescription>
                  {campaign.description}
                </CampaignCardDescription>

                <CampaignCardMetrics>
                  <MetricItem>
                    <MetricLabel>Budget</MetricLabel>
                    <MetricValue>₹{formatNumber(campaign.budget)}</MetricValue>
                  </MetricItem>
                  <MetricItem>
                    <MetricLabel>Spent</MetricLabel>
                    <MetricValue>₹{formatNumber(campaign.spent)}</MetricValue>
                  </MetricItem>
                  <MetricItem>
                    <MetricLabel>Influencers</MetricLabel>
                    <MetricValue>{campaign.influencers}</MetricValue>
                  </MetricItem>
                  <MetricItem>
                    <MetricLabel>ROI</MetricLabel>
                    <MetricValue>{campaign.roi}%</MetricValue>
                  </MetricItem>
                </CampaignCardMetrics>

                <ProgressBar>
                  <ProgressFill
                    width={(campaign.spent / campaign.budget) * 100}
                  />
                </ProgressBar>
                <ProgressLabel>
                  {((campaign.spent / campaign.budget) * 100).toFixed(0)}% of
                  budget used
                </ProgressLabel>
              </CampaignCardContent>

              <CampaignCardFooter>
                <CampaignCardDate>
                  <Calendar size={14} />
                  {new Date(campaign.startDate).toLocaleDateString()} -{" "}
                  {new Date(campaign.endDate).toLocaleDateString()}
                </CampaignCardDate>
                <CampaignCardActions>
                  <ActionButton
                    small
                    primary
                    onClick={() => handleViewDetails(campaign)}
                  >
                    View Details
                  </ActionButton>
                </CampaignCardActions>
              </CampaignCardFooter>
            </CampaignCard>
          ))}
        </GridContainer>
      )}

      {/* Pagination */}
      {filteredCampaigns.length > itemsPerPage && (
        <PaginationContainer>
          <PaginationInfo>
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredCampaigns.length)} of{" "}
            {filteredCampaigns.length} campaigns
          </PaginationInfo>
          <PaginationControls>
            <PaginationButton
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            >
              Previous
            </PaginationButton>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationButton
                key={page}
                active={page === currentPage}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </PaginationButton>
            ))}
            <PaginationButton
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
            >
              Next
            </PaginationButton>
          </PaginationControls>
        </PaginationContainer>
      )}

      {/* Modals */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Campaign"
        size="sm"
      >
        <ModalBody>
          <AlertIcon>
            <AlertCircle size={48} color="#ef4444" />
          </AlertIcon>
          <ModalText>
            Are you sure you want to delete "{selectedCampaign?.name}"? This
            action cannot be undone.
          </ModalText>
          <ModalActions>
            <ActionButton onClick={() => setShowDeleteModal(false)}>
              Cancel
            </ActionButton>
            <DangerButton onClick={() => setShowDeleteModal(false)}>
              Delete Campaign
            </DangerButton>
          </ModalActions>
        </ModalBody>
      </Modal>

      <Modal
        isOpen={showEndModal}
        onClose={() => setShowEndModal(false)}
        title="End Campaign"
        size="sm"
      >
        <ModalBody>
          <AlertIcon>
            <Clock size={48} color="#f59e0b" />
          </AlertIcon>
          <ModalText>
            Are you sure you want to end "{selectedCampaign?.name}"? This will
            stop all active collaborations.
          </ModalText>
          <ModalActions>
            <ActionButton onClick={() => setShowEndModal(false)}>
              Cancel
            </ActionButton>
            <PrimaryButton onClick={() => setShowEndModal(false)}>
              End Campaign
            </PrimaryButton>
          </ModalActions>
        </ModalBody>
      </Modal>

      {/* Drawers */}
      <Drawer
        isOpen={showEditDrawer}
        onClose={() => setShowEditDrawer(false)}
        size="lg"
        anchor="right"
      >
        <DrawerHeader>
          <DrawerTitle>Edit Campaign</DrawerTitle>
          <DrawerSubtitle>{selectedCampaign?.name}</DrawerSubtitle>
        </DrawerHeader>
        <DrawerBody>
          <FormGroup>
            <FormLabel>Campaign Name</FormLabel>
            <FormInput defaultValue={selectedCampaign?.name} />
          </FormGroup>
          <FormGroup>
            <FormLabel>Description</FormLabel>
            <FormTextarea defaultValue={selectedCampaign?.description} />
          </FormGroup>
          <FormGroup>
            <FormLabel>Budget</FormLabel>
            <FormInput type="number" defaultValue={selectedCampaign?.budget} />
          </FormGroup>
          <FormActions>
            <ActionButton onClick={() => setShowEditDrawer(false)}>
              Cancel
            </ActionButton>
            <PrimaryButton onClick={() => setShowEditDrawer(false)}>
              Save Changes
            </PrimaryButton>
          </FormActions>
        </DrawerBody>
      </Drawer>

      <Drawer
        isOpen={showDetailsDrawer}
        onClose={() => setShowDetailsDrawer(false)}
        size="lg"
        anchor="right"
      >
        {selectedCampaign && (
          <>
            <DrawerHeader>
              <DrawerTitle>{selectedCampaign.name}</DrawerTitle>
              <DrawerSubtitle>
                <StatusBadge status={selectedCampaign.status}>
                  {selectedCampaign.status}
                </StatusBadge>
                <PlatformBadge>
                  {getPlatformIcon(selectedCampaign.platform)}
                  {selectedCampaign.platform}
                </PlatformBadge>
              </DrawerSubtitle>
            </DrawerHeader>
            <DrawerBody>
              <DetailSection>
                <DetailSectionTitle>Campaign Overview</DetailSectionTitle>
                <DetailGrid>
                  <DetailItem>
                    <DetailLabel>Description</DetailLabel>
                    <DetailValue>{selectedCampaign.description}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Category</DetailLabel>
                    <DetailValue>{selectedCampaign.category}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Target Audience</DetailLabel>
                    <DetailValue>{selectedCampaign.targetAudience}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Objectives</DetailLabel>
                    <DetailValue>
                      <TagList>
                        {selectedCampaign.objectives.map((obj) => (
                          <Tag key={obj}>{obj}</Tag>
                        ))}
                      </TagList>
                    </DetailValue>
                  </DetailItem>
                </DetailGrid>
              </DetailSection>

              <DetailSection>
                <DetailSectionTitle>Budget & Performance</DetailSectionTitle>
                <MetricsGrid>
                  <MetricCard>
                    <MetricIcon>
                      <DollarSign size={20} />
                    </MetricIcon>
                    <MetricContent>
                      <MetricValue>
                        ₹{formatNumber(selectedCampaign.budget)}
                      </MetricValue>
                      <MetricLabel>Total Budget</MetricLabel>
                    </MetricContent>
                  </MetricCard>
                  <MetricCard>
                    <MetricIcon>
                      <TrendingUp size={20} />
                    </MetricIcon>
                    <MetricContent>
                      <MetricValue>
                        ₹{formatNumber(selectedCampaign.spent)}
                      </MetricValue>
                      <MetricLabel>Amount Spent</MetricLabel>
                    </MetricContent>
                  </MetricCard>
                  <MetricCard>
                    <MetricIcon>
                      <Users size={20} />
                    </MetricIcon>
                    <MetricContent>
                      <MetricValue>{selectedCampaign.influencers}</MetricValue>
                      <MetricLabel>Influencers</MetricLabel>
                    </MetricContent>
                  </MetricCard>
                  <MetricCard>
                    <MetricIcon>
                      <Target size={20} />
                    </MetricIcon>
                    <MetricContent>
                      <MetricValue>{selectedCampaign.roi}%</MetricValue>
                      <MetricLabel>ROI</MetricLabel>
                    </MetricContent>
                  </MetricCard>
                </MetricsGrid>
              </DetailSection>

              <DetailSection>
                <DetailSectionTitle>Campaign Details</DetailSectionTitle>
                <DetailGrid>
                  <DetailItem>
                    <DetailLabel>Start Date</DetailLabel>
                    <DetailValue>
                      {new Date(
                        selectedCampaign.startDate
                      ).toLocaleDateString()}
                    </DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>End Date</DetailLabel>
                    <DetailValue>
                      {new Date(selectedCampaign.endDate).toLocaleDateString()}
                    </DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Content Types</DetailLabel>
                    <DetailValue>
                      <TagList>
                        {selectedCampaign.contentType.map((type) => (
                          <Tag key={type}>{type}</Tag>
                        ))}
                      </TagList>
                    </DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Hashtags</DetailLabel>
                    <DetailValue>
                      <TagList>
                        {selectedCampaign.hashtags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </TagList>
                    </DetailValue>
                  </DetailItem>
                </DetailGrid>
              </DetailSection>

              <DetailSection>
                <DetailSectionTitle>Performance Metrics</DetailSectionTitle>
                <PerformanceGrid>
                  <PerformanceCard>
                    <PerformanceIcon>
                      <Eye size={24} />
                    </PerformanceIcon>
                    <PerformanceContent>
                      <PerformanceValue>
                        {formatNumber(selectedCampaign.impressions)}
                      </PerformanceValue>
                      <PerformanceLabel>Impressions</PerformanceLabel>
                    </PerformanceContent>
                  </PerformanceCard>
                  <PerformanceCard>
                    <PerformanceIcon>
                      <Heart size={24} />
                    </PerformanceIcon>
                    <PerformanceContent>
                      <PerformanceValue>
                        {selectedCampaign.engagement}%
                      </PerformanceValue>
                      <PerformanceLabel>Engagement Rate</PerformanceLabel>
                    </PerformanceContent>
                  </PerformanceCard>
                  <PerformanceCard>
                    <PerformanceIcon>
                      <Target size={24} />
                    </PerformanceIcon>
                    <PerformanceContent>
                      <PerformanceValue>
                        {formatNumber(selectedCampaign.conversions)}
                      </PerformanceValue>
                      <PerformanceLabel>Conversions</PerformanceLabel>
                    </PerformanceContent>
                  </PerformanceCard>
                </PerformanceGrid>
              </DetailSection>
            </DrawerBody>
          </>
        )}
      </Drawer>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9fafb;
  color: ${sharedTheme.colorVariants.secondary.dark};
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PageTitle = styled.h1`
  font-size: ${sharedTheme.typography.fontSizes.xxxl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  margin: 0;
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const PageDescription = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin: 0;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    width: 100%;
  }
`;

interface ActionButtonProps {
  small?: boolean;
  primary?: boolean;
}

const ActionButton = styled.button<ActionButtonProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: ${(props) => (props.small ? "0.375rem 0.75rem" : "0.5rem 1rem")};
  background-color: ${(props) =>
    props.primary ? sharedTheme.colorVariants.primary.dark : "#f9fafb"};
  border: 1px solid
    ${(props) =>
      props.primary ? sharedTheme.colorVariants.primary.dark : "#e5e7eb"};
  border-radius: 8px;
  font-size: ${(props) =>
    props.small
      ? sharedTheme.typography.fontSizes.xs
      : sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${(props) =>
    props.primary ? "white" : sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.primary ? sharedTheme.colorVariants.primary.light : "#f3f4f6"};
    transform: translateY(-1px);
  }
`;

const PrimaryButton = styled(ActionButton)`
  background-color: ${sharedTheme.colorVariants.primary.dark};
  border-color: ${sharedTheme.colorVariants.primary.dark};
  color: white;

  &:hover {
    background-color: ${sharedTheme.colorVariants.primary.light};
  }
`;

const DangerButton = styled(ActionButton)`
  background-color: #ef4444;
  border-color: #ef4444;
  color: white;

  &:hover {
    background-color: #dc2626;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const StatIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${sharedTheme.colorVariants.primary.dark}20;
  color: ${sharedTheme.colorVariants.primary.dark};
`;

const StatContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const StatValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xxl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const StatLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const FiltersContainer = styled.div`
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;

  input {
    border: none;
    background: transparent;
    outline: none;
    font-size: ${sharedTheme.typography.fontSizes.sm};
    color: ${sharedTheme.colorVariants.secondary.dark};
    width: 100%;

    &::placeholder {
      color: ${sharedTheme.colorVariants.secondary.light};
    }
  }
`;

const FilterSelect = styled.select`
  padding: 0.75rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${sharedTheme.colorVariants.primary.dark};
  }
`;

const QuickFilters = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
`;

interface QuickFilterPillProps {
  active: boolean;
}

const QuickFilterPill = styled.button<QuickFilterPillProps>`
  padding: 0.5rem 1rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  background-color: ${(props) =>
    props.active ? sharedTheme.colorVariants.primary.dark : "white"};
  border: 1px solid
    ${(props) =>
      props.active ? sharedTheme.colorVariants.primary.dark : "#e5e7eb"};
  border-radius: 8px;
  color: ${(props) =>
    props.active ? "white" : sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.active ? sharedTheme.colorVariants.primary.light : "#f9fafb"};
  }
`;

const TableControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const TableControlsLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const TableControlsRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ViewToggle = styled.div`
  display: flex;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
`;

interface ViewButtonProps {
  active: boolean;
}

const ViewButton = styled.button<ViewButtonProps>`
  padding: 0.5rem 1rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  background-color: ${(props) =>
    props.active ? sharedTheme.colorVariants.primary.dark : "transparent"};
  border: none;
  color: ${(props) =>
    props.active ? "white" : sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.active ? sharedTheme.colorVariants.primary.light : "#f9fafb"};
  }
`;

const BulkActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  background-color: ${sharedTheme.colorVariants.primary.dark}10;
  border: 1px solid ${sharedTheme.colorVariants.primary.dark}30;
  border-radius: 8px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.primary.dark};
`;

const ResultsInfo = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  margin: 2rem 0;
`;

const EmptyStateIcon = styled.div`
  margin-bottom: 1rem;
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const EmptyStateTitle = styled.h3`
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  margin: 0 0 0.5rem 0;
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const EmptyStateDescription = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.md};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin: 0 0 2rem 0;
  max-width: 400px;
`;

const TableContainer = styled.div`
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: #f9fafb;
`;

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #f3f4f6;
  }

  &:hover {
    background-color: #f9fafb;
  }
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  text-align: left;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  vertical-align: top;
`;

const TableBody = styled.tbody``;

const SortableHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SortIcon = styled.div`
  display: flex;
  align-items: center;
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const CampaignInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CampaignName = styled.button`
  background: none;
  border: none;
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.primary.dark};
  cursor: pointer;
  text-align: left;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const CampaignMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = styled.div<StatusBadgeProps>`
  padding: 0.25rem 0.75rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: white;
  border-radius: 6px;
  background-color: ${(props) => getStatusColor(props.status)};
  text-transform: capitalize;
`;

const PlatformBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background-color: #f9fafb;
`;

const CategoryBadge = styled.div`
  padding: 0.25rem 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.light};
  background-color: #f3f4f6;
  border-radius: 4px;
`;

const SpentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const SpentAmount = styled.div`
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
`;

const SpentPercentage = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const PerformanceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const PerformanceMetric = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const DropdownMenu = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownTrigger = styled.div``;

const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 160px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  padding: 0.5rem 0;
`;

interface DropdownItemProps {
  danger?: boolean;
}

const DropdownItem = styled.button<DropdownItemProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${(props) =>
    props.danger ? "#ef4444" : sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;
  text-align: left;

  &:hover {
    background-color: #f9fafb;
  }
`;

const DropdownDivider = styled.div`
  height: 1px;
  background-color: #e5e7eb;
  margin: 0.5rem 0;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const CampaignCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CampaignCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem 1.5rem 0 1.5rem;
  gap: 1rem;
`;

const CampaignCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const CampaignCardName = styled.button`
  background: none;
  border: none;
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.primary.dark};
  cursor: pointer;
  text-align: left;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const CampaignCardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CampaignCardActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const CampaignCardContent = styled.div`
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CampaignCardDescription = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin: 0;
  line-height: 1.5;
`;

const CampaignCardMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const MetricItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const MetricLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const MetricValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
`;

interface ProgressFillProps {
  width: number;
}

const ProgressFill = styled.div<ProgressFillProps>`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: ${sharedTheme.colorVariants.primary.dark};
  transition: width 0.3s ease;
`;

const ProgressLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
  text-align: center;
`;

const CampaignCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem 1.5rem 1.5rem;
  border-top: 1px solid #f3f4f6;
  margin-top: auto;
  padding-top: 1rem;
`;

const CampaignCardDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PaginationInfo = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const PaginationControls = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

interface PaginationButtonProps {
  active?: boolean;
  disabled?: boolean;
}

const PaginationButton = styled.button<PaginationButtonProps>`
  padding: 0.5rem 0.75rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  background-color: ${(props) =>
    props.active ? sharedTheme.colorVariants.primary.dark : "white"};
  border: 1px solid
    ${(props) =>
      props.active ? sharedTheme.colorVariants.primary.dark : "#e5e7eb"};
  border-radius: 6px;
  color: ${(props) =>
    props.active ? "white" : sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${(props) =>
      props.active ? sharedTheme.colorVariants.primary.light : "#f9fafb"};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: ${sharedTheme.zIndex.modalBackdrop};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

interface ModalContainerProps {
  size: "sm" | "md" | "lg";
}

const ModalContainer = styled.div<ModalContainerProps>`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: ${(props) =>
    props.size === "sm" ? "400px" : props.size === "md" ? "600px" : "800px"};
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const ModalTitle = styled.h2`
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  margin: 0;
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background-color: #f9fafb;
  border: none;
  color: ${sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const ModalContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ModalBody = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
`;

const AlertIcon = styled.div`
  margin-bottom: 0.5rem;
`;

const ModalText = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.md};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin: 0;
  max-width: 300px;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

// Drawer Styles
const DrawerOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  z-index: ${sharedTheme.zIndex.modalBackdrop};
`;

interface DrawerContainerProps {
  size: "sm" | "md" | "lg";
  anchor: "left" | "right";
}

const DrawerContainer = styled.div<DrawerContainerProps>`
  position: fixed;
  top: 0;
  ${(props) => (props.anchor === "left" ? "left: 0;" : "right: 0;")}
  height: 100%;
  width: ${(props) =>
    props.size === "sm" ? "30%" : props.size === "md" ? "40%" : "60%"};
  background-color: white;
  z-index: ${sharedTheme.zIndex.modal};
  box-shadow: ${sharedTheme.shadows.xl};
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

interface DrawerCloseButtonProps {
  anchor: "left" | "right";
}

const DrawerCloseButton = styled.button<DrawerCloseButtonProps>`
  position: absolute;
  top: 0.2rem;
  ${(props) => (props.anchor === "left" ? "right: -40px;" : "left: -40px;")}
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background-color: white;
  border: 1px solid #e5e7eb;
  color: ${sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    background-color: #f9fafb;
  }
`;

const DrawerContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const DrawerHeader = styled.div`
  padding: 2rem 2rem 1rem 2rem;
  border-bottom: 1px solid #e5e7eb;
`;

const DrawerTitle = styled.h2`
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  margin: 0 0 0.5rem 0;
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const DrawerSubtitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const DrawerBody = styled.div`
  padding: 1rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormLabel = styled.label`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const FormInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};

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
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${sharedTheme.colorVariants.primary.dark};
    box-shadow: 0 0 0 3px ${sharedTheme.colorVariants.primary.dark}20;
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DetailSectionTitle = styled.h3`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  margin: 0;
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const DetailGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const DetailLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const DetailValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  padding: 0.25rem 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  background-color: ${sharedTheme.colorVariants.primary.dark}10;
  color: ${sharedTheme.colorVariants.primary.dark};
  border-radius: 4px;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;

const MetricCard = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 8px;
`;

const MetricIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${sharedTheme.colorVariants.primary.dark}20;
  color: ${sharedTheme.colorVariants.primary.dark};
`;

const MetricContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const PerformanceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
`;

const PerformanceCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 8px;
  text-align: center;
`;

const PerformanceIcon = styled.div`
  color: ${sharedTheme.colorVariants.primary.dark};
`;

const PerformanceContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const PerformanceValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const PerformanceLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

// Helper function implementations
function getStatusColor(status: string): string {
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
}

export default CampaignsPage;
