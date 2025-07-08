// CampaignsPage.tsx - Main component with Create Campaign functionality
"use client";

import React, { useState } from "react";
import styled from "styled-components";
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
} from "./Brand Campaign/Create Campaign Drawer/CreateCampaignDrawer";

// Hook imports
import { useCampaigns } from "./Brand Campaign/hooks/customHook";
import { usePagination } from "./Brand Campaign/hooks/customHook";
import { useSelection } from "./Brand Campaign/hooks/customHook";

// Type imports
import { Campaign, ViewMode } from "./Brand Campaign/types/campaign.types";

const CampaignsPage: React.FC = () => {
  // Custom hooks
  const {
    campaigns,
    filteredCampaigns,
    filters,
    setFilters,
    sortConfig,
    handleSort,
    stats,
    addCampaign, // New function to add campaign
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
    // Convert form data to Campaign object
    const newCampaign: Campaign = {
      id: `campaign_${Date.now()}`, // Generate unique ID
      name: campaignData.name,
      description: campaignData.description,
      category: campaignData.category,
      platform: campaignData.platform,
      startDate: campaignData.startDate,
      endDate: campaignData.endDate,
      budget: campaignData.budget,
      spent: 0, // Initially no spending
      influencers: 0, // Initially no influencers
      status: "draft", // New campaigns start as draft
      targetAudience: campaignData.targetAudience,
      objectives: campaignData.objectives,
      contentType: campaignData.contentType,
      hashtags: campaignData.hashtags,
      // Default values for fields not in form
      impressions: 0,
      engagement: 0,
      conversions: 0,
      roi: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add campaign using the hook
    addCampaign(newCampaign);

    // Show success message (you can implement toast notifications)
    console.log("Campaign created successfully:", newCampaign);

    // Close the drawer
    setShowCreateDrawer(false);
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleViewDetails = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    // Open details drawer or navigate to details page
    console.log("View details for:", campaign.name);
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    // Open edit drawer or navigate to edit page
    console.log("Edit campaign:", campaign.name);
  };

  const handleDeleteCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedCampaign) {
      // Implement delete functionality in useCampaigns hook
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
