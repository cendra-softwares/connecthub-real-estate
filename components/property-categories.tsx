"use client";

import { Building2, Home, Store, TreePine } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Category {
  id: number;
  name: string;
  description: string;
  property_count: number;
  icon: any;
  gradient: string;
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

        // Add appropriate icons and gradients based on category names
        const categoriesWithIcons = categoriesWithCounts.map((category) => {
          let icon, gradient;

          // Map category names to icons and gradients
          switch (category.name.toLowerCase()) {
            case "apartment":
              icon = Building2;
              gradient = "from-blue-500 to-cyan-500";
              break;
            case "house":
            case "villa":
              icon = Home;
              gradient = "from-green-500 to-emerald-500";
              break;
            case "commercial":
              icon = Store;
              gradient = "from-purple-500 to-pink-500";
              break;
            case "land":
              icon = TreePine;
              gradient = "from-orange-500 to-red-500";
              break;
            default:
              // Default to home icon for any other category
              icon = Home;
              gradient = "from-gray-500 to-slate-500";
          }

          return {
            ...category,
            icon,
            gradient,
          };
        });

        setCategories(categoriesWithIcons);
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
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 animate-pulse"
              >
                <div className="h-14 w-14 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
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
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 transition-opacity group-hover:opacity-10`}
                />

                <div
                  className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${category.gradient} text-white shadow-lg`}
                >
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </h3>

                <p className="text-sm text-gray-600">
                  {category.property_count}{" "}
                  {category.property_count === 1 ? "Property" : "Properties"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
