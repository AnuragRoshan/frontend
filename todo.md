# Complete "Send Deals" Flow Specification

## 📋 **Overview**
This document outlines the complete UI flow and technical implementation for the "Send Deals" feature, allowing brands to discover influencers and send direct collaboration deals from their campaign cards.

---

## 🎯 **Starting Point: Campaign Card in Draft Section**

### **Campaign Card Layout**
```
┌─────────────────────────────────────┐
│  Summer Fashion Collection 2024  ⋮  │ ← Three dots menu
│  📝 Draft | 👥 Fashion | 📱 Instagram│
│  💰 ₹25,000 | 📅 Dec 20 - Dec 30   │
│  ────────────────────────────────────│
│  📊 0 Deals Sent | 👀 0 Views       │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐│
│  │  Edit   │ │Publish │ │Send Deals││ ← Action buttons
│  └─────────┘ └─────────┘ └─────────┘│
└─────────────────────────────────────┘
```

### **"Send Deals" Button Action**
- **Trigger**: User clicks "Send Deals" button
- **Backend Action**: 
  - Campaign status changes: `campaignStatus: "draft" → "private"`
  - Campaign visibility: `campaignIsPublic: true → false`
- **Navigation**: Redirect to Influencer Discovery page with campaign context

---

## 🔍 **Flow Step 1: Influencer Discovery Landing**

### **Page Layout**
```
┌─────────────────────────────────────┐
│  🔍 Find Influencers                │
│  for "Summer Fashion Collection"    │
│                                     │
│  Campaign Budget: ₹25,000 remaining │
│  Estimated Reach: 0 / 500K         │
│                                     │
│  ┌─────────────────────────────────┐│
│  │  🔍 Search influencers...       ││ 
│  └─────────────────────────────────┘│
│                                     │
│  📊 Filters                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐│
│  │Location │ │Followers│ │Category ││
│  └─────────┘ └─────────┘ └─────────┘│
│                                     │
│  💡 AI Suggestions: Based on your   │
│      campaign, we recommend...      │
│                                     │
│  ┌─────────────────────────────────┐│
│  │     Browse All Influencers     ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

### **Components Needed**
- **CampaignContext Header**: Shows campaign name, budget, estimated reach
- **Search Input**: Real-time influencer search
- **Filter Buttons**: Quick access to filter modal
- **AI Suggestions Carousel**: Recommended influencers
- **Browse Button**: Navigate to full influencer list

### **API Endpoints**
- `GET /api/campaigns/{campaignId}/context` - Get campaign details
- `GET /api/influencers/suggestions?campaignId={id}` - AI recommendations
- `GET /api/influencers/search?query={term}&campaignId={id}` - Search influencers

---

## 🎛️ **Flow Step 2: Filter Configuration**

### **Filter Modal Layout**
```
┌─────────────────────────────────────┐
│  🎛️ Filter Influencers              │
│                                     │
│  📍 Location                        │
│  ☑️ Mumbai    ☑️ Delhi    ☐ Bangalore│
│  ☐ Pune      ☐ Chennai   ☐ All India│
│                                     │
│  👥 Followers                       │
│  ○ 1K-10K    ● 10K-50K   ○ 50K-100K│
│  ○ 100K+     ○ Any                 │
│                                     │
│  📊 Engagement Rate                 │
│  ───●────────── 3.5% minimum       │
│                                     │
│  💰 Rate Range                      │
│  ₹5,000 ──●──●── ₹15,000          │
│                                     │
│  🎯 Category                        │
│  ☑️ Fashion   ☑️ Lifestyle  ☐ Beauty │
│                                     │
│  📅 Availability                    │
│  ☑️ Available for your dates        │
│                                     │
│  ┌─────────┐ ┌─────────────────────┐│
│  │  Reset  │ │   Apply Filters    ││
│  └─────────┘ └─────────────────────┘│
└─────────────────────────────────────┘
```

### **Filter Options**
- **Location**: Multi-select cities/regions
- **Followers**: Range selection (1K-10K, 10K-50K, 50K-100K, 100K+)
- **Engagement Rate**: Slider (minimum percentage)
- **Rate Range**: Price range slider
- **Category**: Multi-select interests/niches
- **Availability**: Date range availability check

### **API Endpoint**
- `POST /api/influencers/filter` - Apply filters and get results

---

## 📱 **Flow Step 3: Influencer Search Results**

### **Results Page Layout**
```
┌─────────────────────────────────────┐
│  🔍 24 Influencers Found            │
│  📊 Sort: ⬇️ Best Match             │
│                                     │
│  ┌─────────────────────────────────┐│
│  │ ☐ @fashionista_priya        🔥  ││ ← Checkbox for bulk selection
│  │ 📸 [Profile Image]              ││
│  │ 👥 45K followers | 📊 4.2% eng  ││
│  │ 📍 Mumbai | 👩 Female 25-30     ││
│  │ 💰 ₹12K/post | ⭐ 4.8 (47 reviews)││
│  │ 📈 "Authentic style content"    ││
│  │                                 ││
│  │ ┌───────────┐ ┌─────────────────┐││
│  │ │View Profile│ │   Send Deal    │││
│  │ └───────────┘ └─────────────────┘││
│  └─────────────────────────────────┘│
│                                     │
│  ── Selected: 0 influencers ───────  │
│  💰 Est. Cost: ₹0                  │
│  📊 Est. Reach: 0                  │
│                                     │
│  ┌─────────────────────────────────┐│
│  │      Send Deals to Selected    ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

### **Influencer Card Data Structure**
```javascript
{
  influencerId: "inf_1234567890",
  username: "@fashionista_priya",
  profileImage: "https://...",
  followers: 45000,
  engagementRate: 4.2,
  location: "Mumbai",
  gender: "Female",
  ageRange: "25-30",
  suggestedRate: 12000,
  rating: 4.8,
  reviewCount: 47,
  bio: "Authentic style content",
  aiMatchScore: 95, // For 🔥 indicator
  isSelected: false
}
```

### **Selection Features**
- **Individual Selection**: Checkbox per influencer
- **Bulk Selection**: Select all/none buttons
- **Real-time Calculations**: Auto-update cost and reach estimates
- **Selection Limit**: Maximum 20 influencers per batch

### **API Endpoints**
- `GET /api/influencers?filters={...}&page={n}&limit={20}` - Get influencer list
- `GET /api/influencers/{id}/profile` - Individual profile details

---

## 🎨 **Flow Step 4: Deal Creation Choice**

### **Choice Modal After Selection**
```
┌─────────────────────────────────────┐
│  ✅ 4 Influencers Selected          │
│                                     │
│  ☑️ @fashionista_priya (45K) - ₹12K │
│  ☑️ @style_with_riya (28K) - ₹8K    │
│  ☑️ @mumbai_fashion (85K) - ₹20K    │
│  ☑️ @desi_style_queen (15K) - ₹5K   │
│                                     │
│  💰 Total Estimated: ₹45,000        │
│                                     │
│  ┌─────────────────────────────────┐│
│  │    Choose Deal Creation Type    ││
│  │                                 ││
│  │  ┌─────────────┐ ┌─────────────┐││
│  │  │ Bulk Deals │ │Custom Deals │││
│  │  │ (Same Terms)│ │(Individual) │││
│  │  └─────────────┘ └─────────────┘││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

### **Choice Options**
- **Bulk Deals**: Same terms for all selected influencers
- **Custom Deals**: Individual terms per influencer
- **Hybrid**: AI-suggested combination

---

## 📦 **Flow Step 5A: Bulk Deal Creation**

### **Bulk Deal Configuration Screen**
```
┌─────────────────────────────────────┐
│  📦 Bulk Deal Setup                 │
│  Sending to: 4 influencers         │
│                                     │
│  💰 Payment Strategy                │
│  ┌─────────────────────────────────┐│
│  │ ● Fixed Amount for All          ││
│  │   ┌─────────┐                   ││
│  │   │ ₹10,000│ per influencer     ││
│  │   └─────────┘                   ││
│  │                                 ││
│  │ ○ Percentage of Their Rate      ││
│  │   ──●─── 80% of suggested rate  ││
│  │                                 ││
│  │ ○ Budget Distribution           ││
│  │   Split ₹45K based on followers ││
│  └─────────────────────────────────┘│
│                                     │
│  📦 Deliverables (Same for All)     │
│  ┌─────────────────────────────────┐│
│  │ ☑️ 2 Instagram Posts           ││
│  │ ☑️ 5 Instagram Stories         ││
│  │ ☑️ 1 Instagram Reel            ││
│  │ ☐ 1 IGTV Video                ││
│  └─────────────────────────────────┘│
│                                     │
│  📅 Timeline (Same for All)         │
│  Content Deadline: [Dec 25, 2024]  │
│  Go Live Date: [Dec 27, 2024]      │
│                                     │
│  💬 Message Template               │
│  ┌─────────────────────────────────┐│
│  │ Hi {name}! We love your style   ││
│  │ and would love to collaborate   ││
│  │ on our summer collection...     ││
│  └─────────────────────────────────┘│
│                                     │
│  ☑️ Allow individual negotiation    │
│                                     │
│  ┌─────────┐ ┌─────────────────────┐│
│  │ Preview │ │   Send Bulk Deals  ││
│  └─────────┘ └─────────────────────┘│
└─────────────────────────────────────┘
```

### **Bulk Deal Data Structure (Aligns with Deal Schema)**
```javascript
// Template for all deals
const bulkDealTemplate = {
  dealType: "private_invite",
  dealSource: "direct_invite",
  dealAmount: 10000, // Or calculated amount
  dealCurrency: "INR",
  dealPaymentStructure: "completion",
  dealNegotiableAmount: true,
  
  // Deliverables (same for all)
  dealDeliverables: [
    {
      dealDeliverableId: generateUniqueId("deliv"),
      dealDeliverableType: "Posts",
      dealDeliverablePlatform: "Instagram", 
      dealDeliverableQuantity: 2,
      dealDeliverableDescription: "2 Instagram posts featuring summer collection",
      dealDeliverableDeadline: "2024-12-25T23:59:59Z",
      dealDeliverableStatus: "pending"
    },
    {
      dealDeliverableId: generateUniqueId("deliv"),
      dealDeliverableType: "Stories",
      dealDeliverablePlatform: "Instagram",
      dealDeliverableQuantity: 5,
      dealDeliverableDescription: "5 Instagram stories showcasing products",
      dealDeliverableDeadline: "2024-12-25T23:59:59Z", 
      dealDeliverableStatus: "pending"
    },
    {
      dealDeliverableId: generateUniqueId("deliv"),
      dealDeliverableType: "Reels",
      dealDeliverablePlatform: "Instagram",
      dealDeliverableQuantity: 1,
      dealDeliverableDescription: "1 Instagram reel with styling tips",
      dealDeliverableDeadline: "2024-12-25T23:59:59Z",
      dealDeliverableStatus: "pending"
    }
  ],
  
  // Timeline
  dealSubmissionDeadline: "2024-12-25T23:59:59Z",
  dealPostingDeadline: "2024-12-27T23:59:59Z",
  dealCampaignStartDate: "2024-12-20T00:00:00Z",
  dealCampaignEndDate: "2024-12-30T23:59:59Z",
  dealExpiryDate: "2024-12-27T23:59:59Z", // 7 days from send
  
  // Content requirements
  dealHashtags: ["#SummerFashion", "#SustainableFashion", "#TropicalVibes"],
  dealMentions: ["@brandhandle"],
  dealDisclosureRequirements: ["#ad", "#sponsored"],
  
  // Contract details
  dealContract: {
    dealContractTerms: "Standard collaboration terms...",
    dealContractUsageRights: "Brand can repost content for 6 months",
    dealContractRevisionRounds: 3,
    dealContractCancellationPolicy: "48-hour cancellation notice required"
  },
  
  // Guidelines
  dealContentGuidelines: [
    "Use natural lighting",
    "Show product in lifestyle settings",
    "Include styling tips"
  ],
  dealDosAndDonts: {
    dealDos: ["Tag our brand handle", "Use provided hashtags"],
    dealDonts: ["Use heavy filters", "Mention competitors"]
  }
}
```

---

## 🎨 **Flow Step 5B: Custom Deal Creation**

### **Custom Deal Selection Interface**
```
┌─────────────────────────────────────┐
│  🎨 Custom Deal Creation            │
│  Create individual deals for each   │
│                                     │
│  Select influencers to customize:   │
│                                     │
│  ┌─────────────────────────────────┐│
│  │ ● @fashionista_priya (45K)      ││ ← Selected for customization
│  │   Suggested: ₹12K               ││
│  │   ┌─────────────────────────────┐││
│  │   │      Customize Deal        │││
│  │   └─────────────────────────────┘││
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │ ○ @style_with_riya (28K)        ││ ← Use default
│  │   Will use: ₹8K default         ││
│  │   ┌─────────────────────────────┐││
│  │   │      Use Default Deal      │││
│  │   └─────────────────────────────┘││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

### **Individual Deal Customization Screen**
```
┌─────────────────────────────────────┐
│  🎨 Custom Deal: @fashionista_priya  │
│  (45K followers | 4.2% engagement)  │
│                                     │
│  💰 Payment                         │
│  ┌─────────┐ (Suggested: ₹12K)      │
│  │ ₹15,000│ ☑️ Negotiable           │
│  └─────────┘                        │
│                                     │
│  📦 Deliverables                    │
│  ☑️ 3 Instagram Posts (vs 2 default)│
│  ☑️ 8 Instagram Stories (vs 5)     │
│  ☑️ 2 Instagram Reels (vs 1)       │
│  ☑️ 1 IGTV Video (extra)           │
│                                     │
│  📅 Custom Timeline                 │
│  Content Deadline: [Dec 23, 2024]  │
│  Go Live: [Dec 25, 2024]           │
│                                     │
│  🎯 Special Requirements            │
│  ┌─────────────────────────────────┐│
│  │ • Feature in main feed          ││
│  │ • Include brand story mention   ││
│  │ • Use specific hashtag #PriyaXBrand││
│  │ • Tag brand in all content     ││
│  └─────────────────────────────────┘│
│                                     │
│  💬 Personal Message               │
│  ┌─────────────────────────────────┐│
│  │ Hi Priya! As our top choice...  │││
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────┐ ┌─────────────────────┐│
│  │  Back   │ │   Save & Next      ││
│  └─────────┘ └─────────────────────┘│
└─────────────────────────────────────┘
```

### **Custom Deal Data Structure**
```javascript
const customDeal = {
  // Basic deal info (same as bulk template)
  dealId: generateUniqueId("deal"),
  campaignId: campaign.campaignId,
  influencerId: "inf_fashionista_priya",
  brandId: campaign.campaignCreatedBy,
  dealType: "private_invite",
  dealSource: "direct_invite",
  dealStatus: "sent",
  dealPriority: "high", // Custom deals can have priority
  
  // Custom financial terms
  dealAmount: 15000, // Custom amount
  dealCurrency: "INR",
  dealPaymentStructure: "milestone", // Different payment structure
  dealPaymentMilestones: [
    {
      dealMilestoneId: generateUniqueId("milestone"),
      dealMilestoneName: "Deal Acceptance",
      dealMilestoneAmount: 5000,
      dealMilestonePercentage: 33,
      dealMilestoneStatus: "pending"
    },
    {
      dealMilestoneId: generateUniqueId("milestone"),
      dealMilestoneName: "Content Approval", 
      dealMilestoneAmount: 5000,
      dealMilestonePercentage: 33,
      dealMilestoneStatus: "pending"
    },
    {
      dealMilestoneId: generateUniqueId("milestone"),
      dealMilestoneName: "Content Live",
      dealMilestoneAmount: 5000,
      dealMilestonePercentage: 34,
      dealMilestoneStatus: "pending"
    }
  ],
  
  // Custom deliverables
  dealDeliverables: [
    {
      dealDeliverableId: generateUniqueId("deliv"),
      dealDeliverableType: "Posts",
      dealDeliverablePlatform: "Instagram",
      dealDeliverableQuantity: 3, // Custom quantity
      dealDeliverableDescription: "3 high-quality Instagram posts featuring summer collection in main feed",
      dealDeliverableDeadline: "2024-12-23T23:59:59Z", // Earlier deadline
      dealDeliverableStatus: "pending"
    },
    {
      dealDeliverableId: generateUniqueId("deliv"),
      dealDeliverableType: "Stories",
      dealDeliverablePlatform: "Instagram",
      dealDeliverableQuantity: 8, // More stories
      dealDeliverableDescription: "8 Instagram stories showcasing products with brand mention",
      dealDeliverableDeadline: "2024-12-23T23:59:59Z",
      dealDeliverableStatus: "pending"
    },
    {
      dealDeliverableId: generateUniqueId("deliv"),
      dealDeliverableType: "Reels",
      dealDeliverablePlatform: "Instagram", 
      dealDeliverableQuantity: 2, // More reels
      dealDeliverableDescription: "2 Instagram reels with styling tips and product features",
      dealDeliverableDeadline: "2024-12-23T23:59:59Z",
      dealDeliverableStatus: "pending"
    },
    {
      dealDeliverableId: generateUniqueId("deliv"),
      dealDeliverableType: "IGTV",
      dealDeliverablePlatform: "Instagram",
      dealDeliverableQuantity: 1, // Exclusive deliverable
      dealDeliverableDescription: "1 IGTV video showing complete styling process",
      dealDeliverableDeadline: "2024-12-23T23:59:59Z",
      dealDeliverableStatus: "pending"
    }
  ],
  
  // Custom timeline
  dealSubmissionDeadline: "2024-12-23T23:59:59Z",
  dealPostingDeadline: "2024-12-25T23:59:59Z",
  dealCampaignStartDate: "2024-12-20T00:00:00Z",
  dealCampaignEndDate: "2024-12-30T23:59:59Z",
  dealExpiryDate: "2024-12-27T23:59:59Z",
  
  // Custom requirements
  dealHashtags: ["#SummerFashion", "#PriyaXBrand", "#SustainableFashion"],
  dealSpecialRequirements: "Feature in main feed, Include brand story mention, Use specific hashtag #PriyaXBrand, Tag brand in all content",
  
  // Personal message
  dealApplicationMessage: "Hi Priya! As our top choice for this campaign, we'd love to offer you an exclusive deal...",
  
  // Rest same as template...
}
```

---

## 📋 **Flow Step 6: Deal Queue Management**

### **Deal Queue Interface**
```
┌─────────────────────────────────────┐
│  📋 Deal Queue (4 deals to send)    │
│                                     │
│  ✅ @fashionista_priya - Customized │
│      ₹15K | 3 Posts + 8 Stories + 2 Reels│
│      Status: Ready                  │
│                                     │
│  🔄 @style_with_riya - Default      │
│      ₹8K | 2 Posts + 5 Stories + 1 Reel│
│      Status: Using template         │
│                                     │
│  ⏳ @mumbai_fashion - Customizing   │
│      ₹? | Pending customization     │
│      ┌─────────────────────────────┐│
│      │      Continue Setup        ││
│      └─────────────────────────────┘│
│                                     │
│  🔄 @desi_style_queen - Default     │
│      ₹5K | 2 Posts + 5 Stories + 1 Reel│
│      Status: Using template         │
│                                     │
│  ──────────────────────────────────  │
│  💰 Total Estimated: ₹28K+ (pending)│
│                                     │
│  ┌─────────────────────────────────┐│
│  │      Complete All Deals        ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

### **Queue Management Features**
- **Progress Tracking**: Show completion status per deal
- **Edit Option**: Modify deals before sending
- **Budget Tracking**: Real-time total calculation
- **Validation**: Ensure all required fields completed

---

## 👀 **Flow Step 7: Final Review**

### **Final Review Screen**
```
┌─────────────────────────────────────┐
│  👀 Final Review - Send 4 Deals     │
│                                     │
│  📊 Deal Breakdown:                 │
│                                     │
│  🌟 Premium Deal                    │
│  @fashionista_priya: ₹15K          │
│  3 Posts + 8 Stories + 2 Reels + IGTV│
│                                     │
│  📱 Standard Deal                   │
│  @style_with_riya: ₹8K             │
│  2 Posts + 5 Stories + 1 Reel      │
│                                     │
│  🎯 Mega Deal                       │
│  @mumbai_fashion: ₹25K             │
│  4 Posts + 10 Stories + 3 Reels    │
│                                     │
│  💝 Starter Deal                    │
│  @desi_style_queen: ₹5K            │
│  2 Posts + 5 Stories + 1 Reel      │
│                                     │
│  ──────────────────────────────────  │
│  💰 Total Budget: ₹53,000           │
│  📊 Expected Reach: 173K            │
│  📈 Expected Engagement: 7.2K       │
│                                     │
│  ⚠️ Over campaign budget by ₹3K     │
│                                     │
│  ┌─────────┐ ┌─────────────────────┐│
│  │ Adjust  │ │  Send All Deals    ││
│  └─────────┘ └─────────────────────┘│
└─────────────────────────────────────┘
```

### **Review Features**
- **Budget Validation**: Check against campaign budget
- **Reach Estimation**: Calculate expected performance
- **Warning System**: Alert if over budget
- **Edit Option**: Last chance to modify deals

---

## ✅ **Flow Step 8: Deal Sending & Confirmation**

### **Sending Process**
1. **Validation**: Final validation of all deal data
2. **Database Creation**: Create deal records in MongoDB
3. **Notification**: Send notifications to influencers
4. **Confirmation**: Show success message

### **Backend Process**
```javascript
// For each deal in queue
const dealCreationProcess = async (dealData) => {
  // 1. Generate unique deal ID
  dealData.dealId = generateUniqueId("deal");
  
  // 2. Set common fields
  dealData.dealStatus = "sent";
  dealData.dealCreatedBy = brandUserId;
  dealData.dealUpdatedBy = brandUserId;
  dealData.dealCreatedAt = new Date();
  dealData.dealUpdatedAt = new Date();
  
  // 3. Set POC information from campaign
  dealData.dealBrandPOC = {
    dealPOCName: campaign.campaignPOC.campaignPOCName,
    dealPOCEmail: campaign.campaignPOC.campaignPOCEmail,
    dealPOCPhone: campaign.campaignPOC.campaignPOCPhone,
    dealPOCRole: "Campaign Manager"
  };
  
  // 4. Create deal in database
  const savedDeal = await DealModel.create(dealData);
  
  // 5. Send notification to influencer
  await sendInfluencerNotification(savedDeal.influencerId, {
    type: "deal_received",
    dealId: savedDeal.dealId,
    campaignName: campaign.campaignName,
    brandName: brand.name,
    amount: savedDeal.dealAmount
  });
  
  return savedDeal;
};
```

### **Confirmation Screen**
```
┌─────────────────────────────────────┐
│  ✅ Deals Sent Successfully!        │
│                                     │
│  📊 Deal Summary:                   │
│  • 4 deals sent                    │
│  • Total value: ₹53,000            │
│  • Remaining budget: ₹22,000       │
│                                     │
│  📱 Influencers will be notified:   │
│  ┌─────────────────────────────────┐│
│  │ ✅ @style_with_riya - Deal #D001││
│  │ ✅ @fashionista_priya - Deal #D002││
│  │ ✅ @mumbai_fashion - Deal #D003 ││
│  │ ✅ @desi_style_queen - Deal #D004││
│  └─────────────────────────────────┘│
│                                     │
│  ⏰ Deals expire in 7 days          │
│                                     │
│  ┌─────────────────────────────────┐│
│  │          Track Deals           ││
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────────┐ ┌─────────────────┐│
│  │Send More Deals│ │  Back to Campaign││
│  └─────────────┘ └─────────────────┘│
└─────────────────────────────────────┘
```

---

## 📊 **Flow Step 9: Deal Tracking Dashboard**

### **Deal Tracking Layout**
```
┌─────────────────────────────────────┐
│  📊 Campaign: Summer Fashion Collection│
│  Status: Private | 4 Deals Sent    │
│                                     │
│  💰 Budget: ₹22K remaining / ₹75K   │
│  ████████████░░░ 71% utilized      │
│                                     │
│  📈 Deal Status Overview:           │
│  🟡 Sent: 4  ⚪ Viewed: 0  🟢 Accepted: 0│
│                                     │
│  ┌─────────────────────────────────┐│
│  │ 🟡 @style_with_riya             ││
│  │ Deal #D001 | ₹8,000 | Sent     ││
│  │ ⏰ Expires in 6d 23h            ││
│  │ ┌─────────┐ ┌─────────────────┐ ││
│  │ │View Deal│ │  Send Message  │ ││
│  │ └─────────┘ └─────────────────┘ ││
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │ 🟢 @fashionista_priya           ││
│  │ Deal #D002 | ₹15,000 | Accepted││
│  │ ✅ Deal accepted 2h ago         ││
│  │ ┌─────────┐ ┌─────────────────┐ ││
│  │ │View Deal│ │  Send Message  │ ││
│  │ └─────────┘ └─────────────────┘ ││
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────────────────────────────┐│
│  │        Send More Deals         ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

### **Deal Status Indicators**
- **🟡 Sent**: Deal sent, waiting for influencer response
- **👁️ Viewed**: Influencer has viewed the deal
- **💬 Negotiating**: Deal is being negotiated
- **🟢 Accepted**: Deal accepted by influencer
- **❌ Rejected**: Deal rejected by influencer
- **⏰ Expired**: Deal offer has expired

---

## 🛠️ **Technical Implementation Requirements**

### **Required API Endpoints**

#### **Campaign Management**
- `PATCH /api/campaigns/{id}/status` - Update campaign status to private
- `GET /api/campaigns/{id}/context` - Get campaign context for deals

#### **Influencer Discovery**
- `GET /api/influencers/search` - Search influencers with filters
- `GET /api/influencers/suggestions` - AI-powered recommendations
- `GET /api/influencers/{id}/profile` - Get detailed influencer profile

#### **Deal Management**
- `POST /api/deals/bulk` - Create multiple deals at once
- `POST /api/deals/custom` - Create individual custom deal
- `GET /api/deals/campaign/{campaignId}` - Get all deals for campaign
- `PATCH /api/deals/{id}/status` - Update deal status
- `POST /api/deals/{id}/messages` - Send message in deal

#### **Notifications**
- `POST /api/notifications/influencer` - Send notification to influencer
- `GET /api/notifications/brand` - Get brand notifications

### **Required Database Collections**

#### **Deals Collection** (Matches our Deal Schema)
```javascript
{
  _id: ObjectId,
  dealId: String (unique),
  campaignId: String (ref to campaigns),
  influencerId: String (ref to influencers),
  brandId: String (ref to brands),
  dealStatus: String (enum),
  dealType: String (enum),
  dealAmount: Number,
  dealDeliverables: Array,
  dealMessages: Array,
  dealMetrics: Object,
  // ... all other schema fields
  dealCreatedAt: Date,
  dealUpdatedAt: Date
}
```

#### **Notifications Collection**
```javascript
{
  _id: ObjectId,
  notificationId: String,
  recipientId: String,
  recipientType: String, // "influencer" | "brand"
  type: String, // "deal_received", "deal_accepted", etc.
  title: String,
  message: String,
  data: Object, // Additional notification data
  isRead: Boolean,
  createdAt: Date
}
```

### **Required React Components**

#### **Main Flow Components**
- `InfluencerDiscovery.tsx` - Main discovery page
- `InfluencerFilters.tsx` - Filter modal component
- `InfluencerSearchResults.tsx` - Results listing
- `DealCreationChoice.tsx` - Bulk vs Custom choice
- `BulkDealCreation.tsx` - Bulk deal form
- `CustomDealCreation.tsx` - Individual deal form
- `DealQueue.tsx` - Deal queue management
- `DealReview.tsx` - Final review screen
- `DealConfirmation.tsx` - Success confirmation
- `DealTrackingDashboard.tsx` - Deal status tracking

#### **Reusable Components**
- `InfluencerCard.tsx` - Individual influencer display
- `DealStatusBadge.tsx` - Status indicator component
- `BudgetTracker.tsx` - Budget visualization
- `DeliverableSelector.tsx` - Deliverable configuration
- `TimelinePicker.tsx` - Deadline selection
- `MessageTemplate.tsx` - Message composition

#### **Utility Components**
- `ProgressIndicator.tsx` - Multi-step progress
- `BulkActions.tsx` - Batch operation controls
- `FilterChips.tsx` - Active filter display
- `LoadingStates.tsx` - Loading and skeleton states

### **State Management Structure**

#### **Deal Creation Store**
```javascript
const dealCreationStore = {
  // Campaign context
  campaign: Campaign,
  
  // Discovery state
  selectedInfluencers: Influencer[],
  searchFilters: FilterOptions,
  searchResults: Influencer[],
  
  // Deal creation state
  dealType: "bulk" | "custom",
  bulkDealTemplate: BulkDealData,
  customDeals: Map<influencerId, CustomDealData>,
  dealQueue: DealData[],
  
  // Process state
  currentStep: number,
  isLoading: boolean,
  errors: ErrorState[],
  
  // Actions
  selectInfluencer: (influencer) => void,
  updateFilters: (filters) => void,
  createBulkDeal: (template) => void,
  createCustomDeal: (influencerId, data) => void,
  sendDeals: () => Promise<void>
}
```

---

## 🔄 **Deal Status Flow**

### **Complete Deal Lifecycle**
```
draft → sent → viewed → negotiating → accepted → in_progress → content_submitted → content_approved → live → completed
                  ↓
               rejected | expired | cancelled | disputed
```

### **Status Transitions**
- **draft**: Deal being created by brand
- **sent**: Deal sent to influencer (our starting point)
- **viewed**: Influencer has opened the deal
- **negotiating**: Counter-proposals being exchanged
- **accepted**: Both parties agreed on terms
- **rejected**: Influencer declined the deal
- **expired**: Deal offer time limit exceeded
- **in_progress**: Content creation started
- **content_submitted**: Influencer submitted content for review
- **content_approved**: Brand approved the content
- **live**: Content is published and live
- **completed**: All deliverables completed and payments released
- **cancelled**: Deal cancelled by either party
- **disputed**: Deal is in dispute resolution

---

## 🎯 **Success Metrics & Analytics**

### **Key Performance Indicators**
- **Deal Acceptance Rate**: Percentage of sent deals that are accepted
- **Time to Accept**: Average time from sent to accepted
- **Budget Utilization**: Percentage of campaign budget used
- **Reach per Rupee**: Cost efficiency metric
- **Completion Rate**: Percentage of accepted deals completed successfully

### **Analytics Dashboard Data**
```javascript
const campaignAnalytics = {
  totalDeals: {
    sent: 15,
    accepted: 12,
    rejected: 2,
    expired: 1
  },
  budgetMetrics: {
    allocated: 75000,
    utilized: 53000,
    remaining: 22000,
    utilization: 70.67
  },
  performanceMetrics: {
    expectedReach: 285000,
    actualReach: 0, // Will be updated as content goes live
    averageEngagement: 4.2,
    costPerReach: 0.19
  },
  timeline: {
    averageAcceptanceTime: "2.3 days",
    contentDeadlines: {
      upcoming: 3,
      overdue: 0
    }
  }
}
```

---

## 🚀 **Implementation Priority**

### **Phase 1: Core Flow (Week 1-2)**
1. Campaign card "Send Deals" button
2. Basic influencer discovery page
3. Simple filter system
4. Bulk deal creation
5. Deal sending functionality

### **Phase 2: Enhanced Features (Week 3-4)**
1. Custom deal creation
2. Deal queue management
3. Final review system
4. Deal tracking dashboard
5. Real-time status updates

### **Phase 3: Advanced Features (Week 5-6)**
1. AI-powered recommendations
2. Advanced filtering
3. Negotiation system
4. Performance analytics
5. Mobile optimization

### **Phase 4: Optimization (Week 7-8)**
1. Performance improvements
2. Advanced animations
3. Bulk operations optimization
4. Error handling enhancement
5. User experience polish

---

This specification provides a complete roadmap for implementing the "Send Deals" feature, ensuring all components align with the Deal schema and provide a seamless user experience for brands to discover and collaborate with influencers.