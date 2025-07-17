import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  ArrowLeft,
  Upload,
  Camera,
  Video,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Info,
  Image as ImageIcon,
  Send,
  Eye,
  Target,
  DollarSign,
  Award,
  ExternalLink,
  Tag,
  Hash,
  BarChart2,
  Users,
  Heart,
  Check,
  AlertTriangle,
  MessageSquare,
  Mail,
  Phone,
  // User,
  Paperclip,
  Flag,
} from "lucide-react";

// Using campaign data from your existing structure
const campaignData = {
  id: 8,
  title: "Summer Fashion Collection",
  brand: "StyleHub",
  brandLogo:
    "https://img.freepik.com/free-vector/colorful-letter-gradient-logo-design_474888-2309.jpg?semt=ais_hybrid&w=740",
  status: "In Progress",
  deadline: "May 25, 2025",
  contentSubmissionDeadline: "May 20, 2025",
  payout: "₹5,000",
  bonusAmount: "₹1,000",
  deliverables: {
    instagramPosts: {
      quantity: 2,
      status: "pending",
      specifications:
        "High-quality images showcasing outfits in different settings",
      submissions: [],
    },
    instagramStories: {
      quantity: 3,
      status: "pending",
      specifications: "Behind-the-scenes content, unboxing, or styling process",
      submissions: [],
    },
    instagramReel: {
      quantity: 1,
      status: "pending",
      specifications: "15-30 second video showcasing outfit versatility",
      submissions: [],
    },
  },
  requirements: {
    hashtags: ["#StyleHubSummer", "#SummerFashion", "#OOTD"],
    mentions: ["@StyleHub_Official"],
    disclosure: "#ad or #sponsored",
    format: "JPG, PNG for images; MP4 for videos",
    resolution: "Minimum 1080x1080px for images, 1080p for videos",
    fileSize: "Maximum 50MB per file",
  },
  performanceTargets: {
    engagement: "Minimum 5% engagement rate",
    reach: "50% of followers",
    clicks: "100+ swipe-up clicks",
  },
  contentGuidelines: [
    "Natural lighting preferred",
    "Showcase at least 2 different outfits",
    "Highlight comfort and versatility",
    "Be authentic and genuine",
  ],
  // Campaign Manager Info
  campaignManager: {
    name: "Rahul Verma",
    email: "rahul@stylehub.com",
    phone: "+91 87654 32109",
    availableHours: "10:00 AM - 6:00 PM IST",
  },
  // Messages data
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

// Type definitions
type SubmissionFile = {
  name: string;
  size: number;
  type: string;
  url: string;
};

type Submission = {
  files?: SubmissionFile[];
  caption?: string;
  status?: string;
  submittedAt?: string;
};

type Submissions = {
  instagramPosts?: Submission;
  instagramStories?: Submission;
  instagramReel?: Submission;
  [key: string]: Submission | undefined;
};

type DeliverableType = "instagramPosts" | "instagramStories" | "instagramReel";

const ContentSubmissionPage = () => {
  const [isCreator, setIsCreator] = useState(true); // Toggle this to test different views
  const navigate = useNavigate();

  const getTabFromUrl = () => {
    const searchParams = new URLSearchParams(location.search);
    const tabFromUrl = searchParams.get("tab");

    // Valid tabs based on user role
    const validTabs = isCreator
      ? [
          "overview",
          "submission",
          "messages",
          "guidelines",
          "review",
          "payment",
        ]
      : ["overview", "guidelines", "payment"];

    // Return the tab if it's valid, otherwise default to 'overview'
    return validTabs.includes(tabFromUrl || "") ? tabFromUrl : "overview";
  };

  // Initialize activeTab from URL
  const [activeTab, setActiveTab] = useState(getTabFromUrl());
  // This should be determined based on user role/permissions
  // For demo purposes, you can toggle this to test different views

  const [submissions, setSubmissions] = useState<Submissions>({});
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );
  const [newMessage, setNewMessage] = useState("");

  // File upload handler
  const handleFileUpload = (
    deliverableType: DeliverableType,
    files: FileList | null
  ) => {
    if (!files) return;

    const fileArray = Array.from(files);
    setUploadProgress((prev) => ({ ...prev, [deliverableType]: 0 }));

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const currentProgress = prev[deliverableType] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          return prev;
        }
        return { ...prev, [deliverableType]: currentProgress + 10 };
      });
    }, 200);

    // Update submissions after "upload"
    setTimeout(() => {
      setSubmissions((prev) => ({
        ...prev,
        [deliverableType]: {
          files: fileArray.map(
            (file: File): SubmissionFile => ({
              name: file.name,
              size: file.size,
              type: file.type,
              url: URL.createObjectURL(file),
            })
          ),
          caption: prev[deliverableType]?.caption || "",
          status: "uploaded",
        },
      }));
    }, 2000);
  };

  const updateCaption = (deliverableType: DeliverableType, caption: string) => {
    setSubmissions((prev) => ({
      ...prev,
      [deliverableType]: {
        ...prev[deliverableType],
        caption,
      },
    }));
  };

  const submitForReview = (deliverableType: DeliverableType) => {
    setSubmissions((prev) => ({
      ...prev,
      [deliverableType]: {
        ...prev[deliverableType],
        status: "submitted",
        submittedAt: new Date().toISOString(),
      },
    }));
  };

  // Message handling
  const handleMessageSend = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const getOverallProgress = () => {
    const totalDeliverables = 6; // 2 posts + 3 stories + 1 reel
    const completedDeliverables = Object.values(submissions).filter(
      (sub) => sub?.status === "submitted" || sub?.status === "approved"
    ).length;
    return Math.round((completedDeliverables / totalDeliverables) * 100);
  };

  const renderOverviewTab = () => (
    <TabContentContainer>
      <SectionCard>
        <SectionHeader>
          <SectionTitle>
            <Target size={20} />
            Campaign Overview
          </SectionTitle>
          <StatusBadge status={campaignData.status}>
            {campaignData.status}
          </StatusBadge>
        </SectionHeader>

        <OverviewGrid>
          <OverviewItem>
            <OverviewLabel>Submission Deadline</OverviewLabel>
            <OverviewValue highlight>
              {campaignData.contentSubmissionDeadline}
            </OverviewValue>
          </OverviewItem>
          <OverviewItem>
            <OverviewLabel>Publishing Deadline</OverviewLabel>
            <OverviewValue>{campaignData.deadline}</OverviewValue>
          </OverviewItem>
          <OverviewItem>
            <OverviewLabel>Total Payout</OverviewLabel>
            <OverviewValue highlight>{campaignData.payout}</OverviewValue>
          </OverviewItem>
          <OverviewItem>
            <OverviewLabel>Potential Bonus</OverviewLabel>
            <OverviewValue>{campaignData.bonusAmount}</OverviewValue>
          </OverviewItem>
        </OverviewGrid>

        <ProgressSection>
          <ProgressHeader>
            <ProgressTitle>Submission Progress</ProgressTitle>
            <ProgressPercentage>{getOverallProgress()}%</ProgressPercentage>
          </ProgressHeader>
          <ProgressBar>
            <ProgressFill width={getOverallProgress()} />
          </ProgressBar>
          <ProgressDetails>
            {getOverallProgress() === 100
              ? "All content submitted!"
              : `${
                  Object.keys(submissions).length
                } of 6 deliverables completed`}
          </ProgressDetails>
        </ProgressSection>
      </SectionCard>

      <SectionCard>
        <SectionTitle>
          <CheckCircle size={20} />
          Deliverables Checklist
        </SectionTitle>
        <DeliverablesList>
          <DeliverableItem
            completed={submissions.instagramPosts?.status === "submitted"}
          >
            <DeliverableCheckbox
              completed={submissions.instagramPosts?.status === "submitted"}
            >
              {submissions.instagramPosts?.status === "submitted" && (
                <Check size={14} />
              )}
            </DeliverableCheckbox>
            <DeliverableContent>
              <DeliverableTitle>Instagram Posts (2)</DeliverableTitle>
              <DeliverableDescription>
                {campaignData.deliverables.instagramPosts.specifications}
              </DeliverableDescription>
            </DeliverableContent>
            <DeliverableStatus
              status={submissions.instagramPosts?.status || "pending"}
            >
              {submissions.instagramPosts?.status || "Pending"}
            </DeliverableStatus>
          </DeliverableItem>

          <DeliverableItem
            completed={submissions.instagramStories?.status === "submitted"}
          >
            <DeliverableCheckbox
              completed={submissions.instagramStories?.status === "submitted"}
            >
              {submissions.instagramStories?.status === "submitted" && (
                <Check size={14} />
              )}
            </DeliverableCheckbox>
            <DeliverableContent>
              <DeliverableTitle>Instagram Stories (3)</DeliverableTitle>
              <DeliverableDescription>
                {campaignData.deliverables.instagramStories.specifications}
              </DeliverableDescription>
            </DeliverableContent>
            <DeliverableStatus
              status={submissions.instagramStories?.status || "pending"}
            >
              {submissions.instagramStories?.status || "Pending"}
            </DeliverableStatus>
          </DeliverableItem>

          <DeliverableItem
            completed={submissions.instagramReel?.status === "submitted"}
          >
            <DeliverableCheckbox
              completed={submissions.instagramReel?.status === "submitted"}
            >
              {submissions.instagramReel?.status === "submitted" && (
                <Check size={14} />
              )}
            </DeliverableCheckbox>
            <DeliverableContent>
              <DeliverableTitle>Instagram Reel (1)</DeliverableTitle>
              <DeliverableDescription>
                {campaignData.deliverables.instagramReel.specifications}
              </DeliverableDescription>
            </DeliverableContent>
            <DeliverableStatus
              status={submissions.instagramReel?.status || "pending"}
            >
              {submissions.instagramReel?.status || "Pending"}
            </DeliverableStatus>
          </DeliverableItem>
        </DeliverablesList>
      </SectionCard>

      <SectionCard>
        <SectionTitle>
          <BarChart2 size={20} />
          Performance Targets
        </SectionTitle>
        <TargetsList>
          <TargetItem>
            <Heart size={16} />
            <TargetContent>
              <TargetLabel>Engagement Rate</TargetLabel>
              <TargetValue>
                {campaignData.performanceTargets.engagement}
              </TargetValue>
            </TargetContent>
          </TargetItem>
          <TargetItem>
            <Users size={16} />
            <TargetContent>
              <TargetLabel>Reach Target</TargetLabel>
              <TargetValue>{campaignData.performanceTargets.reach}</TargetValue>
            </TargetContent>
          </TargetItem>
          <TargetItem>
            <ExternalLink size={16} />
            <TargetContent>
              <TargetLabel>Click Target</TargetLabel>
              <TargetValue>
                {campaignData.performanceTargets.clicks}
              </TargetValue>
            </TargetContent>
          </TargetItem>
        </TargetsList>
      </SectionCard>
    </TabContentContainer>
  );

  const renderSubmissionTab = () => (
    <TabContentContainer>
      <RequirementsCard>
        <RequirementsHeader>
          <AlertCircle size={18} />
          Submission Requirements
        </RequirementsHeader>
        <RequirementsList>
          <RequirementItem>
            <Check size={14} />
            Format: {campaignData.requirements.format}
          </RequirementItem>
          <RequirementItem>
            <Check size={14} />
            Resolution: {campaignData.requirements.resolution}
          </RequirementItem>
          <RequirementItem>
            <Check size={14} />
            File Size: {campaignData.requirements.fileSize}
          </RequirementItem>
          <RequirementItem>
            <Check size={14} />
            Required hashtags: {campaignData.requirements.hashtags.join(", ")}
          </RequirementItem>
          <RequirementItem>
            <Check size={14} />
            Required mentions: {campaignData.requirements.mentions.join(", ")}
          </RequirementItem>
          <RequirementItem>
            <Check size={14} />
            Disclosure: {campaignData.requirements.disclosure}
          </RequirementItem>
        </RequirementsList>
      </RequirementsCard>

      {/* Instagram Posts */}
      <SubmissionCard>
        <SubmissionHeader>
          <SubmissionTitle>
            <ImageIcon size={20} />
            Instagram Posts (2)
          </SubmissionTitle>
          <SubmissionStatus
            status={submissions.instagramPosts?.status || "pending"}
          >
            {submissions.instagramPosts?.status || "Pending"}
          </SubmissionStatus>
        </SubmissionHeader>

        <SubmissionDescription>
          {campaignData.deliverables.instagramPosts.specifications}
        </SubmissionDescription>

        <UploadArea
          onClick={() => {
            const input = document.getElementById("posts-upload");
            if (input) input.click();
          }}
        >
          <UploadIcon>
            <ImageIcon size={32} />
          </UploadIcon>
          <UploadText>Click to upload images or drag and drop</UploadText>
          <UploadSubtext>
            JPG, PNG up to 50MB each (2 images required)
          </UploadSubtext>
          <input
            id="posts-upload"
            type="file"
            multiple
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handleFileUpload("instagramPosts", e.target.files)}
          />
        </UploadArea>

        {uploadProgress.instagramPosts !== undefined &&
          uploadProgress.instagramPosts < 100 && (
            <UploadProgress>
              <UploadProgressBar>
                <UploadProgressFill width={uploadProgress.instagramPosts} />
              </UploadProgressBar>
              <UploadProgressText>
                {uploadProgress.instagramPosts}% uploaded
              </UploadProgressText>
            </UploadProgress>
          )}

        {submissions.instagramPosts?.files && (
          <UploadedFiles>
            {submissions.instagramPosts.files.map(
              (file: SubmissionFile, index: number) => (
                <FilePreview key={index}>
                  <img src={file.url} alt={file.name} />
                  <FileInfo>
                    <FileName>{file.name}</FileName>
                    <FileSize>
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </FileSize>
                  </FileInfo>
                </FilePreview>
              )
            )}
          </UploadedFiles>
        )}

        <CaptionSection>
          <CaptionLabel>Proposed Caption</CaptionLabel>
          <CaptionTextarea
            placeholder="Write your caption including required hashtags and mentions..."
            value={submissions.instagramPosts?.caption || ""}
            onChange={(e) => updateCaption("instagramPosts", e.target.value)}
            rows={4}
          />
          <CaptionTips>
            <TipItem>
              <Info size={14} />
              Include: {campaignData.requirements.hashtags.join(", ")}
            </TipItem>
            <TipItem>
              <Info size={14} />
              Tag: {campaignData.requirements.mentions.join(", ")}
            </TipItem>
            <TipItem>
              <Info size={14} />
              Add disclosure: {campaignData.requirements.disclosure}
            </TipItem>
          </CaptionTips>
        </CaptionSection>

        {submissions.instagramPosts?.files &&
          submissions.instagramPosts?.caption && (
            <SubmissionActions>
              <ActionButton
                onClick={() => submitForReview("instagramPosts")}
                primary
              >
                <Send size={16} />
                Submit for Review
              </ActionButton>
            </SubmissionActions>
          )}
      </SubmissionCard>

      {/* Instagram Stories */}
      <SubmissionCard>
        <SubmissionHeader>
          <SubmissionTitle>
            <Camera size={20} />
            Instagram Stories (3)
          </SubmissionTitle>
          <SubmissionStatus
            status={submissions.instagramStories?.status || "pending"}
          >
            {submissions.instagramStories?.status || "Pending"}
          </SubmissionStatus>
        </SubmissionHeader>

        <SubmissionDescription>
          {campaignData.deliverables.instagramStories.specifications}
        </SubmissionDescription>

        <UploadArea
          onClick={() => {
            const input = document.getElementById("stories-upload");
            if (input) input.click();
          }}
        >
          <UploadIcon>
            <Camera size={32} />
          </UploadIcon>
          <UploadText>
            Click to upload images/videos or drag and drop
          </UploadText>
          <UploadSubtext>
            JPG, PNG, MP4 up to 50MB each (3 stories required)
          </UploadSubtext>
          <input
            id="stories-upload"
            type="file"
            multiple
            accept="image/*,video/*"
            style={{ display: "none" }}
            onChange={(e) =>
              handleFileUpload("instagramStories", e.target.files)
            }
          />
        </UploadArea>

        {uploadProgress.instagramStories !== undefined &&
          uploadProgress.instagramStories < 100 && (
            <UploadProgress>
              <UploadProgressBar>
                <UploadProgressFill width={uploadProgress.instagramStories} />
              </UploadProgressBar>
              <UploadProgressText>
                {uploadProgress.instagramStories}% uploaded
              </UploadProgressText>
            </UploadProgress>
          )}

        {submissions.instagramStories?.files && (
          <UploadedFiles>
            {submissions.instagramStories.files.map((file, index) => (
              <FilePreview key={index}>
                {file.type.startsWith("video") ? (
                  <video src={file.url} controls />
                ) : (
                  <img src={file.url} alt={file.name} />
                )}
                <FileInfo>
                  <FileName>{file.name}</FileName>
                  <FileSize>{(file.size / 1024 / 1024).toFixed(2)} MB</FileSize>
                </FileInfo>
              </FilePreview>
            ))}
          </UploadedFiles>
        )}

        {submissions.instagramStories?.files && (
          <SubmissionActions>
            <ActionButton
              onClick={() => submitForReview("instagramStories")}
              primary
            >
              <Send size={16} />
              Submit for Review
            </ActionButton>
          </SubmissionActions>
        )}
      </SubmissionCard>

      {/* Instagram Reel */}
      <SubmissionCard>
        <SubmissionHeader>
          <SubmissionTitle>
            <Video size={20} />
            Instagram Reel (1)
          </SubmissionTitle>
          <SubmissionStatus
            status={submissions.instagramReel?.status || "pending"}
          >
            {submissions.instagramReel?.status || "Pending"}
          </SubmissionStatus>
        </SubmissionHeader>

        <SubmissionDescription>
          {campaignData.deliverables.instagramReel.specifications}
        </SubmissionDescription>

        <UploadArea
          onClick={() => {
            const input = document.getElementById("reel-upload");
            if (input) input.click();
          }}
        >
          <UploadIcon>
            <Video size={32} />
          </UploadIcon>
          <UploadText>Click to upload video or drag and drop</UploadText>
          <UploadSubtext>MP4 up to 50MB (15-30 seconds duration)</UploadSubtext>
          <input
            id="reel-upload"
            type="file"
            accept="video/*"
            style={{ display: "none" }}
            onChange={(e) => handleFileUpload("instagramReel", e.target.files)}
          />
        </UploadArea>

        {uploadProgress.instagramReel !== undefined &&
          uploadProgress.instagramReel < 100 && (
            <UploadProgress>
              <UploadProgressBar>
                <UploadProgressFill width={uploadProgress.instagramReel} />
              </UploadProgressBar>
              <UploadProgressText>
                {uploadProgress.instagramReel}% uploaded
              </UploadProgressText>
            </UploadProgress>
          )}

        {submissions.instagramReel?.files && (
          <UploadedFiles>
            {submissions.instagramReel.files.map(
              (file: SubmissionFile, index: number) => (
                <FilePreview key={index}>
                  <video src={file.url} controls />
                  <FileInfo>
                    <FileName>{file.name}</FileName>
                    <FileSize>
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </FileSize>
                  </FileInfo>
                </FilePreview>
              )
            )}
          </UploadedFiles>
        )}

        <CaptionSection>
          <CaptionLabel>Proposed Caption</CaptionLabel>
          <CaptionTextarea
            placeholder="Write your reel caption including required hashtags and mentions..."
            value={submissions.instagramReel?.caption || ""}
            onChange={(e) => updateCaption("instagramReel", e.target.value)}
            rows={4}
          />
        </CaptionSection>

        {submissions.instagramReel?.files &&
          submissions.instagramReel?.caption && (
            <SubmissionActions>
              <ActionButton
                onClick={() => submitForReview("instagramReel")}
                primary
              >
                <Send size={16} />
                Submit for Review
              </ActionButton>
            </SubmissionActions>
          )}
      </SubmissionCard>
    </TabContentContainer>
  );

  const renderGuidelinesTab = () => (
    <TabContentContainer>
      <SectionCard>
        <SectionTitle>
          <FileText size={20} />
          Content Guidelines
        </SectionTitle>
        <GuidelinesList>
          {campaignData.contentGuidelines.map((guideline, index) => (
            <GuidelineItem key={index}>
              <Check size={16} />
              {guideline}
            </GuidelineItem>
          ))}
        </GuidelinesList>
      </SectionCard>

      <SectionCard>
        <SectionTitle>
          <Hash size={20} />
          Required Elements
        </SectionTitle>
        <RequiredElementsGrid>
          <RequiredElement>
            <ElementIcon>
              <Tag size={16} />
            </ElementIcon>
            <ElementContent>
              <ElementLabel>Hashtags</ElementLabel>
              <ElementValue>
                {campaignData.requirements.hashtags.join(", ")}
              </ElementValue>
            </ElementContent>
          </RequiredElement>
          <RequiredElement>
            <ElementIcon>
              <Users size={16} />
            </ElementIcon>
            <ElementContent>
              <ElementLabel>Mentions</ElementLabel>
              <ElementValue>
                {campaignData.requirements.mentions.join(", ")}
              </ElementValue>
            </ElementContent>
          </RequiredElement>
          <RequiredElement>
            <ElementIcon>
              <AlertTriangle size={16} />
            </ElementIcon>
            <ElementContent>
              <ElementLabel>Disclosure</ElementLabel>
              <ElementValue>
                {campaignData.requirements.disclosure}
              </ElementValue>
            </ElementContent>
          </RequiredElement>
        </RequiredElementsGrid>
      </SectionCard>

      <SectionCard>
        <SectionTitle>
          <Award size={20} />
          Bonus Opportunities
        </SectionTitle>
        <BonusInfo>
          Earn an additional <strong>{campaignData.bonusAmount}</strong> if your
          content exceeds 20% of your average engagement rate!
        </BonusInfo>
      </SectionCard>
    </TabContentContainer>
  );

  const renderReviewTab = () => (
    <TabContentContainer>
      <SectionCard>
        <SectionTitle>
          <Eye size={20} />
          Submission Review
        </SectionTitle>

        <ReviewSummary>
          <ReviewItem>
            <ReviewLabel>Total Submissions</ReviewLabel>
            <ReviewValue>{Object.keys(submissions).length} of 6</ReviewValue>
          </ReviewItem>
          <ReviewItem>
            <ReviewLabel>Completion Status</ReviewLabel>
            <ReviewValue highlight>{getOverallProgress()}%</ReviewValue>
          </ReviewItem>
          <ReviewItem>
            <ReviewLabel>Next Deadline</ReviewLabel>
            <ReviewValue urgent>
              {campaignData.contentSubmissionDeadline}
            </ReviewValue>
          </ReviewItem>
        </ReviewSummary>

        {Object.entries(submissions).map(([type, submission]) => (
          <ReviewSubmissionCard key={type}>
            <ReviewSubmissionHeader>
              <ReviewSubmissionTitle>
                {type
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </ReviewSubmissionTitle>
              <ReviewSubmissionStatus status={submission?.status ?? "pending"}>
                {submission?.status ?? "Pending"}
              </ReviewSubmissionStatus>
            </ReviewSubmissionHeader>

            {submission && submission.files && (
              <ReviewFiles>
                {submission.files.slice(0, 3).map((file, index) => (
                  <ReviewFilePreview key={index}>
                    {file.type.startsWith("video") ? (
                      <Video size={24} />
                    ) : (
                      <ImageIcon size={24} />
                    )}
                  </ReviewFilePreview>
                ))}
                {submission.files.length > 3 && (
                  <MoreFiles>+{submission.files.length - 3} more</MoreFiles>
                )}
              </ReviewFiles>
            )}

            {submission && submission.caption && (
              <ReviewCaption>
                <strong>Caption:</strong> {submission.caption.substring(0, 100)}
                {submission.caption.length > 100 && "..."}
              </ReviewCaption>
            )}
          </ReviewSubmissionCard>
        ))}

        {Object.keys(submissions).length === 0 && (
          <EmptyState>
            <Upload size={48} />
            <EmptyStateTitle>No submissions yet</EmptyStateTitle>
            <EmptyStateDescription>
              Start uploading your content in the Submission tab
            </EmptyStateDescription>
          </EmptyState>
        )}
      </SectionCard>
    </TabContentContainer>
  );

  // Messages Tab - Only for creators
  const renderMessagesTab = () => (
    <TabContentContainer>
      <SectionCard>
        <SectionTitle>
          <MessageSquare size={20} />
          Messages
        </SectionTitle>
        <MessagesSection>
          <MessagesList>
            {campaignData.messages.map((message, index) => (
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
      </SectionCard>
    </TabContentContainer>
  );

  return (
    <PageContainer>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          Back to Campaigns
        </BackButton>

        <HeaderContent>
          <CampaignInfo>
            <BrandLogo>
              <img src={campaignData.brandLogo} alt={campaignData.brand} />
            </BrandLogo>
            <CampaignDetails>
              <CampaignTitle>{campaignData.title}</CampaignTitle>
              <BrandName>{campaignData.brand}</BrandName>
            </CampaignDetails>
          </CampaignInfo>

          <HeaderActions>
            <PayoutInfo>
              <DollarSign size={16} />
              {campaignData.payout}
            </PayoutInfo>
            <DeadlineInfo>
              <Clock size={16} />
              Due: {campaignData.contentSubmissionDeadline}
            </DeadlineInfo>

            {/* Role Toggle for Demo Purposes */}
            <RoleToggle>
              <ToggleButton
                active={isCreator}
                onClick={() => setIsCreator(!isCreator)}
              >
                {isCreator ? "Creator View" : "Brand View"}
              </ToggleButton>
            </RoleToggle>
          </HeaderActions>
        </HeaderContent>
      </Header>

      <TabsContainer>
        <TabButton
          active={activeTab === "overview"}
          onClick={() => setActiveTab("overview")}
        >
          <Target size={16} />
          Overview
        </TabButton>

        {/* Conditional tabs based on user role */}
        {isCreator && (
          <>
            <TabButton
              active={activeTab === "submission"}
              onClick={() => setActiveTab("submission")}
            >
              <Upload size={16} />
              Upload Content
            </TabButton>
            <TabButton
              active={activeTab === "messages"}
              onClick={() => setActiveTab("messages")}
            >
              <MessageSquare size={16} />
              Messages
              {/* Unread badge could be added here */}
              <UnreadBadge>1</UnreadBadge>
            </TabButton>
          </>
        )}

        <TabButton
          active={activeTab === "guidelines"}
          onClick={() => setActiveTab("guidelines")}
        >
          <FileText size={16} />
          Guidelines
        </TabButton>

        {isCreator && (
          <TabButton
            active={activeTab === "review"}
            onClick={() => setActiveTab("review")}
          >
            <Eye size={16} />
            Review & Submit
          </TabButton>
        )}

        {/* Payment tab - available for both roles but different content */}
        <TabButton
          active={activeTab === "payment"}
          onClick={() => setActiveTab("payment")}
        >
          <DollarSign size={16} />
          Payment
        </TabButton>
      </TabsContainer>

      <MainContent>
        <ContentArea>
          {activeTab === "overview" && renderOverviewTab()}
          {activeTab === "submission" && isCreator && renderSubmissionTab()}
          {activeTab === "guidelines" && renderGuidelinesTab()}
          {activeTab === "review" && isCreator && renderReviewTab()}
          {activeTab === "messages" && isCreator && renderMessagesTab()}
          {activeTab === "payment" && renderPaymentTab()}
        </ContentArea>

        <RightSidebar>
          {/* Campaign Status Card */}
          <StatusCard>
            <StatusCardHeader>
              <StatusCardTitle>Campaign Status</StatusCardTitle>
              <StatusBadge status={campaignData.status}>
                {campaignData.status}
              </StatusBadge>
            </StatusCardHeader>
            <StatusCardContent>
              <StatusItem>
                <StatusLabel>Start Date</StatusLabel>
                <StatusValue>May 15, 2025</StatusValue>
              </StatusItem>
              <StatusItem>
                <StatusLabel>Deadline</StatusLabel>
                <StatusValue highlight>May 25, 2025</StatusValue>
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

          {/* Deliverables Card - Only for creators */}
          {isCreator && (
            <DeliverableCard>
              <DeliverableCardHeader>
                <DeliverableCardTitle>Deliverables</DeliverableCardTitle>
              </DeliverableCardHeader>
              <DeliverableCardContent>
                <SidebarDeliverableItem>
                  <SidebarDeliverableCheckbox
                    completed={
                      submissions.instagramPosts?.status === "submitted"
                    }
                  >
                    {submissions.instagramPosts?.status === "submitted" && (
                      <Check size={12} />
                    )}
                  </SidebarDeliverableCheckbox>
                  <SidebarDeliverableText>
                    2 Instagram Posts
                  </SidebarDeliverableText>
                </SidebarDeliverableItem>
                <SidebarDeliverableItem>
                  <SidebarDeliverableCheckbox
                    completed={
                      submissions.instagramStories?.status === "submitted"
                    }
                  >
                    {submissions.instagramStories?.status === "submitted" && (
                      <Check size={12} />
                    )}
                  </SidebarDeliverableCheckbox>
                  <SidebarDeliverableText>
                    3 Instagram Stories
                  </SidebarDeliverableText>
                </SidebarDeliverableItem>
                <SidebarDeliverableItem>
                  <SidebarDeliverableCheckbox
                    completed={
                      submissions.instagramReel?.status === "submitted"
                    }
                  >
                    {submissions.instagramReel?.status === "submitted" && (
                      <Check size={12} />
                    )}
                  </SidebarDeliverableCheckbox>
                  <SidebarDeliverableText>
                    1 Instagram Reel
                  </SidebarDeliverableText>
                </SidebarDeliverableItem>
              </DeliverableCardContent>
            </DeliverableCard>
          )}

          {/* Payment Card */}
          <PaymentCard>
            <PaymentCardHeader>
              <PaymentCardTitle>Payment</PaymentCardTitle>
            </PaymentCardHeader>
            <PaymentCardContent>
              <PaymentAmount>{campaignData.payout}</PaymentAmount>
              <PaymentTerms>
                50% upon content approval, 50% upon publishing
              </PaymentTerms>
              <PaymentBonus>
                <Award size={16} />
                {campaignData.bonusAmount} bonus for exceeding engagement
                targets
              </PaymentBonus>
            </PaymentCardContent>
          </PaymentCard>

          {/* Campaign Manager Card - Only for creators */}
          {isCreator && (
            <ContactCard>
              <ContactCardHeader>
                <ContactCardTitle>Campaign Manager</ContactCardTitle>
              </ContactCardHeader>
              <ContactCardContent>
                <ContactInfo>
                  <ContactName>{campaignData.campaignManager.name}</ContactName>
                  <ContactDetail>
                    <Mail size={14} />
                    {campaignData.campaignManager.email}
                  </ContactDetail>
                  <ContactDetail>
                    <Phone size={14} />
                    {campaignData.campaignManager.phone}
                  </ContactDetail>
                  <ContactDetail>
                    <Clock size={14} />
                    Available: {campaignData.campaignManager.availableHours}
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
          )}

          {/* Quick Actions Card */}
          <ActionCard>
            <ActionCardHeader>
              <ActionCardTitle>Quick Actions</ActionCardTitle>
            </ActionCardHeader>
            <ActionCardContent>
              <QuickAction>
                <FileText size={16} />
                View Campaign Brief
              </QuickAction>
              {isCreator && (
                <>
                  <QuickAction>
                    <Upload size={16} />
                    Submit Content
                  </QuickAction>
                  <QuickAction>
                    <MessageSquare size={16} />
                    Message Brand
                  </QuickAction>
                </>
              )}
              <QuickAction>
                <Flag size={16} />
                Report Issue
              </QuickAction>
            </ActionCardContent>
          </ActionCard>
        </RightSidebar>
      </MainContent>
    </PageContainer>
  );

  // Payment Tab - Available for both roles
  function renderPaymentTab() {
    return (
      <TabContentContainer>
        <SectionCard>
          <SectionTitle>
            <DollarSign size={20} />
            Payment Details
          </SectionTitle>

          <PaymentOverview>
            <PaymentCardLarge>
              <PaymentCardHeader>
                <PaymentCardTitle>Total Campaign Value</PaymentCardTitle>
                <PaymentCardAmount>{campaignData.payout}</PaymentCardAmount>
              </PaymentCardHeader>
              <PaymentCardContent>
                <PaymentCardDetail>
                  <PaymentDetailLabel>Base Payment</PaymentDetailLabel>
                  <PaymentDetailValue>{campaignData.payout}</PaymentDetailValue>
                </PaymentCardDetail>
                <PaymentCardDetail>
                  <PaymentDetailLabel>Potential Bonus</PaymentDetailLabel>
                  <PaymentDetailValue>
                    {campaignData.bonusAmount}
                  </PaymentDetailValue>
                </PaymentCardDetail>
                <PaymentCardNote>
                  <AlertCircle size={14} />
                  Bonus applies if engagement exceeds 20% of your average rate
                </PaymentCardNote>
              </PaymentCardContent>
            </PaymentCardLarge>
          </PaymentOverview>

          {isCreator && (
            <>
              <PaymentProcessSection>
                <SectionSubtitle>Payment Schedule</SectionSubtitle>
                <PaymentProcessSteps>
                  <PaymentProcessStep>
                    <PaymentStepNumber>1</PaymentStepNumber>
                    <PaymentStepContent>
                      <PaymentStepTitle>Content Approval</PaymentStepTitle>
                      <PaymentStepDescription>
                        First payment (₹2,500) released when your content is
                        approved
                      </PaymentStepDescription>
                    </PaymentStepContent>
                    <PaymentStepStatus status="pending">
                      Pending
                    </PaymentStepStatus>
                  </PaymentProcessStep>
                  <PaymentProcessStep>
                    <PaymentStepNumber>2</PaymentStepNumber>
                    <PaymentStepContent>
                      <PaymentStepTitle>Content Publishing</PaymentStepTitle>
                      <PaymentStepDescription>
                        Second payment (₹2,500) released after content is
                        published
                      </PaymentStepDescription>
                    </PaymentStepContent>
                    <PaymentStepStatus status="pending">
                      Pending
                    </PaymentStepStatus>
                  </PaymentProcessStep>
                  <PaymentProcessStep>
                    <PaymentStepNumber>3</PaymentStepNumber>
                    <PaymentStepContent>
                      <PaymentStepTitle>
                        Performance Evaluation
                      </PaymentStepTitle>
                      <PaymentStepDescription>
                        Bonus payment (₹1,000) if performance targets are met
                      </PaymentStepDescription>
                    </PaymentStepContent>
                    <PaymentStepStatus status="pending">
                      Pending
                    </PaymentStepStatus>
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
            </>
          )}
        </SectionCard>
      </TabContentContainer>
    );
  }
};

// Additional Styled Components for new features

const RoleToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ToggleButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background: ${(props) => (props.active ? "#1E3A8A" : "white")};
  color: ${(props) => (props.active ? "white" : "#374151")};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.active ? "#2563eb" : "#f9fafb")};
  }
`;

const UnreadBadge = styled.span`
  background-color: #ef4444;
  color: white;
  font-size: 10px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
`;

const MessagesSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
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

const MessageItem = styled.div<{ isUser: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
`;

const MessageContent = styled.div<{ isUser: boolean }>`
  max-width: 70%;
  padding: 1rem;
  background-color: ${(props) => (props.isUser ? "#eff6ff" : "white")};
  border: 1px solid ${(props) => (props.isUser ? "#bfdbfe" : "#e5e7eb")};
  border-radius: 8px;
  border-top-right-radius: ${(props) => (props.isUser ? "0" : "inherit")};
  border-top-left-radius: ${(props) => (props.isUser ? "inherit" : "0")};
`;

const MessageSender = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
`;

const MessageText = styled.div`
  font-size: 0.875rem;
  color: #374151;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const MessageTime = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
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
  font-size: 0.875rem;
  color: #374151;
  resize: none;
  min-height: 40px;
  max-height: 120px;

  &:focus {
    outline: none;
    border-color: #1e3a8a;
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
  color: #6b7280;
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
  background-color: #1e3a8a;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #2563eb;
  }
`;

const SectionSubtitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 1.5rem 0 1rem 0;
`;

const PaymentOverview = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const PaymentCardLarge = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  overflow: hidden;
`;

const PaymentCardDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
  }
`;

const PaymentDetailLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const PaymentDetailValue = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
`;

const PaymentCardNote = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid #e5e7eb;

  svg {
    color: #d97706;
  }
`;

const PaymentProcessSection = styled.div`
  margin-bottom: 2rem;
`;

const PaymentProcessSteps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PaymentProcessStep = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
`;

const PaymentStepNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #1e3a8a;
  color: white;
  font-weight: 600;
  border-radius: 50%;
  flex-shrink: 0;
`;

const PaymentStepContent = styled.div`
  flex: 1;
`;

const PaymentStepTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
`;

const PaymentStepDescription = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const PaymentStepStatus = styled.div<{ status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${(props) => {
    switch (props.status) {
      case "completed":
        return "#ecfdf5";
      case "processing":
        return "#eff6ff";
      default:
        return "#f3f4f6";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "completed":
        return "#059669";
      case "processing":
        return "#2563eb";
      default:
        return "#6b7280";
    }
  }};
`;

const PaymentMethodSection = styled.div`
  margin-bottom: 2rem;
`;

const PaymentMethodCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
`;

const PaymentMethodHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
`;

const PaymentMethodTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
`;

const PaymentMethodAction = styled.button`
  font-size: 0.875rem;
  color: #1e3a8a;
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
  font-size: 0.875rem;
  color: #6b7280;
`;

const PaymentMethodValue = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
`;

// Existing styled components from the original file...
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 1rem;
`;

const Header = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #6b7280;
  font-size: 0.875rem;
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover {
    color: #374151;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const CampaignInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BrandLogo = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e5e7eb;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CampaignDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const CampaignTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

const BrandName = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const PayoutInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #ecfdf5;
  color: #059669;
  border-radius: 8px;
  font-weight: 600;
`;

const DeadlineInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #fef3c7;
  color: #d97706;
  border-radius: 8px;
  font-weight: 500;
`;

const TabsContainer = styled.div`
  display: flex;
  background: white;
  border-radius: 12px;
  gap: 0.5rem;
  padding: 0.25rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
`;

const TabButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  background: ${(props) => (props.active ? "#1E3A8A" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#6b7280")};
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${(props) => (props.active ? "#1E3A8A" : "#f3f4f6")};
  }
`;

const MainContent = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  min-width: 0;
`;

const RightSidebar = styled.div`
  width: 300px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const StatusCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const StatusCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const StatusCardTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
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
  font-size: 0.875rem;
  color: #6b7280;
`;

const StatusValue = styled.div<{ highlight?: boolean }>`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${(props) => (props.highlight ? "#059669" : "#111827")};
`;

const ProgressLabel = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  text-align: center;
  margin-top: 0.5rem;
`;

const DeliverableCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const DeliverableCardHeader = styled.div`
  margin-bottom: 1rem;
`;

const DeliverableCardTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
`;

const DeliverableCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SidebarDeliverableItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const SidebarDeliverableCheckbox = styled.div<{ completed: boolean }>`
  width: 16px;
  height: 16px;
  border: 2px solid ${(props) => (props.completed ? "#059669" : "#d1d5db")};
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.completed ? "#059669" : "white")};
  color: white;
  flex-shrink: 0;
`;

const SidebarDeliverableText = styled.div`
  font-size: 0.875rem;
  color: #374151;
`;

const PaymentCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const PaymentCardHeader = styled.div`
  margin-bottom: 1rem;
`;

const PaymentCardTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
`;

const PaymentCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const PaymentAmount = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #059669;
`;

const PaymentTerms = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.4;
`;

const PaymentBonus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #d97706;
  background: #fffbeb;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;

  svg {
    color: #d97706;
    flex-shrink: 0;
  }
`;

const ContactCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ContactCardHeader = styled.div`
  margin-bottom: 1rem;
`;

const ContactCardTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
`;

const ContactCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ContactName = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const ContactDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;

  svg {
    color: #6b7280;
    flex-shrink: 0;
  }
`;

const ContactAction = styled.div`
  display: flex;
  justify-content: center;
`;

const ActionCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ActionCardHeader = styled.div`
  margin-bottom: 1rem;
`;

const ActionCardTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
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
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  width: 100%;

  &:hover {
    background: #f3f4f6;
    border-color: #d1d5db;
  }

  svg {
    color: #1e3a8a;
    flex-shrink: 0;
  }
`;

const TabContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SectionCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
  margin-bottom: 1rem;
`;

const StatusBadge = styled.div<{ status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${(props) => {
    switch (props.status) {
      case "In Progress":
        return "#dbeafe";
      case "Completed":
        return "#ecfdf5";
      case "Pending":
        return "#fef3c7";
      default:
        return "#f3f4f6";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "In Progress":
        return "#1d4ed8";
      case "Completed":
        return "#059669";
      case "Pending":
        return "#d97706";
      default:
        return "#6b7280";
    }
  }};
`;

const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const OverviewItem = styled.div`
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

const OverviewLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
`;

const OverviewValue = styled.div<{ highlight?: boolean }>`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${(props) => (props.highlight ? "#059669" : "#111827")};
`;

const ProgressSection = styled.div`
  margin-top: 1.5rem;
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ProgressTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const ProgressPercentage = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e3a8a;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const ProgressFill = styled.div<{ width: number }>`
  width: ${(props) => props.width}%;
  height: 100%;
  background: linear-gradient(90deg, #1e3a8a, #1d4ed8);
  transition: width 0.3s ease;
`;

const ProgressDetails = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const DeliverablesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DeliverableItem = styled.div<{ completed: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: ${(props) => (props.completed ? "#f0fdf4" : "#f9fafb")};
  border: 1px solid ${(props) => (props.completed ? "#bbf7d0" : "#e5e7eb")};
  border-radius: 8px;
`;

const DeliverableCheckbox = styled.div<{ completed: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid ${(props) => (props.completed ? "#059669" : "#d1d5db")};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.completed ? "#059669" : "white")};
  color: white;
  margin-top: 0.125rem;
`;

const DeliverableContent = styled.div`
  flex: 1;
`;

const DeliverableTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.25rem 0;
`;

const DeliverableDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
`;

const DeliverableStatus = styled.div<{ status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${(props) => {
    switch (props.status) {
      case "submitted":
        return "#dbeafe";
      case "approved":
        return "#ecfdf5";
      case "uploaded":
        return "#fef3c7";
      default:
        return "#f3f4f6";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "submitted":
        return "#1d4ed8";
      case "approved":
        return "#059669";
      case "uploaded":
        return "#d97706";
      default:
        return "#6b7280";
    }
  }};
`;

const TargetsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const TargetItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

const TargetContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const TargetLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const TargetValue = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
`;

const RequirementsCard = styled.div`
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const RequirementsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #0284c7;
  margin-bottom: 1rem;
`;

const RequirementsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.75rem;
`;

const RequirementItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #0c4a6e;

  svg {
    color: #0284c7;
    flex-shrink: 0;
  }
`;

const SubmissionCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const SubmissionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SubmissionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const SubmissionStatus = styled.div<{ status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${(props) => {
    switch (props.status) {
      case "submitted":
        return "#dbeafe";
      case "approved":
        return "#ecfdf5";
      case "uploaded":
        return "#fef3c7";
      default:
        return "#f3f4f6";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "submitted":
        return "#1d4ed8";
      case "approved":
        return "#059669";
      case "uploaded":
        return "#d97706";
      default:
        return "#6b7280";
    }
  }};
`;

const SubmissionDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 1.5rem 0;
`;

const UploadArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  background: #f9fafb;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 1rem;

  &:hover {
    border-color: #1e3a8a;
    background: #f0f9ff;
  }
`;

const UploadIcon = styled.div`
  color: #6b7280;
  margin-bottom: 1rem;
`;

const UploadText = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
  margin: 0 0 0.5rem 0;
  text-align: center;
`;

const UploadSubtext = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  text-align: center;
`;

const UploadProgress = styled.div`
  margin-bottom: 1rem;
`;

const UploadProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const UploadProgressFill = styled.div<{ width: number }>`
  width: ${(props) => props.width}%;
  height: 100%;
  background: #1e3a8a;
  transition: width 0.3s ease;
`;

const UploadProgressText = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
`;

const UploadedFiles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const FilePreview = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  background: white;

  img,
  video {
    width: 100%;
    height: 120px;
    object-fit: cover;
  }
`;

const FileInfo = styled.div`
  padding: 0.75rem;
`;

const FileName = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
  margin-bottom: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FileSize = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
`;

const CaptionSection = styled.div`
  margin-bottom: 1.5rem;
`;

const CaptionLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const CaptionTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  resize: vertical;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: #1e3a8a;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const CaptionTips = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TipItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #6b7280;

  svg {
    color: #1e3a8a;
    flex-shrink: 0;
  }
`;

const SubmissionActions = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 1px solid ${(props) => (props.primary ? "#1E3A8A" : "#d1d5db")};
  background: ${(props) => (props.primary ? "#1E3A8A" : "white")};
  color: ${(props) => (props.primary ? "white" : "#374151")};
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.primary ? "#2563eb" : "#f9fafb")};
  }
`;

const GuidelinesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const GuidelineItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: #374151;

  svg {
    color: #059669;
    margin-top: 0.125rem;
    flex-shrink: 0;
  }
`;

const RequiredElementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const RequiredElement = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
`;

const ElementIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #dbeafe;
  color: #1d4ed8;
  border-radius: 8px;
`;

const ElementContent = styled.div`
  flex: 1;
`;

const ElementLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
`;

const ElementValue = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
`;

const BonusInfo = styled.div`
  padding: 1rem;
  background: #fffbeb;
  border: 1px solid #fbbf24;
  border-radius: 8px;
  color: #92400e;
  font-size: 0.875rem;
`;

const ReviewSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ReviewItem = styled.div`
  padding: 1rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
`;

const ReviewLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
`;

const ReviewValue = styled.div<{ highlight?: boolean; urgent?: boolean }>`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${(props) => {
    if (props.highlight) return "#059669";
    if (props.urgent) return "#dc2626";
    return "#111827";
  }};
`;

const ReviewSubmissionCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const ReviewSubmissionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ReviewSubmissionTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const ReviewSubmissionStatus = styled.div<{ status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${(props) => {
    switch (props.status) {
      case "submitted":
        return "#dbeafe";
      case "approved":
        return "#ecfdf5";
      case "uploaded":
        return "#fef3c7";
      default:
        return "#f3f4f6";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "submitted":
        return "#1d4ed8";
      case "approved":
        return "#059669";
      case "uploaded":
        return "#d97706";
      default:
        return "#6b7280";
    }
  }};
`;

const ReviewFiles = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ReviewFilePreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #f3f4f6;
  border-radius: 8px;
  color: #6b7280;
`;

const MoreFiles = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  padding: 0.5rem;
`;

const ReviewCaption = styled.div`
  font-size: 0.875rem;
  color: #374151;
  background: #f9fafb;
  padding: 0.75rem;
  border-radius: 6px;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: #6b7280;
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin: 1rem 0 0.5rem 0;
`;

const EmptyStateDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  text-align: center;
`;

const PaymentCardAmount = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #059669;
  margin-top: 0.5rem;
`;

export default ContentSubmissionPage;
