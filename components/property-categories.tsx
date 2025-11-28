"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Category {
  id: number;
  name: string;
  description: string;
  property_count: number;
  image: string;
}

export function PropertyCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // First, get all categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from("property_categories")
          .select("*");

        if (categoriesError) {
          console.error("Error fetching categories:", categoriesError);
          return;
        }

        // For each category, count the properties
        const categoriesWithCounts = await Promise.all(
          categoriesData.map(async (category) => {
            const { count, error } = await supabase
              .from("properties")
              .select("*", { count: "exact", head: true })
              .eq("category_id", category.id);

            if (error) {
              console.error("Error counting properties:", error);
              return {
                ...category,
                property_count: 0,
              };
            }

            return {
              ...category,
              property_count: count || 0,
            };
          })
        );

        // Add appropriate images based on category names
        const categoriesWithImages = categoriesWithCounts.map((category) => {
          let image;

          // Map category names to images
          switch (category.name.toLowerCase()) {
            case "apartment":
              image = "/images/categories/apartment.png";
              break;
            case "house":
              image = "/images/categories/house.png";
              break;
            case "villa":
              image = "/images/categories/villa.png";
              break;
            case "commercial":
              image = "/images/categories/commercial.png";
              break;
            case "land":
              image = "/images/categories/land.png";
              break;
            default:
              // Default fallback
              image = "/images/categories/house.png";
          }

          return {
            ...category,
            image,
          };
        });

        setCategories(categoriesWithImages);
      } catch (err) {
        console.error("Error in fetchCategories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
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
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-gray-100 h-64 animate-pulse"
              >
                <div className="absolute inset-0 bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative overflow-hidden rounded-2xl h-80 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

              <div className="absolute bottom-0 left-0 p-6 w-full transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </h3>

                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-200">
                    {category.property_count}{" "}
                    {category.property_count === 1 ? "Property" : "Properties"}
                  </p>
                  <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 transform translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
