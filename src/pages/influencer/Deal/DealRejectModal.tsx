// components/modal/RejectDealModal.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { AlertTriangle } from "lucide-react";
import { sharedTheme } from "../../../styles/theme/theme";
import Modal from "../../../components/layout/Modal";

interface Deal {
  id: string;
  title: string;
  brand: string;
  brandLogo: string;
  amount: string;
}

interface RejectDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  deal: Deal | null;
  onRejectDeal: (dealId: string, reason: string, feedback: string) => void;
}

const rejectionReasons = [
  "Payment amount is too low",
  "Timeline is too tight",
  "Content requirements don't match my brand",
  "Already committed to similar campaigns",
  "Brand values don't align with mine",
  "Deliverables are too extensive",
  "Location requirements can't be met",
  "Other",
];

const RejectDealModal: React.FC<RejectDealModalProps> = ({
  isOpen,
  onClose,
  deal,
  onRejectDeal,
}) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deal || !selectedReason) return;

    setIsSubmitting(true);
    try {
      await onRejectDeal(deal.id, selectedReason, feedback);
      onClose();
      // Reset form
      setSelectedReason("");
      setFeedback("");
    } catch (error) {
      console.error("Error rejecting deal:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!deal) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reject Deal" size="lg">
      <RejectForm onSubmit={handleSubmit}>
        {/* Deal Summary */}
        <DealSummary>
          <WarningIcon>
            <AlertTriangle size={24} color="#ef4444" />
          </WarningIcon>
          <DealInfo>
            <DealTitle>{deal.title}</DealTitle>
            <BrandName>{deal.brand}</BrandName>
            <DealAmount>{deal.amount}</DealAmount>
          </DealInfo>
        </DealSummary>

        <WarningMessage>
          Are you sure you want to reject this deal? This action cannot be
          undone and the brand will be notified of your decision.
        </WarningMessage>

        {/* Rejection Reason */}
        <ReasonSection>
          <SectionTitle>Reason for Rejection *</SectionTitle>
          <ReasonsList>
            {rejectionReasons.map((reason) => (
              <ReasonOption key={reason}>
                <ReasonRadio
                  type="radio"
                  id={reason}
                  name="rejectionReason"
                  value={reason}
                  checked={selectedReason === reason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  required
                />
                <ReasonLabel htmlFor={reason}>{reason}</ReasonLabel>
              </ReasonOption>
            ))}
          </ReasonsList>
        </ReasonSection>

        {/* Additional Feedback */}
        <FeedbackSection>
          <SectionTitle>Additional Feedback (Optional)</SectionTitle>
          <FeedbackTextarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Provide constructive feedback to help the brand improve future proposals..."
            rows={4}
          />
          <HelpText>
            Professional feedback helps brands understand your perspective and
            improve future collaborations.
          </HelpText>
        </FeedbackSection>

        {/* Actions */}
        <ModalActions>
          <CancelButton type="button" onClick={onClose}>
            Cancel
          </CancelButton>
          <RejectButton
            type="submit"
            disabled={isSubmitting || !selectedReason}
          >
            {isSubmitting ? "Rejecting..." : "Reject Deal"}
          </RejectButton>
        </ModalActions>
      </RejectForm>
    </Modal>
  );
};

// Styled Components
const RejectForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${sharedTheme.spacing.lg};
`;

const DealSummary = styled.div`
  display: flex;
  align-items: center;
  gap: ${sharedTheme.spacing.md};
  padding: ${sharedTheme.spacing.md};
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: ${sharedTheme.borderRadius.md};
`;

const WarningIcon = styled.div`
  flex-shrink: 0;
`;

const DealInfo = styled.div`
  flex: 1;
`;

const DealTitle = styled.h3`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0 0 0.25rem 0;
`;

const BrandName = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin: 0 0 0.25rem 0;
`;

const DealAmount = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.primary.light};
  margin: 0;
`;

const WarningMessage = styled.p`
  color: ${sharedTheme.colorVariants.secondary.light};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  line-height: 1.5;
  margin: 0;
  text-align: center;
  padding: ${sharedTheme.spacing.md};
  background: #f8fafc;
  border-radius: ${sharedTheme.borderRadius.md};
  border: 1px solid #e5e7eb;
`;

const ReasonSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${sharedTheme.spacing.sm};
`;

const SectionTitle = styled.h4`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
`;

const ReasonsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${sharedTheme.spacing.xs};
`;

const ReasonOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ReasonRadio = styled.input`
  width: 16px;
  height: 16px;
  accent-color: ${sharedTheme.colorVariants.primary.light};
`;

const ReasonLabel = styled.label`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;
  line-height: 1.4;
`;

const FeedbackSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${sharedTheme.spacing.sm};
`;

const FeedbackTextarea = styled.textarea`
  width: 100%;
  padding: ${sharedTheme.spacing.sm};
  border: 1px solid #e5e7eb;
  border-radius: ${sharedTheme.borderRadius.md};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${sharedTheme.colorVariants.primary.light};
    box-shadow: 0 0 0 3px ${sharedTheme.colorVariants.primary.light}20;
  }
`;

const HelpText = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin: 0;
  line-height: 1.4;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${sharedTheme.spacing.sm};
  padding-top: ${sharedTheme.spacing.md};
  border-top: 1px solid #e5e7eb;
`;

const CancelButton = styled.button`
  padding: ${sharedTheme.spacing.sm} ${sharedTheme.spacing.lg};
  border: 1px solid #e5e7eb;
  background: white;
  color: ${sharedTheme.colorVariants.secondary.dark};
  border-radius: ${sharedTheme.borderRadius.md};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    border-color: ${sharedTheme.colorVariants.secondary.light};
  }
`;

const RejectButton = styled.button`
  padding: ${sharedTheme.spacing.sm} ${sharedTheme.spacing.lg};
  border: 1px solid #ef4444;
  background: #ef4444;
  color: white;
  border-radius: ${sharedTheme.borderRadius.md};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #dc2626;
    border-color: #dc2626;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default RejectDealModal;
