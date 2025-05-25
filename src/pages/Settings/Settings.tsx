"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Settings,
  User,
  Bell,
  Shield,
  CreditCard,
  Eye,
  Globe,
  Smartphone,
  Mail,
  Lock,
  Key,
  Camera,
  Edit,
  Save,
  X,
  Check,
  AlertCircle,
  Info,
  ChevronRight,
  Upload,
  Trash2,
  Download,
  Share2,
  Link2,
  Palette,
  Monitor,
  Sun,
  Moon,
  Wifi,
  Database,
  FileText,
  HelpCircle,
  LogOut,
  RefreshCw,
  Plus,
  ToggleLeft,
  ToggleRight,
  Clock,
  Languages,
  DollarSign,
  TrendingUp,
  Star,
  Bookmark,
  Filter,
  Search,
  MessageSquare,
  ExternalLink,
} from "lucide-react";

import WrapperBox from "../../components/layout/WrapperBox";
import { sharedTheme } from "../../styles/theme/theme";

interface SettingsData {
  profile: {
    name: string;
    username: string;
    email: string;
    phone: string;
    bio: string;
    location: string;
    website: string;
    profilePicture: string;
    coverImage: string;
    languages: string[];
    timezone: string;
    dateFormat: string;
  };
  notifications: {
    email: {
      campaigns: boolean;
      payments: boolean;
      messages: boolean;
      marketing: boolean;
      security: boolean;
    };
    push: {
      campaigns: boolean;
      payments: boolean;
      messages: boolean;
      deadlines: boolean;
      opportunities: boolean;
    };
    sms: {
      security: boolean;
      payments: boolean;
      urgent: boolean;
    };
    frequency: string;
    quietHours: {
      enabled: boolean;
      start: string;
      end: string;
    };
  };
  privacy: {
    profileVisibility: string;
    portfolioVisibility: string;
    contactInfo: string;
    socialMedia: string;
    analytics: boolean;
    searchable: boolean;
    showOnlineStatus: boolean;
    allowDirectMessages: string;
  };
  security: {
    twoFactorAuth: boolean;
    loginAlerts: boolean;
    sessionTimeout: string;
    trustedDevices: {
      id: number;
      name: string;
      lastUsed: string;
      location: string;
    }[];
    recentActivity: {
      id: number;
      action: string;
      device: string;
      time: string;
      location: string;
    }[];
  };
  payments: {
    defaultCurrency: string;
    taxInfo: {
      gstNumber: string;
      panNumber: string;
      address: string;
    };
    bankDetails: {
      accountNumber: string;
      ifscCode: string;
      bankName: string;
      accountHolder: string;
    };
    paymentMethods: {
      id: number;
      type: string;
      name: string;
      primary: boolean;
    }[];
    autoWithdraw: boolean;
    withdrawThreshold: number;
  };
  portfolio: {
    featuredContent: string[];
    categories: string[];
    showMetrics: boolean;
    allowDownloads: boolean;
    watermark: boolean;
    customDomain: string;
    seoSettings: {
      title: string;
      description: string;
      keywords: string[];
    };
  };
  preferences: {
    theme: string;
    language: string;
    currency: string;
    dateFormat: string;
    timeFormat: string;
    autoSave: boolean;
    compactMode: boolean;
    animations: boolean;
    sounds: boolean;
  };
}

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [settings, setSettings] = useState<SettingsData>({
    profile: {
      name: "Priya Sharma",
      username: "priyacreates",
      email: "priya@creatormail.com",
      phone: "+91 98765 43210",
      bio: "Lifestyle content creator specializing in fashion, travel, and sustainable living. Helping brands tell authentic stories that resonate with modern audiences.",
      location: "Mumbai, India",
      website: "www.priyacreates.com",
      profilePicture:
        "https://img.freepik.com/free-photo/portrait-young-indian-top-manager-t-shirt-tie-crossed-arms-smiling-white-isolated-wall_496169-1513.jpg",
      coverImage:
        "https://img.freepik.com/free-photo/full-shot-travel-concept-with-landmarks_23-2149153258.jpg",
      languages: ["English", "Hindi", "Marathi"],
      timezone: "Asia/Kolkata",
      dateFormat: "DD/MM/YYYY",
    },
    notifications: {
      email: {
        campaigns: true,
        payments: true,
        messages: true,
        marketing: false,
        security: true,
      },
      push: {
        campaigns: true,
        payments: true,
        messages: true,
        deadlines: true,
        opportunities: true,
      },
      sms: {
        security: true,
        payments: true,
        urgent: true,
      },
      frequency: "immediate",
      quietHours: {
        enabled: true,
        start: "22:00",
        end: "08:00",
      },
    },
    privacy: {
      profileVisibility: "public",
      portfolioVisibility: "public",
      contactInfo: "verified-brands",
      socialMedia: "public",
      analytics: true,
      searchable: true,
      showOnlineStatus: false,
      allowDirectMessages: "verified-brands",
    },
    security: {
      twoFactorAuth: true,
      loginAlerts: true,
      sessionTimeout: "24h",
      trustedDevices: [
        {
          id: 1,
          name: "iPhone 13 Pro",
          lastUsed: "2 hours ago",
          location: "Mumbai, India",
        },
        {
          id: 2,
          name: "MacBook Pro",
          lastUsed: "1 day ago",
          location: "Mumbai, India",
        },
      ],
      recentActivity: [
        {
          id: 1,
          action: "Login",
          device: "iPhone 13 Pro",
          time: "2 hours ago",
          location: "Mumbai, India",
        },
        {
          id: 2,
          action: "Password changed",
          device: "MacBook Pro",
          time: "3 days ago",
          location: "Mumbai, India",
        },
        {
          id: 3,
          action: "Login",
          device: "iPad",
          time: "1 week ago",
          location: "Delhi, India",
        },
      ],
    },
    payments: {
      defaultCurrency: "INR",
      taxInfo: {
        gstNumber: "27ABCDE1234F1Z5",
        panNumber: "ABCDE1234F",
        address: "123 Creator Street, Mumbai, Maharashtra 400001",
      },
      bankDetails: {
        accountNumber: "****1234",
        ifscCode: "HDFC0001234",
        bankName: "HDFC Bank",
        accountHolder: "Priya Sharma",
      },
      paymentMethods: [
        { id: 1, type: "bank", name: "HDFC Bank ****1234", primary: true },
        { id: 2, type: "upi", name: "priya@paytm", primary: false },
      ],
      autoWithdraw: false,
      withdrawThreshold: 5000,
    },
    portfolio: {
      featuredContent: ["1", "2", "3"],
      categories: ["Fashion", "Travel", "Lifestyle", "Beauty"],
      showMetrics: true,
      allowDownloads: false,
      watermark: true,
      customDomain: "",
      seoSettings: {
        title: "Priya Sharma - Content Creator Portfolio",
        description:
          "Lifestyle content creator specializing in fashion, travel, and sustainable living",
        keywords: [
          "fashion",
          "travel",
          "lifestyle",
          "content creator",
          "influencer",
        ],
      },
    },
    preferences: {
      theme: "light",
      language: "en",
      currency: "INR",
      dateFormat: "DD/MM/YYYY",
      timeFormat: "24h",
      autoSave: true,
      compactMode: false,
      animations: true,
      sounds: true,
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    setHasChanges(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const updateSettings = (
    section: keyof SettingsData,
    field: string,
    value: string | number | boolean | string[]
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    setHasChanges(true);
  };

  const updateNestedSettings = <
    T extends keyof SettingsData,
    K extends keyof SettingsData[T],
    V extends SettingsData[T][K] extends object
      ? keyof SettingsData[T][K] extends string
        ? string | number | boolean | string[]
        : never
      : never
  >(
    section: T,
    subsection: K,
    field: string,
    value: V
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...(prev[section][subsection] as object),
          [field]: value,
        },
      },
    }));
    setHasChanges(true);
  };

  const settingsSections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Eye },
    { id: "security", label: "Security", icon: Shield },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "portfolio", label: "Portfolio", icon: Bookmark },
    { id: "preferences", label: "Preferences", icon: Settings },
  ];

  if (isLoading) {
    return (
      <PageContainer>
        <LoadingSkeleton>
          <div className="header" />
          <div className="sidebar" />
          <div className="content" />
        </LoadingSkeleton>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* Header */}
      <HeaderSection>
        <WrapperBox themeVariant="grey">
          <HeaderContent>
            <HeaderLeft>
              <HeaderTitle>
                <Settings size={28} />
                Settings
              </HeaderTitle>
              <HeaderSubtitle>
                Manage your account preferences and platform settings
              </HeaderSubtitle>
            </HeaderLeft>
            <HeaderActions>
              {hasChanges && (
                <SaveButton onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <RefreshCw size={16} className="spinning" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Save Changes
                    </>
                  )}
                </SaveButton>
              )}
              {showSuccessMessage && (
                <SuccessMessage>
                  <Check size={16} />
                  Settings saved successfully!
                </SuccessMessage>
              )}
            </HeaderActions>
          </HeaderContent>
        </WrapperBox>
      </HeaderSection>

      {/* Main Content */}
      <MainContent>
        {/* Sidebar Navigation */}
        <SettingsSidebar>
          <WrapperBox themeVariant="grey">
            <SidebarTitle>Settings Menu</SidebarTitle>
            <SidebarNav>
              {settingsSections.map((section) => (
                <SidebarItem
                  key={section.id}
                  active={activeSection === section.id}
                  onClick={() => setActiveSection(section.id)}
                >
                  <section.icon size={20} />
                  <span>{section.label}</span>
                  <ChevronRight size={16} />
                </SidebarItem>
              ))}
            </SidebarNav>

            <SidebarFooter>
              <SidebarItem>
                <HelpCircle size={20} />
                <span>Help & Support</span>
                <ExternalLink size={16} />
              </SidebarItem>
              <SidebarItem danger>
                <LogOut size={20} />
                <span>Sign Out</span>
              </SidebarItem>
            </SidebarFooter>
          </WrapperBox>
        </SettingsSidebar>

        {/* Settings Content */}
        <SettingsContent>
          {/* Profile Settings */}
          {activeSection === "profile" && (
            <WrapperBox themeVariant="grey">
              <SectionHeader>
                <SectionTitle>Profile Information</SectionTitle>
                <SectionDescription>
                  Update your personal information and public profile
                </SectionDescription>
              </SectionHeader>

              <SettingsGrid>
                <SettingsCard>
                  <CardHeader>
                    <CardTitle>
                      <User size={20} />
                      Basic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormGroup>
                      <FormLabel>Full Name</FormLabel>
                      <FormInput
                        value={settings.profile.name}
                        onChange={(e) =>
                          updateSettings("profile", "name", e.target.value)
                        }
                        placeholder="Enter your full name"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Username</FormLabel>
                      <FormInput
                        value={settings.profile.username}
                        onChange={(e) =>
                          updateSettings("profile", "username", e.target.value)
                        }
                        placeholder="Enter your username"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Email Address</FormLabel>
                      <FormInput
                        type="email"
                        value={settings.profile.email}
                        onChange={(e) =>
                          updateSettings("profile", "email", e.target.value)
                        }
                        placeholder="Enter your email"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Phone Number</FormLabel>
                      <FormInput
                        value={settings.profile.phone}
                        onChange={(e) =>
                          updateSettings("profile", "phone", e.target.value)
                        }
                        placeholder="Enter your phone number"
                      />
                    </FormGroup>
                  </CardContent>
                </SettingsCard>

                <SettingsCard>
                  <CardHeader>
                    <CardTitle>
                      <Edit size={20} />
                      Profile Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormGroup>
                      <FormLabel>Bio</FormLabel>
                      <FormTextarea
                        value={settings.profile.bio}
                        onChange={(e) =>
                          updateSettings("profile", "bio", e.target.value)
                        }
                        placeholder="Tell us about yourself"
                        rows={4}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Location</FormLabel>
                      <FormInput
                        value={settings.profile.location}
                        onChange={(e) =>
                          updateSettings("profile", "location", e.target.value)
                        }
                        placeholder="Your location"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Website</FormLabel>
                      <FormInput
                        value={settings.profile.website}
                        onChange={(e) =>
                          updateSettings("profile", "website", e.target.value)
                        }
                        placeholder="Your website URL"
                      />
                    </FormGroup>
                  </CardContent>
                </SettingsCard>

                <SettingsCard>
                  <CardHeader>
                    <CardTitle>
                      <Camera size={20} />
                      Profile Images
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ImageUploadSection>
                      <ImageUploadGroup>
                        <ImageUploadLabel>Profile Picture</ImageUploadLabel>
                        <ProfileImagePreview>
                          <img
                            src={
                              settings.profile.profilePicture ||
                              "/placeholder.svg"
                            }
                            alt="Profile"
                          />
                          <ImageUploadOverlay>
                            <Upload size={20} />
                            <span>Change Photo</span>
                          </ImageUploadOverlay>
                        </ProfileImagePreview>
                      </ImageUploadGroup>
                      <ImageUploadGroup>
                        <ImageUploadLabel>Cover Image</ImageUploadLabel>
                        <CoverImagePreview>
                          <img
                            src={
                              settings.profile.coverImage || "/placeholder.svg"
                            }
                            alt="Cover"
                          />
                          <ImageUploadOverlay>
                            <Upload size={20} />
                            <span>Change Cover</span>
                          </ImageUploadOverlay>
                        </CoverImagePreview>
                      </ImageUploadGroup>
                    </ImageUploadSection>
                  </CardContent>
                </SettingsCard>

                <SettingsCard>
                  <CardHeader>
                    <CardTitle>
                      <Globe size={20} />
                      Localization
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormGroup>
                      <FormLabel>Languages</FormLabel>
                      <LanguageSelector>
                        {settings.profile.languages.map((lang, index) => (
                          <LanguageTag key={index}>
                            {lang}
                            <button
                              onClick={() => {
                                const newLangs =
                                  settings.profile.languages.filter(
                                    (_, i) => i !== index
                                  );
                                updateSettings(
                                  "profile",
                                  "languages",
                                  newLangs
                                );
                              }}
                            >
                              <X size={14} />
                            </button>
                          </LanguageTag>
                        ))}
                        <AddLanguageButton>
                          <Plus size={14} />
                          Add Language
                        </AddLanguageButton>
                      </LanguageSelector>
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Timezone</FormLabel>
                      <FormSelect
                        value={settings.profile.timezone}
                        onChange={(e) =>
                          updateSettings("profile", "timezone", e.target.value)
                        }
                      >
                        <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                        <option value="America/New_York">
                          America/New_York (EST)
                        </option>
                        <option value="Europe/London">
                          Europe/London (GMT)
                        </option>
                        <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                      </FormSelect>
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Date Format</FormLabel>
                      <FormSelect
                        value={settings.profile.dateFormat}
                        onChange={(e) =>
                          updateSettings(
                            "profile",
                            "dateFormat",
                            e.target.value
                          )
                        }
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </FormSelect>
                    </FormGroup>
                  </CardContent>
                </SettingsCard>
              </SettingsGrid>
            </WrapperBox>
          )}

          {/* Notifications Settings */}
          {activeSection === "notifications" && (
            <WrapperBox themeVariant="grey">
              <SectionHeader>
                <SectionTitle>Notification Preferences</SectionTitle>
                <SectionDescription>
                  Control how and when you receive notifications
                </SectionDescription>
              </SectionHeader>

              <SettingsGrid>
                <SettingsCard>
                  <CardHeader>
                    <CardTitle>
                      <Mail size={20} />
                      Email Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ToggleGroup>
                      <ToggleItem>
                        <ToggleLabel>
                          <div>
                            <strong>Campaign Updates</strong>
                            <span>
                              New campaigns, applications, and status changes
                            </span>
                          </div>
                        </ToggleLabel>
                        <ToggleSwitch
                          active={settings.notifications.email.campaigns}
                          onClick={() =>
                            updateNestedSettings(
                              "notifications",
                              "email",
                              "campaigns",
                              !settings.notifications.email.campaigns
                            )
                          }
                        >
                          {settings.notifications.email.campaigns ? (
                            <ToggleRight size={20} />
                          ) : (
                            <ToggleLeft size={20} />
                          )}
                        </ToggleSwitch>
                      </ToggleItem>
                      <ToggleItem>
                        <ToggleLabel>
                          <div>
                            <strong>Payment Notifications</strong>
                            <span>
                              Payment confirmations and transaction updates
                            </span>
                          </div>
                        </ToggleLabel>
                        <ToggleSwitch
                          active={settings.notifications.email.payments}
                          onClick={() =>
                            updateNestedSettings(
                              "notifications",
                              "email",
                              "payments",
                              !settings.notifications.email.payments
                            )
                          }
                        >
                          {settings.notifications.email.payments ? (
                            <ToggleRight size={20} />
                          ) : (
                            <ToggleLeft size={20} />
                          )}
                        </ToggleSwitch>
                      </ToggleItem>
                      <ToggleItem>
                        <ToggleLabel>
                          <div>
                            <strong>Messages</strong>
                            <span>
                              New messages from brands and platform updates
                            </span>
                          </div>
                        </ToggleLabel>
                        <ToggleSwitch
                          active={settings.notifications.email.messages}
                          onClick={() =>
                            updateNestedSettings(
                              "notifications",
                              "email",
                              "messages",
                              !settings.notifications.email.messages
                            )
                          }
                        >
                          {settings.notifications.email.messages ? (
                            <ToggleRight size={20} />
                          ) : (
                            <ToggleLeft size={20} />
                          )}
                        </ToggleSwitch>
                      </ToggleItem>
                      <ToggleItem>
                        <ToggleLabel>
                          <div>
                            <strong>Marketing & Promotions</strong>
                            <span>
                              Platform updates, tips, and promotional content
                            </span>
                          </div>
                        </ToggleLabel>
                        <ToggleSwitch
                          active={settings.notifications.email.marketing}
                          onClick={() =>
                            updateNestedSettings(
                              "notifications",
                              "email",
                              "marketing",
                              !settings.notifications.email.marketing
                            )
                          }
                        >
                          {settings.notifications.email.marketing ? (
                            <ToggleRight size={20} />
                          ) : (
                            <ToggleLeft size={20} />
                          )}
                        </ToggleSwitch>
                      </ToggleItem>
                      <ToggleItem>
                        <ToggleLabel>
                          <div>
                            <strong>Security Alerts</strong>
                            <span>
                              Login attempts and security-related notifications
                            </span>
                          </div>
                        </ToggleLabel>
                        <ToggleSwitch
                          active={settings.notifications.email.security}
                          onClick={() =>
                            updateNestedSettings(
                              "notifications",
                              "email",
                              "security",
                              !settings.notifications.email.security
                            )
                          }
                        >
                          {settings.notifications.email.security ? (
                            <ToggleRight size={20} />
                          ) : (
                            <ToggleLeft size={20} />
                          )}
                        </ToggleSwitch>
                      </ToggleItem>
                    </ToggleGroup>
                  </CardContent>
                </SettingsCard>

                <SettingsCard>
                  <CardHeader>
                    <CardTitle>
                      <Smartphone size={20} />
                      Push Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ToggleGroup>
                      <ToggleItem>
                        <ToggleLabel>
                          <div>
                            <strong>Campaign Updates</strong>
                            <span>Real-time campaign notifications</span>
                          </div>
                        </ToggleLabel>
                        <ToggleSwitch
                          active={settings.notifications.push.campaigns}
                          onClick={() =>
                            updateNestedSettings(
                              "notifications",
                              "push",
                              "campaigns",
                              !settings.notifications.push.campaigns
                            )
                          }
                        >
                          {settings.notifications.push.campaigns ? (
                            <ToggleRight size={20} />
                          ) : (
                            <ToggleLeft size={20} />
                          )}
                        </ToggleSwitch>
                      </ToggleItem>
                      <ToggleItem>
                        <ToggleLabel>
                          <div>
                            <strong>Payment Alerts</strong>
                            <span>Instant payment notifications</span>
                          </div>
                        </ToggleLabel>
                        <ToggleSwitch
                          active={settings.notifications.push.payments}
                          onClick={() =>
                            updateNestedSettings(
                              "notifications",
                              "push",
                              "payments",
                              !settings.notifications.push.payments
                            )
                          }
                        >
                          {settings.notifications.push.payments ? (
                            <ToggleRight size={20} />
                          ) : (
                            <ToggleLeft size={20} />
                          )}
                        </ToggleSwitch>
                      </ToggleItem>
                      <ToggleItem>
                        <ToggleLabel>
                          <div>
                            <strong>New Messages</strong>
                            <span>Instant message notifications</span>
                          </div>
                        </ToggleLabel>
                        <ToggleSwitch
                          active={settings.notifications.push.messages}
                          onClick={() =>
                            updateNestedSettings(
                              "notifications",
                              "push",
                              "messages",
                              !settings.notifications.push.messages
                            )
                          }
                        >
                          {settings.notifications.push.messages ? (
                            <ToggleRight size={20} />
                          ) : (
                            <ToggleLeft size={20} />
                          )}
                        </ToggleSwitch>
                      </ToggleItem>
                      <ToggleItem>
                        <ToggleLabel>
                          <div>
                            <strong>Deadline Reminders</strong>
                            <span>
                              Content submission and campaign deadlines
                            </span>
                          </div>
                        </ToggleLabel>
                        <ToggleSwitch
                          active={settings.notifications.push.deadlines}
                          onClick={() =>
                            updateNestedSettings(
                              "notifications",
                              "push",
                              "deadlines",
                              !settings.notifications.push.deadlines
                            )
                          }
                        >
                          {settings.notifications.push.deadlines ? (
                            <ToggleRight size={20} />
                          ) : (
                            <ToggleLeft size={20} />
                          )}
                        </ToggleSwitch>
                      </ToggleItem>
                      <ToggleItem>
                        <ToggleLabel>
                          <div>
                            <strong>New Opportunities</strong>
                            <span>
                              Matching campaigns and collaboration requests
                            </span>
                          </div>
                        </ToggleLabel>
                        <ToggleSwitch
                          active={settings.notifications.push.opportunities}
                          onClick={() =>
                            updateNestedSettings(
                              "notifications",
                              "push",
                              "opportunities",
                              !settings.notifications.push.opportunities
                            )
                          }
                        >
                          {settings.notifications.push.opportunities ? (
                            <ToggleRight size={20} />
                          ) : (
                            <ToggleLeft size={20} />
                          )}
                        </ToggleSwitch>
                      </ToggleItem>
                    </ToggleGroup>
                  </CardContent>
                </SettingsCard>

                <SettingsCard>
                  <CardHeader>
                    <CardTitle>
                      <MessageSquare size={20} />
                      SMS Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ToggleGroup>
                      <ToggleItem>
                        <ToggleLabel>
                          <div>
                            <strong>Security Alerts</strong>
                            <span>Login attempts and security warnings</span>
                          </div>
                        </ToggleLabel>
                        <ToggleSwitch
                          active={settings.notifications.sms.security}
                          onClick={() =>
                            updateNestedSettings(
                              "notifications",
                              "sms",
                              "security",
                              !settings.notifications.sms.security
                            )
                          }
                        >
                          {settings.notifications.sms.security ? (
                            <ToggleRight size={20} />
                          ) : (
                            <ToggleLeft size={20} />
                          )}
                        </ToggleSwitch>
                      </ToggleItem>
                      <ToggleItem>
                        <ToggleLabel>
                          <div>
                            <strong>Payment Confirmations</strong>
                            <span>High-value payment confirmations</span>
                          </div>
                        </ToggleLabel>
                        <ToggleSwitch
                          active={settings.notifications.sms.payments}
                          onClick={() =>
                            updateNestedSettings(
                              "notifications",
                              "sms",
                              "payments",
                              !settings.notifications.sms.payments
                            )
                          }
                        >
                          {settings.notifications.sms.payments ? (
                            <ToggleRight size={20} />
                          ) : (
                            <ToggleLeft size={20} />
                          )}
                        </ToggleSwitch>
                      </ToggleItem>
                      <ToggleItem>
                        <ToggleLabel>
                          <div>
                            <strong>Urgent Notifications</strong>
                            <span>Critical platform updates and alerts</span>
                          </div>
                        </ToggleLabel>
                        <ToggleSwitch
                          active={settings.notifications.sms.urgent}
                          onClick={() =>
                            updateNestedSettings(
                              "notifications",
                              "sms",
                              "urgent",
                              !settings.notifications.sms.urgent
                            )
                          }
                        >
                          {settings.notifications.sms.urgent ? (
                            <ToggleRight size={20} />
                          ) : (
                            <ToggleLeft size={20} />
                          )}
                        </ToggleSwitch>
                      </ToggleItem>
                    </ToggleGroup>
                  </CardContent>
                </SettingsCard>

                <SettingsCard>
                  <CardHeader>
                    <CardTitle>
                      <Clock size={20} />
                      Notification Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormGroup>
                      <FormLabel>Notification Frequency</FormLabel>
                      <FormSelect
                        value={settings.notifications.frequency}
                        onChange={(e) =>
                          updateSettings(
                            "notifications",
                            "frequency",
                            e.target.value
                          )
                        }
                      >
                        <option value="immediate">Immediate</option>
                        <option value="hourly">Hourly Digest</option>
                        <option value="daily">Daily Digest</option>
                        <option value="weekly">Weekly Summary</option>
                      </FormSelect>
                    </FormGroup>
                    <QuietHoursSection>
                      <QuietHoursHeader>
                        <FormLabel>Quiet Hours</FormLabel>
                        <ToggleSwitch
                          active={settings.notifications.quietHours.enabled}
                          onClick={() =>
                            updateNestedSettings(
                              "notifications",
                              "quietHours",
                              "enabled",
                              !settings.notifications.quietHours.enabled
                            )
                          }
                        >
                          {settings.notifications.quietHours.enabled ? (
                            <ToggleRight size={20} />
                          ) : (
                            <ToggleLeft size={20} />
                          )}
                        </ToggleSwitch>
                      </QuietHoursHeader>
                      {settings.notifications.quietHours.enabled && (
                        <QuietHoursInputs>
                          <FormGroup>
                            <FormLabel>Start Time</FormLabel>
                            <FormInput
                              type="time"
                              value={settings.notifications.quietHours.start}
                              onChange={(e) =>
                                updateNestedSettings(
                                  "notifications",
                                  "quietHours",
                                  "start",
                                  e.target.value
                                )
                              }
                            />
                          </FormGroup>
                          <FormGroup>
                            <FormLabel>End Time</FormLabel>
                            <FormInput
                              type="time"
                              value={settings.notifications.quietHours.end}
                              onChange={(e) =>
                                updateNestedSettings(
                                  "notifications",
                                  "quietHours",
                                  "end",
                                  e.target.value
                                )
                              }
                            />
                          </FormGroup>
                        </QuietHoursInputs>
                      )}
                    </QuietHoursSection>
                  </CardContent>
                </SettingsCard>
              </SettingsGrid>
            </WrapperBox>
          )}

          {/* Privacy Settings */}
          {activeSection === "privacy" && (
            <WrapperBox themeVariant="grey">
              <SectionHeader>
                <SectionTitle>Privacy & Visibility</SectionTitle>
                <SectionDescription>
                  Control who can see your information and how it's used
                </SectionDescription>
              </SectionHeader>

              <SettingsGrid>
                <SettingsCard>
                  <CardHeader>
                    <CardTitle>
                      <Eye size={20} />
                      Profile Visibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormGroup>
                      <FormLabel>Profile Visibility</FormLabel>
                      <RadioGroup>
                        <RadioOption>
                          <RadioInput
                            type="radio"
                            name="profileVisibility"
                            value="public"
                            checked={
                              settings.privacy.profileVisibility === "public"
                            }
                            onChange={(e) =>
                              updateSettings(
                                "privacy",
                                "profileVisibility",
                                e.target.value
                              )
                            }
                          />
                          <RadioLabel>
                            <strong>Public</strong> - Anyone can view your
                            profile
                          </RadioLabel>
                        </RadioOption>
                        <RadioOption>
                          <RadioInput
                            type="radio"
                            name="profileVisibility"
                            value="verified-brands"
                            checked={
                              settings.privacy.profileVisibility ===
                              "verified-brands"
                            }
                            onChange={(e) =>
                              updateSettings(
                                "privacy",
                                "profileVisibility",
                                e.target.value
                              )
                            }
                          />
                          <RadioLabel>
                            <strong>Verified Brands Only</strong> - Only
                            verified brands can view your profile
                          </RadioLabel>
                        </RadioOption>
                        <RadioOption>
                          <RadioInput
                            type="radio"
                            name="profileVisibility"
                            value="private"
                            checked={
                              settings.privacy.profileVisibility === "private"
                            }
                            onChange={(e) =>
                              updateSettings(
                                "privacy",
                                "profileVisibility",
                                e.target.value
                              )
                            }
                          />
                          <RadioLabel>
                            <strong>Private</strong> - Only you can view your
                            profile
                          </RadioLabel>
                        </RadioOption>
                      </RadioGroup>
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Portfolio Visibility</FormLabel>
                      <RadioGroup>
                        <RadioOption>
                          <RadioInput
                            type="radio"
                            name="portfolioVisibility"
                            value="public"
                            checked={
                              settings.privacy.portfolioVisibility === "public"
                            }
                            onChange={(e) =>
                              updateSettings(
                                "privacy",
                                "portfolioVisibility",
                                e.target.value
                              )
                            }
                          />
                          <RadioLabel>
                            <strong>Public</strong> - Anyone can view your
                            portfolio
                          </RadioLabel>
                        </RadioOption>
                        <RadioOption>
                          <RadioInput
                            type="radio"
                            name="portfolioVisibility"
                            value="verified-brands"
                            checked={
                              settings.privacy.portfolioVisibility ===
                              "verified-brands"
                            }
                            onChange={(e) =>
                              updateSettings(
                                "privacy",
                                "portfolioVisibility",
                                e.target.value
                              )
                            }
                          />
                          <RadioLabel>
                            <strong>Verified Brands Only</strong> - Only
                            verified brands can view your portfolio
                          </RadioLabel>
                        </RadioOption>
                        <RadioOption>
                          <RadioInput
                            type="radio"
                            name="portfolioVisibility"
                            value="private"
                            checked={
                              settings.privacy.portfolioVisibility === "private"
                            }
                            onChange={(e) =>
                              updateSettings(
                                "privacy",
                                "portfolioVisibility",
                                e.target.value
                              )
                            }
                          />
                          <RadioLabel>
                            <strong>Private</strong> - Only you can view your
                            portfolio
                          </RadioLabel>
                        </RadioOption>
                      </RadioGroup>
                    </FormGroup>
                  </CardContent>
                </SettingsCard>

                <SettingsCard>
                  <CardHeader>
                    <CardTitle>
                      <MessageSquare size={20} />
                      Contact & Communication
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormGroup>
                      <FormLabel>Contact Information Visibility</FormLabel>
                      <FormSelect
                        value={settings.privacy.contactInfo}
                        onChange={(e) =>
                          updateSettings(
                            "privacy",
                            "contactInfo",
                            e.target.value
                          )
                        }
                      >
                        <option value="public">Public</option>
                        <option value="verified-brands">
                          Verified Brands Only
                        </option>
                        <option value="collaborators">
                          Collaborators Only
                        </option>
                        <option value="private">Private</option>
                      </FormSelect>
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Allow Direct Messages From</FormLabel>
                      <FormSelect
                        value={settings.privacy.allowDirectMessages}
                        onChange={(e) =>
                          updateSettings(
                            "privacy",
                            "allowDirectMessages",
                            e.target.value
                          )
                        }
                      >
                        <option value="everyone">Everyone</option>
                        <option value="verified-brands">
                          Verified Brands Only
                        </option>
                        <option value="collaborators">
                          Collaborators Only
                        </option>
                        <option value="none">No One</option>
                      </FormSelect>
                    </FormGroup>
                    <ToggleGroup>
                      <ToggleItem>
                        <ToggleLabel>
                          <div>
                            <strong>Show Online Status</strong>
                            <span>Let others see when you're online</span>
                          </div>
                        </ToggleLabel>
                        <ToggleSwitch
                          active={settings.privacy.showOnlineStatus}
                          onClick={() =>
                            updateSettings(
                              "privacy",
                              "showOnlineStatus",
                              !settings.privacy.showOnlineStatus
                            )
                          }
                        >
                          {settings.privacy.showOnlineStatus ? (
                            <ToggleRight size={20} />
                          ) : (
                            <ToggleLeft size={20} />
                          )}
                        </ToggleSwitch>
                      </ToggleItem>
                    </ToggleGroup>
                  </CardContent>
                </SettingsCard>

                <SettingsCard>
                  <CardHeader>
                    <CardTitle>
                      <Search size={20} />
                      Discoverability
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ToggleGroup>
                      <ToggleItem>
                        <ToggleLabel>
                          <div>
                            <strong>Searchable Profile</strong>
                            <span>
                              Allow your profile to appear in search results
                            </span>
                          </div>
                        </ToggleLabel>
                        <ToggleSwitch
                          active={settings.privacy.searchable}
                          onClick={() =>
                            updateSettings(
                              "privacy",
                              "searchable",
                              !settings.privacy.searchable
                            )
                          }
                        >
                          {settings.privacy.searchable ? (
                            <ToggleRight size={20} />
                          ) : (
                            <ToggleLeft size={20} />
                          )}
                        </ToggleSwitch>
                      </ToggleItem>
                      <ToggleItem>
                        <ToggleLabel>
                          <div>
                            <strong>Analytics Sharing</strong>
                            <span>
                              Share anonymized analytics data to improve
                              platform
                            </span>
                          </div>
                        </ToggleLabel>
                        <ToggleSwitch
                          active={settings.privacy.analytics}
                          onClick={() =>
                            updateSettings(
                              "privacy",
                              "analytics",
                              !settings.privacy.analytics
                            )
                          }
                        >
                          {settings.privacy.analytics ? (
                            <ToggleRight size={20} />
                          ) : (
                            <ToggleLeft size={20} />
                          )}
                        </ToggleSwitch>
                      </ToggleItem>
                    </ToggleGroup>
                    <FormGroup>
                      <FormLabel>Social Media Visibility</FormLabel>
                      <FormSelect
                        value={settings.privacy.socialMedia}
                        onChange={(e) =>
                          updateSettings(
                            "privacy",
                            "socialMedia",
                            e.target.value
                          )
                        }
                      >
                        <option value="public">Public</option>
                        <option value="verified-brands">
                          Verified Brands Only
                        </option>
                        <option value="private">Private</option>
                      </FormSelect>
                    </FormGroup>
                  </CardContent>
                </SettingsCard>

                <SettingsCard>
                  <CardHeader>
                    <CardTitle>
                      <Database size={20} />
                      Data Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DataManagementActions>
                      <ActionButton>
                        <Download size={16} />
                        Download My Data
                      </ActionButton>
                      <ActionButton>
                        <FileText size={16} />
                        Privacy Policy
                      </ActionButton>
                      <ActionButton>
                        <Shield size={16} />
                        Data Processing Agreement
                      </ActionButton>
                      <ActionButton danger>
                        <Trash2 size={16} />
                        Delete Account
                      </ActionButton>
                    </DataManagementActions>
                  </CardContent>
                </SettingsCard>
              </SettingsGrid>
            </WrapperBox>
          )}

          {/* Security Settings */}
          {activeSection === "security" && (
            <WrapperBox themeVariant="grey">
              <SectionHeader>
                <SectionTitle>Security & Authentication</SectionTitle>
                <SectionDescription>
                  Protect your account with advanced security features
                </SectionDescription>
              </SectionHeader>

              <SettingsGrid>
                <SettingsCard>
                  <CardHeader>
                    <CardTitle>
                      <Lock size={20} />
                      Account Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ToggleGroup>
                      <ToggleItem>
                        <ToggleLabel>
                          <div>
                            <strong>Two-Factor Authentication</strong>
                            <span>
                              Add an extra layer of security to your account
                            </span>
                          </div>
                        </ToggleLabel>
                        <ToggleSwitch
                          active={settings.security.twoFactorAuth}
                          onClick={() =>
                            updateSettings(
                              "security",
                              "twoFactorAuth",
                              !settings.security.twoFactorAuth
                            )
                          }
                        >
                          {settings.security.twoFactorAuth ? (
                            <ToggleRight size={20} />
                          ) : (
                            <ToggleLeft size={20} />
                          )}
                        </ToggleSwitch>
                      </ToggleItem>
                      <ToggleItem>
                        <ToggleLabel>
                          <div>
                            <strong>Login Alerts</strong>
                            <span>Get notified of new login attempts</span>
                          </div>
                        </ToggleLabel>
                        <ToggleSwitch
                          active={settings.security.loginAlerts}
                          onClick={() =>
                            updateSettings(
                              "security",
                              "loginAlerts",
                              !settings.security.loginAlerts
                            )
                          }
                        >
                          {settings.security.loginAlerts ? (
                            <ToggleRight size={20} />
                          ) : (
                            <ToggleLeft size={20} />
                          )}
                        </ToggleSwitch>
                      </ToggleItem>
                    </ToggleGroup>
                    <FormGroup>
                      <FormLabel>Session Timeout</FormLabel>
                      <FormSelect
                        value={settings.security.sessionTimeout}
                        onChange={(e) =>
                          updateSettings(
                            "security",
                            "sessionTimeout",
                            e.target.value
                          )
                        }
                      >
                        <option value="1h">1 Hour</option>
                        <option value="8h">8 Hours</option>
                        <option value="24h">24 Hours</option>
                        <option value="7d">7 Days</option>
                        <option value="30d">30 Days</option>
                      </FormSelect>
                    </FormGroup>
                    <SecurityActions>
                      <ActionButton>
                        <Key size={16} />
                        Change Password
                      </ActionButton>
                      <ActionButton>
                        <Smartphone size={16} />
                        Setup 2FA
                      </ActionButton>
                    </SecurityActions>
                  </CardContent>
                </SettingsCard>

                <SettingsCard>
                  <CardHeader>
                    <CardTitle>
                      <Monitor size={20} />
                      Trusted Devices
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DevicesList>
                      {settings.security.trustedDevices.map((device) => (
                        <DeviceItem key={device.id}>
                          <DeviceInfo>
                            <DeviceName>{device.name}</DeviceName>
                            <DeviceDetails>
                              <span>Last used: {device.lastUsed}</span>
                              <span>Location: {device.location}</span>
                            </DeviceDetails>
                          </DeviceInfo>
                          <DeviceActions>
                            <ActionButton small>
                              <Trash2 size={14} />
                              Remove
                            </ActionButton>
                          </DeviceActions>
                        </DeviceItem>
                      ))}
                    </DevicesList>
                  </CardContent>
                </SettingsCard>

                <SettingsCard>
                  <CardHeader>
                    <CardTitle>
                      <Clock size={20} />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ActivityList>
                      {settings.security.recentActivity.map((activity) => (
                        <ActivityItem key={activity.id}>
                          <ActivityInfo>
                            <ActivityAction>{activity.action}</ActivityAction>
                            <ActivityDetails>
                              <span>{activity.device}</span>
                              <span>{activity.time}</span>
                              <span>{activity.location}</span>
                            </ActivityDetails>
                          </ActivityInfo>
                          <ActivityStatus>
                            <Check size={16} />
                          </ActivityStatus>
                        </ActivityItem>
                      ))}
                    </ActivityList>
                    <ViewAllActivity>
                      <ActionButton>
                        <Eye size={16} />
                        View All Activity
                      </ActionButton>
                    </ViewAllActivity>
                  </CardContent>
                </SettingsCard>

                <SettingsCard>
                  <CardHeader>
                    <CardTitle>
                      <AlertCircle size={20} />
                      Security Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SecurityRecommendations>
                      <RecommendationItem completed>
                        <Check size={16} />
                        <div>
                          <strong>Two-Factor Authentication Enabled</strong>
                          <span>Your account is protected with 2FA</span>
                        </div>
                      </RecommendationItem>
                      <RecommendationItem>
                        <AlertCircle size={16} />
                        <div>
                          <strong>Update Recovery Email</strong>
                          <span>Add a recovery email for account security</span>
                        </div>
                        <ActionButton small>Add Email</ActionButton>
                      </RecommendationItem>
                      <RecommendationItem>
                        <Info size={16} />
                        <div>
                          <strong>Review App Permissions</strong>
                          <span>
                            Check which apps have access to your account
                          </span>
                        </div>
                        <ActionButton small>Review</ActionButton>
                      </RecommendationItem>
                    </SecurityRecommendations>
                  </CardContent>
                </SettingsCard>
              </SettingsGrid>
            </WrapperBox>
          )}

          {/* Payment Settings */}
          {activeSection === "payments" && (
            <WrapperBox themeVariant="grey">
              <SectionHeader>
                <SectionTitle>Payment & Billing</SectionTitle>
                <SectionDescription>
                  Manage your payment methods and financial information
                </SectionDescription>
              </SectionHeader>

              <SettingsGrid>
                <SettingsCard>
                  <CardHeader>
                    <CardTitle>
                      <CreditCard size={20} />
                      Payment Methods
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PaymentMethodsList>
                      {settings.payments.paymentMethods.map((method) => (
                        <PaymentMethodItem key={method.id}>
                          <PaymentMethodInfo>
                            <PaymentMethodIcon>
                              {method.type === "bank" ? (
                                <CreditCard size={20} />
                              ) : (
                                <Smartphone size={20} />
                              )}
                            </PaymentMethodIcon>
                            <div>
                              <PaymentMethodName>
                                {method.name}
                              </PaymentMethodName>
                              {method.primary && (
                                <PrimaryBadge>Primary</PrimaryBadge>
                              )}
                            </div>
                          </PaymentMethodInfo>
                          <PaymentMethodActions>
                            {!method.primary && (
                              <ActionButton small>Set Primary</ActionButton>
                            )}
                            <ActionButton small danger>
                              <Trash2 size={14} />
                              Remove
                            </ActionButton>
                          </PaymentMethodActions>
                        </PaymentMethodItem>
                      ))}
                    </PaymentMethodsList>
                    <AddPaymentMethod>
                      <ActionButton>
                        <Plus size={16} />
                        Add Payment Method
                      </ActionButton>
                    </AddPaymentMethod>
                  </CardContent>
                </SettingsCard>

                <SettingsCard>
                  <CardHeader>
                    <CardTitle>
                      <FileText size={20} />
                      Tax Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormGroup>
                      <FormLabel>GST Number</FormLabel>
                      <FormInput
                        value={settings.payments.taxInfo.gstNumber}
                        onChange={(e) =>
                          updateNestedSettings(
                            "payments",
                            "taxInfo",
                            "gstNumber",
                            e.target.value
                          )
                        }
                        placeholder="Enter GST number"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>PAN Number</FormLabel>
                      <FormInput
                        value={settings.payments.taxInfo.panNumber}
                        onChange={(e) =>
                          updateNestedSettings(
                            "payments",
                            "taxInfo",
                            "panNumber",
                            e.target.value
                          )
                        }
                        placeholder="Enter PAN number"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Billing Address</FormLabel>
                      <FormTextarea
                        value={settings.payments.taxInfo.address}
                        onChange={(e) =>
                          updateNestedSettings(
                            "payments",
                            "taxInfo",
                            "address",
                            e.target.value
                          )
                        }
                        placeholder="Enter billing address"
                        rows={3}
                      />
                    </FormGroup>
                  </CardContent>
                </SettingsCard>

                <SettingsCard>
                  <CardHeader>
                    <CardTitle>
                      <DollarSign size={20} />
                      Withdrawal Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormGroup>
                      <FormLabel>Default Currency</FormLabel>
                      <FormSelect
                        value={settings.payments.defaultCurrency}
                        onChange={(e) =>
                          updateSettings(
                            "payments",
                            "defaultCurrency",
                            e.target.value
                          )
                        }
                      >
                        <option value="INR">Indian Rupee (INR)</option>
                        <option value="USD">US Dollar (USD)</option>
                        <option value="EUR">Euro (EUR)</option>
                        <option value="GBP">British Pound (GBP)</option>
                      </FormSelect>
                    </FormGroup>
                    <ToggleGroup>
                      <ToggleItem>
                        <ToggleLabel>
                          <div>
                            <strong>Auto Withdrawal</strong>
                            <span>
                              Automatically withdraw earnings when threshold is
                              reached
                            </span>
                          </div>
                        </ToggleLabel>
                        <ToggleSwitch
                          active={settings.payments.autoWithdraw}
                          onClick={() =>
                            updateSettings(
                              "payments",
                              "autoWithdraw",
                              !settings.payments.autoWithdraw
                            )
                          }
                        >
                          {settings.payments.autoWithdraw ? (
                            <ToggleRight size={20} />
                          ) : (
                            <ToggleLeft size={20} />
                          )}
                        </ToggleSwitch>
                      </ToggleItem>
                    </ToggleGroup>
                    {settings.payments.autoWithdraw && (
                      <FormGroup>
                        <FormLabel>Withdrawal Threshold</FormLabel>
                        <FormInput
                          type="number"
                          value={settings.payments.withdrawThreshold}
                          onChange={(e) =>
                            updateSettings(
                              "payments",
                              "withdrawThreshold",
                              Number.parseInt(e.target.value)
                            )
                          }
                          placeholder="Minimum amount for auto withdrawal"
                        />
                      </FormGroup>
                    )}
                  </CardContent>
                </SettingsCard>

                <SettingsCard>
                  <CardHeader>
                    <CardTitle>
                      <TrendingUp size={20} />
                      Earnings Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <EarningsStats>
                      <EarningStat>
                        <EarningValue>₹45,230</EarningValue>
                        <EarningLabel>Total Earnings</EarningLabel>
                      </EarningStat>
                      <EarningStat>
                        <EarningValue>₹8,500</EarningValue>
                        <EarningLabel>This Month</EarningLabel>
                      </EarningStat>
                      <EarningStat>
                        <EarningValue>₹2,340</EarningValue>
                        <EarningLabel>Pending</EarningLabel>
                      </EarningStat>
                    </EarningsStats>
                    <EarningsActions>
                      <ActionButton>
                        <Download size={16} />
                        Download Statement
                      </ActionButton>
                      <ActionButton>
                        <Eye size={16} />
                        View Transactions
                      </ActionButton>
                    </EarningsActions>
                  </CardContent>
                </SettingsCard>
              </SettingsGrid>
            </WrapperBox>
          )}

          {/* Portfolio Settings */}
          {activeSection === "portfolio" && (
            <WrapperBox themeVariant="grey">
              <SectionHeader>
                <SectionTitle>Portfolio Management</SectionTitle>
                <SectionDescription>
                  Customize how your portfolio appears to brands and visitors
                </SectionDescription>
              </SectionHeader>

              <SettingsGrid>
                <SettingsCard>
                  <CardHeader>
                    <CardTitle>
                      <Star size={20} />
                      Featured Content
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FeaturedContentList>
                      {settings.portfolio.featuredContent.map(
                        (contentId, index) => (
                          <FeaturedContentItem key={contentId}>
                            <FeaturedContentPreview>
                              <img
                                src={`/placeholder.svg?height=80&width=120`}
                                alt={`Featured content ${index + 1}`}
                              />
                            </FeaturedContentPreview>
                            <FeaturedContentInfo>
                              <FeaturedContentTitle>
                                Featured Content {index + 1}
                              </FeaturedContentTitle>
                              <FeaturedContentMeta>
                                Campaign Name • 15K likes
                              </FeaturedContentMeta>
                            </FeaturedContentInfo>
                            <FeaturedContentActions>
                              <ActionButton small>
                                <Edit size={14} />
                                Edit
                              </ActionButton>
                              <ActionButton small danger>
                                <Trash2 size={14} />
                                Remove
                              </ActionButton>
                            </FeaturedContentActions>
                          </FeaturedContentItem>
                        )
                      )}
                    </FeaturedContentList>
                    <AddFeaturedContent>
                      <ActionButton>
                        <Plus size={16} />
                        Add Featured Content
                      </ActionButton>
                    </AddFeaturedContent>
                  </CardContent>
                </SettingsCard>

                <SettingsCard>
                  <CardHeader>
                    <CardTitle>
                      <Filter size={20} />
                      Content Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CategoryList>
                      {settings.portfolio.categories.map((category, index) => (
                        <CategoryTag key={index}>
                          {category}
                          <button
                            onClick={() => {
                              const newCategories =
                                settings.portfolio.categories.filter(
                                  (_, i) => i !== index
                                );
                              updateSettings(
                                "portfolio",
                                "categories",
                                newCategories
                              );
                            }}
                          >
                            <X size={14} />
                          </button>
                        </CategoryTag>
                      ))}
                      <AddCategoryButton>
                        <Plus size={14} />
                        Add Category
                      </AddCategoryButton>
                    </CategoryList>
                  </CardContent>
                </SettingsCard>

                <SettingsCard>
                  <CardHeader>
                    <CardTitle>
                      <Eye size={20} />
                      Display Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ToggleGroup>
                      <ToggleItem>
                        <ToggleLabel>
                          <div>
                            <strong>Show Performance Metrics</strong>
                            <span>
                              Display likes, views, and engagement data
                            </span>
                          </div>
                        </ToggleLabel>
                        <ToggleSwitch
                          active={settings.portfolio.showMetrics}
                          onClick={() =>
                            updateSettings(
                              "portfolio",
                              "showMetrics",
                              !settings.portfolio.showMetrics
                            )
                          }
                        >
                          {settings.portfolio.showMetrics ? (
                            <ToggleRight size={20} />
                          ) : (
                            <ToggleLeft size={20} />
                          )}
                        </ToggleSwitch>
                      </ToggleItem>
                      <ToggleItem>
                        <ToggleLabel>
                          <div>
                            <strong>Allow Downloads</strong>
                            <span>Let visitors download your content</span>
                          </div>
                        </ToggleLabel>
                        <ToggleSwitch
                          active={settings.portfolio.allowDownloads}
                          onClick={() =>
                            updateSettings(
                              "portfolio",
                              "allowDownloads",
                              !settings.portfolio.allowDownloads
                            )
                          }
                        >
                          {settings.portfolio.allowDownloads ? (
                            <ToggleRight size={20} />
                          ) : (
                            <ToggleLeft size={20} />
                          )}
                        </ToggleSwitch>
                      </ToggleItem>
                      <ToggleItem>
                        <ToggleLabel>
                          <div>
                            <strong>Add Watermark</strong>
                            <span>Protect your content with watermarks</span>
                          </div>
                        </ToggleLabel>
                        <ToggleSwitch
                          active={settings.portfolio.watermark}
                          onClick={() =>
                            updateSettings(
                              "portfolio",
                              "watermark",
                              !settings.portfolio.watermark
                            )
                          }
                        >
                          {settings.portfolio.watermark ? (
                            <ToggleRight size={20} />
                          ) : (
                            <ToggleLeft size={20} />
                          )}
                        </ToggleSwitch>
                      </ToggleItem>
                    </ToggleGroup>
                  </CardContent>
                </SettingsCard>

                <SettingsCard>
                  <CardHeader>
                    <CardTitle>
                      <Link2 size={20} />
                      Custom Domain
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormGroup>
                      <FormLabel>Custom Domain</FormLabel>
                      <FormInput
                        value={settings.portfolio.customDomain}
                        onChange={(e) =>
                          updateSettings(
                            "portfolio",
                            "customDomain",
                            e.target.value
                          )
                        }
                        placeholder="your-domain.com"
                      />
                      <FormHelperText>
                        Connect your own domain to your portfolio (Premium
                        feature)
                      </FormHelperText>
                    </FormGroup>
                    <DomainActions>
                      <ActionButton>
                        <Link2 size={16} />
                        Connect Domain
                      </ActionButton>
                      <ActionButton>
                        <Share2 size={16} />
                        Share Portfolio
                      </ActionButton>
                    </DomainActions>
                  </CardContent>
                </SettingsCard>

                <SettingsCard>
                  <CardHeader>
                    <CardTitle>
                      <Search size={20} />
                      SEO Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormGroup>
                      <FormLabel>Portfolio Title</FormLabel>
                      <FormInput
                        value={settings.portfolio.seoSettings.title}
                        onChange={(e) =>
                          updateNestedSettings(
                            "portfolio",
                            "seoSettings",
                            "title",
                            e.target.value
                          )
                        }
                        placeholder="Your portfolio title"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Meta Description</FormLabel>
                      <FormTextarea
                        value={settings.portfolio.seoSettings.description}
                        onChange={(e) =>
                          updateNestedSettings(
                            "portfolio",
                            "seoSettings",
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Describe your portfolio for search engines"
                        rows={3}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Keywords</FormLabel>
                      <KeywordsList>
                        {settings.portfolio.seoSettings.keywords.map(
                          (keyword, index) => (
                            <KeywordTag key={index}>
                              {keyword}
                              <button
                                onClick={() => {
                                  const newKeywords =
                                    settings.portfolio.seoSettings.keywords.filter(
                                      (_, i) => i !== index
                                    );
                                  updateNestedSettings(
                                    "portfolio",
                                    "seoSettings",
                                    "keywords",
                                    newKeywords
                                  );
                                }}
                              >
                                <X size={14} />
                              </button>
                            </KeywordTag>
                          )
                        )}
                        <AddKeywordButton>
                          <Plus size={14} />
                          Add Keyword
                        </AddKeywordButton>
                      </KeywordsList>
                    </FormGroup>
                  </CardContent>
                </SettingsCard>
              </SettingsGrid>
            </WrapperBox>
          )}

          {/* Preferences Settings */}
          {activeSection === "preferences" && (
            <WrapperBox themeVariant="grey">
              <SectionHeader>
                <SectionTitle>Platform Preferences</SectionTitle>
                <SectionDescription>
                  Customize your platform experience and interface
                </SectionDescription>
              </SectionHeader>

              <SettingsGrid>
                <SettingsCard>
                  <CardHeader>
                    <CardTitle>
                      <Palette size={20} />
                      Appearance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormGroup>
                      <FormLabel>Theme</FormLabel>
                      <ThemeSelector>
                        <ThemeOption
                          active={settings.preferences.theme === "light"}
                          onClick={() =>
                            updateSettings("preferences", "theme", "light")
                          }
                        >
                          <Sun size={20} />
                          <span>Light</span>
                        </ThemeOption>
                        <ThemeOption
                          active={settings.preferences.theme === "dark"}
                          onClick={() =>
                            updateSettings("preferences", "theme", "dark")
                          }
                        >
                          <Moon size={20} />
                          <span>Dark</span>
                        </ThemeOption>
                        <ThemeOption
                          active={settings.preferences.theme === "auto"}
                          onClick={() =>
                            updateSettings("preferences", "theme", "auto")
                          }
                        >
                          <Monitor size={20} />
                          <span>Auto</span>
                        </ThemeOption>
                      </ThemeSelector>
                    </FormGroup>
                    <ToggleGroup>
                      <ToggleItem>
                        <ToggleLabel>
                          <div>
                            <strong>Compact Mode</strong>
                            <span>Use a more compact interface layout</span>
                          </div>
                        </ToggleLabel>
                        <ToggleSwitch
                          active={settings.preferences.compactMode}
                          onClick={() =>
                            updateSettings(
                              "preferences",
                              "compactMode",
                              !settings.preferences.compactMode
                            )
                          }
                        >
                          {settings.preferences.compactMode ? (
                            <ToggleRight size={20} />
                          ) : (
                            <ToggleLeft size={20} />
                          )}
                        </ToggleSwitch>
                      </ToggleItem>
                      <ToggleItem>
                        <ToggleLabel>
                          <div>
                            <strong>Animations</strong>
                            <span>
                              Enable smooth animations and transitions
                            </span>
                          </div>
                        </ToggleLabel>
                        <ToggleSwitch
                          active={settings.preferences.animations}
                          onClick={() =>
                            updateSettings(
                              "preferences",
                              "animations",
                              !settings.preferences.animations
                            )
                          }
                        >
                          {settings.preferences.animations ? (
                            <ToggleRight size={20} />
                          ) : (
                            <ToggleLeft size={20} />
                          )}
                        </ToggleSwitch>
                      </ToggleItem>
                      <ToggleItem>
                        <ToggleLabel>
                          <div>
                            <strong>Sound Effects</strong>
                            <span>
                              Play sounds for notifications and actions
                            </span>
                          </div>
                        </ToggleLabel>
                        <ToggleSwitch
                          active={settings.preferences.sounds}
                          onClick={() =>
                            updateSettings(
                              "preferences",
                              "sounds",
                              !settings.preferences.sounds
                            )
                          }
                        >
                          {settings.preferences.sounds ? (
                            <ToggleRight size={20} />
                          ) : (
                            <ToggleLeft size={20} />
                          )}
                        </ToggleSwitch>
                      </ToggleItem>
                    </ToggleGroup>
                  </CardContent>
                </SettingsCard>

                <SettingsCard>
                  <CardHeader>
                    <CardTitle>
                      <Languages size={20} />
                      Language & Region
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormGroup>
                      <FormLabel>Interface Language</FormLabel>
                      <FormSelect
                        value={settings.preferences.language}
                        onChange={(e) =>
                          updateSettings(
                            "preferences",
                            "language",
                            e.target.value
                          )
                        }
                      >
                        <option value="en">English</option>
                        <option value="hi">हिंदी (Hindi)</option>
                        <option value="mr">मराठी (Marathi)</option>
                        <option value="bn">বাংলা (Bengali)</option>
                        <option value="ta">தமிழ் (Tamil)</option>
                        <option value="te">తెలుగు (Telugu)</option>
                      </FormSelect>
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Currency Display</FormLabel>
                      <FormSelect
                        value={settings.preferences.currency}
                        onChange={(e) =>
                          updateSettings(
                            "preferences",
                            "currency",
                            e.target.value
                          )
                        }
                      >
                        <option value="INR">₹ Indian Rupee</option>
                        <option value="USD">$ US Dollar</option>
                        <option value="EUR">€ Euro</option>
                        <option value="GBP">£ British Pound</option>
                      </FormSelect>
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Date Format</FormLabel>
                      <FormSelect
                        value={settings.preferences.dateFormat}
                        onChange={(e) =>
                          updateSettings(
                            "preferences",
                            "dateFormat",
                            e.target.value
                          )
                        }
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        <option value="DD MMM YYYY">DD MMM YYYY</option>
                      </FormSelect>
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Time Format</FormLabel>
                      <FormSelect
                        value={settings.preferences.timeFormat}
                        onChange={(e) =>
                          updateSettings(
                            "preferences",
                            "timeFormat",
                            e.target.value
                          )
                        }
                      >
                        <option value="24h">24 Hour (14:30)</option>
                        <option value="12h">12 Hour (2:30 PM)</option>
                      </FormSelect>
                    </FormGroup>
                  </CardContent>
                </SettingsCard>

                <SettingsCard>
                  <CardHeader>
                    <CardTitle>
                      <Save size={20} />
                      Data & Storage
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ToggleGroup>
                      <ToggleItem>
                        <ToggleLabel>
                          <div>
                            <strong>Auto Save</strong>
                            <span>
                              Automatically save your work as you type
                            </span>
                          </div>
                        </ToggleLabel>
                        <ToggleSwitch
                          active={settings.preferences.autoSave}
                          onClick={() =>
                            updateSettings(
                              "preferences",
                              "autoSave",
                              !settings.preferences.autoSave
                            )
                          }
                        >
                          {settings.preferences.autoSave ? (
                            <ToggleRight size={20} />
                          ) : (
                            <ToggleLeft size={20} />
                          )}
                        </ToggleSwitch>
                      </ToggleItem>
                    </ToggleGroup>
                    <StorageInfo>
                      <StorageItem>
                        <StorageLabel>Portfolio Storage</StorageLabel>
                        <StorageUsage>
                          <StorageBar>
                            <StorageProgress width="65%" />
                          </StorageBar>
                          <StorageText>2.1 GB of 5 GB used</StorageText>
                        </StorageUsage>
                      </StorageItem>
                      <StorageItem>
                        <StorageLabel>Cache & Temporary Files</StorageLabel>
                        <StorageActions>
                          <ActionButton small>
                            <Trash2 size={14} />
                            Clear Cache
                          </ActionButton>
                        </StorageActions>
                      </StorageItem>
                    </StorageInfo>
                  </CardContent>
                </SettingsCard>

                <SettingsCard>
                  <CardHeader>
                    <CardTitle>
                      <Wifi size={20} />
                      Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PerformanceSettings>
                      <PerformanceItem>
                        <PerformanceLabel>
                          <strong>Image Quality</strong>
                          <span>Balance between quality and loading speed</span>
                        </PerformanceLabel>
                        <PerformanceSelect>
                          <option value="high">High Quality</option>
                          <option value="medium" selected>
                            Balanced
                          </option>
                          <option value="low">Fast Loading</option>
                        </PerformanceSelect>
                      </PerformanceItem>
                      <PerformanceItem>
                        <PerformanceLabel>
                          <strong>Video Autoplay</strong>
                          <span>Automatically play videos in portfolio</span>
                        </PerformanceLabel>
                        <PerformanceSelect>
                          <option value="always">Always</option>
                          <option value="wifi" selected>
                            WiFi Only
                          </option>
                          <option value="never">Never</option>
                        </PerformanceSelect>
                      </PerformanceItem>
                    </PerformanceSettings>
                  </CardContent>
                </SettingsCard>
              </SettingsGrid>
            </WrapperBox>
          )}
        </SettingsContent>
      </MainContent>

      {/* Portfolio Preview Section */}
      {/* <PortfolioPreviewSection>
        <WrapperBox themeVariant="grey">
          <PreviewHeader>
            <PreviewTitle>Portfolio Preview</PreviewTitle>
            <PreviewDescription>
              See how your portfolio appears to brands and visitors
            </PreviewDescription>
            <PreviewActions>
              <ActionButton>
                <Eye size={16} />
                Preview Portfolio
              </ActionButton>
              <ActionButton>
                <Share2 size={16} />
                Share Link
              </ActionButton>
            </PreviewActions>
          </PreviewHeader>
          <PortfolioPreview>
            <PreviewCard>
              <PreviewImage
                src={settings.profile.profilePicture}
                alt="Profile Preview"
              />
              <PreviewContent>
                <PreviewName>{settings.profile.name}</PreviewName>
                <PreviewUsername>@{settings.profile.username}</PreviewUsername>
                <PreviewBio>{settings.profile.bio}</PreviewBio>
                <PreviewStats>
                  <PreviewStat>
                    <strong>78.5K</strong>
                    <span>Followers</span>
                  </PreviewStat>
                  <PreviewStat>
                    <strong>4.8</strong>
                    <span>Rating</span>
                  </PreviewStat>
                  <PreviewStat>
                    <strong>47</strong>
                    <span>Campaigns</span>
                  </PreviewStat>
                </PreviewStats>
              </PreviewContent>
            </PreviewCard>
          </PortfolioPreview>
        </WrapperBox>
      </PortfolioPreviewSection> */}
    </PageContainer>
  );
};

export default SettingsPage;

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 20px;
`;

const LoadingSkeleton = styled.div`
  .header {
    height: 80px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    border-radius: 8px;
    margin-bottom: 1.5rem;
    animation: shimmer 1.5s infinite;
  }

  .sidebar {
    height: 400px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    border-radius: 8px;
    width: 250px;
    animation: shimmer 1.5s infinite;
  }

  .content {
    height: 600px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    border-radius: 8px;
    flex: 1;
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }
`;

export const HeaderSection = styled.div`
  width: 100%;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const HeaderTitle = styled.h1`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: ${sharedTheme.typography.fontSizes.xxxl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
`;

export const HeaderSubtitle = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  color: #6b7280;
  margin: 0;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: ${sharedTheme.colorVariants.primary.dark};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${sharedTheme.colorVariants.primary.darker};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .spinning {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: #ecfdf5;
  color: #059669;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const SettingsSidebar = styled.div`
  height: fit-content;
  position: sticky;
  top: 20px;
`;

const SidebarTitle = styled.h3`
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0 0 1rem 0;
`;

const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 2rem;
`;

interface SidebarItemProps {
  active?: boolean;
  danger?: boolean;
}

const SidebarItem = styled.button<SidebarItemProps>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background-color: ${(props) => (props.active ? "#eff6ff" : "transparent")};
  color: ${(props) =>
    props.danger
      ? "#dc2626"
      : props.active
      ? sharedTheme.colorVariants.primary.dark
      : sharedTheme.colorVariants.secondary.dark};
  border: none;
  border-radius: 8px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${(props) =>
    props.active
      ? sharedTheme.typography.fontWeights.semibold
      : sharedTheme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;

  &:hover {
    background-color: ${(props) =>
      props.danger ? "#fee2e2" : props.active ? "#eff6ff" : "#f3f4f6"};
  }

  svg:last-child {
    margin-left: auto;
    opacity: 0.5;
  }
`;

const SidebarFooter = styled.div`
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const SettingsContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0 0 0.5rem 0;
`;

const SectionDescription = styled.p`
  font-size: ${sharedTheme.typography.fontSizes.md};
  color: #6b7280;
  margin: 0;
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SettingsCard = styled.div`
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: 1.5rem 1.5rem 0 1.5rem;
`;

const CardTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: ${sharedTheme.typography.fontSizes.lg};
  font-weight: ${sharedTheme.typography.fontWeights.semibold};
  color: ${sharedTheme.colorVariants.secondary.dark};
  margin: 0;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const FormLabel = styled.label`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const FormInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  background-color: white;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${sharedTheme.colorVariants.primary.light};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const FormTextarea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  background-color: white;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${sharedTheme.colorVariants.primary.light};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const FormSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  background-color: white;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${sharedTheme.colorVariants.primary.light};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const FormHelperText = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: #6b7280;
  margin-top: 0.25rem;
`;

const ImageUploadSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ImageUploadGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ImageUploadLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const ProfileImagePreview = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #e5e7eb;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CoverImagePreview = styled.div`
  position: relative;
  width: 100%;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #e5e7eb;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageUploadOverlay = styled.div`
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
  gap: 0.5rem;
  color: white;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  opacity: 0;
  transition: opacity 0.2s ease;

  ${ProfileImagePreview}:hover &,
  ${CoverImagePreview}:hover & {
    opacity: 1;
  }
`;

const LanguageSelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const LanguageTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: #eff6ff;
  color: ${sharedTheme.colorVariants.primary.dark};
  border: 1px solid #bfdbfe;
  border-radius: 20px;
  font-size: ${sharedTheme.typography.fontSizes.sm};

  button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;

    &:hover {
      color: #dc2626;
    }
  }
`;

const AddLanguageButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: #f3f4f6;
  color: ${sharedTheme.colorVariants.secondary.dark};
  border: 1px dashed #d1d5db;
  border-radius: 20px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e5e7eb;
    border-color: #9ca3af;
  }
`;

const ToggleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ToggleItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

const ToggleLabel = styled.div`
  flex: 1;

  div {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  strong {
    font-size: ${sharedTheme.typography.fontSizes.sm};
    font-weight: ${sharedTheme.typography.fontWeights.medium};
    color: ${sharedTheme.colorVariants.secondary.dark};
  }

  span {
    font-size: ${sharedTheme.typography.fontSizes.xs};
    color: #6b7280;
  }
`;

interface ToggleSwitchProps {
  active: boolean;
}

const ToggleSwitch = styled.button<ToggleSwitchProps>`
  background: none;
  border: none;
  color: ${(props) =>
    props.active ? sharedTheme.colorVariants.primary.dark : "#9ca3af"};
  cursor: pointer;
  padding: 0;
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) =>
      props.active ? sharedTheme.colorVariants.primary.darker : "#6b7280"};
  }
`;

const QuietHoursSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const QuietHoursHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuietHoursInputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
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
  flex-direction: column;
  gap: 0.25rem;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  line-height: 1.5;
  cursor: pointer;

  strong {
    font-weight: ${sharedTheme.typography.fontWeights.medium};
  }
`;

const DataManagementActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

interface ActionButtonProps {
  primary?: boolean;
  secondary?: boolean;
  danger?: boolean;
  small?: boolean;
}

const ActionButton = styled.button<ActionButtonProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: ${(props) => (props.small ? "0.5rem 0.75rem" : "0.75rem 1rem")};
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
  border-radius: 6px;
  font-size: ${(props) =>
    props.small
      ? sharedTheme.typography.fontSizes.xs
      : sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  justify-content: center;

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

const DevicesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DeviceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
`;

const DeviceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const DeviceName = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const DeviceDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;

  span {
    font-size: ${sharedTheme.typography.fontSizes.xs};
    color: #6b7280;
  }
`;

const DeviceActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ActivityItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
`;

const ActivityInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ActivityAction = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const ActivityDetails = styled.div`
  display: flex;
  gap: 0.5rem;

  span {
    font-size: ${sharedTheme.typography.fontSizes.xs};
    color: #6b7280;

    &:not(:last-child)::after {
      content: "•";
      margin-left: 0.5rem;
    }
  }
`;

const ActivityStatus = styled.div`
  color: #059669;
`;

const ViewAllActivity = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

const SecurityRecommendations = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

interface RecommendationItemProps {
  completed?: boolean;
}

const RecommendationItem = styled.div<RecommendationItemProps>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background-color: ${(props) => (props.completed ? "#ecfdf5" : "#fef3c7")};
  border: 1px solid ${(props) => (props.completed ? "#bbf7d0" : "#fde68a")};
  border-radius: 8px;

  svg:first-child {
    color: ${(props) => (props.completed ? "#059669" : "#d97706")};
    flex-shrink: 0;
  }

  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    strong {
      font-size: ${sharedTheme.typography.fontSizes.sm};
      font-weight: ${sharedTheme.typography.fontWeights.medium};
      color: ${sharedTheme.colorVariants.secondary.dark};
    }

    span {
      font-size: ${sharedTheme.typography.fontSizes.xs};
      color: #6b7280;
    }
  }
`;

const SecurityActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const PaymentMethodsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PaymentMethodItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
`;

const PaymentMethodInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const PaymentMethodIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #eff6ff;
  color: ${sharedTheme.colorVariants.primary.dark};
  border-radius: 8px;
`;

const PaymentMethodName = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const PrimaryBadge = styled.span`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: #059669;
  background-color: #ecfdf5;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  margin-left: 0.5rem;
`;

const PaymentMethodActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const AddPaymentMethod = styled.div`
  margin-top: 1rem;
`;

const EarningsStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const EarningStat = styled.div`
  text-align: center;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 8px;
`;

const EarningValue = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xl};
  font-weight: ${sharedTheme.typography.fontWeights.bold};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const EarningLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: #6b7280;
  margin-top: 0.25rem;
`;

const EarningsActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const FeaturedContentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FeaturedContentItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
`;

const FeaturedContentPreview = styled.div`
  width: 120px;
  height: 80px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FeaturedContentInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const FeaturedContentTitle = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const FeaturedContentMeta = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: #6b7280;
`;

const FeaturedContentActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const AddFeaturedContent = styled.div`
  margin-top: 1rem;
`;

const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CategoryTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: #eff6ff;
  color: ${sharedTheme.colorVariants.primary.dark};
  border: 1px solid #bfdbfe;
  border-radius: 20px;
  font-size: ${sharedTheme.typography.fontSizes.sm};

  button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;

    &:hover {
      color: #dc2626;
    }
  }
`;

const AddCategoryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: #f3f4f6;
  color: ${sharedTheme.colorVariants.secondary.dark};
  border: 1px dashed #d1d5db;
  border-radius: 20px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e5e7eb;
    border-color: #9ca3af;
  }
`;

const DomainActions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const KeywordsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const KeywordTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: #eff6ff;
  color: ${sharedTheme.colorVariants.primary.dark};
  border: 1px solid #bfdbfe;
  border-radius: 20px;
  font-size: ${sharedTheme.typography.fontSizes.sm};

  button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;

    &:hover {
      color: #dc2626;
    }
  }
`;

const AddKeywordButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: #f3f4f6;
  color: ${sharedTheme.colorVariants.secondary.dark};
  border: 1px dashed #d1d5db;
  border-radius: 20px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e5e7eb;
    border-color: #9ca3af;
  }
`;

const ThemeSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
`;

interface ThemeOptionProps {
  active: boolean;
}

const ThemeOption = styled.button<ThemeOptionProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: ${(props) => (props.active ? "#eff6ff" : "#f9fafb")};
  color: ${(props) =>
    props.active
      ? sharedTheme.colorVariants.primary.dark
      : sharedTheme.colorVariants.secondary.dark};
  border: 1px solid
    ${(props) =>
      props.active ? sharedTheme.colorVariants.primary.light : "#e5e7eb"};
  border-radius: 8px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.active ? "#eff6ff" : "#f3f4f6")};
    border-color: ${(props) =>
      props.active ? sharedTheme.colorVariants.primary.light : "#d1d5db"};
  }
`;

const StorageInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const StorageItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
`;

const StorageLabel = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.sm};
  font-weight: ${sharedTheme.typography.fontWeights.medium};
  color: ${sharedTheme.colorVariants.secondary.dark};
`;

const StorageUsage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
`;

const StorageBar = styled.div`
  width: 200px;
  height: 8px;
  background-color: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
`;

interface StorageProgressProps {
  width: string;
}

const StorageProgress = styled.div<StorageProgressProps>`
  width: ${(props) => props.width};
  height: 100%;
  background-color: ${sharedTheme.colorVariants.primary.light};
  transition: width 0.3s ease;
`;

const StorageText = styled.div`
  font-size: ${sharedTheme.typography.fontSizes.xs};
  color: #6b7280;
`;

const StorageActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const PerformanceSettings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PerformanceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

const PerformanceLabel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  strong {
    font-size: ${sharedTheme.typography.fontSizes.sm};
    font-weight: ${sharedTheme.typography.fontWeights.medium};
    color: ${sharedTheme.colorVariants.secondary.dark};
  }

  span {
    font-size: ${sharedTheme.typography.fontSizes.xs};
    color: #6b7280;
  }
`;

const PerformanceSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: ${sharedTheme.typography.fontSizes.sm};
  color: ${sharedTheme.colorVariants.secondary.dark};
  background-color: white;
  cursor: pointer;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: ${sharedTheme.colorVariants.primary.light};
  }
`;
