// components/modal/AcceptDealModal.tsx
import React, { useState } from "react";
import styled from "styled-components";
import {
  CheckCircle,
  Calendar,
  //   DollarSign,
  FileText,
  AlertCircle,
  //   Clock,
  MapPin,
  MessageSquare,
} from "lucide-react";
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
  location?: string;
  category: string;
  priority: "High" | "Medium" | "Low";
}

interface AcceptDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  deal: Deal | null;
  onAcceptDeal: (dealId: string, acceptanceData: AcceptanceData) => void;
}

interface AcceptanceData {
  agreesToTerms: boolean;
  startDate: string;
  notes: string;
  portfolioLinks: string[];
}

const AcceptDealModal: React.FC<AcceptDealModalProps> = ({
  isOpen,
  onClose,
  deal,
  onAcceptDeal,
}) => {
  const [agreesToTerms, setAgreesToTerms] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [notes, setNotes] = useState("");
  const [portfolioLinks, setPortfolioLinks] = useState<string[]>([""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (deal && isOpen) {
      // Reset form when modal opens
      setAgreesToTerms(false);
      setStartDate("");
      setNotes("");
      setPortfolioLinks([""]);
    }
  }, [deal, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deal || !agreesToTerms) return;

    setIsSubmitting(true);
    try {
      const acceptanceData: AcceptanceData = {
        agreesToTerms,
        startDate,
        notes,
        portfolioLinks: portfolioLinks.filter((link) => link.trim() !== ""),
      };

      await onAcceptDeal(deal.id, acceptanceData);
      onClose();
    } catch (error) {
      console.error("Error accepting deal:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePortfolioLinkChange = (index: number, value: string) => {
    const updated = [...portfolioLinks];
    updated[index] = value;
    setPortfolioLinks(updated);
  };

  const addPortfolioLink = () => {
    setPortfolioLinks([...portfolioLinks, ""]);
  };

  const removePortfolioLink = (index: number) => {
    if (portfolioLinks.length > 1) {
      const updated = portfolioLinks.filter((_, i) => i !== index);
      setPortfolioLinks(updated);
    }
  };

  if (!deal) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Accept Deal Offer"
      size="lg"
    >
      <AcceptForm onSubmit={handleSubmit}>
        {/* Deal Summary */}
        <DealSummarySection>
          <SummaryHeader>
            <CheckCircle size={24} color="#10b981" />
            <SummaryTitle>Deal Summary</SummaryTitle>
          </SummaryHeader>

          <DealCard>
            <DealHeader>
              <BrandInfo>
                <BrandLogo src={deal.brandLogo} alt={deal.brand} />
                <DealInfo>
                  <DealTitle>{deal.title}</DealTitle>
                  <BrandName>{deal.brand}</BrandName>
                </DealInfo>
              </BrandInfo>
              <DealAmount>{deal.amount}</DealAmount>
            </DealHeader>

            <DealMeta>
              <MetaItem>
                <Calendar size={16} />
                <span>Deadline: {deal.deadline || "Not specified"}</span>
              </MetaItem>
              {deal.location && (
                <MetaItem>
                  <MapPin size={16} />
                  <span>{deal.location}</span>
                </MetaItem>
              )}
              <MetaItem>
                <FileText size={16} />
                <span>{deal.category}</span>
              </MetaItem>
            </DealMeta>

            <DealDescription>{deal.description}</DealDescription>

            <DeliverablesSection>
              <DeliverablesTitle>Deliverables:</DeliverablesTitle>
              <DeliverablesList>
                {deal.deliverables.map((deliverable, index) => (
                  <DeliverableItem key={index}>{deliverable}</DeliverableItem>
                ))}
              </DeliverablesList>
            </DeliverablesSection>
          </DealCard>
        </DealSummarySection>

        {/* Acceptance Form */}
        <FormSection>
          <SectionTitle>
            <Calendar size={20} />
            Project Start Date
          </SectionTitle>
          <DateInput
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            required
          />
          <HelpText>
            When would you like to start working on this collaboration?
          </HelpText>
        </FormSection>

        <FormSection>
          <SectionTitle>
            <MessageSquare size={20} />
            Portfolio Links (Optional)
          </SectionTitle>
          <PortfolioContainer>
            {portfolioLinks.map((link, index) => (
              <PortfolioInput key={index}>
                <Input
                  type="url"
                  value={link}
                  onChange={(e) =>
                    handlePortfolioLinkChange(index, e.target.value)
                  }
                  placeholder="https://instagram.com/your-post or https://youtube.com/your-video"
                />
                {portfolioLinks.length > 1 && (
                  <RemoveButton
                    type="button"
                    onClick={() => removePortfolioLink(index)}
                  >
                    Remove
                  </RemoveButton>
                )}
              </PortfolioInput>
            ))}
            <AddButton type="button" onClick={addPortfolioLink}>
              + Add Portfolio Link
            </AddButton>
          </PortfolioContainer>
          <HelpText>
            Share relevant work samples to show the brand your content style
          </HelpText>
        </FormSection>

        <FormSection>
          <SectionTitle>
            <MessageSquare size={20} />
            Additional Notes (Optional)
          </SectionTitle>
          <NotesTextarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any questions, ideas, or additional information you'd like to share with the brand..."
            rows={4}
          />
          <HelpText>
            This is a great place to share your ideas or ask clarifying
            questions
          </HelpText>
        </FormSection>

        {/* Terms Agreement */}
        <TermsSection>
          <TermsHeader>
            <AlertCircle size={20} color="#f59e0b" />
            <TermsTitle>Terms & Conditions</TermsTitle>
          </TermsHeader>

          <TermsContent>
            <TermsList>
              <TermsItem>
                I agree to deliver all specified content by the agreed deadline
              </TermsItem>
              <TermsItem>I understand the payment terms and schedule</TermsItem>
              <TermsItem>
                I will maintain professional communication throughout the
                collaboration
              </TermsItem>
              <TermsItem>
                I agree to the brand's content guidelines and requirements
              </TermsItem>
              <TermsItem>
                I understand that failure to deliver may affect future
                opportunities
              </TermsItem>
            </TermsList>
          </TermsContent>

          <AgreementCheckbox>
            <CheckboxInput
              type="checkbox"
              id="agreeToTerms"
              checked={agreesToTerms}
              onChange={(e) => setAgreesToTerms(e.target.checked)}
              required
            />
            <CheckboxLabel htmlFor="agreeToTerms">
              I have read and agree to the terms and conditions above
            </CheckboxLabel>
          </AgreementCheckbox>
        </TermsSection>

        {/* Success Message */}
        <SuccessMessage>
          <CheckCircle size={20} color="#10b981" />
          <SuccessText>
            Once you accept, the brand will be notified and you can start
            working on the collaboration!
          </SuccessText>
        </SuccessMessage>

        {/* Actions */}
        <ModalActions>
          <CancelButton type="button" onClick={onClose}>
            Cancel
          </CancelButton>
          <AcceptButton type="submit" disabled={isSubmitting || !agreesToTerms}>
            {isSubmitting ? "Accepting..." : "Accept & Start Collaboration"}
          </AcceptButton>
        </ModalActions>
      </AcceptForm>
    </Modal>
  );
};

// Styled Components
const AcceptForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${sharedTheme.spacing.lg};
`;

const DealSummarySection = styled.div`
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: ${sharedTheme.borderRadius.lg};
  padding: ${sharedTheme.spacing.lg};
`;

const SummaryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: ${sharedTheme.spacing.md};
`;

const SummaryTitle = styled.h3`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
`;

const DealCard = styled.div`
  background: white;
  border-radius: ${sharedTheme.borderRadius.md};
  padding: ${sharedTheme.spacing.md};
  border: 1px solid #e5e7eb;
`;

const DealHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${sharedTheme.spacing.sm};
`;

const BrandInfo = styled.div`
  display: flex;
  gap: ${sharedTheme.spacing.sm};
  flex: 1;
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

const DealTitle = styled.h4`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0 0 0.25rem 0;
`;

const BrandName = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin: 0;
`;

const DealAmount = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: #10b981;
`;

const DealMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${sharedTheme.spacing.sm};
  margin-bottom: ${sharedTheme.spacing.sm};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const DealDescription = styled.p`
  color: ${sharedTheme.colorVariants.secondary.dark};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  line-height: 1.5;
  margin: 0 0 ${sharedTheme.spacing.sm} 0;
`;

const DeliverablesSection = styled.div``;

const DeliverablesTitle = styled.h5`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0 0 ${sharedTheme.spacing.xs} 0;
`;

const DeliverablesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${sharedTheme.spacing.xs};
`;

const DeliverableItem = styled.span`
  padding: 0.25rem 0.5rem;
  background: #10b98110;
  color: #10b981;
  border-radius: ${sharedTheme.borderRadius.sm};
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  border: 1px solid #10b98120;
`;

const FormSection = styled.div`
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

const PortfolioContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${sharedTheme.spacing.sm};
`;

const PortfolioInput = styled.div`
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

const NotesTextarea = styled.textarea`
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

const TermsSection = styled.div`
  background: #fffbeb;
  border: 1px solid #fbbf24;
  border-radius: ${sharedTheme.borderRadius.md};
  padding: ${sharedTheme.spacing.md};
`;

const TermsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: ${sharedTheme.spacing.sm};
`;

const TermsTitle = styled.h4`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
`;

const TermsContent = styled.div`
  margin-bottom: ${sharedTheme.spacing.md};
`;

const TermsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TermsItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin-bottom: ${sharedTheme.spacing.xs};
  line-height: 1.4;

  &:before {
    content: "•";
    color: #f59e0b;
    font-weight: bold;
    margin-top: 2px;
  }
`;

const AgreementCheckbox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
`;

const CheckboxInput = styled.input`
  width: 16px;
  height: 16px;
  accent-color: ${sharedTheme.colorVariants.primary.light};
  margin-top: 2px;
`;

const CheckboxLabel = styled.label`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;
  line-height: 1.4;
  font-weight: ${sharedTheme.typography.fontWeights.medium};
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: ${sharedTheme.spacing.sm};
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: ${sharedTheme.borderRadius.md};
  color: #15803d;
`;

const SuccessText = styled.p`
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

const AcceptButton = styled.button`
  padding: ${sharedTheme.spacing.sm} ${sharedTheme.spacing.lg};
  border: 1px solid #10b981;
  background: #10b981;
  color: white;
  border-radius: ${sharedTheme.borderRadius.md};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #059669;
    border-color: #059669;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default AcceptDealModal;
