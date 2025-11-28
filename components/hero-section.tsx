"use client"

import { Search, MapPin, Home } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import { SliderDots } from "@/components/ui/slider-dots"
import { useCallback, useEffect, useState } from "react"

const HERO_IMAGES = [
    "/hero-images/hero-1.png",
    "/hero-images/hero-2.png",
    // Fallback/Placeholder if needed, or reuse one for loop effect visual
    "/hero-images/hero-1.png",
]

export function HeroSection() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })])
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    const scrollTo = useCallback((index: number) => {
        if (emblaApi) {
            emblaApi.scrollTo(index)
        }
    }, [emblaApi])

    useEffect(() => {
        if (emblaApi) {
            setScrollSnaps(emblaApi.scrollSnapList())
            const onSelect = () => {
                setSelectedIndex(emblaApi.selectedScrollSnap())
            }
            onSelect()
            emblaApi.on("select", onSelect)
            emblaApi.on("reInit", onSelect)
        }
    }, [emblaApi])

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 sm:py-16 lg:py-20">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Top Section: Text & Slider */}
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center mb-16">
                    {/* Left Column: Content */}
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl leading-tight">
                            Find Your Dream{" "}
                            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                Property
                            </span>
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 lg:mx-0">
                            Discover the perfect home, apartment, or commercial space with ConnectHub.
                            Your journey to the ideal property starts here.
                        </p>
                    </div>

                    {/* Right Column: Image Slider */}
                    <div className="relative">
                        <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-gray-900/10 aspect-[16/9]" ref={emblaRef}>
                            <div className="flex h-full">
                                {HERO_IMAGES.map((src, index) => (
                                    <div className="relative flex-[0_0_100%] min-w-0 h-full" key={index}>
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={src}
                                                alt={`Hero Image ${index + 1}`}
                                                fill
                                                className="object-cover"
                                                priority={index === 0}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <SliderDots
                            scrollSnaps={scrollSnaps}
                            selectedIndex={selectedIndex}
                            scrollTo={scrollTo}
                        />

                        {/* Decorative elements around slider */}
                        <div className="absolute -bottom-6 -left-6 -z-10 h-64 w-64 rounded-full bg-green-200 opacity-20 blur-3xl" />
                        <div className="absolute -top-6 -right-6 -z-10 h-64 w-64 rounded-full bg-emerald-200 opacity-20 blur-3xl" />
                    </div>
                </div>

                {/* Bottom Section: Search Box */}
                <div className="mx-auto max-w-4xl relative z-10">
                    <div className="rounded-2xl bg-white p-3 shadow-xl ring-1 ring-gray-900/5">
                        {/* Property Type Tabs */}
                        <div className="mb-4 flex gap-2 border-b px-2">
                            <button className="border-b-2 border-green-600 px-4 py-2 text-sm font-medium text-green-600">
                                Buy
                            </button>
                            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                                Rent
                            </button>
                            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                                Sell
                            </button>
                        </div>

                        {/* Search Inputs */}
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <div className="flex flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus-within:ring-2 focus-within:ring-green-500/20 focus-within:border-green-500 transition-all">
                                <MapPin className="h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Enter location"
                                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-500 text-gray-900"
                                />
                            </div>

                            <div className="flex flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus-within:ring-2 focus-within:ring-green-500/20 focus-within:border-green-500 transition-all">
                                <Home className="h-5 w-5 text-gray-400" />
                                <select className="flex-1 bg-transparent text-sm outline-none text-gray-700 cursor-pointer">
                                    <option>Property Type</option>
                                    <option>Flat / Apartment</option>
                                    <option>House / Villa</option>
                                    <option>Commercial</option>
                                    <option>Residential Land</option>
                                </select>
                            </div>

                            <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-3 text-sm font-semibold text-white transition-all hover:from-green-700 hover:to-emerald-700 hover:shadow-lg hover:shadow-green-500/25 active:scale-95">
                                <Search className="h-5 w-5" />
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
