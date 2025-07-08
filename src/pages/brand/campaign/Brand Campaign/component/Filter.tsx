// components/FiltersSection.tsx
import React from "react";
import styled from "styled-components";
import { Search } from "lucide-react";
import { sharedTheme } from "../../../../../styles/theme/theme";
import { FilterState } from "../types/campaign.types";

interface FiltersSectionProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  isVisible: boolean;
}

export const FiltersSection: React.FC<FiltersSectionProps> = ({
  filters,
  onFiltersChange,
  isVisible,
}) => {
  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  if (!isVisible) return null;

  return (
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
              onChange={(e) => updateFilter("search", e.target.value)}
            />
          </SearchInput>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Status</FilterLabel>
          <FilterSelect
            value={filters.status}
            onChange={(e) => updateFilter("status", e.target.value)}
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
            onChange={(e) => updateFilter("platform", e.target.value)}
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
            onChange={(e) => updateFilter("category", e.target.value)}
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
  );
};

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
