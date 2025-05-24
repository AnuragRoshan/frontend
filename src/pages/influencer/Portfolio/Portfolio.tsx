"use client";

import { useState, useEffect } from "react";
import CreatorPortfolioSkeleton from "./PortfolioSkeleton";
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
  ImageIcon,
  Video,
  Eye,
  ThumbsUp,
  Heart,
  //   MapPin,
  Mail,
  Instagram,
  Twitter,
  Youtube,
  Globe,
  Search,
  Grid,
  List,
  X,
  Clipboard,
  Plus,
  Link2,
  ChevronDown,
  ChevronUp,
  Layers,
  Camera,
  Trash2,
  Lock,
  Unlock,
  Info,
  CheckCircle,
  FileText,
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
  achievements: [
    "Best Fashion Creator Award 2024",
    "Featured in Vogue India's 'Creators to Watch' 2023",
    "Brand Ambassador for SustainStyle 2023-24",
  ],
};

// Sample content portfolio
const contentPortfolio = [
  {
    id: 1,
    type: "image",
    thumbnail:
      "https://img.freepik.com/free-photo/full-shot-travel-concept-with-landmarks_23-2149153258.jpg?w=740&t=st=1716064117~exp=1716064717~hmac=f26b2ec80ee68923cbf0c03a8b2c9a9a82dbfba7ef3fd348ef801c1e9d11b829",
    title: "Summer in Santorini",
    campaign: "TravelEco Summer Series",
    description:
      "Exploring the beautiful white and blue architecture of Santorini during the perfect summer weather. This campaign showcased sustainable travel practices while highlighting the breathtaking views of the Greek islands.",
    metrics: {
      likes: 18500,
      comments: 432,
      shares: 215,
    },
    date: "June 2023",
    tags: ["travel", "summer", "greece", "sustainable"],
    featured: true,
  },
  {
    id: 2,
    type: "video",
    thumbnail:
      "https://img.freepik.com/free-photo/makeup-accessories-arranged-table_23-2148363696.jpg?w=740&t=st=1716064150~exp=1716064750~hmac=db6d5e0ab394be38c3e10b5cf06f15ef9b2ae4a8e00e2fe82de86a08741a67a1",
    title: "Natural Makeup Tutorial",
    campaign: "PureGlow Beauty",
    description:
      "A step-by-step tutorial showing how to achieve a natural, glowing look using PureGlow's organic makeup line. This video emphasized the brand's commitment to clean beauty and cruelty-free products.",
    metrics: {
      views: 124000,
      likes: 15200,
      comments: 876,
    },
    date: "April 2023",
    tags: ["beauty", "makeup", "tutorial", "organic"],
    featured: true,
  },
  {
    id: 3,
    type: "image",
    thumbnail:
      "https://img.freepik.com/free-photo/flat-lay-colorful-arrangement-plastic-waste_23-2148696411.jpg?w=740&t=st=1716064186~exp=1716064786~hmac=6fef26ce5d1c77c8aabcc071ef89da32d2ed5f70e1c5eb14b0d7cf77ad75b6ed",
    title: "Zero Waste Challenge",
    campaign: "EcoLiving Campaign",
    description:
      "Documenting my 30-day zero waste challenge in partnership with EcoLiving. This post highlighted the amount of plastic waste we generate daily and provided practical tips for reducing single-use plastics.",
    metrics: {
      likes: 12300,
      comments: 528,
      shares: 342,
    },
    date: "March 2023",
    tags: ["sustainability", "zerowaste", "ecofriendly"],
    featured: true,
  },
  {
    id: 4,
    type: "video",
    thumbnail:
      "https://img.freepik.com/free-photo/woman-practicing-yoga-home_23-2148766843.jpg?w=740&t=st=1716064226~exp=1716064826~hmac=80ba5c9f7cd5bcc6bfbe12c9e06e9b057e14e7afcb94d2cf38c94a3a0f8ceac2",
    title: "Morning Yoga Routine",
    campaign: "ZenLife Wellness",
    description:
      "A 15-minute morning yoga routine designed for beginners, featuring ZenLife's eco-friendly yoga mats and props. This video was part of a wellness series focusing on mindfulness and starting the day with intention.",
    metrics: {
      views: 98000,
      likes: 8700,
      comments: 412,
    },
    date: "February 2023",
    tags: ["yoga", "wellness", "mindfulness", "morning"],
    featured: false,
  },
  {
    id: 5,
    type: "image",
    thumbnail:
      "https://img.freepik.com/free-photo/fashion-elegance-styled-shot-blue-top-skirt-high-heels-earrings-bracelet-other-accessories_146671-14656.jpg?w=740&t=st=1716064258~exp=1716064858~hmac=c2254478a34ecde45c9a3e9a86e0e11afca76651d29ebc85e7ca7b6b5cb28eaa",
    title: "Spring Fashion Essentials",
    campaign: "StyleHub Collection",
    description:
      "Showcasing StyleHub's spring collection featuring sustainable fabrics and versatile pieces that can be mixed and matched for various occasions. This photoshoot highlighted the brand's commitment to ethical fashion.",
    metrics: {
      likes: 14500,
      comments: 378,
      shares: 189,
    },
    date: "May 2023",
    tags: ["fashion", "spring", "sustainable", "ethical"],
    featured: false,
  },
  {
    id: 6,
    type: "image",
    thumbnail:
      "https://img.freepik.com/free-photo/plate-with-smoothies-granola-topped-with-fruit_23-2148348114.jpg?w=740&t=st=1716064290~exp=1716064890~hmac=e661e3fb44c52bdfc1f3fae9ba01bbbfdd444bf13fbb4f5ab633f3f7cb0d2c0e",
    title: "Healthy Breakfast Ideas",
    campaign: "NutriLife Foods",
    description:
      "A collection of nutritious breakfast recipes using NutriLife's organic granola and superfoods. This content series aimed to inspire healthier morning routines and showcase how delicious healthy eating can be.",
    metrics: {
      likes: 11200,
      comments: 321,
      shares: 156,
    },
    date: "April 2023",
    tags: ["food", "healthy", "breakfast", "organic"],
    featured: false,
  },
  {
    id: 7,
    type: "video",
    thumbnail:
      "https://img.freepik.com/free-photo/woman-holding-smartphone-with-shopping-app-credit-card_23-2148892034.jpg?w=740&t=st=1716125850~exp=1716126450~hmac=c9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9",
    title: "Sustainable Shopping Guide",
    campaign: "EcoMarket App Launch",
    description:
      "A comprehensive guide to using the new EcoMarket app for finding and purchasing sustainable products. This tutorial walked viewers through the app features and highlighted the ethical brands available.",
    metrics: {
      views: 87000,
      likes: 7600,
      comments: 342,
    },
    date: "January 2023",
    tags: ["sustainability", "shopping", "app", "ethical"],
    featured: false,
  },
  {
    id: 8,
    type: "image",
    thumbnail:
      "https://img.freepik.com/free-photo/woman-holding-eco-friendly-reusable-water-bottle_23-2149389857.jpg?w=740&t=st=1716125900~exp=1716126500~hmac=c9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9",
    title: "Plastic-Free Essentials",
    campaign: "EcoWare Products",
    description:
      "Featuring EcoWare's line of reusable products designed to replace single-use plastics in everyday life. This post highlighted the importance of reducing plastic waste and making sustainable choices.",
    metrics: {
      likes: 9800,
      comments: 287,
      shares: 143,
    },
    date: "December 2022",
    tags: ["zerowaste", "plasticfree", "sustainable", "reusable"],
    featured: false,
  },
  {
    id: 9,
    type: "video",
    thumbnail:
      "https://img.freepik.com/free-photo/woman-packing-suitcase-home_23-2148923039.jpg?w=740&t=st=1716125950~exp=1716126550~hmac=c9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9",
    title: "Minimalist Packing Tips",
    campaign: "TravelLight Luggage",
    description:
      "A practical guide to packing light and efficiently using TravelLight's innovative luggage system. This video demonstrated how to pack for a two-week trip using only a carry-on, reducing travel stress and carbon footprint.",
    metrics: {
      views: 105000,
      likes: 9200,
      comments: 456,
    },
    date: "November 2022",
    tags: ["travel", "minimalism", "packing", "sustainable"],
    featured: false,
  },
  {
    id: 10,
    type: "image",
    thumbnail:
      "https://img.freepik.com/free-photo/woman-wearing-sustainable-fashion-outdoors_23-2149389847.jpg?w=740&t=st=1716126000~exp=1716126600~hmac=c9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9",
    title: "Capsule Wardrobe Essentials",
    campaign: "EcoStyle Fashion",
    description:
      "Showcasing how to build a versatile capsule wardrobe with EcoStyle's timeless, sustainable pieces. This content emphasized quality over quantity and how investing in well-made clothing reduces fashion waste.",
    metrics: {
      likes: 13400,
      comments: 365,
      shares: 210,
    },
    date: "October 2022",
    tags: ["fashion", "capsulewardrobe", "sustainable", "minimalism"],
    featured: false,
  },
  {
    id: 11,
    type: "video",
    thumbnail:
      "https://img.freepik.com/free-photo/woman-applying-skincare-product_23-2149389862.jpg?w=740&t=st=1716126050~exp=1716126650~hmac=c9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9",
    title: "Natural Skincare Routine",
    campaign: "PureGlow Skincare",
    description:
      "A detailed morning and evening skincare routine featuring PureGlow's natural, organic products. This tutorial explained the importance of each step and how to customize the routine for different skin types.",
    metrics: {
      views: 118000,
      likes: 10500,
      comments: 623,
    },
    date: "September 2022",
    tags: ["beauty", "skincare", "natural", "organic"],
    featured: false,
  },
  {
    id: 12,
    type: "image",
    thumbnail:
      "https://img.freepik.com/free-photo/woman-doing-meditation-beach-sunset_23-2149889158.jpg?w=740&t=st=1716126100~exp=1716126700~hmac=c9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9",
    title: "Sunset Meditation",
    campaign: "ZenLife Mindfulness Retreat",
    description:
      "Capturing a peaceful sunset meditation session during ZenLife's mindfulness retreat in Bali. This post highlighted the importance of taking time for mental wellbeing and connecting with nature.",
    metrics: {
      likes: 15700,
      comments: 412,
      shares: 278,
    },
    date: "August 2022",
    tags: ["wellness", "meditation", "mindfulness", "travel"],
    featured: false,
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

// Content categories for filtering
const contentCategories = [
  "All",
  "Fashion",
  "Travel",
  "Beauty",
  "Wellness",
  "Food",
  "Sustainability",
];

// Content types for filtering
const contentTypeFilters = ["All", "Photos", "Videos"];

const CreatorPortfolio = () => {
  const navigate = useNavigate();
  const [showShareModal, setShowShareModal] = useState(false);
  const [contentView, setContentView] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [expandedContent, setExpandedContent] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [featuredContent, setFeaturedContent] = useState<number[]>(
    contentPortfolio.filter((item) => item.featured).map((item) => item.id)
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timeout);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const toggleContentExpand = (id: number) => {
    setExpandedContent(expandedContent === id ? null : id);
  };

  const copyPortfolioLink = () => {
    navigator.clipboard.writeText(
      `https://platform.example.com/portfolio/${userData.id}`
    );
    // In a real app, you would show a success notification here
    setShowShareModal(false);
  };

  const toggleFeatured = (id: number) => {
    if (featuredContent.includes(id)) {
      setFeaturedContent(featuredContent.filter((itemId) => itemId !== id));
    } else {
      setFeaturedContent([...featuredContent, id]);
    }
  };

  // Filter content based on selected category, type, and search query
  const filteredContent = contentPortfolio.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" ||
      item.tags.some(
        (tag) => tag.toLowerCase() === selectedCategory.toLowerCase()
      );
    const matchesType =
      selectedType === "All" ||
      (selectedType === "Photos" && item.type === "image") ||
      (selectedType === "Videos" && item.type === "video");
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.campaign.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesType && matchesSearch;
  });

  // Sort content based on selected sort option
  const sortedContent = [...filteredContent].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    switch (sortBy) {
      case "newest":
        return dateB.getTime() - dateA.getTime();
      case "oldest":
        return dateA.getTime() - dateB.getTime();
      case "most-popular": {
        const likesA = a.metrics.likes || 0;
        const viewsA = a.metrics.views || 0;
        const engagementA = Math.max(likesA, viewsA);

        const likesB = b.metrics.likes || 0;
        const viewsB = b.metrics.views || 0;
        const engagementB = Math.max(likesB, viewsB);

        return engagementB - engagementA;
      }
      default:
        return dateB.getTime() - dateA.getTime();
    }
  });

  // Get featured content
  const featuredItems = contentPortfolio
    .filter((item) => featuredContent.includes(item.id))
    .slice(0, 3);
  if (loading) {
    return <CreatorPortfolioSkeleton />;
  }

  return (
    <PageContainer>
      <TopActions>
        <BackButton onClick={handleBack}>
          <ArrowLeft size={20} />
          Back
        </BackButton>
        <ActionButtons>
          {isEditMode ? (
            <>
              <ActionButton onClick={() => setIsEditMode(false)}>
                <CheckCircle size={18} />
                Save Changes
              </ActionButton>
              <ActionButton secondary onClick={() => setIsEditMode(false)}>
                <X size={18} />
                Cancel
              </ActionButton>
            </>
          ) : (
            <>
              <ActionButton onClick={() => setShowShareModal(true)}>
                <Share2 size={18} />
                Share Portfolio
              </ActionButton>
              <ActionButton onClick={() => setIsEditMode(true)}>
                <Edit size={18} />
                Edit Portfolio
              </ActionButton>
            </>
          )}
        </ActionButtons>
      </TopActions>

      {/* <ProfileHeader>
        <ProfileSection>
          <ProfileImageContainer>
            <ProfileImage src={userData.profilePicture} alt={userData.name} />
            {isEditMode && (
              <EditProfileImageButton>
                <Camera size={16} />
              </EditProfileImageButton>
            )}
          </ProfileImageContainer>
          <ProfileInfo>
            <ProfileNameSection>
              {isEditMode ? (
                <EditableProfileName defaultValue={userData.name} />
              ) : (
                <ProfileName>{userData.name}</ProfileName>
              )}
              <ProfileUsername>{userData.username}</ProfileUsername>
            </ProfileNameSection>
            {isEditMode ? (
              <EditableBio defaultValue={userData.bio} />
            ) : (
              <ProfileBio>{userData.bio}</ProfileBio>
            )}
            <ProfileLocation>
              <MapPin size={16} />
              {userData.location}
            </ProfileLocation>
            <ProfileTags>
              {userData.tags.map((tag, index) => (
                <ProfileTag key={index}>#{tag.toLowerCase()}</ProfileTag>
              ))}
              {isEditMode && (
                <AddTagButton>
                  <Plus size={14} />
                  Add Tag
                </AddTagButton>
              )}
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
              {isEditMode && (
                <AddSocialButton>
                  <Plus size={14} />
                  Add Social
                </AddSocialButton>
              )}
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
      </ProfileHeader> */}

      <MainContent>
        <ContentShowcaseSection>
          <SectionHeader>
            <div>
              <SectionTitle>Content Portfolio</SectionTitle>
              <SectionDescription>
                A curated collection of my best work across various campaigns
                and brands
              </SectionDescription>
            </div>
            <SectionActions>
              {isEditMode && (
                <AddContentButton>
                  <Plus size={16} />
                  Add Content
                </AddContentButton>
              )}
              <ViewToggle>
                <ViewToggleButton
                  active={contentView === "grid"}
                  onClick={() => setContentView("grid")}
                  title="Grid View"
                >
                  <Grid size={16} />
                </ViewToggleButton>
                <ViewToggleButton
                  active={contentView === "list"}
                  onClick={() => setContentView("list")}
                  title="List View"
                >
                  <List size={16} />
                </ViewToggleButton>
              </ViewToggle>
            </SectionActions>
          </SectionHeader>

          <FilterBar>
            <FilterGroup>
              <FilterLabel>Category:</FilterLabel>
              <CategoryFilters>
                {contentCategories.map((category) => (
                  <CategoryFilter
                    key={category}
                    active={selectedCategory === category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </CategoryFilter>
                ))}
              </CategoryFilters>
            </FilterGroup>
            <FilterGroup>
              <FilterLabel>Type:</FilterLabel>
              <TypeFilters>
                {contentTypeFilters.map((type) => (
                  <TypeFilter
                    key={type}
                    active={selectedType === type}
                    onClick={() => setSelectedType(type)}
                  >
                    {type === "Photos" && <ImageIcon size={14} />}
                    {type === "Videos" && <Video size={14} />}
                    {type === "All" && <Layers size={14} />}
                    {type}
                  </TypeFilter>
                ))}
              </TypeFilters>
            </FilterGroup>
            <SearchFilterGroup>
              <SearchWrapper>
                <Search size={16} />
                <SearchInput
                  placeholder="Search content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <ClearSearchButton onClick={() => setSearchQuery("")}>
                    <X size={14} />
                  </ClearSearchButton>
                )}
              </SearchWrapper>
              <SortDropdown>
                <SortLabel>Sort by:</SortLabel>
                <SortSelect
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="most-popular">Most Popular</option>
                </SortSelect>
              </SortDropdown>
            </SearchFilterGroup>
          </FilterBar>

          {featuredItems.length > 0 &&
            !searchQuery &&
            selectedCategory === "All" &&
            selectedType === "All" && (
              <FeaturedContentSection>
                <FeaturedSectionTitle>
                  <Award size={20} />
                  Featured Work
                </FeaturedSectionTitle>
                <FeaturedContentGrid>
                  {featuredItems.map((item) => (
                    <FeaturedContentCard key={item.id}>
                      <FeaturedContentThumbnail>
                        <img
                          src={item.thumbnail || "/placeholder.svg"}
                          alt={item.title}
                        />
                        {item.type === "video" && (
                          <VideoIndicator>
                            <Video size={24} />
                          </VideoIndicator>
                        )}
                        <FeaturedBadge>
                          <Award size={12} />
                          Featured
                        </FeaturedBadge>
                        {isEditMode && (
                          <EditContentOverlay>
                            <EditContentButton
                              onClick={() => toggleFeatured(item.id)}
                            >
                              <Award size={16} />
                              Remove Featured
                            </EditContentButton>
                            <EditContentButton>
                              <Edit size={16} />
                              Edit
                            </EditContentButton>
                            <EditContentButton danger>
                              <Trash2 size={16} />
                              Delete
                            </EditContentButton>
                          </EditContentOverlay>
                        )}
                      </FeaturedContentThumbnail>
                      <FeaturedContentInfo>
                        <FeaturedContentTitle>
                          {item.title}
                        </FeaturedContentTitle>
                        <FeaturedContentCampaign>
                          {item.campaign}
                        </FeaturedContentCampaign>
                        <FeaturedContentDescription>
                          {item.description}
                        </FeaturedContentDescription>
                        <FeaturedContentMeta>
                          <FeaturedContentMetrics>
                            {item.type === "video" ? (
                              <FeaturedContentMetric>
                                <Eye size={14} />
                                {formatNumber(item.metrics.views || 0)} views
                              </FeaturedContentMetric>
                            ) : (
                              <FeaturedContentMetric>
                                <Heart size={14} />
                                {formatNumber(item.metrics.likes)} likes
                              </FeaturedContentMetric>
                            )}
                          </FeaturedContentMetrics>
                          <FeaturedContentDate>
                            <Calendar size={14} />
                            {item.date}
                          </FeaturedContentDate>
                        </FeaturedContentMeta>
                        <FeaturedContentTags>
                          {item.tags.map((tag, index) => (
                            <FeaturedContentTag key={index}>
                              #{tag}
                            </FeaturedContentTag>
                          ))}
                        </FeaturedContentTags>
                      </FeaturedContentInfo>
                    </FeaturedContentCard>
                  ))}
                </FeaturedContentGrid>
              </FeaturedContentSection>
            )}

          <ContentResultsInfo>
            Showing {sortedContent.length}{" "}
            {sortedContent.length === 1 ? "item" : "items"}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {selectedType !== "All" && ` (${selectedType})`}
            {searchQuery && ` matching "${searchQuery}"`}
          </ContentResultsInfo>

          {contentView === "grid" ? (
            <ContentGrid>
              {sortedContent.map((content) => (
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
                    {featuredContent.includes(content.id) && !isEditMode && (
                      <FeaturedIndicator>
                        <Award size={12} />
                      </FeaturedIndicator>
                    )}
                    {isEditMode && (
                      <EditContentOverlay>
                        <EditContentButton
                          onClick={() => toggleFeatured(content.id)}
                        >
                          <Award size={16} />
                          {featuredContent.includes(content.id)
                            ? "Remove Featured"
                            : "Feature"}
                        </EditContentButton>
                        <EditContentButton>
                          <Edit size={16} />
                          Edit
                        </EditContentButton>
                        <EditContentButton danger>
                          <Trash2 size={16} />
                          Delete
                        </EditContentButton>
                      </EditContentOverlay>
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
                            {formatNumber(content.metrics.views || 0)} views
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
                    <ContentTags>
                      {content.tags.slice(0, 3).map((tag, index) => (
                        <ContentTag key={index}>#{tag}</ContentTag>
                      ))}
                      {content.tags.length > 3 && (
                        <ContentTagMore>
                          +{content.tags.length - 3}
                        </ContentTagMore>
                      )}
                    </ContentTags>
                    <ContentActions>
                      <ContentActionButton
                        onClick={() => toggleContentExpand(content.id)}
                      >
                        {expandedContent === content.id ? (
                          <>
                            <ChevronUp size={14} />
                            Hide Details
                          </>
                        ) : (
                          <>
                            <ChevronDown size={14} />
                            View Details
                          </>
                        )}
                      </ContentActionButton>
                      <ContentActionButton>
                        <ExternalLink size={14} />
                        View Full
                      </ContentActionButton>
                    </ContentActions>
                    {expandedContent === content.id && (
                      <ContentExpandedDetails>
                        <ContentExpandedTitle>Description</ContentExpandedTitle>
                        <ContentExpandedDescription>
                          {content.description}
                        </ContentExpandedDescription>
                        <ContentExpandedTitle>All Tags</ContentExpandedTitle>
                        <ContentExpandedTags>
                          {content.tags.map((tag, index) => (
                            <ContentTag key={index}>#{tag}</ContentTag>
                          ))}
                        </ContentExpandedTags>
                      </ContentExpandedDetails>
                    )}
                  </ContentInfo>
                </ContentCard>
              ))}
            </ContentGrid>
          ) : (
            <ContentList>
              {sortedContent.map((content) => (
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
                    {featuredContent.includes(content.id) && !isEditMode && (
                      <FeaturedIndicator>
                        <Award size={12} />
                      </FeaturedIndicator>
                    )}
                    {isEditMode && (
                      <EditContentOverlay>
                        <EditContentButton
                          onClick={() => toggleFeatured(content.id)}
                        >
                          <Award size={16} />
                          {featuredContent.includes(content.id)
                            ? "Remove Featured"
                            : "Feature"}
                        </EditContentButton>
                        <EditContentButton>
                          <Edit size={16} />
                          Edit
                        </EditContentButton>
                        <EditContentButton danger>
                          <Trash2 size={16} />
                          Delete
                        </EditContentButton>
                      </EditContentOverlay>
                    )}
                  </ContentListThumbnail>
                  <ContentListInfo>
                    <ContentListHeader>
                      <div>
                        <ContentListTitle>{content.title}</ContentListTitle>
                        <ContentListCampaign>
                          {content.campaign}
                        </ContentListCampaign>
                      </div>
                      <ContentListDate>
                        <Calendar size={14} />
                        {content.date}
                      </ContentListDate>
                    </ContentListHeader>
                    <ContentListDescription>
                      {content.description}
                    </ContentListDescription>
                    <ContentListFooter>
                      <ContentListMetrics>
                        {content.type === "video" ? (
                          <>
                            <ContentListMetric>
                              <Eye size={14} />
                              {formatNumber(content.metrics.views || 0)} views
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
                              {formatNumber(content.metrics.shares || 0)} shares
                            </ContentListMetric>
                          </>
                        )}
                      </ContentListMetrics>
                      <ContentListTags>
                        {content.tags.map((tag, index) => (
                          <ContentTag key={index}>#{tag}</ContentTag>
                        ))}
                      </ContentListTags>
                    </ContentListFooter>
                    <ContentListActions>
                      <ContentActionButton>
                        <ExternalLink size={14} />
                        View Full
                      </ContentActionButton>
                      {isEditMode && (
                        <>
                          <ContentActionButton
                            onClick={() => toggleFeatured(content.id)}
                          >
                            <Award size={14} />
                            {featuredContent.includes(content.id)
                              ? "Remove Featured"
                              : "Feature"}
                          </ContentActionButton>
                          <ContentActionButton>
                            <Edit size={14} />
                            Edit
                          </ContentActionButton>
                          <ContentActionButton danger>
                            <Trash2 size={14} />
                            Delete
                          </ContentActionButton>
                        </>
                      )}
                    </ContentListActions>
                  </ContentListInfo>
                </ContentListItem>
              ))}
            </ContentList>
          )}
        </ContentShowcaseSection>

        <ReviewsSection>
          <SectionHeader>
            <div>
              <SectionTitle>Client Reviews</SectionTitle>
              <SectionDescription>
                Feedback from brands I've collaborated with
              </SectionDescription>
            </div>
            <OverallRating>
              <RatingNumber>{userData.metrics.avgRating}</RatingNumber>
              <RatingStarsLarge>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={20}
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
              <RatingCount>Based on {reviews.length} brand reviews</RatingCount>
            </OverallRating>
          </SectionHeader>

          <ReviewsGrid>
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
                          size={14}
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
          </ReviewsGrid>
        </ReviewsSection>

        <ContactSection>
          <ContactCard>
            <ContactCardContent>
              <ContactCardTitle>
                Interested in working together?
              </ContactCardTitle>
              <ContactCardDescription>
                I'm open to new collaborations and partnerships. Feel free to
                reach out to discuss how we can create authentic content for
                your brand.
              </ContactCardDescription>
              <ContactCardActions>
                <ContactCardButton primary>
                  <Mail size={16} />
                  Send Message
                </ContactCardButton>
                <ContactCardButton>
                  <FileText size={16} />
                  Download Media Kit
                </ContactCardButton>
              </ContactCardActions>
            </ContactCardContent>
            <ContactCardDecoration>
              <Camera size={32} />
              <ImageIcon size={40} />
              <Video size={36} />
            </ContactCardDecoration>
          </ContactCard>
        </ContactSection>
      </MainContent>

      <PortfolioFooter>
        <FooterInfo>
          <FooterLogo>{userData.name}</FooterLogo>
          <FooterTagline>Content Creator & Digital Storyteller</FooterTagline>
        </FooterInfo>
        <FooterSocial>
          <FooterSocialLink>
            <Instagram size={18} />
          </FooterSocialLink>
          <FooterSocialLink>
            <Twitter size={18} />
          </FooterSocialLink>
          <FooterSocialLink>
            <Youtube size={18} />
          </FooterSocialLink>
          <FooterSocialLink>
            <Globe size={18} />
          </FooterSocialLink>
        </FooterSocial>
        <FooterCopyright>
          © {new Date().getFullYear()} {userData.name}. All rights reserved.
        </FooterCopyright>
      </PortfolioFooter>

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
                  <ShareLink
                    value={`https://platform.example.com/portfolio/${userData.id}`}
                    readOnly
                  />
                  <CopyButton onClick={copyPortfolioLink}>
                    <Clipboard size={16} />
                    Copy
                  </CopyButton>
                </ShareLinkContainer>
              </ShareOption>
              <ShareInfo>
                <Info size={14} />
                Anyone with this link can view your portfolio
              </ShareInfo>
              <ShareOptionsDivider>Or share via</ShareOptionsDivider>
              <ShareButtonsContainer>
                <SocialShareButton color="#3b5998">
                  <Instagram size={16} />
                  Instagram
                </SocialShareButton>
                <SocialShareButton color="#1DA1F2">
                  <Twitter size={16} />
                  Twitter
                </SocialShareButton>
                <SocialShareButton color="#0077B5">
                  <Link2 size={16} />
                  LinkedIn
                </SocialShareButton>
                <SocialShareButton color="#25D366">
                  <Mail size={16} />
                  Email
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
                    <Unlock size={14} />
                    <strong>Public</strong> - Anyone with the link can view your
                    portfolio
                  </RadioLabel>
                </RadioOption>
                <RadioOption>
                  <RadioInput type="radio" name="privacy" id="limited" />
                  <RadioLabel htmlFor="limited">
                    <Lock size={14} />
                    <strong>Limited</strong> - Only brands you've worked with
                    can view your portfolio
                  </RadioLabel>
                </RadioOption>
                <RadioOption>
                  <RadioInput type="radio" name="privacy" id="private" />
                  <RadioLabel htmlFor="private">
                    <Lock size={14} />
                    <strong>Private</strong> - Only you can view your portfolio
                  </RadioLabel>
                </RadioOption>
              </ShareSettings>
              <ShareEmbedOption>
                <ShareEmbedTitle>Embed on your website</ShareEmbedTitle>
                <ShareEmbedCode>
                  &lt;iframe src="https://platform.example.com/embed/portfolio/
                  {userData.id}" width="100%" height="600"
                  frameborder="0"&gt;&lt;/iframe&gt;
                </ShareEmbedCode>
                <ShareEmbedButton>
                  <Clipboard size={14} />
                  Copy Embed Code
                </ShareEmbedButton>
              </ShareEmbedOption>
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

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 20px;
  color: ${sharedTheme.colorVariants.secondary.dark};
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

interface ActionButtonProps {
  primary?: boolean;
  secondary?: boolean;
  danger?: boolean;
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
    props.primary
      ? sharedTheme.colorVariants.primary.dark
      : props.secondary
      ? "#f3f4f6"
      : props.danger
      ? "#fee2e2"
      : "white"};
  color: ${(props) =>
    props.primary
      ? "white"
      : props.danger
      ? "#dc2626"
      : sharedTheme.colorVariants.secondary.dark};
  border: 1px solid
    ${(props) =>
      props.primary
        ? "transparent"
        : props.secondary
        ? "#d1d5db"
        : props.danger
        ? "#fecaca"
        : "#e5e7eb"};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.primary
        ? sharedTheme.colorVariants.primary.darker
        : props.secondary
        ? "#e5e7eb"
        : props.danger
        ? "#fecaca"
        : "#f3f4f6"};
  }
`;

const RatingStars = styled.div`
  display: flex;
  align-items: center;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

// Content Showcase Section
const ContentShowcaseSection = styled.section`
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
`;

const SectionDescription = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.md};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin: 0.5rem 0 0 0;
`;

const SectionActions = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

const AddContentButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
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

const FilterBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const FilterLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
  min-width: 80px;
`;

const CategoryFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

interface CategoryFilterProps {
  active: boolean;
}

const CategoryFilter = styled.button<CategoryFilterProps>`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${(props) =>
    props.active
      ? sharedTheme.colorVariants.primary.dark
      : sharedTheme.colorVariants.secondary.dark};
  background-color: ${(props) => (props.active ? "#eff6ff" : "white")};
  border: 1px solid
    ${(props) =>
      props.active ? sharedTheme.colorVariants.primary.light : "#e5e7eb"};
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.active ? "#eff6ff" : "#f3f4f6")};
    border-color: ${(props) =>
      props.active ? sharedTheme.colorVariants.primary.light : "#d1d5db"};
  }
`;

const TypeFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

interface TypeFilterProps {
  active: boolean;
}

const TypeFilter = styled.button<TypeFilterProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${(props) =>
    props.active
      ? sharedTheme.colorVariants.primary.dark
      : sharedTheme.colorVariants.secondary.dark};
  background-color: ${(props) => (props.active ? "#eff6ff" : "white")};
  border: 1px solid
    ${(props) =>
      props.active ? sharedTheme.colorVariants.primary.light : "#e5e7eb"};
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.active ? "#eff6ff" : "#f3f4f6")};
    border-color: ${(props) =>
      props.active ? sharedTheme.colorVariants.primary.light : "#d1d5db"};
  }
`;

const SearchFilterGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.75rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  flex: 1;
  max-width: 400px;
  position: relative;
`;

const SearchInput = styled.input`
  padding: 0.5rem 0;
  background: transparent;
  border: none;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const ClearSearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${sharedTheme.colorVariants.secondary.light};
  cursor: pointer;
  padding: 0;

  &:hover {
    color: ${sharedTheme.colorVariants.secondary.dark};
  }
`;

const SortDropdown = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SortLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const SortSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background-color: white;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${sharedTheme.colorVariants.primary.light};
  }
`;

const ContentResultsInfo = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  margin-bottom: 1rem;
`;

const FeaturedContentSection = styled.div`
  margin-bottom: 2rem;
`;

const FeaturedSectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0 0 1rem 0;
`;

const FeaturedContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedContentCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const FeaturedContentThumbnail = styled.div`
  position: relative;
  width: 100%;
  height: 200px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background-color: rgba(245, 158, 11, 0.9);
  color: white;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  border-radius: 4px;
`;

const FeaturedContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
`;

const FeaturedContentTitle = styled.h4`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
`;

const FeaturedContentCampaign = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const FeaturedContentDescription = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  line-height: 1.6;
  margin: 0;
`;

const FeaturedContentMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FeaturedContentMetrics = styled.div`
  display: flex;
  gap: 1rem;
`;

const FeaturedContentMetric = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const FeaturedContentDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const FeaturedContentTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const FeaturedContentTag = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.primary.dark};
  background-color: #eff6ff;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
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

const VideoIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FeaturedIndicator = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(245, 158, 11, 0.9);
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EditContentOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  opacity: 0;
  transition: opacity 0.2s;

  ${ContentThumbnail}:hover & {
    opacity: 1;
  }
`;

const EditContentButton = styled.button<ActionButtonProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: white;
  color: ${(props) =>
    props.danger ? "#dc2626" : sharedTheme.colorVariants.secondary.dark};
  border: none;
  border-radius: 4px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.danger ? "#fee2e2" : "#f3f4f6")};
  }
`;

const ContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  flex: 1;
`;

const ContentTitle = styled.h4`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
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
  margin-top: 0.25rem;
`;

const ContentTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const ContentTag = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.primary.dark};
  background-color: #eff6ff;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
`;

const ContentTagMore = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: ${sharedTheme.colorVariants.secondary.light};
  background-color: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
`;

const ContentActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.75rem;
  gap: 0.5rem;
`;

const ContentActionButton = styled.button<ActionButtonProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: #f9fafb;
  color: ${(props) =>
    props.danger ? "#dc2626" : sharedTheme.colorVariants.secondary.dark};
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: ${sharedTheme.typography.fontSizes.xs};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.danger ? "#fee2e2" : "#f3f4f6")};
    border-color: ${(props) => (props.danger ? "#fecaca" : "#d1d5db")};
  }
`;

const ContentExpandedDetails = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
`;

const ContentExpandedTitle = styled.h5`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0 0 0.5rem 0;
`;

const ContentExpandedDescription = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  line-height: 1.6;
  margin: 0 0 1rem 0;
`;

const ContentExpandedTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
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

const ContentListTitle = styled.h4`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
`;

const ContentListCampaign = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const ContentListDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const ContentListDescription = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  line-height: 1.6;
  margin: 0;
`;

const ContentListFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.75rem;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const ContentListMetrics = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ContentListMetric = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const ContentListTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ContentListActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
`;

// Reviews Section
const ReviewsSection = styled.section`
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
`;

const OverallRating = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
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

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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

// Contact Section
const ContactSection = styled.section`
  margin-bottom: 2rem;
`;

const ContactCard = styled.div`
  display: flex;
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1.5rem;
  }
`;

const ContactCardContent = styled.div`
  flex: 1;
  z-index: 1;
`;

const ContactCardTitle = styled.h3`
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0 0 1rem 0;
`;

const ContactCardDescription = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.md};
  color: ${sharedTheme.colorVariants.secondary.dark};
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  max-width: 600px;
`;

const ContactCardActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ContactCardButton = styled.button<ActionButtonProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: ${(props) =>
    props.primary ? sharedTheme.colorVariants.primary.dark : "white"};
  color: ${(props) =>
    props.primary ? "white" : sharedTheme.colorVariants.secondary.dark};
  border: 1px solid ${(props) => (props.primary ? "transparent" : "#e5e7eb")};
  border-radius: 6px;
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.primary ? sharedTheme.colorVariants.primary.darker : "#f3f4f6"};
  }
`;

const ContactCardDecoration = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  opacity: 0.1;

  @media (max-width: 768px) {
    display: none;
  }
`;

// Footer
const PortfolioFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  border-top: 1px solid #e5e7eb;
  margin-top: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FooterInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const FooterTagline = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
`;

const FooterSocial = styled.div`
  display: flex;
  gap: 1rem;
`;

const FooterSocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f3f4f6;
  color: ${sharedTheme.colorVariants.secondary.dark};
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${sharedTheme.colorVariants.primary.light};
    color: white;
  }
`;

const FooterCopyright = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
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
  width: 50%;
  max-width: 90%;
  background-color: white;
  border-radius: 12px;
  overflow-y: scroll;
  height: 95%;
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.light};
  background-color: #f3f4f6;
  padding: 0.75rem;
  border-radius: 6px;
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  line-height: 1.5;
`;

const ShareEmbedOption = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
`;

const ShareEmbedTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.md};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const ShareEmbedCode = styled.div`
  padding: 0.75rem;
  background-color: #f3f4f6;
  border-radius: 6px;
  font-family: monospace;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  overflow-x: auto;
  white-space: nowrap;
`;

const ShareEmbedButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: white;
  color: ${sharedTheme.colorVariants.secondary.dark};
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  cursor: pointer;
  align-self: flex-start;
  transition: all 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
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

export default CreatorPortfolio;
