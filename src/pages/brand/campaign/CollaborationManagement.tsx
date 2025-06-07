"use client";

import type React from "react";
import { useState, useMemo } from "react";
import styled from "styled-components";
import {
  Search,
  Filter,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  MessageSquare,
  Download,
  MoreHorizontal,
  Star,
  Instagram,
  Youtube,
  FileText,
  ImageIcon,
  Video,
  Camera,
  RefreshCw,
  Settings,
  BarChart3,
  Activity,
  DollarSign,
  Globe,
  ExternalLink,
  ThumbsUp,
  RotateCcw,
  Square,
  Layers,
} from "lucide-react";
import { lightTheme } from "../../../styles/theme/theme";
import WrapperBox from "../../../components/layout/WrapperBox";

interface Deliverable {
  id: string;
  type: "post" | "story" | "reel" | "video" | "blog";
  title: string;
  description: string;
  dueDate: string;
  status:
    | "not_started"
    | "in_progress"
    | "submitted"
    | "approved"
    | "needs_revision"
    | "published";
  submittedAt?: string;
  approvedAt?: string;
  publishedAt?: string;
  fileUrl?: string;
  thumbnailUrl?: string;
  revisionNotes?: string;
  metrics?: {
    views?: number;
    likes?: number;
    comments?: number;
    shares?: number;
    reach?: number;
    engagement?: number;
  };
}

interface Collaboration {
  id: string;
  influencerName: string;
  influencerHandle: string;
  influencerAvatar: string;
  platform: "instagram" | "youtube" | "tiktok" | "twitter";
  campaignTitle: string;
  status: "active" | "completed" | "delayed" | "cancelled";
  startDate: string;
  endDate: string;
  totalDeliverables: number;
  completedDeliverables: number;
  budget: number;
  deliverables: Deliverable[];
  lastActivity: string;
  responseTime: string;
  rating?: number;
  notes?: string;
}

interface Campaign {
  id: string;
  title: string;
  status: "active" | "completed" | "paused";
  totalCollaborators: number;
  timeline: string;
  budget: string;
  description: string;
}

const CollaborationManagement: React.FC = () => {
  const [selectedCampaign] = useState<Campaign>({
    id: "1",
    title: "Summer Fashion Collection Launch",
    status: "active",
    totalCollaborators: 12,
    timeline: "May 1 - June 30, 2025",
    budget: "₹2,50,000",
    description:
      "Multi-platform campaign for summer collection launch targeting young fashion enthusiasts",
  });

  const [filters, setFilters] = useState({
    status: "all",
    platform: "all",
    search: "",
    deliverableStatus: "all",
    dueDate: "all",
  });

  const [viewMode, setViewMode] = useState<"table" | "kanban" | "timeline">(
    "table"
  );
  //   const [sortBy, setSortBy] = useState<
  //     "dueDate" | "status" | "influencer" | "lastActivity"
  //   >("dueDate");
  //   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedCollaboration, setSelectedCollaboration] =
    useState<Collaboration | null>(null);
  const [selectedDeliverable, setSelectedDeliverable] =
    useState<Deliverable | null>(null);
  const [showDeliverableModal, setShowDeliverableModal] = useState(false);
  const [showCollaborationModal, setShowCollaborationModal] = useState(false);

  const mockCollaborations: Collaboration[] = [
    {
      id: "1",
      influencerName: "Priya Sharma",
      influencerHandle: "@priya_fashion",
      influencerAvatar: "/placeholder.svg?height=50&width=50",
      platform: "instagram",
      campaignTitle: "Summer Fashion Collection",
      status: "active",
      startDate: "2025-05-01",
      endDate: "2025-06-15",
      totalDeliverables: 4,
      completedDeliverables: 2,
      budget: 15000,
      lastActivity: "2025-01-08T10:30:00Z",
      responseTime: "< 2 hours",
      rating: 4.9,
      deliverables: [
        {
          id: "d1",
          type: "post",
          title: "Summer Collection Showcase Post",
          description:
            "Instagram post featuring 3-4 summer outfits with styling tips",
          dueDate: "2025-05-10",
          status: "approved",
          submittedAt: "2025-05-08T14:30:00Z",
          approvedAt: "2025-05-09T09:15:00Z",
          fileUrl: "/placeholder.svg?height=400&width=400",
          thumbnailUrl: "/placeholder.svg?height=200&width=200",
          metrics: {
            views: 25000,
            likes: 1200,
            comments: 85,
            shares: 45,
            reach: 18000,
            engagement: 5.2,
          },
        },
        {
          id: "d2",
          type: "story",
          title: "Behind the Scenes Stories",
          description:
            "4-5 Instagram stories showing styling process and outfit details",
          dueDate: "2025-05-12",
          status: "published",
          submittedAt: "2025-05-11T16:45:00Z",
          approvedAt: "2025-05-12T08:20:00Z",
          publishedAt: "2025-05-12T10:00:00Z",
          fileUrl: "/placeholder.svg?height=400&width=400",
          metrics: {
            views: 8500,
            reach: 7200,
            engagement: 3.8,
          },
        },
        {
          id: "d3",
          type: "reel",
          title: "Summer Styling Reel",
          description: "Short reel showing quick summer outfit transitions",
          dueDate: "2025-05-20",
          status: "submitted",
          submittedAt: "2025-05-19T11:20:00Z",
          fileUrl: "/placeholder.svg?height=400&width=400",
          thumbnailUrl: "/placeholder.svg?height=200&width=200",
        },
        {
          id: "d4",
          type: "post",
          title: "Collection Review Post",
          description:
            "Detailed review post with pros/cons and styling recommendations",
          dueDate: "2025-05-25",
          status: "in_progress",
        },
      ],
    },
    {
      id: "2",
      influencerName: "Arjun Mehta",
      influencerHandle: "@arjun_lifestyle",
      influencerAvatar: "/placeholder.svg?height=50&width=50",
      platform: "instagram",
      campaignTitle: "Summer Fashion Collection",
      status: "delayed",
      startDate: "2025-05-01",
      endDate: "2025-06-15",
      totalDeliverables: 3,
      completedDeliverables: 1,
      budget: 12000,
      lastActivity: "2025-01-06T15:45:00Z",
      responseTime: "< 4 hours",
      rating: 4.7,
      deliverables: [
        {
          id: "d5",
          type: "post",
          title: "Men's Summer Fashion Post",
          description: "Instagram post showcasing men's summer collection",
          dueDate: "2025-05-08",
          status: "approved",
          submittedAt: "2025-05-07T12:30:00Z",
          approvedAt: "2025-05-08T10:15:00Z",
          fileUrl: "/placeholder.svg?height=400&width=400",
          metrics: {
            views: 15000,
            likes: 890,
            comments: 42,
            shares: 28,
            reach: 12000,
            engagement: 6.8,
          },
        },
        {
          id: "d6",
          type: "reel",
          title: "Summer Outfit Ideas Reel",
          description: "Reel showing 5 different summer outfit combinations",
          dueDate: "2025-05-15",
          status: "needs_revision",
          submittedAt: "2025-05-14T18:20:00Z",
          fileUrl: "/placeholder.svg?height=400&width=400",
          revisionNotes:
            "Please add more close-up shots of the accessories and include brand tags in the video",
        },
        {
          id: "d7",
          type: "story",
          title: "Summer Collection Stories",
          description:
            "Instagram stories featuring different pieces from the collection",
          dueDate: "2025-05-22",
          status: "not_started",
        },
      ],
    },
    {
      id: "3",
      influencerName: "Sneha Patel",
      influencerHandle: "@sneha_style",
      influencerAvatar: "/placeholder.svg?height=50&width=50",
      platform: "youtube",
      campaignTitle: "Summer Fashion Collection",
      status: "active",
      startDate: "2025-05-01",
      endDate: "2025-06-15",
      totalDeliverables: 2,
      completedDeliverables: 1,
      budget: 25000,
      lastActivity: "2025-01-07T09:20:00Z",
      responseTime: "< 1 hour",
      rating: 4.8,
      deliverables: [
        {
          id: "d8",
          type: "video",
          title: "Summer Collection Haul & Try-On",
          description:
            "15-minute YouTube video featuring collection haul and try-on session",
          dueDate: "2025-05-18",
          status: "published",
          submittedAt: "2025-05-16T14:30:00Z",
          approvedAt: "2025-05-17T11:45:00Z",
          publishedAt: "2025-05-18T12:00:00Z",
          fileUrl: "/placeholder.svg?height=400&width=400",
          metrics: {
            views: 45000,
            likes: 2100,
            comments: 156,
            shares: 89,
            reach: 38000,
            engagement: 5.1,
          },
        },
        {
          id: "d9",
          type: "video",
          title: "Summer Styling Tips Video",
          description:
            "10-minute video with styling tips and outfit combinations",
          dueDate: "2025-05-30",
          status: "in_progress",
        },
      ],
    },
  ];

  //   const getStatusColor = (status: string) => {
  //     switch (status) {
  //       case "active":
  //       case "approved":
  //       case "published":
  //         return lightTheme.semanticColors.success;
  //       case "delayed":
  //       case "needs_revision":
  //         return lightTheme.semanticColors.error;
  //       case "submitted":
  //       case "in_progress":
  //         return lightTheme.semanticColors.warning;
  //       case "completed":
  //         return lightTheme.colors.primary;
  //       default:
  //         return lightTheme.colors.textSecondary;
  //     }
  //   };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
      case "published":
      case "completed":
        return <CheckCircle size={16} />;
      case "needs_revision":
      case "delayed":
        return <XCircle size={16} />;
      case "submitted":
      case "in_progress":
        return <Clock size={16} />;
      case "not_started":
        return <Square size={16} />;
      default:
        return <AlertCircle size={16} />;
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram size={16} />;
      case "youtube":
        return <Youtube size={16} />;
      default:
        return <Globe size={16} />;
    }
  };

  const getDeliverableIcon = (type: string) => {
    switch (type) {
      case "post":
        return <ImageIcon size={16} />;
      case "story":
        return <Camera size={16} />;
      case "reel":
      case "video":
        return <Video size={16} />;
      case "blog":
        return <FileText size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const calculateProgress = (collaboration: Collaboration) => {
    return Math.round(
      (collaboration.completedDeliverables / collaboration.totalDeliverables) *
        100
    );
  };

  const handleDeliverableAction = (
    deliverableId: string,
    action: "approve" | "reject" | "request_revision"
  ) => {
    console.log(`${action} deliverable ${deliverableId}`);
    // Implementation for deliverable actions
  };

  const handleViewDeliverable = (
    collaboration: Collaboration,
    deliverable: Deliverable
  ) => {
    setSelectedCollaboration(collaboration);
    setSelectedDeliverable(deliverable);
    setShowDeliverableModal(true);
  };

  const handleViewCollaboration = (collaboration: Collaboration) => {
    setSelectedCollaboration(collaboration);
    setShowCollaborationModal(true);
  };

  const filteredCollaborations = useMemo(() => {
    return mockCollaborations.filter((collaboration) => {
      if (filters.status !== "all" && collaboration.status !== filters.status)
        return false;
      if (
        filters.platform !== "all" &&
        collaboration.platform !== filters.platform
      )
        return false;
      if (
        filters.search &&
        !collaboration.influencerName
          .toLowerCase()
          .includes(filters.search.toLowerCase()) &&
        !collaboration.influencerHandle
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [filters]);

  const overallStats = useMemo(() => {
    const total = mockCollaborations.length;
    const onTrack = mockCollaborations.filter(
      (c) => c.status === "active"
    ).length;
    const delayed = mockCollaborations.filter(
      (c) => c.status === "delayed"
    ).length;
    const completed = mockCollaborations.filter(
      (c) => c.status === "completed"
    ).length;
    const totalDeliverables = mockCollaborations.reduce(
      (sum, c) => sum + c.totalDeliverables,
      0
    );
    const completedDeliverables = mockCollaborations.reduce(
      (sum, c) => sum + c.completedDeliverables,
      0
    );

    return {
      total,
      onTrack,
      delayed,
      completed,
      totalDeliverables,
      completedDeliverables,
      progressPercentage: Math.round(
        (completedDeliverables / totalDeliverables) * 100
      ),
    };
  }, []);

  return (
    <PageContainer>
      {/* Campaign Header */}
      <WrapperBox themeVariant="grey">
        <CampaignHeader>
          <CampaignInfo>
            <CampaignTitle>{selectedCampaign.title}</CampaignTitle>
            <CampaignMeta>
              <StatusBadge status={selectedCampaign.status}>
                <Activity size={14} />
                {selectedCampaign.status.toUpperCase()}
              </StatusBadge>
              <MetaItem>
                <Users size={16} />
                {selectedCampaign.totalCollaborators} Collaborators
              </MetaItem>
              <MetaItem>
                <Calendar size={16} />
                {selectedCampaign.timeline}
              </MetaItem>
              <MetaItem>
                <DollarSign size={16} />
                Budget: {selectedCampaign.budget}
              </MetaItem>
            </CampaignMeta>
          </CampaignInfo>
          <CampaignActions>
            <ActionButton variant="secondary">
              <Download size={16} />
              Export Report
            </ActionButton>
            <ActionButton variant="secondary">
              <MessageSquare size={16} />
              Message All
            </ActionButton>
            <ActionButton variant="primary">
              <Eye size={16} />
              View Campaign Brief
            </ActionButton>
          </CampaignActions>
        </CampaignHeader>

        {/* Overall Progress */}
        <ProgressSection>
          <ProgressHeader>
            <ProgressTitle>Campaign Progress</ProgressTitle>
            <ProgressPercentage>
              {overallStats.progressPercentage}%
            </ProgressPercentage>
          </ProgressHeader>
          <ProgressBar>
            <ProgressFill percentage={overallStats.progressPercentage} />
          </ProgressBar>
          <ProgressStats>
            <ProgressStat>
              <ProgressStatValue>
                {overallStats.completedDeliverables}
              </ProgressStatValue>
              <ProgressStatLabel>Completed</ProgressStatLabel>
            </ProgressStat>
            <ProgressStat>
              <ProgressStatValue>
                {overallStats.totalDeliverables -
                  overallStats.completedDeliverables}
              </ProgressStatValue>
              <ProgressStatLabel>Remaining</ProgressStatLabel>
            </ProgressStat>
            <ProgressStat>
              <ProgressStatValue>{overallStats.onTrack}</ProgressStatValue>
              <ProgressStatLabel>On Track</ProgressStatLabel>
            </ProgressStat>
            <ProgressStat>
              <ProgressStatValue>{overallStats.delayed}</ProgressStatValue>
              <ProgressStatLabel>Delayed</ProgressStatLabel>
            </ProgressStat>
          </ProgressStats>
        </ProgressSection>
      </WrapperBox>

      {/* Filters and View Controls */}
      <WrapperBox themeVariant="white">
        <FiltersContainer>
          <SearchContainer>
            <SearchIcon>
              <Search size={20} />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search by influencer name or handle..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </SearchContainer>

          <FiltersRow>
            <FilterSelect
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="delayed">Delayed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </FilterSelect>

            <FilterSelect
              value={filters.platform}
              onChange={(e) =>
                setFilters({ ...filters, platform: e.target.value })
              }
            >
              <option value="all">All Platforms</option>
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
              <option value="tiktok">TikTok</option>
              <option value="twitter">Twitter</option>
            </FilterSelect>

            <FilterSelect
              value={filters.deliverableStatus}
              onChange={(e) =>
                setFilters({ ...filters, deliverableStatus: e.target.value })
              }
            >
              <option value="all">All Deliverables</option>
              <option value="pending">Pending</option>
              <option value="submitted">Submitted</option>
              <option value="approved">Approved</option>
              <option value="needs_revision">Needs Revision</option>
              <option value="published">Published</option>
            </FilterSelect>

            <ViewToggle>
              <ViewButton
                active={viewMode === "table"}
                onClick={() => setViewMode("table")}
              >
                <BarChart3 size={16} />
                Table
              </ViewButton>
              <ViewButton
                active={viewMode === "kanban"}
                onClick={() => setViewMode("kanban")}
              >
                <Layers size={16} />
                Kanban
              </ViewButton>
              <ViewButton
                active={viewMode === "timeline"}
                onClick={() => setViewMode("timeline")}
              >
                <Calendar size={16} />
                Timeline
              </ViewButton>
            </ViewToggle>
          </FiltersRow>
        </FiltersContainer>
      </WrapperBox>

      {/* Collaborations List */}
      <WrapperBox themeVariant="grey">
        <CollaborationsHeader>
          <CollaborationsTitle>
            Collaborations ({filteredCollaborations.length})
          </CollaborationsTitle>
          <CollaborationsActions>
            <ActionButton variant="secondary">
              <RefreshCw size={16} />
              Refresh
            </ActionButton>
            <ActionButton variant="secondary">
              <Settings size={16} />
              Customize View
            </ActionButton>
          </CollaborationsActions>
        </CollaborationsHeader>

        {viewMode === "table" ? (
          <CollaborationsTable>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Influencer</TableHeaderCell>
                <TableHeaderCell>Platform</TableHeaderCell>
                <TableHeaderCell>Progress</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Due Dates</TableHeaderCell>
                <TableHeaderCell>Last Activity</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCollaborations.map((collaboration) => (
                <TableRow key={collaboration.id}>
                  <TableCell>
                    <InfluencerInfo>
                      <InfluencerAvatar
                        src={collaboration.influencerAvatar}
                        alt={collaboration.influencerName}
                      />
                      <InfluencerDetails>
                        <InfluencerName>
                          {collaboration.influencerName}
                        </InfluencerName>
                        <InfluencerHandle>
                          {collaboration.influencerHandle}
                        </InfluencerHandle>
                        <InfluencerRating>
                          <Star
                            size={12}
                            fill={lightTheme.semanticColors.warning}
                            color={lightTheme.semanticColors.warning}
                          />
                          {collaboration.rating}
                        </InfluencerRating>
                      </InfluencerDetails>
                    </InfluencerInfo>
                  </TableCell>
                  <TableCell>
                    <PlatformBadge>
                      {getPlatformIcon(collaboration.platform)}
                      {collaboration.platform}
                    </PlatformBadge>
                  </TableCell>
                  <TableCell>
                    <ProgressContainer>
                      <ProgressText>
                        {collaboration.completedDeliverables}/
                        {collaboration.totalDeliverables} deliverables
                      </ProgressText>
                      <ProgressBarSmall>
                        <ProgressFillSmall
                          percentage={calculateProgress(collaboration)}
                        />
                      </ProgressBarSmall>
                      <ProgressPercentageSmall>
                        {calculateProgress(collaboration)}%
                      </ProgressPercentageSmall>
                    </ProgressContainer>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={collaboration.status}>
                      {getStatusIcon(collaboration.status)}
                      {collaboration.status.replace("_", " ")}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <DueDatesContainer>
                      {collaboration.deliverables
                        .filter(
                          (d) =>
                            d.status !== "published" && d.status !== "approved"
                        )
                        .slice(0, 2)
                        .map((deliverable, index) => (
                          <DueDateItem
                            key={index}
                            overdue={new Date(deliverable.dueDate) < new Date()}
                          >
                            <Clock size={12} />
                            {new Date(deliverable.dueDate).toLocaleDateString()}
                          </DueDateItem>
                        ))}
                    </DueDatesContainer>
                  </TableCell>
                  <TableCell>
                    <DateText>
                      {new Date(
                        collaboration.lastActivity
                      ).toLocaleDateString()}
                    </DateText>
                  </TableCell>
                  <TableCell>
                    <ActionsContainer>
                      <ActionButton
                        variant="secondary"
                        size="sm"
                        onClick={() => handleViewCollaboration(collaboration)}
                      >
                        <Eye size={14} />
                        View
                      </ActionButton>
                      <ActionButton variant="secondary" size="sm">
                        <MessageSquare size={14} />
                        Message
                      </ActionButton>
                      <MoreButton>
                        <MoreHorizontal size={14} />
                      </MoreButton>
                    </ActionsContainer>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </CollaborationsTable>
        ) : viewMode === "kanban" ? (
          <KanbanBoard>
            {[
              "not_started",
              "in_progress",
              "submitted",
              "approved",
              "published",
            ].map((status) => (
              <KanbanColumn key={status}>
                <KanbanColumnHeader>
                  <KanbanColumnTitle>
                    {status.replace("_", " ").toUpperCase()}
                  </KanbanColumnTitle>
                  <KanbanColumnCount>
                    {filteredCollaborations.reduce(
                      (count, collab) =>
                        count +
                        collab.deliverables.filter((d) => d.status === status)
                          .length,
                      0
                    )}
                  </KanbanColumnCount>
                </KanbanColumnHeader>
                <KanbanColumnContent>
                  {filteredCollaborations.map((collaboration) =>
                    collaboration.deliverables
                      .filter((deliverable) => deliverable.status === status)
                      .map((deliverable) => (
                        <KanbanCard
                          key={deliverable.id}
                          onClick={() =>
                            handleViewDeliverable(collaboration, deliverable)
                          }
                        >
                          <KanbanCardHeader>
                            <DeliverableType>
                              {getDeliverableIcon(deliverable.type)}
                              {deliverable.type}
                            </DeliverableType>
                            <DueDateBadge
                              overdue={
                                new Date(deliverable.dueDate) < new Date()
                              }
                            >
                              <Clock size={12} />
                              {new Date(
                                deliverable.dueDate
                              ).toLocaleDateString()}
                            </DueDateBadge>
                          </KanbanCardHeader>
                          <KanbanCardTitle>{deliverable.title}</KanbanCardTitle>
                          <KanbanCardInfluencer>
                            <InfluencerAvatar
                              src={collaboration.influencerAvatar}
                              alt={collaboration.influencerName}
                              style={{ width: "24px", height: "24px" }}
                            />
                            {collaboration.influencerName}
                          </KanbanCardInfluencer>
                          {deliverable.metrics && (
                            <KanbanCardMetrics>
                              <MetricItem>
                                <Eye size={12} />
                                {formatNumber(deliverable.metrics.views || 0)}
                              </MetricItem>
                              <MetricItem>
                                <ThumbsUp size={12} />
                                {formatNumber(deliverable.metrics.likes || 0)}
                              </MetricItem>
                            </KanbanCardMetrics>
                          )}
                        </KanbanCard>
                      ))
                  )}
                </KanbanColumnContent>
              </KanbanColumn>
            ))}
          </KanbanBoard>
        ) : (
          <TimelineView>
            <TimelineHeader>
              <TimelineTitle>Campaign Timeline</TimelineTitle>
              <TimelineControls>
                <ActionButton variant="secondary" size="sm">
                  <Calendar size={16} />
                  This Month
                </ActionButton>
                <ActionButton variant="secondary" size="sm">
                  <Filter size={16} />
                  Filter
                </ActionButton>
              </TimelineControls>
            </TimelineHeader>
            <TimelineContent>
              {filteredCollaborations.map((collaboration) => (
                <TimelineItem key={collaboration.id}>
                  <TimelineItemHeader>
                    <InfluencerInfo>
                      <InfluencerAvatar
                        src={collaboration.influencerAvatar}
                        alt={collaboration.influencerName}
                      />
                      <InfluencerDetails>
                        <InfluencerName>
                          {collaboration.influencerName}
                        </InfluencerName>
                        <InfluencerHandle>
                          {collaboration.influencerHandle}
                        </InfluencerHandle>
                      </InfluencerDetails>
                    </InfluencerInfo>
                    <StatusBadge status={collaboration.status}>
                      {getStatusIcon(collaboration.status)}
                      {collaboration.status}
                    </StatusBadge>
                  </TimelineItemHeader>
                  <TimelineDeliverables>
                    {collaboration.deliverables.map((deliverable) => (
                      <TimelineDeliverable
                        key={deliverable.id}
                        onClick={() =>
                          handleViewDeliverable(collaboration, deliverable)
                        }
                      >
                        <TimelineDeliverableIcon status={deliverable.status}>
                          {getDeliverableIcon(deliverable.type)}
                        </TimelineDeliverableIcon>
                        <TimelineDeliverableContent>
                          <TimelineDeliverableTitle>
                            {deliverable.title}
                          </TimelineDeliverableTitle>
                          <TimelineDeliverableDate>
                            Due:{" "}
                            {new Date(deliverable.dueDate).toLocaleDateString()}
                          </TimelineDeliverableDate>
                          <StatusBadge status={deliverable.status}>
                            {getStatusIcon(deliverable.status)}
                            {deliverable.status.replace("_", " ")}
                          </StatusBadge>
                        </TimelineDeliverableContent>
                      </TimelineDeliverable>
                    ))}
                  </TimelineDeliverables>
                </TimelineItem>
              ))}
            </TimelineContent>
          </TimelineView>
        )}
      </WrapperBox>

      {/* Deliverable Modal */}
      {showDeliverableModal && selectedDeliverable && selectedCollaboration && (
        <ModalOverlay onClick={() => setShowDeliverableModal(false)}>
          <DeliverableModal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Deliverable Review</ModalTitle>
              <CloseButton onClick={() => setShowDeliverableModal(false)}>
                <XCircle size={20} />
              </CloseButton>
            </ModalHeader>

            <ModalContent>
              <DeliverableHeader>
                <DeliverableInfo>
                  <DeliverableTitle>
                    {selectedDeliverable.title}
                  </DeliverableTitle>
                  <DeliverableType>
                    {getDeliverableIcon(selectedDeliverable.type)}
                    {selectedDeliverable.type.toUpperCase()}
                  </DeliverableType>
                  <StatusBadge status={selectedDeliverable.status}>
                    {getStatusIcon(selectedDeliverable.status)}
                    {selectedDeliverable.status.replace("_", " ")}
                  </StatusBadge>
                </DeliverableInfo>
                <InfluencerInfo>
                  <InfluencerAvatar
                    src={selectedCollaboration.influencerAvatar}
                    alt={selectedCollaboration.influencerName}
                  />
                  <InfluencerDetails>
                    <InfluencerName>
                      {selectedCollaboration.influencerName}
                    </InfluencerName>
                    <InfluencerHandle>
                      {selectedCollaboration.influencerHandle}
                    </InfluencerHandle>
                  </InfluencerDetails>
                </InfluencerInfo>
              </DeliverableHeader>

              <DeliverableDetails>
                <DetailSection>
                  <DetailTitle>Description</DetailTitle>
                  <DetailText>{selectedDeliverable.description}</DetailText>
                </DetailSection>

                <DetailSection>
                  <DetailTitle>Timeline</DetailTitle>
                  <TimelineDetails>
                    <TimelineDetailItem>
                      <strong>Due Date:</strong>{" "}
                      {new Date(
                        selectedDeliverable.dueDate
                      ).toLocaleDateString()}
                    </TimelineDetailItem>
                    {selectedDeliverable.submittedAt && (
                      <TimelineDetailItem>
                        <strong>Submitted:</strong>{" "}
                        {new Date(
                          selectedDeliverable.submittedAt
                        ).toLocaleDateString()}
                      </TimelineDetailItem>
                    )}
                    {selectedDeliverable.approvedAt && (
                      <TimelineDetailItem>
                        <strong>Approved:</strong>{" "}
                        {new Date(
                          selectedDeliverable.approvedAt
                        ).toLocaleDateString()}
                      </TimelineDetailItem>
                    )}
                    {selectedDeliverable.publishedAt && (
                      <TimelineDetailItem>
                        <strong>Published:</strong>{" "}
                        {new Date(
                          selectedDeliverable.publishedAt
                        ).toLocaleDateString()}
                      </TimelineDetailItem>
                    )}
                  </TimelineDetails>
                </DetailSection>

                {selectedDeliverable.fileUrl && (
                  <DetailSection>
                    <DetailTitle>Content Preview</DetailTitle>
                    <ContentPreview>
                      <PreviewImage
                        src={selectedDeliverable.fileUrl}
                        alt="Content preview"
                      />
                      <PreviewActions>
                        <ActionButton variant="secondary" size="sm">
                          <Download size={16} />
                          Download
                        </ActionButton>
                        <ActionButton variant="secondary" size="sm">
                          <ExternalLink size={16} />
                          View Full Size
                        </ActionButton>
                      </PreviewActions>
                    </ContentPreview>
                  </DetailSection>
                )}

                {selectedDeliverable.metrics && (
                  <DetailSection>
                    <DetailTitle>Performance Metrics</DetailTitle>
                    <MetricsGrid>
                      <MetricCard>
                        <MetricValue>
                          {formatNumber(selectedDeliverable.metrics.views || 0)}
                        </MetricValue>
                        <MetricLabel>Views</MetricLabel>
                      </MetricCard>
                      <MetricCard>
                        <MetricValue>
                          {formatNumber(selectedDeliverable.metrics.likes || 0)}
                        </MetricValue>
                        <MetricLabel>Likes</MetricLabel>
                      </MetricCard>
                      <MetricCard>
                        <MetricValue>
                          {formatNumber(
                            selectedDeliverable.metrics.comments || 0
                          )}
                        </MetricValue>
                        <MetricLabel>Comments</MetricLabel>
                      </MetricCard>
                      <MetricCard>
                        <MetricValue>
                          {formatNumber(
                            selectedDeliverable.metrics.shares || 0
                          )}
                        </MetricValue>
                        <MetricLabel>Shares</MetricLabel>
                      </MetricCard>
                      <MetricCard>
                        <MetricValue>
                          {formatNumber(selectedDeliverable.metrics.reach || 0)}
                        </MetricValue>
                        <MetricLabel>Reach</MetricLabel>
                      </MetricCard>
                      <MetricCard>
                        <MetricValue>
                          {selectedDeliverable.metrics.engagement?.toFixed(1)}%
                        </MetricValue>
                        <MetricLabel>Engagement</MetricLabel>
                      </MetricCard>
                    </MetricsGrid>
                  </DetailSection>
                )}

                {selectedDeliverable.revisionNotes && (
                  <DetailSection>
                    <DetailTitle>Revision Notes</DetailTitle>
                    <RevisionNotes>
                      {selectedDeliverable.revisionNotes}
                    </RevisionNotes>
                  </DetailSection>
                )}
              </DeliverableDetails>
            </ModalContent>

            <ModalFooter>
              {selectedDeliverable.status === "submitted" && (
                <>
                  <ActionButton
                    variant="success"
                    onClick={() => {
                      handleDeliverableAction(
                        selectedDeliverable.id,
                        "approve"
                      );
                      setShowDeliverableModal(false);
                    }}
                  >
                    <CheckCircle size={16} />
                    Approve
                  </ActionButton>
                  <ActionButton
                    variant="danger"
                    onClick={() => {
                      handleDeliverableAction(
                        selectedDeliverable.id,
                        "request_revision"
                      );
                      setShowDeliverableModal(false);
                    }}
                  >
                    <RotateCcw size={16} />
                    Request Revision
                  </ActionButton>
                </>
              )}
              <ActionButton variant="secondary">
                <MessageSquare size={16} />
                Add Comment
              </ActionButton>
              <ActionButton variant="secondary">
                <Download size={16} />
                Download Content
              </ActionButton>
            </ModalFooter>
          </DeliverableModal>
        </ModalOverlay>
      )}

      {/* Collaboration Modal */}
      {showCollaborationModal && selectedCollaboration && (
        <ModalOverlay onClick={() => setShowCollaborationModal(false)}>
          <CollaborationModal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Collaboration Details</ModalTitle>
              <CloseButton onClick={() => setShowCollaborationModal(false)}>
                <XCircle size={20} />
              </CloseButton>
            </ModalHeader>

            <ModalContent>
              <CollaborationOverview>
                <InfluencerInfo>
                  <InfluencerAvatar
                    src={selectedCollaboration.influencerAvatar}
                    alt={selectedCollaboration.influencerName}
                    style={{ width: "80px", height: "80px" }}
                  />
                  <InfluencerDetails>
                    <InfluencerName
                      style={{ fontSize: lightTheme.typography.fontSizes.xl }}
                    >
                      {selectedCollaboration.influencerName}
                    </InfluencerName>
                    <InfluencerHandle
                      style={{ fontSize: lightTheme.typography.fontSizes.lg }}
                    >
                      {selectedCollaboration.influencerHandle}
                    </InfluencerHandle>
                    <PlatformBadge>
                      {getPlatformIcon(selectedCollaboration.platform)}
                      {selectedCollaboration.platform}
                    </PlatformBadge>
                    <InfluencerRating>
                      <Star
                        size={16}
                        fill={lightTheme.semanticColors.warning}
                        color={lightTheme.semanticColors.warning}
                      />
                      {selectedCollaboration.rating} • Response time:{" "}
                      {selectedCollaboration.responseTime}
                    </InfluencerRating>
                  </InfluencerDetails>
                </InfluencerInfo>

                <CollaborationStats>
                  <StatCard>
                    <StatValue>
                      {selectedCollaboration.completedDeliverables}/
                      {selectedCollaboration.totalDeliverables}
                    </StatValue>
                    <StatLabel>Deliverables</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatValue>
                      {calculateProgress(selectedCollaboration)}%
                    </StatValue>
                    <StatLabel>Progress</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatValue>
                      ₹{selectedCollaboration.budget.toLocaleString()}
                    </StatValue>
                    <StatLabel>Budget</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatusBadge status={selectedCollaboration.status}>
                      {getStatusIcon(selectedCollaboration.status)}
                      {selectedCollaboration.status}
                    </StatusBadge>
                    <StatLabel>Status</StatLabel>
                  </StatCard>
                </CollaborationStats>
              </CollaborationOverview>

              <DeliverablesSection>
                <DetailTitle>Deliverables Timeline</DetailTitle>
                <DeliverablesList>
                  {selectedCollaboration.deliverables.map((deliverable) => (
                    <DeliverableItem
                      key={deliverable.id}
                      onClick={() =>
                        handleViewDeliverable(
                          selectedCollaboration,
                          deliverable
                        )
                      }
                    >
                      <DeliverableItemIcon status={deliverable.status}>
                        {getDeliverableIcon(deliverable.type)}
                      </DeliverableItemIcon>
                      <DeliverableItemContent>
                        <DeliverableItemTitle>
                          {deliverable.title}
                        </DeliverableItemTitle>
                        <DeliverableItemMeta>
                          <span>
                            Due:{" "}
                            {new Date(deliverable.dueDate).toLocaleDateString()}
                          </span>
                          {deliverable.submittedAt && (
                            <span>
                              • Submitted:{" "}
                              {new Date(
                                deliverable.submittedAt
                              ).toLocaleDateString()}
                            </span>
                          )}
                        </DeliverableItemMeta>
                        <StatusBadge status={deliverable.status}>
                          {getStatusIcon(deliverable.status)}
                          {deliverable.status.replace("_", " ")}
                        </StatusBadge>
                      </DeliverableItemContent>
                      <DeliverableItemActions>
                        <ActionButton variant="secondary" size="sm">
                          <Eye size={14} />
                          View
                        </ActionButton>
                        {deliverable.status === "submitted" && (
                          <>
                            <ActionButton variant="success" size="sm">
                              <CheckCircle size={14} />
                              Approve
                            </ActionButton>
                            <ActionButton variant="danger" size="sm">
                              <RotateCcw size={14} />
                              Revise
                            </ActionButton>
                          </>
                        )}
                      </DeliverableItemActions>
                    </DeliverableItem>
                  ))}
                </DeliverablesList>
              </DeliverablesSection>
            </ModalContent>

            <ModalFooter>
              <ActionButton variant="primary">
                <MessageSquare size={16} />
                Message Influencer
              </ActionButton>
              <ActionButton variant="secondary">
                <Download size={16} />
                Export Report
              </ActionButton>
              <ActionButton variant="secondary">
                <Settings size={16} />
                Manage Collaboration
              </ActionButton>
            </ModalFooter>
          </CollaborationModal>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default CollaborationManagement;

// Styled Components (continuing from previous styles...)
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 20px;
`;

const CampaignHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const CampaignInfo = styled.div`
  flex: 1;
`;

const CampaignTitle = styled.h1`
  font-size: ${lightTheme.typography.fontSizes.xxxl};
  font-weight: ${lightTheme.typography.fontWeights.bold};
  color: ${lightTheme.colors.textPrimary};
  margin-bottom: 0.5rem;
`;

const CampaignMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${lightTheme.colors.textSecondary};
  font-size: ${lightTheme.typography.fontSizes.sm};
`;

const StatusBadge = styled.div<{ status: string }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  width: max-content;
  padding: 0.25rem 0.75rem;
  border-radius: ${lightTheme.borderRadius.full};
  font-size: ${lightTheme.typography.fontSizes.xs};
  font-weight: ${lightTheme.typography.fontWeights.medium};
  text-transform: capitalize;

  background-color: ${({ status }) => {
    switch (status) {
      case "active":
      case "approved":
      case "published":
        return "#ECFDF5";
      case "delayed":
      case "needs_revision":
        return "#FEF2F2";
      case "submitted":
      case "in_progress":
        return "#FFFBEB";
      default:
        return "#F3F4F6";
    }
  }};

  color: ${({ status }) => getStatusColor(status)};
`;

const CampaignActions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button<{
  variant?: "primary" | "secondary" | "success" | "danger";
  size?: "sm" | "md" | "lg";
}>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: ${({ size }) => {
    switch (size) {
      case "sm":
        return "0.5rem 0.75rem";
      case "lg":
        return "0.75rem 1.5rem";
      default:
        return "0.625rem 1rem";
    }
  }};
  border: none;
  border-radius: ${lightTheme.borderRadius.md};
  font-size: ${lightTheme.typography.fontSizes.sm};
  font-weight: ${lightTheme.typography.fontWeights.medium};
  cursor: pointer;
  transition: ${lightTheme.transitions.fast};

  background-color: ${({ variant }) => {
    switch (variant) {
      case "primary":
        return lightTheme.colors.primary;
      case "success":
        return lightTheme.semanticColors.success;
      case "danger":
        return lightTheme.semanticColors.error;
      default:
        return lightTheme.colors.surface;
    }
  }};

  color: ${({ variant }) => {
    switch (variant) {
      case "primary":
      case "success":
      case "danger":
        return "#FFFFFF";
      default:
        return lightTheme.colors.textPrimary;
    }
  }};

  border: ${({ variant }) =>
    variant === "secondary" ? `1px solid ${lightTheme.colors.border}` : "none"};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${lightTheme.shadows.md};
  }
`;

const ProgressSection = styled.div`
  margin-top: 1.5rem;
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ProgressTitle = styled.h3`
  font-size: ${lightTheme.typography.fontSizes.lg};
  font-weight: ${lightTheme.typography.fontWeights.semibold};
  color: ${lightTheme.colors.textPrimary};
`;

const ProgressPercentage = styled.div`
  font-size: ${lightTheme.typography.fontSizes.xl};
  font-weight: ${lightTheme.typography.fontWeights.bold};
  color: ${lightTheme.colors.primary};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background-color: ${lightTheme.colors.surface};
  border-radius: ${lightTheme.borderRadius.full};
  overflow: hidden;
  margin-bottom: 1rem;
`;

const ProgressFill = styled.div<{ percentage: number }>`
  height: 100%;
  width: ${({ percentage }) => `${percentage}%`};
  background: ${lightTheme.extendedDesignTokens.gradients.primary};
  border-radius: ${lightTheme.borderRadius.full};
  transition: width 0.3s ease;
`;

const ProgressStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
`;

const ProgressStat = styled.div`
  text-align: center;
`;

const ProgressStatValue = styled.div`
  font-size: ${lightTheme.typography.fontSizes.xl};
  font-weight: ${lightTheme.typography.fontWeights.bold};
  color: ${lightTheme.colors.textPrimary};
`;

const ProgressStatLabel = styled.div`
  font-size: ${lightTheme.typography.fontSizes.sm};
  color: ${lightTheme.colors.textSecondary};
  margin-top: 0.25rem;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${lightTheme.colors.textSecondary};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid ${lightTheme.colors.border};
  border-radius: ${lightTheme.borderRadius.md};
  font-size: ${lightTheme.typography.fontSizes.md};
  background-color: ${lightTheme.colors.background};
  transition: ${lightTheme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${lightTheme.colors.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const FiltersRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

const FilterSelect = styled.select`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${lightTheme.colors.border};
  border-radius: ${lightTheme.borderRadius.md};
  font-size: ${lightTheme.typography.fontSizes.sm};
  background-color: ${lightTheme.colors.background};
  cursor: pointer;
  transition: ${lightTheme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${lightTheme.colors.primary};
  }
`;

const ViewToggle = styled.div`
  display: flex;
  border: 1px solid ${lightTheme.colors.border};
  border-radius: ${lightTheme.borderRadius.md};
  overflow: hidden;
`;

const ViewButton = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  background-color: ${({ active }) =>
    active ? lightTheme.colors.primary : "transparent"};
  color: ${({ active }) =>
    active ? "#FFFFFF" : lightTheme.colors.textPrimary};
  font-size: ${lightTheme.typography.fontSizes.sm};
  font-weight: ${lightTheme.typography.fontWeights.medium};
  cursor: pointer;
  transition: ${lightTheme.transitions.fast};

  &:hover {
    background-color: ${({ active }) =>
      active ? lightTheme.colors.primaryDark : lightTheme.colors.surface};
  }
`;

const CollaborationsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CollaborationsTitle = styled.h2`
  font-size: ${lightTheme.typography.fontSizes.xl};
  font-weight: ${lightTheme.typography.fontWeights.bold};
  color: ${lightTheme.colors.textPrimary};
`;

const CollaborationsActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const CollaborationsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${lightTheme.colors.background};
  border-radius: ${lightTheme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${lightTheme.shadows.sm};
`;

const TableHeader = styled.thead`
  background-color: ${lightTheme.colors.surface};
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid ${lightTheme.colors.border};
  transition: ${lightTheme.transitions.fast};

  &:hover {
    background-color: ${lightTheme.colors.surface};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: ${lightTheme.typography.fontWeights.semibold};
  color: ${lightTheme.colors.textPrimary};
  font-size: ${lightTheme.typography.fontSizes.sm};
`;

const TableCell = styled.td`
  padding: 1rem;
  vertical-align: middle;
`;

const InfluencerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const InfluencerAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: ${lightTheme.borderRadius.full};
  object-fit: cover;
  border: 2px solid ${lightTheme.colors.border};
`;

const InfluencerDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const InfluencerName = styled.div`
  font-weight: ${lightTheme.typography.fontWeights.semibold};
  color: ${lightTheme.colors.textPrimary};
`;

const InfluencerHandle = styled.div`
  font-size: ${lightTheme.typography.fontSizes.sm};
  color: ${lightTheme.colors.textSecondary};
`;

const InfluencerRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${lightTheme.typography.fontSizes.sm};
  color: ${lightTheme.colors.textSecondary};
`;

const PlatformBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background-color: ${lightTheme.colors.surface};
  border-radius: ${lightTheme.borderRadius.sm};
  font-size: ${lightTheme.typography.fontSizes.xs};
  font-weight: ${lightTheme.typography.fontWeights.medium};
  text-transform: capitalize;
`;

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 150px;
`;

const ProgressText = styled.div`
  font-size: ${lightTheme.typography.fontSizes.sm};
  color: ${lightTheme.colors.textSecondary};
`;

const ProgressBarSmall = styled.div`
  width: 100%;
  height: 6px;
  background-color: ${lightTheme.colors.surface};
  border-radius: ${lightTheme.borderRadius.full};
  overflow: hidden;
`;

const ProgressFillSmall = styled.div<{ percentage: number }>`
  height: 100%;
  width: ${({ percentage }) => `${percentage}%`};
  background: ${lightTheme.extendedDesignTokens.gradients.primary};
  border-radius: ${lightTheme.borderRadius.full};
  transition: width 0.3s ease;
`;

const ProgressPercentageSmall = styled.div`
  font-size: ${lightTheme.typography.fontSizes.xs};
  color: ${lightTheme.colors.textSecondary};
  text-align: right;
`;

const DueDatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const DueDateItem = styled.div<{ overdue?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${lightTheme.typography.fontSizes.xs};
  color: ${({ overdue }) =>
    overdue
      ? lightTheme.semanticColors.error
      : lightTheme.colors.textSecondary};
  padding: 0.25rem 0.5rem;
  background-color: ${({ overdue }) =>
    overdue ? "#FEF2F2" : lightTheme.colors.surface};
  border-radius: ${lightTheme.borderRadius.sm};
`;

const DateText = styled.div`
  font-size: ${lightTheme.typography.fontSizes.sm};
  color: ${lightTheme.colors.textSecondary};
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const MoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: none;
  background-color: transparent;
  color: ${lightTheme.colors.textSecondary};
  cursor: pointer;
  border-radius: ${lightTheme.borderRadius.sm};
  transition: ${lightTheme.transitions.fast};

  &:hover {
    background-color: ${lightTheme.colors.surface};
  }
`;

// Kanban Board Styles
const KanbanBoard = styled.div`
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding-bottom: 1rem;
`;

const KanbanColumn = styled.div`
  min-width: 300px;
  background-color: ${lightTheme.colors.surface};
  border-radius: ${lightTheme.borderRadius.md};
  padding: 1rem;
`;

const KanbanColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const KanbanColumnTitle = styled.h3`
  font-size: ${lightTheme.typography.fontSizes.sm};
  font-weight: ${lightTheme.typography.fontWeights.semibold};
  color: ${lightTheme.colors.textPrimary};
`;

const KanbanColumnCount = styled.span`
  background-color: ${lightTheme.colors.primary};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: ${lightTheme.borderRadius.full};
  font-size: ${lightTheme.typography.fontSizes.xs};
  font-weight: ${lightTheme.typography.fontWeights.medium};
`;

const KanbanColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const KanbanCard = styled.div`
  background-color: ${lightTheme.colors.background};
  border: 1px solid ${lightTheme.colors.border};
  border-radius: ${lightTheme.borderRadius.md};
  padding: 1rem;
  cursor: pointer;
  transition: ${lightTheme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${lightTheme.shadows.md};
  }
`;

const KanbanCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const DeliverableType = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${lightTheme.typography.fontSizes.xs};
  color: ${lightTheme.colors.textSecondary};
  text-transform: uppercase;
  font-weight: ${lightTheme.typography.fontWeights.medium};
`;

const DueDateBadge = styled.div<{ overdue?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${lightTheme.typography.fontSizes.xs};
  color: ${({ overdue }) =>
    overdue
      ? lightTheme.semanticColors.error
      : lightTheme.colors.textSecondary};
  padding: 0.25rem 0.5rem;
  background-color: ${({ overdue }) =>
    overdue ? "#FEF2F2" : lightTheme.colors.surface};
  border-radius: ${lightTheme.borderRadius.sm};
`;

const KanbanCardTitle = styled.h4`
  font-size: ${lightTheme.typography.fontSizes.sm};
  font-weight: ${lightTheme.typography.fontWeights.medium};
  color: ${lightTheme.colors.textPrimary};
  margin-bottom: 0.5rem;
`;

const KanbanCardInfluencer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${lightTheme.typography.fontSizes.xs};
  color: ${lightTheme.colors.textSecondary};
  margin-bottom: 0.5rem;
`;

const KanbanCardMetrics = styled.div`
  display: flex;
  gap: 1rem;
`;

const MetricItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${lightTheme.typography.fontSizes.xs};
  color: ${lightTheme.colors.textSecondary};
`;

// Timeline View Styles
const TimelineView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TimelineHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TimelineTitle = styled.h3`
  font-size: ${lightTheme.typography.fontSizes.lg};
  font-weight: ${lightTheme.typography.fontWeights.semibold};
  color: ${lightTheme.colors.textPrimary};
`;

const TimelineControls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const TimelineContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TimelineItem = styled.div`
  background-color: ${lightTheme.colors.background};
  border: 1px solid ${lightTheme.colors.border};
  border-radius: ${lightTheme.borderRadius.md};
  padding: 1.5rem;
`;

const TimelineItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const TimelineDeliverables = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TimelineDeliverable = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: ${lightTheme.colors.surface};
  border-radius: ${lightTheme.borderRadius.md};
  cursor: pointer;
  transition: ${lightTheme.transitions.fast};

  &:hover {
    background-color: ${lightTheme.colors.border};
  }
`;

const TimelineDeliverableIcon = styled.div<{ status: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${lightTheme.borderRadius.full};
  background-color: ${({ status }) => {
    switch (status) {
      case "approved":
      case "published":
        return "#ECFDF5";
      case "needs_revision":
        return "#FEF2F2";
      case "submitted":
      case "in_progress":
        return "#FFFBEB";
      default:
        return lightTheme.colors.background;
    }
  }};
  color: ${({ status }) => getStatusColor(status)};
`;

const TimelineDeliverableContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const TimelineDeliverableTitle = styled.h4`
  font-size: ${lightTheme.typography.fontSizes.md};
  font-weight: ${lightTheme.typography.fontWeights.medium};
  color: ${lightTheme.colors.textPrimary};
`;

const TimelineDeliverableDate = styled.div`
  font-size: ${lightTheme.typography.fontSizes.sm};
  color: ${lightTheme.colors.textSecondary};
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${lightTheme.zIndex.modal};
  padding: 1rem;
`;

const DeliverableModal = styled.div`
  background-color: ${lightTheme.colors.background};
  border-radius: ${lightTheme.borderRadius.lg};
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${lightTheme.shadows.xxl};
`;

const CollaborationModal = styled.div`
  background-color: ${lightTheme.colors.background};
  border-radius: ${lightTheme.borderRadius.lg};
  max-width: 1000px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${lightTheme.shadows.xxl};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid ${lightTheme.colors.border};
`;

const ModalTitle = styled.h2`
  font-size: ${lightTheme.typography.fontSizes.xl};
  font-weight: ${lightTheme.typography.fontWeights.bold};
  color: ${lightTheme.colors.textPrimary};
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: none;
  background-color: transparent;
  color: ${lightTheme.colors.textSecondary};
  cursor: pointer;
  border-radius: ${lightTheme.borderRadius.sm};
  transition: ${lightTheme.transitions.fast};

  &:hover {
    background-color: ${lightTheme.colors.surface};
  }
`;

const ModalContent = styled.div`
  padding: 1.5rem;
`;

const ModalFooter = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid ${lightTheme.colors.border};
  flex-wrap: wrap;
`;

// Deliverable Modal Specific Styles
const DeliverableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const DeliverableInfo = styled.div`
  flex: 1;
`;

const DeliverableTitle = styled.h3`
  font-size: ${lightTheme.typography.fontSizes.xl};
  font-weight: ${lightTheme.typography.fontWeights.bold};
  color: ${lightTheme.colors.textPrimary};
  margin-bottom: 0.5rem;
`;

const DeliverableDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DetailTitle = styled.h4`
  font-size: ${lightTheme.typography.fontSizes.lg};
  font-weight: ${lightTheme.typography.fontWeights.semibold};
  color: ${lightTheme.colors.textPrimary};
`;

const DetailText = styled.p`
  color: ${lightTheme.colors.textSecondary};
  line-height: ${lightTheme.typography.lineHeights.md};
`;

const TimelineDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TimelineDetailItem = styled.div`
  font-size: ${lightTheme.typography.fontSizes.sm};
  color: ${lightTheme.colors.textSecondary};
`;

const ContentPreview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: ${lightTheme.borderRadius.md};
  border: 1px solid ${lightTheme.colors.border};
`;

const PreviewActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
`;

const MetricCard = styled.div`
  text-align: center;
  padding: 1rem;
  background-color: ${lightTheme.colors.surface};
  border-radius: ${lightTheme.borderRadius.md};
`;

const MetricValue = styled.div`
  font-size: ${lightTheme.typography.fontSizes.lg};
  font-weight: ${lightTheme.typography.fontWeights.bold};
  color: ${lightTheme.colors.textPrimary};
`;

const MetricLabel = styled.div`
  font-size: ${lightTheme.typography.fontSizes.sm};
  color: ${lightTheme.colors.textSecondary};
  margin-top: 0.25rem;
`;

const RevisionNotes = styled.div`
  padding: 1rem;
  background-color: #fef2f2;
  border: 1px solid ${lightTheme.semanticColors.error};
  border-radius: ${lightTheme.borderRadius.md};
  color: ${lightTheme.semanticColors.error};
  font-style: italic;
`;

// Collaboration Modal Specific Styles
const CollaborationOverview = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CollaborationStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  min-width: 300px;
`;

const StatCard = styled.div`
  text-align: center;
  padding: 1rem;
  background-color: ${lightTheme.colors.surface};
  border-radius: ${lightTheme.borderRadius.md};
`;

const StatValue = styled.div`
  font-size: ${lightTheme.typography.fontSizes.lg};
  font-weight: ${lightTheme.typography.fontWeights.bold};
  color: ${lightTheme.colors.textPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: ${lightTheme.typography.fontSizes.sm};
  color: ${lightTheme.colors.textSecondary};
  margin-top: 0.25rem;
`;

const DeliverablesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DeliverablesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DeliverableItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: ${lightTheme.colors.surface};
  border-radius: ${lightTheme.borderRadius.md};
  cursor: pointer;
  transition: ${lightTheme.transitions.fast};

  &:hover {
    background-color: ${lightTheme.colors.border};
  }
`;

const DeliverableItemIcon = styled.div<{ status: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${lightTheme.borderRadius.full};
  background-color: ${({ status }) => {
    switch (status) {
      case "approved":
      case "published":
        return "#ECFDF5";
      case "needs_revision":
        return "#FEF2F2";
      case "submitted":
      case "in_progress":
        return "#FFFBEB";
      default:
        return lightTheme.colors.background;
    }
  }};
  color: ${({ status }) => getStatusColor(status)};
`;

const DeliverableItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const DeliverableItemTitle = styled.h4`
  font-size: ${lightTheme.typography.fontSizes.md};
  font-weight: ${lightTheme.typography.fontWeights.medium};
  color: ${lightTheme.colors.textPrimary};
`;

const DeliverableItemMeta = styled.div`
  font-size: ${lightTheme.typography.fontSizes.sm};
  color: ${lightTheme.colors.textSecondary};
`;

const DeliverableItemActions = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const getStatusColor = (status: string): string => {
  switch (status) {
    case "active":
    case "approved":
    case "published":
      return "#047857"; // Green
    case "delayed":
    case "needs_revision":
      return "#B91C1C"; // Red
    case "submitted":
    case "in_progress":
      return "#92400E"; // Yellow
    default:
      return "#374151"; // Gray
  }
};
