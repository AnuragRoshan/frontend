// components/modal/ViewDetailsModal.tsx
import React from "react";
import styled from "styled-components";
import {
  Calendar,
  DollarSign,
  MapPin,
  FileText,
  Clock,
  Target,
  Users,
  TrendingUp,
  MessageSquare,
  Star,
  //   Tag,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react";
import { sharedTheme } from "../../../styles/theme/theme";
import Modal from "../../../components/layout/Modal";

interface Deal {
  id: string;
  title: string;
  brand: string;
  brandLogo: string;
  amount: string;
  status: "pending" | "active" | "completed";
  createdDate: string;
  deadline?: string;
  completedDate?: string;
  description: string;
  deliverables: string[];
  location?: string;
  category: string;
  priority: "High" | "Medium" | "Low";
  engagement?: {
    likes?: number;
    comments?: number;
    shares?: number;
  };
  rating?: number;
  feedback?: string;
}

interface ViewDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  deal: Deal | null;
}

const ViewDetailsModal: React.FC<ViewDetailsModalProps> = ({
  isOpen,
  onClose,
  deal,
}) => {
  if (!deal) return null;

  //   const getPriorityColor = (priority: string) => {
  //     switch (priority) {
  //       case "High":
  //         return "#ef4444";
  //       case "Medium":
  //         return "#f59e0b";
  //       case "Low":
  //         return "#10b981";
  //       default:
  //         return "#6b7280";
  //     }
  //   };

  //   const getStatusColor = (status: string) => {
  //     switch (status) {
  //       case "pending":
  //         return "#f59e0b";
  //       case "active":
  //         return "#3b82f6";
  //       case "completed":
  //         return "#10b981";
  //       default:
  //         return "#6b7280";
  //     }
  //   };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock size={16} />;
      case "active":
        return <TrendingUp size={16} />;
      case "completed":
        return <CheckCircle size={16} />;
      default:
        return <Info size={16} />;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Deal Details" size="lg">
      <DetailsContainer>
        {/* Header Section */}
        <HeaderSection>
          <BrandHeader>
            <BrandLogo src={deal.brandLogo} alt={deal.brand} />
            <BrandInfo>
              <DealTitle>{deal.title}</DealTitle>
              <BrandName>{deal.brand}</BrandName>
              <StatusBadge status={deal.status}>
                {getStatusIcon(deal.status)}
                {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
              </StatusBadge>
            </BrandInfo>
          </BrandHeader>
          <AmountSection>
            <AmountValue>{deal.amount}</AmountValue>
            <PriorityTag priority={deal.priority}>
              <AlertTriangle size={12} />
              {deal.priority} Priority
            </PriorityTag>
          </AmountSection>
        </HeaderSection>

        {/* Quick Info Cards */}
        <InfoCardsSection>
          <InfoCard>
            <InfoCardIcon>
              <Calendar size={20} color="#3b82f6" />
            </InfoCardIcon>
            <InfoCardContent>
              <InfoCardLabel>
                {deal.status === "completed"
                  ? "Completed"
                  : deal.status === "active"
                  ? "Deadline"
                  : "Deadline"}
              </InfoCardLabel>
              <InfoCardValue>
                {deal.status === "completed"
                  ? deal.completedDate
                  : deal.deadline || "Not specified"}
              </InfoCardValue>
            </InfoCardContent>
          </InfoCard>

          <InfoCard>
            <InfoCardIcon>
              <FileText size={20} color="#10b981" />
            </InfoCardIcon>
            <InfoCardContent>
              <InfoCardLabel>Category</InfoCardLabel>
              <InfoCardValue>{deal.category}</InfoCardValue>
            </InfoCardContent>
          </InfoCard>

          {deal.location && (
            <InfoCard>
              <InfoCardIcon>
                <MapPin size={20} color="#f59e0b" />
              </InfoCardIcon>
              <InfoCardContent>
                <InfoCardLabel>Location</InfoCardLabel>
                <InfoCardValue>{deal.location}</InfoCardValue>
              </InfoCardContent>
            </InfoCard>
          )}

          <InfoCard>
            <InfoCardIcon>
              <Clock size={20} color="#8b5cf6" />
            </InfoCardIcon>
            <InfoCardContent>
              <InfoCardLabel>Created</InfoCardLabel>
              <InfoCardValue>{deal.createdDate}</InfoCardValue>
            </InfoCardContent>
          </InfoCard>
        </InfoCardsSection>

        {/* Description Section */}
        <ContentSection>
          <SectionHeader>
            <SectionTitle>
              <MessageSquare size={20} />
              Campaign Description
            </SectionTitle>
          </SectionHeader>
          <Description>{deal.description}</Description>
        </ContentSection>

        {/* Deliverables Section */}
        <ContentSection>
          <SectionHeader>
            <SectionTitle>
              <Target size={20} />
              Required Deliverables
            </SectionTitle>
            <DeliverableCount>
              {deal.deliverables.length} items
            </DeliverableCount>
          </SectionHeader>
          <DeliverablesGrid>
            {deal.deliverables.map((deliverable, index) => (
              <DeliverableCard key={index}>
                <DeliverableIcon>
                  <CheckCircle size={16} color="#10b981" />
                </DeliverableIcon>
                <DeliverableText>{deliverable}</DeliverableText>
              </DeliverableCard>
            ))}
          </DeliverablesGrid>
        </ContentSection>

        {/* Performance Section (for completed deals) */}
        {deal.engagement && (
          <ContentSection>
            <SectionHeader>
              <SectionTitle>
                <TrendingUp size={20} />
                Performance Metrics
              </SectionTitle>
            </SectionHeader>
            <PerformanceGrid>
              <PerformanceCard>
                <PerformanceIcon>
                  <Users size={24} color="#e11d48" />
                </PerformanceIcon>
                <PerformanceValue>
                  {deal.engagement.likes?.toLocaleString()}
                </PerformanceValue>
                <PerformanceLabel>Likes</PerformanceLabel>
              </PerformanceCard>
              <PerformanceCard>
                <PerformanceIcon>
                  <MessageSquare size={24} color="#0ea5e9" />
                </PerformanceIcon>
                <PerformanceValue>{deal.engagement.comments}</PerformanceValue>
                <PerformanceLabel>Comments</PerformanceLabel>
              </PerformanceCard>
              <PerformanceCard>
                <PerformanceIcon>
                  <TrendingUp size={24} color="#10b981" />
                </PerformanceIcon>
                <PerformanceValue>{deal.engagement.shares}</PerformanceValue>
                <PerformanceLabel>Shares</PerformanceLabel>
              </PerformanceCard>
            </PerformanceGrid>
          </ContentSection>
        )}

        {/* Rating and Feedback Section (for completed deals) */}
        {deal.rating && deal.feedback && (
          <ContentSection>
            <SectionHeader>
              <SectionTitle>
                <Star size={20} />
                Brand Feedback
              </SectionTitle>
              <RatingDisplay>
                <RatingStars>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(deal.rating!) ? "#fbbf24" : "none"}
                      color="#fbbf24"
                    />
                  ))}
                </RatingStars>
                <RatingValue>{deal.rating}/5</RatingValue>
              </RatingDisplay>
            </SectionHeader>
            <FeedbackCard>
              <FeedbackText>"{deal.feedback}"</FeedbackText>
            </FeedbackCard>
          </ContentSection>
        )}

        {/* Campaign Guidelines Section */}
        <ContentSection>
          <SectionHeader>
            <SectionTitle>
              <FileText size={20} />
              Campaign Guidelines
            </SectionTitle>
          </SectionHeader>
          <GuidelinesCard>
            <GuidelinesList>
              <GuidelineItem>
                <GuidelineIcon>
                  <CheckCircle size={16} color="#10b981" />
                </GuidelineIcon>
                <GuidelineText>
                  Maintain authentic voice and style
                </GuidelineText>
              </GuidelineItem>
              <GuidelineItem>
                <GuidelineIcon>
                  <CheckCircle size={16} color="#10b981" />
                </GuidelineIcon>
                <GuidelineText>
                  Include required hashtags and mentions
                </GuidelineText>
              </GuidelineItem>
              <GuidelineItem>
                <GuidelineIcon>
                  <CheckCircle size={16} color="#10b981" />
                </GuidelineIcon>
                <GuidelineText>Follow FTC disclosure guidelines</GuidelineText>
              </GuidelineItem>
              <GuidelineItem>
                <GuidelineIcon>
                  <CheckCircle size={16} color="#10b981" />
                </GuidelineIcon>
                <GuidelineText>
                  Submit content for approval before posting
                </GuidelineText>
              </GuidelineItem>
              <GuidelineItem>
                <GuidelineIcon>
                  <CheckCircle size={16} color="#10b981" />
                </GuidelineIcon>
                <GuidelineText>
                  Provide analytics and performance data
                </GuidelineText>
              </GuidelineItem>
            </GuidelinesList>
          </GuidelinesCard>
        </ContentSection>

        {/* Payment Terms Section */}
        <ContentSection>
          <SectionHeader>
            <SectionTitle>
              <DollarSign size={20} />
              Payment Terms
            </SectionTitle>
          </SectionHeader>
          <PaymentCard>
            <PaymentGrid>
              <PaymentItem>
                <PaymentLabel>Total Amount</PaymentLabel>
                <PaymentValue>{deal.amount}</PaymentValue>
              </PaymentItem>
              <PaymentItem>
                <PaymentLabel>Payment Schedule</PaymentLabel>
                <PaymentValue>Upon completion</PaymentValue>
              </PaymentItem>
              <PaymentItem>
                <PaymentLabel>Payment Method</PaymentLabel>
                <PaymentValue>Bank transfer</PaymentValue>
              </PaymentItem>
              <PaymentItem>
                <PaymentLabel>Processing Time</PaymentLabel>
                <PaymentValue>5-7 business days</PaymentValue>
              </PaymentItem>
            </PaymentGrid>
          </PaymentCard>
        </ContentSection>

        {/* Contact Information */}
        <ContentSection>
          <SectionHeader>
            <SectionTitle>
              <Users size={20} />
              Brand Contact
            </SectionTitle>
          </SectionHeader>
          <ContactCard>
            <ContactInfo>
              <ContactItem>
                <ContactLabel>Campaign Manager</ContactLabel>
                <ContactValue>Sarah Johnson</ContactValue>
              </ContactItem>
              <ContactItem>
                <ContactLabel>Email</ContactLabel>
                <ContactValue>
                  sarah@{deal.brand.toLowerCase()}.com
                </ContactValue>
              </ContactItem>
              <ContactItem>
                <ContactLabel>Response Time</ContactLabel>
                <ContactValue>Within 24 hours</ContactValue>
              </ContactItem>
            </ContactInfo>
          </ContactCard>
        </ContentSection>
      </DetailsContainer>
    </Modal>
  );
};

// Styled Components
const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${sharedTheme.spacing.lg};
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: ${sharedTheme.spacing.md};
  background: #f8fafc;
  border-radius: ${sharedTheme.borderRadius.lg};
  border: 1px solid #e5e7eb;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${sharedTheme.spacing.md};
  }
`;

const BrandHeader = styled.div`
  display: flex;
  gap: ${sharedTheme.spacing.md};
  flex: 1;
`;

const BrandLogo = styled.img`
  width: 60px;
  height: 60px;
  border-radius: ${sharedTheme.borderRadius.md};
  object-fit: cover;
  border: 2px solid #e5e7eb;
`;

const BrandInfo = styled.div`
  flex: 1;
`;

const DealTitle = styled.h2`
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0 0 0.25rem 0;
  line-height: 1.3;
`;

const BrandName = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.md};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin: 0 0 0.5rem 0;
`;

const StatusBadge = styled.div<{ status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  background: ${(props) => getStatusColor(props.status)}20;
  color: ${(props) => getStatusColor(props.status)};
  border-radius: ${sharedTheme.borderRadius.full};
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  border: 1px solid ${(props) => getStatusColor(props.status)}40;
`;

const AmountSection = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const AmountValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xxl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.primary.light};
`;

const PriorityTag = styled.div<{ priority: string }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: ${(props) => getPriorityColor(props.priority)}20;
  color: ${(props) => getPriorityColor(props.priority)};
  border-radius: ${sharedTheme.borderRadius.sm};
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  justify-content: center;
`;

const InfoCardsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${sharedTheme.spacing.md};
`;

const InfoCard = styled.div`
  display: flex;
  align-items: center;
  gap: ${sharedTheme.spacing.sm};
  padding: ${sharedTheme.spacing.md};
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: ${sharedTheme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${sharedTheme.shadows.sm};
    border-color: ${sharedTheme.colorVariants.primary.light}40;
  }
`;

const InfoCardIcon = styled.div`
  flex-shrink: 0;
`;

const InfoCardContent = styled.div`
  flex: 1;
`;

const InfoCardLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin-bottom: 0.25rem;
`;

const InfoCardValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const ContentSection = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: ${sharedTheme.borderRadius.lg};
  overflow: hidden;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${sharedTheme.spacing.md};
  background: #f8fafc;
  border-bottom: 1px solid #e5e7eb;
`;

const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
`;

const DeliverableCount = styled.span`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
  background: #e5e7eb;
  padding: 0.25rem 0.5rem;
  border-radius: ${sharedTheme.borderRadius.full};
`;

const Description = styled.p`
  padding: ${sharedTheme.spacing.md};
  color: ${sharedTheme.colorVariants.secondary.light};
  font-size: ${sharedTheme.typography.fontSizes.sm};
  line-height: 1.6;
  margin: 0;
`;

const DeliverablesGrid = styled.div`
  padding: ${sharedTheme.spacing.md};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${sharedTheme.spacing.sm};
`;

const DeliverableCard = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: ${sharedTheme.spacing.sm};
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: ${sharedTheme.borderRadius.md};
`;

const DeliverableIcon = styled.div`
  flex-shrink: 0;
`;

const DeliverableText = styled.span`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
`;

const PerformanceGrid = styled.div`
  padding: ${sharedTheme.spacing.md};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${sharedTheme.spacing.md};
`;

const PerformanceCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${sharedTheme.spacing.md};
  background: #f8fafc;
  border-radius: ${sharedTheme.borderRadius.md};
  text-align: center;
`;

const PerformanceIcon = styled.div`
  margin-bottom: ${sharedTheme.spacing.sm};
`;

const PerformanceValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin-bottom: 0.25rem;
`;

const PerformanceLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
`;

const RatingDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RatingStars = styled.div`
  display: flex;
  gap: 0.125rem;
`;

const RatingValue = styled.span`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const FeedbackCard = styled.div`
  padding: ${sharedTheme.spacing.md};
  background: #fffbeb;
  border-top: 1px solid #e5e7eb;
`;

const FeedbackText = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  font-style: italic;
  margin: 0;
  line-height: 1.5;
`;

const GuidelinesCard = styled.div`
  padding: ${sharedTheme.spacing.md};
`;

const GuidelinesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${sharedTheme.spacing.sm};
`;

const GuidelineItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
`;

const GuidelineIcon = styled.div`
  flex-shrink: 0;
  margin-top: 2px;
`;

const GuidelineText = styled.span`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  line-height: 1.4;
`;

const PaymentCard = styled.div`
  padding: ${sharedTheme.spacing.md};
`;

const PaymentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${sharedTheme.spacing.md};
`;

const PaymentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const PaymentLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
`;

const PaymentValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
`;

const ContactCard = styled.div`
  padding: ${sharedTheme.spacing.md};
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${sharedTheme.spacing.md};
`;

const ContactItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ContactLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
`;

const ContactValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
`;

// Helper functions (should be outside component in real implementation)
function getStatusColor(status: string): string {
  switch (status) {
    case "pending":
      return "#f59e0b";
    case "active":
      return "#3b82f6";
    case "completed":
      return "#10b981";
    default:
      return "#6b7280";
  }
}

function getPriorityColor(priority: string): string {
  switch (priority) {
    case "High":
      return "#ef4444";
    case "Medium":
      return "#f59e0b";
    case "Low":
      return "#10b981";
    default:
      return "#6b7280";
  }
}

export default ViewDetailsModal;
