"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  CheckCircle,
  MessageSquare,
  Users,
  FileText,
  Search,
  ArrowLeft,
  ChevronRight,
  Bell,
  Briefcase,
  Eye,
  Share2,
  AlertCircle,
  Send,
  Paperclip,
  ImageIcon,
  Smile,
  MoreHorizontal,
  X,
  Plus,
  Download,
  Upload,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { Progress } from "../../../components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { Separator } from "../../../components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { Textarea } from "../../../components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Checkbox } from "../../../components/ui/checkbox";
import { Label } from "../../../components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../components/ui/sheet";

// Sample data for the collaboration dashboard
const collaborationData = {
  campaign: {
    id: 1,
    title: "Summer Fashion Collection",
    brand: "StyleHub",
    brandLogo:
      "https://img.freepik.com/free-vector/colorful-letter-gradient-logo-design_474888-2309.jpg?semt=ais_hybrid&w=740",
    startDate: "May 15, 2025",
    endDate: "May 30, 2025",
    status: "In Progress",
    progress: 35,
    budget: "₹5,000",
    description:
      "Showcase our new summer collection with lifestyle photos and videos. We're looking for authentic content that highlights the versatility and comfort of our clothing in real-world settings.",
  },
  team: {
    brand: [
      {
        id: 1,
        name: "Priya Sharma",
        role: "Marketing Manager",
        avatar: "https://i.pravatar.cc/150?img=32",
        email: "priya@stylehub.com",
        isOnline: true,
      },
      {
        id: 2,
        name: "Rahul Verma",
        role: "Creative Director",
        avatar: "https://i.pravatar.cc/150?img=60",
        email: "rahul@stylehub.com",
        isOnline: false,
      },
    ],
    creator: [
      {
        id: 3,
        name: "Aisha Khan",
        role: "Content Creator",
        avatar: "https://i.pravatar.cc/150?img=33",
        email: "aisha@creator.com",
        isOnline: true,
      },
    ],
  },
  milestones: [
    {
      id: 1,
      title: "Kickoff Meeting",
      date: "May 15, 2025",
      status: "completed",
      description: "Initial discussion about campaign goals and expectations",
    },
    {
      id: 2,
      title: "Content Brief Approval",
      date: "May 18, 2025",
      status: "completed",
      description: "Finalize the content brief and creative direction",
    },
    {
      id: 3,
      title: "Content Creation",
      date: "May 15-22, 2025",
      status: "in-progress",
      description: "Create photos and videos according to the brief",
    },
    {
      id: 4,
      title: "Content Review",
      date: "May 23, 2025",
      status: "pending",
      description: "Brand reviews and provides feedback on content",
    },
    {
      id: 5,
      title: "Content Publishing",
      date: "May 25-27, 2025",
      status: "pending",
      description: "Publish approved content according to schedule",
    },
    {
      id: 6,
      title: "Performance Report",
      date: "May 30, 2025",
      status: "pending",
      description: "Analyze campaign performance and submit report",
    },
  ],
  deliverables: [
    {
      id: 1,
      type: "Instagram Post",
      dueDate: "May 22, 2025",
      status: "in-progress",
      description: "Carousel post showing 3-5 outfits from the collection",
      feedback: null,
      attachments: [],
    },
    {
      id: 2,
      type: "Instagram Stories",
      dueDate: "May 23, 2025",
      status: "pending",
      description: "3 consecutive stories showcasing the outfits in action",
      feedback: null,
      attachments: [],
    },
    {
      id: 3,
      type: "Instagram Reel",
      dueDate: "May 24, 2025",
      status: "pending",
      description:
        "30-60 second reel showing outfit transitions or styling tips",
      feedback: null,
      attachments: [],
    },
  ],
  chats: {
    campaign: [
      {
        id: 1,
        sender: {
          id: 1,
          name: "Priya Sharma",
          avatar: "https://i.pravatar.cc/150?img=32",
          role: "Marketing Manager",
        },
        message:
          "Welcome to the Summer Fashion Collection campaign! We're excited to work with you on this project.",
        timestamp: "May 15, 2025, 10:00 AM",
        attachments: [],
      },
      {
        id: 2,
        sender: {
          id: 3,
          name: "Aisha Khan",
          avatar: "https://i.pravatar.cc/150?img=33",
          role: "Content Creator",
        },
        message:
          "Thank you! I'm looking forward to creating content for your summer collection. I've reviewed the brief and have some ideas I'd like to discuss.",
        timestamp: "May 15, 2025, 10:15 AM",
        attachments: [],
      },
      {
        id: 3,
        sender: {
          id: 2,
          name: "Rahul Verma",
          avatar: "https://i.pravatar.cc/150?img=60",
          role: "Creative Director",
        },
        message:
          "Great to have you on board, Aisha! I've attached some mood boards for the campaign that might help with your creative direction.",
        timestamp: "May 15, 2025, 11:30 AM",
        attachments: [
          {
            id: 1,
            name: "Summer_Collection_Mood_Board.pdf",
            type: "pdf",
            size: "3.2 MB",
            url: "#",
          },
        ],
      },
      {
        id: 4,
        sender: {
          id: 3,
          name: "Aisha Khan",
          avatar: "https://i.pravatar.cc/150?img=33",
          role: "Content Creator",
        },
        message:
          "These mood boards are perfect! I'm thinking of shooting at the beach and a local café to showcase the versatility of the collection. Would that align with your vision?",
        timestamp: "May 15, 2025, 2:45 PM",
        attachments: [],
      },
      {
        id: 5,
        sender: {
          id: 1,
          name: "Priya Sharma",
          avatar: "https://i.pravatar.cc/150?img=32",
          role: "Marketing Manager",
        },
        message:
          "Beach and café settings sound perfect! That aligns well with our target audience's lifestyle. Could you also consider a park or garden setting for some shots?",
        timestamp: "May 15, 2025, 3:20 PM",
        attachments: [],
      },
      {
        id: 6,
        sender: {
          id: 3,
          name: "Aisha Khan",
          avatar: "https://i.pravatar.cc/150?img=33",
          role: "Content Creator",
        },
        message:
          "I know a great botanical garden that would work well. I'll include that in my shot list. I'll start shooting this weekend and should have drafts ready by Tuesday.",
        timestamp: "May 15, 2025, 4:05 PM",
        attachments: [],
      },
    ],
    other: [
      {
        id: 1,
        brand: "FitLife",
        brandLogo:
          "https://img.freepik.com/free-vector/gradient-fitness-logo-template_23-2149457926.jpg?w=740&t=st=1716057889~exp=1716058489~hmac=c9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9",
        campaign: "Fitness App Promotion",
        unreadCount: 3,
        lastMessage: {
          sender: "Amit Patel",
          content: "Could you provide an update on the workout video?",
          timestamp: "May 16, 2025, 9:30 AM",
        },
      },
      {
        id: 2,
        brand: "NatureEats",
        brandLogo:
          "https://img.freepik.com/free-vector/gradient-organic-food-logo-template_23-2149452309.jpg?w=740&t=st=1716057920~exp=1716058520~hmac=c9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9a9c9a7e9",
        campaign: "Organic Food Review",
        unreadCount: 0,
        lastMessage: {
          sender: "You",
          content: "I'll send the product photos tomorrow morning.",
          timestamp: "May 15, 2025, 5:45 PM",
        },
      },
    ],
  },
  files: [
    {
      id: 1,
      name: "Campaign_Brief.pdf",
      type: "pdf",
      size: "2.4 MB",
      uploadedBy: "Priya Sharma",
      uploadedAt: "May 15, 2025",
      url: "#",
    },
    {
      id: 2,
      name: "Product_Catalog.pdf",
      type: "pdf",
      size: "5.8 MB",
      uploadedBy: "Rahul Verma",
      uploadedAt: "May 15, 2025",
      url: "#",
    },
    {
      id: 3,
      name: "Brand_Guidelines.pdf",
      type: "pdf",
      size: "3.2 MB",
      uploadedBy: "Priya Sharma",
      uploadedAt: "May 15, 2025",
      url: "#",
    },
    {
      id: 4,
      name: "Summer_Collection_Mood_Board.pdf",
      type: "pdf",
      size: "3.2 MB",
      uploadedBy: "Rahul Verma",
      uploadedAt: "May 15, 2025",
      url: "#",
    },
  ],
  tasks: [
    {
      id: 1,
      title: "Review campaign brief",
      assignedTo: "Aisha Khan",
      dueDate: "May 16, 2025",
      status: "completed",
      priority: "high",
    },
    {
      id: 2,
      title: "Prepare shot list and content plan",
      assignedTo: "Aisha Khan",
      dueDate: "May 17, 2025",
      status: "completed",
      priority: "high",
    },
    {
      id: 3,
      title: "Shoot Instagram content",
      assignedTo: "Aisha Khan",
      dueDate: "May 20, 2025",
      status: "in-progress",
      priority: "high",
    },
    {
      id: 4,
      title: "Edit and prepare draft content",
      assignedTo: "Aisha Khan",
      dueDate: "May 22, 2025",
      status: "pending",
      priority: "medium",
    },
    {
      id: 5,
      title: "Review draft content",
      assignedTo: "Priya Sharma",
      dueDate: "May 23, 2025",
      status: "pending",
      priority: "high",
    },
  ],
  notes: [
    {
      id: 1,
      title: "Kickoff Meeting Notes",
      content:
        "Discussed campaign goals, target audience, and key messaging. Brand wants to emphasize the versatility and comfort of the summer collection. Focus on natural, outdoor settings.",
      createdBy: "Aisha Khan",
      createdAt: "May 15, 2025",
    },
    {
      id: 2,
      title: "Content Ideas",
      content:
        "- Beach photoshoot with casual outfits\n- Café setting for brunch-appropriate styles\n- Botanical garden for sundresses and accessories\n- Transition reel showing day-to-night outfit changes",
      createdBy: "Aisha Khan",
      createdAt: "May 16, 2025",
    },
  ],
};

const CollaborationDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [activeChatId, setActiveChatId] = useState(1); // StyleHub campaign chat
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showChatSidebar, setShowChatSidebar] = useState(true);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [notes, setNotes] = useState(collaborationData.notes);
  const [tasks, setTasks] = useState(collaborationData.tasks);
  const [newTask, setNewTask] = useState({
    title: "",
    assignedTo: "",
    dueDate: "",
    priority: "medium",
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    // In a real app, you would send the message to an API
    console.log("Sending message:", messageInput);
    setMessageInput("");
  };

  const handleAddNote = () => {
    if (!newNote.title || !newNote.content) return;

    const note = {
      id: notes.length + 1,
      title: newNote.title,
      content: newNote.content,
      createdBy: "Aisha Khan",
      createdAt: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    setNotes([...notes, note]);
    setNewNote({ title: "", content: "" });
  };

  const handleAddTask = () => {
    if (!newTask.title || !newTask.assignedTo || !newTask.dueDate) return;

    const task = {
      id: tasks.length + 1,
      title: newTask.title,
      assignedTo: newTask.assignedTo,
      dueDate: newTask.dueDate,
      status: "pending",
      priority: newTask.priority,
    };

    setTasks([...tasks, task]);
    setNewTask({
      title: "",
      assignedTo: "",
      dueDate: "",
      priority: "medium",
    });
  };

  const handleToggleTaskStatus = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "completed" ? "pending" : "completed",
            }
          : task
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-blue-500";
      case "pending":
        return "bg-gray-300";
      default:
        return "bg-gray-300";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="secondary">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">Normal</Badge>;
    }
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Chat Sidebar */}
      {showChatSidebar && (
        <div className="w-80 border-r bg-white flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Messages</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowChatSidebar(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                className="pl-8"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
              />
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-2">
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-gray-500 px-2 mb-2 uppercase">
                  Current Campaign
                </h3>
                <div
                  className={`p-3 rounded-lg cursor-pointer ${
                    activeChatId === 1
                      ? "bg-blue-50 border border-blue-100"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveChatId(1)}
                >
                  <div className="flex items-center mb-2">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage
                        src={
                          collaborationData.campaign.brandLogo ||
                          "/placeholder.svg"
                        }
                        alt={collaborationData.campaign.brand}
                      />
                      <AvatarFallback>
                        {collaborationData.campaign.brand.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {collaborationData.campaign.brand}
                      </p>
                      <p className="text-xs text-gray-500">
                        {collaborationData.campaign.title}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    <p className="line-clamp-2">
                      {
                        collaborationData.chats.campaign[
                          collaborationData.chats.campaign.length - 1
                        ].message
                      }
                    </p>
                    <p className="mt-1 text-right">
                      {
                        collaborationData.chats.campaign[
                          collaborationData.chats.campaign.length - 1
                        ].timestamp.split(",")[1]
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gray-500 px-2 mb-2 uppercase">
                  Other Campaigns
                </h3>
                {collaborationData.chats.other.map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-3 rounded-lg cursor-pointer mb-2 ${
                      activeChatId === chat.id + 100
                        ? "bg-blue-50 border border-blue-100"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveChatId(chat.id + 100)}
                  >
                    <div className="flex items-center mb-2">
                      <div className="relative">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage
                            src={chat.brandLogo || "/placeholder.svg"}
                            alt={chat.brand}
                          />
                          <AvatarFallback>
                            {chat.brand.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        {chat.unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {chat.unreadCount}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {chat.brand}
                        </p>
                        <p className="text-xs text-gray-500">{chat.campaign}</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      <p className="line-clamp-2">
                        <span className="font-medium">
                          {chat.lastMessage.sender}:{" "}
                        </span>
                        {chat.lastMessage.content}
                      </p>
                      <p className="mt-1 text-right">
                        {chat.lastMessage.timestamp.split(",")[1]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" onClick={handleBack} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {collaborationData.campaign.title}
                </h1>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="flex items-center">
                    <Briefcase className="h-3.5 w-3.5 mr-1" />
                    {collaborationData.campaign.brand}
                  </span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    {collaborationData.campaign.startDate} -{" "}
                    {collaborationData.campaign.endDate}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!showChatSidebar && (
                <Button
                  variant="outline"
                  onClick={() => setShowChatSidebar(true)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                </Button>
              )}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="relative">
                      <Bell className="h-4 w-4" />
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        2
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notifications</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="https://i.pravatar.cc/150?img=33"
                  alt="Aisha Khan"
                />
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {/* Campaign Status Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-700">
                    Campaign Status
                  </h3>
                  <Badge
                    variant={
                      collaborationData.campaign.status === "Completed"
                        ? "default"
                        : collaborationData.campaign.status === "In Progress"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {collaborationData.campaign.status}
                  </Badge>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Overall Progress</span>
                      <span>{collaborationData.campaign.progress}%</span>
                    </div>
                    <Progress
                      value={collaborationData.campaign.progress}
                      className="h-2"
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Budget</span>
                    <span className="font-medium text-green-600">
                      {collaborationData.campaign.budget}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Deliverables</span>
                    <span>
                      {
                        collaborationData.deliverables.filter(
                          (d) => d.status === "completed"
                        ).length
                      }
                      /{collaborationData.deliverables.length} Completed
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-700 mb-4">Team</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Brand Team</p>
                    <div className="space-y-2">
                      {collaborationData.team.brand.map((member) => (
                        <div key={member.id} className="flex items-center">
                          <div className="relative">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage
                                src={member.avatar || "/placeholder.svg"}
                                alt={member.name}
                              />
                              <AvatarFallback>
                                {member.name.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <span
                              className={`absolute bottom-0 right-1 h-2.5 w-2.5 rounded-full border border-white ${
                                member.isOnline ? "bg-green-500" : "bg-gray-300"
                              }`}
                            ></span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-gray-500">
                              {member.role}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Creator Team</p>
                    <div className="space-y-2">
                      {collaborationData.team.creator.map((member) => (
                        <div key={member.id} className="flex items-center">
                          <div className="relative">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage
                                src={member.avatar || "/placeholder.svg"}
                                alt={member.name}
                              />
                              <AvatarFallback>
                                {member.name.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <span
                              className={`absolute bottom-0 right-1 h-2.5 w-2.5 rounded-full border border-white ${
                                member.isOnline ? "bg-green-500" : "bg-gray-300"
                              }`}
                            ></span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-gray-500">
                              {member.role}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-700 mb-4">
                  Next Deadlines
                </h3>
                <div className="space-y-3">
                  {collaborationData.deliverables
                    .filter((d) => d.status !== "completed")
                    .sort(
                      (a, b) =>
                        new Date(a.dueDate).getTime() -
                        new Date(b.dueDate).getTime()
                    )
                    .slice(0, 3)
                    .map((deliverable) => (
                      <div key={deliverable.id} className="flex items-start">
                        <div
                          className={`w-2 h-2 rounded-full mt-1.5 mr-2 ${
                            deliverable.status === "in-progress"
                              ? "bg-blue-500"
                              : "bg-amber-500"
                          }`}
                        ></div>
                        <div>
                          <p className="text-sm font-medium">
                            {deliverable.type}
                          </p>
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>Due: {deliverable.dueDate}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    <Eye className="h-3.5 w-3.5 mr-1.5" />
                    View All Deliverables
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs Navigation */}
          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      {collaborationData.campaign.description}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      {collaborationData.milestones.map((milestone) => (
                        <div
                          key={milestone.id}
                          className="mb-6 flex items-start"
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${getStatusColor(
                              milestone.status
                            )}`}
                          >
                            {milestone.status === "completed" ? (
                              <CheckCircle className="h-4 w-4 text-white" />
                            ) : milestone.status === "in-progress" ? (
                              <Clock className="h-4 w-4 text-white" />
                            ) : (
                              <span className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              {milestone.title}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {milestone.date}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {milestone.description}
                            </p>
                          </div>
                          <Badge
                            variant={
                              milestone.status === "completed"
                                ? "default"
                                : milestone.status === "in-progress"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {milestone.status === "completed"
                              ? "Completed"
                              : milestone.status === "in-progress"
                              ? "In Progress"
                              : "Pending"}
                          </Badge>
                        </div>
                      ))}
                      {/* Timeline connector line */}
                      <div className="absolute left-4 top-4 w-0.5 h-[calc(100%-32px)] bg-gray-200 -z-10"></div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Messages</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab("messages")}
                  >
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {collaborationData.chats.campaign
                      .slice(-3)
                      .map((message) => (
                        <div key={message.id} className="flex items-start">
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarImage
                              src={message.sender.avatar || "/placeholder.svg"}
                              alt={message.sender.name}
                            />
                            <AvatarFallback>
                              {message.sender.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <p className="text-sm font-medium">
                                {message.sender.name}
                              </p>
                              <span className="mx-2 text-gray-300">•</span>
                              <p className="text-xs text-gray-500">
                                {message.timestamp}
                              </p>
                            </div>
                            <p className="text-sm text-gray-700">
                              {message.message}
                            </p>
                            {message.attachments.length > 0 && (
                              <div className="mt-2 flex items-center text-xs text-blue-600">
                                <Paperclip className="h-3.5 w-3.5 mr-1" />
                                <span>{message.attachments[0].name}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <form
                    onSubmit={handleSendMessage}
                    className="flex items-center gap-2 w-full"
                  >
                    <Input
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setMessageInput(e.target.value)
                      }
                      className="flex-1"
                    />
                    <Button type="submit" disabled={!messageInput.trim()}>
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Deliverables Tab */}
            <TabsContent value="deliverables" className="space-y-6">
              {collaborationData.deliverables.map((deliverable) => (
                <Card key={deliverable.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{deliverable.type}</CardTitle>
                        <CardDescription>
                          Due: {deliverable.dueDate}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={
                          deliverable.status === "completed"
                            ? "default"
                            : deliverable.status === "in-progress"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {deliverable.status === "completed"
                          ? "Completed"
                          : deliverable.status === "in-progress"
                          ? "In Progress"
                          : "Pending"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-4">
                      {deliverable.description}
                    </p>

                    {deliverable.attachments.length > 0 ? (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">
                          Submitted Content
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {deliverable.attachments.map((attachment, index) => (
                            <div
                              key={index}
                              className="border rounded-lg p-2 flex items-center"
                            >
                              <ImageIcon className="h-5 w-5 text-blue-500 mr-2" />
                              <span className="text-sm truncate">
                                {attachment}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">
                          Submit Content
                        </h4>
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500 mb-2">
                            Drag and drop files here, or click to browse
                          </p>
                          <Button variant="outline" size="sm">
                            <Upload className="h-3.5 w-3.5 mr-1.5" />
                            Upload Files
                          </Button>
                        </div>
                      </div>
                    )}

                    {deliverable.feedback && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Feedback</h4>
                        <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                          {deliverable.feedback}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2 pt-2 border-t">
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button>
                      {deliverable.status === "completed" ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approved
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          Submit for Review
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>

            {/* Files Tab */}
            <TabsContent value="files" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Campaign Files</CardTitle>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload File
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Upload File</SheetTitle>
                        </SheetHeader>
                        <div className="py-6">
                          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center mb-4">
                            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500 mb-2">
                              Drag and drop files here, or click to browse
                            </p>
                            <Button variant="outline" size="sm">
                              <Upload className="h-3.5 w-3.5 mr-1.5" />
                              Browse Files
                            </Button>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="file-name">File Name</Label>
                              <Input
                                id="file-name"
                                placeholder="Enter file name"
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="file-description">
                                Description (Optional)
                              </Label>
                              <Textarea
                                id="file-description"
                                placeholder="Add a description..."
                                className="mt-1"
                              />
                            </div>
                            <Button className="w-full">Upload File</Button>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {collaborationData.files.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                            <FileText className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {file.name}
                            </p>
                            <div className="flex items-center text-xs text-gray-500">
                              <span>{file.size}</span>
                              <span className="mx-1">•</span>
                              <span>Uploaded by {file.uploadedBy}</span>
                              <span className="mx-1">•</span>
                              <span>{file.uploadedAt}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tasks Tab */}
            <TabsContent value="tasks" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Tasks</CardTitle>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Task
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="space-y-4">
                          <h4 className="font-medium">Create New Task</h4>
                          <div className="space-y-2">
                            <Label htmlFor="task-title">Task Title</Label>
                            <Input
                              id="task-title"
                              placeholder="Enter task title"
                              value={newTask.title}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                setNewTask({
                                  ...newTask,
                                  title: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="task-assigned">Assigned To</Label>
                            <Input
                              id="task-assigned"
                              placeholder="Enter name"
                              value={newTask.assignedTo}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                setNewTask({
                                  ...newTask,
                                  assignedTo: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="task-due-date">Due Date</Label>
                            <Input
                              id="task-due-date"
                              type="date"
                              value={newTask.dueDate}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                setNewTask({
                                  ...newTask,
                                  dueDate: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Priority</Label>
                            <div className="flex gap-2">
                              <Button
                                type="button"
                                variant={
                                  newTask.priority === "low"
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() =>
                                  setNewTask({ ...newTask, priority: "low" })
                                }
                              >
                                Low
                              </Button>
                              <Button
                                type="button"
                                variant={
                                  newTask.priority === "medium"
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() =>
                                  setNewTask({ ...newTask, priority: "medium" })
                                }
                              >
                                Medium
                              </Button>
                              <Button
                                type="button"
                                variant={
                                  newTask.priority === "high"
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() =>
                                  setNewTask({ ...newTask, priority: "high" })
                                }
                              >
                                High
                              </Button>
                            </div>
                          </div>
                          <Button className="w-full" onClick={handleAddTask}>
                            Create Task
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search tasks..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setSearchQuery(e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    {filteredTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          task.status === "completed"
                            ? "bg-gray-50"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center">
                          <Checkbox
                            id={`task-${task.id}`}
                            checked={task.status === "completed"}
                            onCheckedChange={() =>
                              handleToggleTaskStatus(task.id)
                            }
                            className="mr-3"
                          />
                          <div>
                            <Label
                              htmlFor={`task-${task.id}`}
                              className={`font-medium ${
                                task.status === "completed"
                                  ? "line-through text-gray-500"
                                  : "text-gray-900"
                              }`}
                            >
                              {task.title}
                            </Label>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <span>Assigned to: {task.assignedTo}</span>
                              <span className="mx-1">•</span>
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>Due: {task.dueDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getPriorityBadge(task.priority)}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Task
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Users className="h-4 w-4 mr-2" />
                                Reassign
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Task
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredTasks.length === 0 && (
                    <div className="text-center py-8">
                      <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">No tasks found</p>
                      <p className="text-sm text-gray-400">
                        Try adjusting your search or create a new task
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notes Tab */}
            <TabsContent value="notes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add Note</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="note-title">Title</Label>
                      <Input
                        id="note-title"
                        placeholder="Note title"
                        value={newNote.title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setNewNote({ ...newNote, title: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="note-content">Content</Label>
                      <Textarea
                        id="note-content"
                        placeholder="Write your note here..."
                        className="min-h-[100px]"
                        value={newNote.content}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          setNewNote({ ...newNote, content: e.target.value })
                        }
                      />
                    </div>
                    <Button
                      onClick={handleAddNote}
                      disabled={!newNote.title || !newNote.content}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Note
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {notes.map((note) => (
                  <Card key={note.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{note.title}</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Note
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="h-4 w-4 mr-2" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Note
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>By {note.createdBy}</span>
                        <span className="mx-1">•</span>
                        <span>{note.createdAt}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 whitespace-pre-line">
                        {note.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Chat Area */}
        {activeChatId === 1 && (
          <div className="border-t bg-white">
            <div className="p-4">
              <form
                onSubmit={handleSendMessage}
                className="flex items-end gap-2"
              >
                <div className="flex-1 relative">
                  <Textarea
                    className="min-h-[80px] resize-none pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your message here..."
                    value={messageInput}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setMessageInput(e.target.value)
                    }
                  />
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-gray-600"
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-gray-600"
                    >
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-gray-600"
                    >
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button type="submit" disabled={!messageInput.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollaborationDashboard;
