import type { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  trend: string;
  trendLabel: string;
  icon: ReactNode;
  imageSrc?: string;
}

export function StatsCard({
  title,
  value,
  trend,
  trendLabel,
  icon,
  imageSrc,
}: StatsCardProps) {
  const isTrendPositive = trend.startsWith("+");

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-blue-100 rounded-md text-blue-700">
              {icon}
            </span>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          </div>

          <p
            className={`text-3xl font-bold ${
              title === "Earnings" ? "text-green-600" : "text-gray-800"
            }`}
          >
            {value}
          </p>

          <p className="text-sm">
            <span
              className={`font-medium ${
                isTrendPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend}
            </span>{" "}
            <span className="text-gray-600">{trendLabel}</span>
          </p>
        </div>

        {imageSrc && (
          <img
            src={imageSrc || "/placeholder.svg"}
            alt={`${title} graphic`}
            width={100}
            height={100}
            className="object-contain"
          />
        )}
      </div>
    </div>
  );
}
