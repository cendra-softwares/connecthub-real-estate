"use client";

import { useEffect, useState, ReactNode } from "react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Home, Users, FileText, Settings } from "lucide-react";
import { supabase } from "@/lib/supabase";
import AddPropertyForm from "@/components/add-property-form";

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
  const [showAddProperty, setShowAddProperty] = useState(false);
  const totalClients = 142; // Keeping the original value as this might be from a different table
  const pendingTasks = 7; // Keeping the original value as this might be from a different table

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    // Fetch properties data with category names
    const { data: properties, error } = await supabase
      .from("properties")
      .select(
        `
        *,
        property_categories!inner (name)
      `
      )
      .order("created_at", { ascending: false }); // Order by newest first

    if (error) {
      console.error("Error fetching properties:", error);
    } else {
      setTotalProperties(properties.length);
      setActiveListings(properties.length); // All properties are active listings

      // Create recent activity based on properties
      const activity = properties
        .map((property: any, index) => ({
          id: index + 1,
          icon: <Home className="h-4 w-4 text-green-700" />,
          title: "New property listed",
          description: `${property.title} - ${property.location}`,
          time: `${index + 1} hours ago`,
        }))
        .slice(0, 3); // Limit to 3 recent activities

      setRecentActivity(activity);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back! Here's an overview of your account.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Properties</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalProperties}
                </p>
              </div>
              <div className="bg-green-100 rounded-lg p-3">
                <Home className="h-6 w-6 text-green-700" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Listings</p>
                <p className="text-2xl font-bold text-gray-900">
                  {activeListings}
                </p>
              </div>
              <div className="bg-blue-10 rounded-lg p-3">
                <FileText className="h-6 w-6 text-blue-700" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalClients}
                </p>
              </div>
              <div className="bg-purple-100 rounded-lg p-3">
                <Users className="h-6 w-6 text-purple-700" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Tasks</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pendingTasks}
                </p>
              </div>
              <div className="bg-orange-100 rounded-lg p-3">
                <Settings className="h-6 w-6 text-orange-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <button
              onClick={() => setShowAddProperty(true)}
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all"
            >
              <div className="bg-green-10 rounded-lg p-2">
                <Home className="h-5 w-5 text-green-700" />
              </div>
              <span className="font-medium text-gray-900">
                Add New Property
              </span>
            </button>
            <button className="flex items-center gap-3 p-4 rounded-lg border-gray-20 hover:border-blue-500 hover:bg-blue-50 transition-all">
              <div className="bg-blue-10 rounded-lg p-2">
                <Users className="h-5 w-5 text-blue-700" />
              </div>
              <span className="font-medium text-gray-900">Manage Clients</span>
            </button>
            <button className="flex items-center gap-3 p-4 rounded-lg border-gray-20 hover:border-purple-500 hover:bg-purple-50 transition-all">
              <div className="bg-purple-100 rounded-lg p-2">
                <FileText className="h-5 w-5 text-purple-700" />
              </div>
              <span className="font-medium text-gray-900">View Reports</span>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 pb-4 border-b border-gray-100"
              >
                <div className="bg-gray-100 rounded-full p-2">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-700 mt-1">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Property Modal */}
      {showAddProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto text-gray-900">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Add New Property
                </h2>
                <button
                  onClick={() => setShowAddProperty(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ✕
                </button>
              </div>
              <AddPropertyForm
                onSuccess={() => {
                  setShowAddProperty(false);
                  // Refresh dashboard data
                  fetchDashboardData();
                }}
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
