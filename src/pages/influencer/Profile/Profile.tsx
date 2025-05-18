"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { sharedTheme } from "../../../styles/theme/theme";
import {
  ArrowLeft,
  Share2,
  Edit,
  ExternalLink,
  MessageSquare,
  Calendar,
  Star,
  Award,
  Users,
  ImageIcon,
  Video,
  Eye,
  ThumbsUp,
  DollarSign,
  Briefcase,
  User,
  MapPin,
  Mail,
  Instagram,
  Twitter,
  Youtube,
  Globe,
  Check,
  ChevronDown,
  ChevronUp,
  Heart,
  Clipboard,
  BarChart2,
  TrendingUp,
  Percent,
  Filter,
  Search,
  Grid,
  List,
  X,
  ChevronRight,
} from "lucide-react";

// Sample user data
const userData = {
  id: "inf123",
  name: "Priya Sharma",
  username: "@priyacreates",
  profilePicture:
    "https://img.freepik.com/free-photo/portrait-young-indian-top-manager-t-shirt-tie-crossed-arms-smiling-white-isolated-wall_496169-1513.jpg?w=740&t=st=1716063772~exp=1716064372~hmac=bdb3ba1fae1e15d9f38f3e71887c8c3df0d46c89a41318169ff2db00c47ea93a",
  bio: "Lifestyle content creator specializing in fashion, travel, and sustainable living. Helping brands tell authentic stories that resonate with modern audiences.",
  location: "Mumbai, India",
  email: "priya@creatormail.com",
  socialMedia: {
    instagram: "priyacreates",
    twitter: "priyacreates",
    youtube: "PriyaCreates",
    website: "www.priyacreates.com",
  },
  tags: ["Fashion", "Travel", "Lifestyle", "Sustainability", "Beauty"],
  metrics: {
    followers: 78500,
    engagementRate: 3.8,
    totalCampaigns: 47,
    avgRating: 4.8,
  },
  contentTypes: ["Photos", "Videos", "Stories", "Reels", "Blog Posts"],
  languages: ["English", "Hindi"],
  targetDemographics: {
    ageRange: "18-35",
    gender: "70% Female, 30% Male",
    topLocations: ["Mumbai", "Delhi", "Bangalore", "Chennai"],
  },
  rates: {
    instagram: {
      post: "₹25,000 - ₹35,000",
      story: "₹10,000 - ₹15,000",
      reel: "₹40,000 - ₹50,000",
    },
    youtube: {
      video: "₹50,000 - ₹80,000",
      shorts: "₹30,000 - ₹40,000",
    },
  },
  achievements: [
    "Best Fashion Creator Award 2024",
    "Featured in Vogue India's 'Creators to Watch' 2023",
    "Brand Ambassador for SustainStyle 2023-24",
  ],
};

// Sample campaigns data
const pastCampaigns = [
  {
    id: 1,
    title: "Summer Collection Launch",
    brand: "StyleHub",
    brandLogo:
      "https://img.freepik.com/free-vector/colorful-letter-gradient-logo-design_474888-2309.jpg?semt=ais_hybrid&w=740",
    date: "May 2024",
    coverImage:
      "https://img.freepik.com/free-photo/young-handsome-man-choosing-clothes-shop_1303-19720.jpg?w=740&t=st=1716059100~exp=1716059700~hmac=c9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9",
    description:
      "Launched StyleHub's summer collection featuring sustainable fabrics and versatile designs for the modern wardrobe.",
    metrics: {
      engagement: "5.2%",
      impressions: "125,000",
      clicks: "3,800",
    },
    contentTypes: ["Instagram Posts", "Stories", "Reels"],
    tags: ["fashion", "summer", "sustainable"],
  },
  {
    id: 2,
    title: "Wellness Retreat Series",
    brand: "ZenLife",
    brandLogo:
      "https://img.freepik.com/free-vector/creative-abstract-moon-logo_23-2149201726.jpg?w=740&t=st=1716063862~exp=1716064462~hmac=26e5b2c0dc2af7bb094fbb20e2a54f4ebc42fbe07dd14be6af610d7f6be36125",
    date: "April 2024",
    coverImage:
      "https://img.freepik.com/free-photo/woman-doing-yoga-beach_23-2150267819.jpg?w=740&t=st=1716063905~exp=1716064505~hmac=b09d99f9cf16e8761c8fec93bfb26fbe1debd1c25e7a180dd80af177b9b7843e",
    description:
      "Created a 4-part content series showcasing ZenLife's wellness retreat program, focusing on mindfulness, yoga, and balanced nutrition.",
    metrics: {
      engagement: "4.8%",
      impressions: "98,000",
      clicks: "2,900",
    },
    contentTypes: ["YouTube Video", "Instagram Posts", "Blog"],
    tags: ["wellness", "mindfulness", "yoga"],
  },
  {
    id: 3,
    title: "Eco-Friendly Travel Gear",
    brand: "TravelEco",
    brandLogo:
      "https://img.freepik.com/free-vector/gradient-travel-logo_23-2148546510.jpg?w=740&t=st=1716063952~exp=1716064552~hmac=6bd49c4d7de3a96d37a362c51d4be8ba1ca7ebd96f67eca9a8c7c50a52eb5a4e",
    date: "March 2024",
    coverImage:
      "https://img.freepik.com/free-photo/traveler-standing-sunrise-viewpoint-ja-bo-village-mae-hong-son-province-thailand_335224-1356.jpg?w=740&t=st=1716063983~exp=1716064583~hmac=10e5580c4f5d5a75b78c6226b92f19a5adcc1ee0aa2de68f6e7d743a69de3799",
    description:
      "Showcased TravelEco's line of sustainable travel accessories and clothing, featuring bamboo fabrics and recycled materials.",
    metrics: {
      engagement: "6.1%",
      impressions: "112,000",
      clicks: "4,200",
    },
    contentTypes: ["Instagram Posts", "Reels", "Stories"],
    tags: ["travel", "eco-friendly", "sustainable"],
  },
  {
    id: 4,
    title: "Clean Beauty Collection",
    brand: "PureGlow",
    brandLogo:
      "https://img.freepik.com/free-vector/golden-bird-logo-design_1195-336.jpg?w=740&t=st=1716064019~exp=1716064619~hmac=ec1ddf01e8e7e0ee22794eecea67c7fddb2dec3ba7f03e5c3114e0886d8580fb",
    date: "February 2024",
    coverImage:
      "https://img.freepik.com/free-photo/skin-care-products-arrangement-top-view_23-2149096057.jpg?w=740&t=st=1716064047~exp=1716064647~hmac=66c59f69b81f4b08a38df85e3e1aae9ed92aced72c54531a977bf77e9f4cadb4",
    description:
      "Reviewed and featured PureGlow's new range of clean beauty products, highlighting natural ingredients and cruelty-free manufacturing.",
    metrics: {
      engagement: "5.5%",
      impressions: "104,000",
      clicks: "3,400",
    },
    contentTypes: ["YouTube Video", "Instagram Posts", "Stories"],
    tags: ["beauty", "clean-beauty", "cruelty-free"],
  },
];

// Sample content portfolio
const contentPortfolio = [
  {
    id: 1,
    type: "image",
    thumbnail:
      "https://img.freepik.com/free-photo/full-shot-travel-concept-with-landmarks_23-2149153258.jpg?w=740&t=st=1716064117~exp=1716064717~hmac=f26b2ec80ee68923cbf0c03a8b2c9a9a82dbfba7ef3fd348ef801c1e9d11b829",
    title: "Summer in Santorini",
    campaign: "TravelEco Summer Series",
    metrics: {
      likes: 18500,
      comments: 432,
      shares: 215,
    },
    date: "June 2023",
  },
  {
    id: 2,
    type: "video",
    thumbnail:
      "https://img.freepik.com/free-photo/makeup-accessories-arranged-table_23-2148363696.jpg?w=740&t=st=1716064150~exp=1716064750~hmac=db6d5e0ab394be38c3e10b5cf06f15ef9b2ae4a8e00e2fe82de86a08741a67a1",
    title: "Natural Makeup Tutorial",
    campaign: "PureGlow Beauty",
    metrics: {
      views: 124000,
      likes: 15200,
      comments: 876,
    },
    date: "April 2023",
  },
  {
    id: 3,
    type: "image",
    thumbnail:
      "https://img.freepik.com/free-photo/flat-lay-colorful-arrangement-plastic-waste_23-2148696411.jpg?w=740&t=st=1716064186~exp=1716064786~hmac=6fef26ce5d1c77c8aabcc071ef89da32d2ed5f70e1c5eb14b0d7cf77ad75b6ed",
    title: "Zero Waste Challenge",
    campaign: "EcoLiving Campaign",
    metrics: {
      likes: 12300,
      comments: 528,
      shares: 342,
    },
    date: "March 2023",
  },
  {
    id: 4,
    type: "video",
    thumbnail:
      "https://img.freepik.com/free-photo/woman-practicing-yoga-home_23-2148766843.jpg?w=740&t=st=1716064226~exp=1716064826~hmac=80ba5c9f7cd5bcc6bfbe12c9e06e9b057e14e7afcb94d2cf38c94a3a0f8ceac2",
    title: "Morning Yoga Routine",
    campaign: "ZenLife Wellness",
    metrics: {
      views: 98000,
      likes: 8700,
      comments: 412,
    },
    date: "February 2023",
  },
  {
    id: 5,
    type: "image",
    thumbnail:
      "https://img.freepik.com/free-photo/fashion-elegance-styled-shot-blue-top-skirt-high-heels-earrings-bracelet-other-accessories_146671-14656.jpg?w=740&t=st=1716064258~exp=1716064858~hmac=c2254478a34ecde45c9a3e9a86e0e11afca76651d29ebc85e7ca7b6b5cb28eaa",
    title: "Spring Fashion Essentials",
    campaign: "StyleHub Collection",
    metrics: {
      likes: 14500,
      comments: 378,
      shares: 189,
    },
    date: "May 2023",
  },
  {
    id: 6,
    type: "image",
    thumbnail:
      "https://img.freepik.com/free-photo/plate-with-smoothies-granola-topped-with-fruit_23-2148348114.jpg?w=740&t=st=1716064290~exp=1716064890~hmac=e661e3fb44c52bdfc1f3fae9ba01bbbfdd444bf13fbb4f5ab633f3f7cb0d2c0e",
    title: "Healthy Breakfast Ideas",
    campaign: "NutriLife Foods",
    metrics: {
      likes: 11200,
      comments: 321,
      shares: 156,
    },
    date: "April 2023",
  },
];

// Sample reviews
const reviews = [
  {
    id: 1,
    brand: "StyleHub",
    brandLogo:
      "https://img.freepik.com/free-vector/colorful-letter-gradient-logo-design_474888-2309.jpg?semt=ais_hybrid&w=740",
    rating: 5,
    comment:
      "Priya was a pleasure to work with! Her content perfectly captured our brand essence and resonated deeply with our target audience. Her attention to detail and professionalism made the collaboration seamless.",
    date: "May 2024",
    campaignTitle: "Summer Collection Launch",
  },
  {
    id: 2,
    brand: "ZenLife",
    brandLogo:
      "https://img.freepik.com/free-vector/creative-abstract-moon-logo_23-2149201726.jpg?w=740&t=st=1716063862~exp=1716064462~hmac=26e5b2c0dc2af7bb094fbb20e2a54f4ebc42fbe07dd14be6af610d7f6be36125",
    rating: 4.5,
    comment:
      "Excellent collaboration with Priya. Her content beautifully showcased our wellness retreat program. Authentic, mindful approach that aligned perfectly with our brand values.",
    date: "April 2024",
    campaignTitle: "Wellness Retreat Series",
  },
  {
    id: 3,
    brand: "TravelEco",
    brandLogo:
      "https://img.freepik.com/free-vector/gradient-travel-logo_23-2148546510.jpg?w=740&t=st=1716063952~exp=1716064552~hmac=6bd49c4d7de3a96d37a362c51d4be8ba1ca7ebd96f67eca9a8c7c50a52eb5a4e",
    rating: 5,
    comment:
      "Working with Priya exceeded our expectations. Her travel content showcasing our eco-friendly gear was exceptional, resulting in our highest engagement rates this year. Highly recommend!",
    date: "March 2024",
    campaignTitle: "Eco-Friendly Travel Gear",
  },
  {
    id: 4,
    brand: "PureGlow",
    brandLogo:
      "https://img.freepik.com/free-vector/golden-bird-logo-design_1195-336.jpg?w=740&t=st=1716064019~exp=1716064619~hmac=ec1ddf01e8e7e0ee22794eecea67c7fddb2dec3ba7f03e5c3114e0886d8580fb",
    rating: 4.8,
    comment:
      "Priya created stunning content for our clean beauty line. Her reviews were authentic and informative, and her audience was highly engaged. We saw a significant boost in website traffic following her posts.",
    date: "February 2024",
    campaignTitle: "Clean Beauty Collection",
  },
];

// Sample collaborations
const collaborations = [
  {
    id: 1,
    brand: "StyleHub",
    brandLogo:
      "https://img.freepik.com/free-vector/colorful-letter-gradient-logo-design_474888-2309.jpg?semt=ais_hybrid&w=740",
    type: "Brand Ambassador",
    duration: "January 2024 - Present",
    description:
      "Official brand ambassador for StyleHub's sustainable fashion line, featuring monthly content across Instagram and YouTube.",
    highlights: [
      "Created 24 Instagram posts, 36 stories, and 8 reels",
      "Generated 1.2M impressions and 62K website clicks",
      "Featured in StyleHub's national billboard campaign",
    ],
  },
  {
    id: 2,
    brand: "ZenLife",
    brandLogo:
      "https://img.freepik.com/free-vector/creative-abstract-moon-logo_23-2149201726.jpg?w=740&t=st=1716063862~exp=1716064462~hmac=26e5b2c0dc2af7bb094fbb20e2a54f4ebc42fbe07dd14be6af610d7f6be36125",
    type: "Content Series",
    duration: "April 2024",
    description:
      "Created a 4-part wellness content series showcasing ZenLife's retreat programs and mindfulness techniques.",
    highlights: [
      "Produced 1 YouTube tutorial and 4 Instagram posts",
      "Achieved 4.8% engagement rate (2x account average)",
      "Content featured on ZenLife's website homepage",
    ],
  },
  {
    id: 3,
    brand: "EcoTravel Magazine",
    brandLogo:
      "https://img.freepik.com/free-vector/travel-agency-tourism-logo-flat-design_23-2149379209.jpg?w=740&t=st=1716064392~exp=1716064992~hmac=9ed94225f01cc67906fbad6c9387db1e4da35d11c69bd1a67cdf6a7ebe1e9df9",
    type: "Guest Editor",
    duration: "March 2023",
    description:
      "Served as guest editor for EcoTravel Magazine's special 'Sustainable Travel' issue, contributing content and curating features.",
    highlights: [
      "Wrote lead feature article on sustainable tourism",
      "Curated eco-friendly travel gear guide",
      "Reached over 85,000 readers worldwide",
    ],
  },
  {
    id: 4,
    brand: "SustainStyle Conference",
    brandLogo:
      "https://img.freepik.com/free-vector/flat-design-ecology-logo-template_23-2148483668.jpg?w=740&t=st=1716064434~exp=1716065034~hmac=3ecaa55d0e76da5bd1adb3cb8f53172f453d9191c7d3a4e4b4c9ecaeba1e2bc2",
    type: "Speaker",
    duration: "November 2023",
    description:
      "Featured speaker at the SustainStyle Conference, presenting on 'Authenticity in Sustainable Fashion Content Creation'.",
    highlights: [
      "Delivered 45-minute presentation to industry professionals",
      "Participated in expert panel discussion",
      "Connected with over 20 sustainable brands",
    ],
  },
];

// Analytics data for charts
const analyticsData = {
  growth: {
    followers: [42000, 45800, 51200, 58900, 64500, 71200, 78500],
    months: [
      "Oct 2023",
      "Nov 2023",
      "Dec 2023",
      "Jan 2024",
      "Feb 2024",
      "Mar 2024",
      "Apr 2024",
    ],
  },
  engagement: {
    rate: [3.2, 3.5, 3.4, 3.7, 3.8, 3.9, 3.8],
    months: [
      "Oct 2023",
      "Nov 2023",
      "Dec 2023",
      "Jan 2024",
      "Feb 2024",
      "Mar 2024",
      "Apr 2024",
    ],
  },
  demographics: {
    ageGroups: {
      "18-24": 35,
      "25-34": 42,
      "35-44": 15,
      "45+": 8,
    },
    locations: {
      Mumbai: 32,
      Delhi: 18,
      Bangalore: 15,
      Chennai: 12,
      Other: 23,
    },
  },
  contentPerformance: {
    categories: ["Fashion", "Travel", "Lifestyle", "Beauty", "Sustainability"],
    engagement: [4.2, 5.1, 3.8, 4.5, 4.9],
  },
};

const Profile = () => {
  //   const { id } = useParams()
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [showShareModal, setShowShareModal] = useState(false);
  const [contentView, setContentView] = useState<"grid" | "list">("grid");
  const [expandedCollaboration, setExpandedCollaboration] = useState<
    number | null
  >(null);

  const handleBack = () => {
    navigate(-1);
  };

  const toggleCollaboration = (index: number) => {
    setExpandedCollaboration(expandedCollaboration === index ? null : index);
  };

  const copyPortfolioLink = () => {
    navigator.clipboard.writeText(
      `https://platform.example.com/portfolio/${userData.id}`
    );
    // In a real app, you would show a success notification here
    setShowShareModal(false);
  };

  return (
    <PageContainer>
      <TopActions>
        <BackButton onClick={handleBack}>
          <ArrowLeft size={20} />
          Back
        </BackButton>
        <ActionButtons>
          <ActionButton onClick={() => setShowShareModal(true)}>
            <Share2 size={18} />
            Share Portfolio
          </ActionButton>
          <ActionButton>
            <Edit size={18} />
            Edit Portfolio
          </ActionButton>
        </ActionButtons>
      </TopActions>

      <ProfileHeader>
        <ProfileSection>
          <ProfileImageContainer>
            <ProfileImage src={userData.profilePicture} alt={userData.name} />
          </ProfileImageContainer>
          <ProfileInfo>
            <ProfileNameSection>
              <ProfileName>{userData.name}</ProfileName>
              <ProfileUsername>{userData.username}</ProfileUsername>
            </ProfileNameSection>
            <ProfileBio>{userData.bio}</ProfileBio>
            <ProfileLocation>
              <MapPin size={16} />
              {userData.location}
            </ProfileLocation>
            <ProfileTags>
              {userData.tags.map((tag, index) => (
                <ProfileTag key={index}>#{tag.toLowerCase()}</ProfileTag>
              ))}
            </ProfileTags>
            <ProfileContact>
              <ContactItem>
                <Mail size={16} />
                {userData.email}
              </ContactItem>
            </ProfileContact>
            <SocialLinks>
              <SocialLink>
                <Instagram size={18} />
                {userData.socialMedia.instagram}
              </SocialLink>
              <SocialLink>
                <Twitter size={18} />
                {userData.socialMedia.twitter}
              </SocialLink>
              <SocialLink>
                <Youtube size={18} />
                {userData.socialMedia.youtube}
              </SocialLink>
              <SocialLink>
                <Globe size={18} />
                {userData.socialMedia.website}
              </SocialLink>
            </SocialLinks>
          </ProfileInfo>
        </ProfileSection>
        <StatsSection>
          <StatCard>
            <StatValue>{userData.metrics.followers.toLocaleString()}</StatValue>
            <StatLabel>Followers</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{userData.metrics.engagementRate}%</StatValue>
            <StatLabel>Engagement Rate</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{userData.metrics.totalCampaigns}</StatValue>
            <StatLabel>Campaigns</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{userData.metrics.avgRating}</StatValue>
            <StatLabel>
              <RatingStars>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    fill={
                      i < Math.floor(userData.metrics.avgRating)
                        ? "#F59E0B"
                        : "none"
                    }
                    color={
                      i < Math.floor(userData.metrics.avgRating)
                        ? "#F59E0B"
                        : "#D1D5DB"
                    }
                  />
                ))}
              </RatingStars>
              Average Rating
            </StatLabel>
          </StatCard>
        </StatsSection>
      </ProfileHeader>

      <TabsContainer>
        <TabButton
          active={activeTab === "overview"}
          onClick={() => setActiveTab("overview")}
        >
          <User size={16} />
          Overview
        </TabButton>
        <TabButton
          active={activeTab === "campaigns"}
          onClick={() => setActiveTab("campaigns")}
        >
          <Briefcase size={16} />
          Past Campaigns
        </TabButton>
        <TabButton
          active={activeTab === "content"}
          onClick={() => setActiveTab("content")}
        >
          <ImageIcon size={16} />
          Content Showcase
        </TabButton>
        <TabButton
          active={activeTab === "reviews"}
          onClick={() => setActiveTab("reviews")}
        >
          <Star size={16} />
          Reviews & Ratings
        </TabButton>
        <TabButton
          active={activeTab === "collaborations"}
          onClick={() => setActiveTab("collaborations")}
        >
          <Users size={16} />
          Collaborations
        </TabButton>
        <TabButton
          active={activeTab === "analytics"}
          onClick={() => setActiveTab("analytics")}
        >
          <BarChart2 size={16} />
          Analytics
        </TabButton>
      </TabsContainer>

      <MainContent>
        {activeTab === "overview" && (
          <OverviewSection>
            <OverviewContainer>
              <OverviewCard>
                <CardTitle>
                  <User size={20} />
                  Creator Profile
                </CardTitle>
                <ProfileDetailsGrid>
                  <ProfileDetailItem>
                    <ProfileDetailLabel>Content Types</ProfileDetailLabel>
                    <ProfileDetailValue>
                      <DetailTags>
                        {userData.contentTypes.map((type, index) => (
                          <DetailTag key={index}>{type}</DetailTag>
                        ))}
                      </DetailTags>
                    </ProfileDetailValue>
                  </ProfileDetailItem>
                  <ProfileDetailItem>
                    <ProfileDetailLabel>Languages</ProfileDetailLabel>
                    <ProfileDetailValue>
                      <DetailTags>
                        {userData.languages.map((language, index) => (
                          <DetailTag key={index}>{language}</DetailTag>
                        ))}
                      </DetailTags>
                    </ProfileDetailValue>
                  </ProfileDetailItem>
                  <ProfileDetailItem fullWidth>
                    <ProfileDetailLabel>Target Demographics</ProfileDetailLabel>
                    <ProfileDetailValue>
                      <DemographicsGrid>
                        <DemographicItem>
                          <DemographicLabel>Age Range</DemographicLabel>
                          <DemographicValue>
                            {userData.targetDemographics.ageRange}
                          </DemographicValue>
                        </DemographicItem>
                        <DemographicItem>
                          <DemographicLabel>Gender Split</DemographicLabel>
                          <DemographicValue>
                            {userData.targetDemographics.gender}
                          </DemographicValue>
                        </DemographicItem>
                        <DemographicItem fullWidth>
                          <DemographicLabel>Top Locations</DemographicLabel>
                          <ProfileDetailValue>
                            <LocationTags>
                              {userData.targetDemographics.topLocations.map(
                                (location, index) => (
                                  <LocationTag key={index}>
                                    {location}
                                  </LocationTag>
                                )
                              )}
                            </LocationTags>
                          </ProfileDetailValue>
                        </DemographicItem>
                      </DemographicsGrid>
                    </ProfileDetailValue>
                  </ProfileDetailItem>
                </ProfileDetailsGrid>
              </OverviewCard>

              <OverviewCard>
                <CardTitle>
                  <DollarSign size={20} />
                  Content Rates
                </CardTitle>
                <RatesContainer>
                  <RateSection>
                    <RateTitle>
                      <Instagram size={18} />
                      Instagram Rates
                    </RateTitle>
                    <RatesList>
                      <RateItem>
                        <RateLabel>Post:</RateLabel>
                        <RateValue>{userData.rates.instagram.post}</RateValue>
                      </RateItem>
                      <RateItem>
                        <RateLabel>Story:</RateLabel>
                        <RateValue>{userData.rates.instagram.story}</RateValue>
                      </RateItem>
                      <RateItem>
                        <RateLabel>Reel:</RateLabel>
                        <RateValue>{userData.rates.instagram.reel}</RateValue>
                      </RateItem>
                    </RatesList>
                  </RateSection>

                  <RateSection>
                    <RateTitle>
                      <Youtube size={18} />
                      YouTube Rates
                    </RateTitle>
                    <RatesList>
                      <RateItem>
                        <RateLabel>Video:</RateLabel>
                        <RateValue>{userData.rates.youtube.video}</RateValue>
                      </RateItem>
                      <RateItem>
                        <RateLabel>Shorts:</RateLabel>
                        <RateValue>{userData.rates.youtube.shorts}</RateValue>
                      </RateItem>
                    </RatesList>
                  </RateSection>
                </RatesContainer>
                <RatesNote>
                  * Rates may vary based on campaign requirements, exclusivity,
                  and usage rights
                </RatesNote>
              </OverviewCard>

              <OverviewCard>
                <CardTitle>
                  <Award size={20} />
                  Achievements & Recognition
                </CardTitle>
                <AchievementsList>
                  {userData.achievements.map((achievement, index) => (
                    <AchievementItem key={index}>
                      <Award size={16} />
                      <span>{achievement}</span>
                    </AchievementItem>
                  ))}
                </AchievementsList>
              </OverviewCard>

              <OverviewCard>
                <CardTitle>
                  <Briefcase size={20} />
                  Recent Campaigns
                </CardTitle>
                <RecentCampaignsList>
                  {pastCampaigns.slice(0, 3).map((campaign) => (
                    <RecentCampaignItem key={campaign.id}>
                      <RecentCampaignImage
                        src={campaign.coverImage}
                        alt={campaign.title}
                      />
                      <RecentCampaignInfo>
                        <RecentCampaignTitle>
                          {campaign.title}
                        </RecentCampaignTitle>
                        <RecentCampaignBrand>
                          <img
                            src={campaign.brandLogo || "/placeholder.svg"}
                            alt={campaign.brand}
                          />
                          <span>{campaign.brand}</span>
                        </RecentCampaignBrand>
                        <RecentCampaignMetrics>
                          <RecentCampaignMetric>
                            <TrendingUp size={14} />
                            {campaign.metrics.engagement} engagement
                          </RecentCampaignMetric>
                        </RecentCampaignMetrics>
                      </RecentCampaignInfo>
                    </RecentCampaignItem>
                  ))}
                  <ViewAllLink onClick={() => setActiveTab("campaigns")}>
                    View all campaigns
                    <ArrowRight size={16} />
                  </ViewAllLink>
                </RecentCampaignsList>
              </OverviewCard>

              <OverviewCard>
                <CardTitle>
                  <ImageIcon size={20} />
                  Featured Content
                </CardTitle>
                <FeaturedContentGrid>
                  {contentPortfolio.slice(0, 3).map((content) => (
                    <FeaturedContentItem key={content.id}>
                      <FeaturedContentThumbnail>
                        <img
                          src={content.thumbnail || "/placeholder.svg"}
                          alt={content.title}
                        />
                        {content.type === "video" && (
                          <VideoIndicator>
                            <Video size={20} />
                          </VideoIndicator>
                        )}
                      </FeaturedContentThumbnail>
                      <FeaturedContentInfo>
                        <FeaturedContentTitle>
                          {content.title}
                        </FeaturedContentTitle>
                        <FeaturedContentCampaign>
                          {content.campaign}
                        </FeaturedContentCampaign>
                        <FeaturedContentMetrics>
                          {content.type === "video" ? (
                            <FeaturedContentMetric>
                              <Eye size={14} />
                              {formatNumber(content.metrics.views ?? 0)} views
                            </FeaturedContentMetric>
                          ) : (
                            <FeaturedContentMetric>
                              <Heart size={14} />
                              {formatNumber(content.metrics.likes)} likes
                            </FeaturedContentMetric>
                          )}
                        </FeaturedContentMetrics>
                      </FeaturedContentInfo>
                    </FeaturedContentItem>
                  ))}
                  <ViewAllLink onClick={() => setActiveTab("content")}>
                    View all content
                    <ArrowRight size={16} />
                  </ViewAllLink>
                </FeaturedContentGrid>
              </OverviewCard>
            </OverviewContainer>
          </OverviewSection>
        )}

        {activeTab === "campaigns" && (
          <CampaignsSection>
            <SectionHeader>
              <SectionTitle>Past Campaigns</SectionTitle>
              <SectionFilters>
                <FilterButton>
                  <Filter size={16} />
                  Filter
                </FilterButton>
                <SearchWrapper>
                  <Search size={16} />
                  <SearchInput placeholder="Search campaigns..." />
                </SearchWrapper>
              </SectionFilters>
            </SectionHeader>

            <CampaignsGrid>
              {pastCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id}>
                  <CampaignCoverImage
                    src={campaign.coverImage}
                    alt={campaign.title}
                  />
                  <CampaignContent>
                    <CampaignHeader>
                      <BrandLogo>
                        <img
                          src={campaign.brandLogo || "/placeholder.svg"}
                          alt={campaign.brand}
                        />
                      </BrandLogo>
                      <CampaignDate>
                        <Calendar size={14} />
                        {campaign.date}
                      </CampaignDate>
                    </CampaignHeader>
                    <CampaignTitle>{campaign.title}</CampaignTitle>
                    <CampaignBrand>{campaign.brand}</CampaignBrand>
                    <CampaignDescription>
                      {campaign.description}
                    </CampaignDescription>
                    <CampaignMetricsGrid>
                      <CampaignMetric>
                        <MetricIcon>
                          <TrendingUp size={16} />
                        </MetricIcon>
                        <MetricContent>
                          <MetricValue>
                            {campaign.metrics.engagement}
                          </MetricValue>
                          <MetricLabel>Engagement</MetricLabel>
                        </MetricContent>
                      </CampaignMetric>
                      <CampaignMetric>
                        <MetricIcon>
                          <Eye size={16} />
                        </MetricIcon>
                        <MetricContent>
                          <MetricValue>
                            {campaign.metrics.impressions}
                          </MetricValue>
                          <MetricLabel>Impressions</MetricLabel>
                        </MetricContent>
                      </CampaignMetric>
                      <CampaignMetric>
                        <MetricIcon>
                          <ExternalLink size={16} />
                        </MetricIcon>
                        <MetricContent>
                          <MetricValue>{campaign.metrics.clicks}</MetricValue>
                          <MetricLabel>Link Clicks</MetricLabel>
                        </MetricContent>
                      </CampaignMetric>
                    </CampaignMetricsGrid>
                    <CampaignFooter>
                      <ContentTypes>
                        {campaign.contentTypes.map((type, index) => (
                          <ContentTypeTag key={index}>{type}</ContentTypeTag>
                        ))}
                      </ContentTypes>
                      <CampaignTags>
                        {campaign.tags.map((tag, index) => (
                          <CampaignTag key={index}>#{tag}</CampaignTag>
                        ))}
                      </CampaignTags>
                    </CampaignFooter>
                  </CampaignContent>
                </CampaignCard>
              ))}
            </CampaignsGrid>
          </CampaignsSection>
        )}

        {activeTab === "content" && (
          <ContentSection>
            <SectionHeader>
              <SectionTitle>Content Showcase</SectionTitle>
              <SectionFilters>
                <ViewToggle>
                  <ViewToggleButton
                    active={contentView === "grid"}
                    onClick={() => setContentView("grid")}
                  >
                    <Grid size={16} />
                  </ViewToggleButton>
                  <ViewToggleButton
                    active={contentView === "list"}
                    onClick={() => setContentView("list")}
                  >
                    <List size={16} />
                  </ViewToggleButton>
                </ViewToggle>
                <FilterButton>
                  <Filter size={16} />
                  Filter
                </FilterButton>
                <SearchWrapper>
                  <Search size={16} />
                  <SearchInput placeholder="Search content..." />
                </SearchWrapper>
              </SectionFilters>
            </SectionHeader>

            {contentView === "grid" ? (
              <ContentGrid>
                {contentPortfolio.map((content) => (
                  <ContentCard key={content.id}>
                    <ContentThumbnail>
                      <img
                        src={content.thumbnail || "/placeholder.svg"}
                        alt={content.title}
                      />
                      {content.type === "video" && (
                        <VideoIndicator>
                          <Video size={24} />
                        </VideoIndicator>
                      )}
                    </ContentThumbnail>
                    <ContentInfo>
                      <ContentTitle>{content.title}</ContentTitle>
                      <ContentCampaign>{content.campaign}</ContentCampaign>
                      <ContentMetrics>
                        {content.type === "video" ? (
                          <>
                            <ContentMetric>
                              <Eye size={14} />
                              {formatNumber(content.metrics.views ?? 0)} views
                            </ContentMetric>
                            <ContentMetric>
                              <ThumbsUp size={14} />
                              {formatNumber(content.metrics.likes)} likes
                            </ContentMetric>
                          </>
                        ) : (
                          <>
                            <ContentMetric>
                              <Heart size={14} />
                              {formatNumber(content.metrics.likes)} likes
                            </ContentMetric>
                            <ContentMetric>
                              <MessageSquare size={14} />
                              {formatNumber(content.metrics.comments)} comments
                            </ContentMetric>
                          </>
                        )}
                      </ContentMetrics>
                      <ContentDate>
                        <Calendar size={14} />
                        {content.date}
                      </ContentDate>
                    </ContentInfo>
                  </ContentCard>
                ))}
              </ContentGrid>
            ) : (
              <ContentList>
                {contentPortfolio.map((content) => (
                  <ContentListItem key={content.id}>
                    <ContentListThumbnail>
                      <img
                        src={content.thumbnail || "/placeholder.svg"}
                        alt={content.title}
                      />
                      {content.type === "video" && (
                        <VideoIndicator>
                          <Video size={24} />
                        </VideoIndicator>
                      )}
                    </ContentListThumbnail>
                    <ContentListInfo>
                      <ContentListHeader>
                        <ContentListTitle>{content.title}</ContentListTitle>
                        <ContentListDate>
                          <Calendar size={14} />
                          {content.date}
                        </ContentListDate>
                      </ContentListHeader>
                      <ContentListCampaign>
                        {content.campaign}
                      </ContentListCampaign>
                      <ContentListMetrics>
                        {content.type === "video" ? (
                          <>
                            <ContentListMetric>
                              <Eye size={14} />
                              {formatNumber(content.metrics.views ?? 0)} views
                            </ContentListMetric>
                            <ContentListMetric>
                              <ThumbsUp size={14} />
                              {formatNumber(content.metrics.likes)} likes
                            </ContentListMetric>
                            <ContentListMetric>
                              <MessageSquare size={14} />
                              {formatNumber(content.metrics.comments)} comments
                            </ContentListMetric>
                          </>
                        ) : (
                          <>
                            <ContentListMetric>
                              <Heart size={14} />
                              {formatNumber(content.metrics.likes)} likes
                            </ContentListMetric>
                            <ContentListMetric>
                              <MessageSquare size={14} />
                              {formatNumber(content.metrics.comments)} comments
                            </ContentListMetric>
                            <ContentListMetric>
                              <Share2 size={14} />
                              {formatNumber(content.metrics.shares ?? 0)} shares
                            </ContentListMetric>
                          </>
                        )}
                      </ContentListMetrics>
                    </ContentListInfo>
                  </ContentListItem>
                ))}
              </ContentList>
            )}
          </ContentSection>
        )}

        {activeTab === "reviews" && (
          <ReviewsSection>
            <SectionHeader>
              <div>
                <SectionTitle>Reviews & Ratings</SectionTitle>
                <OverallRating>
                  <RatingNumber>{userData.metrics.avgRating}</RatingNumber>
                  <RatingStarsLarge>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={24}
                        fill={
                          i < Math.floor(userData.metrics.avgRating)
                            ? "#F59E0B"
                            : "none"
                        }
                        color={
                          i < Math.floor(userData.metrics.avgRating)
                            ? "#F59E0B"
                            : "#D1D5DB"
                        }
                        strokeWidth={1.5}
                      />
                    ))}
                  </RatingStarsLarge>
                  <RatingCount>
                    Based on {reviews.length} brand reviews
                  </RatingCount>
                </OverallRating>
              </div>
              <SortDropdown>
                <span>Sort by: </span>
                <select defaultValue="newest">
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                </select>
              </SortDropdown>
            </SectionHeader>

            <ReviewsList>
              {reviews.map((review) => (
                <ReviewCard key={review.id}>
                  <ReviewHeader>
                    <BrandLogoContainer>
                      <img
                        src={review.brandLogo || "/placeholder.svg"}
                        alt={review.brand}
                      />
                    </BrandLogoContainer>
                    <ReviewHeaderInfo>
                      <ReviewBrand>{review.brand}</ReviewBrand>
                      <ReviewCampaign>{review.campaignTitle}</ReviewCampaign>
                    </ReviewHeaderInfo>
                    <ReviewRating>
                      <RatingValue>{review.rating}</RatingValue>
                      <RatingStars>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill={
                              i < Math.floor(review.rating) ? "#F59E0B" : "none"
                            }
                            color={
                              i < Math.floor(review.rating)
                                ? "#F59E0B"
                                : "#D1D5DB"
                            }
                          />
                        ))}
                      </RatingStars>
                    </ReviewRating>
                  </ReviewHeader>
                  <ReviewComment>"{review.comment}"</ReviewComment>
                  <ReviewFooter>
                    <ReviewDate>
                      <Calendar size={14} />
                      {review.date}
                    </ReviewDate>
                  </ReviewFooter>
                </ReviewCard>
              ))}
            </ReviewsList>
          </ReviewsSection>
        )}

        {activeTab === "collaborations" && (
          <CollaborationsSection>
            <SectionHeader>
              <SectionTitle>Brand Collaborations</SectionTitle>
              <SectionFilters>
                <FilterButton>
                  <Filter size={16} />
                  Filter
                </FilterButton>
                <SearchWrapper>
                  <Search size={16} />
                  <SearchInput placeholder="Search collaborations..." />
                </SearchWrapper>
              </SectionFilters>
            </SectionHeader>

            <CollaborationsList>
              {collaborations.map((collab, index) => (
                <CollaborationCard key={collab.id}>
                  <CollaborationHeader>
                    <CollaborationLogoContainer>
                      <img
                        src={collab.brandLogo || "/placeholder.svg"}
                        alt={collab.brand}
                      />
                    </CollaborationLogoContainer>
                    <CollaborationHeaderInfo>
                      <CollaborationBrand>{collab.brand}</CollaborationBrand>
                      <CollaborationType>{collab.type}</CollaborationType>
                    </CollaborationHeaderInfo>
                    <CollaborationDuration>
                      <Calendar size={14} />
                      {collab.duration}
                    </CollaborationDuration>
                  </CollaborationHeader>
                  <CollaborationDescription>
                    {collab.description}
                  </CollaborationDescription>

                  <CollaborationToggle
                    onClick={() => toggleCollaboration(index)}
                  >
                    {expandedCollaboration === index ? (
                      <>
                        <span>Hide Highlights</span>
                        <ChevronUp size={16} />
                      </>
                    ) : (
                      <>
                        <span>View Highlights</span>
                        <ChevronDown size={16} />
                      </>
                    )}
                  </CollaborationToggle>

                  {expandedCollaboration === index && (
                    <CollaborationHighlights>
                      <HighlightsList>
                        {collab.highlights.map((highlight, i) => (
                          <HighlightItem key={i}>
                            <Check size={16} />
                            <span>{highlight}</span>
                          </HighlightItem>
                        ))}
                      </HighlightsList>
                    </CollaborationHighlights>
                  )}
                </CollaborationCard>
              ))}
            </CollaborationsList>
          </CollaborationsSection>
        )}

        {activeTab === "analytics" && (
          <AnalyticsSection>
            <SectionHeader>
              <SectionTitle>Performance Analytics</SectionTitle>
              <AnalyticsDateRange>
                <span>Last 6 months</span>
                <ChevronDown size={16} />
              </AnalyticsDateRange>
            </SectionHeader>

            <AnalyticsGrid>
              <AnalyticsCard fullWidth>
                <AnalyticsHeader>
                  <AnalyticsTitle>
                    <TrendingUp size={18} />
                    Follower Growth
                  </AnalyticsTitle>
                </AnalyticsHeader>
                <AnalyticsChartPlaceholder>
                  <LineChartIcon size={48} />
                  <span>Follower growth chart would appear here</span>
                  <AnalyticsChartData>
                    <div>
                      Starting:{" "}
                      {analyticsData.growth.followers[0].toLocaleString()}
                    </div>
                    <div>
                      Current:{" "}
                      {analyticsData.growth.followers[
                        analyticsData.growth.followers.length - 1
                      ].toLocaleString()}
                    </div>
                    <div>
                      Growth: +
                      {(
                        ((analyticsData.growth.followers[
                          analyticsData.growth.followers.length - 1
                        ] -
                          analyticsData.growth.followers[0]) /
                          analyticsData.growth.followers[0]) *
                        100
                      ).toFixed(1)}
                      %
                    </div>
                  </AnalyticsChartData>
                </AnalyticsChartPlaceholder>
              </AnalyticsCard>

              <AnalyticsCard>
                <AnalyticsHeader>
                  <AnalyticsTitle>
                    <Percent size={18} />
                    Engagement Rate Trend
                  </AnalyticsTitle>
                </AnalyticsHeader>
                <AnalyticsChartPlaceholder>
                  <LineChartIcon size={36} />
                  <span>Engagement rate chart would appear here</span>
                  <AnalyticsChartData>
                    <div>
                      Average:{" "}
                      {analyticsData.engagement.rate.reduce(
                        (a, b) => a + b,
                        0
                      ) / analyticsData.engagement.rate.length}
                      %
                    </div>
                  </AnalyticsChartData>
                </AnalyticsChartPlaceholder>
              </AnalyticsCard>

              <AnalyticsCard>
                <AnalyticsHeader>
                  <AnalyticsTitle>
                    <Users size={18} />
                    Audience Demographics
                  </AnalyticsTitle>
                </AnalyticsHeader>
                <AnalyticsChartPlaceholder>
                  <PieChartIcon size={36} />
                  <span>Demographics chart would appear here</span>
                </AnalyticsChartPlaceholder>
                <DemographicsSummary>
                  <DemographicsSummaryItem>
                    <DemographicsSummaryLabel>
                      Top Age Group:
                    </DemographicsSummaryLabel>
                    <DemographicsSummaryValue>
                      25-34 ({analyticsData.demographics.ageGroups["25-34"]}%)
                    </DemographicsSummaryValue>
                  </DemographicsSummaryItem>
                  <DemographicsSummaryItem>
                    <DemographicsSummaryLabel>
                      Top Location:
                    </DemographicsSummaryLabel>
                    <DemographicsSummaryValue>
                      Mumbai ({analyticsData.demographics.locations["Mumbai"]}%)
                    </DemographicsSummaryValue>
                  </DemographicsSummaryItem>
                </DemographicsSummary>
              </AnalyticsCard>

              <AnalyticsCard fullWidth>
                <AnalyticsHeader>
                  <AnalyticsTitle>
                    <BarChart2 size={18} />
                    Content Performance by Category
                  </AnalyticsTitle>
                </AnalyticsHeader>
                <AnalyticsChartPlaceholder>
                  <BarChartIcon size={48} />
                  <span>Content performance chart would appear here</span>
                </AnalyticsChartPlaceholder>
                <CategoryPerformance>
                  <CategoryPerformanceTitle>
                    Top Performing Categories:
                  </CategoryPerformanceTitle>
                  <CategoryPerformanceList>
                    {analyticsData.contentPerformance.categories.map(
                      (category, index) => (
                        <CategoryPerformanceItem key={index}>
                          <CategoryName>{category}</CategoryName>
                          <CategoryBar>
                            <CategoryFill
                              width={
                                analyticsData.contentPerformance.engagement[
                                  index
                                ] * 20
                              }
                            />
                          </CategoryBar>
                          <CategoryValue>
                            {analyticsData.contentPerformance.engagement[index]}
                            %
                          </CategoryValue>
                        </CategoryPerformanceItem>
                      )
                    )}
                  </CategoryPerformanceList>
                </CategoryPerformance>
              </AnalyticsCard>
            </AnalyticsGrid>
          </AnalyticsSection>
        )}
      </MainContent>

      {showShareModal && (
        <ModalOverlay onClick={() => setShowShareModal(false)}>
          <ShareModal onClick={(e) => e.stopPropagation()}>
            <ShareModalHeader>
              <ShareModalTitle>Share Portfolio</ShareModalTitle>
              <CloseButton onClick={() => setShowShareModal(false)}>
                <X size={20} />
              </CloseButton>
            </ShareModalHeader>
            <ShareModalContent>
              <ShareOption>
                <ShareOptionLabel>Portfolio Link:</ShareOptionLabel>
                <ShareLinkContainer>
                  <ShareLink>
                    https://platform.example.com/portfolio/{userData.id}
                  </ShareLink>
                  <CopyButton onClick={copyPortfolioLink}>
                    <Clipboard size={16} />
                    Copy
                  </CopyButton>
                </ShareLinkContainer>
              </ShareOption>
              <ShareInfo>
                Anyone with this link can view your portfolio
              </ShareInfo>
              <ShareOptionsDivider>Or share via</ShareOptionsDivider>
              <ShareButtonsContainer>
                <SocialShareButton color="#3b5998">
                  <SocialIcon className="facebook" />
                  Facebook
                </SocialShareButton>
                <SocialShareButton color="#1DA1F2">
                  <SocialIcon className="twitter" />
                  Twitter
                </SocialShareButton>
                <SocialShareButton color="#0077B5">
                  <SocialIcon className="linkedin" />
                  LinkedIn
                </SocialShareButton>
                <SocialShareButton color="#25D366">
                  <SocialIcon className="whatsapp" />
                  WhatsApp
                </SocialShareButton>
              </ShareButtonsContainer>
              <ShareSettings>
                <ShareSettingsTitle>Portfolio Privacy</ShareSettingsTitle>
                <RadioOption>
                  <RadioInput
                    type="radio"
                    name="privacy"
                    id="public"
                    defaultChecked
                  />
                  <RadioLabel htmlFor="public">
                    <strong>Public</strong> - Anyone with the link can view your
                    portfolio
                  </RadioLabel>
                </RadioOption>
                <RadioOption>
                  <RadioInput type="radio" name="privacy" id="limited" />
                  <RadioLabel htmlFor="limited">
                    <strong>Limited</strong> - Only brands you've worked with
                    can view your portfolio
                  </RadioLabel>
                </RadioOption>
                <RadioOption>
                  <RadioInput type="radio" name="privacy" id="private" />
                  <RadioLabel htmlFor="private">
                    <strong>Private</strong> - Only you can view your portfolio
                  </RadioLabel>
                </RadioOption>
              </ShareSettings>
            </ShareModalContent>
            <ShareModalFooter>
              <CancelButton onClick={() => setShowShareModal(false)}>
                Cancel
              </CancelButton>
              <SaveButton>Save Settings</SaveButton>
            </ShareModalFooter>
          </ShareModal>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

// Helper function to format numbers (e.g., 1500 to 1.5K)
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

// Icon components for analytics charts
const LineChartIcon = styled(TrendingUp)`
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const BarChartIcon = styled(BarChart2)`
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const PieChartIcon = styled(BarChart2)`
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const ArrowRight = styled(ChevronRight)``;

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 20px;
`;

const TopActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
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

  &:hover {
    color: ${sharedTheme.colorVariants.primary.dark};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  background-color: white;
  color: ${sharedTheme.colorVariants.secondary.dark};
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  margin-bottom: 1.5rem;
`;

const ProfileSection = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ProfileImageContainer = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid ${sharedTheme.colorVariants.primary.lighter};
  flex-shrink: 0;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
`;

const ProfileNameSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileName = styled.h1`
  font-size: ${sharedTheme.typography.fontSizes.xxl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
`;

const ProfileUsername = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const ProfileBio = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.md};
  line-height: 1.6;
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
`;

const ProfileLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const ProfileTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const ProfileTag = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.primary.dark};
  background-color: #eff6ff;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
`;

const ProfileContact = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const SocialLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: ${sharedTheme.colorVariants.primary.dark};
  }
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
`;

const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

const StatValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.primary.dark};
`;

const StatLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  text-align: center;
  margin-top: 0.5rem;
`;

const RatingStars = styled.div`
  display: flex;
  align-items: center;
`;

const TabsContainer = styled.div`
  display: flex;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
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
  white-space: nowrap;

  &:hover {
    color: ${sharedTheme.colorVariants.primary.dark};
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
`;

// Overview Section Styles
const OverviewSection = styled.div`
  padding: 1.5rem;
`;

const OverviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const OverviewCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background-color: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

const CardTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.75rem;
`;

const ProfileDetailsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

interface ProfileDetailItemProps {
  fullWidth?: boolean;
}

const ProfileDetailItem = styled.div<ProfileDetailItemProps>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  grid-column: ${(props) => (props.fullWidth ? "1 / -1" : "auto")};
`;

const ProfileDetailLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const ProfileDetailValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const DetailTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const DetailTag = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  background-color: #f3f4f6;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
`;

const DemographicsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

interface DemographicItemProps {
  fullWidth?: boolean;
}

const DemographicItem = styled.div<DemographicItemProps>`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  grid-column: ${(props) => (props.fullWidth ? "1 / -1" : "auto")};
`;

const DemographicLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const DemographicValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const LocationTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const LocationTag = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.dark};
  background-color: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
`;

const RatesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const RateSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RateTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const RatesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const RateItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  padding-bottom: 0.5rem;
  border-bottom: 1px dashed #e5e7eb;
`;

const RateLabel = styled.div`
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const RateValue = styled.div`
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const RatesNote = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-style: italic;
  color: ${sharedTheme.colorVariants.secondary.light};
  margin-top: 1rem;
`;

const AchievementsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const AchievementItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};

  svg {
    color: #f59e0b;
  }
`;

const RecentCampaignsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RecentCampaignItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.75rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
`;

const RecentCampaignImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`;

const RecentCampaignInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
`;

const RecentCampaignTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const RecentCampaignBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};

  img {
    width: 16px;
    height: 16px;
    border-radius: 50%;
  }
`;

const RecentCampaignMetrics = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const RecentCampaignMetric = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const ViewAllLink = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.primary.dark};
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const FeaturedContentGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FeaturedContentItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.75rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
`;

const FeaturedContentThumbnail = styled.div`
  position: relative;
  width: 100px;
  height: 60px;
  border-radius: 4px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const VideoIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FeaturedContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
`;

const FeaturedContentTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const FeaturedContentCampaign = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const FeaturedContentMetrics = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.25rem;
`;

const FeaturedContentMetric = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

// Campaigns Section Styles
const CampaignsSection = styled.div`
  padding: 1.5rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
`;

const SectionFilters = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.75rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
`;

const SearchInput = styled.input`
  padding: 0.5rem 0;
  background: transparent;
  border: none;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  width: 200px;

  &:focus {
    outline: none;
  }
`;

const CampaignsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CampaignCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CampaignCoverImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const CampaignContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  flex: 1;
`;

const CampaignHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BrandLogo = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #e5e7eb;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CampaignDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const CampaignTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const CampaignBrand = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const CampaignDescription = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  line-height: 1.5;
`;

const CampaignMetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const CampaignMetric = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: #f9fafb;
  border-radius: 6px;
`;

const MetricIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #eff6ff;
  color: ${sharedTheme.colorVariants.primary.dark};
`;

const MetricContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const MetricValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const MetricLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const CampaignFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid #e5e7eb;
`;

const ContentTypes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ContentTypeTag = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.dark};
  background-color: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

const CampaignTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CampaignTag = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.primary.dark};
  background-color: #eff6ff;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
`;

// Content Section Styles
const ContentSection = styled.div`
  padding: 1.5rem;
`;

interface ViewToggleButtonProps {
  active: boolean;
}

const ViewToggle = styled.div`
  display: flex;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
`;

const ViewToggleButton = styled.button<ViewToggleButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: ${(props) => (props.active ? "#eff6ff" : "#f9fafb")};
  color: ${(props) =>
    props.active
      ? sharedTheme.colorVariants.primary.dark
      : sharedTheme.colorVariants.secondary.light};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.active ? "#eff6ff" : "#f3f4f6")};
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

const ContentCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ContentThumbnail = styled.div`
  position: relative;
  width: 100%;
  height: 180px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
`;

const ContentTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const ContentCampaign = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const ContentMetrics = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.25rem;
`;

const ContentMetric = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const ContentDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin-top: 0.5rem;
`;

const ContentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContentListItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;

  &:hover {
    background-color: #f9fafb;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContentListThumbnail = styled.div`
  position: relative;
  width: 200px;
  height: 120px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ContentListInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const ContentListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ContentListTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const ContentListDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const ContentListCampaign = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const ContentListMetrics = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const ContentListMetric = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

// Reviews Section Styles
const ReviewsSection = styled.div`
  padding: 1.5rem;
`;

const OverallRating = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.75rem;
`;

const RatingNumber = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xxl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const RatingStarsLarge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const RatingCount = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const SortDropdown = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};

  select {
    padding: 0.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    background-color: #f9fafb;
    font-size: ${sharedTheme.typography.fontSizes.sm};
    color: ${sharedTheme.colorVariants.secondary.dark};
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: ${sharedTheme.colorVariants.primary.light};
    }
  }
`;

const ReviewsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ReviewCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BrandLogoContainer = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ReviewHeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
`;

const ReviewBrand = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const ReviewCampaign = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const ReviewRating = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
`;

const RatingValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const ReviewComment = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  color: ${sharedTheme.colorVariants.secondary.dark};
  line-height: 1.6;
  font-style: italic;
`;

const ReviewFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const ReviewDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

// Collaborations Section Styles
const CollaborationsSection = styled.div`
  padding: 1.5rem;
`;

const CollaborationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CollaborationCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const CollaborationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const CollaborationLogoContainer = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CollaborationHeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
`;

const CollaborationBrand = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const CollaborationType = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  color: ${sharedTheme.colorVariants.primary.dark};
`;

const CollaborationDuration = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const CollaborationDescription = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  color: ${sharedTheme.colorVariants.secondary.dark};
  line-height: 1.6;
`;

const CollaborationToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem;
  width: fit-content;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;
  align-self: center;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const CollaborationHighlights = styled.div`
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 8px;
`;

const HighlightsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const HighlightItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: ${sharedTheme.typography.fontSizes.md};
  color: ${sharedTheme.colorVariants.secondary.dark};
  line-height: 1.5;

  svg {
    color: #059669;
    flex-shrink: 0;
    margin-top: 0.25rem;
  }
`;

// Analytics Section Styles
const AnalyticsSection = styled.div`
  padding: 1.5rem;
`;

const AnalyticsDateRange = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const AnalyticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

interface AnalyticsCardProps {
  fullWidth?: boolean;
}

const AnalyticsCard = styled.div<AnalyticsCardProps>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  grid-column: ${(props) => (props.fullWidth ? "1 / -1" : "auto")};
`;

const AnalyticsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const AnalyticsTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const AnalyticsChartPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 1rem;
  color: ${sharedTheme.colorVariants.secondary.light};
  text-align: center;
  gap: 0.75rem;
`;

const AnalyticsChartData = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 1rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const DemographicsSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const DemographicsSummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background-color: #f9fafb;
  border-radius: 6px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
`;

const DemographicsSummaryLabel = styled.div`
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const DemographicsSummaryValue = styled.div`
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const CategoryPerformance = styled.div`
  margin-top: 1rem;
`;

const CategoryPerformanceTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin-bottom: 1rem;
`;

const CategoryPerformanceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CategoryPerformanceItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CategoryName = styled.div`
  width: 120px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const CategoryBar = styled.div`
  flex: 1;
  height: 8px;
  background-color: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
`;

interface CategoryFillProps {
  width: number;
}

const CategoryFill = styled.div<CategoryFillProps>`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: ${sharedTheme.colorVariants.primary.dark};
  border-radius: 4px;
`;

const CategoryValue = styled.div`
  width: 50px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  text-align: right;
`;

// Share Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ShareModal = styled.div`
  width: 500px;
  max-width: 90%;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const ShareModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const ShareModalTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #f3f4f6;
  border: none;
  color: ${sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;

  &:hover {
    background-color: #e5e7eb;
  }
`;

const ShareModalContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ShareOption = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ShareOptionLabel = styled.label`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const ShareLinkContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ShareLink = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  background-color: #f9fafb;
  cursor: text;
  outline: none;
  font-family: inherit;
  pointer-events: none;
`;

const CopyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: ${sharedTheme.colorVariants.primary.dark};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${sharedTheme.colorVariants.primary.darker};
  }
`;

const ShareInfo = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const ShareOptionsDivider = styled.div`
  position: relative;
  text-align: center;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 40%;
    height: 1px;
    background-color: #e5e7eb;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

const ShareButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
`;

interface SocialShareButtonProps {
  color: string;
}

const SocialShareButton = styled.button<SocialShareButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: ${(props) => props.color};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  cursor: pointer;
  flex: 1;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const SocialIcon = styled.div`
  width: 16px;
  height: 16px;
`;

const ShareSettings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
`;

const ShareSettingsTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const RadioOption = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

const RadioInput = styled.input`
  margin-top: 0.25rem;
`;

const RadioLabel = styled.label`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  line-height: 1.5;
`;

const ShareModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
`;

const CancelButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: white;
  color: ${sharedTheme.colorVariants.secondary.dark};
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const SaveButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${sharedTheme.colorVariants.primary.dark};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${sharedTheme.colorVariants.primary.darker};
  }
`;

export default Profile;
