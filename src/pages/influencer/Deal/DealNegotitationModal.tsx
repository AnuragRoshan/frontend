// components/modal/NegotiationModal.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { DollarSign, MessageSquare, Calendar, AlertCircle } from "lucide-react";
import { sharedTheme } from "../../../styles/theme/theme";
import Modal from "../../../components/layout/Modal";

interface Deal {
  id: string;
  title: string;
  brand: string;
  brandLogo: string;
  amount: string;
  deadline?: string;
  deliverables: string[];
  description: string;
}

interface NegotiationModalProps {
  isOpen: boolean;
  onClose: () => void;
  deal: Deal | null;
  onSubmitNegotiation: (negotiationData: NegotiationData) => void;
}

interface NegotiationData {
  proposedAmount: string;
  proposedDeadline: string;
  message: string;
  modifiedDeliverables: string[];
}

const NegotiationModal: React.FC<NegotiationModalProps> = ({
  isOpen,
  onClose,
  deal,
  onSubmitNegotiation,
}) => {
  const [proposedAmount, setProposedAmount] = useState("");
  const [proposedDeadline, setProposedDeadline] = useState("");
  const [message, setMessage] = useState("");
  const [modifiedDeliverables, setModifiedDeliverables] = useState<string[]>(
    []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (deal) {
      // Pre-fill with current deal values
      setProposedAmount(deal.amount.replace("₹", "").replace(",", ""));
      setProposedDeadline(deal.deadline || "");
      setModifiedDeliverables([...deal.deliverables]);
      setMessage("");
    }
  }, [deal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const negotiationData: NegotiationData = {
        proposedAmount: `₹${proposedAmount}`,
        proposedDeadline,
        message,
        modifiedDeliverables,
      };

      await onSubmitNegotiation(negotiationData);
      onClose();
    } catch (error) {
      console.error("Error submitting negotiation:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeliverableChange = (index: number, value: string) => {
    const updated = [...modifiedDeliverables];
    updated[index] = value;
    setModifiedDeliverables(updated);
  };

  const addDeliverable = () => {
    setModifiedDeliverables([...modifiedDeliverables, ""]);
  };

  const removeDeliverable = (index: number) => {
    const updated = modifiedDeliverables.filter((_, i) => i !== index);
    setModifiedDeliverables(updated);
  };

  if (!deal) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Negotiate Deal Terms"
      size="lg"
    >
      <NegotiationForm onSubmit={handleSubmit}>
        {/* Deal Summary */}
        <DealSummary>
          <DealHeader>
            <BrandLogo src={deal.brandLogo} alt={deal.brand} />
            <DealInfo>
              <DealTitle>{deal.title}</DealTitle>
              <BrandName>{deal.brand}</BrandName>
            </DealInfo>
          </DealHeader>
          <CurrentAmount>
            <AmountLabel>Current Offer:</AmountLabel>
            <AmountValue>{deal.amount}</AmountValue>
          </CurrentAmount>
        </DealSummary>

        {/* Negotiation Form */}
        <NegotiationSection>
          <SectionTitle>
            <DollarSign size={20} />
            Proposed Amount
          </SectionTitle>
          <AmountInputContainer>
            <CurrencySymbol>₹</CurrencySymbol>
            <AmountInput
              type="number"
              value={proposedAmount}
              onChange={(e) => setProposedAmount(e.target.value)}
              placeholder="Enter your proposed amount"
              required
            />
          </AmountInputContainer>
          <HelpText>
            Propose a fair amount based on your experience and market rates
          </HelpText>
        </NegotiationSection>

        <NegotiationSection>
          <SectionTitle>
            <Calendar size={20} />
            Proposed Deadline
          </SectionTitle>
          <DateInput
            type="date"
            value={proposedDeadline}
            onChange={(e) => setProposedDeadline(e.target.value)}
            required
          />
          <HelpText>
            Current deadline: {deal.deadline || "Not specified"}
          </HelpText>
        </NegotiationSection>

        <NegotiationSection>
          <SectionTitle>
            <MessageSquare size={20} />
            Deliverables
          </SectionTitle>
          <DeliverablesContainer>
            {modifiedDeliverables.map((deliverable, index) => (
              <DeliverableInput key={index}>
                <Input
                  type="text"
                  value={deliverable}
                  onChange={(e) =>
                    handleDeliverableChange(index, e.target.value)
                  }
                  placeholder="e.g., 2 Instagram Posts"
                />
                <RemoveButton
                  type="button"
                  onClick={() => removeDeliverable(index)}
                >
                  Remove
                </RemoveButton>
              </DeliverableInput>
            ))}
            <AddButton type="button" onClick={addDeliverable}>
              + Add Deliverable
            </AddButton>
          </DeliverablesContainer>
        </NegotiationSection>

        <NegotiationSection>
          <SectionTitle>
            <MessageSquare size={20} />
            Negotiation Message
          </SectionTitle>
          <MessageTextarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Explain your reasoning for the proposed changes..."
            rows={4}
            required
          />
          <HelpText>
            Be professional and explain why you're proposing these changes
          </HelpText>
        </NegotiationSection>

        {/* Warning */}
        <WarningSection>
          <AlertCircle size={16} />
          <WarningText>
            This will send a counter-proposal to the brand. They can accept,
            reject, or make another counter-offer.
          </WarningText>
        </WarningSection>

        {/* Actions */}
        <ModalActions>
          <CancelButton type="button" onClick={onClose}>
            Cancel
          </CancelButton>
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Negotiation"}
          </SubmitButton>
        </ModalActions>
      </NegotiationForm>
    </Modal>
  );
};

// Styled Components
const NegotiationForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${sharedTheme.spacing.lg};
`;

const DealSummary = styled.div`
  background: #f8fafc;
  border-radius: ${sharedTheme.borderRadius.md};
  padding: ${sharedTheme.spacing.md};
  border: 1px solid #e5e7eb;
`;

const DealHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${sharedTheme.spacing.sm};
  margin-bottom: ${sharedTheme.spacing.sm};
`;

const BrandLogo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: ${sharedTheme.borderRadius.sm};
  object-fit: cover;
`;

const DealInfo = styled.div`
  flex: 1;
`;

const DealTitle = styled.h3`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
`;

const BrandName = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin: 0;
`;

const CurrentAmount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AmountLabel = styled.span`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const AmountValue = styled.span`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.primary.light};
`;

const NegotiationSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${sharedTheme.spacing.sm};
`;

const SectionTitle = styled.h4`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
`;

const AmountInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const CurrencySymbol = styled.span`
  position: absolute;
  left: ${sharedTheme.spacing.sm};
  font-size: ${sharedTheme.typography.fontSizes.md};
  color: ${sharedTheme.colorVariants.secondary.light};
  z-index: 1;
`;

const AmountInput = styled.input`
  width: 100%;
  padding: ${sharedTheme.spacing.sm} ${sharedTheme.spacing.sm}
    ${sharedTheme.spacing.sm} 2rem;
  border: 1px solid #e5e7eb;
  border-radius: ${sharedTheme.borderRadius.md};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${sharedTheme.colorVariants.primary.light};
    box-shadow: 0 0 0 3px ${sharedTheme.colorVariants.primary.light}20;
  }
`;

const DateInput = styled.input`
  padding: ${sharedTheme.spacing.sm};
  border: 1px solid #e5e7eb;
  border-radius: ${sharedTheme.borderRadius.md};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${sharedTheme.colorVariants.primary.light};
    box-shadow: 0 0 0 3px ${sharedTheme.colorVariants.primary.light}20;
  }
`;

const DeliverablesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${sharedTheme.spacing.sm};
`;

const DeliverableInput = styled.div`
  display: flex;
  gap: ${sharedTheme.spacing.sm};
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: ${sharedTheme.spacing.sm};
  border: 1px solid #e5e7eb;
  border-radius: ${sharedTheme.borderRadius.md};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${sharedTheme.colorVariants.primary.light};
    box-shadow: 0 0 0 3px ${sharedTheme.colorVariants.primary.light}20;
  }
`;

const RemoveButton = styled.button`
  padding: ${sharedTheme.spacing.xs} ${sharedTheme.spacing.sm};
  border: 1px solid #ef4444;
  background: white;
  color: #ef4444;
  border-radius: ${sharedTheme.borderRadius.sm};
  font-size: ${sharedTheme.typography.fontSizes.xs};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #ef4444;
    color: white;
  }
`;

const AddButton = styled.button`
  padding: ${sharedTheme.spacing.sm};
  border: 1px dashed #d1d5db;
  background: transparent;
  color: ${sharedTheme.colorVariants.secondary.light};
  border-radius: ${sharedTheme.borderRadius.md};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${sharedTheme.colorVariants.primary.light};
    color: ${sharedTheme.colorVariants.primary.light};
    background: ${sharedTheme.colorVariants.primary.light}10;
  }
`;

const MessageTextarea = styled.textarea`
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
`;

const WarningSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: ${sharedTheme.spacing.sm};
  background: #fef3cd;
  border: 1px solid #f59e0b;
  border-radius: ${sharedTheme.borderRadius.md};
  color: #92400e;
`;

const WarningText = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.sm};
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

const SubmitButton = styled.button`
  padding: ${sharedTheme.spacing.sm} ${sharedTheme.spacing.lg};
  border: 1px solid ${sharedTheme.colorVariants.primary.light};
  background: ${sharedTheme.colorVariants.primary.light};
  color: white;
  border-radius: ${sharedTheme.borderRadius.md};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${sharedTheme.colorVariants.primary.dark};
    border-color: ${sharedTheme.colorVariants.primary.dark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default NegotiationModal;
