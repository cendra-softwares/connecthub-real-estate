"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, Users, Settings, LogOut } from "lucide-react";

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Properties",
        href: "/dashboard/properties",
        icon: Building2,
    },
    {
        title: "Clients",
        href: "/dashboard/clients",
        icon: Users,
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
            <div className="h-16 flex items-center px-6 border-b border-gray-200">
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-green-600 p-1.5 rounded-lg">
                        <Building2 className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900">ConnectHub</span>
                </Link>
            </div>

            <div className="flex-1 py-6 flex flex-col gap-1 px-3">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive
                                    ? "bg-green-50 text-green-700 font-medium"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <item.icon
                                className={`h-5 w-5 ${isActive ? "text-green-600" : "text-gray-400 group-hover:text-gray-600"
                                    }`}
                            />
                            {item.title}
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-gray-200">
                <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 w-full transition-all duration-200 group">
                    <LogOut className="h-5 w-5 text-gray-400 group-hover:text-red-500" />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
