"use client";

import Image from "next/image";
import { MapPin, Bed, Maximize } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  beds: number;
  area: number;
  category_name?: string;
}

export function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data, error } = await supabase
          .from("properties")
          .select(
            `
                        id,
                        title,
                        location,
                        price,
                        image,
                        beds,
                        area,
                        property_categories!inner (name)
                    `
          )
          .limit(6)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching properties:", error);
        } else {
          // Format the properties to match the original structure
          const formattedProperties = data.map((prop: any) => ({
            id: prop.id,
            title: prop.title,
            location: prop.location,
            price: prop.price,
            image: prop.image || "/properties/villa-1.jpg", // fallback image
            beds: prop.beds,
            area: prop.area,
            category_name: prop.property_categories?.name,
          }));

          setProperties(formattedProperties);
        }
      } catch (err) {
        console.error("Error in fetchProperties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
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
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-2xl bg-white shadow-md animate-pulse"
              >
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-10 bg-gray-200 rounded mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
                  <p className="text-lg font-bold text-green-600">
                    ₹{property.price?.toLocaleString() || "0"}
                  </p>
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
                    <span className="text-sm text-gray-600">
                      {property.beds} Beds
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Maximize className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {property.area} sqft
                    </span>
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
  );
}
