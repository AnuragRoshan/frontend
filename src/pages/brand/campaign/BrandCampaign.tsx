// CampaignsPage.tsx - Updated with Send Deals functionality
"use client";

import React, { useState } from "react";
import styled from "styled-components";
// import { useNavigate } from "react-router-dom"; // For navigation
import { sharedTheme } from "../../../styles/theme/theme";

// Component imports
import { CampaignHeader } from "./Brand Campaign/component/Header";
import { StatsGrid } from "./Brand Campaign/component/StatsGrid";
import { FiltersSection } from "./Brand Campaign/component/Filter";
import { QuickFilters } from "./Brand Campaign/component/QuickFilter";
import { TableControls } from "./Brand Campaign/component/TableControl";
import { CampaignTable } from "./Brand Campaign/component/CampaignTable";
import { CampaignGrid } from "./Brand Campaign/component/CampaignGrid";
import { Pagination } from "./Brand Campaign/component/Pagination";
import { EmptyState } from "./Brand Campaign/component/EmptyState";
import { DeleteCampaignModal } from "./Brand Campaign/component/Modal";
import { EndCampaignModal } from "./Brand Campaign/component/Modal";
import {
  CreateCampaignDrawer,
  CampaignFormData,
} from "./Brand Campaign/CreateCampaignDrawer/CreateCampaignDrawer";

// Hook imports
import { useCampaigns } from "./Brand Campaign/hooks/customHook";
import { usePagination } from "./Brand Campaign/hooks/customHook";
import { useSelection } from "./Brand Campaign/hooks/customHook";

// Type imports
import { Campaign, ViewMode } from "./Brand Campaign/types/campaign.types";

const CampaignsPage: React.FC = () => {
  // const navigate = useNavigate();

  // Custom hooks
  const {
    campaigns,
    filteredCampaigns,
    filters,
    setFilters,
    sortConfig,
    handleSort,
    stats,
    addCampaign,
    updateCampaign, // Need this for status updates
  } = useCampaigns();

  const { currentPage, totalPages, handlePageChange, paginatedItems } =
    usePagination(filteredCampaigns, 10);

  const {
    selectedItems: selectedCampaigns,
    handleSelectItem: handleSelectCampaign,
    handleSelectAll,
    clearSelection,
  } = useSelection();

  // Local state
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );

  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);

  // Drawer states
  const [showCreateDrawer, setShowCreateDrawer] = useState(false);

  // Event handlers
  const handleCreateCampaign = () => {
    setShowCreateDrawer(true);
  };

  const handleSaveCampaign = (campaignData: CampaignFormData) => {
    const newCampaign: Campaign = {
      id: `campaign_${Date.now()}`,
      name: campaignData.name,
      description: campaignData.description,
      category: campaignData.category,
      platform: campaignData.platform,
      startDate: campaignData.startDate,
      endDate: campaignData.endDate,
      budget: campaignData.budget,
      spent: 0,
      influencers: 0,
      status: "draft", // Always starts as draft
      targetAudience: campaignData.targetAudience,
      objectives: campaignData.objectives,
      contentType: campaignData.contentType,
      hashtags: campaignData.hashtags,
      impressions: 0,
      engagement: 0,
      conversions: 0,
      roi: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addCampaign(newCampaign);
    console.log("Campaign created successfully:", newCampaign);
    setShowCreateDrawer(false);
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleViewDetails = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    console.log("View details for:", campaign.name);
    // Navigate to campaign details page or open details drawer
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    console.log("Edit campaign:", campaign.name);
    // Open edit drawer with campaign data prefilled
    // setShowCreateDrawer(true); // You can reuse the same drawer for editing
  };

  const handlePublishCampaign = (campaign: Campaign) => {
    // Update campaign status to "live" and make it public
    updateCampaign(campaign.id, {
      status: "live",
      // Add other fields that should be updated when publishing
    });

    console.log("Campaign published:", campaign.name);
    // Show success notification
  };

  const handleSendDeals = (campaign: Campaign) => {
    // Update campaign status to "private" when sending deals

    // Navigate to influencer discovery page with campaign context
    // router.push(`/brand/campaigns/${campaign.id}/influencer-discovery`);

    console.log("Navigating to Send Deals for:", campaign.name);
  };

  const handlePauseCampaign = (campaign: Campaign) => {
    updateCampaign(campaign.id, {
      status: "paused",
    });

    console.log("Campaign paused:", campaign.name);
    // Show success notification
  };

  const handleResumeCampaign = (campaign: Campaign) => {
    updateCampaign(campaign.id, {
      status: "live",
    });

    console.log("Campaign resumed:", campaign.name);
    // Show success notification
  };

  const handleViewAnalytics = (campaign: Campaign) => {
    // Navigate to analytics page or open analytics drawer
    // router.push(`/brand/campaigns/${campaign.id}/analytics`);

    console.log("View analytics for:", campaign.name);
  };

  const handleDeleteCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedCampaign) {
      // Implement delete functionality
      console.log("Delete campaign:", selectedCampaign.name);
      // deleteCampaign(selectedCampaign.id);
    }
    setShowDeleteModal(false);
    setSelectedCampaign(null);
  };

  const handleBulkAction = (action: "duplicate" | "delete") => {
    console.log(`Bulk ${action}:`, selectedCampaigns);
    clearSelection();
  };

  const handleSelectAllCampaigns = () => {
    handleSelectAll(paginatedItems.map((c: Campaign) => c.id));
  };

  const isFiltered =
    filters.search !== "" ||
    filters.status !== "all" ||
    filters.platform !== "all" ||
    filters.category !== "all";

  return (
    <PageContainer>
      {/* Header Section */}
      <CampaignHeader
        onCreateCampaign={handleCreateCampaign}
        onToggleFilters={handleToggleFilters}
        showFilters={showFilters}
      />

      {/* Stats Section */}
      <StatsGrid stats={stats} />

      {/* Filters Section */}
      <FiltersSection
        filters={filters}
        onFiltersChange={setFilters}
        isVisible={showFilters}
      />

      {/* Quick Filters */}
      <QuickFilters
        campaigns={campaigns}
        filters={filters}
        onFilterChange={setFilters}
      />

      {/* Empty State */}
      {filteredCampaigns.length === 0 ? (
        <EmptyState
          isFiltered={isFiltered}
          onCreateCampaign={handleCreateCampaign}
        />
      ) : (
        <>
          {/* Table Controls */}
          <TableControls
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            selectedCampaigns={selectedCampaigns}
            onBulkAction={handleBulkAction}
            totalResults={filteredCampaigns.length}
            currentResults={paginatedItems.length}
          />

          {/* Table or Grid View */}
          {viewMode === "table" ? (
            <CampaignTable
              campaigns={paginatedItems}
              selectedCampaigns={selectedCampaigns}
              sortConfig={sortConfig}
              onSort={handleSort}
              onSelectCampaign={handleSelectCampaign}
              onSelectAll={handleSelectAllCampaigns}
              onViewDetails={handleViewDetails}
              onEditCampaign={handleEditCampaign}
              onDeleteCampaign={handleDeleteCampaign}
            />
          ) : (
            <CampaignGrid
              campaigns={paginatedItems}
              onViewDetails={handleViewDetails}
              onEditCampaign={handleEditCampaign}
              onPublishCampaign={handlePublishCampaign}
              onSendDeals={handleSendDeals}
              onPauseCampaign={handlePauseCampaign}
              onResumeCampaign={handleResumeCampaign}
              onViewAnalytics={handleViewAnalytics}
            />
          )}

          {/* Pagination */}
          {filteredCampaigns.length > 10 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredCampaigns.length}
              itemsPerPage={10}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {/* Create Campaign Drawer */}
      <CreateCampaignDrawer
        isOpen={showCreateDrawer}
        onClose={() => setShowCreateDrawer(false)}
        onSave={handleSaveCampaign}
        // If editing, you could pass existing campaign data:
        // initialData={selectedCampaign}
        // isEditing={!!selectedCampaign}
      />

      {/* Modals */}
      <DeleteCampaignModal
        isOpen={showDeleteModal}
        campaign={selectedCampaign}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />

      <EndCampaignModal
        isOpen={showEndModal}
        campaign={selectedCampaign}
        onClose={() => setShowEndModal(false)}
        onConfirm={() => {
          console.log("End campaign:", selectedCampaign?.name);
          setShowEndModal(false);
        }}
      />
    </PageContainer>
  );
};

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

export default CampaignsPage;
