// src/components/auth/LogoutConfirmationModal.tsx
import React from "react";
import styled from "styled-components";
import { LogOutIcon } from "lucide-react";
import { sharedTheme } from "../../styles/theme/theme";
import Modal from "../layout/Modal";

interface LogoutConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  userName?: string;
}

const LogoutConfirmationModal: React.FC<LogoutConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  userName,
}) => {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Logout"
      size="sm"
      showCloseButton={!isLoading}
    >
      <ModalContent>
        <LogoutMessage>
          {userName ? (
            <>
              Are you sure you want to logout, <strong>{userName}</strong>?
            </>
          ) : (
            "Are you sure you want to logout?"
          )}
        </LogoutMessage>

        <ModalActions>
          <CancelButton onClick={onClose} disabled={isLoading}>
            Cancel
          </CancelButton>
          <LogoutButton onClick={handleConfirm} disabled={isLoading}>
            {isLoading ? (
              <>
                <LoadingSpinner />
                Logging out...
              </>
            ) : (
              <>
                <LogOutIcon size={16} />
                Logout
              </>
            )}
          </LogoutButton>
        </ModalActions>
      </ModalContent>
    </Modal>
  );
};

export default LogoutConfirmationModal;

// Styled Components for Modal Content
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${sharedTheme.spacing.md};
`;

const LogoutMessage = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.md};
  color: ${sharedTheme.colorVariants.secondary.dark};
  line-height: 1.5;
  max-width: 300px;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: center;
  gap: ${sharedTheme.spacing.md};
  margin-top: ${sharedTheme.spacing.sm};
  width: 100%;
`;

const CancelButton = styled.button`
  padding: ${sharedTheme.spacing.sm} ${sharedTheme.spacing.md};
  border: 1px solid #e5e7eb;
  background: white;
  color: ${sharedTheme.colorVariants.secondary.dark};
  border-radius: ${sharedTheme.borderRadius.md};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 100px;

  &:hover:not(:disabled) {
    background: #f3f4f6;
    border-color: ${sharedTheme.colorVariants.secondary.light};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LogoutButton = styled.button`
  padding: ${sharedTheme.spacing.sm} ${sharedTheme.spacing.md};
  border: 1px solid #ef4444;
  background: #ef4444;
  color: white;
  border-radius: ${sharedTheme.borderRadius.md};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${sharedTheme.spacing.xs};
  min-width: 120px;

  &:hover:not(:disabled) {
    background: #dc2626;
    border-color: #dc2626;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
