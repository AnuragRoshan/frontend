import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { sharedTheme } from "../../../styles/theme/theme";
import {
  Calendar,
  Clock,
  CheckCircle,
  BarChart2,
  FileText,
  MessageSquare,
  Tag,
  MapPin,
  Share2,
  ThumbsUp,
  Eye,
  Users,
  Award,
  Briefcase,
  Bookmark,
  ImageIcon,
  Paperclip,
  Send,
  Download,
  AlertCircle,
  Info,
  HelpCircle,
  ArrowLeft,
  Upload,
  Camera,
  Video,
  Zap,
  Flag,
  ExternalLink,
  Layers,
  Target,
  Sliders,
  Mail,
  Phone,
  User,
  Shield,
  Check,
  X,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  DollarSign,
} from "lucide-react";

// Sample data for a single campaign (would normally come from API)
const campaignData = {
  id: 1,
  title: "Summer Fashion Collection",
  brand: "StyleHub",
  brandLogo:
    "https://img.freepik.com/free-vector/colorful-letter-gradient-logo-design_474888-2309.jpg?semt=ais_hybrid&w=740",
  date: "May 15, 2025",
  payout: "₹5,000",
  status: "In Progress",
  statusVariant: "info",
  description:
    "Showcase our new summer collection with lifestyle photos and videos. We're looking for authentic content that highlights the versatility and comfort of our clothing line in real-world settings. The goal is to create relatable content that resonates with our target audience of fashion-forward individuals aged 18-35.",
  deadline: "May 25, 2025",
  requirements: ["2 Instagram Posts", "3 Stories", "1 Reel"],
  engagement: { likes: 1200, comments: 320, shares: 150 },
  category: "Fashion",
  location: "Mumbai",
  tags: ["summer", "fashion", "lifestyle", "clothing", "trendy", "casual"],
  priority: "High",
  brandContact: {
    name: "Priya Sharma",
    position: "Marketing Manager",
    email: "priya@stylehub.com",
    phone: "+91 98765 43210",
  },
  campaignBrief: {
    objective:
      "To increase brand awareness and drive engagement for our Summer 2025 collection launch.",
    targetAudience: {
      age: "18-35",
      gender: "All",
      interests: ["Fashion", "Lifestyle", "Travel", "Photography"],
      location: "India (Urban centers)",
    },
    contentGuidelines: [
      "Natural lighting preferred",
      "Showcase at least 2 different outfits from the collection",
      "Highlight the comfort and versatility of the clothing",
      "Include our branded hashtag #StyleHubSummer in all posts",
      "Tag @StyleHub_Official in all content",
      "Content should be authentic and align with your usual aesthetic",
    ],
    dosDonts: {
      dos: [
        "Show the clothing in real-life situations",
        "Highlight unique design elements",
        "Be authentic and genuine in your review",
        "Showcase how the items can be styled differently",
      ],
      donts: [
        "Don't mention competitor brands",
        "Avoid controversial topics or backgrounds",
        "Don't use heavy filters that alter the true colors of the clothing",
        "Don't make false claims about the products",
      ],
    },
    deliverables: {
      instagramPosts: {
        quantity: 2,
        specifications:
          "High-quality images showcasing the outfits in different settings",
        caption:
          "Must include product details, personal review, and required hashtags",
      },
      instagramStories: {
        quantity: 3,
        specifications:
          "Behind-the-scenes content, unboxing, or styling process",
        caption: "Must include @StyleHub_Official tag and swipe-up link",
      },
      instagramReel: {
        quantity: 1,
        specifications:
          "15-30 second video showcasing the versatility of the outfits",
        caption:
          "Must include product details, personal review, and required hashtags",
      },
    },
    timeline: {
      productDelivery: "May 10, 2025",
      contentSubmission: "May 20, 2025",
      contentApproval: "May 22, 2025",
      contentPublishing: "May 25, 2025",
    },
    paymentTerms: {
      amount: "₹5,000",
      releaseConditions: "50% upon content approval, 50% upon publishing",
      additionalIncentives:
        "₹1,000 bonus if content exceeds 20% of your average engagement rate",
    },
    productDetails: [
      {
        name: "Breeze Linen Shirt",
        description: "Lightweight linen shirt perfect for summer days",
        colors: ["White", "Beige", "Pastel Blue"],
        sizes: ["S", "M", "L", "XL"],
        retailPrice: "₹1,999",
      },
      {
        name: "Comfort Stretch Shorts",
        description: "Stretchable cotton shorts with deep pockets",
        colors: ["Navy", "Khaki", "Olive"],
        sizes: ["28", "30", "32", "34", "36"],
        retailPrice: "₹1,499",
      },
      {
        name: "Summer Breeze Dress",
        description: "Flowy midi dress with floral pattern",
        colors: ["Yellow Floral", "Blue Floral"],
        sizes: ["XS", "S", "M", "L"],
        retailPrice: "₹2,499",
      },
    ],
    brandGuidelines: {
      brandVoice: "Casual, friendly, and approachable",
      colorPalette: ["#FF9900", "#FFFFFF", "#333333", "#66CCFF"],
      moodBoard: "Link to mood board will be provided separately",
    },
  },
  submissionRequirements: {
    format: "JPG or PNG for images, MP4 for videos",
    resolution: "Minimum 1080x1080px for images, 1080p for videos",
    aspectRatio: "1:1 or 9:16 (for Stories and Reels)",
    fileSize: "Maximum 50MB per file",
    naming: "StyleHub_YourName_ContentType_Number",
  },
  performanceExpectations: {
    engagement: "Minimum 5% engagement rate",
    reach: "Expected to reach at least 50% of your followers",
    clicks: "Target of 100+ clicks on swipe-up links (for Stories)",
  },
  legalRequirements: {
    disclosureRequirements:
      "Must include #ad or #sponsored in a clearly visible manner",
    contentRights:
      "StyleHub will have the right to reuse the content on their own channels with credit",
    exclusivity:
      "No competing fashion brand collaborations for 15 days after posting",
  },
  additionalResources: [
    {
      name: "Brand Style Guide",
      type: "PDF",
      url: "#",
    },
    {
      name: "Product Catalog",
      type: "PDF",
      url: "#",
    },
    {
      name: "Campaign Mood Board",
      type: "Image",
      url: "#",
    },
  ],
  faqs: [
    {
      question: "Can I include other products in my content?",
      answer:
        "Yes, you can include non-competing products as long as StyleHub products remain the focus.",
    },
    {
      question: "What if I can't meet the deadline?",
      answer:
        "Please inform your campaign manager as soon as possible to discuss an extension.",
    },
    {
      question: "Can I edit the suggested captions?",
      answer:
        "Yes, you can adapt the captions to your style as long as all required elements are included.",
    },
  ],
  campaignManager: {
    name: "Rahul Verma",
    email: "rahul@stylehub.com",
    phone: "+91 87654 32109",
    availableHours: "10:00 AM - 6:00 PM IST",
  },
  previousCollaborations: [
    {
      influencer: "FashionWithPriya",
      content: "Link to previous collaboration",
      performance: "8.5% engagement rate",
    },
    {
      influencer: "StyleWithRahul",
      content: "Link to previous collaboration",
      performance: "10.2% engagement rate",
    },
  ],
  contentSubmissionStatus: {
    instagramPosts: "Pending",
    instagramStories: "Pending",
    instagramReel: "Pending",
  },
  approvalProcess: {
    steps: [
      "Submit draft content through the platform",
      "Receive feedback within 48 hours",
      "Make revisions if required",
      "Receive final approval",
      "Schedule and publish content",
      "Submit links to published content",
    ],
  },
  paymentSchedule: {
    firstPayment: {
      amount: "₹2,500",
      condition: "Upon content approval",
      status: "Pending",
    },
    finalPayment: {
      amount: "₹2,500",
      condition: "Upon content publishing",
      status: "Pending",
    },
    bonusPayment: {
      amount: "₹1,000",
      condition: "If engagement exceeds target",
      status: "Pending",
    },
  },
  campaignUpdates: [
    {
      date: "May 5, 2025",
      update: "Campaign created and influencers invited",
    },
    {
      date: "May 8, 2025",
      update: "You accepted the campaign invitation",
    },
    {
      date: "May 10, 2025",
      update: "Products shipped to your address",
    },
  ],
  messages: [
    {
      sender: "Priya Sharma",
      timestamp: "May 8, 2025 - 10:30 AM",
      message:
        "Hi there! We're excited to work with you on this campaign. Let me know if you have any questions about the brief.",
      isRead: true,
    },
    {
      sender: "You",
      timestamp: "May 8, 2025 - 11:45 AM",
      message:
        "Thanks Priya! I'm looking forward to it too. Could you provide more details about the specific outfits I'll be receiving?",
      isRead: true,
    },
    {
      sender: "Priya Sharma",
      timestamp: "May 8, 2025 - 2:15 PM",
      message:
        "Of course! We'll be sending you the Breeze Linen Shirt in White (size as per your profile), Comfort Stretch Shorts in Navy, and the Summer Breeze Dress in Yellow Floral. You should receive them by May 10th.",
      isRead: true,
    },
  ],
};

const CampaignDetail = () => {
  const { id } = useParams();
  const isCreator = true; // Change this based on actual logic
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [campaign, setCampaign] = useState(campaignData);
  const [newMessage, setNewMessage] = useState("");
  // const [isContentSubmissionOpen, setIsContentSubmissionOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isLegalOpen, setIsLegalOpen] = useState(false);

  // Simulate fetching campaign data
  useEffect(() => {
    // In a real app, you would fetch the campaign data based on the ID
    console.log(`Fetching campaign with ID: ${id}`);
    // For now, we'll just use our sample data
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleMessageSend = () => {
    if (newMessage.trim()) {
      const updatedMessages = [
        ...campaign.messages,
        {
          sender: "You",
          timestamp: new Date().toLocaleString(),
          message: newMessage,
          isRead: true,
        },
      ];
      setCampaign({ ...campaign, messages: updatedMessages });
      setNewMessage("");
    }
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <PageContainer>
      <BackButton onClick={handleBack}>
        <ArrowLeft size={20} />
        Back to Campaigns
      </BackButton>

      <PageHeader>
        <HeaderTop>
          <div>
            <CampaignStatusWrapper>
              <PageTitle>{campaign.title}</PageTitle>
              <Badge
                variant={
                  (campaign.statusVariant === "error"
                    ? "default"
                    : campaign.statusVariant) as
                    | "info"
                    | "success"
                    | "warning"
                    | "default"
                }
              >
                {campaign.status}
              </Badge>
            </CampaignStatusWrapper>
            <BrandInfo>
              <BrandLogo>
                <img
                  src={campaign.brandLogo || "/placeholder.svg"}
                  alt={campaign.brand}
                />
              </BrandLogo>
              <BrandName>{campaign.brand}</BrandName>
            </BrandInfo>
          </div>
          <HeaderActions>
            <ActionButton>
              <Bookmark size={18} />
              Save
            </ActionButton>
            <ActionButton>
              <Share2 size={18} />
              Share
            </ActionButton>
            <ActionButton primary>
              <MessageSquare size={18} />
              Message Brand
            </ActionButton>
          </HeaderActions>
        </HeaderTop>
      </PageHeader>

      <MainContent>
        <LeftColumn>
          <TabsContainer>
            <TabButton
              active={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
            >
              <Info size={16} />
              Overview
            </TabButton>
            <TabButton
              active={activeTab === "brief"}
              onClick={() => setActiveTab("brief")}
            >
              <FileText size={16} />
              Campaign Brief
            </TabButton>
            {isCreator && (
              <>
                <TabButton
                  active={activeTab === "submission"}
                  onClick={() => setActiveTab("submission")}
                >
                  <Upload size={16} />
                  Content Submission
                </TabButton>
                <TabButton
                  active={activeTab === "messages"}
                  onClick={() => setActiveTab("messages")}
                >
                  <MessageSquare size={16} />
                  Messages
                  <UnreadBadge>1</UnreadBadge>
                </TabButton>
              </>
            )}
            <TabButton
              active={activeTab === "payment"}
              onClick={() => setActiveTab("payment")}
            >
              <DollarSign size={16} />
              Payment
            </TabButton>
          </TabsContainer>

          {activeTab === "overview" && (
            <TabContent>
              <SectionTitle>Campaign Overview</SectionTitle>
              <OverviewSection>
                <OverviewDescription>
                  {campaign.description}
                </OverviewDescription>

                <DetailGrid>
                  <DetailItem>
                    <DetailIcon>
                      <Calendar size={18} />
                    </DetailIcon>
                    <DetailContent>
                      <DetailLabel>Start Date</DetailLabel>
                      <DetailValue>{campaign.date}</DetailValue>
                    </DetailContent>
                  </DetailItem>

                  <DetailItem>
                    <DetailIcon>
                      <Clock size={18} />
                    </DetailIcon>
                    <DetailContent>
                      <DetailLabel>Deadline</DetailLabel>
                      <DetailValue>{campaign.deadline}</DetailValue>
                    </DetailContent>
                  </DetailItem>

                  <DetailItem>
                    <DetailIcon>
                      <DollarSign size={18} />
                    </DetailIcon>
                    <DetailContent>
                      <DetailLabel>Payout</DetailLabel>
                      <DetailValue highlight>{campaign.payout}</DetailValue>
                    </DetailContent>
                  </DetailItem>

                  <DetailItem>
                    <DetailIcon>
                      <Tag size={18} />
                    </DetailIcon>
                    <DetailContent>
                      <DetailLabel>Category</DetailLabel>
                      <DetailValue>{campaign.category}</DetailValue>
                    </DetailContent>
                  </DetailItem>

                  <DetailItem>
                    <DetailIcon>
                      <MapPin size={18} />
                    </DetailIcon>
                    <DetailContent>
                      <DetailLabel>Location</DetailLabel>
                      <DetailValue>{campaign.location}</DetailValue>
                    </DetailContent>
                  </DetailItem>

                  <DetailItem>
                    <DetailIcon>
                      <Zap size={18} />
                    </DetailIcon>
                    <DetailContent>
                      <DetailLabel>Priority</DetailLabel>
                      <DetailValue>{campaign.priority}</DetailValue>
                    </DetailContent>
                  </DetailItem>
                </DetailGrid>

                <SectionSubtitle>Deliverables</SectionSubtitle>
                <DeliverablesList>
                  {campaign.requirements.map((req, index) => (
                    <DeliverableItem key={index}>
                      <CheckCircle size={16} />
                      <span>{req}</span>
                    </DeliverableItem>
                  ))}
                </DeliverablesList>

                <SectionSubtitle>Campaign Tags</SectionSubtitle>
                <TagsContainer>
                  {campaign.tags.map((tag, index) => (
                    <TagItem key={index}>#{tag}</TagItem>
                  ))}
                </TagsContainer>

                <SectionSubtitle>Brand Contact</SectionSubtitle>
                <ContactCard>
                  <ContactHeader>
                    <User size={18} />
                    <div>
                      <ContactName>{campaign.brandContact.name}</ContactName>
                      <ContactPosition>
                        {campaign.brandContact.position}
                      </ContactPosition>
                    </div>
                  </ContactHeader>
                  <ContactInfo>
                    <ContactDetail>
                      <Mail size={16} />
                      <span>{campaign.brandContact.email}</span>
                    </ContactDetail>
                    <ContactDetail>
                      <Phone size={16} />
                      <span>{campaign.brandContact.phone}</span>
                    </ContactDetail>
                  </ContactInfo>
                </ContactCard>

                {/* <SectionSubtitle>Campaign Timeline</SectionSubtitle>
                <Timeline>
                  {campaign.campaignUpdates.map((update, index) => (
                    <TimelineItem
                      key={index}
                      isLast={index === campaign.campaignUpdates.length - 1}
                    >
                      <TimelinePoint />
                      <TimelineContent>
                        <TimelineDate>{update.date}</TimelineDate>
                        <TimelineText>{update.update}</TimelineText>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                  <TimelineItem isLast={true} isFuture={true}>
                    <TimelinePoint isFuture={true} />
                    <TimelineContent>
                      <TimelineDate>May 20, 2025</TimelineDate>
                      <TimelineText>Content submission deadline</TimelineText>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem isLast={true} isFuture={true}>
                    <TimelinePoint isFuture={true} />
                    <TimelineContent>
                      <TimelineDate>May 25, 2025</TimelineDate>
                      <TimelineText>Content publishing deadline</TimelineText>
                    </TimelineContent>
                  </TimelineItem>
                </Timeline> */}

                <CollapsibleSection
                  title="Additional Resources"
                  icon={<Paperclip size={18} />}
                  isOpen={isResourcesOpen}
                  onToggle={() => setIsResourcesOpen(!isResourcesOpen)}
                >
                  <ResourcesList>
                    {campaign.additionalResources.map((resource, index) => (
                      <ResourceItem key={index}>
                        {resource.type === "PDF" ? (
                          <FileText size={16} />
                        ) : (
                          <ImageIcon size={16} />
                        )}
                        <ResourceName>{resource.name}</ResourceName>
                        <DownloadButton>
                          <Download size={14} />
                          Download
                        </DownloadButton>
                      </ResourceItem>
                    ))}
                  </ResourcesList>
                </CollapsibleSection>

                <CollapsibleSection
                  title="Frequently Asked Questions"
                  icon={<HelpCircle size={18} />}
                  isOpen={isFaqOpen}
                  onToggle={() => setIsFaqOpen(!isFaqOpen)}
                >
                  <FaqList>
                    {campaign.faqs.map((faq, index) => (
                      <FaqItem key={index}>
                        <FaqQuestion onClick={() => toggleFaq(index)}>
                          {expandedFaq === index ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                          {faq.question}
                        </FaqQuestion>
                        {expandedFaq === index && (
                          <FaqAnswer>{faq.answer}</FaqAnswer>
                        )}
                      </FaqItem>
                    ))}
                  </FaqList>
                </CollapsibleSection>

                <CollapsibleSection
                  title="Legal Requirements"
                  icon={<Shield size={18} />}
                  isOpen={isLegalOpen}
                  onToggle={() => setIsLegalOpen(!isLegalOpen)}
                >
                  <LegalRequirements>
                    <LegalItem>
                      <LegalTitle>Disclosure Requirements</LegalTitle>
                      <LegalText>
                        {campaign.legalRequirements.disclosureRequirements}
                      </LegalText>
                    </LegalItem>
                    <LegalItem>
                      <LegalTitle>Content Rights</LegalTitle>
                      <LegalText>
                        {campaign.legalRequirements.contentRights}
                      </LegalText>
                    </LegalItem>
                    <LegalItem>
                      <LegalTitle>Exclusivity</LegalTitle>
                      <LegalText>
                        {campaign.legalRequirements.exclusivity}
                      </LegalText>
                    </LegalItem>
                  </LegalRequirements>
                </CollapsibleSection>
              </OverviewSection>
            </TabContent>
          )}

          {activeTab === "brief" && (
            <TabContent>
              <SectionTitle>Campaign Brief</SectionTitle>
              <BriefSection>
                <BriefItem>
                  <BriefTitle>
                    <Target size={18} />
                    Campaign Objective
                  </BriefTitle>
                  <BriefContent>
                    {campaign.campaignBrief.objective}
                  </BriefContent>
                </BriefItem>

                <BriefItem>
                  <BriefTitle>
                    <Users size={18} />
                    Target Audience
                  </BriefTitle>
                  <AudienceGrid>
                    <AudienceItem>
                      <AudienceLabel>Age</AudienceLabel>
                      <AudienceValue>
                        {campaign.campaignBrief.targetAudience.age}
                      </AudienceValue>
                    </AudienceItem>
                    <AudienceItem>
                      <AudienceLabel>Gender</AudienceLabel>
                      <AudienceValue>
                        {campaign.campaignBrief.targetAudience.gender}
                      </AudienceValue>
                    </AudienceItem>
                    <AudienceItem>
                      <AudienceLabel>Location</AudienceLabel>
                      <AudienceValue>
                        {campaign.campaignBrief.targetAudience.location}
                      </AudienceValue>
                    </AudienceItem>
                    <AudienceItem fullWidth>
                      <AudienceLabel>Interests</AudienceLabel>
                      <InterestTags>
                        {campaign.campaignBrief.targetAudience.interests.map(
                          (interest, index) => (
                            <InterestTag key={index}>{interest}</InterestTag>
                          )
                        )}
                      </InterestTags>
                    </AudienceItem>
                  </AudienceGrid>
                </BriefItem>

                <BriefItem>
                  <BriefTitle>
                    <FileText size={18} />
                    Content Guidelines
                  </BriefTitle>
                  <GuidelinesList>
                    {campaign.campaignBrief.contentGuidelines.map(
                      (guideline, index) => (
                        <GuidelineItem key={index}>
                          <Check size={16} />
                          {guideline}
                        </GuidelineItem>
                      )
                    )}
                  </GuidelinesList>
                </BriefItem>

                <BriefItem>
                  <BriefTitle>
                    <CheckCircle size={18} />
                    Dos and Don'ts
                  </BriefTitle>
                  <DosAndDonts>
                    <DosSection>
                      <DosTitle>
                        <Check size={16} />
                        Dos
                      </DosTitle>
                      <DosList>
                        {campaign.campaignBrief.dosDonts.dos.map(
                          (item, index) => (
                            <DosItem key={index}>{item}</DosItem>
                          )
                        )}
                      </DosList>
                    </DosSection>
                    <DontsSection>
                      <DontsTitle>
                        <X size={16} />
                        Don'ts
                      </DontsTitle>
                      <DontsList>
                        {campaign.campaignBrief.dosDonts.donts.map(
                          (item, index) => (
                            <DontsItem key={index}>{item}</DontsItem>
                          )
                        )}
                      </DontsList>
                    </DontsSection>
                  </DosAndDonts>
                </BriefItem>

                <BriefItem>
                  <BriefTitle>
                    <Layers size={18} />
                    Deliverables
                  </BriefTitle>
                  <DeliverablesTable>
                    <thead>
                      <tr>
                        <th>Content Type</th>
                        <th>Quantity</th>
                        <th>Specifications</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Instagram Posts</td>
                        <td>
                          {
                            campaign.campaignBrief.deliverables.instagramPosts
                              .quantity
                          }
                        </td>
                        <td>
                          {
                            campaign.campaignBrief.deliverables.instagramPosts
                              .specifications
                          }
                        </td>
                      </tr>
                      <tr>
                        <td>Instagram Stories</td>
                        <td>
                          {
                            campaign.campaignBrief.deliverables.instagramStories
                              .quantity
                          }
                        </td>
                        <td>
                          {
                            campaign.campaignBrief.deliverables.instagramStories
                              .specifications
                          }
                        </td>
                      </tr>
                      <tr>
                        <td>Instagram Reel</td>
                        <td>
                          {
                            campaign.campaignBrief.deliverables.instagramReel
                              .quantity
                          }
                        </td>
                        <td>
                          {
                            campaign.campaignBrief.deliverables.instagramReel
                              .specifications
                          }
                        </td>
                      </tr>
                    </tbody>
                  </DeliverablesTable>
                </BriefItem>

                <BriefItem>
                  <BriefTitle>
                    <Clock size={18} />
                    Timeline
                  </BriefTitle>
                  <TimelineTable>
                    <tbody>
                      <tr>
                        <td>Product Delivery</td>
                        <td>
                          {campaign.campaignBrief.timeline.productDelivery}
                        </td>
                      </tr>
                      <tr>
                        <td>Content Submission</td>
                        <td>
                          {campaign.campaignBrief.timeline.contentSubmission}
                        </td>
                      </tr>
                      <tr>
                        <td>Content Approval</td>
                        <td>
                          {campaign.campaignBrief.timeline.contentApproval}
                        </td>
                      </tr>
                      <tr>
                        <td>Content Publishing</td>
                        <td>
                          {campaign.campaignBrief.timeline.contentPublishing}
                        </td>
                      </tr>
                    </tbody>
                  </TimelineTable>
                </BriefItem>

                <BriefItem>
                  <BriefTitle>
                    <DollarSign size={18} />
                    Payment Terms
                  </BriefTitle>
                  <PaymentTermsTable>
                    <tbody>
                      <tr>
                        <td>Total Amount</td>
                        <td>{campaign.campaignBrief.paymentTerms.amount}</td>
                      </tr>
                      <tr>
                        <td>Release Conditions</td>
                        <td>
                          {
                            campaign.campaignBrief.paymentTerms
                              .releaseConditions
                          }
                        </td>
                      </tr>
                      <tr>
                        <td>Additional Incentives</td>
                        <td>
                          {
                            campaign.campaignBrief.paymentTerms
                              .additionalIncentives
                          }
                        </td>
                      </tr>
                    </tbody>
                  </PaymentTermsTable>
                </BriefItem>

                <BriefItem>
                  <BriefTitle>
                    <Briefcase size={18} />
                    Product Details
                  </BriefTitle>
                  <ProductsGrid>
                    {campaign.campaignBrief.productDetails.map(
                      (product, index) => (
                        <ProductCard key={index}>
                          <ProductImage>
                            <ImageIcon size={40} />
                          </ProductImage>
                          <ProductInfo>
                            <ProductName>{product.name}</ProductName>
                            <ProductDescription>
                              {product.description}
                            </ProductDescription>
                            <ProductMeta>
                              <ProductMetaItem>
                                <strong>Colors:</strong>{" "}
                                {product.colors.join(", ")}
                              </ProductMetaItem>
                              <ProductMetaItem>
                                <strong>Sizes:</strong>{" "}
                                {product.sizes.join(", ")}
                              </ProductMetaItem>
                              <ProductMetaItem>
                                <strong>Price:</strong> {product.retailPrice}
                              </ProductMetaItem>
                            </ProductMeta>
                          </ProductInfo>
                        </ProductCard>
                      )
                    )}
                  </ProductsGrid>
                </BriefItem>

                <BriefItem>
                  <BriefTitle>
                    <Sliders size={18} />
                    Brand Guidelines
                  </BriefTitle>
                  <BrandGuidelinesContent>
                    <GuidelineItem>
                      <GuidelineLabel>Brand Voice</GuidelineLabel>
                      <GuidelineValue>
                        {campaign.campaignBrief.brandGuidelines.brandVoice}
                      </GuidelineValue>
                    </GuidelineItem>
                    <GuidelineItem>
                      <GuidelineLabel>Color Palette</GuidelineLabel>
                      <ColorPalette>
                        {campaign.campaignBrief.brandGuidelines.colorPalette.map(
                          (color, index) => (
                            <ColorSwatch key={index} color={color} />
                          )
                        )}
                      </ColorPalette>
                    </GuidelineItem>
                    <GuidelineItem>
                      <GuidelineLabel>Mood Board</GuidelineLabel>
                      <GuidelineValue>
                        {campaign.campaignBrief.brandGuidelines.moodBoard}
                      </GuidelineValue>
                    </GuidelineItem>
                  </BrandGuidelinesContent>
                </BriefItem>

                <BriefItem>
                  <BriefTitle>
                    <Upload size={18} />
                    Submission Requirements
                  </BriefTitle>
                  <SubmissionRequirementsList>
                    <SubmissionRequirement>
                      <RequirementLabel>Format</RequirementLabel>
                      <RequirementValue>
                        {campaign.submissionRequirements.format}
                      </RequirementValue>
                    </SubmissionRequirement>
                    <SubmissionRequirement>
                      <RequirementLabel>Resolution</RequirementLabel>
                      <RequirementValue>
                        {campaign.submissionRequirements.resolution}
                      </RequirementValue>
                    </SubmissionRequirement>
                    <SubmissionRequirement>
                      <RequirementLabel>Aspect Ratio</RequirementLabel>
                      <RequirementValue>
                        {campaign.submissionRequirements.aspectRatio}
                      </RequirementValue>
                    </SubmissionRequirement>
                    <SubmissionRequirement>
                      <RequirementLabel>File Size</RequirementLabel>
                      <RequirementValue>
                        {campaign.submissionRequirements.fileSize}
                      </RequirementValue>
                    </SubmissionRequirement>
                    <SubmissionRequirement>
                      <RequirementLabel>File Naming</RequirementLabel>
                      <RequirementValue>
                        {campaign.submissionRequirements.naming}
                      </RequirementValue>
                    </SubmissionRequirement>
                  </SubmissionRequirementsList>
                </BriefItem>

                <BriefItem>
                  <BriefTitle>
                    <BarChart2 size={18} />
                    Performance Expectations
                  </BriefTitle>
                  <PerformanceExpectationsList>
                    <PerformanceExpectation>
                      <ExpectationIcon>
                        <ThumbsUp size={16} />
                      </ExpectationIcon>
                      <ExpectationContent>
                        <ExpectationLabel>Engagement</ExpectationLabel>
                        <ExpectationValue>
                          {campaign.performanceExpectations.engagement}
                        </ExpectationValue>
                      </ExpectationContent>
                    </PerformanceExpectation>
                    <PerformanceExpectation>
                      <ExpectationIcon>
                        <Eye size={16} />
                      </ExpectationIcon>
                      <ExpectationContent>
                        <ExpectationLabel>Reach</ExpectationLabel>
                        <ExpectationValue>
                          {campaign.performanceExpectations.reach}
                        </ExpectationValue>
                      </ExpectationContent>
                    </PerformanceExpectation>
                    <PerformanceExpectation>
                      <ExpectationIcon>
                        <ExternalLink size={16} />
                      </ExpectationIcon>
                      <ExpectationContent>
                        <ExpectationLabel>Clicks</ExpectationLabel>
                        <ExpectationValue>
                          {campaign.performanceExpectations.clicks}
                        </ExpectationValue>
                      </ExpectationContent>
                    </PerformanceExpectation>
                  </PerformanceExpectationsList>
                </BriefItem>
              </BriefSection>
            </TabContent>
          )}

          {isCreator && activeTab === "submission" && (
            <TabContent>
              <SectionTitle>Content Submission</SectionTitle>
              <SubmissionSection>
                <SubmissionHeader>
                  <div>
                    <SubmissionTitle>Submit Your Content</SubmissionTitle>
                    <SubmissionDescription>
                      Upload your content for review and approval before
                      publishing.
                    </SubmissionDescription>
                  </div>
                  <SubmissionDeadline>
                    <Clock size={16} />
                    Deadline:{" "}
                    {campaign.campaignBrief.timeline.contentSubmission}
                  </SubmissionDeadline>
                </SubmissionHeader>

                <SubmissionRequirementsCard>
                  <RequirementsCardHeader>
                    <AlertCircle size={18} />
                    Submission Requirements
                  </RequirementsCardHeader>
                  <RequirementsCardContent>
                    <RequirementsList>
                      <RequirementsListItem>
                        <Check size={14} />
                        Format: {campaign.submissionRequirements.format}
                      </RequirementsListItem>
                      <RequirementsListItem>
                        <Check size={14} />
                        Resolution: {campaign.submissionRequirements.resolution}
                      </RequirementsListItem>
                      <RequirementsListItem>
                        <Check size={14} />
                        Aspect Ratio:{" "}
                        {campaign.submissionRequirements.aspectRatio}
                      </RequirementsListItem>
                      <RequirementsListItem>
                        <Check size={14} />
                        File Size: {campaign.submissionRequirements.fileSize}
                      </RequirementsListItem>
                    </RequirementsList>
                  </RequirementsCardContent>
                </SubmissionRequirementsCard>

                <SubmissionTypes>
                  <SubmissionType>
                    <SubmissionTypeHeader>
                      <SubmissionTypeTitle>
                        Instagram Posts (2)
                      </SubmissionTypeTitle>
                      <SubmissionStatus
                        status={campaign.contentSubmissionStatus.instagramPosts}
                      >
                        {campaign.contentSubmissionStatus.instagramPosts}
                      </SubmissionStatus>
                    </SubmissionTypeHeader>
                    <SubmissionTypeDescription>
                      High-quality images showcasing the outfits in different
                      settings
                    </SubmissionTypeDescription>
                    <UploadArea>
                      <UploadIcon>
                        <ImageIcon size={24} />
                      </UploadIcon>
                      <UploadText>
                        Drag and drop your images here, or{" "}
                        <UploadButton>browse files</UploadButton>
                      </UploadText>
                      <UploadSubtext>
                        JPG or PNG, max 50MB per file
                      </UploadSubtext>
                    </UploadArea>
                    <CaptionSection>
                      <CaptionLabel>Proposed Caption</CaptionLabel>
                      <CaptionTextarea
                        placeholder="Enter your proposed caption including hashtags and mentions..."
                        rows={4}
                      />
                      <CaptionTips>
                        <InfoTip>
                          <Info size={14} />
                          Remember to include #StyleHubSummer and
                          @StyleHub_Official
                        </InfoTip>
                        <InfoTip>
                          <Info size={14} />
                          Don't forget to add #ad or #sponsored
                        </InfoTip>
                      </CaptionTips>
                    </CaptionSection>
                  </SubmissionType>

                  <SubmissionType>
                    <SubmissionTypeHeader>
                      <SubmissionTypeTitle>
                        Instagram Stories (3)
                      </SubmissionTypeTitle>
                      <SubmissionStatus
                        status={
                          campaign.contentSubmissionStatus.instagramStories
                        }
                      >
                        {campaign.contentSubmissionStatus.instagramStories}
                      </SubmissionStatus>
                    </SubmissionTypeHeader>
                    <SubmissionTypeDescription>
                      Behind-the-scenes content, unboxing, or styling process
                    </SubmissionTypeDescription>
                    <UploadArea>
                      <UploadIcon>
                        <Camera size={24} />
                      </UploadIcon>
                      <UploadText>
                        Drag and drop your images here, or{" "}
                        <UploadButton>browse files</UploadButton>
                      </UploadText>
                      <UploadSubtext>
                        JPG, PNG or MP4, max 50MB per file
                      </UploadSubtext>
                    </UploadArea>
                    <StoryDetailsSection>
                      <StoryDetailItem>
                        <StoryDetailLabel>Swipe-Up Link</StoryDetailLabel>
                        <StoryDetailInput
                          placeholder="Enter the swipe-up link you'll use..."
                          type="url"
                        />
                      </StoryDetailItem>
                      <StoryDetailItem>
                        <StoryDetailLabel>Story Mentions</StoryDetailLabel>
                        <StoryDetailInput
                          placeholder="@StyleHub_Official"
                          type="text"
                        />
                      </StoryDetailItem>
                    </StoryDetailsSection>
                  </SubmissionType>

                  <SubmissionType>
                    <SubmissionTypeHeader>
                      <SubmissionTypeTitle>
                        Instagram Reel (1)
                      </SubmissionTypeTitle>
                      <SubmissionStatus
                        status={campaign.contentSubmissionStatus.instagramReel}
                      >
                        {campaign.contentSubmissionStatus.instagramReel}
                      </SubmissionStatus>
                    </SubmissionTypeHeader>
                    <SubmissionTypeDescription>
                      15-30 second video showcasing the versatility of the
                      outfits
                    </SubmissionTypeDescription>
                    <UploadArea>
                      <UploadIcon>
                        <Video size={24} />
                      </UploadIcon>
                      <UploadText>
                        Drag and drop your video here, or{" "}
                        <UploadButton>browse files</UploadButton>
                      </UploadText>
                      <UploadSubtext>MP4, max 50MB</UploadSubtext>
                    </UploadArea>
                    <CaptionSection>
                      <CaptionLabel>Proposed Caption</CaptionLabel>
                      <CaptionTextarea
                        placeholder="Enter your proposed caption including hashtags and mentions..."
                        rows={4}
                      />
                      <CaptionTips>
                        <InfoTip>
                          <Info size={14} />
                          Remember to include #StyleHubSummer and
                          @StyleHub_Official
                        </InfoTip>
                        <InfoTip>
                          <Info size={14} />
                          Don't forget to add #ad or #sponsored
                        </InfoTip>
                      </CaptionTips>
                    </CaptionSection>
                    <MusicSection>
                      <MusicLabel>Music Selection</MusicLabel>
                      <MusicInput
                        placeholder="Enter the song name and artist you'll use..."
                        type="text"
                      />
                    </MusicSection>
                  </SubmissionType>
                </SubmissionTypes>

                <SubmissionActions>
                  <SubmissionNote>
                    <AlertTriangle size={16} />
                    Your content will be reviewed within 48 hours after
                    submission.
                  </SubmissionNote>
                  <SubmissionButtons>
                    <ActionButton>Save as Draft</ActionButton>
                    <ActionButton primary>Submit for Review</ActionButton>
                  </SubmissionButtons>
                </SubmissionActions>
              </SubmissionSection>
            </TabContent>
          )}

          {isCreator && activeTab === "messages" && (
            <TabContent>
              <SectionTitle>Messages</SectionTitle>
              <MessagesSection>
                <MessagesList>
                  {campaign.messages.map((message, index) => (
                    <MessageItem key={index} isUser={message.sender === "You"}>
                      <MessageContent isUser={message.sender === "You"}>
                        <MessageSender>
                          {message.sender === "You" ? "You" : message.sender}
                        </MessageSender>
                        <MessageText>{message.message}</MessageText>
                        <MessageTime>{message.timestamp}</MessageTime>
                      </MessageContent>
                    </MessageItem>
                  ))}
                </MessagesList>
                <MessageComposer>
                  <MessageInput
                    placeholder="Type your message here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleMessageSend();
                      }
                    }}
                  />
                  <MessageActions>
                    <MessageAttachButton>
                      <Paperclip size={18} />
                    </MessageAttachButton>
                    <MessageSendButton onClick={handleMessageSend}>
                      <Send size={18} />
                    </MessageSendButton>
                  </MessageActions>
                </MessageComposer>
              </MessagesSection>
            </TabContent>
          )}

          {activeTab === "payment" && (
            <TabContent>
              <SectionTitle>Payment Details</SectionTitle>
              <PaymentSection>
                <PaymentOverview>
                  <PaymentCard>
                    <PaymentCardHeader>
                      <PaymentCardTitle>Total Campaign Value</PaymentCardTitle>
                      <PaymentCardAmount>
                        {campaign.campaignBrief.paymentTerms.amount}
                      </PaymentCardAmount>
                    </PaymentCardHeader>
                    <PaymentCardContent>
                      <PaymentCardDetail>
                        <PaymentDetailLabel>Base Payment</PaymentDetailLabel>
                        <PaymentDetailValue>
                          {campaign.campaignBrief.paymentTerms.amount}
                        </PaymentDetailValue>
                      </PaymentCardDetail>
                      <PaymentCardDetail>
                        <PaymentDetailLabel>Potential Bonus</PaymentDetailLabel>
                        <PaymentDetailValue>₹1,000</PaymentDetailValue>
                      </PaymentCardDetail>
                      <PaymentCardNote>
                        <AlertCircle size={14} />
                        Bonus applies if engagement exceeds 20% of your average
                        rate
                      </PaymentCardNote>
                    </PaymentCardContent>
                  </PaymentCard>

                  <PaymentScheduleCard>
                    <PaymentCardHeader>
                      <PaymentCardTitle>Payment Schedule</PaymentCardTitle>
                    </PaymentCardHeader>
                    <PaymentScheduleContent>
                      <PaymentScheduleItem>
                        <PaymentScheduleInfo>
                          <PaymentScheduleAmount>
                            {campaign.paymentSchedule.firstPayment.amount}
                          </PaymentScheduleAmount>
                          <PaymentScheduleCondition>
                            {campaign.paymentSchedule.firstPayment.condition}
                          </PaymentScheduleCondition>
                        </PaymentScheduleInfo>
                        <PaymentScheduleStatus
                          status={campaign.paymentSchedule.firstPayment.status}
                        >
                          {campaign.paymentSchedule.firstPayment.status}
                        </PaymentScheduleStatus>
                      </PaymentScheduleItem>
                      <PaymentScheduleItem>
                        <PaymentScheduleInfo>
                          <PaymentScheduleAmount>
                            {campaign.paymentSchedule.finalPayment.amount}
                          </PaymentScheduleAmount>
                          <PaymentScheduleCondition>
                            {campaign.paymentSchedule.finalPayment.condition}
                          </PaymentScheduleCondition>
                        </PaymentScheduleInfo>
                        <PaymentScheduleStatus
                          status={campaign.paymentSchedule.finalPayment.status}
                        >
                          {campaign.paymentSchedule.finalPayment.status}
                        </PaymentScheduleStatus>
                      </PaymentScheduleItem>
                      <PaymentScheduleItem>
                        <PaymentScheduleInfo>
                          <PaymentScheduleAmount>
                            {campaign.paymentSchedule.bonusPayment.amount}
                          </PaymentScheduleAmount>
                          <PaymentScheduleCondition>
                            {campaign.paymentSchedule.bonusPayment.condition}
                          </PaymentScheduleCondition>
                        </PaymentScheduleInfo>
                        <PaymentScheduleStatus
                          status={campaign.paymentSchedule.bonusPayment.status}
                        >
                          {campaign.paymentSchedule.bonusPayment.status}
                        </PaymentScheduleStatus>
                      </PaymentScheduleItem>
                    </PaymentScheduleContent>
                  </PaymentScheduleCard>
                </PaymentOverview>

                <PaymentProcessSection>
                  <SectionSubtitle>Payment Process</SectionSubtitle>
                  <PaymentProcessSteps>
                    <PaymentProcessStep>
                      <PaymentStepNumber>1</PaymentStepNumber>
                      <PaymentStepContent>
                        <PaymentStepTitle>Content Approval</PaymentStepTitle>
                        <PaymentStepDescription>
                          First payment released when your content is approved
                        </PaymentStepDescription>
                      </PaymentStepContent>
                    </PaymentProcessStep>
                    <PaymentProcessStep>
                      <PaymentStepNumber>2</PaymentStepNumber>
                      <PaymentStepContent>
                        <PaymentStepTitle>Content Publishing</PaymentStepTitle>
                        <PaymentStepDescription>
                          Second payment released after content is published
                        </PaymentStepDescription>
                      </PaymentStepContent>
                    </PaymentProcessStep>
                    <PaymentProcessStep>
                      <PaymentStepNumber>3</PaymentStepNumber>
                      <PaymentStepContent>
                        <PaymentStepTitle>
                          Performance Evaluation
                        </PaymentStepTitle>
                        <PaymentStepDescription>
                          Bonus payment if performance targets are met
                        </PaymentStepDescription>
                      </PaymentStepContent>
                    </PaymentProcessStep>
                  </PaymentProcessSteps>
                </PaymentProcessSection>

                <PaymentMethodSection>
                  <SectionSubtitle>Payment Method</SectionSubtitle>
                  <PaymentMethodCard>
                    <PaymentMethodHeader>
                      <PaymentMethodTitle>Bank Transfer</PaymentMethodTitle>
                      <PaymentMethodAction>Change</PaymentMethodAction>
                    </PaymentMethodHeader>
                    <PaymentMethodDetails>
                      <PaymentMethodDetail>
                        <PaymentMethodLabel>Account Name</PaymentMethodLabel>
                        <PaymentMethodValue>Your Name</PaymentMethodValue>
                      </PaymentMethodDetail>
                      <PaymentMethodDetail>
                        <PaymentMethodLabel>Bank Name</PaymentMethodLabel>
                        <PaymentMethodValue>HDFC Bank</PaymentMethodValue>
                      </PaymentMethodDetail>
                      <PaymentMethodDetail>
                        <PaymentMethodLabel>Account Number</PaymentMethodLabel>
                        <PaymentMethodValue>XXXX XXXX 1234</PaymentMethodValue>
                      </PaymentMethodDetail>
                      <PaymentMethodDetail>
                        <PaymentMethodLabel>IFSC Code</PaymentMethodLabel>
                        <PaymentMethodValue>HDFC0001234</PaymentMethodValue>
                      </PaymentMethodDetail>
                    </PaymentMethodDetails>
                  </PaymentMethodCard>
                </PaymentMethodSection>

                <TaxInformationSection>
                  <SectionSubtitle>Tax Information</SectionSubtitle>
                  <TaxInfoCard>
                    <TaxInfoContent>
                      <TaxInfoItem>
                        <TaxInfoLabel>PAN Number</TaxInfoLabel>
                        <TaxInfoValue>ABCDE1234F</TaxInfoValue>
                      </TaxInfoItem>
                      <TaxInfoItem>
                        <TaxInfoLabel>GST Number</TaxInfoLabel>
                        <TaxInfoValue>Not Provided</TaxInfoValue>
                      </TaxInfoItem>
                      <TaxInfoNote>
                        <AlertCircle size={14} />
                        TDS will be deducted as per applicable rates
                      </TaxInfoNote>
                    </TaxInfoContent>
                    <TaxInfoAction>Update Tax Info</TaxInfoAction>
                  </TaxInfoCard>
                </TaxInformationSection>
              </PaymentSection>
            </TabContent>
          )}
        </LeftColumn>

        <RightColumn>
          <StatusCard>
            <StatusCardHeader>
              <StatusCardTitle>Campaign Status</StatusCardTitle>
              <Badge
                variant={
                  campaign.statusVariant as
                    | "info"
                    | "success"
                    | "warning"
                    | "default"
                }
              >
                {campaign.status}
              </Badge>
            </StatusCardHeader>
            <StatusCardContent>
              <StatusItem>
                <StatusLabel>Start Date</StatusLabel>
                <StatusValue>{campaign.date}</StatusValue>
              </StatusItem>
              <StatusItem>
                <StatusLabel>Deadline</StatusLabel>
                <StatusValue highlight>{campaign.deadline}</StatusValue>
              </StatusItem>
              <StatusItem>
                <StatusLabel>Days Remaining</StatusLabel>
                <StatusValue highlight>10 days</StatusValue>
              </StatusItem>
            </StatusCardContent>
            <ProgressBar>
              <ProgressFill width={40} />
            </ProgressBar>
            <ProgressLabel>40% Complete</ProgressLabel>
          </StatusCard>

          <DeliverableCard>
            <DeliverableCardHeader>
              <DeliverableCardTitle>Deliverables</DeliverableCardTitle>
            </DeliverableCardHeader>
            <DeliverableCardContent>
              <DeliverableItem>
                <DeliverableCheckbox checked={false} />
                <DeliverableText>2 Instagram Posts</DeliverableText>
              </DeliverableItem>
              <DeliverableItem>
                <DeliverableCheckbox checked={false} />
                <DeliverableText>3 Instagram Stories</DeliverableText>
              </DeliverableItem>
              <DeliverableItem>
                <DeliverableCheckbox checked={false} />
                <DeliverableText>1 Instagram Reel</DeliverableText>
              </DeliverableItem>
            </DeliverableCardContent>
          </DeliverableCard>

          <PaymentCard>
            <PaymentCardHeader>
              <PaymentCardTitle>Payment</PaymentCardTitle>
            </PaymentCardHeader>
            <PaymentCardContent>
              <PaymentAmount>{campaign.payout}</PaymentAmount>
              <PaymentTerms>
                50% upon content approval, 50% upon publishing
              </PaymentTerms>
              <PaymentBonus>
                <Award size={16} />
                ₹1,000 bonus for exceeding engagement targets
              </PaymentBonus>
            </PaymentCardContent>
          </PaymentCard>

          <ContactCard>
            <ContactCardHeader>
              <ContactCardTitle>Campaign Manager</ContactCardTitle>
            </ContactCardHeader>
            <ContactCardContent>
              <ContactInfo>
                <ContactName>{campaign.campaignManager.name}</ContactName>
                <ContactDetail>
                  <Mail size={14} />
                  {campaign.campaignManager.email}
                </ContactDetail>
                <ContactDetail>
                  <Phone size={14} />
                  {campaign.campaignManager.phone}
                </ContactDetail>
                <ContactDetail>
                  <Clock size={14} />
                  Available: {campaign.campaignManager.availableHours}
                </ContactDetail>
              </ContactInfo>
              <ContactAction>
                <ActionButton primary>
                  <MessageSquare size={16} />
                  Message
                </ActionButton>
              </ContactAction>
            </ContactCardContent>
          </ContactCard>

          <ActionCard>
            <ActionCardHeader>
              <ActionCardTitle>Quick Actions</ActionCardTitle>
            </ActionCardHeader>
            <ActionCardContent>
              <QuickAction>
                <FileText size={16} />
                View Campaign Brief
              </QuickAction>
              <QuickAction>
                <Upload size={16} />
                Submit Content
              </QuickAction>
              <QuickAction>
                <MessageSquare size={16} />
                Message Brand
              </QuickAction>
              <QuickAction>
                <Flag size={16} />
                Report Issue
              </QuickAction>
            </ActionCardContent>
          </ActionCard>
        </RightColumn>
      </MainContent>
    </PageContainer>
  );
};

export default CampaignDetail;

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 20px;
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: ${sharedTheme.colorVariants.secondary.dark};
  font-size: ${sharedTheme.typography.fontSizes.md};
  cursor: pointer;
  padding: 0.5rem 0;
  margin-bottom: 1rem;

  &:hover {
    color: ${sharedTheme.colorVariants.primary.dark};
  }
`;

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
`;

const CampaignStatusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
`;

const PageTitle = styled.h1`
  font-size: ${sharedTheme.typography.fontSizes.xxl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
`;

const BrandInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const BrandLogo = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #e5e7eb;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BrandName = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

interface ActionButtonProps {
  primary?: boolean;
}

const ActionButton = styled.button<ActionButtonProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  background-color: ${(props) =>
    props.primary ? sharedTheme.colorVariants.primary.dark : "white"};
  color: ${(props) =>
    props.primary ? "white" : sharedTheme.colorVariants.secondary.dark};
  border: 1px solid ${(props) => (props.primary ? "transparent" : "#e5e7eb")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.primary ? sharedTheme.colorVariants.primary.darker : "#f9fafb"};
  }
`;

const MainContent = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const LeftColumn = styled.div`
  flex: 1;
  min-width: 0;
  flex-basis: 65%;
`;

const RightColumn = styled.div`
  width: 300px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

interface TabButtonProps {
  active: boolean;
}

const TabButton = styled.button<TabButtonProps>`
  padding: 0.75rem 1.25rem;
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${(props) =>
    props.active
      ? sharedTheme.colorVariants.primary.dark
      : sharedTheme.colorVariants.secondary.light};
  background-color: transparent;
  border: none;
  border-bottom: 2px solid
    ${(props) =>
      props.active ? sharedTheme.colorVariants.primary.dark : "transparent"};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  position: relative;

  &:hover {
    color: ${sharedTheme.colorVariants.primary.dark};
  }
`;

const UnreadBadge = styled.span`
  background-color: ${sharedTheme.colorVariants.primary.dark};
  color: white;
  font-size: 10px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TabContent = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
`;

const SectionTitle = styled.h2`
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0 0 1.5rem 0;
`;

const SectionSubtitle = styled.h3`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 1.5rem 0 1rem 0;
`;

const OverviewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const OverviewDescription = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.md};
  line-height: 1.6;
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

const DetailIcon = styled.div`
  color: ${sharedTheme.colorVariants.primary.dark};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DetailContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

interface DetailValueProps {
  highlight?: boolean;
}

const DetailValue = styled.div<DetailValueProps>`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${(props) =>
    props.highlight ? "#059669" : sharedTheme.colorVariants.secondary.dark};
`;

const DeliverablesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const DeliverableItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};

  svg {
    color: ${sharedTheme.colorVariants.primary.dark};
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TagItem = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.primary.dark};
  background-color: #eff6ff;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
`;

const ContactCard = styled.div`
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
`;

const ContactHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;

  svg {
    color: ${sharedTheme.colorVariants.primary.dark};
  }
`;

const ContactName = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const ContactPosition = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ContactDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};

  svg {
    color: ${sharedTheme.colorVariants.secondary.light};
  }
`;

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  icon,
  isOpen,
  onToggle,
  children,
}) => {
  return (
    <CollapsibleContainer>
      <CollapsibleHeader onClick={onToggle}>
        <CollapsibleTitle>
          {icon}
          {title}
        </CollapsibleTitle>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </CollapsibleHeader>
      {isOpen && <CollapsibleContent>{children}</CollapsibleContent>}
    </CollapsibleContainer>
  );
};

const CollapsibleContainer = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
`;

const CollapsibleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f9fafb;
  cursor: pointer;
`;

const CollapsibleTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const CollapsibleContent = styled.div`
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
`;

const ResourcesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ResourceItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;

  svg {
    color: ${sharedTheme.colorVariants.primary.dark};
  }
`;

const ResourceName = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  flex: 1;
`;

const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const FaqList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FaqItem = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
`;

const FaqQuestion = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  background-color: #f9fafb;
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const FaqAnswer = styled.div`
  padding: 0.75rem 1rem;
  padding-left: 2.5rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  border-top: 1px solid #e5e7eb;
`;

const LegalRequirements = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LegalItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const LegalTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const LegalText = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const BriefSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const BriefItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BriefTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const BriefContent = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  line-height: 1.6;
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const AudienceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

interface AudienceItemProps {
  fullWidth?: boolean;
}

const AudienceItem = styled.div<AudienceItemProps>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  grid-column: ${(props) => (props.fullWidth ? "1 / -1" : "auto")};
`;

const AudienceLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const AudienceValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const InterestTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const InterestTag = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  background-color: #f3f4f6;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
`;

const GuidelinesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const GuidelineItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: ${sharedTheme.typography.fontSizes.md};
  color: ${sharedTheme.colorVariants.secondary.dark};
  line-height: 1.5;

  svg {
    color: ${sharedTheme.colorVariants.primary.dark};
    margin-top: 0.25rem;
  }
`;

const DosAndDonts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DosSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
`;

const DosTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: #059669;

  svg {
    color: #059669;
  }
`;

const DosList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DosItem = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  padding-left: 1.5rem;
  position: relative;

  &::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #059669;
  }
`;

const DontsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
`;

const DontsTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: #b91c1c;

  svg {
    color: #b91c1c;
  }
`;

const DontsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DontsItem = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  padding-left: 1.5rem;
  position: relative;

  &::before {
    content: "✕";
    position: absolute;
    left: 0;
    color: #b91c1c;
  }
`;

const DeliverablesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${sharedTheme.typography.fontSizes.sm};

  th,
  td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }

  th {
    font-weight: ${sharedTheme.typography.fontWeights.semibold};
    color: ${sharedTheme.colorVariants.secondary.dark};
    background-color: #f9fafb;
  }

  td {
    color: ${sharedTheme.colorVariants.secondary.light};
  }
`;

const TimelineTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${sharedTheme.typography.fontSizes.sm};

  td {
    padding: 0.75rem;
    border-bottom: 1px solid #e5e7eb;
  }

  td:first-child {
    font-weight: ${sharedTheme.typography.fontWeights.semibold};
    color: ${sharedTheme.colorVariants.secondary.dark};
    width: 40%;
  }

  td:last-child {
    color: ${sharedTheme.colorVariants.secondary.light};
  }
`;

const PaymentTermsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${sharedTheme.typography.fontSizes.sm};

  td {
    padding: 0.75rem;
    border-bottom: 1px solid #e5e7eb;
  }

  td:first-child {
    font-weight: ${sharedTheme.typography.fontWeights.semibold};
    color: ${sharedTheme.colorVariants.secondary.dark};
    width: 40%;
  }

  td:last-child {
    color: ${sharedTheme.colorVariants.secondary.light};
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
`;

const ProductImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProductName = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const ProductDescription = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const ProductMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.5rem;
`;

const ProductMetaItem = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const BrandGuidelinesContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const GuidelineLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const GuidelineValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const ColorPalette = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

interface ColorSwatchProps {
  color: string;
}

const ColorSwatch = styled.div<ColorSwatchProps>`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: ${(props) => props.color};
  border: 1px solid #e5e7eb;
`;

const SubmissionRequirementsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const SubmissionRequirement = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const RequirementLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const RequirementValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const PerformanceExpectationsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const PerformanceExpectation = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
`;

const ExpectationIcon = styled.div`
  color: ${sharedTheme.colorVariants.primary.dark};
`;

const ExpectationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ExpectationLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const ExpectationValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const SubmissionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SubmissionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

const SubmissionTitle = styled.h3`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
`;

const SubmissionDescription = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin: 0.25rem 0 0 0;
`;

const SubmissionDeadline = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: #fffbeb;
  border: 1px solid #fef3c7;
  border-radius: 6px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: #d97706;

  svg {
    color: #d97706;
  }
`;

const SubmissionRequirementsCard = styled.div`
  background-color: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 8px;
  overflow: hidden;
`;

const RequirementsCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background-color: #e0f2fe;
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: #0284c7;

  svg {
    color: #0284c7;
  }
`;

const RequirementsCardContent = styled.div`
  padding: 1rem;
`;

const RequirementsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.75rem;
`;

const RequirementsListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};

  svg {
    color: #0284c7;
  }
`;

const SubmissionTypes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SubmissionType = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const SubmissionTypeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubmissionTypeTitle = styled.h4`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
`;

interface SubmissionStatusProps {
  status: string;
}

const SubmissionStatus = styled.div<SubmissionStatusProps>`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  background-color: ${(props) => {
    switch (props.status) {
      case "Approved":
        return "#ecfdf5";
      case "Rejected":
        return "#fef2f2";
      case "In Review":
        return "#eff6ff";
      default:
        return "#f3f4f6";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "Approved":
        return "#059669";
      case "Rejected":
        return "#b91c1c";
      case "In Review":
        return "#2563eb";
      default:
        return "#4b5563";
    }
  }};
`;

const SubmissionTypeDescription = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin: 0;
`;

const UploadArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f9fafb;
  border: 2px dashed #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
    border-color: #d1d5db;
  }
`;

const UploadIcon = styled.div`
  color: ${sharedTheme.colorVariants.secondary.light};
  margin-bottom: 1rem;
`;

const UploadText = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0 0 0.5rem 0;
  text-align: center;
`;

const UploadButton = styled.span`
  color: ${sharedTheme.colorVariants.primary.dark};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const UploadSubtext = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin: 0;
`;

const CaptionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CaptionLabel = styled.label`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const CaptionTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${sharedTheme.colorVariants.primary.light};
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
`;

const CaptionTips = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InfoTip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};

  svg {
    color: ${sharedTheme.colorVariants.primary.dark};
  }
`;

const StoryDetailsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const StoryDetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StoryDetailLabel = styled.label`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const StoryDetailInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};

  &:focus {
    outline: none;
    border-color: ${sharedTheme.colorVariants.primary.light};
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
`;

const MusicSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MusicLabel = styled.label`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const MusicInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};

  &:focus {
    outline: none;
    border-color: ${sharedTheme.colorVariants.primary.light};
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
`;

const SubmissionActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const SubmissionNote = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};

  svg {
    color: #d97706;
  }
`;

const SubmissionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const MessagesSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  max-height: 500px;
`;

const MessagesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  flex: 1;
  overflow-y: auto;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px 8px 0 0;
`;

interface MessageItemProps {
  isUser: boolean;
}

const MessageItem = styled.div<MessageItemProps>`
  display: flex;
  justify-content: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
`;

interface MessageContentProps {
  isUser: boolean;
}

const MessageContent = styled.div<MessageContentProps>`
  max-width: 70%;
  padding: 1rem;
  background-color: ${(props) => (props.isUser ? "#eff6ff" : "white")};
  border: 1px solid ${(props) => (props.isUser ? "#bfdbfe" : "#e5e7eb")};
  border-radius: 8px;
  border-top-${(props) => (props.isUser ? "right" : "left")}-radius: 0;
`;

const MessageSender = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin-bottom: 0.25rem;
`;

const MessageText = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  line-height: 1.5;
  white-space: pre-wrap;
`;

const MessageTime = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin-top: 0.5rem;
  text-align: right;
`;

const MessageComposer = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-top: none;
  border-radius: 0 0 8px 8px;
`;

const MessageInput = styled.textarea`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  resize: none;
  min-height: 40px;
  max-height: 120px;

  &:focus {
    outline: none;
    border-color: ${sharedTheme.colorVariants.primary.light};
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
`;

const MessageActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MessageAttachButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  color: ${sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const MessageSendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: ${sharedTheme.colorVariants.primary.dark};
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: ${sharedTheme.colorVariants.primary.darker};
  }
`;

const PaymentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PaymentOverview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

const PaymentCard = styled.div`
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
`;

const PaymentCardHeader = styled.div`
  padding: 1rem;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
`;

const PaymentCardTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const PaymentCardAmount = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: #059669;
  margin-top: 0.5rem;
`;

const PaymentCardContent = styled.div`
  padding: 1rem;
`;

const PaymentCardDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e7eb;
`;

const PaymentDetailLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const PaymentDetailValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const PaymentCardNote = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin-top: 0.75rem;

  svg {
    color: #d97706;
  }
`;

const PaymentScheduleCard = styled.div`
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
`;

const PaymentScheduleContent = styled.div`
  padding: 1rem;
`;

const PaymentScheduleItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
  }
`;

const PaymentScheduleInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const PaymentScheduleAmount = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const PaymentScheduleCondition = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

interface PaymentScheduleStatusProps {
  status: string;
}

const PaymentScheduleStatus = styled.div<PaymentScheduleStatusProps>`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  background-color: ${(props) => {
    switch (props.status) {
      case "Paid":
        return "#ecfdf5";
      case "Processing":
        return "#eff6ff";
      default:
        return "#f3f4f6";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "Paid":
        return "#059669";
      case "Processing":
        return "#2563eb";
      default:
        return "#4b5563";
    }
  }};
`;

const PaymentProcessSection = styled.div`
  margin-top: 1rem;
`;

const PaymentProcessSteps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const PaymentProcessStep = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
`;

const PaymentStepNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: ${sharedTheme.colorVariants.primary.dark};
  color: white;
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  border-radius: 50%;
`;

const PaymentStepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const PaymentStepTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const PaymentStepDescription = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const PaymentMethodSection = styled.div`
  margin-top: 1rem;
`;

const PaymentMethodCard = styled.div`
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 1rem;
`;

const PaymentMethodHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
`;

const PaymentMethodTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const PaymentMethodAction = styled.button`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.primary.dark};
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const PaymentMethodDetails = styled.div`
  padding: 1rem;
`;

const PaymentMethodDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
  }
`;

const PaymentMethodLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const PaymentMethodValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const TaxInformationSection = styled.div`
  margin-top: 1rem;
`;

const TaxInfoCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-top: 1rem;
`;

const TaxInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TaxInfoItem = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const TaxInfoLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  width: 100px;
`;

const TaxInfoValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const TaxInfoNote = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin-top: 0.5rem;

  svg {
    color: #d97706;
  }
`;

const TaxInfoAction = styled.button`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.primary.dark};
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const StatusCard = styled.div`
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
`;

const StatusCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const StatusCardTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const StatusCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const StatusItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatusLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

interface StatusValueProps {
  highlight?: boolean;
}

const StatusValue = styled.div<StatusValueProps>`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${(props) =>
    props.highlight ? "#059669" : sharedTheme.colorVariants.secondary.dark};
`;

interface ProgressBarProps {
  width: number;
}

const ProgressBar = styled.div`
  height: 8px;
  background-color: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div<ProgressBarProps>`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: ${sharedTheme.colorVariants.primary.dark};
  border-radius: 4px;
`;

const ProgressLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
  text-align: center;
  margin-top: 0.5rem;
`;

const DeliverableCard = styled.div`
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
`;

const DeliverableCardHeader = styled.div`
  margin-bottom: 1rem;
`;

const DeliverableCardTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const DeliverableCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

interface DeliverableCheckboxProps {
  checked: boolean;
}

const DeliverableCheckbox = styled.div<DeliverableCheckboxProps>`
  width: 20px;
  height: 20px;
  border: 2px solid ${(props) => (props.checked ? "#059669" : "#d1d5db")};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.checked ? "#059669" : "transparent")};
  color: white;
  cursor: pointer;

  &::after {
    content: "✓";
    display: ${(props) => (props.checked ? "block" : "none")};
  }
`;

const DeliverableText = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const PaymentAmount = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: #059669;
  margin-bottom: 0.5rem;
`;

const PaymentTerms = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin-bottom: 0.75rem;
`;

const PaymentBonus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: #d97706;
  background-color: #fffbeb;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;

  svg {
    color: #d97706;
  }
`;

const ContactCardHeader = styled.div`
  margin-bottom: 1rem;
`;

const ContactCardTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const ContactCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactAction = styled.div`
  display: flex;
  justify-content: center;
`;

const ActionCard = styled.div`
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
`;

const ActionCardHeader = styled.div`
  margin-bottom: 1rem;
`;

const ActionCardTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const ActionCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const QuickAction = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
    border-color: #d1d5db;
  }

  svg {
    color: ${sharedTheme.colorVariants.primary.dark};
  }
`;

interface BadgeProps {
  variant?: "success" | "warning" | "info" | "default";
}

const Badge = styled.div<BadgeProps>`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  padding: 4px 8px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;

  background-color: ${({ variant }) => {
    switch (variant) {
      case "success":
        return "#ECFDF5";
      case "warning":
        return "#FFFBEB";
      case "info":
        return "#EFF6FF";
      default:
        return "#F3F4F6";
    }
  }};

  color: ${({ variant }) => {
    switch (variant) {
      case "success":
        return "#059669";
      case "warning":
        return "#D97706";
      case "info":
        return "#2563EB";
      default:
        return "#4B5563";
    }
  }};
`;
