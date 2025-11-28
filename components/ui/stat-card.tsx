import { ReactNode } from "react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
    trend?: {
        value: number;
        label: string;
    };
    color?: "green" | "blue" | "purple" | "orange";
}

export function StatCard({ title, value, icon, trend, color = "green" }: StatCardProps) {
    const colorStyles = {
        green: "bg-green-50 text-green-600",
        blue: "bg-blue-50 text-blue-600",
        purple: "bg-purple-50 text-purple-600",
        orange: "bg-orange-50 text-orange-600",
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
                </div>
                <div className={`p-3 rounded-lg ${colorStyles[color]}`}>
                    {icon}
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center text-sm">
                    <span className={trend.value >= 0 ? "text-green-600" : "text-red-600"}>
                        {trend.value > 0 ? "+" : ""}{trend.value}%
                    </span>
                    <span className="text-gray-500 ml-2">{trend.label}</span>
                </div>
            )}
        </div>
    );
}
