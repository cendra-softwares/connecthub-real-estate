"use client"

import { Search, MapPin, Home } from "lucide-react"

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-20 sm:py-28">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                        Find Your Dream{" "}
                        <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            Property
                        </span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
                        Discover the perfect home, apartment, or commercial space with ConnectHub.
                        Your journey to the ideal property starts here.
                    </p>

                    {/* Search Box */}
                    <div className="mx-auto mt-10 max-w-4xl">
                        <div className="rounded-2xl bg-white p-2 shadow-xl ring-1 ring-gray-900/5">
                            {/* Property Type Tabs */}
                            <div className="mb-4 flex gap-2 border-b px-2">
                                <button className="border-b-2 border-green-600 px-4 py-2 text-sm font-medium text-green-600">
                                    Buy
                                </button>
                                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                                    Rent
                                </button>
                                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                                    Sell
                                </button>
                            </div>

                            {/* Search Inputs */}
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <div className="flex flex-1 items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                                    <MapPin className="h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Enter location"
                                        className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-500"
                                    />
                                </div>

                                <div className="flex flex-1 items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                                    <Home className="h-5 w-5 text-gray-400" />
                                    <select className="flex-1 bg-transparent text-sm outline-none text-gray-700">
                                        <option>Property Type</option>
                                        <option>Flat / Apartment</option>
                                        <option>House / Villa</option>
                                        <option>Commercial</option>
                                        <option>Residential Land</option>
                                    </select>
                                </div>

                                <button className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-3 text-sm font-medium text-white transition-all hover:from-green-600 hover:to-emerald-700 hover:shadow-lg">
                                    <Search className="h-5 w-5" />
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
