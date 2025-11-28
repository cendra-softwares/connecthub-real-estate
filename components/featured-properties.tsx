import Image from "next/image"
import { MapPin, Bed, Bath, Maximize } from "lucide-react"

const properties = [
    {
        id: 1,
        title: "Modern Luxury Villa",
        location: "Beverly Hills, CA",
        price: "₹8,50,00,000",
        image: "/properties/villa-1.jpg",
        beds: 4,
        baths: 3,
        sqft: "3,200"
    },
    {
        id: 2,
        title: "Downtown Apartment",
        location: "Mumbai, Maharashtra",
        price: "₹1,25,00,000",
        image: "/properties/apartment-1.jpg",
        beds: 2,
        baths: 2,
        sqft: "1,100"
    },
    {
        id: 3,
        title: "Cozy Family Home",
        location: "Bangalore, Karnataka",
        price: "₹2,75,00,000",
        image: "/properties/home-1.jpg",
        beds: 3,
        baths: 2,
        sqft: "2,400"
    },
    {
        id: 4,
        title: "Beachfront Condo",
        location: "Goa, India",
        price: "₹3,50,00,000",
        image: "/properties/condo-1.jpg",
        beds: 3,
        baths: 2,
        sqft: "1,800"
    },
    {
        id: 5,
        title: "Penthouse Suite",
        location: "Delhi, NCR",
        price: "₹5,25,00,000",
        image: "/properties/penthouse-1.jpg",
        beds: 4,
        baths: 4,
        sqft: "4,500"
    },
    {
        id: 6,
        title: "Garden Villa",
        location: "Pune, Maharashtra",
        price: "₹4,00,00,000",
        image: "/properties/villa-2.jpg",
        beds: 5,
        baths: 3,
        sqft: "3,800"
    }
]

export function FeaturedProperties() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Featured Properties
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Hand-picked properties just for you
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {properties.map((property) => (
                        <div
                            key={property.id}
                            className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-2xl hover:-translate-y-1"
                        >
                            {/* Property Image */}
                            <div className="relative h-64 overflow-hidden bg-gray-200">
                                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20" />
                                <div className="flex h-full items-center justify-center text-gray-400">
                                    <Image
                                        src={property.image}
                                        alt={property.title}
                                        fill
                                        className="object-cover transition-transform group-hover:scale-110"
                                    />
                                </div>

                                {/* Price Badge */}
                                <div className="absolute top-4 right-4 rounded-lg bg-white/95 backdrop-blur-sm px-4 py-2 shadow-lg">
                                    <p className="text-lg font-bold text-green-600">{property.price}</p>
                                </div>
                            </div>

                            {/* Property Details */}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {property.title}
                                </h3>

                                <div className="flex items-center gap-2 text-gray-600 mb-4">
                                    <MapPin className="h-4 w-4" />
                                    <span className="text-sm">{property.location}</span>
                                </div>

                                {/* Property Stats */}
                                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                                    <div className="flex items-center gap-1.5">
                                        <Bed className="h-4 w-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">{property.beds} Beds</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Bath className="h-4 w-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">{property.baths} Baths</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Maximize className="h-4 w-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">{property.sqft} sqft</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <button className="rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-3 text-sm font-medium text-white transition-all hover:from-green-600 hover:to-emerald-700 hover:shadow-lg">
                        View All Properties
                    </button>
                </div>
            </div>
        </section>
    )
}
