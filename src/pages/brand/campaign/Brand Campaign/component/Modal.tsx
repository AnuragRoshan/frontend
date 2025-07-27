// modals/DeleteCampaignModal.tsx
import React from "react";
import styled from "styled-components";
import { AlertCircle } from "lucide-react";
import { sharedTheme } from "../../../../../styles/theme/theme";
import { ActionButton } from "../shared/ActionButton";
import { Campaign } from "../types/campaign.types";

interface DeleteCampaignModalProps {
  isOpen: boolean;
  campaign: Campaign | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteCampaignModal: React.FC<DeleteCampaignModalProps> = ({
  isOpen,
  campaign,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !campaign) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalBody>
          <AlertIcon>
            <AlertCircle size={48} color="#ef4444" />
          </AlertIcon>
          <ModalText>
            Are you sure you want to delete "{campaign.name}"? This action
            cannot be undone.
          </ModalText>
          <ModalActions>
            <ActionButton onClick={onClose}>Cancel</ActionButton>
            <ActionButton onClick={onConfirm}>Delete Campaign</ActionButton>
          </ModalActions>
        </ModalBody>
      </ModalContainer>
    </ModalOverlay>
  );
};

// modals/EndCampaignModal.tsx
import { Clock } from "lucide-react";

interface EndCampaignModalProps {
  isOpen: boolean;
  campaign: Campaign | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const EndCampaignModal: React.FC<EndCampaignModalProps> = ({
  isOpen,
  campaign,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !campaign) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalBody>
          <AlertIcon>
            <Clock size={48} color="#f59e0b" />
          </AlertIcon>
          <ModalText>
            Are you sure you want to end "{campaign.name}"? This will stop all
            active collaborations.
          </ModalText>
          <ModalActions>
            <ActionButton onClick={onClose}>Cancel</ActionButton>
            <ActionButton primary onClick={onConfirm}>
              End Campaign
            </ActionButton>
          </ModalActions>
        </ModalBody>
      </ModalContainer>
    </ModalOverlay>
  );
};

// Shared Modal Styles
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

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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
