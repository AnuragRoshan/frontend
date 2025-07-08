// components/Pagination.tsx
import React from "react";
import styled from "styled-components";
import { sharedTheme } from "../../../../../styles/theme/theme";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getVisiblePages = () => {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <PaginationContainer>
      <PaginationInfo>
        Showing {startItem} to {endItem} of {totalItems} campaigns
      </PaginationInfo>
      <PaginationControls>
        <PaginationButton
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </PaginationButton>

        {getVisiblePages().map((page) => (
          <PaginationButton
            key={page}
            active={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </PaginationButton>
        ))}

        <PaginationButton
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </PaginationButton>
      </PaginationControls>
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const PaginationInfo = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  font-weight: ${sharedTheme.typography.fontWeights.medium};

  @media (max-width: 768px) {
    order: 2;
  }
`;

const PaginationControls = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    order: 1;
  }
`;

interface PaginationButtonProps {
  active?: boolean;
  disabled?: boolean;
}

const PaginationButton = styled.button<PaginationButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  padding: 0.5rem 0.75rem;
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
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background-color: ${(props) =>
      props.active ? sharedTheme.colorVariants.primary.light : "#f9fafb"};
    border-color: ${(props) =>
      props.active ? sharedTheme.colorVariants.primary.light : "#d1d5db"};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background-color: #f9fafb;
    border-color: #e5e7eb;
    color: ${sharedTheme.colorVariants.secondary.light};

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }

  &:focus-visible {
    outline: 2px solid ${sharedTheme.colorVariants.primary.dark};
    outline-offset: 2px;
  }

  /* Ensure consistent sizing for number buttons */
  &[data-page-number="true"] {
    min-width: 40px;
    width: 40px;
  }
`;
