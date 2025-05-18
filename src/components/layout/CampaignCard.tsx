import { Calendar, DollarSign } from "lucide-react";

interface CampaignCardProps {
  title: string;
  brand: string;
  dueDate: string;
  status: string;
  compensation: string;
  logoSrc: string;
}

export function CampaignCard({
  title,
  brand,
  dueDate,
  status,
  compensation,
  logoSrc,
}: CampaignCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Content Approval":
        return "bg-amber-100 text-amber-800";
      case "Negotiation":
        return "bg-purple-100 text-purple-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <img
          src={logoSrc || "/placeholder.svg"}
          alt={`${brand} logo`}
          width={40}
          height={40}
          className="rounded-md"
        />
        <div>
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{brand}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-1 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>{dueDate}</span>
        </div>

        <div className="hidden md:flex items-center gap-1 text-sm text-gray-600">
          <DollarSign className="h-4 w-4" />
          <span>{compensation}</span>
        </div>

        <span
          className={`text-xs px-2.5 py-1 rounded-full ${getStatusColor(
            status
          )}`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}
