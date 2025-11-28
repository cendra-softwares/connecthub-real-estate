import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Home, Users, FileText, Settings } from "lucide-react"

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="mt-2 text-gray-600">Welcome back! Here's an overview of your account.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Properties</p>
                                <p className="text-2xl font-bold text-gray-900">24</p>
                            </div>
                            <div className="bg-green-100 rounded-lg p-3">
                                <Home className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Active Listings</p>
                                <p className="text-2xl font-bold text-gray-900">18</p>
                            </div>
                            <div className="bg-blue-100 rounded-lg p-3">
                                <FileText className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Clients</p>
                                <p className="text-2xl font-bold text-gray-900">142</p>
                            </div>
                            <div className="bg-purple-100 rounded-lg p-3">
                                <Users className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Pending Tasks</p>
                                <p className="text-2xl font-bold text-gray-900">7</p>
                            </div>
                            <div className="bg-orange-100 rounded-lg p-3">
                                <Settings className="h-6 w-6 text-orange-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <button className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all">
                            <div className="bg-green-100 rounded-lg p-2">
                                <Home className="h-5 w-5 text-green-600" />
                            </div>
                            <span className="font-medium text-gray-700">Add New Property</span>
                        </button>
                        <button className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all">
                            <div className="bg-blue-100 rounded-lg p-2">
                                <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <span className="font-medium text-gray-700">Manage Clients</span>
                        </button>
                        <button className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-all">
                            <div className="bg-purple-100 rounded-lg p-2">
                                <FileText className="h-5 w-5 text-purple-600" />
                            </div>
                            <span className="font-medium text-gray-700">View Reports</span>
                        </button>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                            <div className="bg-green-100 rounded-full p-2">
                                <Home className="h-4 w-4 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">New property listed</p>
                                <p className="text-xs text-gray-500 mt-1">Modern Luxury Villa in Beverly Hills</p>
                                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                            <div className="bg-blue-100 rounded-full p-2">
                                <Users className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">New client registered</p>
                                <p className="text-xs text-gray-500 mt-1">John Doe joined your network</p>
                                <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-purple-100 rounded-full p-2">
                                <FileText className="h-4 w-4 text-purple-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">Report generated</p>
                                <p className="text-xs text-gray-500 mt-1">Monthly sales report is ready</p>
                                <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
