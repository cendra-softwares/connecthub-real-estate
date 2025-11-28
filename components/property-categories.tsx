import { Building2, Home, Store, TreePine } from "lucide-react"

const categories = [
    {
        icon: Building2,
        title: "Flat / Apartment",
        count: "2,543 Properties",
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        icon: Home,
        title: "House / Villa",
        count: "1,832 Properties",
        gradient: "from-green-500 to-emerald-500"
    },
    {
        icon: Store,
        title: "Commercial",
        count: "987 Properties",
        gradient: "from-purple-500 to-pink-500"
    },
    {
        icon: TreePine,
        title: "Residential Land",
        count: "654 Properties",
        gradient: "from-orange-500 to-red-500"
    }
]

export function PropertyCategories() {
    return (
        <section className="py-16 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Browse by Category
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Explore properties by type and find your perfect match
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {categories.map((category) => {
                        const Icon = category.icon
                        return (
                            <div
                                key={category.title}
                                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 transition-opacity group-hover:opacity-10`} />

                                <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${category.gradient} text-white shadow-lg`}>
                                    <Icon className="h-7 w-7" />
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {category.title}
                                </h3>

                                <p className="text-sm text-gray-600">
                                    {category.count}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
