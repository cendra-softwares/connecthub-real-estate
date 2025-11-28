"use client";

import { useEffect, useState, ReactNode } from "react";
import Link from "next/link";
import { Home, Users, FileText, Settings, ArrowUpRight, Plus } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { StatCard } from "@/components/ui/stat-card";

interface ActivityItem {
  id: number;
  icon: ReactNode;
  title: string;
  description: string;
  time: string;
}

export default function DashboardPage() {
  const [totalProperties, setTotalProperties] = useState<number>(0);
  const [activeListings, setActiveListings] = useState<number>(0);
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const totalClients = 142;
  const pendingTasks = 7;

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const { data: properties, error } = await supabase
      .from("properties")
      .select(
        `
        *,
        property_categories!inner (name)
      `
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching properties:", error);
    } else {
      setTotalProperties(properties.length);
      setActiveListings(properties.length);

      const activity = properties
        .map((property: any, index) => ({
          id: index + 1,
          icon: <Home className="h-4 w-4 text-white" />,
          title: "New property listed",
          description: `${property.title} - ${property.location}`,
          time: `${index + 1} hours ago`,
        }))
        .slice(0, 5);

      setRecentActivity(activity);
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <Link
          href="/dashboard/properties/add"
          className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          <Plus className="h-4 w-4" />
          Add Property
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Properties"
          value={totalProperties}
          icon={<Home className="h-6 w-6" />}
          color="green"
          trend={{ value: 12, label: "vs last month" }}
        />
        <StatCard
          title="Active Listings"
          value={activeListings}
          icon={<FileText className="h-6 w-6" />}
          color="blue"
          trend={{ value: 8, label: "vs last month" }}
        />
        <StatCard
          title="Total Clients"
          value={totalClients}
          icon={<Users className="h-6 w-6" />}
          color="purple"
          trend={{ value: 24, label: "vs last month" }}
        />
        <StatCard
          title="Pending Tasks"
          value={pendingTasks}
          icon={<Settings className="h-6 w-6" />}
          color="orange"
          trend={{ value: -5, label: "vs last month" }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <button className="text-sm text-green-600 hover:text-green-700 font-medium">View All</button>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-600 flex items-center justify-center shadow-sm">
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {activity.description}
                    </p>
                  </div>
                  <div className="text-sm text-gray-400 whitespace-nowrap">
                    {activity.time}
                  </div>
                </div>
              ))}
              {recentActivity.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No recent activity found.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions / Mini Profile */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Pro Plan</h3>
            <p className="text-green-100 text-sm mb-6">You are currently on the Pro plan. Upgrade to unlock more features.</p>
            <button className="w-full bg-white text-green-700 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors">
              Manage Subscription
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <div className="space-y-3">
              <Link href="/dashboard/properties" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                <span className="text-gray-600 group-hover:text-gray-900">Manage Properties</span>
                <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
              </Link>
              <Link href="/dashboard/clients" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                <span className="text-gray-600 group-hover:text-gray-900">Client Directory</span>
                <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
              </Link>
              <Link href="/dashboard/settings" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                <span className="text-gray-600 group-hover:text-gray-900">Account Settings</span>
                <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
